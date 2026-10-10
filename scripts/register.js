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

    const { data, error } = await supabaseClient.auth.signUp({
      email,
      password,
      options: { data: { name } }
    });

    if (error) {
      showError(error.message.includes('registered') ? 'Este email já está cadastrado' : error.message);
      return;
    }

    if (data.user && data.user.identities?.length === 0) {
      showError('Este email já está cadastrado');
      return;
    }

    await supabaseClient.auth.signOut();
    window.location.href = './login.html';
  });
}