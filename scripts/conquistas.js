document.addEventListener('DOMContentLoaded', () => {
  const user = OlhoDigitalAccount.requireAuthentication();
  if (!user) return;

  OlhoDigitalAccount.applySettings(OlhoDigitalAccount.getEffectiveSettings(user));
  OlhoDigitalAccount.updateProfileAvatars(user);

  const categoryByCourse = {
    fundamentos: 'Contas e dispositivos',
    phishing: 'Golpes e engenharia social',
    redes: 'Técnico e defesa',
    malware: 'Técnico e defesa',
    'proteger-sites': 'Técnico e defesa',
    'protecao-dados-senhas': 'Contas e dispositivos',
    'como-hackers-agem': 'Técnico e defesa',
    'seguranca-na-nuvem': 'Técnico e defesa',
    'evitar-golpes-internet': 'Golpes e engenharia social',
    'identificar-combater-ataques': 'Segurança no trabalho'
  };
  const catalog = new Map();
  (window.homeData?.cursos || []).forEach((course) => {
    catalog.set(course.chave, { id: course.chave, category: categoryByCourse[course.chave] || 'Contas e dispositivos' });
  });
  Object.entries(window.novosCursos || {}).forEach(([id, course]) => {
    catalog.set(id, { id, category: course.category });
  });
  if (!catalog.size) {
    console.error('Não foi possível carregar o catálogo para calcular as conquistas.');
    document.getElementById('achievementProgressText').textContent = 'Não foi possível carregar o catálogo de cursos.';
    return;
  }

  const grid = document.getElementById('achievementGrid');
  const search = document.getElementById('achievementSearch');
  const filterButtons = [...document.querySelectorAll('[data-filter]')];
  const empty = document.getElementById('achievementEmpty');
  const dialog = document.getElementById('achievementDialog');
  let filter = 'all';
  let badges = [];
  let lastFocusedElement = null;

  const escapeHTML = (value) => String(value).replace(/[&<>"']/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[character]);
  const getBadgeIcon = (badge) => badge.category === 'laboratorios' ? '⚗' : '✦';

  function renderBadges() {
    const query = search.value.trim().toLocaleLowerCase('pt-BR');
    const visibleBadges = badges.filter((badge) => {
      const matchesFilter = filter === 'all'
        || (filter === 'unlocked' && badge.unlocked)
        || (filter === 'locked' && badge.available && !badge.unlocked)
        || filter === badge.category;
      const matchesSearch = `${badge.name} ${badge.title} ${badge.description}`.toLocaleLowerCase('pt-BR').includes(query);
      return matchesFilter && matchesSearch;
    });

    grid.innerHTML = visibleBadges.map((badge) => {
      const status = !badge.available ? 'Em breve' : badge.unlocked ? 'Desbloqueada' : 'Bloqueada';
      const statusClass = !badge.available ? 'is-upcoming' : badge.unlocked ? 'is-unlocked' : 'is-locked';
      const progress = badge.available
        ? `<div class="badge-progress" role="progressbar" aria-label="Progresso: ${badge.progress} de ${badge.requirement}" aria-valuemin="0" aria-valuemax="${badge.requirement}" aria-valuenow="${badge.progress}"><span style="width: ${badge.percentage}%"></span></div><p class="badge-progress-label">${badge.progress} de ${badge.requirement}</p>`
        : '<p class="badge-progress-label">Aguardando a chegada dos laboratórios</p>';
      return `
        <button class="achievement-card ${statusClass}" type="button" data-achievement-id="${escapeHTML(badge.id)}" aria-label="Ver detalhes de ${escapeHTML(badge.name)}. ${status}.">
          <span class="badge-art" aria-hidden="true"><span>${badge.available && badge.unlocked ? '✦' : getBadgeIcon(badge)}</span></span>
          <span class="badge-card-content">
            <span class="badge-category">${escapeHTML(badge.title)}</span>
            <strong class="badge-name">${escapeHTML(badge.name)}</strong>
            <span class="badge-description">${escapeHTML(badge.description)}</span>
            <span class="badge-status ${statusClass}">${status}</span>
            ${progress}
          </span>
        </button>`;
    }).join('');
    empty.hidden = visibleBadges.length > 0;
    document.getElementById('achievementResultCount').textContent = `${visibleBadges.length} ${visibleBadges.length === 1 ? 'conquista' : 'conquistas'}`;
  }

  function renderOverview(result) {
    const percentage = result.availableBadgeCount
      ? Math.round((result.unlockedCount / result.availableBadgeCount) * 100)
      : 0;
    document.getElementById('achievementCount').textContent = result.unlockedCount;
    document.getElementById('achievementProgressText').textContent =
      `Você já desbloqueou ${result.unlockedCount} de ${result.availableBadgeCount} conquistas disponíveis.`;
    document.getElementById('overallProgress').setAttribute('aria-valuenow', String(percentage));
    document.getElementById('overallProgressBar').style.width = `${percentage}%`;
    document.getElementById('overallProgressLabel').textContent = `${percentage}% das conquistas disponíveis`;
    document.getElementById('completedCourseCount').textContent = `${result.completedCourseCount}/${result.totalCourseCount}`;
    document.getElementById('completedTrailCount').textContent = `${result.completedTrailCount}/${result.totalTrailCount}`;
  }

  function openBadge(badge, trigger) {
    lastFocusedElement = trigger;
    document.getElementById('dialogMedal').textContent = badge.available && badge.unlocked ? '🏅' : badge.available ? '🔒' : '⚗';
    document.getElementById('dialogCategory').textContent = badge.title;
    document.getElementById('achievementDialogTitle').textContent = badge.name;
    document.getElementById('dialogDescription').textContent = badge.description;
    document.getElementById('dialogMotivation').textContent = badge.message;
    document.getElementById('dialogRequirement').textContent = `Critério: ${badge.requirement} ${badge.unit}${badge.requirement > 1 ? 's' : ''}.`;
    const progressGroup = document.getElementById('dialogProgressGroup');
    progressGroup.hidden = !badge.available;
    if (badge.available) {
      document.getElementById('dialogProgressBar').style.width = `${badge.percentage}%`;
      document.getElementById('dialogProgressText').textContent = `${badge.progress} de ${badge.requirement}`;
    }
    const status = !badge.available
      ? 'Esta conquista ficará disponível quando os laboratórios forem adicionados ao sistema.'
      : badge.unlocked
        ? 'Conquista desbloqueada. Seu progresso está salvo na sua conta.'
        : 'Continue aprendendo para desbloquear esta conquista.';
    document.getElementById('dialogStatus').textContent = status;
    dialog.showModal();
  }

  function update() {
    const result = window.OlhoDigitalAchievements.calculate([...catalog.values()], OlhoDigitalData.getCourses(user));
    badges = result.badges;
    renderOverview(result);
    renderBadges();
  }

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      filter = button.dataset.filter;
      filterButtons.forEach((item) => {
        const active = item === button;
        item.classList.toggle('is-active', active);
        item.setAttribute('aria-pressed', String(active));
      });
      renderBadges();
    });
  });
  search.addEventListener('input', renderBadges);
  grid.addEventListener('click', (event) => {
    const trigger = event.target.closest('[data-achievement-id]');
    if (!trigger) return;
    const badge = badges.find((item) => item.id === trigger.dataset.achievementId);
    if (badge) openBadge(badge, trigger);
  });
  document.getElementById('closeAchievementDialog').addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => lastFocusedElement?.focus());

  update();
});
