document.addEventListener('DOMContentLoaded', async () => {
  const user = OlhoDigitalAccount.requireAuthentication();
  if (!user) return;
  OlhoDigitalAccount.applySettings(OlhoDigitalAccount.getEffectiveSettings(user));
  OlhoDigitalAccount.updateProfileAvatars(user);

  const Community = OlhoDigitalCommunity;
  const CATEGORY_LABELS = { geral: 'Geral', duvidas: 'Dúvidas', tutoriais: 'Tutoriais', projetos: 'Projetos', noticias: 'Notícias' };
  const feed = document.getElementById('feed');
  const searchInput = document.getElementById('communitySearch');

  let posts = [];
  let members = [];
  let activeCategory = 'Todos';
  let activeView = 'feed';
  let activity = OlhoDigitalAccount.getActivity(user);
  const savedPosts = new Set(activity.community.saves.map((entry) => entry.id));
  const getName = () => user.name || 'Usuário';
  let currentUserAvatarUrl = user.photo || user.avatar || '';
  const escapeHtml = (value) => String(value).replace(/[&<>'"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char]));
  const label = (key) => CATEGORY_LABELS[key] || key;
  const initialOf = (name) => (name || 'U').trim().charAt(0).toLocaleUpperCase('pt-BR') || 'U';
  const timeAgo = (date) => {
    const minutes = Math.max(1, Math.floor((Date.now() - date) / 60000));
    if (minutes < 60) return `Há ${minutes} min`;
    return minutes < 1440 ? `Há ${Math.floor(minutes / 60)} h` : `Há ${Math.floor(minutes / 1440)} d`;
  };
  const showError = (message, error) => {
    if (error) console.error(error);
    window.alert(message);
  };
  const save = () => {
    try {
      localStorage.setItem('communityPosts', JSON.stringify(posts));
      return true;
    } catch {
      console.error('Não foi possível salvar o conteúdo da Comunidade neste navegador.');
      window.alert('Não foi possível salvar. O armazenamento deste navegador pode estar cheio.');
      return false;
    }
  };
  const contentLimits = { publication: 5000, comment: 1000, reply: 1000 };
  const duplicateSubmissions = new Map();
  const releaseDuplicateSubmission = (text, scope) => {
    duplicateSubmissions.delete(`${scope}:${CommunityValidation.contentSignature(text)}`);
  };
  const setFieldError = (field, message) => {
    const wrapper = field.closest('.community-field');
    const error = wrapper.querySelector('[data-field-error]');
    error.textContent = message;
    if (message) field.setAttribute('aria-invalid', 'true');
    else field.removeAttribute('aria-invalid');
  };
  const updateCharacterCount = (field) => {
    const count = Array.from(field.value).length;
    const limit = Number(field.dataset.contentLimit);
    const counter = field.closest('.community-field').querySelector('[data-character-count]');
    counter.textContent = `${count.toLocaleString('pt-BR')} / ${limit.toLocaleString('pt-BR')} caracteres`;
    counter.classList.toggle('community-field-error', count > limit);
  };
  const validateSubmission = (field, kind, scope) => {
    const text = field.value;
    const error = CommunityValidation.validateText(text, contentLimits[kind]);
    setFieldError(field, error);
    if (error) {
      field.focus();
      return '';
    }
    const personalData = CommunityValidation.detectPersonalData(text);
    const detectedTypes = Object.entries(personalData)
      .filter(([, found]) => found)
      .map(([type]) => ({ cpf: 'CPF', telefone: 'telefone', email: 'e-mail' }[type]));
    if (detectedTypes.length && !window.confirm(`A mensagem parece conter ${detectedTypes.join(', ')}. Isso pode expor informações pessoais. Deseja publicar mesmo assim? Revise o texto para removê-los ou cancele para editar.`)) {
      return '';
    }
    const key = `${scope}:${CommunityValidation.contentSignature(text)}`;
    const lastSent = duplicateSubmissions.get(key);
    if (lastSent && Date.now() - lastSent < 30000) {
      setFieldError(field, 'Você enviou este mesmo conteúdo há pouco. Aguarde alguns segundos antes de tentar novamente.');
      field.focus();
      return '';
    }
    duplicateSubmissions.set(key, Date.now());
    setFieldError(field, '');
    return text.trim();
  };
  const avatarMarkup = (author, color = 'blue') => {
    const name = typeof author === 'string' ? author : (author?.name || 'Usuário');
    const avatar = typeof author === 'string' ? '' : (author?.avatar || '');
    const initial = initialOf(name);
    const image = avatar ? `<img src="${escapeHtml(avatar)}" alt="Foto de ${escapeHtml(name)}" onerror="this.remove(); this.parentElement.classList.add('avatar-fallback')">` : '';
    return `<span class="avatar ${color}${avatar ? '' : ' avatar-fallback'}">${image}<b>${escapeHtml(initial)}</b></span>`;
  };
  const track = (area, action, item) => {
    try {
      OlhoDigitalAccount.trackActivity(user, area, action, item);
      activity = OlhoDigitalAccount.getActivity(user);
    } catch (error) {
      showError('Não foi possível salvar esta interação.', error);
    }
  };
  const untrack = (area, action, id) => {
    try {
      OlhoDigitalAccount.removeActivity(user, area, action, id);
      activity = OlhoDigitalAccount.getActivity(user);
    } catch (error) {
      showError('Não foi possível atualizar esta interação.', error);
    }
  };
  const initials = (name) => (name || 'U').charAt(0).toUpperCase();
  const femaleNames = new Set(['Ana Silva', 'Mariana Costa', 'Fernanda Souza', 'Beatriz Santos', 'Juliana Lima', 'Camila Rodrigues']);
  const maleNames = new Set(['Carlos Eduardo', 'João Pedro', 'Lucas Martins', 'Gabriel Oliveira', 'Rafael Almeida', 'Bruno Ferreira']);
  const avatarGender = (name) => femaleNames.has(name) ? 'female' : maleNames.has(name) ? 'male' : 'neutral';
  const avatarUrl = (name) => { if (name === getName() && currentUserAvatarUrl) return currentUserAvatarUrl; return `https://api.dicebear.com/9.x/adventurer/svg?seed=${encodeURIComponent(name)}&gender=${avatarGender(name)}`; };
  const memberAvatarMarkup = (name) => avatarMarkup({ name, avatar: avatarUrl(name) }, 'blue');
  let registeredMembers = [];
  try {
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    registeredMembers = Array.isArray(storedUsers)
      ? storedUsers.filter((member) => typeof member?.name === 'string' && typeof member?.email === 'string')
        .map((member) => ({ name: member.name.trim(), email: member.email.trim() }))
        .filter((member) => member.name && member.email)
      : [];
  } catch (error) {
    console.error('Não foi possível carregar a lista de membros cadastrados neste navegador.', error);
  }
  if (!registeredMembers.some((member) => member.email.toLowerCase() === user.email.toLowerCase())) {
    registeredMembers.push({ name: getName(), email: user.email });
  }
  document.getElementById('memberCount').textContent = `${registeredMembers.length} conta${registeredMembers.length === 1 ? '' : 's'} cadastrada${registeredMembers.length === 1 ? '' : 's'} neste navegador; presença online não está disponível.`;
  document.getElementById('memberStack').innerHTML = registeredMembers.slice(0, 5)
    .map((member) => memberAvatarMarkup(member.name))
    .join('') + (registeredMembers.length > 5 ? `<span class="more-members">+${registeredMembers.length - 5}</span>` : '');

  const findPost = (id) => posts.find((post) => post.id === id);
  const countComments = (list) => list.reduce((total, comment) => total + 1 + countComments(comment.replies), 0);
  const removeFrom = (list, id) => list.filter((item) => item.id !== id).map((item) => ({ ...item, replies: removeFrom(item.replies, id) }));

  function renderComment(comment, postId, parentId = '') {
    const own = comment.author?.id === user.id || comment.author === getName();
    const authorName = typeof comment.author === 'string' ? comment.author : (comment.author?.name || 'Usuário');
    const authorAvatar = typeof comment.author === 'string' ? '' : (comment.author?.avatar || '');
    return `<div class="comment">${avatarMarkup({ name: authorName, avatar: authorAvatar }, 'blue')}<div class="comment-body">
      <div class="comment-head"><strong>${escapeHtml(authorName)}</strong><small>${timeAgo(comment.createdAt)}</small></div>
      <p>${escapeHtml(comment.text)}</p>
      <div class="comment-tools"><button data-reply="${postId}" data-parent="${parentId || comment.id}">Responder</button>${own ? `<button data-delete-comment="${postId}" data-comment="${comment.id}" data-parent="${parentId}">Excluir</button>` : ''}</div>
      ${(comment.replies || []).map((reply) => renderComment(reply, postId, comment.id)).join('')}
      <div class="reply-form" data-reply-form="${comment.id}"><div class="community-field"><textarea data-content-limit="${contentLimits.reply}" placeholder="Escreva uma resposta..."></textarea><div class="community-field-meta"><small data-character-count>0 / 1.000 caracteres</small><small class="community-field-error" data-field-error role="alert" aria-live="polite"></small></div></div><button type="button" data-send-reply="${postId}" data-parent="${comment.id}">Enviar</button></div>
    </div></div>`;
  }

  function renderPost(post) {
    const own = post.author?.id === user.id || post.author === getName();
    const saved = savedPosts.has(post.id);
    const postAuthorName = typeof post.author === 'string' ? post.author : (post.author?.name || 'Usuário');
    const postAuthorAvatar = typeof post.author === 'string' ? '' : (post.author?.avatar || '');
    const commentCount = countComments(post.comments || []);
    return `<article class="post-card panel ${post.featured ? 'featured' : ''}" data-post="${post.id}">
      ${post.featured ? '<span class="featured-label">📌 PUBLICAÇÃO EM DESTAQUE</span>' : ''}
      <div class="post-meta"><div class="author">${avatarMarkup({ name: postAuthorName, avatar: postAuthorAvatar }, 'blue')}<div><strong>${escapeHtml(postAuthorName)}</strong><small>${timeAgo(post.createdAt)}</small></div></div>
        <div><span class="tag ${post.category}">${label(post.category)}</span>${own ? `<button class="post-menu" data-delete-post="${post.id}" aria-label="Excluir publicação">⋯</button>` : ''}</div></div>
      <p>${escapeHtml(post.text)}</p>
      ${post.image ? `<img class="post-image" src="${escapeHtml(post.image)}" alt="Imagem da publicação">` : ''}
      <div class="post-stats"><span>♡ ${post.likes} curtida${post.likes === 1 ? '' : 's'}</span><span>💬 ${commentCount} comentário${commentCount === 1 ? '' : 's'}</span></div>
      <div class="post-actions"><button class="${post.likedByMe ? 'active' : ''}" data-like="${post.id}">👍 Curtir</button><button data-comments="${post.id}">💬 Comentar</button><button class="${saved ? 'saved' : ''}" data-save="${post.id}">${saved ? '🔖 Salvo' : '🔖 Salvar'}</button></div>
      <div class="comments" data-comments-box="${post.id}">${(post.comments || []).map((comment) => renderComment(comment, post.id)).join('')}
        <form class="comment-form" data-comment-form="${post.id}"><div class="community-field"><textarea data-content-limit="${contentLimits.comment}" placeholder="Escreva um comentário..."></textarea><div class="community-field-meta"><small data-character-count>0 / 1.000 caracteres</small><small class="community-field-error" data-field-error role="alert" aria-live="polite"></small></div></div><button type="submit">Enviar</button></form></div>
    </article>`;
  }

  function renderMembers(query) {
    const list = members.filter((member) => (member.name || '').toLowerCase().includes(query));
    return '<h2 class="view-heading">Membros da comunidade</h2>' + (list.length
      ? `<div class="member-directory">${list.map((member) => `<article class="member-directory-card panel">${avatarMarkup({ name: member.name, avatar: member.avatar || '' }, 'blue')}<div><strong>${escapeHtml(member.name)}</strong><small>${member.id === user.id ? 'Você' : 'Membro'}</small></div></article>`).join('')}</div>`
      : '<div class="empty-state panel"><strong>Nenhum membro encontrado.</strong><span>Experimente outro nome na busca.</span></div>');
  }

  function render() {
    const query = (searchInput || document.getElementById('communitySearch')).value.trim().toLowerCase();
    let visible = posts.filter((post) => (activeCategory === 'Todos' || post.category === activeCategory) && (!query || `${typeof post.author === 'string' ? post.author : (post.author?.name || '')} ${label(post.category)} ${post.text}`.toLowerCase().includes(query)));
    let heading = '';
    if (activeView === 'salvos') { visible = visible.filter((post) => savedPosts.has(post.id)); heading = '<h2 class="view-heading">Publicações salvas</h2>'; }
    if (activeView === 'discussoes') { visible = visible.filter((post) => post.category === 'duvidas' || (post.comments || []).length >= 3); heading = '<h2 class="view-heading">Discussões da comunidade</h2>'; }
    if (activeView === 'membros') {
      feed.innerHTML = renderMembers(query);
      return;
    }
    feed.innerHTML = heading + (visible.length
      ? visible.map(renderPost).join('')
      : activeView === 'salvos'
        ? '<div class="empty-state panel"><strong>Nenhuma publicação salva.</strong><span>Use o botão 🔖 Salvar em uma publicação para guardá-la aqui.</span></div>'
        : posts.length === 0
            ? '<div class="empty-state panel"><strong>Ainda não há publicações.</strong><span>Compartilhe uma dúvida, uma dica ou uma notícia para começar a conversa.</span><button class="primary-btn" type="button" onclick="document.getElementById(&quot;openComposerSidebar&quot;).click()">Criar a primeira publicação</button></div>'
            : '<div class="empty-state panel"><strong>Nenhuma publicação encontrada.</strong><span>Seja o primeiro a publicar ou tente outra categoria.</span></div>');
  }

  function renderMemberSummary() {
    document.getElementById('memberCount').textContent = `${members.length} membro${members.length === 1 ? '' : 's'} na comunidade.`;
    document.getElementById('memberStack').innerHTML = members.slice(0, 5)
      .map((member, index) => avatarMarkup({ name: member.name, avatar: member.avatar || '' }, ['blue', 'pink', 'green'][index % 3]))
      .join('') + (members.length > 5 ? `<span class="more-members">+${members.length - 5}</span>` : '');
  }

  function openComments(postId) {
    document.querySelector(`[data-comments-box="${postId}"]`)?.classList.add('open');
  }

  async function load() {
    feed.innerHTML = '<div class="empty-state panel"><strong>Carregando publicações...</strong></div>';
    try {
      [posts, members] = await Promise.all([Community.listPosts(user.id), Community.listMembers()]);
      renderMemberSummary();
      render();
    } catch (error) {
      console.error(error);
      feed.innerHTML = '<div class="empty-state panel"><strong>Não foi possível carregar a comunidade.</strong><span>Verifique sua conexão e recarregue a página.</span></div>';
    }
  }

  // ---- Filtros e navegação -------------------------------------------
  document.querySelectorAll('.category-link').forEach((button) => button.classList.toggle('active', button.dataset.filter === 'Todos'));
  const syncNavigation = () => {
    document.querySelectorAll('[data-view]').forEach((item) => item.classList.toggle('active', item.dataset.view === activeView));
    document.querySelectorAll('[data-filter]').forEach((item) => item.classList.toggle('active', item.dataset.filter === activeCategory));
  };
  };

  document.addEventListener('click', async (event) => {
    const target = event.target;

    const filter = target.closest('[data-filter]');
    if (filter) {
      activeCategory = filter.dataset.filter;
      activeView = 'feed';
      syncNavigation();
      render();
      return;
    }

    const view = target.closest('[data-view]');
    if (view) {
      activeView = view.dataset.view;
      activeCategory = ['duvidas', 'tutoriais', 'projetos', 'noticias'].includes(activeView) ? activeView : 'Todos';
      syncNavigation();
      render();
      return;
    }

    const like = target.closest('[data-like]');
    if (like) {
      const post = findPost(like.dataset.like);
      const liked = !post.likedByMe;
      try {
        await Community.setLike(post.id, user.id, liked);
      } catch (error) {
        showError('Não foi possível registrar a curtida.', error);
        return;
      }
      post.likedByMe = liked;
      post.likes += liked ? 1 : -1;
      if (liked) track('community', 'likes', { id: post.id, title: post.text, category: label(post.category) });
      else untrack('community', 'likes', post.id);
      render();
      return;
    }

    const comments = target.closest('[data-comments]');
    if (comments) {
      document.querySelector(`[data-comments-box="${comments.dataset.comments}"]`).classList.toggle('open');
      return;
    }

    const saveButton = target.closest('[data-save]');
    if (saveButton) {
      const post = findPost(saveButton.dataset.save);
      if (savedPosts.has(post.id)) {
        savedPosts.delete(post.id);
        untrack('community', 'saves', post.id);
      } else {
        savedPosts.add(post.id);
        track('community', 'saves', { id: post.id, title: post.text, category: label(post.category) });
      }
      render();
      return;
    }

    const reply = target.closest('[data-reply]');
    if (reply) {
      document.querySelector(`[data-reply-form="${reply.dataset.parent}"]`).classList.toggle('open');
      return;
    }

    const sendReply = target.closest('[data-send-reply]');
    if (sendReply) {
      const post = findPost(sendReply.dataset.sendReply);
      const field = sendReply.parentElement.querySelector('[data-content-limit]');
      const text = validateSubmission(field, 'reply', 'comment');
      if (!post || !text) return;
      try {
        const id = await Community.addComment(post.id, sendReply.dataset.parent, text);
        track('community', 'comments', { id, postId: post.id, title: post.text, text, kind: 'Resposta' });
        releaseDuplicateSubmission(text, 'comment');
        await load();
        openComments(post.id);
      } catch (error) {
        releaseDuplicateSubmission(text, 'comment');
        showError('Não foi possível enviar a resposta.', error);
      }
      return;
    }

    const deletePost = target.closest('[data-delete-post]');
    if (deletePost && window.confirm('Excluir esta publicação?')) {
      try {
        await Community.deletePost(findPost(deletePost.dataset.deletePost));
        posts = posts.filter((post) => post.id !== deletePost.dataset.deletePost);
        render();
      } catch (error) {
        showError('Não foi possível excluir a publicação.', error);
      }
      return;
    }

    const deleteComment = target.closest('[data-delete-comment]');
    if (deleteComment && window.confirm('Excluir este comentário?')) {
      const post = findPost(deleteComment.dataset.deleteComment);
      try {
        await Community.deleteComment(deleteComment.dataset.comment);
        post.comments = removeFrom(post.comments, deleteComment.dataset.comment);
        untrack('community', 'comments', deleteComment.dataset.comment);
        render();
        openComments(post.id);
      } catch (error) {
        showError('Não foi possível excluir o comentário.', error);
      }
    }
  });

  document.addEventListener('submit', async (event) => {
    const form = event.target;
    if (!form.matches('[data-comment-form]')) return;
    event.preventDefault();
    const post = findPost(form.dataset.commentForm);
    const field = form.querySelector('[data-content-limit]');
    const text = validateSubmission(field, 'comment', 'comment');
    if (!post || !text) return;
    try {
      const id = await Community.addComment(post.id, null, text);
      track('community', 'comments', { id, postId: post.id, title: post.text, text, kind: 'Comentário' });
      releaseDuplicateSubmission(text, 'comment');
      await load();
      openComments(post.id);
    } catch (error) {
      releaseDuplicateSubmission(text, 'comment');
      showError('Não foi possível enviar o comentário.', error);
    }
  });

  document.addEventListener('input', (event) => {
    const field = event.target.closest('[data-content-limit]');
    if (field) updateCharacterCount(field);
  });

  searchInput.addEventListener('input', render);

  const modal = document.getElementById('composerModal');
  const imageInput = document.getElementById('postImage');
  const imageName = document.getElementById('imageName');
  const publishButton = document.getElementById('publishBtn');
  const resetComposer = () => {
    document.getElementById('newPost').value = '';
    imageInput.value = '';
    imageName.textContent = 'Nenhuma imagem selecionada';
  };

  document.getElementById('openComposerSidebar').onclick = () => {
    modal.hidden = false;
    document.getElementById('newPost').focus();
  };
  document.getElementById('closeComposer').onclick = () => { modal.hidden = true; };
  imageInput.onchange = () => {
    imageName.textContent = imageInput.files[0] ? imageInput.files[0].name : 'Nenhuma imagem selecionada';
  };
  publishButton.onclick = async () => {
    const text = validateSubmission(document.getElementById('newPost'), 'publication', 'publication');
    if (!text) return;
    publishButton.disabled = true;
    try {
      await Community.createPost(user.id, {
        category: document.getElementById('postType').value,
        text,
        imageFile: imageInput.files[0] || null
      });
      releaseDuplicateSubmission(text, 'publication');
      modal.hidden = true;
      resetComposer();
      await load();
    } catch (error) {
      releaseDuplicateSubmission(text, 'publication');
      showError(error.message || 'Não foi possível publicar.', error);
    } finally {
      publishButton.disabled = false;
    }
  };

  const communityInfoModal = document.getElementById('communityInfoModal');
  const communityInfoTitle = document.getElementById('communityInfoTitle');
  const communityInfoContent = document.getElementById('communityInfoContent');
  const closeCommunityInfo = document.getElementById('closeCommunityInfo');
  let lastCommunityInfoTrigger = null;
  const communityEvents = [
    { day: '15', month: 'JUN', title: 'Workshop: Docker Avançado', date: '15 de junho, 19:00', location: 'Online', description: 'Workshop online com conteúdo avançado sobre Docker.' },
    { day: '22', month: 'JUN', title: 'Live: Carreira em Desenvolvimento', date: '22 de junho, 20:00', location: 'Online', description: 'Conversa ao vivo sobre caminhos e oportunidades na carreira de desenvolvimento.' },
    { day: '29', month: 'JUN', title: 'Meetup: Networking', date: '29 de junho, 18:00', location: 'São Paulo, SP', description: 'Encontro presencial para networking entre membros da comunidade.' }
  ];
  const communityRules = [
    'Respeite todos os membros: mantenha um diálogo cordial, inclusivo e construtivo, mesmo quando houver opiniões diferentes.',
    'Não faça spam ou autopromoção: compartilhe links e projetos somente quando forem relevantes para a conversa.',
    'Use títulos descritivos: explique o assunto da publicação para facilitar a leitura e a busca.',
    'Pesquise antes de perguntar: confira se a dúvida já foi respondida e inclua contexto suficiente para que outras pessoas possam ajudar.',
    'Compartilhe conhecimento com responsabilidade: indique fontes confiáveis e sinalize quando uma informação for uma hipótese.',
    'Proteja a sua privacidade e a de outras pessoas: não publique CPF, telefone, e-mail, senhas ou outros dados pessoais.',
    'Publique conteúdo relacionado à segurança digital e não compartilhe material ofensivo ou ilegal.'
  ];
  const closeCommunityInfoModal = () => {
    communityInfoModal.hidden = true;
    if (lastCommunityInfoTrigger?.isConnected) lastCommunityInfoTrigger.focus();
  };
  document.querySelectorAll('[data-community-info]').forEach((button) => {
    button.addEventListener('click', () => {
      lastCommunityInfoTrigger = button;
      if (button.dataset.communityInfo === 'events') {
        communityInfoTitle.textContent = 'Todos os eventos';
        communityInfoContent.innerHTML = `<div class="community-info-modal-content">${communityEvents.map((event) => `<article class="event-item"><strong>${event.day} <small>${event.month}</small></strong><span><b>${escapeHtml(event.title)}</b><small>${escapeHtml(event.date)}<br>${escapeHtml(event.location)}</small><span>${escapeHtml(event.description)}</span></span></article>`).join('')}</div>`;
      } else {
        communityInfoTitle.textContent = 'Regras da Comunidade';
        communityInfoContent.innerHTML = `<div class="community-info-modal-content"><p>Estas orientações ajudam a manter a Comunidade Olho Digital segura, acolhedora e útil para todos.</p><ol>${communityRules.map((rule) => `<li>${escapeHtml(rule)}</li>`).join('')}</ol></div>`;
      }
      communityInfoModal.hidden = false;
      closeCommunityInfo.focus();
    });
  });
  closeCommunityInfo.addEventListener('click', closeCommunityInfoModal);
  communityInfoModal.addEventListener('click', (event) => {
    if (event.target === communityInfoModal) closeCommunityInfoModal();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !communityInfoModal.hidden) closeCommunityInfoModal();
  });

  await load();
});
