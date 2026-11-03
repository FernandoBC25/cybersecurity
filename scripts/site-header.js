// Cabeçalho único do site (busca, notificações, perfil e logout) e barra lateral de navegação.
// Uso na página (logo depois do cabeçalho):
//   <header class="topbar site-topbar" data-site-header data-active="aprender"
//           data-search-id="learningSearch" data-search-placeholder="Buscar conteúdo..."></header>
//   <script src="./scripts/site-header.js"></script>
// Roda de forma síncrona para que os scripts da página já encontrem os elementos.
(function () {
  const root = new URL('../', document.currentScript.src);
  const url = (file) => new URL(file, root).href;

  // Barra lateral: faixa de ícones que se expande com os nomes ao passar o mouse (e vira
  // painel deslizante no celular). Os ícones são os mesmos da versão antiga do site.
  const SIDEBAR = [
    { key: 'home', label: 'Início', file: 'home.html', icon: '<svg class="house-icon" viewBox="0 0 24 24"><path d="m3 10 9-7 9 7M5.5 8.5V21h13V8.5M9.5 21v-6h5v6" /></svg>' },
    { key: 'aprender', label: 'Aprender', file: 'aprender.html', icon: '<svg viewBox="0 0 24 24"><path d="M12 6.5C9.2 4.7 6.2 4.7 3.5 5.8v13c2.7-1.1 5.7-1.1 8.5.7m0-13c2.8-1.8 5.8-1.8 8.5-.7v13c-2.7-1.1-5.7-1.1-8.5.7m0-13v13" /></svg>' },
    { key: 'noticias', label: 'Notícias', file: 'noticias.html', icon: '<svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M8 4v16M11 9h7M11 13h7M11 17h4" /></svg>' },
    { key: 'comunidade', label: 'Comunidade', file: 'comunidade.html', icon: '<svg viewBox="0 0 24 24"><circle cx="9" cy="8" r="3" /><path d="M3.5 19v-1.5a5.5 5.5 0 0 1 11 0V19zM16 5.5a3 3 0 0 1 0 5.8M17 14a4.5 4.5 0 0 1 3.5 4.4V19H17" /></svg>' }
  ];
  const SETTINGS = { key: 'configuracoes', label: 'Configurações', file: 'configuracoes.html', icon: '⚙' };

  const PROFILE_LINKS = [
    { label: 'Meu perfil', file: 'atividade.html' },
    { label: 'Configurações', file: 'configuracoes.html' },
    { label: 'Foto de perfil', file: 'foto-perfil.html' }
  ];

  function renderLogoutDialog() {
    // Remove a versão antiga de cada página, para existir um único diálogo com IDs fixos.
    document.querySelectorAll('#logoutDialog, #courseLogoutDialog').forEach((node) => node.remove());
    const dialog = document.createElement('dialog');
    dialog.id = 'logoutDialog';
    dialog.className = 'site-logout-dialog';
    dialog.setAttribute('aria-labelledby', 'siteLogoutTitle');
    dialog.innerHTML = `
      <form method="dialog" class="site-logout-card">
        <h2 id="siteLogoutTitle">Deseja sair da sua conta?</h2>
        <p>Você está prestes a encerrar sua sessão no Olho Digital. Será necessário entrar novamente para acessar as áreas restritas. Suas configurações salvas serão mantidas.</p>
        <div class="site-logout-actions">
          <button class="site-logout-cancel" value="cancel">Cancelar</button>
          <button class="site-logout-confirm" id="siteLogoutConfirm" type="button">Sim, sair da conta</button>
        </div>
      </form>`;
    document.body.append(dialog);
    dialog.querySelector('#siteLogoutConfirm').addEventListener('click', () => {
      window.OlhoDigitalAuth?.signOut();
    });
    return dialog;
  }

  function render(host) {
    const active = host.dataset.active || '';
    const searchId = host.dataset.searchId;
    const logo = url('assets/logo.png');
    const logoDark = url('assets/logo-escuro-header.png');

    const profileHtml = PROFILE_LINKS.map((item) => `<a role="menuitem" href="${url(item.file)}">${item.label}</a>`).join('');

    const searchHtml = searchId
      ? `<label class="site-search" for="${searchId}"><span aria-hidden="true">⌕</span><input type="search" id="${searchId}" placeholder="${host.dataset.searchPlaceholder || 'Buscar...'}" /></label>`
      : '';

    host.classList.add('site-topbar');
    host.innerHTML = `
      <div class="site-nav-wrap">
        <button class="site-menu-toggle" id="siteMenuToggle" type="button" aria-label="Abrir menu" aria-expanded="false" aria-controls="siteSidebar"><span></span><span></span><span></span></button>
        <a class="site-brand" href="${url('home.html')}"><img src="${logo}" data-logo-light="${logo}" data-logo-dark="${logoDark}" alt="" /><span>Olho Digital</span></a>
        <div class="site-actions">
          ${searchHtml}
          <div class="site-popover-wrap">
            <button class="site-icon-btn" id="notificationToggle" type="button" aria-label="Notificações" aria-expanded="false" aria-controls="notificationDropdown">🔔</button>
            <section class="site-panel site-notifications" id="notificationDropdown" aria-label="Notificações" hidden>
              <strong>Notificações</strong>
              <p>O Olho Digital ainda não possui um serviço de envio de notificações.</p>
            </section>
          </div>
          <div class="site-popover-wrap">
            <button class="site-profile-btn" id="profileToggle" type="button" aria-expanded="false" aria-controls="profileDropdown">
              <span class="site-avatar" data-profile-avatar aria-hidden="true">U</span><span class="site-profile-name" id="profileName">Usuário</span><span class="site-chevron" aria-hidden="true">⌄</span>
            </button>
            <div class="site-panel site-profile-panel" id="profileDropdown" role="menu" hidden>
              ${profileHtml}
              <button role="menuitem" type="button" id="logoutBtn">Sair da conta</button>
            </div>
          </div>
        </div>
      </div>`;
  }

  function renderSidebar(active) {
    const link = (item, extra = '') => {
      const current = item.key === active ? ' is-active' : '';
      const aria = item.key === active ? ' aria-current="page"' : '';
      return `<a class="site-sidebar-link${extra}${current}" href="${url(item.file)}"${aria} title="${item.label}"><span aria-hidden="true">${item.icon}</span><b>${item.label}</b></a>`;
    };
    const aside = document.createElement('aside');
    aside.className = 'site-sidebar';
    aside.id = 'siteSidebar';
    aside.setAttribute('aria-label', 'Navegação');
    aside.innerHTML = `
      <div class="site-sidebar-mark" aria-hidden="true">
        <svg viewBox="0 0 32 32" focusable="false"><path d="M3 16c3.1-5.1 7.4-7.7 13-7.7s9.9 2.6 13 7.7c-3.1 5.1-7.4 7.7-13 7.7S6.1 21.1 3 16Z" /><circle cx="16" cy="16" r="4.4" /><circle class="eye-pupil" cx="16" cy="16" r="1.7" /></svg>
      </div>
      <nav class="site-sidebar-nav">${SIDEBAR.map((item) => link(item)).join('')}</nav>
      ${link(SETTINGS, ' site-sidebar-settings')}`;
    const backdrop = document.createElement('button');
    backdrop.className = 'site-sidebar-backdrop';
    backdrop.id = 'siteSidebarBackdrop';
    backdrop.type = 'button';
    backdrop.setAttribute('aria-label', 'Fechar menu');
    backdrop.hidden = true;
    document.body.classList.add('has-site-sidebar');
    document.body.append(aside, backdrop);
    return { aside, backdrop };
  }

  function wire(host, dialog, sidebar) {
    const menuToggle = host.querySelector('#siteMenuToggle');
    const { aside, backdrop } = sidebar;
    const popovers = [
      [host.querySelector('#notificationToggle'), host.querySelector('#notificationDropdown')],
      [host.querySelector('#profileToggle'), host.querySelector('#profileDropdown')]
    ];

    const closePopovers = (keepOpen) => {
      popovers.forEach(([toggle, panel]) => {
        if (toggle === keepOpen) return;
        panel.hidden = true;
        toggle.setAttribute('aria-expanded', 'false');
      });
    };

    const setMenu = (open) => {
      aside.classList.toggle('is-open', open);
      backdrop.hidden = !open;
      menuToggle.setAttribute('aria-expanded', String(open));
      menuToggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    };
    const closeMenu = () => setMenu(false);

    popovers.forEach(([toggle, panel]) => {
      toggle.addEventListener('click', () => {
        const open = panel.hidden;
        closePopovers(toggle);
        panel.hidden = !open;
        toggle.setAttribute('aria-expanded', String(open));
      });
    });

    menuToggle.addEventListener('click', () => setMenu(!aside.classList.contains('is-open')));
    backdrop.addEventListener('click', closeMenu);
    aside.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));

    host.querySelector('#logoutBtn').addEventListener('click', () => {
      closePopovers(null);
      // A página pode assumir o logout (ex.: alterações não salvas) devolvendo true.
      if (window.OlhoDigitalSiteHeader.onLogout?.()) return;
      dialog.showModal();
    });

    document.addEventListener('click', (event) => {
      if (!event.target.closest('.site-popover-wrap')) closePopovers(null);
    });
    document.addEventListener('keydown', (event) => {
      if (event.key !== 'Escape') return;
      closePopovers(null);
      closeMenu();
    });
  }

  function fillUser() {
    const user = window.OlhoDigitalAccount?.getCurrentUser?.();
    if (!user) return;
    const name = document.getElementById('profileName');
    if (name) name.textContent = user.name || 'Usuário';
    window.OlhoDigitalAccount.updateProfileAvatars?.(user);
  }

  const host = document.querySelector('[data-site-header]');
  if (host) {
    render(host);
    const active = host.dataset.active || (/configuracoes/.test(location.pathname) ? 'configuracoes' : '');
    const sidebar = renderSidebar(active);
    const dialog = renderLogoutDialog();
    wire(host, dialog, sidebar);
    document.addEventListener('DOMContentLoaded', fillUser);
  }

  window.OlhoDigitalSiteHeader = { render };
})();
