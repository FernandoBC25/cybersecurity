// Cabeçalho único do site: navegação, busca, notificações, perfil e logout.
// Uso na página (logo depois do cabeçalho):
//   <header class="topbar site-topbar" data-site-header data-active="aprender"
//           data-search-id="learningSearch" data-search-placeholder="Buscar conteúdo..."></header>
//   <script src="./scripts/site-header.js"></script>
// Roda de forma síncrona para que os scripts da página já encontrem os elementos.
(function () {
  const root = new URL('../', document.currentScript.src);
  const url = (file) => new URL(file, root).href;

  const NAV = [
    { key: 'home', label: 'Início', file: 'home.html' },
    { key: 'aprender', label: 'Aprender', file: 'aprender.html' },
    { key: 'noticias', label: 'Notícias', file: 'noticias.html' },
    { key: 'comunidade', label: 'Comunidade', file: 'comunidade.html' }
  ];

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

    const navHtml = NAV.map((item) => {
      const current = item.key === active ? ' class="is-active" aria-current="page"' : '';
      return `<a href="${url(item.file)}"${current}>${item.label}</a>`;
    }).join('');

    const profileHtml = PROFILE_LINKS.map((item) => `<a role="menuitem" href="${url(item.file)}">${item.label}</a>`).join('');

    const searchHtml = searchId
      ? `<label class="site-search" for="${searchId}"><span aria-hidden="true">⌕</span><input type="search" id="${searchId}" placeholder="${host.dataset.searchPlaceholder || 'Buscar...'}" /></label>`
      : '';

    host.classList.add('site-topbar');
    host.innerHTML = `
      <div class="site-nav-wrap">
        <button class="site-menu-toggle" id="siteMenuToggle" type="button" aria-label="Abrir menu" aria-expanded="false" aria-controls="siteNav"><span></span><span></span><span></span></button>
        <a class="site-brand" href="${url('home.html')}"><img src="${logo}" data-logo-light="${logo}" data-logo-dark="${logoDark}" alt="" /><span>Olho Digital</span></a>
        <nav class="site-nav" id="siteNav" aria-label="Menu principal">${navHtml}</nav>
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

  function wire(host, dialog) {
    const menuToggle = host.querySelector('#siteMenuToggle');
    const nav = host.querySelector('#siteNav');
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

    const closeMenu = () => {
      nav.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Abrir menu');
    };

    popovers.forEach(([toggle, panel]) => {
      toggle.addEventListener('click', () => {
        const open = panel.hidden;
        closePopovers(toggle);
        panel.hidden = !open;
        toggle.setAttribute('aria-expanded', String(open));
      });
    });

    menuToggle.addEventListener('click', () => {
      const open = !nav.classList.contains('is-open');
      nav.classList.toggle('is-open', open);
      menuToggle.setAttribute('aria-expanded', String(open));
      menuToggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    });
    nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));

    host.querySelector('#logoutBtn').addEventListener('click', () => {
      closePopovers(null);
      // A página pode assumir o logout (ex.: alterações não salvas) devolvendo true.
      if (window.OlhoDigitalSiteHeader.onLogout?.()) return;
      dialog.showModal();
    });

    document.addEventListener('click', (event) => {
      if (!event.target.closest('.site-popover-wrap')) closePopovers(null);
      if (!event.target.closest('.site-nav-wrap')) closeMenu();
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
    const dialog = renderLogoutDialog();
    wire(host, dialog);
    document.addEventListener('DOMContentLoaded', fillUser);
  }

  window.OlhoDigitalSiteHeader = { render };
})();
