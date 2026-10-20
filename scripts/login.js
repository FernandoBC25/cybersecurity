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
  const submitButton = form.querySelector('button[type="submit"]');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    clearError();

    const email = emailInput?.value.trim() || '';
    // A senha não é "trimada": o cadastro salva exatamente o que foi digitado.
    const password = passwordInput?.value || '';

    if (!email || !password) {
      showError('Por favor, preencha todos os campos');
      return;
    }

    // Evita envios duplicados enquanto o Supabase responde.
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = 'Entrando...';
    }

    const { error } = await supabaseClient.auth.signInWithPassword({ email, password });

    if (error) {
      showError(error.message.includes('not confirmed') ? 'Confirme seu email antes de entrar' : 'Email ou senha incorretos');
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = 'Entrar';
      }
      return;
    }

    await OlhoDigitalData.hydrate();
    window.location.href = './home.html';
  });
}
