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
    localStorage.removeItem('user');
    sessionStorage.clear();
    window.location.replace('./login.html');
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

  const activity = OlhoDigitalAccount.getActivity(user);
  renderActivityList('communityLikes', activity.community.likes, 'Você ainda não curtiu publicações.');
  renderActivityList('communitySaves', activity.community.saves, 'Você ainda não salvou publicações.');
  renderActivityList('communityComments', activity.community.comments, 'Você ainda não comentou ou respondeu publicações.', (entry) => entry.kind || 'Comentário');
  renderActivityList('newsComments', activity.news.comments, 'Você ainda não comentou notícias.', (entry) => entry.kind || 'Comentário');
  renderActivityList('learningVideos', activity.learning.videos, 'Você ainda não iniciou videoaulas.', (entry) => entry.status === 'completed' ? 'Concluída' : 'Em andamento');

  const communityCount = activity.community.likes.length + activity.community.saves.length + activity.community.comments.length;
  document.getElementById('communityActivityCount').textContent = communityCount;
  document.getElementById('newsActivityCount').textContent = activity.news.comments.length;
  document.getElementById('learningActivityCount').textContent = activity.learning.videos.length;

  const tabs = [...document.querySelectorAll('[data-activity-tab]')];
  const selectionHints = {
    activityTabCommunity: 'Curtidas, itens salvos e conversas na comunidade.',
    activityTabNews: 'Comentários e respostas que você fez nas notícias.',
    activityTabLearning: 'Videoaulas que você marcou como em andamento ou concluídas.'
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
