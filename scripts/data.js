// Camada de dados: o Supabase é a fonte da verdade e o localStorage é só cache
// por usuário, para as telas poderem ler de forma síncrona.
// Carregar depois de auth.js.
(function () {
  const PREFIX = 'olhoDigital.';
  const EMPTY_ACTIVITY = () => ({
    community: { likes: [], saves: [], comments: [] },
    news: { comments: [] },
    learning: { videos: [] }
  });

  const accountKey = (user) => encodeURIComponent(user.email.trim());
  const cacheKey = (kind, user) => `${PREFIX}${kind}.${accountKey(user)}`;

  function readCache(kind, user) {
    try {
      return JSON.parse(localStorage.getItem(cacheKey(kind, user)) || 'null');
    } catch {
      return null;
    }
  }

  // Conta as alterações feitas pelo usuário nesta página; a sincronização usa isso
  // para não sobrescrever (nem recarregar) por cima de algo que acabou de mudar.
  let localWrites = 0;

  function writeCache(kind, user, value) {
    localStorage.setItem(cacheKey(kind, user), JSON.stringify(value));
  }

  // Texto que representa o conteúdo sem depender da ordem: o JSONB do Postgres
  // devolve as chaves em outra ordem, e isso não pode contar como "mudou".
  function canonical(value) {
    if (Array.isArray(value)) return `[${value.map(canonical).sort().join(',')}]`;
    if (value && typeof value === 'object') {
      return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${canonical(value[key])}`).join(',')}}`;
    }
    return JSON.stringify(value ?? null);
  }

  // Escritas no servidor não bloqueiam a tela; falhas ficam no console.
  function report(label, error) {
    if (error) console.error(`Não foi possível sincronizar ${label} com o servidor.`, error);
  }

  async function push(label, request) {
    try {
      const { error } = await request;
      report(label, error);
    } catch (error) {
      report(label, error);
    }
  }

  // ---- Cursos -------------------------------------------------------
  // Valores como texto, no mesmo formato que o localStorage antigo usava.
  function getCourseValue(user, course, field) {
    const data = readCache('courses', user)?.[course] || {};
    if (field === 'Started') return data.started ? 'true' : 'false';
    if (field === 'Progress') return String(data.progress ?? 0);
    return data.rating ? String(data.rating) : '';
  }

  function setCourseValue(user, course, field, value) {
    const courses = readCache('courses', user) || {};
    const data = courses[course] || { started: false, progress: 0, rating: null };
    // Abrir de novo um curso já iniciado não muda nada; evita uma escrita a cada página.
    if (field === 'Started' && data.started && (value === true || value === 'true')) return Promise.resolve();
    if (field === 'Started') data.started = value === true || value === 'true';
    // O progresso só avança: rever um curso já feito não desfaz a conclusão.
    else if (field === 'Progress') {
      const progress = Math.max(0, Math.min(100, Number(value) || 0));
      if (progress <= (data.progress || 0)) return Promise.resolve();
      data.progress = progress;
    }
    else data.rating = Number(value) || null;
    localWrites += 1;
    const now = new Date();
    data.updatedAt = now.getTime();
    courses[course] = data;
    writeCache('courses', user, courses);
    // Quem vai trocar de página logo em seguida deve esperar esta promessa,
    // senão a navegação cancela a requisição e o servidor fica desatualizado.
    return push('o progresso do curso', supabaseClient.from('progresso_cursos').upsert({
      user_id: user.id,
      curso: course,
      iniciado: data.started,
      progresso: data.progress,
      nota: data.rating,
      atualizado_em: now.toISOString()
    }));
  }

  // ---- Configurações ------------------------------------------------
  const getSettingsCache = (user) => readCache('settings', user);

  function saveSettings(user, settings) {
    localWrites += 1;
    writeCache('settings', user, settings);
    push('as configurações', supabaseClient.from('configuracoes').upsert({
      user_id: user.id,
      preferencias: settings,
      atualizado_em: new Date().toISOString()
    }));
  }

  // ---- Atividade ----------------------------------------------------
  const getActivityCache = (user) => readCache('activity', user);

  function saveActivityEntry(user, area, action, entry) {
    localWrites += 1;
    const activity = readCache('activity', user) || EMPTY_ACTIVITY();
    const list = activity[area][action];
    const index = list.findIndex((item) => item.id === entry.id);
    if (index >= 0) list[index] = { ...list[index], ...entry };
    else list.unshift(entry);
    writeCache('activity', user, activity);
    push('a atividade', supabaseClient.from('atividade').upsert({
      user_id: user.id,
      area,
      acao: action,
      item_id: String(entry.id),
      dados: entry,
      atualizado_em: new Date().toISOString()
    }));
  }

  function removeActivityEntry(user, area, action, id) {
    localWrites += 1;
    const activity = readCache('activity', user) || EMPTY_ACTIVITY();
    activity[area][action] = activity[area][action].filter((item) => item.id !== id);
    writeCache('activity', user, activity);
    push('a atividade', supabaseClient.from('atividade').delete()
      .eq('user_id', user.id).eq('area', area).eq('acao', action).eq('item_id', String(id)));
  }

  // ---- Sincronização ------------------------------------------------
  // Baixa tudo do servidor para o cache. Se o servidor ainda está vazio e este
  // navegador tem dados locais (de antes do Supabase), sobe os dados locais.
  // Retorna true se o cache mudou.
  async function hydrate() {
    const user = OlhoDigitalAuth.getCurrentUser();
    if (!user) return false;

    const writesBefore = localWrites;
    const [courses, settings, activity] = await Promise.all([
      supabaseClient.from('progresso_cursos').select('*'),
      supabaseClient.from('configuracoes').select('*').maybeSingle(),
      supabaseClient.from('atividade').select('*')
    ]);
    const failure = courses.error || settings.error || activity.error;
    if (failure) {
      report('os dados da conta', failure);
      return false;
    }
    // Algo mudou aqui enquanto o servidor respondia: o que chegou já está velho.
    // As escritas locais seguem para o servidor e a próxima página sincroniza.
    if (localWrites !== writesBefore) return false;

    const snapshot = () => canonical([readCache('courses', user), readCache('settings', user), readCache('activity', user)]);
    const before = snapshot();

    // Curso a curso, vale a versão mais recente. Uma escrita local ainda a caminho
    // do servidor não é sobrescrita pelo dado antigo, e o que só existe aqui é enviado.
    const localCourses = readCache('courses', user) || {};
    const mergedCourses = { ...localCourses };
    const serverTimes = {};
    courses.data.forEach((row) => {
      const server = { started: row.iniciado, progress: row.progresso, rating: row.nota, updatedAt: Date.parse(row.atualizado_em) };
      serverTimes[row.curso] = server.updatedAt;
      if ((localCourses[row.curso]?.updatedAt || 0) <= server.updatedAt) mergedCourses[row.curso] = server;
    });
    writeCache('courses', user, mergedCourses);
    const pending = Object.entries(localCourses)
      .filter(([course, data]) => !(course in serverTimes) || (data.updatedAt || 0) > serverTimes[course])
      .map(([course, data]) => ({
        user_id: user.id,
        curso: course,
        iniciado: Boolean(data.started),
        progresso: data.progress || 0,
        nota: data.rating || null,
        atualizado_em: new Date(data.updatedAt || Date.now()).toISOString()
      }));
    if (pending.length) push('o progresso do curso', supabaseClient.from('progresso_cursos').upsert(pending));

    if (settings.data) writeCache('settings', user, settings.data.preferencias);
    else if (readCache('settings', user)) saveSettings(user, readCache('settings', user));

    if (activity.data.length) {
      const merged = EMPTY_ACTIVITY();
      activity.data.forEach((row) => merged[row.area]?.[row.acao]?.push(row.dados));
      Object.values(merged).forEach((area) => Object.values(area).forEach((list) => list.sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0))));
      writeCache('activity', user, merged);
    } else {
      const local = readCache('activity', user);
      Object.entries(local || {}).forEach(([area, actions]) => Object.entries(actions).forEach(([action, list]) =>
        list.forEach((entry) => saveActivityEntry(user, area, action, entry))));
    }

    const after = snapshot();
    return before !== after;
  }

  window.OlhoDigitalData = {
    hydrate,
    getCourses: (user) => readCache('courses', user) || {},
    getCourseValue,
    setCourseValue,
    getSettingsCache,
    saveSettings,
    getActivityCache,
    saveActivityEntry,
    removeActivityEntry
  };
})();
