// Autenticação única do site, em cima da sessão do Supabase Auth.
// Carregar depois de supabase.min.js e supabase-config.js.
(function () {
  const baseUrl = new URL('../', document.currentScript.src);
  const loginUrl = new URL('login.html', baseUrl).href;
  const projectRef = new URL(SUPABASE_URL).hostname.split('.')[0];
  const sessionKey = `sb-${projectRef}-auth-token`;

  function toUser(supabaseUser) {
    if (!supabaseUser?.email) return null;
    return {
      id: supabaseUser.id,
      name: supabaseUser.user_metadata?.name || '',
      email: supabaseUser.email
    };
  }

  // Leitura síncrona da sessão que o próprio supabase-js guarda. Serve só para
  // desenhar a tela; a validação de verdade é feita por verifySession().
  function getCurrentUser() {
    try {
      const session = JSON.parse(localStorage.getItem(sessionKey) || 'null');
      return toUser(session?.user);
    } catch {
      return null;
    }
  }

  function goToLogin() {
    window.location.replace(loginUrl);
  }

  // Confere a sessão com o servidor do Supabase e expulsa quem não tem sessão válida.
  async function verifySession() {
    const { data, error } = await supabaseClient.auth.getUser();
    if (error || !data.user) {
      goToLogin();
      return null;
    }
    return toUser(data.user);
  }

  async function signOut() {
    await supabaseClient.auth.signOut();
    sessionStorage.clear();
    goToLogin();
  }

  async function changePassword(currentPassword, newPassword) {
    const user = getCurrentUser();
    if (!user) return { ok: false, reason: 'Sessão expirada. Entre novamente.' };
    const check = await supabaseClient.auth.signInWithPassword({ email: user.email, password: currentPassword });
    if (check.error) return { ok: false, reason: 'A senha atual não confere.' };
    const { error } = await supabaseClient.auth.updateUser({ password: newPassword });
    if (error) return { ok: false, reason: error.message };
    return { ok: true };
  }

  // Logout em outra aba, ou sessão revogada, derruba esta página também.
  supabaseClient.auth.onAuthStateChange((event) => {
    if (event === 'SIGNED_OUT' && !location.pathname.endsWith('/login.html') && !location.pathname.endsWith('/register.html')) {
      goToLogin();
    }
  });

  window.OlhoDigitalAuth = { getCurrentUser, goToLogin, verifySession, signOut, changePassword };
})();
