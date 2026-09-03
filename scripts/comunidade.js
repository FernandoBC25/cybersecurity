document.addEventListener('DOMContentLoaded', () => {
  const profileToggle = document.getElementById('profileToggle');
  const publishBtn = document.getElementById('publishBtn');
  const newPost = document.getElementById('newPost');
  const postType = document.getElementById('postType');
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  if (!user) {
    window.location.href = './login.html';
    return;
  }

  if (profileToggle) {
    profileToggle.textContent = (user.name || 'U').charAt(0).toUpperCase();
  }

  if (publishBtn && newPost && postType) {
    publishBtn.addEventListener('click', () => {
      const text = newPost.value.trim();
      if (!text) return;

      const feed = document.querySelector('.feed');
      if (!feed) return;

      const card = document.createElement('article');
      card.className = 'post-card panel';
      card.innerHTML = `
        <div class="post-header">
          <div class="author">
            <span class="avatar pink">${(user.name || 'U').charAt(0).toUpperCase()}</span>
            <div>
              <strong>${user.name}</strong>
              <small>Agora</small>
            </div>
          </div>
          <span class="tag ${postType.value}">${postType.value}</span>
        </div>
        <p>${text}</p>
        <div class="post-actions">
          <button>👍 0</button>
          <button>💬 0</button>
          <button>🔖 Salvar</button>
        </div>
      `;

      feed.prepend(card);
      newPost.value = '';
    });
  }
});
