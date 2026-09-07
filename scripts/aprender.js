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

  const savedRating = Number(localStorage.getItem('fundamentosRating') || 0);
  const courseRating = document.getElementById('courseRating');
  if (courseRating && savedRating > 0) {
    courseRating.innerHTML = `<span>Sua avaliação:</span> <strong>${'★'.repeat(savedRating)}${'☆'.repeat(5 - savedRating)}</strong>`;
  }

  document.getElementById('startFundamentals')?.addEventListener('click', (event) => {
    const courseCompleted = localStorage.getItem('fundamentosProgress') === '100';

    if (courseCompleted) {
      const restartCourse = window.confirm('Você já concluiu este curso. Deseja fazê-lo novamente?');

      if (!restartCourse) {
        event.preventDefault();
        return;
      }
    }

    localStorage.removeItem('fundamentosProgress');
  });

  const params = new URLSearchParams(window.location.search);
  if (params.get('curso') === 'concluido') {
    const notice = document.createElement('div');
    notice.className = 'completion-notice';
    notice.setAttribute('role', 'status');
    const ratingMessage = savedRating > 0 ? ` Avaliação: ${'★'.repeat(savedRating)}${'☆'.repeat(5 - savedRating)}.` : '';
    notice.innerHTML = `<strong>Parabéns!</strong><span>Você concluiu o curso de Fundamentos da Cibersegurança.${ratingMessage}</span>`;
    document.querySelector('.page-shell')?.prepend(notice);
    window.history.replaceState({}, document.title, './aprender.html');
  }
});
