document.addEventListener('DOMContentLoaded', () => {
  const user = OlhoDigitalAccount.requireAuthentication();
  if (!user) return;

  OlhoDigitalAccount.applySettings(OlhoDigitalAccount.getEffectiveSettings(user));
  OlhoDigitalAccount.updateProfileAvatars(user);
  OlhoDigitalAccount.initProfileMenu();
  const profileDropdown = document.getElementById('profileDropdown');
  document.getElementById('logoutBtn').addEventListener('click', () => {
    profileDropdown.hidden = true;
    document.getElementById('profileToggle').setAttribute('aria-expanded', 'false');
    document.getElementById('logoutDialog').showModal();
  });
  document.getElementById('confirmLogout').addEventListener('click', () => {
    OlhoDigitalAuth.signOut();
  });
  document.getElementById('activityUserName').textContent = user.name || 'Minha conta';
  document.getElementById('activityUserEmail').textContent = user.email;

  function renderActivityList(elementId, entries, emptyMessage, subtitleForEntry = () => '') {
    const list = document.getElementById(elementId);
    list.replaceChildren();
    if (!entries.length) {
      const empty = document.createElement('li');
      empty.className = 'activity-empty';
      empty.textContent = emptyMessage;
      list.append(empty);
      return;
    }

    entries.forEach((entry) => {
      const item = document.createElement('li');
      const title = document.createElement('strong');
      title.textContent = entry.title || 'Conteúdo';
      item.append(title);

      const subtitleText = subtitleForEntry(entry);
      if (subtitleText) {
        const subtitle = document.createElement('span');
        subtitle.textContent = ` — ${subtitleText}`;
        item.append(subtitle);
      }
      if (entry.text) {
        const detail = document.createElement('small');
        detail.textContent = entry.text;
        item.append(detail);
      }
      list.append(item);
    });
  }

  function renderCommunity(activity) {
    renderActivityList('communityLikes', activity.community.likes, 'Você ainda não curtiu publicações.');
    renderActivityList('communitySaves', activity.community.saves, 'Você ainda não salvou publicações.');
    renderActivityList('communityComments', activity.community.comments, 'Você ainda não comentou ou respondeu publicações.', (entry) => entry.kind || 'Comentário');
    document.getElementById('communityActivityCount').textContent =
      activity.community.likes.length + activity.community.saves.length + activity.community.comments.length;
  }

  // Publicações e comentários apagados (por você ou pelo autor) deixam de aparecer
  // aqui, e os registros que apontavam para eles são removidos da conta.
  async function pruneDeletedCommunityItems() {
    const [posts, comments] = await Promise.all([
      supabaseClient.from('posts').select('id'),
      supabaseClient.from('comentarios').select('id')
    ]);
    if (posts.error || comments.error) return;
    const postIds = new Set(posts.data.map((row) => row.id));
    const commentIds = new Set(comments.data.map((row) => row.id));
    const current = OlhoDigitalAccount.getActivity(user);
    const stale = [
      ...current.community.likes.filter((entry) => !postIds.has(entry.id)).map((entry) => ['likes', entry.id]),
      ...current.community.saves.filter((entry) => !postIds.has(entry.id)).map((entry) => ['saves', entry.id]),
      ...current.community.comments.filter((entry) => !commentIds.has(entry.id)).map((entry) => ['comments', entry.id])
    ];
    if (!stale.length) return;
    stale.forEach(([action, id]) => OlhoDigitalData.removeActivityEntry(user, 'community', action, id));
    renderCommunity(OlhoDigitalAccount.getActivity(user));
  }

  const activity = OlhoDigitalAccount.getActivity(user);
  renderCommunity(activity);
  pruneDeletedCommunityItems().catch((error) => console.error('Não foi possível conferir a atividade da comunidade.', error));
  renderActivityList('newsComments', activity.news.comments, 'Você ainda não comentou notícias.', (entry) => entry.kind || 'Comentário');
  // Cursos iniciados, a partir do progresso salvo (mais recentes primeiro).
  const savedCourses = OlhoDigitalData.getCourses(user);
  const learning = window.homeData.cursos
    .map((course) => ({ title: course.nome, ...savedCourses[course.chave] }))
    .filter((course) => course.started)
    .sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0));
  renderActivityList('learningVideos', learning, 'Você ainda não iniciou cursos.', (entry) => entry.progress >= 100
    ? `Concluído${entry.rating ? ` · nota ${entry.rating}/5` : ''}`
    : `Em andamento · ${entry.progress || 0}%`);

  document.getElementById('newsActivityCount').textContent = activity.news.comments.length;
  document.getElementById('learningActivityCount').textContent = learning.length;

  const tabs = [...document.querySelectorAll('[data-activity-tab]')];
  const selectionHints = {
    activityTabCommunity: 'Curtidas, itens salvos e conversas na comunidade.',
    activityTabNews: 'Comentários e respostas que você fez nas notícias.',
    activityTabLearning: 'Cursos que você começou ou concluiu.'
  };
  function selectTab(tab, moveFocus = false) {
    tabs.forEach((item) => {
      const selected = item === tab;
      item.setAttribute('aria-selected', String(selected));
      item.tabIndex = selected ? 0 : -1;
      document.getElementById(item.getAttribute('aria-controls')).hidden = !selected;
    });
    document.getElementById('activitySelectionHint').textContent = selectionHints[tab.id];
    if (moveFocus) tab.focus();
  }
  selectTab(tabs[0]);

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => selectTab(tab));
    tab.addEventListener('keydown', (event) => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      const nextIndex = event.key === 'Home'
        ? 0
        : event.key === 'End'
          ? tabs.length - 1
          : (index + (event.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length;
      selectTab(tabs[nextIndex], true);
    });
  });
});
