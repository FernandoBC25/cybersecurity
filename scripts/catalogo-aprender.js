// Trilhas da página Aprender e cursos da página de detalhes.
document.addEventListener('DOMContentLoaded', () => {
  const catalog = document.getElementById('catalogGrid');
  const filters = document.getElementById('catalogFilters');
  const summary = document.getElementById('catalogSummary');
  const detail = document.getElementById('learningTrailDetail');
  const user = OlhoDigitalAccount.getCurrentUser();
  if (!catalog || !user || !window.novosCursos) return;

  const ORIGINAL_META = {
    'fundamentos': { category: 'Contas e dispositivos', icon: '🛡️' },
    'phishing': { category: 'Golpes e engenharia social', icon: '🎣' },
    'redes': { category: 'Técnico e defesa', icon: '🌐' },
    'malware': { category: 'Técnico e defesa', icon: '🦠' },
    'proteger-sites': { category: 'Técnico e defesa', icon: '🧱' },
    'protecao-dados-senhas': { category: 'Contas e dispositivos', icon: '🔐' },
    'como-hackers-agem': { category: 'Técnico e defesa', icon: '🧭' },
    'seguranca-na-nuvem': { category: 'Técnico e defesa', icon: '☁️' },
    'evitar-golpes-internet': { category: 'Golpes e engenharia social', icon: '🚫' },
    'identificar-combater-ataques': { category: 'Segurança no trabalho', icon: '🚨' }
  };
  const courses = {};
  (window.homeData?.cursos || []).forEach((course) => {
    const meta = ORIGINAL_META[course.chave] || { category: 'Contas e dispositivos', icon: '📘' };
    courses[course.chave] = {
      category: meta.category,
      icon: meta.icon,
      difficulty: course.nivel,
      title: course.nome,
      summary: course.descricao
    };
  });
  Object.assign(courses, window.novosCursos);

  const LEVELS = ['Fácil', 'Médio', 'Difícil'];
  const LEVEL_ORDER = new Map(LEVELS.map((level, index) => [level, index]));
  const TRAILS = {
    'accounts-devices': {
      category: 'Contas e dispositivos',
      color: '#3979B9',
      description: 'Fortaleça contas, senhas e aparelhos usados no dia a dia.',
      iconPaths: ['M12 3 4.5 6v5.4c0 4.5 3.1 7.8 7.5 9.6 4.4-1.8 7.5-5.1 7.5-9.6V6L12 3Z', 'm9 12 2 2 4-4']
    },
    'scams-social-engineering': {
      category: 'Golpes e engenharia social',
      color: '#D97745',
      description: 'Aprenda a reconhecer manipulações e se proteger de fraudes.',
      iconPaths: ['M4 5.5h16v11H9l-5 3v-14Z', 'M8 10h.01M12 10h.01M16 10h.01']
    },
    'privacy-family': {
      category: 'Privacidade e família',
      color: '#C58B38',
      description: 'Cuide dos seus dados e da segurança digital de quem está perto.',
      iconPaths: ['M2 12c2.5-4 6-6 10-6s7.5 2 10 6c-2.5 4-6 6-10 6s-7.5-2-10-6Z', 'M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z']
    },
    'workplace-security': {
      category: 'Segurança no trabalho',
      color: '#429B78',
      description: 'Leve boas práticas de segurança para a rotina profissional.',
      iconPaths: ['M3 8h18v12H3z', 'M8 8V5h8v3', 'M3 13h18', 'M10 13v2h4v-2']
    },
    'technical-defense': {
      category: 'Técnico e defesa',
      color: '#8B78D6',
      description: 'Avance em conceitos técnicos e estratégias de defesa.',
      iconPaths: ['M3 4h18v13H3z', 'M8 21h8', 'M12 17v4', 'M8 9h2', 'M8 13h2', 'M14 9h2', 'M14 13h2']
    }
  };
  const TRAILS_BY_CATEGORY = new Map(
    Object.entries(TRAILS).map(([id, trail]) => [trail.category, { ...trail, id }])
  );
  const categories = [...new Set(Object.values(courses).map((course) => course.category))];
  categories.forEach((category) => {
    if (!TRAILS_BY_CATEGORY.has(category)) {
      throw new Error(`A trilha "${category}" não possui uma identidade visual definida.`);
    }
  });
  const selectedTrailParam = new URLSearchParams(window.location.search).get('trilha');
  const selectedTrail = TRAILS_BY_CATEGORY.get(TRAILS[selectedTrailParam]?.category)
    || TRAILS_BY_CATEGORY.get(selectedTrailParam);
  const isDetailPage = Boolean(detail);
  const state = { level: '', query: '' };
  const routePrefix = isDetailPage ? './materias/' : './aprender/materias/';

  const create = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  };
  const createTrailIcon = (trail) => {
    const svgNamespace = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNamespace, 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('focusable', 'false');
    trail.iconPaths.forEach((pathData) => {
      const path = document.createElementNS(svgNamespace, 'path');
      path.setAttribute('d', pathData);
      svg.append(path);
    });
    return svg;
  };
  const entries = Object.entries(courses)
    .map(([key, course], index) => ({ key, course, index }))
    .sort((first, second) => {
      const categoryOrder = categories.indexOf(first.course.category) - categories.indexOf(second.course.category);
      const levelOrder = (LEVEL_ORDER.get(first.course.difficulty) ?? LEVELS.length)
        - (LEVEL_ORDER.get(second.course.difficulty) ?? LEVELS.length);
      return categoryOrder || levelOrder || first.index - second.index;
    });
  const getCourseHref = (key) => {
    const originalCourse = (window.homeData?.cursos || []).find((course) => course.chave === key);
    if (originalCourse) return `${routePrefix}${key}/${originalCourse.primeiraPagina}`;
    return `${routePrefix}catalogo/curso.html?curso=${encodeURIComponent(key)}`;
  };
  const createCourseCard = ({ key, course }, step) => {
    const completed = Number(OlhoDigitalAccount.getCourseValue(user, key, 'Progress')) >= 100;
    const started = OlhoDigitalAccount.getCourseValue(user, key, 'Started') === 'true';
    const rating = Number(OlhoDigitalAccount.getCourseValue(user, key, 'Rating'));
    const card = create('article', 'course-card');
    card.setAttribute('role', 'listitem');
    const banner = create('div', 'course-banner');
    banner.append(
      create('span', 'course-step', `Etapa ${step}`),
      create('span', 'level', course.difficulty),
      create('h3', '', course.title)
    );

    const body = create('div', 'course-body');
    body.append(create('p', 'course-summary', course.summary));
    if (completed || started) {
      body.append(create(
        'p',
        completed ? 'course-completion' : 'course-completion is-incomplete',
        completed ? 'Curso concluído' : 'Não concluído'
      ));
    }
    if (completed && rating >= 1 && rating <= 5) {
      const stars = create('div', 'course-rating');
      stars.setAttribute('aria-label', `Sua avaliação: ${rating} de 5 estrelas`);
      stars.append(
        create('strong', '', '★'.repeat(rating) + '☆'.repeat(5 - rating)),
        create('span', '', ` ${rating}/5`)
      );
      body.append(stars);
    }
    const link = create(
      'a',
      'primary-btn block',
      completed ? 'Rever curso' : started ? 'Continuar' : 'Começar'
    );
    link.href = getCourseHref(key);
    body.append(link);
    card.append(banner, body);
    card.dataset.search = `${course.title} ${course.summary} ${course.category} ${course.difficulty}`.toLocaleLowerCase('pt-BR');
    card.dataset.level = course.difficulty;
    return card;
  };

  const completedByCategory = new Map(categories.map((category) => [category, 0]));
  entries.forEach(({ key, course }) => {
    if (Number(OlhoDigitalAccount.getCourseValue(user, key, 'Progress')) >= 100) {
      completedByCategory.set(course.category, completedByCategory.get(course.category) + 1);
    }
  });

  if (isDetailPage) {
    const trail = selectedTrail;
    const category = trail?.category;
    const notFound = document.getElementById('trailNotFound');
    const content = document.getElementById('trailContent');
    if (!category) {
      document.title = 'Olho Digital | Trilha não encontrada';
      document.getElementById('trailTitle').textContent = 'Trilha não encontrada';
      notFound.hidden = false;
      content.hidden = true;
      return;
    }

    document.body.dataset.trailId = trail.id;
    document.body.style.setProperty('--trail-accent', trail.color);
    document.title = `Olho Digital | ${category}`;
    document.getElementById('trailIcon').replaceChildren(createTrailIcon(trail));
    document.getElementById('trailTitle').textContent = category;
    document.getElementById('trailDescription').textContent = trail.description;
    const trailCourses = entries.filter(({ course }) => course.category === category);
    const completedCount = completedByCategory.get(category);
    const progressPercent = trailCourses.length ? Math.round((completedCount / trailCourses.length) * 100) : 0;
    document.getElementById('trailCourseCount').textContent = `${trailCourses.length} cursos nesta trilha`;
    document.getElementById('trailCompletionCount').textContent = `${completedCount} de ${trailCourses.length} concluídos`;
    document.getElementById('trailProgressTrack').setAttribute('aria-valuenow', String(progressPercent));
    document.getElementById('trailProgressBar').style.width = `${progressPercent}%`;
    const cards = trailCourses.map((entry, index) => {
      const card = createCourseCard(entry, index + 1);
      catalog.append(card);
      return card;
    });
    const empty = create('p', 'catalog-empty', 'Nenhum curso encontrado com esses filtros.');
    empty.hidden = true;
    catalog.after(empty);

    const chip = (label, value) => {
      const button = create('button', 'catalog-chip', label);
      button.type = 'button';
      button.dataset.value = value;
      button.setAttribute('aria-pressed', String(state.level === value));
      return button;
    };
    const levelRow = create('div', 'catalog-chip-row');
    levelRow.setAttribute('role', 'group');
    levelRow.setAttribute('aria-label', 'Filtrar por nível');
    levelRow.append(chip('Todos os níveis', ''), ...LEVELS.map((level) => chip(level, level)));
    filters.append(levelRow);

    const render = () => {
      let visible = 0;
      cards.forEach((card) => {
        const matches = (!state.level || card.dataset.level === state.level)
          && (!state.query || card.dataset.search.includes(state.query));
        card.hidden = !matches;
        if (matches) visible += 1;
      });
      empty.hidden = visible > 0;
      filters.querySelectorAll('.catalog-chip').forEach((button) => {
        button.setAttribute('aria-pressed', String(state.level === button.dataset.value));
      });
    };
    filters.addEventListener('click', (event) => {
      const button = event.target.closest('.catalog-chip');
      if (!button) return;
      state.level = button.dataset.value;
      render();
    });
    document.getElementById('learningSearch')?.addEventListener('input', (event) => {
      state.query = event.target.value.trim().toLocaleLowerCase('pt-BR');
      render();
    });
    render();
    return;
  }

  const totalCompleted = [...completedByCategory.values()].reduce((sum, count) => sum + count, 0);
  summary.textContent = `${categories.length} trilhas · ${entries.length} cursos · ${totalCompleted} concluídos`;
  categories.forEach((category) => {
    const trail = TRAILS_BY_CATEGORY.get(category);
    const trailCourses = entries.filter(({ course }) => course.category === category);
    const total = trailCourses.length;
    const completed = completedByCategory.get(category);
    const progressPercent = total ? Math.round((completed / total) * 100) : 0;
    const card = create('article', 'trail-overview-card');
    card.dataset.trailId = trail.id;
    card.style.setProperty('--trail-accent', trail.color);
    const icon = create('span', 'trail-overview-icon');
    icon.append(createTrailIcon(trail));
    const progressLabel = create('p', 'trail-overview-progress', `${completed} de ${total} cursos concluídos`);
    const progress = create('div', 'trail-progress');
    progress.setAttribute('role', 'progressbar');
    progress.setAttribute('aria-label', `Progresso da trilha ${category}`);
    progress.setAttribute('aria-valuemin', '0');
    progress.setAttribute('aria-valuemax', '100');
    progress.setAttribute('aria-valuenow', String(progressPercent));
    progress.classList.toggle('has-progress', progressPercent > 0);
    const progressBar = create('span', 'trail-progress-bar');
    progressBar.style.width = `${progressPercent}%`;
    progress.append(progressBar);
    card.append(
      icon,
      create('h3', '', category),
      create('p', 'trail-overview-description', trail.description),
      progressLabel,
      progress
    );
    const link = create('a', 'trail-overview-link');
    const arrow = create('span', 'trail-overview-arrow', '→');
    arrow.setAttribute('aria-hidden', 'true');
    link.append(create('span', '', 'Acessar trilha'), arrow);
    link.href = `./aprender/trilha.html?trilha=${encodeURIComponent(trail.id)}`;
    card.append(link);
    const searchableContent = trailCourses.map(({ course }) => `${course.title} ${course.summary}`).join(' ');
    card.dataset.search = `${category} ${trail.description} ${searchableContent}`.toLocaleLowerCase('pt-BR');
    catalog.append(card);
  });

  const empty = create('p', 'catalog-empty', 'Nenhuma trilha encontrada.');
  empty.hidden = true;
  empty.id = 'catalogEmpty';
  catalog.after(empty);
  document.getElementById('learningSearch')?.addEventListener('input', (event) => {
    state.query = event.target.value.trim().toLocaleLowerCase('pt-BR');
    const cards = catalog.querySelectorAll('.trail-overview-card');
    let visible = 0;
    cards.forEach((card) => {
      const matches = !state.query || card.dataset.search.includes(state.query);
      card.hidden = !matches;
      if (matches) visible += 1;
    });
    empty.hidden = visible > 0;
  });
});
