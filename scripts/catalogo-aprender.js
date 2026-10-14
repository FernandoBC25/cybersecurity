// Catálogo de cursos da página Aprender: monta os cards a partir de window.novosCursos
// (aprender/materias/catalogo/*.js), com filtro por categoria e nível e busca.
document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('catalogGrid');
  const filters = document.getElementById('catalogFilters');
  const summary = document.getElementById('catalogSummary');
  const user = OlhoDigitalAccount.getCurrentUser();
  const courses = window.novosCursos;
  if (!grid || !filters || !user || !courses) return;

  const BANNER = { 'Fácil': 'blue', 'Médio': 'purple', 'Difícil': 'red' };
  const LEVELS = ['Fácil', 'Médio', 'Difícil'];
  const categories = [...new Set(Object.values(courses).map((course) => course.category))];
  const state = { category: '', level: '', query: '' };

  const create = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  };

  const cards = Object.entries(courses).map(([key, course]) => {
    const completed = Number(OlhoDigitalAccount.getCourseValue(user, key, 'Progress')) >= 100;
    const started = OlhoDigitalAccount.getCourseValue(user, key, 'Started') === 'true';
    const rating = Number(OlhoDigitalAccount.getCourseValue(user, key, 'Rating'));

    const card = create('article', 'course-card');
    const banner = create('div', `course-banner ${BANNER[course.difficulty] || 'blue'}`);
    banner.append(create('span', 'level', course.difficulty), create('h3', '', `${course.icon} ${course.title}`));

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
    link.href = `./aprender/materias/catalogo/curso.html?curso=${encodeURIComponent(key)}`;
    body.append(link);

    card.append(banner, body);
    card.dataset.search = `${course.title} ${course.summary} ${course.category} ${course.difficulty}`.toLocaleLowerCase('pt-BR');
    card.dataset.category = course.category;
    card.dataset.level = course.difficulty;
    grid.append(card);
    return { card, completed };
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
  grid.after(empty);

  const render = () => {
    let visible = 0;
    cards.forEach(({ card }) => {
      const match = (!state.category || card.dataset.category === state.category)
        && (!state.level || card.dataset.level === state.level)
        && (!state.query || card.dataset.search.includes(state.query));
      card.hidden = !match;
      if (match) visible += 1;
    });
    empty.hidden = visible > 0;
    filters.querySelectorAll('.catalog-chip').forEach((button) => {
      button.setAttribute('aria-pressed', String(state[button.dataset.group] === button.dataset.value));
    });
  };

  const done = cards.filter((entry) => entry.completed).length;
  if (summary) summary.textContent = `${cards.length} cursos em ${categories.length} categorias. Você concluiu ${done}.`;

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
