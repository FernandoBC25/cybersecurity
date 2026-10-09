const form = document.getElementById('registerForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');
const errorBox = document.getElementById('errorBox');
const emailFeedback = document.getElementById('emailFeedback');
const confirmPasswordFeedback = document.getElementById('confirmPasswordFeedback');
const passwordStrength = document.getElementById('passwordStrength');
const passwordStrengthLabel = document.getElementById('passwordStrengthLabel');
const passwordStrengthMeter = document.getElementById('passwordStrengthMeter');
const passwordStrengthAnnouncement = document.getElementById('passwordStrengthAnnouncement');
const generatePasswordButton = document.getElementById('generatePassword');
const togglePasswordVisibilityButton = document.getElementById('togglePasswordVisibility');
const generatorStatus = document.getElementById('generatorStatus');

const strengthLabels = ['Digite uma senha', 'Muito fraca', 'Fraca', 'Razoável', 'Forte', 'Muito forte'];
const passwordCharacterSets = {
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  numbers: '0123456789',
  symbols: '!@#$%^&*()-_=+[]{}:,.?',
};

function getSecureRandomInt(maxExclusive) {
  const range = 0x100000000;
  const limit = range - (range % maxExclusive);
  const randomValues = new Uint32Array(1);
  let value;

  do {
    window.crypto.getRandomValues(randomValues);
    value = randomValues[0];
  } while (value >= limit);

  return value % maxExclusive;
}

function generateSecurePassword() {
  const characterSets = Object.values(passwordCharacterSets);
  const allCharacters = characterSets.join('');
  const passwordCharacters = characterSets.map((characters) =>
    characters[getSecureRandomInt(characters.length)],
  );

  while (passwordCharacters.length < 16) {
    passwordCharacters.push(allCharacters[getSecureRandomInt(allCharacters.length)]);
  }

  for (let index = passwordCharacters.length - 1; index > 0; index -= 1) {
    const swapIndex = getSecureRandomInt(index + 1);
    [passwordCharacters[index], passwordCharacters[swapIndex]] = [
      passwordCharacters[swapIndex],
      passwordCharacters[index],
    ];
  }

  return passwordCharacters.join('');
}

function updatePasswordStrength() {
  const password = passwordInput.value;
  const requirements = {
    length: password.length >= 8,
    lowercase: /\p{Ll}/u.test(password),
    uppercase: /\p{Lu}/u.test(password),
    number: /\p{N}/u.test(password),
    symbol: /[^\p{L}\p{N}\p{M}]/u.test(password),
  };
  const score = Object.values(requirements).filter(Boolean).length;
  const label = password ? strengthLabels[score] : strengthLabels[0];

  passwordStrength.dataset.strength = password ? String(score) : '0';
  passwordStrengthLabel.textContent = label;
  passwordStrengthMeter.setAttribute('aria-valuenow', String(score));
  passwordStrengthMeter.setAttribute('aria-valuetext', label);
  passwordStrengthAnnouncement.textContent = password ? `Força da senha: ${label}.` : '';

  Object.entries(requirements).forEach(([requirement, isMet]) => {
    const item = passwordStrength.querySelector(`[data-requirement="${requirement}"]`);
    item.classList.toggle('is-met', isMet);
  });
}

function showError(message) {
  errorBox.textContent = message;
  errorBox.classList.remove('hidden');
}

function validateEmail(showEmptyError = false) {
  const email = emailInput.value.trim();
  if (emailInput.value !== email) emailInput.value = email;

  let message = '';
  if (!email && showEmptyError) {
    message = 'Informe seu email.';
  } else if (email && emailInput.validity.typeMismatch) {
    message = 'Informe um email válido, como nome@exemplo.com.';
  }

  emailFeedback.textContent = message;
  emailInput.setAttribute('aria-invalid', String(Boolean(message)));
  return !message;
}

function validatePasswordConfirmation(showEmptyError = false) {
  const password = passwordInput.value;
  const confirmation = confirmPasswordInput.value;
  let message = '';

  if (!confirmation && showEmptyError) {
    message = 'Confirme sua senha.';
  } else if (confirmation && password !== confirmation) {
    message = 'As senhas não coincidem.';
  }

  confirmPasswordFeedback.textContent = message;
  confirmPasswordInput.setAttribute('aria-invalid', String(Boolean(message)));
  return !message;
}

if (form) {
  emailInput.addEventListener('input', () => validateEmail());
  emailInput.addEventListener('blur', () => validateEmail(true));
  passwordInput.addEventListener('input', () => {
    updatePasswordStrength();
    if (confirmPasswordInput.value || confirmPasswordInput.dataset.touched === 'true') {
      validatePasswordConfirmation(confirmPasswordInput.dataset.touched === 'true');
    }
  });
  confirmPasswordInput.addEventListener('input', () => {
    confirmPasswordInput.dataset.touched = 'true';
    validatePasswordConfirmation();
  });
  confirmPasswordInput.addEventListener('blur', () => {
    confirmPasswordInput.dataset.touched = 'true';
    validatePasswordConfirmation(true);
  });

  generatePasswordButton.addEventListener('click', () => {
    if (!window.crypto || typeof window.crypto.getRandomValues !== 'function') {
      showError('Este navegador não oferece geração criptográfica de senhas seguras.');
      generatorStatus.textContent = '';
      return;
    }

    const password = generateSecurePassword();
    passwordInput.value = password;
    confirmPasswordInput.value = password;
    updatePasswordStrength();
    validatePasswordConfirmation();
    errorBox.classList.add('hidden');
    generatorStatus.textContent = 'Senha segura gerada e preenchida também na confirmação. Use “Mostrar senha” para visualizá-la.';
  });

  togglePasswordVisibilityButton.addEventListener('click', () => {
    const isVisible = passwordInput.type === 'text';
    passwordInput.type = isVisible ? 'password' : 'text';
    togglePasswordVisibilityButton.textContent = isVisible ? 'Mostrar senha' : 'Ocultar senha';
    togglePasswordVisibilityButton.setAttribute('aria-pressed', String(!isVisible));
    passwordInput.focus();
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    errorBox.classList.add('hidden');

    const name = nameInput.value.trim();
    const email = emailInput.value.trim().toLowerCase();
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    const emailIsValid = validateEmail(true);
    const confirmationIsValid = validatePasswordConfirmation(true);

    if (!name || !password || !confirmPassword || !emailIsValid || !confirmationIsValid) {
      showError('Por favor, preencha todos os campos corretamente.');
      if (!emailIsValid) emailInput.focus();
      else if (!confirmationIsValid) confirmPasswordInput.focus();
      return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');

    if (users.some((user) => typeof user.email === 'string' && user.email.trim().toLowerCase() === email)) {
      showError('Este email já está cadastrado');
      return;
    }

    users.push({ name, email, password });
    localStorage.setItem('users', JSON.stringify(users));
    window.location.href = './login.html';
  });
}