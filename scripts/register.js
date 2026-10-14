const form = document.getElementById('registerForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');
const errorBox = document.getElementById('errorBox');

function showError(message) {
  errorBox.textContent = message;
  errorBox.classList.remove('hidden');
}

if (form) {
  const submitButton = form.querySelector('button[type="submit"]');

  // Restaura o botão quando o cadastro não é concluído, para o usuário poder tentar de novo.
  function resetSubmitButton() {
    if (!submitButton) return;
    submitButton.disabled = false;
    submitButton.textContent = 'Criar conta';
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    errorBox.classList.add('hidden');

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    if (!name || !email || !password || !confirmPassword) {
      showError('Por favor, preencha todos os campos');
      return;
    }

    if (password !== confirmPassword) {
      showError('As senhas não coincidem');
      return;
    }

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = 'Criando conta...';
    }

    const { data, error } = await supabaseClient.auth.signUp({
      email,
      password,
      options: { data: { name } }
    });

    if (error) {
      showError(error.message.includes('registered') ? 'Este email já está cadastrado' : error.message);
      resetSubmitButton();
      return;
    }

    if (data.user && data.user.identities?.length === 0) {
      showError('Este email já está cadastrado');
      resetSubmitButton();
      return;
    }

    await supabaseClient.auth.signOut();
    window.location.href = './login.html';
  });
}