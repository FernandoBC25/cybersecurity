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
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    clearError();

    const email = emailInput?.value.trim() || '';
    const password = passwordInput?.value.trim() || '';

    if (!email || !password) {
      showError('Por favor, preencha todos os campos');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const foundUser = users.find((user) => user.email === email && user.password === password);

    if (!foundUser) {
      showError('Email ou senha incorretos');
      return;
    }

    localStorage.setItem('user', JSON.stringify({ name: foundUser.name, email: foundUser.email }));
    window.location.href = './home.html';
  });
}
