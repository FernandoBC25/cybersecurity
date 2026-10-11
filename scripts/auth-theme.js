(function () {
  const isDark = localStorage.getItem('olhoDigital.publicTheme') !== 'light';
  if (!isDark) document.documentElement.classList.add('auth-theme-light');

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-logo-light][data-logo-dark]').forEach((logo) => {
      logo.src = isDark ? logo.dataset.logoDark : logo.dataset.logoLight;
    });
  });
})();
