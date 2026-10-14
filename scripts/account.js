(function () {
  const SETTINGS_PREFIX = 'olhoDigital.settings.';
  const DRAFT_PREFIX = 'olhoDigital.settingsDraft.';
  const ACTIVITY_PREFIX = 'olhoDigital.activity.';
  const AVATAR_DATABASE = 'olhoDigitalAvatars';
  const AVATAR_STORE = 'avatars';
  const settingsChannel = 'BroadcastChannel' in window
    ? new BroadcastChannel('olhoDigital-settings-preview')
    : null;
  const defaults = {
    theme: 'light',
    fontSize: 'normal',
    spacing: 'comfortable',
    content: {
      news: true,
      alerts: true,
      education: true,
      recommendations: true,
      vulnerabilities: true,
      networks: true,
      malware: true,
      phishing: true,
      privacy: true,
      artificialIntelligence: true
    }
  };

  function getCurrentUser() {
    return OlhoDigitalAuth.getCurrentUser();
  }

  function requireAuthentication() {
    const user = getCurrentUser();
    if (!user) {
      OlhoDigitalAuth.goToLogin();
      return user;
    }
    OlhoDigitalAuth.verifySession();
    // Traz os dados do servidor; se algo mudou (outro dispositivo), recarrega uma vez.
    OlhoDigitalData.hydrate().then((changed) => {
      const flag = 'olhoDigital.reloaded';
      if (changed && !sessionStorage.getItem(flag)) {
        sessionStorage.setItem(flag, '1');
        location.reload();
      } else if (!changed) {
        sessionStorage.removeItem(flag);
      }
    });
    return user;
  }

  function accountKey(user) {
    return encodeURIComponent(user.email.trim());
  }

  function settingsKey(user) {
    return `${SETTINGS_PREFIX}${accountKey(user)}`;
  }

  function draftKey(user) {
    return `${DRAFT_PREFIX}${accountKey(user)}`;
  }

  function getActivity(user) {
    const emptyActivity = {
      community: { likes: [], saves: [], comments: [] },
      news: { comments: [] },
      learning: { videos: [] }
    };
    try {
      const stored = JSON.parse(localStorage.getItem(`${ACTIVITY_PREFIX}${accountKey(user)}`) || 'null');
      if (!stored || typeof stored !== 'object') return emptyActivity;
      return {
        community: {
          likes: Array.isArray(stored.community?.likes) ? stored.community.likes : [],
          saves: Array.isArray(stored.community?.saves) ? stored.community.saves : [],
          comments: Array.isArray(stored.community?.comments) ? stored.community.comments : []
        },
        news: {
          comments: Array.isArray(stored.news?.comments) ? stored.news.comments : []
        },
        learning: {
          videos: Array.isArray(stored.learning?.videos) ? stored.learning.videos : []
        }
      };
    } catch (error) {
      console.error('Não foi possível carregar a atividade desta conta neste navegador.', error);
      return emptyActivity;
    }
  }

  function trackActivity(user, area, action, item) {
    if (!Array.isArray(getActivity(user)[area]?.[action])) throw new Error('Tipo de atividade não reconhecido.');
    OlhoDigitalData.saveActivityEntry(user, area, action, { ...item, updatedAt: Date.now() });
  }

  function removeActivity(user, area, action, id) {
    if (!Array.isArray(getActivity(user)[area]?.[action])) throw new Error('Tipo de atividade não reconhecido.');
    OlhoDigitalData.removeActivityEntry(user, area, action, id);
  }

  function getSettings(user) {
    try {
      const stored = JSON.parse(localStorage.getItem(settingsKey(user)) || 'null');
      const content = { ...defaults.content };
      Object.entries(stored?.content || {}).forEach(([key, enabled]) => {
        if (Object.hasOwn(content, key) && typeof enabled === 'boolean') content[key] = enabled;
      });
      return {
        ...defaults,
        theme: ['light', 'dark'].includes(stored?.theme) ? stored.theme : defaults.theme,
        fontSize: ['small', 'normal', 'large'].includes(stored?.fontSize) ? stored.fontSize : defaults.fontSize,
        spacing: ['compact', 'comfortable'].includes(stored?.spacing) ? stored.spacing : defaults.spacing,
        content
      };
    } catch {
      console.error('As preferências locais estão inválidas; serão usadas as configurações padrão.');
      return { ...defaults, content: { ...defaults.content } };
    }
  }

  function saveSettings(user, settings) {
    OlhoDigitalData.saveSettings(user, settings);
  }

  function broadcastSettings(user, settings) {
    settingsChannel?.postMessage({
      account: accountKey(user),
      settings
    });
  }

  function getDraftSettings(user) {
    try {
      const draft = JSON.parse(sessionStorage.getItem(draftKey(user)) || 'null');
      if (!draft) return null;
      const content = { ...defaults.content };
      Object.entries(draft.content || {}).forEach(([key, enabled]) => {
        if (Object.hasOwn(content, key) && typeof enabled === 'boolean') content[key] = enabled;
      });
      return {
        theme: ['light', 'dark'].includes(draft.theme) ? draft.theme : defaults.theme,
        fontSize: ['small', 'normal', 'large'].includes(draft.fontSize) ? draft.fontSize : defaults.fontSize,
        spacing: ['compact', 'comfortable'].includes(draft.spacing) ? draft.spacing : defaults.spacing,
        content
      };
    } catch (error) {
      console.error('Não foi possível ler as alterações temporárias das configurações.', error);
      return null;
    }
  }

  function getEffectiveSettings(user) {
    return getDraftSettings(user) || getSettings(user);
  }

  function saveDraftSettings(user, settings) {
    sessionStorage.setItem(draftKey(user), JSON.stringify(settings));
    broadcastSettings(user, settings);
  }

  function discardDraftSettings(user) {
    sessionStorage.removeItem(draftKey(user));
    broadcastSettings(user, getSettings(user));
  }

  function hasUnsavedSettings(user) {
    const draft = getDraftSettings(user);
    return Boolean(draft && JSON.stringify(draft) !== JSON.stringify(getSettings(user)));
  }

  function applySettings(settings) {
    const root = document.documentElement;
    const body = document.body;
    body.classList.toggle('theme-dark', settings.theme === 'dark');
    document.querySelectorAll('[data-logo-light][data-logo-dark]').forEach((logo) => {
      const source = settings.theme === 'dark' ? logo.dataset.logoDark : logo.dataset.logoLight;
      if (source && logo.getAttribute('src') !== source) logo.setAttribute('src', source);
    });
    root.style.fontSize = settings.fontSize === 'small' ? '92%' : settings.fontSize === 'large' ? '108%' : '';
    body.classList.toggle('spacing-compact', settings.spacing === 'compact');
    root.dataset.theme = settings.theme;
    root.style.colorScheme = settings.theme;

    document.querySelectorAll('[data-content-setting]').forEach((element) => {
      const setting = element.dataset.contentSetting;
      if (setting && Object.hasOwn(settings.content, setting)) {
        element.dataset.preferenceHidden = String(!settings.content[setting]);
        element.hidden = !settings.content[setting];
      }
    });

    document.querySelectorAll('[data-content-topics]').forEach((element) => {
      const topics = element.dataset.contentTopics.split(/\s+/).filter(Boolean);
      const hidden = topics.length > 0 && topics.every((topic) => settings.content[topic] === false);
      element.dataset.preferenceHidden = String(hidden);
      element.hidden = hidden;
    });
  }

  if (settingsChannel) {
    settingsChannel.addEventListener('message', (event) => {
      const user = getCurrentUser();
      if (!user || event.data?.account !== accountKey(user) || !event.data.settings) return;
      applySettings(event.data.settings);
    });
  }

  function openAvatarDatabase() {
    return new Promise((resolve, reject) => {
      if (!('indexedDB' in window)) {
        reject(new Error('Este navegador não oferece armazenamento local de imagens.'));
        return;
      }

      const request = indexedDB.open(AVATAR_DATABASE, 1);
      request.onupgradeneeded = () => {
        if (!request.result.objectStoreNames.contains(AVATAR_STORE)) {
          request.result.createObjectStore(AVATAR_STORE, { keyPath: 'account' });
        }
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error || new Error('Não foi possível abrir o armazenamento do avatar.'));
    });
  }

  async function getAvatar(user) {
    const database = await openAvatarDatabase();
    return new Promise((resolve, reject) => {
      const request = database.transaction(AVATAR_STORE, 'readonly').objectStore(AVATAR_STORE).get(accountKey(user));
      request.onsuccess = () => {
        database.close();
        resolve(request.result || null);
      };
      request.onerror = () => {
        database.close();
        reject(request.error || new Error('Não foi possível carregar a foto de perfil.'));
      };
    });
  }

  function cacheAvatar(user, blob, version) {
    return openAvatarDatabase().then((database) => new Promise((resolve, reject) => {
      const transaction = database.transaction(AVATAR_STORE, 'readwrite');
      transaction.objectStore(AVATAR_STORE).put({
        account: accountKey(user),
        blob,
        type: blob.type,
        version,
        updatedAt: Date.now()
      });
      transaction.oncomplete = () => {
        database.close();
        resolve();
      };
      transaction.onerror = transaction.onabort = () => {
        database.close();
        reject(transaction.error || new Error('O armazenamento local recusou a foto selecionada.'));
      };
    }));
  }

  // Envia a foto para o Supabase Storage e guarda uma cópia local como cache.
  async function saveAvatar(user, blob) {
    const upload = await supabaseClient.storage.from('avatars').upload(`${user.id}/avatar`, blob, {
      contentType: blob.type,
      upsert: true
    });
    if (upload.error) throw new Error('Não foi possível enviar a foto para o servidor.');
    const version = Date.now();
    const { error } = await supabaseClient.from('perfis').update({ avatar_versao: version }).eq('id', user.id);
    if (error) throw new Error('A foto foi enviada, mas não foi possível atualizar o perfil.');
    await cacheAvatar(user, blob, version).catch((cacheError) => console.error(cacheError));
  }

  // Compara a versão da foto no servidor com a do cache e baixa se estiver desatualizada.
  // Retorna true se a foto local mudou.
  async function refreshAvatar(user) {
    const { data: profile, error } = await supabaseClient.from('perfis').select('avatar_versao').eq('id', user.id).maybeSingle();
    if (error || !profile?.avatar_versao) return false;
    const cached = await getAvatar(user).catch(() => null);
    if (cached && cached.version === profile.avatar_versao) return false;
    const download = await supabaseClient.storage.from('avatars').download(`${user.id}/avatar`);
    if (download.error) return false;
    await cacheAvatar(user, download.data, profile.avatar_versao);
    return true;
  }

  let avatarRefreshStarted = false;

  async function updateProfileAvatars(user) {
    if (!avatarRefreshStarted) {
      avatarRefreshStarted = true;
      refreshAvatar(user).then((changed) => { if (changed) updateProfileAvatars(user); }).catch((error) => console.error(error));
    }
    const elements = [...document.querySelectorAll('[data-profile-avatar]')];
    const initial = (user.name || 'U').trim().charAt(0).toLocaleUpperCase('pt-BR') || 'U';
    const oldUrls = new Set(elements.map((element) => element.dataset.avatarUrl).filter(Boolean));
    oldUrls.forEach((url) => URL.revokeObjectURL(url));
    elements.forEach((element) => {
      element.textContent = initial;
      element.removeAttribute('data-avatar-url');
    });

    try {
      const avatar = await getAvatar(user);
      if (!avatar?.blob) return;
      const url = URL.createObjectURL(avatar.blob);
      elements.forEach((element) => {
        const image = document.createElement('img');
        image.src = url;
        image.alt = '';
        image.className = 'profile-avatar-image';
        image.addEventListener('error', () => {
          element.textContent = initial;
          element.removeAttribute('data-avatar-url');
          if ([...document.querySelectorAll('[data-profile-avatar]')].every((avatarElement) => !avatarElement.dataset.avatarUrl)) {
            URL.revokeObjectURL(url);
          }
        }, { once: true });
        element.replaceChildren(image);
        element.dataset.avatarUrl = url;
      });
    } catch (error) {
      console.error(error);
    }
  }

  function initProfileMenu() {
    const toggle = document.getElementById('profileToggle');
    const dropdown = document.getElementById('profileDropdown');
    if (!toggle || !dropdown || toggle.dataset.menuInitialized === 'true') return;
    toggle.dataset.menuInitialized = 'true';

    const close = () => {
      dropdown.hidden = true;
      toggle.setAttribute('aria-expanded', 'false');
    };

    toggle.addEventListener('click', () => {
      dropdown.hidden = !dropdown.hidden;
      toggle.setAttribute('aria-expanded', String(!dropdown.hidden));
    });
    document.addEventListener('click', (event) => {
      if (!toggle.contains(event.target) && !dropdown.contains(event.target)) close();
    });
    document.addEventListener('keydown', (event) => {
      if (event.key !== 'Escape' || dropdown.hidden) return;
      close();
      toggle.focus();
    });
  }

  function setUserPassword(currentPassword, newPassword) {
    return OlhoDigitalAuth.changePassword(currentPassword, newPassword);
  }

  window.OlhoDigitalAccount = {
    defaults,
    accountKey,
    getCurrentUser,
    requireAuthentication,
    getActivity,
    trackActivity,
    removeActivity,
    getSettings,
    getDraftSettings,
    getEffectiveSettings,
    saveDraftSettings,
    discardDraftSettings,
    hasUnsavedSettings,
    saveSettings,
    applySettings,
    getAvatar,
    saveAvatar,
    refreshAvatar,
    updateProfileAvatars,
    initProfileMenu,
    setUserPassword,
    getCourseValue: OlhoDigitalData.getCourseValue,
    setCourseValue: OlhoDigitalData.setCourseValue
  };
})();
