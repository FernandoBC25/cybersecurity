document.addEventListener('DOMContentLoaded', () => {
  const profileToggle = document.getElementById('profileToggle');
  const advanceCourse = document.getElementById('advanceCourse');
  const quizForm = document.getElementById('quizForm');
  const quizFeedback = document.getElementById('quizFeedback');
  const evaluationForm = document.getElementById('evaluationForm');
  const evaluationFeedback = document.getElementById('evaluationFeedback');
  const progressValue = document.querySelector('.progress-heading span');
  const progressBar = document.querySelector('.progress-track span');
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const pageProgress = Number(document.body.dataset.courseProgress || 0);
  const storedProgress = Number(localStorage.getItem('fundamentosProgress') || 0);
  const savedProgress = storedProgress >= 100 ? 100 : storedProgress >= 75 ? 75 : storedProgress >= 50 ? 66 : storedProgress > 0 ? 33 : 0;
  const currentProgress = Math.max(pageProgress, savedProgress);

  if (!user) {
    window.location.href = '../login.html';
    return;
  }

  if (profileToggle) {
    profileToggle.textContent = (user.name || 'U').charAt(0).toUpperCase();
  }

  if (advanceCourse && window.location.pathname.endsWith('/questionario.html')) {
    advanceCourse.dataset.next = './avaliacao.html';
    advanceCourse.dataset.progress = '75';
    advanceCourse.textContent = 'Avançar para Avaliação';
    advanceCourse.disabled = true;
  }

  if (advanceCourse && window.location.pathname.endsWith('/avaliacao.html')) {
    advanceCourse.dataset.next = '../aprender.html?curso=concluido';
    advanceCourse.disabled = true;
  }

  const contentsList = document.querySelector('.contents-card ol');
  if (contentsList && !contentsList.textContent.includes('Avaliação do curso')) {
    const evaluationItem = document.createElement('li');
    evaluationItem.textContent = 'Avaliação do curso';
    contentsList.append(evaluationItem);
  }

  progressValue.textContent = `${currentProgress}%`;
  progressBar.style.width = `${currentProgress}%`;

  advanceCourse?.addEventListener('click', () => {
    const nextProgress = Number(advanceCourse.dataset.progress);
    localStorage.setItem('fundamentosProgress', String(nextProgress));
    window.location.href = advanceCourse.dataset.next;
  });

  quizForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    const correctAnswers = [1, 1, 0, 0, 0];
    const questionNames = ['question-one', 'question-two', 'question-three', 'question-four', 'question-five'];
    const score = questionNames.reduce((total, questionName, index) => {
      const selectedAnswer = quizForm.querySelector(`input[name="${questionName}"]:checked`);
      const answers = quizForm.querySelectorAll(`input[name="${questionName}"]`);
      return total + (selectedAnswer && Array.from(answers).indexOf(selectedAnswer) === correctAnswers[index] ? 1 : 0);
    }, 0);
    const percentage = score * 20;

    quizFeedback.textContent = `Respostas enviadas! Sua nota foi ${score}/5 (${percentage}%). Agora você pode avançar para a avaliação do curso.`;
    quizFeedback.classList.add('success');
    advanceCourse.disabled = false;
  });

  evaluationForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    const selectedRating = evaluationForm.querySelector('input[name="course-rating"]:checked');
    localStorage.setItem('fundamentosRating', selectedRating.value);
    evaluationFeedback.textContent = 'Avaliação enviada! Agora você pode concluir o curso.';
    evaluationFeedback.classList.add('success');
    advanceCourse.disabled = false;
  });
});