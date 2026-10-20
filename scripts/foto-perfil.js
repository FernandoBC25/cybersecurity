(function () {
const account = OlhoDigitalAccount.requireAuthentication();

if (account) {
  OlhoDigitalAccount.applySettings(OlhoDigitalAccount.getEffectiveSettings(account));
  OlhoDigitalAccount.updateProfileAvatars(account);
  const gallery = document.getElementById('avatarGallery');
  const communityGallery = document.getElementById('communityAvatarGallery');
  const standardAvatars = document.getElementById('standardAvatars');
  const characterAvatars = document.getElementById('characterAvatars');
  const preview = document.getElementById('avatarPreview');
  const fileInput = document.getElementById('avatarFile');
  const cancelUpload = document.getElementById('cancelUpload');
  const saveButton = document.getElementById('saveAvatar');
  const status = document.getElementById('avatarStatus');

  if (!gallery || !communityGallery || !standardAvatars || !characterAvatars || !preview || !fileInput || !cancelUpload || !saveButton || !status) {
    return;
  }

  const avatars = [
    { name: 'Escudo azul', background: '#dbeafe', color: '#1d4ed8', icon: '<path d="M48 13 76 23v21c0 19-12 31-28 41C32 75 20 63 20 44V23l28-10Z"/><path d="m35 47 9 9 18-20"/>' },
    { name: 'Robô digital', background: '#dcfce7', color: '#15803d', icon: '<rect x="22" y="28" width="52" height="43" rx="12"/><path d="M48 17v11M35 45h1m24 0h1M37 58h22M15 42h7m52 0h7"/><circle cx="48" cy="16" r="3"/>' },
    { name: 'Sentinela', background: '#ede9fe', color: '#6d28d9', icon: '<path d="M48 16c17 0 29 13 29 30S65 80 48 80 19 63 19 46s12-30 29-30Z"/><path d="M30 46c5-8 11-12 18-12s13 4 18 12c-5 8-11 12-18 12s-13-4-18-12Z"/><circle cx="48" cy="46" r="6"/>' },
    { name: 'Geometria cibernética', background: '#ffedd5', color: '#c2410c', icon: '<path d="m48 12 34 20v32L48 84 14 64V32l34-20Z"/><path d="m48 27 20 12v18L48 69 28 57V39l20-12Z"/><circle cx="48" cy="48" r="7"/>' },
    { name: 'Profissional', background: '#e0f2fe', color: '#0369a1', icon: '<circle cx="48" cy="34" r="16"/><path d="M19 81c3-17 13-26 29-26s26 9 29 26M35 34h1m24 0h1"/>' },
    { name: 'Pixel seguro', background: '#fce7f3', color: '#be185d', icon: '<path d="M24 24h16v16H24zm32 0h16v16H56zM40 40h16v16H40zm-16 16h16v16H24zm32 0h16v16H56z"/><path d="m44 48 4 4 8-9"/>' },
    { name: 'Núcleo digital', background: '#cffafe', color: '#0e7490', icon: '<circle cx="48" cy="48" r="30"/><circle cx="48" cy="48" r="19"/><circle cx="48" cy="48" r="7"/><path d="M48 8v10m0 60v10M8 48h10m60 0h10"/>' },
    { name: 'Proteção minimalista', background: '#f1f5f9', color: '#334155', icon: '<path d="M48 14 76 25v19c0 18-11 31-28 42C31 75 20 62 20 44V25l28-11Z"/><path d="M37 48h22m-11-11v22"/>' },
    { name: 'Cadeado digital', background: '#fee2e2', color: '#b91c1c', icon: '<rect x="25" y="42" width="46" height="36" rx="7"/><path d="M34 42V31a14 14 0 0 1 28 0v11m-14 14v9"/>' },
    { name: 'Rede segura', background: '#d1fae5', color: '#047857', icon: '<circle cx="48" cy="48" r="7"/><circle cx="22" cy="28" r="6"/><circle cx="74" cy="28" r="6"/><circle cx="22" cy="70" r="6"/><circle cx="74" cy="70" r="6"/><path d="m28 32 14 12m26-12L54 44M28 66l14-12m26 12L54 54"/>' },
    { name: 'Radar', background: '#fef3c7', color: '#b45309', icon: '<circle cx="48" cy="48" r="31"/><path d="M48 25v23l17 10M48 10v7m38 31h-7M17 48h-7m65-27-5 5"/>' },
    { name: 'Nuvem protegida', background: '#e0e7ff', color: '#4338ca', icon: '<path d="M28 66h39a14 14 0 0 0 1-28 21 21 0 0 0-40-5 17 17 0 0 0 0 33Z"/><path d="m48 42 12 5v9c0 8-5 13-12 17-7-4-12-9-12-17v-9l12-5Z"/>' },
    { name: 'Chave de acesso', background: '#fae8ff', color: '#a21caf', icon: '<circle cx="34" cy="43" r="17"/><circle cx="34" cy="43" r="6"/><path d="m48 55 27 27m-9-9 8-8m-17-1 8-8"/>' },
    { name: 'Escudo verde', background: '#ecfccb', color: '#4d7c0f', icon: '<path d="M48 13 76 24v20c0 18-12 31-28 41C32 75 20 62 20 44V24l28-11Z"/><path d="m34 48 9 9 20-21"/>' },
    { name: 'Órbita', background: '#cffafe', color: '#0e7490', icon: '<circle cx="48" cy="48" r="8"/><ellipse cx="48" cy="48" rx="34" ry="14"/><ellipse cx="48" cy="48" rx="34" ry="14" transform="rotate(55 48 48)"/><circle cx="76" cy="42" r="4"/>' },
    { name: 'Firewall', background: '#ffedd5', color: '#c2410c', icon: '<path d="M19 29h58v39H19zM19 42h58M19 55h58M38 29v13m20 0v13M38 55v13m20-39v13"/>' },
    { name: 'Olho atento', background: '#fce7f3', color: '#be185d', icon: '<path d="M12 48s13-22 36-22 36 22 36 22-13 22-36 22S12 48 12 48Z"/><circle cx="48" cy="48" r="12"/><circle cx="48" cy="48" r="4"/>' }
  ];
  const communityMembers = [
    'Ana Silva', 'Carlos Eduardo', 'Mariana Costa', 'Lucas Martins',
    'João Pedro', 'Fernanda Souza', 'Gabriel Oliveira', 'Beatriz Santos',
    'Rafael Almeida', 'Juliana Lima', 'Bruno Ferreira', 'Camila Rodrigues'
  ];
  const extraCharacters = [
    { seed: 'Olho-Digital-01', style: 'lorelei' },
    { seed: 'Olho-Digital-02', style: 'lorelei' },
    { seed: 'Olho-Digital-03', style: 'lorelei' },
    { seed: 'Olho-Digital-04', style: 'lorelei' },
    { seed: 'Olho-Digital-05', style: 'micah' },
    { seed: 'Olho-Digital-06', style: 'micah' },
    { seed: 'Olho-Digital-07', style: 'micah' },
    { seed: 'Olho-Digital-08', style: 'micah' },
    { seed: 'Olho-Digital-09', style: 'notionists' },
    { seed: 'Olho-Digital-10', style: 'notionists' },
    { seed: 'Olho-Digital-11', style: 'notionists' },
    { seed: 'Olho-Digital-12', style: 'notionists' },
    { seed: 'Olho-Digital-13', style: 'personas' },
    { seed: 'Olho-Digital-14', style: 'personas' },
    { seed: 'Olho-Digital-15', style: 'personas' },
    { seed: 'Olho-Digital-16', style: 'personas' },
    { seed: 'Olho-Digital-17', style: 'pixel-art' },
    { seed: 'Olho-Digital-18', style: 'pixel-art' },
    { seed: 'Olho-Digital-19', style: 'pixel-art' },
    { seed: 'Olho-Digital-20', style: 'pixel-art' },
    { seed: 'Olho-Digital-21', style: 'bottts' },
    { seed: 'Olho-Digital-22', style: 'bottts' },
    { seed: 'Olho-Digital-23', style: 'bottts' },
    { seed: 'Olho-Digital-24', style: 'bottts' }
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
    document.querySelectorAll('.avatar-option').forEach((option) => option.setAttribute('aria-pressed', 'false'));
    setPreview(savedUrl);
  }

  function setPreview(url) {
    preview.hidden = !url;
    if (url) preview.src = url;
    else preview.removeAttribute('src');
  }

  function makeAvatarBlob(avatar) {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96"><rect width="96" height="96" rx="48" fill="${avatar.background}"/><g fill="none" stroke="${avatar.color}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">${avatar.icon}</g></svg>`;
    return new Blob([svg], { type: 'image/svg+xml' });
  }

  function selectAvatar(blob, label, button) {
    releaseSelectedUrl();
    selectedBlob = blob;
    selectedUrl = URL.createObjectURL(blob);
    setPreview(selectedUrl);
    saveButton.disabled = false;
    cancelUpload.hidden = false;
    fileInput.value = '';
    document.querySelectorAll('.avatar-option').forEach((option) => {
      option.setAttribute('aria-pressed', String(option === button));
    });
    setStatus(`${label} selecionado. Confirme para salvar.`);
  }

  document.querySelectorAll('[data-avatar-category]').forEach((button) => {
    button.addEventListener('click', () => {
      const isCharacters = button.dataset.avatarCategory === 'characters';
      characterAvatars.hidden = !isCharacters;
      standardAvatars.hidden = isCharacters;
      document.querySelectorAll('[data-avatar-category]').forEach((categoryButton) => {
        categoryButton.setAttribute('aria-pressed', String(categoryButton === button));
      });
    });
  });

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

  const femaleNames = new Set(['Ana Silva', 'Mariana Costa', 'Fernanda Souza', 'Beatriz Santos', 'Juliana Lima', 'Camila Rodrigues']);
  const maleNames = new Set(['Carlos Eduardo', 'João Pedro', 'Lucas Martins', 'Gabriel Oliveira', 'Rafael Almeida', 'Bruno Ferreira']);
  const registeredNames = (() => {
    try {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      return Array.isArray(users)
        ? users.map((user) => typeof user?.name === 'string' ? user.name.trim() : '').filter(Boolean)
        : [];
    } catch (error) {
      console.error('Não foi possível carregar os nomes dos membros para a galeria de avatares.', error);
      return [];
    }
  })();
  const avatarNames = [...new Set([...communityMembers, ...registeredNames])];
  const characterChoices = [
    ...avatarNames.map((name) => ({ seed: name, style: 'adventurer', gender: femaleNames.has(name) ? 'female' : maleNames.has(name) ? 'male' : 'neutral' })),
    ...extraCharacters.map((character) => ({ ...character, gender: 'neutral' }))
  ];
  async function toRaster(blob) {
    if (blob.type !== 'image/svg+xml') return blob;
    const url = URL.createObjectURL(blob);
    try {
      const image = new Image();
      image.src = url;
      await image.decode();
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 512;
      canvas.getContext('2d').drawImage(image, 0, 0, 512, 512);
      return await new Promise((resolve, reject) => {
        canvas.toBlob((result) => result ? resolve(result) : reject(new Error('Não foi possível preparar o avatar.')), 'image/webp', 0.9);
      });
    } finally {
      URL.revokeObjectURL(url);
    }
  }
  characterChoices.forEach((character, index) => {
    const option = document.createElement('button');
    option.type = 'button';
    option.className = 'avatar-option community-avatar-option';
    option.setAttribute('aria-pressed', 'false');
    option.setAttribute('aria-label', `Foto de personagem ${index + 1}`);
    const imageFrame = document.createElement('span');
    imageFrame.className = 'avatar-image-frame';
    const image = document.createElement('img');
    const imageUrl = `https://api.dicebear.com/9.x/${character.style}/svg?seed=${encodeURIComponent(character.seed)}&gender=${character.gender}`;
    image.src = imageUrl;
    image.alt = '';
    imageFrame.append(image);
    option.append(imageFrame);
    option.addEventListener('click', async () => {
      option.disabled = true;
      setStatus(`Carregando a foto de personagem ${index + 1}...`);
      try {
        const response = await fetch(imageUrl);
        if (!response.ok) throw new Error('Não foi possível carregar este avatar da comunidade.');
        const sourceImage = await response.blob();
        if (!sourceImage.type.startsWith('image/') || sourceImage.size > 5 * 1024 * 1024) {
          throw new Error('O avatar selecionado não é uma imagem válida.');
        }
        const avatarBlob = await makeSquareImage(sourceImage, 1.18);
        selectAvatar(avatarBlob, `Foto de personagem ${index + 1}`, option);
      } catch (error) {
        setStatus(error.message || 'Não foi possível carregar o avatar selecionado. Tente novamente.', true);
      } finally {
        option.disabled = false;
      }
    });
    communityGallery.append(option);
  });

  function isValidImageFile(file, bytes) {
    if (file.type === 'image/jpeg') return bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
    if (file.type === 'image/png') return bytes.slice(0, 8).join(',') === '137,80,78,71,13,10,26,10';
    return file.type === 'image/webp'
      && String.fromCharCode(...bytes.slice(0, 4)) === 'RIFF'
      && String.fromCharCode(...bytes.slice(8, 12)) === 'WEBP';
  }

  async function makeSquareImage(file, zoom = 1) {
    let bitmap;
    let imageUrl;
    try {
      bitmap = await createImageBitmap(file);
    } catch (error) {
      if (file.type !== 'image/svg+xml') throw error;
      imageUrl = URL.createObjectURL(file);
      bitmap = new Image();
      bitmap.src = imageUrl;
      try {
        await bitmap.decode();
      } catch {
        URL.revokeObjectURL(imageUrl);
        throw new Error('Não foi possível abrir o avatar selecionado.');
      }
    }
    try {
      if (!bitmap.width || !bitmap.height || bitmap.width * bitmap.height > 40000000) {
        throw new Error('A resolução da imagem é grande demais para ser processada com segurança.');
      }
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 512;
      const context = canvas.getContext('2d');
      if (!context) throw new Error('Não foi possível preparar o recorte da imagem.');
      const scale = (512 / Math.min(bitmap.width, bitmap.height)) * zoom;
      const width = bitmap.width * scale;
      const height = bitmap.height * scale;
      context.drawImage(bitmap, (512 - width) / 2, (512 - height) / 2, width, height);
      const output = await new Promise((resolve, reject) => {
        canvas.toBlob((blob) => blob ? resolve(blob) : reject(new Error('Não foi possível processar a imagem selecionada.')), 'image/webp', 0.86);
      });
      return output;
    } finally {
      if (typeof bitmap.close === 'function') bitmap.close();
      if (imageUrl) URL.revokeObjectURL(imageUrl);
    }
  }

  async function isTransparentImage(blob) {
    const bitmap = await createImageBitmap(blob);
    try {
      const canvas = document.createElement('canvas');
      canvas.width = bitmap.width;
      canvas.height = bitmap.height;
      const context = canvas.getContext('2d');
      if (!context) throw new Error('Não foi possível verificar a foto salva.');
      context.drawImage(bitmap, 0, 0);
      const pixels = context.getImageData(0, 0, canvas.width, canvas.height).data;
      for (let index = 3; index < pixels.length; index += 4) {
        if (pixels[index] > 0) return false;
      }
      return true;
    } finally {
      if (typeof bitmap.close === 'function') bitmap.close();
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
      setPreview(selectedUrl);
      saveButton.disabled = false;
      cancelUpload.hidden = false;
      document.querySelectorAll('.avatar-option').forEach((option) => option.setAttribute('aria-pressed', 'false'));
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
    document.querySelectorAll('.avatar-option').forEach((option) => { option.disabled = true; });
    try {
      await OlhoDigitalAccount.saveAvatar(account, await toRaster(blobToSave));
      await OlhoDigitalAccount.updateProfileAvatars(account);
      if (savedUrl) URL.revokeObjectURL(savedUrl);
      savedUrl = URL.createObjectURL(blobToSave);
      releaseSelectedUrl();
      selectedBlob = null;
      setPreview(savedUrl);
      cancelUpload.hidden = true;
      setStatus('Foto de perfil salva na sua conta.');
    } catch (error) {
      console.error(error);
      setStatus(error.message || 'Não foi possível salvar a foto.', true);
    } finally {
      isSaving = false;
      fileInput.disabled = false;
      cancelUpload.disabled = false;
      document.querySelectorAll('.avatar-option').forEach((option) => { option.disabled = false; });
      saveButton.disabled = !selectedBlob;
    }
  });

  OlhoDigitalAccount.refreshAvatar(account).catch(() => false).then(() => OlhoDigitalAccount.getAvatar(account)).then(async (avatar) => {
    if (!avatar?.blob) return;
    if (await isTransparentImage(avatar.blob)) {
      setStatus('A foto salva anteriormente ficou vazia por um erro no recorte. Escolha outra foto e confirme para substituí-la.', true);
      return;
    }
    savedUrl = URL.createObjectURL(avatar.blob);
    if (!selectedBlob) setPreview(savedUrl);
  }).catch((error) => {
    console.error(error);
    setStatus(error.message || 'Não foi possível carregar a foto salva.', true);
  });
  OlhoDigitalAccount.updateProfileAvatars(account);
}
})();
