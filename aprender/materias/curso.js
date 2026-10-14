// Script único das páginas dos cursos com etapas em páginas separadas
// (material, vídeo, questionário, avaliação). A chave do curso vem da pasta da página.
const COURSES = {
  fundamentos: { answers: [1, 1, 0, 0, 0], setsFinalSteps: true },
  phishing: { answers: [1, 2, 0, 1, 0] },
  redes: { answers: [1, 2, 0, 0, 1] },
  malware: { answers: [2, 1, 0, 0, 1] }
};
const QUESTION_NAMES = ['question-one', 'question-two', 'question-three', 'question-four', 'question-five'];

document.addEventListener('DOMContentLoaded', () => {
  const courseKey = window.location.pathname.split('/').slice(-2, -1)[0];
  const course = COURSES[courseKey];
  const user = OlhoDigitalAccount.requireAuthentication();
  if (!course || !user) return;

  const profileToggle = document.getElementById('profileToggle');
  const advanceCourse = document.getElementById('advanceCourse');
  const quizForm = document.getElementById('quizForm');
  const quizFeedback = document.getElementById('quizFeedback');
  const evaluationForm = document.getElementById('evaluationForm');
  const evaluationFeedback = document.getElementById('evaluationFeedback');
  const evaluationComment = evaluationForm?.querySelector('#course-comment');
  const evaluationCommentLabel = evaluationForm?.querySelector('label[for="course-comment"]');
  const pageProgress = Number(document.body.dataset.courseProgress || 0);

  OlhoDigitalAccount.setCourseValue(user, courseKey, 'Started', 'true');
  OlhoDigitalAccount.applySettings(OlhoDigitalAccount.getEffectiveSettings(user));
  if (profileToggle) profileToggle.textContent = (user.name || 'U').charAt(0).toUpperCase();

  // Nas páginas do curso de fundamentos o HTML não traz o destino dos botões das últimas etapas.
  if (course.setsFinalSteps && advanceCourse) {
    if (window.location.pathname.endsWith('/questionario.html')) {
      advanceCourse.dataset.next = './avaliacao.html';
      advanceCourse.dataset.progress = '75';
      advanceCourse.textContent = 'Avançar para Avaliação';
      advanceCourse.disabled = true;
    }
    if (window.location.pathname.endsWith('/avaliacao.html')) {
      advanceCourse.dataset.next = '../../../aprender.html?curso=concluido';
      advanceCourse.disabled = true;
    }
  }

  const contentsList = document.querySelector('.contents-card ol');
  if (contentsList && !contentsList.textContent.includes('Avaliação do curso')) {
    const evaluationItem = document.createElement('li');
    evaluationItem.textContent = 'Avaliação do curso';
    contentsList.append(evaluationItem);
  }

  document.querySelector('.progress-heading span').textContent = `${pageProgress}%`;
  document.querySelector('.progress-track span').style.width = `${pageProgress}%`;

  advanceCourse?.addEventListener('click', async () => {
    advanceCourse.disabled = true;
    await OlhoDigitalAccount.setCourseValue(user, courseKey, 'Progress', String(Number(advanceCourse.dataset.progress)));
    window.location.href = advanceCourse.dataset.next;
  });

  quizForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    const score = QUESTION_NAMES.reduce((total, questionName, index) => {
      const selectedAnswer = quizForm.querySelector(`input[name="${questionName}"]:checked`);
      const answers = quizForm.querySelectorAll(`input[name="${questionName}"]`);
      return total + (selectedAnswer && Array.from(answers).indexOf(selectedAnswer) === course.answers[index] ? 1 : 0);
    }, 0);
    quizFeedback.textContent = `Respostas enviadas! Sua nota foi ${score}/5 (${score * 20}%). Agora você pode avançar para a avaliação do curso.`;
    quizFeedback.classList.add('success');
    advanceCourse.disabled = false;
  });

  evaluationForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    const selectedRating = evaluationForm.querySelector('input[name="course-rating"]:checked');
    OlhoDigitalAccount.setCourseValue(user, courseKey, 'Rating', selectedRating.value);
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
