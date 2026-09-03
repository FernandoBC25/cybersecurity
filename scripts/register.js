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
  form.addEventListener('submit', (event) => {
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

    const users = JSON.parse(localStorage.getItem('users') || '[]');

    if (users.some((user) => user.email === email)) {
      showError('Este email já está cadastrado');
      return;
    }

    users.push({ name, email, password });
    localStorage.setItem('users', JSON.stringify(users));
    window.location.href = './login.html';
  });
}