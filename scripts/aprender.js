document.addEventListener('DOMContentLoaded', () => {
  const user = OlhoDigitalAccount.requireAuthentication();
  if (!user) return;
  OlhoDigitalAccount.applySettings(OlhoDigitalAccount.getEffectiveSettings(user));
  OlhoDigitalAccount.updateProfileAvatars(user);

  const courseCompleted = Number(OlhoDigitalAccount.getCourseValue(user, 'fundamentos', 'Progress')) >= 100;
  const courseStarted = OlhoDigitalAccount.getCourseValue(user, 'fundamentos', 'Started') === 'true';
  const courseCompletion = document.getElementById('courseCompletion');
  const courseRating = document.getElementById('courseRating');
  const startFundamentals = document.getElementById('startFundamentals');
  const savedRating = Number(OlhoDigitalAccount.getCourseValue(user, 'fundamentos', 'Rating'));

  if (courseCompleted) {
    courseCompletion.hidden = false;
    startFundamentals.textContent = 'Rever curso';

    if (Number.isInteger(savedRating) && savedRating >= 1 && savedRating <= 5) {
      const stars = document.createElement('strong');
      const score = document.createElement('span');
      stars.textContent = `${'★'.repeat(savedRating)}${'☆'.repeat(5 - savedRating)}`;
      score.textContent = ` ${savedRating}/5`;
      courseRating.replaceChildren(stars, score);
      courseRating.setAttribute('aria-label', `Sua avaliação: ${savedRating} de 5 estrelas`);
    } else {
      courseRating.textContent = 'Avaliação não registrada';
    }
  } else if (courseStarted) {
    courseCompletion.hidden = false;
    courseCompletion.textContent = 'Não concluído';
    courseCompletion.classList.add('is-incomplete');
  }

  const phishingCompleted = Number(OlhoDigitalAccount.getCourseValue(user, 'phishing', 'Progress')) >= 100;
  const phishingStarted = OlhoDigitalAccount.getCourseValue(user, 'phishing', 'Started') === 'true';
  const phishingCompletion = document.getElementById('phishingCompletion');
  const phishingRating = document.getElementById('phishingRating');
  const startPhishing = document.getElementById('startPhishing');
  const savedPhishingRating = Number(OlhoDigitalAccount.getCourseValue(user, 'phishing', 'Rating'));

  if (phishingCompleted) {
    phishingCompletion.hidden = false;
    phishingCompletion.textContent = 'Curso concluído';
    phishingCompletion.classList.remove('is-incomplete');
    startPhishing.textContent = 'Rever curso';

    if (Number.isInteger(savedPhishingRating) && savedPhishingRating >= 1 && savedPhishingRating <= 5) {
      const stars = document.createElement('strong');
      const score = document.createElement('span');
      stars.textContent = `${'★'.repeat(savedPhishingRating)}${'☆'.repeat(5 - savedPhishingRating)}`;
      score.textContent = ` ${savedPhishingRating}/5`;
      phishingRating.replaceChildren(stars, score);
      phishingRating.setAttribute('aria-label', `Sua avaliação: ${savedPhishingRating} de 5 estrelas`);
    } else {
      phishingRating.textContent = 'Avaliação não registrada';
    }
  } else if (phishingStarted) {
    phishingCompletion.hidden = false;
  }

  const additionalCourses = [
    { key: 'redes', completionId: 'redesCompletion', ratingId: 'redesRating', startId: 'startRedes' },
    { key: 'malware', completionId: 'malwareCompletion', ratingId: 'malwareRating', startId: 'startMalware' },
    { key: 'proteger-sites', completionId: 'protegerSitesCompletion', ratingId: 'protegerSitesRating', startId: 'startProtegerSites' },
    { key: 'protecao-dados-senhas', completionId: 'protecaoDadosCompletion', ratingId: 'protecaoDadosRating', startId: 'startProtecaoDados' },
    { key: 'como-hackers-agem', completionId: 'hackersAgemCompletion', ratingId: 'hackersAgemRating', startId: 'startHackersAgem' },
    { key: 'seguranca-na-nuvem', completionId: 'segurancaNuvemCompletion', ratingId: 'segurancaNuvemRating', startId: 'startSegurancaNuvem' },
    { key: 'evitar-golpes-internet', completionId: 'evitarGolpesCompletion', ratingId: 'evitarGolpesRating', startId: 'startEvitarGolpes' },
    { key: 'identificar-combater-ataques', completionId: 'combaterAtaquesCompletion', ratingId: 'combaterAtaquesRating', startId: 'startCombaterAtaques' }
  ];

  additionalCourses.forEach(({ key, completionId, ratingId, startId }) => {
    const completed = Number(OlhoDigitalAccount.getCourseValue(user, key, 'Progress')) >= 100;
    const started = OlhoDigitalAccount.getCourseValue(user, key, 'Started') === 'true';
    const completion = document.getElementById(completionId);
    const rating = document.getElementById(ratingId);
    const start = document.getElementById(startId);
    const savedRating = Number(OlhoDigitalAccount.getCourseValue(user, key, 'Rating'));

    if (completed) {
      completion.hidden = false;
      completion.textContent = 'Curso concluído';
      completion.classList.remove('is-incomplete');
      start.textContent = 'Rever curso';

      if (Number.isInteger(savedRating) && savedRating >= 1 && savedRating <= 5) {
        const stars = document.createElement('strong');
        const score = document.createElement('span');
        stars.textContent = `${'★'.repeat(savedRating)}${'☆'.repeat(5 - savedRating)}`;
        score.textContent = ` ${savedRating}/5`;
        rating.replaceChildren(stars, score);
        rating.setAttribute('aria-label', `Sua avaliação: ${savedRating} de 5 estrelas`);
      } else {
        rating.textContent = 'Avaliação não registrada';
      }
    } else if (started) {
      completion.hidden = false;
      completion.textContent = 'Não concluído';
    }
  });

  const search = document.getElementById('learningSearch');
  const searchableCards = document.querySelectorAll('.course-card, .video-card, .lab-item');
  search.addEventListener('input', () => {
    const query = search.value.trim().toLocaleLowerCase('pt-BR');
    searchableCards.forEach((card) => {
      card.classList.toggle('search-hidden', Boolean(query) && !card.textContent.toLocaleLowerCase('pt-BR').includes(query));
    });
  });

  const videoStatusLabels = { 'in-progress': 'Em andamento', completed: 'Concluída' };
  const refreshVideoStatuses = () => {
    const activity = OlhoDigitalAccount.getActivity(user);
    document.querySelectorAll('.video-card[data-video-id]').forEach((card) => {
      const saved = activity.learning.videos.find((video) => video.id === card.dataset.videoId);
      const status = card.querySelector('[data-video-status]');
      status.textContent = saved ? videoStatusLabels[saved.status] : 'Não iniciada';
      card.querySelectorAll('[data-video-state]').forEach((button) => {
        button.setAttribute('aria-pressed', String(saved?.status === button.dataset.videoState));
      });
    });
  };
  refreshVideoStatuses();
  document.querySelectorAll('.video-card[data-video-id] [data-video-state]').forEach((button) => {
    button.addEventListener('click', () => {
      const card = button.closest('.video-card');
      try {
        OlhoDigitalAccount.trackActivity(user, 'learning', 'videos', {
          id: card.dataset.videoId,
          title: card.querySelector('h3').textContent.trim(),
          status: button.dataset.videoState
        });
        refreshVideoStatuses();
      } catch (error) {
        console.error('Não foi possível salvar o progresso desta videoaula.', error);
        window.alert('Não foi possível salvar o progresso da videoaula.');
      }
    });
  });
});
