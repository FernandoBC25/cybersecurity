document.addEventListener('DOMContentLoaded', () => {
  const user = OlhoDigitalAccount.requireAuthentication();
  if (!user) return;
  OlhoDigitalAccount.applySettings(OlhoDigitalAccount.getEffectiveSettings(user));
  OlhoDigitalAccount.updateProfileAvatars(user);

  const categories = ['Todos', 'Geral', 'Dúvidas', 'Tutoriais', 'Projetos', 'Notícias'];
  const categoryKeys = { Geral: 'geral', Dúvidas: 'duvidas', Tutoriais: 'tutoriais', Projetos: 'projetos', Notícias: 'noticias' };
  const seedPosts = [
    { id: 'seed-1', featured: true, author: 'Ana Silva', initial: 'A', color: 'pink', category: 'geral', text: 'Bem-vindos à Comunidade Olho Digital! Este é o espaço para compartilhar dúvidas, experiências, notícias e dicas sobre segurança digital. Compartilhe seu conhecimento e ajude outros membros da comunidade.', likes: 91, views: 428, likedBy: [], createdAt: Date.now() - 7200000, comments: [{ id: 'c1', author: 'Carlos Eduardo', initial: 'C', text: 'Que iniciativa incrível! Já aprendi muito por aqui.', createdAt: Date.now() - 6800000, likes: 12, replies: [{ id: 'r1', author: 'Ana Silva', initial: 'A', text: 'Fico feliz, Carlos. Sinta-se em casa!', createdAt: Date.now() - 6400000, likes: 5, replies: [] }] }, { id: 'c2', author: 'Mariana Costa', initial: 'M', text: 'Vou compartilhar o que aprendi sobre golpes em redes sociais.', createdAt: Date.now() - 6000000, likes: 8, replies: [] }, { id: 'c3', author: 'Lucas Martins', initial: 'L', text: 'Excelente espaço para trocar experiências reais.', createdAt: Date.now() - 5600000, likes: 6, replies: [{ id: 'r2', author: 'Beatriz Santos', initial: 'B', text: 'Concordo! Informação compartilhada protege todo mundo.', createdAt: Date.now() - 5000000, likes: 3, replies: [] }] }, { id: 'c4', author: 'Fernanda Souza', initial: 'F', text: 'Já convidei minha equipe para participar.', createdAt: Date.now() - 4200000, likes: 4, replies: [] }, { id: 'c5', author: 'Gabriel Oliveira', initial: 'G', text: 'Ansioso para as próximas discussões.', createdAt: Date.now() - 3600000, likes: 2, replies: [] }] },
    { id: 'seed-2', author: 'Carlos Eduardo', initial: 'C', color: 'blue', category: 'duvidas', text: 'Como vocês identificam um e-mail de phishing? Tenho recebido mensagens cada vez mais convincentes no trabalho.', likes: 37, views: 186, likedBy: [], createdAt: Date.now() - 18000000, comments: [{ id: 'c6', author: 'Juliana Lima', initial: 'J', text: 'Eu sempre verifico o domínio do remetente antes de clicar.', createdAt: Date.now() - 16000000, likes: 7, replies: [] }, { id: 'c7', author: 'Rafael Almeida', initial: 'R', text: 'Passo o mouse no link para conferir o endereço real.', createdAt: Date.now() - 15000000, likes: 5, replies: [] }, { id: 'c8', author: 'Camila Rodrigues', initial: 'C', text: 'Também fico atento a erros de português e mensagens muito urgentes.', createdAt: Date.now() - 14000000, likes: 9, replies: [{ id: 'r3', author: 'Carlos Eduardo', initial: 'C', text: 'Boa! A urgência é mesmo um sinal clássico.', createdAt: Date.now() - 13000000, likes: 2, replies: [] }] }] },
    { id: 'seed-3', author: 'Mariana Costa', initial: 'M', color: 'pink', category: 'tutoriais', text: 'Guia rápido: ative a autenticação em dois fatores, revise as sessões ativas e guarde os códigos de recuperação em local seguro.', likes: 63, views: 312, likedBy: [], createdAt: Date.now() - 86400000, comments: [{ id: 'c9', author: 'Bruno Ferreira', initial: 'B', text: 'Uso um aplicativo autenticador e nunca mais tive problemas.', createdAt: Date.now() - 80000000, likes: 4, replies: [] }, { id: 'c10', author: 'Ana Silva', initial: 'A', text: 'Ótimo passo a passo. Os códigos de recuperação são esquecidos por muita gente.', createdAt: Date.now() - 76000000, likes: 3, replies: [] }, { id: 'c11', author: 'Lucas Martins', initial: 'L', text: 'Funciona também para contas corporativas?', createdAt: Date.now() - 70000000, likes: 2, replies: [{ id: 'r4', author: 'Mariana Costa', initial: 'M', text: 'Sim, e recomendo usar uma política centralizada para a equipe.', createdAt: Date.now() - 65000000, likes: 4, replies: [] }] }] },
    { id: 'seed-4', author: 'João Pedro', initial: 'J', color: 'blue', category: 'projetos', text: 'Estou montando um checklist de segurança para pequenos negócios: backup, atualizações, permissões e treinamento contra engenharia social.', likes: 48, views: 229, likedBy: [], createdAt: Date.now() - 110000000, comments: [{ id: 'c12', author: 'Fernanda Souza', initial: 'F', text: 'Inclua um plano para testar a restauração do backup.', createdAt: Date.now() - 105000000, likes: 8, replies: [] }, { id: 'c13', author: 'Gabriel Oliveira', initial: 'G', text: 'Posso contribuir com a parte de redes Wi-Fi.', createdAt: Date.now() - 100000000, likes: 3, replies: [] }] },
    { id: 'seed-5', author: 'Lucas Martins', initial: 'L', color: 'blue', category: 'noticias', text: 'Nova campanha de golpes usa falsas vagas de emprego para coletar documentos. Desconfiem de pedidos de pagamento ou dados bancários antes da entrevista.', likes: 76, views: 504, likedBy: [], createdAt: Date.now() - 172800000, comments: [{ id: 'c14', author: 'Beatriz Santos', initial: 'B', text: 'Minha prima recebeu algo parecido. Denunciamos o número.', createdAt: Date.now() - 160000000, likes: 6, replies: [] }, { id: 'c15', author: 'Rafael Almeida', initial: 'R', text: 'Boa lembrança. Empresas sérias não cobram para participar de seleção.', createdAt: Date.now() - 150000000, likes: 11, replies: [] }] },
    { id: 'seed-6', author: 'Fernanda Souza', initial: 'F', color: 'pink', category: 'geral', text: 'Alguém aqui usa VPN no Wi-Fi público? Quais cuidados vocês tomam além de evitar acessar o banco?', likes: 29, views: 143, likedBy: [], createdAt: Date.now() - 210000000, comments: [{ id: 'c16', author: 'Camila Rodrigues', initial: 'C', text: 'Uso VPN, mas também desativo o compartilhamento de arquivos.', createdAt: Date.now() - 200000000, likes: 4, replies: [] }, { id: 'c17', author: 'Bruno Ferreira', initial: 'B', text: 'E mantenho a conexão automática a redes Wi-Fi desligada.', createdAt: Date.now() - 190000000, likes: 5, replies: [] }] },
    { id: 'seed-7', author: 'Gabriel Oliveira', initial: 'G', color: 'blue', category: 'tutoriais', text: 'Três sinais de que seu dispositivo pode estar infectado por malware: bateria drenando rápido, anúncios estranhos e aplicativos desconhecidos.', likes: 54, views: 275, likedBy: [], createdAt: Date.now() - 250000000, comments: [{ id: 'c18', author: 'Juliana Lima', initial: 'J', text: 'Verificar as permissões dos aplicativos também ajuda bastante.', createdAt: Date.now() - 240000000, likes: 7, replies: [] }] },
    { id: 'seed-8', author: 'Beatriz Santos', initial: 'B', color: 'pink', category: 'duvidas', text: 'Como vocês organizam senhas sem repetir? Estou pensando em começar a usar um gerenciador.', likes: 41, views: 198, likedBy: [], createdAt: Date.now() - 280000000, comments: [{ id: 'c19', author: 'Ana Silva', initial: 'A', text: 'Gerenciador é o caminho. Use uma senha mestra longa e 2FA.', createdAt: Date.now() - 270000000, likes: 9, replies: [] }, { id: 'c20', author: 'Carlos Eduardo', initial: 'C', text: 'Comece pelas contas mais importantes e vá migrando aos poucos.', createdAt: Date.now() - 260000000, likes: 6, replies: [] }] },
    { id: 'seed-9', author: 'Rafael Almeida', initial: 'R', color: 'blue', category: 'projetos', text: 'Compartilho uma rotina para proteger arquivos de trabalho: backup 3-2-1, criptografia e revisão mensal das permissões.', likes: 32, views: 167, likedBy: [], createdAt: Date.now() - 320000000, comments: [{ id: 'c21', author: 'João Pedro', initial: 'J', text: 'A regra 3-2-1 salvou nosso projeto depois de um incidente.', createdAt: Date.now() - 310000000, likes: 5, replies: [] }] },
    { id: 'seed-10', author: 'Juliana Lima', initial: 'J', color: 'pink', category: 'noticias', text: 'LGPD na prática: limitar o acesso aos dados pessoais é tão importante quanto armazená-los com segurança.', likes: 68, views: 389, likedBy: [], createdAt: Date.now() - 360000000, comments: [{ id: 'c22', author: 'Mariana Costa', initial: 'M', text: 'E documentar a finalidade do uso evita muitos problemas.', createdAt: Date.now() - 350000000, likes: 8, replies: [] }, { id: 'c23', author: 'Lucas Martins', initial: 'L', text: 'Treinamento da equipe precisa entrar nessa rotina.', createdAt: Date.now() - 340000000, likes: 4, replies: [] }] },
    { id: 'seed-11', author: 'Bruno Ferreira', initial: 'B', color: 'blue', category: 'geral', text: 'Atualizem seus celulares: correções de segurança protegem contra falhas que já estão sendo exploradas.', likes: 22, views: 111, likedBy: [], createdAt: Date.now() - 400000000, comments: [] },
    { id: 'seed-12', author: 'Camila Rodrigues', initial: 'C', color: 'pink', category: 'duvidas', text: 'Recebi uma mensagem pedindo o código do WhatsApp. Lembrete: código de verificação nunca deve ser compartilhado.', likes: 87, views: 612, likedBy: [], createdAt: Date.now() - 450000000, comments: [{ id: 'c24', author: 'Fernanda Souza', initial: 'F', text: 'Esse golpe está muito comum. Ativem o PIN da verificação em duas etapas.', createdAt: Date.now() - 440000000, likes: 12, replies: [] }] }
  ];
  seedPosts[0].comments.push(
    { id: 'c25', author: 'Rafael Almeida', initial: 'R', text: 'Já estou acompanhando e vou trazer um caso de engenharia social.', createdAt: Date.now() - 3000000, likes: 3, replies: [] },
    { id: 'c26', author: 'Juliana Lima', initial: 'J', text: 'A troca de experiências deixa todos mais preparados.', createdAt: Date.now() - 2500000, likes: 5, replies: [] },
    { id: 'c27', author: 'Bruno Ferreira', initial: 'B', text: 'Sugiro uma conversa sobre segurança no ambiente de trabalho.', createdAt: Date.now() - 2000000, likes: 4, replies: [] },
    { id: 'c28', author: 'Camila Rodrigues', initial: 'C', text: 'Ótima sugestão, Bruno. Podemos começar por senhas e backups.', createdAt: Date.now() - 1500000, likes: 6, replies: [] },
    { id: 'c29', author: 'Gabriel Oliveira', initial: 'G', text: 'Comunidade forte é comunidade que pergunta sem medo.', createdAt: Date.now() - 1000000, likes: 7, replies: [] }
  );
  seedPosts[2].comments.push(
    { id: 'c30', author: 'Rafael Almeida', initial: 'R', text: 'Ativei em todas as contas depois de perder acesso a uma delas.', createdAt: Date.now() - 60000000, likes: 3, replies: [] },
    { id: 'c31', author: 'Camila Rodrigues', initial: 'C', text: 'Também vale revisar os dispositivos conectados de tempos em tempos.', createdAt: Date.now() - 55000000, likes: 2, replies: [] }
  );
  seedPosts[3].comments.push(
    { id: 'c32', author: 'Ana Silva', initial: 'A', text: 'Posso ajudar revisando o checklist.', createdAt: Date.now() - 95000000, likes: 4, replies: [] },
    { id: 'c33', author: 'Juliana Lima', initial: 'J', text: 'Inclua também a remoção de acessos de ex-colaboradores.', createdAt: Date.now() - 90000000, likes: 5, replies: [] },
    { id: 'c34', author: 'Beatriz Santos', initial: 'B', text: 'Um treinamento curto contra engenharia social seria ótimo.', createdAt: Date.now() - 85000000, likes: 6, replies: [] },
    { id: 'c35', author: 'Gabriel Oliveira', initial: 'G', text: 'E uma lista de contatos para incidentes.', createdAt: Date.now() - 80000000, likes: 2, replies: [] },
    { id: 'c36', author: 'Fernanda Souza', initial: 'F', text: 'A política de atualização automática pode entrar na parte de dispositivos.', createdAt: Date.now() - 75000000, likes: 3, replies: [] },
    { id: 'c37', author: 'Carlos Eduardo', initial: 'C', text: 'Quando terminar, compartilhe o modelo com a comunidade.', createdAt: Date.now() - 70000000, likes: 8, replies: [] }
  );
  const storedPosts = JSON.parse(localStorage.getItem('communityPosts') || 'null');
  let posts = storedPosts && storedPosts.length >= 10 ? storedPosts : seedPosts;
  let activeCategory = 'Todos';
  let activeView = 'feed';
  let activity = OlhoDigitalAccount.getActivity(user);
  const savedPosts = new Set(activity.community.saves.map((entry) => entry.id));
  const getName = () => user.name || 'Usuário';
  let currentUserAvatarUrl = user.photo || user.avatar || '';
  const escapeHtml = (value) => String(value).replace(/[&<>'"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char]));
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
  const track = (area, action, item) => {
    try {
      OlhoDigitalAccount.trackActivity(user, area, action, item);
      activity = OlhoDigitalAccount.getActivity(user);
    } catch (error) {
      console.error('Não foi possível salvar sua atividade neste navegador.', error);
      window.alert('Não foi possível salvar esta interação. Verifique o espaço disponível neste navegador.');
    }
  };
  const untrack = (area, action, id) => {
    try {
      OlhoDigitalAccount.removeActivity(user, area, action, id);
      activity = OlhoDigitalAccount.getActivity(user);
    } catch (error) {
      console.error('Não foi possível atualizar sua atividade neste navegador.', error);
      window.alert('Não foi possível atualizar esta interação neste navegador.');
    }
  };
  const timeAgo = (date) => { const minutes = Math.max(1, Math.floor((Date.now() - date) / 60000)); return minutes < 60 ? `Há ${minutes} min` : minutes < 1440 ? `Há ${Math.floor(minutes / 60)} h` : `Há ${Math.floor(minutes / 1440)} d`; };
  const label = (key) => categories.find((item) => categoryKeys[item] === key) || key;
  const initials = (name) => (name || 'U').charAt(0).toUpperCase();
  const memberAvatarMarkup = (name) => avatarMarkup(name, initials(name), 'blue');
  const femaleNames = new Set(['Ana Silva', 'Mariana Costa', 'Fernanda Souza', 'Beatriz Santos', 'Juliana Lima', 'Camila Rodrigues']);
  const maleNames = new Set(['Carlos Eduardo', 'João Pedro', 'Lucas Martins', 'Gabriel Oliveira', 'Rafael Almeida', 'Bruno Ferreira']);
  const avatarGender = (name) => femaleNames.has(name) ? 'female' : maleNames.has(name) ? 'male' : 'neutral';
  const avatarUrl = (name) => { if (name === getName() && currentUserAvatarUrl) return currentUserAvatarUrl; return `https://api.dicebear.com/9.x/adventurer/svg?seed=${encodeURIComponent(name)}&gender=${avatarGender(name)}`; };
  const avatarMarkup = (name, initial, color = 'blue') => `<span class="avatar ${color}"><img src="${escapeHtml(avatarUrl(name))}" data-avatar-name="${escapeHtml(name)}" alt="Foto de ${escapeHtml(name)}" onerror="this.remove(); this.parentElement.classList.add('avatar-fallback')"><b>${escapeHtml(initial)}</b></span>`;
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

  const profileToggle = document.getElementById('profileToggle');
  const profileDropdown = document.getElementById('profileDropdown');
  const closeProfileMenu = () => {
    profileDropdown.hidden = true;
    profileToggle.setAttribute('aria-expanded', 'false');
  };
  profileToggle.addEventListener('click', () => {
    profileDropdown.hidden = !profileDropdown.hidden;
    profileToggle.setAttribute('aria-expanded', String(!profileDropdown.hidden));
  });
  document.addEventListener('click', (event) => {
    if (!profileToggle.contains(event.target) && !profileDropdown.contains(event.target)) closeProfileMenu();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !profileDropdown.hidden) {
      closeProfileMenu();
      profileToggle.focus();
    }
  });
  document.querySelectorAll('.category-link').forEach((button) => button.classList.toggle('active', button.dataset.filter === 'Todos'));
  OlhoDigitalAccount.getAvatar(user).then((avatar) => {
    if (!avatar?.blob) return;
    currentUserAvatarUrl = URL.createObjectURL(avatar.blob);
    document.querySelectorAll('.avatar img[data-avatar-name]').forEach((image) => {
      if (image.dataset.avatarName === getName()) image.src = currentUserAvatarUrl;
    });
  }).catch(() => {
    console.error('Não foi possível carregar a foto de perfil salva da conta atual.');
  });

  const renderComment = (comment, postId, parentId = '') => `<div class="comment">${avatarMarkup(comment.author, comment.initial)}<div class="comment-body"><div class="comment-head"><strong>${escapeHtml(comment.author)}</strong><small>${timeAgo(comment.createdAt)}</small></div><p>${escapeHtml(comment.text)}</p><div class="comment-tools"><button data-reply="${postId}" data-parent="${parentId || comment.id}">Responder</button>${comment.author === getName() ? `<button data-delete-comment="${postId}" data-comment="${comment.id}" data-parent="${parentId}">Excluir</button>` : ''}</div>${(comment.replies || []).map((reply) => renderComment(reply, postId, comment.id)).join('')}<div class="reply-form" data-reply-form="${comment.id}"><div class="community-field"><textarea data-content-limit="${contentLimits.reply}" placeholder="Escreva uma resposta..."></textarea><div class="community-field-meta"><small data-character-count>0 / 1.000 caracteres</small><small class="community-field-error" data-field-error role="alert" aria-live="polite"></small></div></div><button type="button" data-send-reply="${postId}" data-parent="${comment.id}">Enviar</button></div></div></div>`;
  const render = () => {
    const query = document.getElementById('communitySearch').value.trim().toLowerCase();
    if (activeView === 'membros') {
      const members = registeredMembers.filter((member) => member.name.toLowerCase().includes(query));
      document.getElementById('feed').innerHTML = '<h2 class="view-heading">Membros cadastrados neste navegador</h2><p class="settings-help">A lista contém somente as contas salvas localmente neste navegador; e-mails não são exibidos.</p>' +
        (members.length
          ? `<div class="member-directory">${members.map((member) => `<article class="member-directory-card panel">${memberAvatarMarkup(member.name)}<div><strong>${escapeHtml(member.name)}</strong><small>${member.email.toLowerCase() === user.email.toLowerCase() ? 'Você' : 'Membro'}</small></div></article>`).join('')}</div>`
          : '<div class="empty-state panel"><strong>Nenhum membro encontrado.</strong><span>Experimente outro nome na busca.</span></div>');
      return;
    }
    let visible = posts.filter((post) => (activeCategory === 'Todos' || post.category === activeCategory) && (!query || `${post.author} ${post.category} ${label(post.category)} ${post.text}`.toLowerCase().includes(query)));
    let heading = '';
    if (activeView === 'salvos') { visible = visible.filter((post) => savedPosts.has(post.id)); heading = '<h2 class="view-heading">Publicações salvas</h2>'; }
    if (activeView === 'discussoes') { visible = visible.filter((post) => post.category === 'duvidas' || post.comments.length >= 3); heading = '<h2 class="view-heading">Discussões da comunidade</h2>'; }
    document.getElementById('feed').innerHTML = heading + (visible.length ? visible.map((post) => { post.likedBy = post.likedBy || []; post.comments = post.comments || []; return `<article class="post-card panel ${post.featured ? 'featured' : ''}" data-post="${post.id}">${post.featured ? '<span class="featured-label">📌 PUBLICAÇÃO EM DESTAQUE</span>' : ''}<div class="post-meta"><div class="author">${avatarMarkup(post.author, post.initial, post.color || 'blue')}<div><strong>${escapeHtml(post.author)}</strong><small>${timeAgo(post.createdAt)}</small></div></div><div><span class="tag ${post.category}">${label(post.category)}</span>${post.author === getName() ? `<button class="post-menu" data-delete-post="${post.id}" aria-label="Excluir publicação">⋯</button>` : ''}</div></div><p>${escapeHtml(post.text)}</p>${post.image ? `<img class="post-image" src="${post.image}" alt="Imagem da publicação">` : ''}<div class="post-stats"><span>♡ ${post.likes} curtidas</span><span>◉ ${post.views || 0} visualizações</span><span>💬 ${post.comments.length} comentários</span></div><div class="post-actions"><button class="${post.likedBy.includes(getName()) ? 'active' : ''}" data-like="${post.id}">👍 Curtir</button><button data-comments="${post.id}">💬 Comentar</button><button class="${savedPosts.has(post.id) ? 'saved' : ''}" data-save="${post.id}">${savedPosts.has(post.id) ? '🔖 Salvo' : '🔖 Salvar'}</button></div><div class="comments" data-comments-box="${post.id}">${post.comments.map((comment) => renderComment(comment, post.id)).join('')}<form class="comment-form" data-comment-form="${post.id}"><div class="community-field"><textarea data-content-limit="${contentLimits.comment}" placeholder="Escreva um comentário..."></textarea><div class="community-field-meta"><small data-character-count>0 / 1.000 caracteres</small><small class="community-field-error" data-field-error role="alert" aria-live="polite"></small></div></div><button type="submit">Enviar</button></form></div></article>`; }).join('') : '<div class="empty-state panel"><strong>Nenhuma publicação encontrada.</strong><span>Tente outra categoria ou palavra-chave.</span></div>');
  };
  render();

  document.addEventListener('click', (event) => {
    const filter = event.target.closest('[data-filter]');
    if (filter) { activeCategory = filter.dataset.filter; activeView = 'feed'; document.querySelectorAll('[data-view]').forEach((item) => item.classList.toggle('active', item.dataset.view === 'feed')); document.querySelectorAll('.category-link').forEach((button) => button.classList.toggle('active', button.dataset.filter === activeCategory)); render(); return; }
    const like = event.target.closest('[data-like]');
    if (like) { const post = posts.find((item) => item.id === like.dataset.like); const liked = post.likedBy.includes(getName()); const originalLikedBy = [...post.likedBy]; const originalLikes = post.likes; post.likedBy = liked ? post.likedBy.filter((name) => name !== getName()) : [...post.likedBy, getName()]; post.likes += liked ? -1 : 1; if (!save()) { post.likedBy = originalLikedBy; post.likes = originalLikes; return; } if (liked) untrack('community', 'likes', post.id); else track('community', 'likes', { id: post.id, category: label(post.category) }); render(); return; }
    const comments = event.target.closest('[data-comments]');
    if (comments) { document.querySelector(`[data-comments-box="${comments.dataset.comments}"]`).classList.toggle('open'); return; }
    const saveButton = event.target.closest('[data-save]');
    if (saveButton) { const post = posts.find((item) => item.id === saveButton.dataset.save); if (savedPosts.has(post.id)) { savedPosts.delete(post.id); untrack('community', 'saves', post.id); } else { savedPosts.add(post.id); track('community', 'saves', { id: post.id, category: label(post.category) }); } render(); return; }
    const view = event.target.closest('[data-view]');
    if (view) { activeView = view.dataset.view; activeCategory = ['duvidas', 'tutoriais', 'projetos', 'noticias'].includes(activeView) ? activeView : 'Todos'; document.querySelectorAll('[data-view]').forEach((item) => item.classList.toggle('active', item === view)); document.querySelectorAll('[data-filter]').forEach((item) => item.classList.toggle('active', item.dataset.filter === activeCategory)); render(); return; }
    const reply = event.target.closest('[data-reply]');
    if (reply) { document.querySelector(`[data-reply-form="${reply.dataset.parent}"]`).classList.toggle('open'); return; }
    const deletePost = event.target.closest('[data-delete-post]');
    if (deletePost && confirm('Excluir esta publicação?')) { const index = posts.findIndex((post) => post.id === deletePost.dataset.deletePost); const [removedPost] = posts.splice(index, 1); if (!save()) { posts.splice(index, 0, removedPost); return; } render(); return; }
    const deleteComment = event.target.closest('[data-delete-comment]');
    if (deleteComment && confirm('Excluir este comentário?')) { const post = posts.find((item) => item.id === deleteComment.dataset.deleteComment); const originalComments = post.comments; const remove = (list) => list.filter((item) => item.id !== deleteComment.dataset.comment).map((item) => ({ ...item, replies: remove(item.replies || []) })); post.comments = remove(post.comments); if (!save()) { post.comments = originalComments; return; } render(); }
  });
  document.addEventListener('input', (event) => {
    const field = event.target.closest('[data-content-limit]');
    if (!field) return;
    updateCharacterCount(field);
    setFieldError(field, '');
  });
  document.addEventListener('submit', (event) => {
    const form = event.target;
    if (!form.matches('[data-comment-form]')) return;
    event.preventDefault();
    const post = posts.find((item) => item.id === form.dataset.commentForm);
    const field = form.querySelector('[data-content-limit]');
    const text = validateSubmission(field, 'comment', 'comment');
    if (!post || !text) return;
    const id = `c-${Date.now()}`;
    post.comments.push({ id, author: getName(), initial: initials(getName()), text, createdAt: Date.now(), replies: [] });
    if (!save()) {
      post.comments.pop();
      releaseDuplicateSubmission(text, 'comment');
      return;
    }
    track('community', 'comments', { id, postId: post.id, kind: 'Comentário' });
    render();
    document.querySelector(`[data-comments-box="${post.id}"]`).classList.add('open');
  });
  document.addEventListener('click', (event) => {
    const send = event.target.closest('[data-send-reply]');
    if (!send) return;
    const field = send.parentElement.querySelector('[data-content-limit]');
    const post = posts.find((item) => item.id === send.dataset.sendReply);
    if (!post) return;
    const locate = (list) => {
      for (const item of list) {
        if (item.id === send.dataset.parent) return item;
        const found = locate(item.replies || []);
        if (found) return found;
      }
      return null;
    };
    const comment = locate(post.comments);
    const text = validateSubmission(field, 'reply', `reply:${send.dataset.parent}`);
    if (!comment || !text) return;
    const id = `r-${Date.now()}`;
    comment.replies.push({ id, author: getName(), initial: initials(getName()), text, createdAt: Date.now(), likes: 0, replies: [] });
    if (!save()) {
      comment.replies.pop();
      releaseDuplicateSubmission(text, `reply:${send.dataset.parent}`);
      return;
    }
    track('community', 'comments', { id, postId: post.id, kind: 'Resposta' });
    render();
    document.querySelector(`[data-comments-box="${post.id}"]`).classList.add('open');
  });
  document.getElementById('communitySearch').addEventListener('input', render);

  const modal = document.getElementById('composerModal'); const imageInput = document.getElementById('postImage'); let imageData = '';
  const openComposer = () => { modal.hidden = false; document.getElementById('newPost').focus(); }; document.getElementById('openComposerSidebar').onclick = openComposer; document.getElementById('closeComposer').onclick = () => { modal.hidden = true; };
  let imageProcessing = false;
  let imageValidationId = 0;
  const imageError = document.getElementById('imageError');
  const imagePreview = document.getElementById('imagePreview');
  const setImageError = (message) => { imageError.textContent = message; };
  const readAsDataUrl = (blob) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error('Não foi possível ler a imagem.'));
    reader.readAsDataURL(blob);
  });
  const prepareImage = async (file) => {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, 1600 / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement('canvas');
    canvas.width = Math.max(1, Math.round(bitmap.width * scale));
    canvas.height = Math.max(1, Math.round(bitmap.height * scale));
    canvas.getContext('2d').drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    bitmap.close();
    const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/webp', 0.82));
    if (!blob) throw new Error('Não foi possível processar a imagem.');
    return readAsDataUrl(file.size > 2.5 * 1024 * 1024 ? blob : file);
  };
  imageInput.onchange = async () => {
    const validationId = ++imageValidationId;
    const file = imageInput.files[0];
    imageData = '';
    imageProcessing = false;
    imagePreview.hidden = true;
    imagePreview.removeAttribute('src');
    setImageError('');
    document.getElementById('imageName').textContent = file ? file.name : 'Nenhuma imagem selecionada';
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      setImageError('A imagem deve ter no máximo 5 MB.');
      imageInput.value = '';
      document.getElementById('imageName').textContent = 'Nenhuma imagem selecionada';
      return;
    }
    imageProcessing = true;
    setImageError('Validando imagem...');
    try {
      const signature = new Uint8Array(await file.slice(0, 12).arrayBuffer());
      if (imageInput.files[0] !== file || imageValidationId !== validationId) return;
      if (!CommunityValidation.imageTypeFromBytes(signature)) {
        throw new Error('Formato não permitido. Envie uma imagem JPEG, PNG ou WebP válida.');
      }
      imageData = await prepareImage(file);
      if (imageInput.files[0] !== file || imageValidationId !== validationId) {
        imageData = '';
        return;
      }
      imagePreview.src = imageData;
      imagePreview.hidden = false;
      setImageError('');
    } catch (error) {
      if (imageInput.files[0] === file && imageValidationId === validationId) {
        imageInput.value = '';
        document.getElementById('imageName').textContent = 'Nenhuma imagem selecionada';
        setImageError(error.message.includes('Formato não permitido')
          ? error.message
          : 'Não foi possível validar ou processar a imagem. Escolha outro arquivo JPEG, PNG ou WebP.');
      }
    } finally {
      if (imageValidationId === validationId) imageProcessing = false;
    }
  };
  const newPostField = document.getElementById('newPost');
  document.getElementById('publishBtn').onclick = () => {
    if (imageProcessing) {
      setImageError('Aguarde a validação da imagem antes de publicar.');
      return;
    }
    const text = validateSubmission(newPostField, 'publication', 'publication');
    if (!text) return;
    const post = { id: `p-${Date.now()}`, author: getName(), initial: initials(getName()), color: 'blue', category: document.getElementById('postType').value, text, image: imageData, likes: 0, likedBy: [], createdAt: Date.now(), comments: [] };
    posts.unshift(post);
    if (!save()) {
      posts.shift();
      releaseDuplicateSubmission(text, 'publication');
      return;
    }
    render();
    modal.hidden = true;
    newPostField.value = '';
    updateCharacterCount(newPostField);
    imageData = '';
    imageInput.value = '';
    imagePreview.hidden = true;
    imagePreview.removeAttribute('src');
    document.getElementById('imageName').textContent = 'Nenhuma imagem selecionada';
    setImageError('');
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
});
