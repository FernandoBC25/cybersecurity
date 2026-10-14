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

  function writeCache(kind, user, value) {
    localStorage.setItem(cacheKey(kind, user), JSON.stringify(value));
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
    if (field === 'Started') data.started = value === true || value === 'true';
    else if (field === 'Progress') data.progress = Math.max(0, Math.min(100, Number(value) || 0));
    else data.rating = Number(value) || null;
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
      atualizado_em: new Date().toISOString()
    }));
  }

  // ---- Configurações ------------------------------------------------
  const getSettingsCache = (user) => readCache('settings', user);

  function saveSettings(user, settings) {
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

    const before = JSON.stringify([readCache('courses', user), readCache('settings', user), readCache('activity', user)]);

    if (courses.data.length) {
      writeCache('courses', user, Object.fromEntries(courses.data.map((row) => [
        row.curso, { started: row.iniciado, progress: row.progresso, rating: row.nota }
      ])));
    } else {
      Object.entries(readCache('courses', user) || {}).forEach(([course, data]) => {
        setCourseValue(user, course, 'Started', data.started);
        setCourseValue(user, course, 'Progress', data.progress);
        if (data.rating) setCourseValue(user, course, 'Rating', data.rating);
      });
    }

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

    const after = JSON.stringify([readCache('courses', user), readCache('settings', user), readCache('activity', user)]);
    return before !== after;
  }

  window.OlhoDigitalData = {
    hydrate,
    getCourseValue,
    setCourseValue,
    getSettingsCache,
    saveSettings,
    getActivityCache,
    saveActivityEntry,
    removeActivityEntry
  };
})();
