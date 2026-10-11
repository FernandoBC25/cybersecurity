document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('header.topbar');
  if (!header) return;

  header.classList.add('course-topbar');
  header.innerHTML = `
    <div class="container course-nav-wrap">
      <button class="menu-toggle course-menu-toggle" id="courseMenuToggle" type="button" aria-label="Abrir navegação" aria-expanded="false" aria-controls="courseNavigation"><span></span><span></span><span></span></button>
      <a href="../../../home.html" class="brand"><img src="../../../assets/logo.png" data-logo-light="../../../assets/logo.png" data-logo-dark="../../../assets/logo-escuro-header.png" alt="" /><span>Olho Digital</span></a>
      <label class="search-box course-search" for="courseSearch"><span aria-hidden="true">⌕</span><input type="search" id="courseSearch" placeholder="Buscar neste curso..." /></label>
      <div class="nav-right">
        <div class="popover-wrap" data-content-setting="alerts">
          <button class="icon-btn" id="courseNotificationToggle" type="button" aria-label="Notificações" aria-expanded="false" aria-controls="courseNotificationDropdown">🔔</button>
          <section class="notification-dropdown" id="courseNotificationDropdown" aria-label="Notificações" hidden><strong>Notificações</strong><p>Você não tem notificações novas.</p></section>
        </div>
        <div class="profile-menu-wrap">
          <button class="profile-btn" id="profileToggle" type="button" aria-expanded="false" aria-controls="profileDropdown"><span class="avatar" id="profileAvatar" data-profile-avatar>U</span><span class="profile-name" id="profileName">Usuário</span><span class="profile-chevron" aria-hidden="true">⌄</span></button>
          <div class="profile-dropdown" id="profileDropdown" role="menu" hidden><a role="menuitem" href="../../../atividade.html">Meu perfil</a><a role="menuitem" href="../../../configuracoes.html">Configurações</a><a role="menuitem" href="../../../foto-perfil.html">Foto de perfil</a><button role="menuitem" type="button" id="courseLogoutButton">Sair da conta</button></div>
        </div>
      </div>
    </div>
    <nav class="course-navigation" id="courseNavigation" aria-label="Navegação do site" hidden><a href="../../../home.html">Início</a><a href="../../../aprender.html">Aprender</a><a href="../../../noticias.html">Notícias</a><a href="../../../comunidade.html">Comunidade</a></nav>
    <dialog class="learning-logout-dialog" id="courseLogoutDialog" aria-labelledby="courseLogoutTitle"><form method="dialog" class="learning-logout-card"><h2 id="courseLogoutTitle">Deseja sair da sua conta?</h2><p>Será necessário entrar novamente para acessar as áreas restritas. Suas configurações salvas serão mantidas.</p><div class="learning-logout-actions"><button class="learning-logout-cancel" value="cancel">Cancelar</button><button class="learning-logout-confirm" id="courseLogoutConfirm" type="button">Sim, sair da conta</button></div></form></dialog>`;

  const user = OlhoDigitalAccount.getCurrentUser();
  if (user) {
    document.getElementById('profileName').textContent = user.name || 'Usuário';
    OlhoDigitalAccount.updateProfileAvatars(user);
    OlhoDigitalAccount.initProfileMenu();
  }

  const menuToggle = document.getElementById('courseMenuToggle');
  const navigation = document.getElementById('courseNavigation');
  const notificationToggle = document.getElementById('courseNotificationToggle');
  const notificationDropdown = document.getElementById('courseNotificationDropdown');
  const profileToggle = document.getElementById('profileToggle');
  const profileDropdown = document.getElementById('profileDropdown');
  const logoutDialog = document.getElementById('courseLogoutDialog');
  const logoutButton = document.getElementById('courseLogoutButton');

  const closeNavigation = () => {
    navigation.hidden = true;
    menuToggle.setAttribute('aria-expanded', 'false');
  };
  menuToggle.addEventListener('click', () => {
    navigation.hidden = !navigation.hidden;
    menuToggle.setAttribute('aria-expanded', String(!navigation.hidden));
  });
  navigation.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeNavigation));

  notificationToggle.addEventListener('click', () => {
    notificationDropdown.hidden = !notificationDropdown.hidden;
    notificationToggle.setAttribute('aria-expanded', String(!notificationDropdown.hidden));
  });
  document.addEventListener('click', (event) => {
    if (!notificationToggle.contains(event.target) && !notificationDropdown.contains(event.target)) {
      notificationDropdown.hidden = true;
      notificationToggle.setAttribute('aria-expanded', 'false');
    }
    if (!menuToggle.contains(event.target) && !navigation.contains(event.target)) closeNavigation();
    if (!profileToggle.contains(event.target) && !profileDropdown.contains(event.target)) {
      profileDropdown.hidden = true;
      profileToggle.setAttribute('aria-expanded', 'false');
    }
  });
  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    closeNavigation();
    notificationDropdown.hidden = true;
    notificationToggle.setAttribute('aria-expanded', 'false');
    profileDropdown.hidden = true;
    profileToggle.setAttribute('aria-expanded', 'false');
  });

  logoutButton.addEventListener('click', () => {
    profileDropdown.hidden = true;
    profileToggle.setAttribute('aria-expanded', 'false');
    logoutDialog.showModal();
  });
  document.getElementById('courseLogoutConfirm').addEventListener('click', () => {
    localStorage.removeItem('user');
    sessionStorage.clear();
    window.location.replace('../../../login.html');
  });

  const search = document.getElementById('courseSearch');
  const searchableSections = document.querySelectorAll('main .content-section');
  let emptyMessage;
  search.addEventListener('input', () => {
    const query = search.value.trim().toLocaleLowerCase('pt-BR');
    let visibleSections = 0;
    searchableSections.forEach((section) => {
      const matches = !query || section.textContent.toLocaleLowerCase('pt-BR').includes(query);
      section.hidden = !matches;
      visibleSections += Number(matches);
    });
    if (!emptyMessage) {
      emptyMessage = document.createElement('p');
      emptyMessage.className = 'course-search-empty';
      emptyMessage.setAttribute('role', 'status');
      emptyMessage.textContent = 'Nenhum conteúdo encontrado nesta etapa.';
      document.querySelector('main.page-shell').append(emptyMessage);
    }
    emptyMessage.hidden = visibleSections > 0 || !query;
  });
});
