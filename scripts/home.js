const homeData = window.homeData;
const profileToggle = document.getElementById('profileToggle');
const profileDropdown = document.getElementById('profileDropdown');
const notificationToggle = document.getElementById('notificationToggle');
const notificationDropdown = document.getElementById('notificationDropdown');
const menuToggle = document.getElementById('menuToggle');
const sidebar = document.getElementById('sidebar');
const sidebarBackdrop = document.getElementById('sidebarBackdrop');
const searchInput = document.getElementById('searchInput');
const courseCarousel = document.getElementById('courseCarousel');

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[character]);
}

function loadUser() {
  const user = OlhoDigitalAccount.requireAuthentication();
  if (!user) return false;

  const fullName = user.name || 'Usuário';
  const firstName = fullName.trim().split(/\s+/)[0] || 'Usuário';
  document.getElementById('profileName').textContent = fullName;
  document.getElementById('welcomeName').textContent = firstName;
  OlhoDigitalAccount.applySettings(OlhoDigitalAccount.getEffectiveSettings(user));
  OlhoDigitalAccount.updateProfileAvatars(user);
  return true;
}

// Etapas dos cursos, na ordem; "minimo" é o progresso salvo ao chegar nela.
const COURSE_STAGES = [
  { minimo: 0, nome: 'Material', pagina: null, etapa: 'material' },
  { minimo: 33, nome: 'Vídeo', pagina: 'video.html', etapa: 'video' },
  { minimo: 66, nome: 'Questionário', pagina: 'questionario.html', etapa: 'quiz' },
  { minimo: 75, nome: 'Avaliação do curso', pagina: 'avaliacao.html', etapa: 'evaluation' }
];

function getUserCourses() {
  const user = OlhoDigitalAccount.getCurrentUser();
  const saved = OlhoDigitalData.getCourses(user);
  return homeData.cursos.map((course) => ({ ...course, ...saved[course.chave] }));
}

function lastAccessLabel(timestamp) {
  if (!timestamp) return '';
  const days = Math.floor((Date.now() - timestamp) / 86400000);
  if (days <= 0) return 'Hoje';
  if (days === 1) return 'Ontem';
  return `Há ${days} dias`;
}

// O curso em andamento mexido por último (iniciado e ainda não concluído).
function findCurrentCourse() {
  const course = getUserCourses()
    .filter((item) => item.started && (item.progress || 0) < 100)
    .sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0))[0];
  if (!course) return null;

  const progress = course.progress || 0;
  const stageIndex = COURSE_STAGES.reduce((found, stage, index) => (progress >= stage.minimo ? index : found), 0);
  const stage = COURSE_STAGES[stageIndex];
  const folder = `./aprender/materias/${course.chave}/`;
  const link = course.etapas === 'parametro'
    ? `${folder}${course.primeiraPagina}?etapa=${stage.etapa}`
    : folder + (stage.pagina || course.primeiraPagina);

  return {
    trilha: course.nivel,
    nome: course.nome,
    moduloAtual: stageIndex + 1,
    totalModulos: COURSE_STAGES.length,
    moduloNome: stage.nome,
    progresso: progress,
    ultimaAtividade: stageIndex === 0 ? 'Curso iniciado' : `${COURSE_STAGES[stageIndex - 1].nome} concluído`,
    ultimoAcesso: lastAccessLabel(course.updatedAt),
    imagem: course.imagem,
    alt: '',
    link
  };
}

function renderCurrentCourse() {
  const target = document.getElementById('currentCourse');
  const course = findCurrentCourse();

  if (!course) {
    target.innerHTML = `
      <article class="empty-course">
        <span class="empty-course-icon" aria-hidden="true">✦</span>
        <div><h3>Comece sua jornada</h3><p>Você ainda não iniciou nenhum curso.</p></div>
        <a class="button-primary" href="./aprender.html">Explorar conteúdos <span aria-hidden="true">→</span></a>
      </article>`;
    return;
  }

  const progress = Math.min(100, Math.max(0, Number(course.progresso) || 0));
  target.innerHTML = `
    <article class="current-course-card">
      <div class="current-course-image">
        <img src="${escapeHTML(course.imagem)}" alt="${escapeHTML(course.alt)}" />
        <span class="image-shade" aria-hidden="true"></span>
        <span class="course-path-label">${escapeHTML(course.trilha)}</span>
      </div>
      <div class="current-course-content">
        <div class="course-title-row">
          <div><p class="course-overline">NÍVEL <span aria-hidden="true">/</span> ${escapeHTML(course.trilha)}</p><h3>${escapeHTML(course.nome)}</h3></div>
          <span class="last-access">${escapeHTML(course.ultimoAcesso)}</span>
        </div>
        <p class="module-line">Módulo ${escapeHTML(course.moduloAtual)} de ${escapeHTML(course.totalModulos)} <span aria-hidden="true">·</span> ${escapeHTML(course.moduloNome)}</p>
        <div class="progress-line"><div class="progress-track" role="progressbar" aria-label="Progresso do curso" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${progress}"><span style="width: ${progress}%"></span></div><strong>${progress}%</strong></div>
        <div class="last-activity"><span class="activity-icon" aria-hidden="true">▶</span><span><small>ÚLTIMA ATIVIDADE</small><strong>${escapeHTML(course.ultimaAtividade)}</strong></span></div>
        <div class="course-actions"><a class="button-primary" href="${escapeHTML(course.link)}">Continuar curso <span aria-hidden="true">→</span></a><a class="text-link" href="./aprender.html">Ver meus cursos <span aria-hidden="true">→</span></a></div>
      </div>
    </article>`;
}

function renderNews() {
  const news = homeData.noticiaDestaque;
  document.getElementById('featuredNews').innerHTML = `
    <article class="news-card" data-content-topics="phishing">
      <a class="news-image" href="./noticias.html" aria-label="Ler notícia: ${escapeHTML(news.titulo)}"><img src="${escapeHTML(news.imagem)}" alt="${escapeHTML(news.alt)}" loading="lazy" /><span class="news-category">SEGURANÇA DIGITAL</span></a>
      <div class="news-content"><p class="news-meta">DESTAQUE <span aria-hidden="true">·</span> Leitura de 4 min</p><h3>${escapeHTML(news.titulo)}</h3><p>${escapeHTML(news.resumo)}</p><a class="text-link" href="./noticias.html">Ler notícia <span aria-hidden="true">→</span></a></div>
      <a class="news-all-link" href="./noticias.html">Ver todas <span aria-hidden="true">→</span></a>
    </article>`;
}

// Recomenda cursos que a pessoa ainda não começou (ou, se começou todos, os não concluídos).
function renderRecommendations() {
  const courses = getUserCourses();
  const notStarted = courses.filter((course) => !course.started);
  const list = notStarted.length ? notStarted : courses.filter((course) => (course.progress || 0) < 100);
  courseCarousel.innerHTML = list.length
    ? list.map((course) => {
      const topics = course.chave === 'phishing' || course.chave === 'evitar-golpes-internet'
        ? 'phishing'
        : course.chave === 'protecao-dados-senhas' ? 'privacy' : '';
      const href = `./aprender/materias/${course.chave}/${course.primeiraPagina}`;
      return `
      <article class="recommended-card" ${topics ? `data-content-topics="${topics}"` : ''}>
        <div class="recommended-image" aria-hidden="true"><img src="${escapeHTML(course.imagem)}" alt="" loading="lazy" /></div>
        <div class="recommended-content"><div class="course-tags"><span>${escapeHTML(course.nivel)}</span></div><h3>${escapeHTML(course.nome)}</h3><p>${escapeHTML(course.descricao)}</p><a class="text-link" href="${escapeHTML(href)}">${course.started ? 'Continuar' : 'Começar'} <span aria-hidden="true">→</span></a></div>
      </article>`;
    }).join('')
    : '<p class="search-empty">Você concluiu todos os cursos. Parabéns!</p>';
  updateCarouselButtons();
}

function timeAgo(date) {
  const minutes = Math.max(1, Math.floor((Date.now() - new Date(date).getTime()) / 60000));
  if (minutes < 60) return `Há ${minutes} min`;
  if (minutes < 1440) return `Há ${Math.floor(minutes / 60)} h`;
  return `Há ${Math.floor(minutes / 1440)} d`;
}

// Última publicação real da comunidade.
async function renderCommunityActivity() {
  const target = document.getElementById('communityActivity');
  const footer = '<a class="section-footer-link" href="./comunidade.html">Ver comunidade <span aria-hidden="true">→</span></a>';
  const { data, error } = await supabaseClient
    .from('posts')
    .select('texto, criado_em, autor:perfis!posts_autor_id_fkey (nome)')
    .order('criado_em', { ascending: false })
    .limit(1);
  const post = data?.[0];
  if (error || !post) {
    if (error) console.error('Não foi possível carregar a atividade da comunidade.', error);
    target.innerHTML = `<article class="activity-card"><div class="activity-copy"><p>Ainda não há publicações na comunidade.</p><a href="./comunidade.html">Seja o primeiro a publicar</a></div></article>${footer}`;
    return;
  }
  const name = post.autor?.nome || 'Usuário';
  const preview = post.texto.length > 70 ? `${post.texto.slice(0, 70).trim()}…` : post.texto;
  target.innerHTML = `
    <article class="activity-card"><span class="activity-avatar" aria-hidden="true">${escapeHTML(name.charAt(0).toUpperCase())}</span><div class="activity-copy"><p><strong>${escapeHTML(name)}</strong> publicou na comunidade</p><a href="./comunidade.html">${escapeHTML(preview)}</a><time>${timeAgo(post.criado_em)}</time></div><span class="activity-arrow" aria-hidden="true">↗</span></article>
    ${footer}`;
}

// Conquista calculada a partir dos cursos concluídos.
function renderAchievement() {
  const completed = getUserCourses().filter((course) => (course.progress || 0) >= 100).length;
  const total = homeData.cursos.length;
  const achievement = completed === 0
    ? { nome: 'Nenhuma conquista ainda', descricao: 'Conclua seu primeiro curso para ganhar a conquista Primeiros Passos.' }
    : completed === total
      ? { nome: 'Mestre da Segurança', descricao: `Você concluiu todos os ${total} cursos.` }
      : { nome: 'Primeiros Passos', descricao: `Você concluiu ${completed} de ${total} cursos.` };
  document.getElementById('latestAchievement').innerHTML = `
    <article class="achievement-card"><span class="achievement-icon" aria-hidden="true">✧</span><div><h3>${escapeHTML(achievement.nome)}</h3><p>${escapeHTML(achievement.descricao)}</p></div></article>
    <a class="section-footer-link" href="./aprender.html">Ver cursos <span aria-hidden="true">→</span></a>`;
}

function renderActivity() {
  renderCommunityActivity();
  renderAchievement();
}

function renderDailyMessage() {
  const day = Math.floor(Date.now() / 86400000);
  const message = homeData.mensagensDoDia[day % homeData.mensagensDoDia.length];
  document.getElementById('dailyMessage').textContent = message.texto;
  document.getElementById('dailySubtext').textContent = message.complemento;
}

function updateCarouselButtons() {
  if (!courseCarousel) return;
  document.getElementById('carouselPrevious').disabled = courseCarousel.scrollLeft <= 2;
  document.getElementById('carouselNext').disabled = courseCarousel.scrollLeft + courseCarousel.clientWidth >= courseCarousel.scrollWidth - 2;
}

function closeHeaderPopovers() {
  profileDropdown.hidden = true;
  notificationDropdown.hidden = true;
  profileToggle.setAttribute('aria-expanded', 'false');
  notificationToggle.setAttribute('aria-expanded', 'false');
}

function togglePopover(button, popover) {
  const shouldOpen = popover.hidden;
  closeHeaderPopovers();
  if (shouldOpen) {
    popover.hidden = false;
    button.setAttribute('aria-expanded', 'true');
  }
}

function toggleMobileMenu(open) {
  sidebar.classList.toggle('is-open', open);
  sidebarBackdrop.hidden = !open;
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  document.body.classList.toggle('menu-open', open);
}

function setupInteractions() {
  profileToggle.addEventListener('click', () => togglePopover(profileToggle, profileDropdown));
  notificationToggle.addEventListener('click', () => togglePopover(notificationToggle, notificationDropdown));
  document.addEventListener('click', (event) => {
    if (!(event.target instanceof Node)) return;
    if (!profileToggle.contains(event.target) && !profileDropdown.contains(event.target) && !notificationToggle.contains(event.target) && !notificationDropdown.contains(event.target)) closeHeaderPopovers();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeHeaderPopovers();
      toggleMobileMenu(false);
    }
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      searchInput.focus();
    }
  });
  const logoutDialog = document.getElementById('logoutDialog');
  document.getElementById('logoutBtn').addEventListener('click', () => {
    closeHeaderPopovers();
    logoutDialog.showModal();
  });
  document.getElementById('confirmLogout').addEventListener('click', () => {
    OlhoDigitalAuth.signOut();
  });
  menuToggle.addEventListener('click', () => toggleMobileMenu(!sidebar.classList.contains('is-open')));
  sidebarBackdrop.addEventListener('click', () => toggleMobileMenu(false));
  sidebar.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => toggleMobileMenu(false)));
  document.getElementById('carouselPrevious').addEventListener('click', () => courseCarousel.scrollBy({ left: -courseCarousel.clientWidth * 0.72, behavior: 'smooth' }));
  document.getElementById('carouselNext').addEventListener('click', () => courseCarousel.scrollBy({ left: courseCarousel.clientWidth * 0.72, behavior: 'smooth' }));
  courseCarousel.addEventListener('scroll', updateCarouselButtons, { passive: true });
  window.addEventListener('resize', updateCarouselButtons);
  searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim().toLocaleLowerCase('pt-BR');
    let matches = 0;
    document.querySelectorAll('.dashboard-grid > * > .panel').forEach((section) => {
      const visible = !query || section.textContent.toLocaleLowerCase('pt-BR').includes(query);
      section.hidden = section.dataset.preferenceHidden === 'true' || !visible;
      matches += Number(!section.hidden);
    });
    let emptyMessage = document.getElementById('searchEmpty');
    if (!emptyMessage) {
      emptyMessage = document.createElement('p');
      emptyMessage.id = 'searchEmpty';
      emptyMessage.className = 'search-empty';
      emptyMessage.setAttribute('role', 'status');
      emptyMessage.textContent = 'Nenhum conteúdo encontrado para essa busca.';
      document.querySelector('.page-shell').append(emptyMessage);
    }
    emptyMessage.hidden = matches > 0 || !query;
  });
}

if (loadUser()) {
  renderCurrentCourse();
  renderNews();
  renderRecommendations();
  renderActivity();
  renderDailyMessage();
  OlhoDigitalAccount.applySettings(OlhoDigitalAccount.getEffectiveSettings(OlhoDigitalAccount.getCurrentUser()));
  setupInteractions();
}