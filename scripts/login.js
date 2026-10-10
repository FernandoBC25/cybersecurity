const form = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const errorBox = document.getElementById('errorBox');

function showError(message) {
  if (!errorBox) return;
  errorBox.textContent = message;
  errorBox.classList.remove('hidden');
}

function clearError() {
  if (!errorBox) return;
  errorBox.textContent = '';
  errorBox.classList.add('hidden');
}

if (form) {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    clearError();

    const email = emailInput?.value.trim() || '';
    const password = passwordInput?.value.trim() || '';

    if (!email || !password) {
      showError('Por favor, preencha todos os campos');
      return;
    }

    const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password });

    if (error) {
      showError(error.message.includes('not confirmed') ? 'Confirme seu email antes de entrar' : 'Email ou senha incorretos');
      return;
    }

    const foundUser = data.user;
    localStorage.setItem('user', JSON.stringify({ name: foundUser.user_metadata?.name || '', email: foundUser.email }));
    window.location.href = './home.html';
  });
}
