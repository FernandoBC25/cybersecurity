const achievements = [
  {
    id: 'primeiros-passos',
    nome: 'Primeiros Passos',
    categoria: 'Aprendizagem',
    categoriaKey: 'aprendizagem',
    descricao: 'Você concluiu seu primeiro curso!',
    requisito: 1,
    requisitoTexto: 'Concluir 1 curso.',
    progressoAtual: 1,
    desbloqueada: true,
    dataDesbloqueio: '2026-10-08',
    imagem: './assets/conquistas/01-primeiros-passos.svg',
    motivacao: 'Cada novo conhecimento é um passo firme na sua proteção digital.',
    ordem: 1
  },
  {
    id: 'aluno-dedicado',
    nome: 'Aluno Dedicado',
    categoria: 'Aprendizagem',
    categoriaKey: 'aprendizagem',
    descricao: 'Você manteve um ritmo consistente de aprendizagem e avançou com foco.',
    requisito: 3,
    requisitoTexto: 'Concluir 3 cursos.',
    progressoAtual: 3,
    desbloqueada: true,
    dataDesbloqueio: '2026-10-06',
    imagem: './assets/conquistas/02-aluno-dedicado.svg',
    motivacao: 'A sua constância virou força. Continue assim.',
    ordem: 2
  },
  {
    id: 'mestre-do-conhecimento',
    nome: 'Mestre do Conhecimento',
    categoria: 'Aprendizagem',
    categoriaKey: 'aprendizagem',
    descricao: 'Você mostrou domínio ao concluir uma base sólida de formação.',
    requisito: 5,
    requisitoTexto: 'Concluir 5 cursos.',
    progressoAtual: 5,
    desbloqueada: true,
    dataDesbloqueio: '2026-10-05',
    imagem: './assets/conquistas/03-mestre-do-conhecimento.svg',
    motivacao: 'Você já entende que aprender é uma forma de se proteger.',
    ordem: 3
  },
  {
    id: 'jornada-segura',
    nome: 'Jornada Segura',
    categoria: 'Aprendizagem',
    categoriaKey: 'aprendizagem',
    descricao: 'Você concluiu uma trilha completa e fortaleceu sua base de segurança.',
    requisito: 1,
    requisitoTexto: 'Concluir 1 trilha completa.',
    progressoAtual: 1,
    desbloqueada: true,
    dataDesbloqueio: '2026-10-01',
    imagem: './assets/conquistas/04-jornada-segura.svg',
    motivacao: 'A jornada segura começa com passos simples e consistentes.',
    ordem: 4
  },
  {
    id: 'especialista-digital',
    nome: 'Especialista Digital',
    categoria: 'Aprendizagem',
    categoriaKey: 'aprendizagem',
    descricao: 'Você aprofundou os conteúdos e está pronto para aplicar estratégias mais avançadas.',
    requisito: 3,
    requisitoTexto: 'Concluir 3 trilhas completas.',
    progressoAtual: 1,
    desbloqueada: false,
    imagem: './assets/conquistas/05-especialista-digital.svg',
    motivacao: 'Mais trilhas concluídas significam mais segurança para o seu cotidiano.',
    ordem: 5
  },
  {
    id: 'primeiro-experimento',
    nome: 'Primeiro Experimento',
    categoria: 'Laboratórios',
    categoriaKey: 'laboratorios',
    descricao: 'Você deu o primeiro passo em um laboratório prático e aplicou o conhecimento na prática.',
    requisito: 1,
    requisitoTexto: 'Concluir 1 laboratório.',
    progressoAtual: 0,
    desbloqueada: false,
    imagem: './assets/conquistas/06-primeiro-experimento.svg',
    motivacao: 'Praticar é onde o aprendizado vira proteção real.',
    ordem: 6
  },
  {
    id: 'olho-atento',
    nome: 'Olho Atento',
    categoria: 'Laboratórios',
    categoriaKey: 'laboratorios',
    descricao: 'Você treina a percepção para identificar riscos e agir com atenção.',
    requisito: 3,
    requisitoTexto: 'Concluir 3 laboratórios.',
    progressoAtual: 2,
    desbloqueada: false,
    imagem: './assets/conquistas/07-olho-atento.svg',
    motivacao: 'Quem observa melhor, evita mais ameaças no ambiente digital.',
    ordem: 7
  },
  {
    id: 'explorador-digital',
    nome: 'Explorador Digital',
    categoria: 'Laboratórios',
    categoriaKey: 'laboratorios',
    descricao: 'Sua prática em laboratórios aumentou sua capacidade de explorar o ambiente com segurança.',
    requisito: 5,
    requisitoTexto: 'Concluir 5 laboratórios.',
    progressoAtual: 3,
    desbloqueada: false,
    imagem: './assets/conquistas/08-explorador-digital.svg',
    motivacao: 'Explorar com cuidado é o melhor caminho para aprender sem se expor.',
    ordem: 8
  },
  {
    id: 'guardiao-digital',
    nome: 'Guardião Digital',
    categoria: 'Laboratórios',
    categoriaKey: 'laboratorios',
    descricao: 'Você já protege seus dados e reforça suas habilidades em cenários reais.',
    requisito: 10,
    requisitoTexto: 'Concluir 10 laboratórios.',
    progressoAtual: 6,
    desbloqueada: false,
    imagem: './assets/conquistas/09-guardiao-digital.svg',
    motivacao: 'Guardião digital é quem transforma conhecimento em ação segura.',
    ordem: 9
  },
  {
    id: 'mestre-da-pratica',
    nome: 'Mestre da Prática',
    categoria: 'Laboratórios',
    categoriaKey: 'laboratorios',
    descricao: 'Você domina a prática e aproxima a teoria da execução com segurança.',
    requisito: 15,
    requisitoTexto: 'Concluir 15 laboratórios.',
    progressoAtual: 8,
    desbloqueada: false,
    imagem: './assets/conquistas/10-mestre-da-pratica.svg',
    motivacao: 'A prática leva você da teoria para a confiança no mundo digital.',
    ordem: 10
  }
];

const filterLabels = {
  all: 'Todas',
  desbloqueadas: 'Desbloqueadas',
  bloqueadas: 'Bloqueadas',
  aprendizagem: 'Aprendizagem',
  laboratorios: 'Laboratórios'
};

const state = {
  filter: 'all',
  modalAchievementId: null
};

const elements = {
  profileName: document.getElementById('profileName'),
  menuToggle: document.getElementById('menuToggle'),
  sidebar: document.getElementById('sidebar'),
  sidebarBackdrop: document.getElementById('sidebarBackdrop'),
  searchInput: document.getElementById('searchInput'),
  notificationToggle: document.getElementById('notificationToggle'),
  notificationDropdown: document.getElementById('notificationDropdown'),
  profileToggle: document.getElementById('profileToggle'),
  profileDropdown: document.getElementById('profileDropdown'),
  logoutBtn: document.getElementById('logoutBtn'),
  logoutDialog: document.getElementById('logoutDialog'),
  confirmLogout: document.getElementById('confirmLogout'),
  progressValue: document.getElementById('progressValue'),
  overallProgress: document.getElementById('overallProgress'),
  nextAchievement: document.getElementById('nextAchievement'),
  achievementCounter: document.getElementById('achievementCounter'),
  achievementGrid: document.getElementById('achievementGrid'),
  achievementEmpty: document.getElementById('achievementEmpty'),
  modal: document.getElementById('achievementModal'),
  modalTitle: document.getElementById('achievementModalTitle'),
  modalCategory: document.getElementById('achievementModalCategory'),
  modalDescription: document.getElementById('achievementModalDescription'),
  modalRequirement: document.getElementById('achievementModalRequirement'),
  modalStatus: document.getElementById('achievementModalStatus'),
  modalProgress: document.getElementById('achievementModalProgress'),
  modalProgressGroup: document.getElementById('achievementModalProgressGroup'),
  modalDate: document.getElementById('achievementModalDate'),
  modalDateGroup: document.getElementById('achievementModalDateGroup'),
  modalMedia: document.getElementById('achievementModalMedia'),
  modalMotivation: document.getElementById('achievementModalMotivation'),
  closeModalBtn: document.getElementById('closeAchievementModal'),
  confirmCloseModal: document.getElementById('confirmCloseModal'),
  filterButtons: [...document.querySelectorAll('.filter-btn')]
};

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[character]);
}

function getProgressPercent(item) {
  const total = Number(item.requisito) || 1;
  const current = Math.max(0, Number(item.progressoAtual) || 0);
  return Math.min(100, Math.max(0, (current / total) * 100));
}

function getUnlockedCount() {
  return achievements.filter((item) => item.desbloqueada).length;
}

function getFilteredAchievements() {
  switch (state.filter) {
    case 'desbloqueadas':
      return achievements.filter((item) => item.desbloqueada);
    case 'bloqueadas':
      return achievements.filter((item) => !item.desbloqueada);
    case 'aprendizagem':
      return achievements.filter((item) => item.categoriaKey === 'aprendizagem');
    case 'laboratorios':
      return achievements.filter((item) => item.categoriaKey === 'laboratorios');
    default:
      return achievements;
  }
}

function renderProgress() {
  const total = achievements.length;
  const unlocked = getUnlockedCount();
  const percent = total ? (unlocked / total) * 100 : 0;
  elements.progressValue.textContent = `${Math.round(percent)}%`;
  elements.overallProgress.style.setProperty('--progress', String(Math.round(percent)));
  elements.achievementCounter.textContent = `${unlocked}/${total}`;
}

function getNextAchievement() {
  const blocked = achievements.filter((item) => !item.desbloqueada && Number(item.requisito) > 0);
  if (!blocked.length) return null;

  return [...blocked].sort((a, b) => {
    const progressDiff = getProgressPercent(b) - getProgressPercent(a);
    if (progressDiff !== 0) return progressDiff;
    const remainingA = Number(a.requisito) - Number(a.progressoAtual || 0);
    const remainingB = Number(b.requisito) - Number(b.progressoAtual || 0);
    const remainingDiff = remainingA - remainingB;
    if (remainingDiff !== 0) return remainingDiff;
    return a.ordem - b.ordem;
  })[0];
}

function renderNextAchievement() {
  const next = getNextAchievement();
  if (!next) {
    elements.nextAchievement.innerHTML = `
      <div class="next-empty">
        <span class="next-empty-icon" aria-hidden="true">✓</span>
        <p>Você já desbloqueou todas as conquistas.</p>
      </div>
    `;
    return;
  }

  const progress = Math.round(getProgressPercent(next));
  const remaining = Math.max(0, Number(next.requisito) - Number(next.progressoAtual || 0));

  elements.nextAchievement.innerHTML = `
    <div class="next-conquest">
      <div class="next-conquest-head">
        <span class="next-conquest-lock" aria-hidden="true">🔒</span>
        <div>
          <h3>${escapeHTML(next.nome)}</h3>
        </div>
      </div>
      <p>${escapeHTML(next.requisitoTexto)}</p>
      <div class="progress-track" aria-label="Progresso da próxima conquista" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${progress}">
        <span style="width: ${progress}%;"></span>
      </div>
      <div class="next-conquest-meta">
        <span>${progress}%</span>
        <span>${escapeHTML(next.progressoAtual || 0)} de ${escapeHTML(next.requisito)}</span>
      </div>
      <div class="next-conquest-actions">
        <span class="text-link">Faltam ${remaining}</span>
        <button class="next-cta" type="button" data-id="${next.id}" aria-label="Ver detalhes de ${escapeHTML(next.nome)}">↗</button>
      </div>
    </div>
  `;

  const viewButton = elements.nextAchievement.querySelector('[data-id]');
  if (viewButton) {
    viewButton.addEventListener('click', () => openModal(next.id));
  }
}

function renderCards() {
  const filteredAchievements = getFilteredAchievements();
  elements.achievementGrid.innerHTML = filteredAchievements.map((item) => {
    const progress = Math.round(getProgressPercent(item));
    const unlockedStatus = item.desbloqueada ? 'Conquistada' : 'Bloqueada';
    const dateText = item.desbloqueada ? `Desbloqueada em ${new Date(item.dataDesbloqueio).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })}` : '';

    return `
      <article class="achievement-item ${item.desbloqueada ? 'is-unlocked' : 'is-locked'}" data-filter="${escapeHTML(item.categoriaKey)}">
        <button class="achievement-item-button" type="button" data-id="${item.id}" aria-label="Abrir detalhes de ${escapeHTML(item.nome)}">
          <div class="achievement-media">
            ${item.desbloqueada
              ? `<img class="achievement-medal" src="${escapeHTML(item.imagem)}" alt="${escapeHTML(item.nome)}" />`
              : '<span class="achievement-lock" aria-label="Conquista bloqueada">🔒</span>'}
          </div>
          <div class="achievement-card-body">
            <p class="achievement-state">${unlockedStatus}</p>
            <h3>${escapeHTML(item.nome)}</h3>
            <p class="achievement-requirement">${escapeHTML(item.requisitoTexto)}</p>
            ${item.desbloqueada
              ? `<div class="achievement-date">${escapeHTML(dateText)}</div>`
              : `
                <div class="achievement-progress">
                  <div class="mini-progress" aria-hidden="true"><span style="width: ${progress}%;"></span></div>
                  <small>${progress}%</small>
                </div>
              `}
          </div>
        </button>
      </article>
    `;
  }).join('');

  if (!filteredAchievements.length) {
    elements.achievementEmpty.hidden = false;
    return;
  }

  elements.achievementEmpty.hidden = true;
  elements.achievementGrid.querySelectorAll('[data-id]').forEach((button) => {
    button.addEventListener('click', () => openModal(button.dataset.id));
  });
}

function openModal(id) {
  const item = achievements.find((achievement) => achievement.id === id);
  if (!item) return;

  state.modalAchievementId = id;
  const progress = Math.round(getProgressPercent(item));
  const statusText = item.desbloqueada ? 'Conquistada' : 'Bloqueada';

  elements.modalTitle.textContent = item.nome;
  elements.modalCategory.textContent = item.categoria;
  elements.modalDescription.textContent = item.descricao;
  elements.modalRequirement.textContent = item.requisitoTexto;
  elements.modalStatus.textContent = statusText;
  elements.modalMotivation.textContent = item.motivacao;

  elements.modalMedia.innerHTML = item.desbloqueada
    ? `<img class="achievement-medal" src="${escapeHTML(item.imagem)}" alt="${escapeHTML(item.nome)}" />`
    : '<span class="modal-lock" aria-label="Conquista bloqueada">🔒</span>';

  if (item.desbloqueada) {
    elements.modalDate.textContent = new Date(item.dataDesbloqueio).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
    elements.modalDateGroup.hidden = false;
    elements.modalProgressGroup.hidden = true;
  } else {
    elements.modalProgress.textContent = `${progress}% · ${item.progressoAtual || 0} de ${item.requisito}`;
    elements.modalProgressGroup.hidden = false;
    elements.modalDateGroup.hidden = true;
  }

  elements.modal.hidden = false;
  document.body.classList.add('modal-open');
  const activeElement = document.activeElement;
  window.lastAchievementFocus = activeElement;
  requestAnimationFrame(() => {
    elements.closeModalBtn.focus();
  });
}

function closeModal() {
  state.modalAchievementId = null;
  elements.modal.hidden = true;
  document.body.classList.remove('modal-open');
  if (window.lastAchievementFocus && typeof window.lastAchievementFocus.focus === 'function') {
    window.lastAchievementFocus.focus();
  }
}

function trapFocus(event) {
  const focusables = elements.modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
  if (!focusables.length) return;
  const first = focusables[0];
  const last = focusables[focusables.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

function toggleMobileMenu(open) {
  elements.sidebar.classList.toggle('is-open', open);
  elements.sidebarBackdrop.hidden = !open;
  elements.menuToggle.setAttribute('aria-expanded', String(open));
  elements.menuToggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  document.body.classList.toggle('menu-open', open);
}

function closeHeaderPopovers() {
  elements.profileDropdown.hidden = true;
  elements.notificationDropdown.hidden = true;
  elements.profileToggle.setAttribute('aria-expanded', 'false');
  elements.notificationToggle.setAttribute('aria-expanded', 'false');
}

function handleHeaderInteraction() {
  elements.profileToggle.addEventListener('click', () => {
    const shouldOpen = elements.profileDropdown.hidden;
    closeHeaderPopovers();
    if (shouldOpen) {
      elements.profileDropdown.hidden = false;
      elements.profileToggle.setAttribute('aria-expanded', 'true');
    }
  });

  elements.notificationToggle.addEventListener('click', () => {
    const shouldOpen = elements.notificationDropdown.hidden;
    closeHeaderPopovers();
    if (shouldOpen) {
      elements.notificationDropdown.hidden = false;
      elements.notificationToggle.setAttribute('aria-expanded', 'true');
    }
  });

  document.addEventListener('click', (event) => {
    if (!(event.target instanceof Node)) return;
    if (
      !elements.profileToggle.contains(event.target) &&
      !elements.profileDropdown.contains(event.target) &&
      !elements.notificationToggle.contains(event.target) &&
      !elements.notificationDropdown.contains(event.target)
    ) {
      closeHeaderPopovers();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeHeaderPopovers();
      toggleMobileMenu(false);
      if (!elements.modal.hidden) closeModal();
    }
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      elements.searchInput.focus();
    }
    if (!elements.modal.hidden && (event.key === 'Tab' || event.key === 'Shift')) {
      trapFocus(event);
    }
  });

  elements.menuToggle.addEventListener('click', () => toggleMobileMenu(!elements.sidebar.classList.contains('is-open')));
  elements.sidebarBackdrop.addEventListener('click', () => toggleMobileMenu(false));
  elements.sidebar.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => toggleMobileMenu(false)));

  elements.logoutBtn.addEventListener('click', () => {
    closeHeaderPopovers();
    elements.logoutDialog.showModal();
  });

  elements.confirmLogout.addEventListener('click', () => {
    localStorage.removeItem('user');
    sessionStorage.clear();
    window.location.replace('./login.html');
  });

  elements.searchInput.addEventListener('input', () => {
    const query = elements.searchInput.value.trim().toLowerCase();
    const cards = [...document.querySelectorAll('.achievement-item')];
    let visibleCards = 0;

    cards.forEach((card) => {
      const text = card.textContent.toLowerCase();
      const hidden = Boolean(query) && !text.includes(query);
      card.hidden = hidden;
      if (!hidden) visibleCards += 1;
    });

    elements.achievementEmpty.hidden = visibleCards > 0 || !query;
    elements.achievementEmpty.textContent = 'Nenhuma conquista encontrada para a busca atual.';
  });
}

function syncFilters() {
  elements.filterButtons.forEach((button) => {
    const isSelected = button.dataset.filter === state.filter;
    button.classList.toggle('is-selected', isSelected);
    button.setAttribute('aria-pressed', String(isSelected));
  });
}

function attachFilterHandlers() {
  elements.filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      state.filter = button.dataset.filter;
      syncFilters();
      renderCards();
    });
  });
}

function attachModalEvents() {
  elements.closeModalBtn.addEventListener('click', closeModal);
  elements.confirmCloseModal.addEventListener('click', closeModal);
  elements.modal.addEventListener('click', (event) => {
    if (event.target === elements.modal) closeModal();
  });
  document.addEventListener('keydown', (event) => {
    if (!elements.modal.hidden && event.key === 'Escape') {
      closeModal();
    }
    if (!elements.modal.hidden && event.key === 'Tab') {
      trapFocus(event);
    }
  });
}

function loadUser() {
  const user = OlhoDigitalAccount.requireAuthentication();
  if (!user) return false;
  const fullName = user.name || 'Fernando';
  elements.profileName.textContent = fullName;
  OlhoDigitalAccount.applySettings(OlhoDigitalAccount.getEffectiveSettings(user));
  OlhoDigitalAccount.updateProfileAvatars(user);
  return true;
}

function init() {
  if (!OlhoDigitalAccount) return;

  if (!loadUser()) return;
  renderProgress();
  renderNextAchievement();
  renderCards();
  syncFilters();
  handleHeaderInteraction();
  attachFilterHandlers();
  attachModalEvents();
  OlhoDigitalAccount.initProfileMenu();
}

init();
