document.addEventListener('DOMContentLoaded', () => {
  const profileToggle = document.getElementById('profileToggle');
  const advanceCourse = document.getElementById('advanceCourse');
  const quizForm = document.getElementById('quizForm');
  const quizFeedback = document.getElementById('quizFeedback');
  const evaluationForm = document.getElementById('evaluationForm');
  const evaluationFeedback = document.getElementById('evaluationFeedback');
  const evaluationComment = evaluationForm?.querySelector('#course-comment');
  const evaluationCommentLabel = evaluationForm?.querySelector('label[for="course-comment"]');
  const progressValue = document.querySelector('.progress-heading span');
  const progressBar = document.querySelector('.progress-track span');
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const pageProgress = Number(document.body.dataset.courseProgress || 0);
  const currentProgress = pageProgress;

  if (!user) {
    window.location.href = '../../../login.html';
    return;
  }

  localStorage.setItem('fundamentosStarted', 'true');
  OlhoDigitalAccount.applySettings(OlhoDigitalAccount.getEffectiveSettings(user));

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
    advanceCourse.dataset.next = '../../../aprender.html?curso=concluido';
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

  const updateEvaluationCommentRequirement = () => {
    const selectedRating = evaluationForm.querySelector('input[name="course-rating"]:checked');
    const isRequired = selectedRating && Number(selectedRating.value) < 4;
    evaluationComment.required = Boolean(isRequired);
    evaluationComment.setAttribute('aria-required', String(Boolean(isRequired)));
    evaluationCommentLabel.textContent = isRequired
      ? 'Informe o motivo da sua avaliação (obrigatório)'
      : 'Deixe um comentário (opcional)';
    evaluationComment.placeholder = isRequired
      ? 'Explique o motivo da nota...'
      : 'Conte o que achou do curso...';
    evaluationComment.setCustomValidity(
      isRequired && !evaluationComment.value.trim() ? 'Escreva o motivo da sua avaliação.' : ''
    );
  };

  evaluationForm?.querySelectorAll('input[name="course-rating"]').forEach((input) => {
    input.addEventListener('change', updateEvaluationCommentRequirement);
  });
  evaluationComment?.addEventListener('input', updateEvaluationCommentRequirement);
});