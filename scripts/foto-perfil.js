const account = OlhoDigitalAccount.requireAuthentication();

if (account) {
  OlhoDigitalAccount.applySettings(OlhoDigitalAccount.getEffectiveSettings(account));
  OlhoDigitalAccount.updateProfileAvatars(account);
  OlhoDigitalAccount.initProfileMenu();
  const profileDropdown = document.getElementById('profileDropdown');
  document.getElementById('logoutBtn').addEventListener('click', () => {
    profileDropdown.hidden = true;
    document.getElementById('profileToggle').setAttribute('aria-expanded', 'false');
    document.getElementById('logoutDialog').showModal();
  });
  document.getElementById('confirmLogout').addEventListener('click', () => {
    localStorage.removeItem('user');
    sessionStorage.clear();
    window.location.replace('./login.html');
  });
  const gallery = document.getElementById('avatarGallery');
  const preview = document.getElementById('avatarPreview');
  const fileInput = document.getElementById('avatarFile');
  const cancelUpload = document.getElementById('cancelUpload');
  const saveButton = document.getElementById('saveAvatar');
  const status = document.getElementById('avatarStatus');
  const avatars = [
    { name: 'Escudo azul', background: '#dbeafe', color: '#1d4ed8', icon: '<path d="M48 13 76 23v21c0 19-12 31-28 41C32 75 20 63 20 44V23l28-10Z"/><path d="m35 47 9 9 18-20"/>' },
    { name: 'Robô digital', background: '#dcfce7', color: '#15803d', icon: '<rect x="22" y="28" width="52" height="43" rx="12"/><path d="M48 17v11M35 45h1m24 0h1M37 58h22M15 42h7m52 0h7"/><circle cx="48" cy="16" r="3"/>' },
    { name: 'Sentinela', background: '#ede9fe', color: '#6d28d9', icon: '<path d="M48 16c17 0 29 13 29 30S65 80 48 80 19 63 19 46s12-30 29-30Z"/><path d="M30 46c5-8 11-12 18-12s13 4 18 12c-5 8-11 12-18 12s-13-4-18-12Z"/><circle cx="48" cy="46" r="6"/>' },
    { name: 'Geometria cibernética', background: '#ffedd5', color: '#c2410c', icon: '<path d="m48 12 34 20v32L48 84 14 64V32l34-20Z"/><path d="m48 27 20 12v18L48 69 28 57V39l20-12Z"/><circle cx="48" cy="48" r="7"/>' },
    { name: 'Profissional', background: '#e0f2fe', color: '#0369a1', icon: '<circle cx="48" cy="34" r="16"/><path d="M19 81c3-17 13-26 29-26s26 9 29 26M35 34h1m24 0h1"/>' },
    { name: 'Pixel seguro', background: '#fce7f3', color: '#be185d', icon: '<path d="M24 24h16v16H24zm32 0h16v16H56zM40 40h16v16H40zm-16 16h16v16H24zm32 0h16v16H56z"/><path d="m44 48 4 4 8-9"/>' },
    { name: 'Núcleo digital', background: '#cffafe', color: '#0e7490', icon: '<circle cx="48" cy="48" r="30"/><circle cx="48" cy="48" r="19"/><circle cx="48" cy="48" r="7"/><path d="M48 8v10m0 60v10M8 48h10m60 0h10"/>' },
    { name: 'Proteção minimalista', background: '#f1f5f9', color: '#334155', icon: '<path d="M48 14 76 25v19c0 18-11 31-28 42C31 75 20 62 20 44V25l28-11Z"/><path d="M37 48h22m-11-11v22"/>' }
  ];
  let selectedBlob = null;
  let selectedUrl = null;
  let savedUrl = null;
  let isSaving = false;

  function setStatus(message, isError = false) {
    status.textContent = message;
    status.classList.toggle('is-error', isError);
  }

  function releaseSelectedUrl() {
    if (selectedUrl) URL.revokeObjectURL(selectedUrl);
    selectedUrl = null;
  }

  function restoreSavedSelection() {
    releaseSelectedUrl();
    selectedBlob = null;
    fileInput.value = '';
    cancelUpload.hidden = true;
    saveButton.disabled = true;
    gallery.querySelectorAll('.avatar-option').forEach((option) => option.setAttribute('aria-pressed', 'false'));
    preview.src = savedUrl || '';
  }

  function makeAvatarBlob(avatar) {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96"><rect width="96" height="96" rx="48" fill="${avatar.background}"/><g fill="none" stroke="${avatar.color}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">${avatar.icon}</g></svg>`;
    return new Blob([svg], { type: 'image/svg+xml' });
  }

  function selectAvatar(blob, label, button) {
    releaseSelectedUrl();
    selectedBlob = blob;
    selectedUrl = URL.createObjectURL(blob);
    preview.src = selectedUrl;
    saveButton.disabled = false;
    cancelUpload.hidden = false;
    fileInput.value = '';
    gallery.querySelectorAll('.avatar-option').forEach((option) => {
      option.setAttribute('aria-pressed', String(option === button));
    });
    setStatus(`${label} selecionado. Confirme para salvar.`);
  }

  avatars.forEach((avatar) => {
    const blob = makeAvatarBlob(avatar);
    const option = document.createElement('button');
    option.type = 'button';
    option.className = 'avatar-option';
    option.setAttribute('aria-pressed', 'false');
    const image = document.createElement('img');
    image.src = URL.createObjectURL(blob);
    image.alt = '';
    const label = document.createElement('span');
    label.textContent = avatar.name;
    option.append(image, label);
    option.addEventListener('click', () => selectAvatar(blob, avatar.name, option));
    gallery.append(option);
  });

  function isValidImageFile(file, bytes) {
    if (file.type === 'image/jpeg') return bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
    if (file.type === 'image/png') return bytes.slice(0, 8).join(',') === '137,80,78,71,13,10,26,10';
    return file.type === 'image/webp'
      && String.fromCharCode(...bytes.slice(0, 4)) === 'RIFF'
      && String.fromCharCode(...bytes.slice(8, 12)) === 'WEBP';
  }

  async function makeSquareImage(file) {
    const bitmap = await createImageBitmap(file);
    try {
      if (!bitmap.width || !bitmap.height || bitmap.width * bitmap.height > 40000000) {
        throw new Error('A resolução da imagem é grande demais para ser processada com segurança.');
      }
      const size = Math.min(bitmap.width, bitmap.height);
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 512;
      const context = canvas.getContext('2d');
      if (!context) throw new Error('Não foi possível preparar o recorte da imagem.');
      context.drawImage(bitmap, (bitmap.width - size) / 2, (bitmap.height - size) / 2, size, size, 0, 0, 512, 512);
      const output = await new Promise((resolve, reject) => {
        canvas.toBlob((blob) => blob ? resolve(blob) : reject(new Error('Não foi possível processar a imagem selecionada.')), 'image/webp', 0.86);
      });
      return output;
    } finally {
      bitmap.close();
    }
  }

  fileInput.addEventListener('change', async () => {
    const file = fileInput.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      restoreSavedSelection();
      setStatus('A imagem excede o limite de 5 MB.', true);
      return;
    }
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      restoreSavedSelection();
      setStatus('Formato inválido. Selecione uma imagem JPG, PNG ou WebP.', true);
      return;
    }

    try {
      const header = new Uint8Array(await file.slice(0, 12).arrayBuffer());
      if (!isValidImageFile(file, header)) {
        throw new Error('O conteúdo do arquivo não corresponde a uma imagem JPG, PNG ou WebP válida.');
      }
      const squareBlob = await makeSquareImage(file);
      releaseSelectedUrl();
      selectedBlob = squareBlob;
      selectedUrl = URL.createObjectURL(squareBlob);
      preview.src = selectedUrl;
      saveButton.disabled = false;
      cancelUpload.hidden = false;
      gallery.querySelectorAll('.avatar-option').forEach((option) => option.setAttribute('aria-pressed', 'false'));
      setStatus('Prévia pronta. Confirme para salvar a imagem.');
    } catch (error) {
      console.error(error);
      restoreSavedSelection();
      setStatus(error.message || 'Não foi possível ler a imagem selecionada.', true);
    }
  });

  cancelUpload.addEventListener('click', () => {
    restoreSavedSelection();
    setStatus('Seleção cancelada. Escolha um avatar ou uma imagem.');
  });

  saveButton.addEventListener('click', async () => {
    if (!selectedBlob || isSaving) return;
    const blobToSave = selectedBlob;
    isSaving = true;
    saveButton.disabled = true;
    fileInput.disabled = true;
    cancelUpload.disabled = true;
    gallery.querySelectorAll('.avatar-option').forEach((option) => { option.disabled = true; });
    try {
      await OlhoDigitalAccount.saveAvatar(account, blobToSave);
      await OlhoDigitalAccount.updateProfileAvatars(account);
      if (savedUrl) URL.revokeObjectURL(savedUrl);
      savedUrl = URL.createObjectURL(blobToSave);
      releaseSelectedUrl();
      selectedBlob = null;
      preview.src = savedUrl;
      cancelUpload.hidden = true;
      setStatus('Foto de perfil salva neste navegador para esta conta.');
    } catch (error) {
      console.error(error);
      setStatus(error.message || 'Não foi possível salvar a foto neste navegador.', true);
    } finally {
      isSaving = false;
      fileInput.disabled = false;
      cancelUpload.disabled = false;
      gallery.querySelectorAll('.avatar-option').forEach((option) => { option.disabled = false; });
      saveButton.disabled = !selectedBlob;
    }
  });

  OlhoDigitalAccount.getAvatar(account).then((avatar) => {
    if (!avatar?.blob) return;
    savedUrl = URL.createObjectURL(avatar.blob);
    if (!selectedBlob) preview.src = savedUrl;
  }).catch((error) => {
    console.error(error);
    setStatus(error.message || 'Não foi possível carregar a foto salva.', true);
  });
  OlhoDigitalAccount.updateProfileAvatars(account);
}
