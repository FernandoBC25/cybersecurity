document.addEventListener('DOMContentLoaded', () => {
  const user = OlhoDigitalAccount.requireAuthentication();
  if (!user) return;
  OlhoDigitalAccount.applySettings(OlhoDigitalAccount.getEffectiveSettings(user));
  OlhoDigitalAccount.updateProfileAvatars(user);

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
