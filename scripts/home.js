const profileToggle = document.getElementById('profileToggle');
const profileDropdown = document.getElementById('profileDropdown');
const logoutBtn = document.getElementById('logoutBtn');
const profileName = document.getElementById('profileName');
const welcomeName = document.getElementById('welcomeName');
const profileAvatar = document.getElementById('profileAvatar');

function loadUser() {
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  if (!user) {
    window.location.href = './login.html';
    return;
  }

  const firstName = user.name?.split(' ')[0] || 'Usuário';
  if (profileName) profileName.textContent = user.name || 'Usuário';
  if (welcomeName) welcomeName.textContent = firstName;
  if (profileAvatar) profileAvatar.textContent = (user.name || 'U').charAt(0).toUpperCase();
}

if (profileToggle && profileDropdown) {
  profileToggle.addEventListener('click', () => {
    profileDropdown.classList.toggle('show');
  });

  document.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof Node)) return;

    if (!profileToggle.contains(target) && !profileDropdown.contains(target)) {
      profileDropdown.classList.remove('show');
    }
  });
}

if (logoutBtn) {
  logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('user');
    window.location.href = './login.html';
  });
}

loadUser();
