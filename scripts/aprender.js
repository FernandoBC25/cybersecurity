document.addEventListener('DOMContentLoaded', () => {
  const profileToggle = document.getElementById('profileToggle');
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  if (!user) {
    window.location.href = './login.html';
    return;
  }

  if (profileToggle) {
    profileToggle.textContent = (user.name || 'U').charAt(0).toUpperCase();
  }
});
