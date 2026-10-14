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

  const avatarMarkup = (author, color = 'blue') => {
    const image = author.avatar
      ? `<img src="${escapeHtml(author.avatar)}" alt="Foto de ${escapeHtml(author.name)}" onerror="this.remove(); this.parentElement.classList.add('avatar-fallback')">`
      : '';
    return `<span class="avatar ${color}${author.avatar ? '' : ' avatar-fallback'}">${image}<b>${escapeHtml(initialOf(author.name))}</b></span>`;
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

  const findPost = (id) => posts.find((post) => post.id === id);
  const countComments = (list) => list.reduce((total, comment) => total + 1 + countComments(comment.replies), 0);
  const removeFrom = (list, id) => list.filter((item) => item.id !== id).map((item) => ({ ...item, replies: removeFrom(item.replies, id) }));
  const findComment = (list, id) => {
    for (const item of list) {
      if (item.id === id) return item;
      const found = findComment(item.replies, id);
      if (found) return found;
    }
    return null;
  };

  function renderComment(comment, postId, parentId = '') {
    const own = comment.author.id === user.id;
    return `<div class="comment">${avatarMarkup(comment.author)}<div class="comment-body">
      <div class="comment-head"><strong>${escapeHtml(comment.author.name)}</strong><small>${timeAgo(comment.createdAt)}</small></div>
      <p>${escapeHtml(comment.text)}</p>
      <div class="comment-tools"><button data-reply="${postId}" data-parent="${parentId || comment.id}">Responder</button>${own ? `<button data-delete-comment="${postId}" data-comment="${comment.id}">Excluir</button>` : ''}</div>
      ${comment.replies.map((reply) => renderComment(reply, postId, comment.id)).join('')}
      <div class="reply-form" data-reply-form="${comment.id}"><input placeholder="Escreva uma resposta..."><button data-send-reply="${postId}" data-parent="${comment.id}">Enviar</button></div>
    </div></div>`;
  }

  function renderPost(post) {
    const own = post.author.id === user.id;
    const saved = savedPosts.has(post.id);
    return `<article class="post-card panel ${post.featured ? 'featured' : ''}" data-post="${post.id}">
      ${post.featured ? '<span class="featured-label">📌 PUBLICAÇÃO EM DESTAQUE</span>' : ''}
      <div class="post-meta"><div class="author">${avatarMarkup(post.author)}<div><strong>${escapeHtml(post.author.name)}</strong><small>${timeAgo(post.createdAt)}</small></div></div>
        <div><span class="tag ${post.category}">${label(post.category)}</span>${own ? `<button class="post-menu" data-delete-post="${post.id}" aria-label="Excluir publicação">⋯</button>` : ''}</div></div>
      <p>${escapeHtml(post.text)}</p>
      ${post.image ? `<img class="post-image" src="${escapeHtml(post.image)}" alt="Imagem da publicação">` : ''}
      <div class="post-stats"><span>♡ ${post.likes} curtida${post.likes === 1 ? "" : "s"}</span><span>💬 ${countComments(post.comments)} comentário${countComments(post.comments) === 1 ? "" : "s"}</span></div>
      <div class="post-actions">
        <button class="${post.likedByMe ? 'active' : ''}" data-like="${post.id}">👍 Curtir</button>
        <button data-comments="${post.id}">💬 Comentar</button>
        <button class="${saved ? 'saved' : ''}" data-save="${post.id}">${saved ? '🔖 Salvo' : '🔖 Salvar'}</button>
      </div>
      <div class="comments" data-comments-box="${post.id}">${post.comments.map((comment) => renderComment(comment, post.id)).join('')}
        <form class="comment-form" data-comment-form="${post.id}"><input required maxlength="2000" placeholder="Escreva um comentário..."><button>Enviar</button></form></div>
    </article>`;
  }

  function renderMembers(query) {
    const list = members.filter((member) => member.name.toLowerCase().includes(query));
    return '<h2 class="view-heading">Membros da comunidade</h2>' + (list.length
      ? `<div class="member-directory">${list.map((member) => `<article class="member-directory-card panel">${avatarMarkup(member)}<div><strong>${escapeHtml(member.name)}</strong><small>${member.id === user.id ? 'Você' : 'Membro'}</small></div></article>`).join('')}</div>`
      : '<div class="empty-state panel"><strong>Nenhum membro encontrado.</strong><span>Experimente outro nome na busca.</span></div>');
  }

  function render() {
    const query = searchInput.value.trim().toLowerCase();
    if (activeView === 'membros') {
      feed.innerHTML = renderMembers(query);
      return;
    }
    let visible = posts.filter((post) => (activeCategory === 'Todos' || post.category === activeCategory)
      && (!query || `${post.author.name} ${label(post.category)} ${post.text}`.toLowerCase().includes(query)));
    let heading = '';
    if (activeView === 'salvos') {
      visible = visible.filter((post) => savedPosts.has(post.id));
      heading = '<h2 class="view-heading">Publicações salvas</h2>';
    }
    if (activeView === 'discussoes') {
      visible = visible.filter((post) => post.category === 'duvidas' || post.comments.length >= 3);
      heading = '<h2 class="view-heading">Discussões da comunidade</h2>';
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
      .map((member, index) => avatarMarkup(member, ['blue', 'pink', 'green'][index % 3]))
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
      const input = sendReply.parentElement.querySelector('input');
      const text = input.value.trim();
      if (!text) return;
      try {
        const id = await Community.addComment(post.id, sendReply.dataset.parent, text);
        track('community', 'comments', { id, postId: post.id, title: post.text, text, kind: 'Resposta' });
        await load();
        openComments(post.id);
      } catch (error) {
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
    const text = form.querySelector('input').value.trim();
    if (!text) return;
    try {
      const id = await Community.addComment(post.id, null, text);
      track('community', 'comments', { id, postId: post.id, title: post.text, text, kind: 'Comentário' });
      await load();
      openComments(post.id);
    } catch (error) {
      showError('Não foi possível enviar o comentário.', error);
    }
  });

  searchInput.addEventListener('input', render);

  // ---- Nova publicação -----------------------------------------------
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
    const text = document.getElementById('newPost').value.trim();
    if (!text) return;
    publishButton.disabled = true;
    try {
      await Community.createPost(user.id, {
        category: document.getElementById('postType').value,
        text,
        imageFile: imageInput.files[0] || null
      });
      modal.hidden = true;
      resetComposer();
      await load();
    } catch (error) {
      showError(error.message || 'Não foi possível publicar.', error);
    } finally {
      publishButton.disabled = false;
    }
  };

  await load();
});
