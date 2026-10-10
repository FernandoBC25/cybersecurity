const account = OlhoDigitalAccount.requireAuthentication();

if (account) {
  const form = document.getElementById('settingsForm');
  const status = document.getElementById('settingsStatus');
  const changesStatus = document.getElementById('changesStatus');
  const passwordForm = document.getElementById('passwordForm');
  const passwordStatus = document.getElementById('passwordStatus');
  const unsavedDialog = document.getElementById('unsavedDialog');
  const profileDropdown = document.getElementById('profileDropdown');
  let pendingHref = null;
  let pendingLogout = false;
  let awaitingHistoryChoice = false;
  let restoringHistoryGuard = false;

  function showStatus(element, message, isError = false) {
    element.textContent = message;
    element.classList.toggle('is-error', isError);
  }

  function readSettingsFromForm() {
    const content = {};
    form.querySelectorAll('[name^="content."]').forEach((input) => {
      content[input.name.slice('content.'.length)] = input.checked;
    });
    return {
      theme: form.elements.theme.value,
      fontSize: form.elements.fontSize.value,
      spacing: form.elements.spacing.value,
      content
    };
  }

  function populate(settings) {
    form.querySelector(`[name="theme"][value="${settings.theme}"]`).checked = true;
    form.elements.fontSize.value = settings.fontSize;
    form.querySelector(`[name="spacing"][value="${settings.spacing}"]`).checked = true;
    Object.entries(settings.content).forEach(([key, enabled]) => {
      const input = form.querySelector(`[name="content.${key}"]`);
      if (input) input.checked = enabled;
    });
    OlhoDigitalAccount.applySettings(settings);
  }

  function refreshChangesStatus() {
    const hasChanges = OlhoDigitalAccount.hasUnsavedSettings(account);
    changesStatus.textContent = hasChanges
      ? 'As alterações são temporárias. Salve para mantê-las ao encerrar esta edição.'
      : 'Nenhuma alteração pendente.';
    changesStatus.classList.toggle('is-pending', hasChanges);
  }

  function refreshPreferencePreviews(settings) {
    const locations = {
      news: 'Notícias na página inicial: ',
      alerts: 'Área de alertas: ',
      education: 'Conteúdos educativos: ',
      recommendations: 'Recomendações de cursos: ',
      vulnerabilities: 'Artigos sobre vulnerabilidades: ',
      networks: 'Artigos sobre redes: ',
      malware: 'Artigos sobre malware: ',
      phishing: 'Artigos sobre phishing: ',
      privacy: 'Artigos sobre privacidade: ',
      artificialIntelligence: 'Artigos sobre IA: '
    };
    document.querySelectorAll('[data-setting-preview]').forEach((preview) => {
      const key = preview.dataset.settingPreview;
      const enabled = settings.content[key];
      preview.textContent = `${locations[key]}${enabled ? 'exibidos' : 'ocultos'}`;
    });
  }

  function updateDraft() {
    const settings = readSettingsFromForm();
    try {
      OlhoDigitalAccount.saveDraftSettings(account, settings);
      OlhoDigitalAccount.applySettings(settings);
      refreshPreferencePreviews(settings);
      showStatus(status, '');
      refreshChangesStatus();
    } catch (error) {
      console.error(error);
      populate(OlhoDigitalAccount.getEffectiveSettings(account));
      refreshPreferencePreviews(OlhoDigitalAccount.getEffectiveSettings(account));
      showStatus(status, 'Não foi possível atualizar a prévia temporária neste navegador.', true);
    }
  }

  function openUnsavedDialog(destination = null, historyChoice = false, logoutChoice = false) {
    pendingHref = destination;
    pendingLogout = logoutChoice;
    awaitingHistoryChoice = historyChoice;
    if (!unsavedDialog.open) unsavedDialog.showModal();
  }

  function continueEditing() {
    pendingHref = null;
    pendingLogout = false;
    if (unsavedDialog.open) unsavedDialog.close();
    if (awaitingHistoryChoice) {
      restoringHistoryGuard = true;
      history.forward();
    }
    awaitingHistoryChoice = false;
  }

  function leaveWithoutSaving() {
    try {
      OlhoDigitalAccount.discardDraftSettings(account);
      OlhoDigitalAccount.applySettings(OlhoDigitalAccount.getSettings(account));
    } catch (error) {
      console.error(error);
      showStatus(status, 'Não foi possível descartar as alterações temporárias.', true);
      return;
    }

    const destination = pendingHref;
    const shouldLogout = pendingLogout;
    const wasHistoryNavigation = awaitingHistoryChoice;
    pendingHref = null;
    pendingLogout = false;
    awaitingHistoryChoice = false;
    if (unsavedDialog.open) unsavedDialog.close();
    if (shouldLogout) {
      document.getElementById('logoutDialog').showModal();
    } else if (destination) {
      window.location.assign(destination);
    } else if (wasHistoryNavigation) {
      history.back();
    }
  }

  function saveAndLeave() {
    try {
      const settings = readSettingsFromForm();
      OlhoDigitalAccount.saveSettings(account, settings);
      OlhoDigitalAccount.discardDraftSettings(account);
      OlhoDigitalAccount.applySettings(settings);
      refreshPreferencePreviews(settings);
      refreshChangesStatus();
      showStatus(status, 'Configurações salvas neste navegador.');
    } catch (error) {
      console.error(error);
      showStatus(status, 'Não foi possível salvar as configurações. Você continua nesta página; tente novamente.', true);
      return;
    }

    const destination = pendingHref;
    const shouldLogout = pendingLogout;
    const wasHistoryNavigation = awaitingHistoryChoice;
    pendingHref = null;
    pendingLogout = false;
    awaitingHistoryChoice = false;
    if (unsavedDialog.open) unsavedDialog.close();
    if (shouldLogout) {
      document.getElementById('logoutDialog').showModal();
    } else if (destination) {
      window.location.assign(destination);
    } else if (wasHistoryNavigation) {
      history.back();
    }
  }

  document.getElementById('accountName').textContent = account.name || 'Não informado';
  document.getElementById('accountEmail').textContent = account.email;
  OlhoDigitalAccount.updateProfileAvatars(account);
  OlhoDigitalAccount.initProfileMenu();
  document.getElementById('logoutBtn').addEventListener('click', () => {
    profileDropdown.hidden = true;
    document.getElementById('profileToggle').setAttribute('aria-expanded', 'false');
    if (OlhoDigitalAccount.hasUnsavedSettings(account)) {
      openUnsavedDialog(null, false, true);
    } else {
      document.getElementById('logoutDialog').showModal();
    }
  });
  document.getElementById('confirmLogout').addEventListener('click', () => {
    localStorage.removeItem('user');
    sessionStorage.clear();
    window.location.replace('./login.html');
  });
  populate(OlhoDigitalAccount.getEffectiveSettings(account));
  refreshPreferencePreviews(OlhoDigitalAccount.getEffectiveSettings(account));
  refreshChangesStatus();

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const settings = readSettingsFromForm();
    try {
      OlhoDigitalAccount.saveSettings(account, settings);
      OlhoDigitalAccount.discardDraftSettings(account);
      OlhoDigitalAccount.applySettings(settings);
      refreshChangesStatus();
      showStatus(status, 'Configurações salvas neste navegador para esta conta.');
    } catch (error) {
      console.error(error);
      showStatus(status, 'Não foi possível salvar as configurações neste navegador.', true);
    }
  });

  form.addEventListener('change', updateDraft);

  document.getElementById('discardChanges').addEventListener('click', () => {
    try {
      OlhoDigitalAccount.discardDraftSettings(account);
      const settings = OlhoDigitalAccount.getSettings(account);
      populate(settings);
      refreshPreferencePreviews(settings);
      refreshChangesStatus();
      showStatus(status, 'Alterações descartadas. As preferências salvas foram restauradas.');
    } catch (error) {
      console.error(error);
      showStatus(status, 'Não foi possível descartar as alterações temporárias.', true);
    }
  });

  document.getElementById('restoreDefaults').addEventListener('click', () => {
    if (!window.confirm('Restaurar todas as configurações padrão desta conta?')) return;
    const defaults = {
      ...OlhoDigitalAccount.defaults,
      content: { ...OlhoDigitalAccount.defaults.content }
    };
    populate(defaults);
    updateDraft();
    showStatus(status, 'Prévia padrão aplicada. Salve para mantê-la ou descarte para voltar às preferências anteriores.');
  });

  document.getElementById('continueEditing').addEventListener('click', continueEditing);
  document.getElementById('leaveWithoutSaving').addEventListener('click', leaveWithoutSaving);
  document.getElementById('saveAndLeave').addEventListener('click', saveAndLeave);
  unsavedDialog.addEventListener('cancel', (event) => {
    event.preventDefault();
    continueEditing();
  });
  document.addEventListener('click', (event) => {
    const link = event.target instanceof Element ? event.target.closest('a[href]') : null;
    if (!link || link.target || link.hasAttribute('download')) return;
    const target = new URL(link.href, window.location.href);
    if (target.origin === window.location.origin
      && target.pathname === window.location.pathname
      && target.search === window.location.search) return;
    if (!OlhoDigitalAccount.hasUnsavedSettings(account)) return;
    event.preventDefault();
    openUnsavedDialog(link.href);
  });

  history.pushState({ settingsGuard: true }, '', window.location.href);
  window.addEventListener('popstate', () => {
    if (restoringHistoryGuard) {
      restoringHistoryGuard = false;
      return;
    }
    if (OlhoDigitalAccount.hasUnsavedSettings(account)) {
      openUnsavedDialog(null, true);
    } else {
      history.back();
    }
  });

  window.addEventListener('beforeunload', (event) => {
    if (!OlhoDigitalAccount.hasUnsavedSettings(account)) return;
    event.preventDefault();
    event.returnValue = '';
  });

  passwordForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmation = document.getElementById('confirmPassword').value;

    if (!currentPassword || !newPassword || !confirmation) {
      showStatus(passwordStatus, 'Preencha os três campos de senha.', true);
      return;
    }
    if (newPassword !== confirmation) {
      showStatus(passwordStatus, 'A nova senha e a confirmação não coincidem.', true);
      return;
    }

    try {
      if (!OlhoDigitalAccount.setUserPassword(account, currentPassword, newPassword)) {
        showStatus(passwordStatus, 'A senha atual não confere ou esta conta não possui cadastro local.', true);
        return;
      }
      passwordForm.reset();
      showStatus(passwordStatus, 'Senha atualizada no cadastro local deste navegador.');
    } catch (error) {
      console.error(error);
      showStatus(passwordStatus, 'Não foi possível atualizar a senha armazenada neste navegador.', true);
    }
  });
}
