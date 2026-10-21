// Trilhas da página Aprender: agrupa os cursos por tema, com filtro por categoria e nível e busca.
document.addEventListener('DOMContentLoaded', () => {
  const catalog = document.getElementById('catalogGrid');
  const filters = document.getElementById('catalogFilters');
  const summary = document.getElementById('catalogSummary');
  const user = OlhoDigitalAccount.getCurrentUser();
  if (!catalog || !filters || !user || !window.novosCursos) return;

  // Os 10 cursos originais vêm de home-data.js; os 50 novos, de catalogo/*.js.
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
  const hrefs = {};
  (window.homeData?.cursos || []).forEach((course) => {
    const meta = ORIGINAL_META[course.chave] || { category: 'Contas e dispositivos', icon: '📘' };
    courses[course.chave] = { category: meta.category, icon: meta.icon, difficulty: course.nivel, title: course.nome, summary: course.descricao };
    hrefs[course.chave] = `./aprender/materias/${course.chave}/${course.primeiraPagina}`;
  });
  Object.assign(courses, window.novosCursos);

  const BANNER = { 'Fácil': 'blue', 'Médio': 'purple', 'Difícil': 'red' };
  const LEVELS = ['Fácil', 'Médio', 'Difícil'];
  const LEVEL_ORDER = new Map(LEVELS.map((level, index) => [level, index]));
  const TRAIL_META = {
    'Contas e dispositivos': { icon: '🔐', description: 'Fortaleça contas, senhas e aparelhos usados no dia a dia.' },
    'Golpes e engenharia social': { icon: '🛡️', description: 'Aprenda a reconhecer manipulações e se proteger de fraudes.' },
    'Privacidade e família': { icon: '🧭', description: 'Cuide dos seus dados e da segurança digital de quem está perto.' },
    'Segurança no trabalho': { icon: '🏢', description: 'Leve boas práticas de segurança para a rotina profissional.' },
    'Técnico e defesa': { icon: '💻', description: 'Avance em conceitos técnicos e estratégias de defesa.' }
  };
  const categories = [...new Set(Object.values(courses).map((course) => course.category))];
  const state = { category: '', level: '', query: '' };

  const create = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  };

  const trailGroups = new Map(categories.map((category) => {
    const meta = TRAIL_META[category] || { icon: '📘', description: 'Avance nos cursos deste tema, do nível básico ao avançado.' };
    const section = create('section', 'learning-trail');
    section.dataset.category = category;

    const heading = create('div', 'trail-heading');
    const icon = create('span', 'trail-icon', meta.icon);
    icon.setAttribute('aria-hidden', 'true');
    const intro = create('div', 'trail-intro');
    intro.append(create('span', 'trail-eyebrow', 'Trilha temática'), create('h3', '', category), create('p', '', meta.description));
    const count = create('span', 'trail-count');
    count.dataset.trailCount = category;
    const carousel = create('div', 'trail-carousel');
    const previous = create('button', 'trail-arrow', '<');
    previous.type = 'button';
    previous.setAttribute('aria-label', `Cursos anteriores: ${category}`);
    const next = create('button', 'trail-arrow', '>');
    next.type = 'button';
    next.setAttribute('aria-label', `Próximos cursos: ${category}`);
    heading.append(icon, intro, count);

    const courseGrid = create('div', 'trail-course-track');
    courseGrid.id = `trail-courses-${categories.indexOf(category)}`;
    courseGrid.setAttribute('role', 'region');
    courseGrid.setAttribute('aria-label', `Cursos da trilha ${category}`);
    previous.setAttribute('aria-controls', courseGrid.id);
    next.setAttribute('aria-controls', courseGrid.id);

    const progressRail = create('div', 'trail-progress-rail');
    const progressBar = create('div', 'trail-progress-bar');
    progressRail.append(progressBar);

    carousel.append(previous, courseGrid, next);
    section.append(heading, carousel, progressRail);
    const scrollTrack = (direction) => {
      const firstCard = courseGrid.querySelector('.course-card');
      const step = firstCard ? firstCard.getBoundingClientRect().width + 16 : courseGrid.clientWidth * 0.6;
      courseGrid.scrollBy({ left: direction * step, behavior: 'smooth' });
    };
    previous.addEventListener('click', () => scrollTrack(-1));
    next.addEventListener('click', () => scrollTrack(1));
    const updateControls = () => {
      const canScroll = courseGrid.scrollWidth > courseGrid.clientWidth + 1;
      previous.disabled = !canScroll || courseGrid.scrollLeft <= 1;
      next.disabled = !canScroll || courseGrid.scrollLeft + courseGrid.clientWidth >= courseGrid.scrollWidth - 1;

      const maxScroll = Math.max(courseGrid.scrollWidth - courseGrid.clientWidth, 0);
      const barVisible = maxScroll > 0 ? Math.max((courseGrid.clientWidth / courseGrid.scrollWidth) * 100, 20) : 100;
      const offset = maxScroll > 0 ? (courseGrid.scrollLeft / maxScroll) * (100 - barVisible) : 0;
      progressBar.style.width = `${barVisible}%`;
      progressBar.style.transform = `translateX(${offset}%)`;
    };
    courseGrid.addEventListener('scroll', updateControls, { passive: true });
    window.addEventListener('resize', updateControls);
    requestAnimationFrame(updateControls);
    catalog.append(section);
    return [category, { section, courseGrid, count, total: 0, updateControls }];
  }));

  const trailSteps = new Map(categories.map((category) => [category, 0]));
  const cards = Object.entries(courses)
    .map(([key, course], index) => ({ key, course, index }))
    .sort((first, second) => {
      const categoryOrder = categories.indexOf(first.course.category) - categories.indexOf(second.course.category);
      const levelOrder = (LEVEL_ORDER.get(first.course.difficulty) ?? LEVELS.length) - (LEVEL_ORDER.get(second.course.difficulty) ?? LEVELS.length);
      return categoryOrder || levelOrder || first.index - second.index;
    })
    .map(({ key, course }) => {
    const completed = Number(OlhoDigitalAccount.getCourseValue(user, key, 'Progress')) >= 100;
    const started = OlhoDigitalAccount.getCourseValue(user, key, 'Started') === 'true';
    const rating = Number(OlhoDigitalAccount.getCourseValue(user, key, 'Rating'));

    const card = create('article', 'course-card');
    const banner = create('div', `course-banner ${BANNER[course.difficulty] || 'blue'}`);
    const step = trailSteps.get(course.category) + 1;
    trailSteps.set(course.category, step);
    banner.append(create('span', 'course-step', `Etapa ${step}`), create('span', 'level', course.difficulty), create('h3', '', `${course.icon} ${course.title}`));

    const body = create('div', 'course-body');
    body.append(create('p', 'course-summary', course.summary));
    if (completed || started) {
      body.append(create('p', completed ? 'course-completion' : 'course-completion is-incomplete', completed ? 'Curso concluído' : 'Não concluído'));
    }
    if (completed && rating >= 1 && rating <= 5) {
      const stars = create('div', 'course-rating');
      stars.setAttribute('aria-label', `Sua avaliação: ${rating} de 5 estrelas`);
      stars.append(create('strong', '', '★'.repeat(rating) + '☆'.repeat(5 - rating)), create('span', '', ` ${rating}/5`));
      body.append(stars);
    }
    const link = create('a', 'primary-btn block', completed ? 'Rever curso' : started ? 'Continuar' : 'Começar');
    link.href = hrefs[key] || `./aprender/materias/catalogo/curso.html?curso=${encodeURIComponent(key)}`;
    body.append(link);

    card.append(banner, body);
    card.dataset.search = `${course.title} ${course.summary} ${course.category} ${course.difficulty}`.toLocaleLowerCase('pt-BR');
    card.dataset.category = course.category;
    card.dataset.level = course.difficulty;
    const trail = trailGroups.get(course.category);
    trail.courseGrid.append(card);
    trail.total += 1;
    return { card, completed, category: course.category };
  });
  trailGroups.forEach(({ count, total }) => {
    count.textContent = `${total} cursos`;
  });

  const chip = (label, group, value) => {
    const button = create('button', 'catalog-chip', label);
    button.type = 'button';
    button.dataset.group = group;
    button.dataset.value = value;
    button.setAttribute('aria-pressed', String(state[group] === value));
    return button;
  };
  const row = (label, buttons) => {
    const container = create('div', 'catalog-chip-row');
    container.setAttribute('role', 'group');
    container.setAttribute('aria-label', label);
    container.append(...buttons);
    return container;
  };
  filters.append(
    row('Filtrar por categoria', [chip('Todas', 'category', ''), ...categories.map((name) => chip(name, 'category', name))]),
    row('Filtrar por nível', [chip('Todos os níveis', 'level', ''), ...LEVELS.map((name) => chip(name, 'level', name))])
  );

  const empty = create('p', 'catalog-empty', 'Nenhum curso encontrado com esses filtros.');
  empty.hidden = true;
  catalog.after(empty);

  const render = () => {
    let visible = 0;
    const visibleByCategory = new Map(categories.map((category) => [category, 0]));
    cards.forEach(({ card, category }) => {
      const match = (!state.category || card.dataset.category === state.category)
        && (!state.level || card.dataset.level === state.level)
        && (!state.query || card.dataset.search.includes(state.query));
      card.hidden = !match;
      if (match) {
        visible += 1;
        visibleByCategory.set(category, visibleByCategory.get(category) + 1);
      }
    });
    trailGroups.forEach(({ section, courseGrid, updateControls }, category) => {
      section.hidden = visibleByCategory.get(category) === 0;
      if (!section.hidden) {
        courseGrid.scrollLeft = 0;
        updateControls();
      }
    });
    empty.hidden = visible > 0;
    filters.querySelectorAll('.catalog-chip').forEach((button) => {
      button.setAttribute('aria-pressed', String(state[button.dataset.group] === button.dataset.value));
    });
  };

  const done = cards.filter((entry) => entry.completed).length;
  if (summary) summary.textContent = `${cards.length} cursos organizados em ${categories.length} trilhas temáticas, com progressão do nível fácil ao difícil. Você concluiu ${done}.`;

  filters.addEventListener('click', (event) => {
    const button = event.target.closest('.catalog-chip');
    if (!button) return;
    state[button.dataset.group] = button.dataset.value;
    render();
  });
  document.getElementById('learningSearch')?.addEventListener('input', (event) => {
    state.query = event.target.value.trim().toLocaleLowerCase('pt-BR');
    render();
  });
  render();
});
