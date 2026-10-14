// Acesso do front aos dados da comunidade (posts, comentários, curtidas, membros).
// Carregar depois de auth.js.
(function () {
  const IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
  const MAX_IMAGE_BYTES = 5 * 1024 * 1024;

  function avatarUrl(profile) {
    if (!profile?.avatar_versao) return '';
    const { data } = supabaseClient.storage.from('avatars').getPublicUrl(`${profile.id}/avatar`);
    return `${data.publicUrl}?v=${profile.avatar_versao}`;
  }

  function imageUrl(path) {
    return path ? supabaseClient.storage.from('post-images').getPublicUrl(path).data.publicUrl : '';
  }

  function toAuthor(profile) {
    return { id: profile?.id || '', name: profile?.nome || 'Usuário', avatar: avatarUrl(profile) };
  }

  // Monta a árvore de comentários (respostas dentro de replies) a partir da lista plana.
  function buildComments(rows) {
    const byId = new Map(rows.map((row) => [row.id, {
      id: row.id,
      author: toAuthor(row.autor),
      text: row.texto,
      createdAt: new Date(row.criado_em).getTime(),
      replies: []
    }]));
    const roots = [];
    rows.forEach((row) => {
      const node = byId.get(row.id);
      const parent = row.parent_id && byId.get(row.parent_id);
      (parent ? parent.replies : roots).push(node);
    });
    const byDate = (a, b) => a.createdAt - b.createdAt;
    byId.forEach((node) => node.replies.sort(byDate));
    return roots.sort(byDate);
  }

  async function listPosts(currentUserId) {
    const { data, error } = await supabaseClient
      .from('posts')
      .select(`
        id, categoria, texto, imagem_path, destaque, criado_em,
        autor:perfis!posts_autor_id_fkey (id, nome, avatar_versao),
        comentarios (id, parent_id, texto, criado_em, autor:perfis!comentarios_autor_id_fkey (id, nome, avatar_versao)),
        curtidas:curtidas_posts (user_id)
      `)
      .order('criado_em', { ascending: false })
      .limit(100);
    if (error) throw error;

    return data.map((row) => ({
      id: row.id,
      author: toAuthor(row.autor),
      category: row.categoria,
      text: row.texto,
      image: imageUrl(row.imagem_path),
      featured: row.destaque,
      createdAt: new Date(row.criado_em).getTime(),
      likes: row.curtidas.length,
      likedByMe: row.curtidas.some((like) => like.user_id === currentUserId),
      comments: buildComments(row.comentarios)
    }));
  }

  async function listMembers() {
    const { data, error } = await supabaseClient.from('perfis').select('id, nome, avatar_versao').order('nome');
    if (error) throw error;
    return data.map(toAuthor);
  }

  function validateImage(file) {
    if (!IMAGE_TYPES.includes(file.type)) throw new Error('Formato inválido. Use uma imagem JPG, PNG ou WebP.');
    if (file.size > MAX_IMAGE_BYTES) throw new Error('A imagem excede o limite de 5 MB.');
  }

  async function createPost(userId, { category, text, imageFile }) {
    let imagePath = null;
    if (imageFile) {
      validateImage(imageFile);
      imagePath = `${userId}/${crypto.randomUUID()}`;
      const upload = await supabaseClient.storage.from('post-images').upload(imagePath, imageFile, { contentType: imageFile.type });
      if (upload.error) throw upload.error;
    }
    const { data, error } = await supabaseClient
      .from('posts')
      .insert({ categoria: category, texto: text, imagem_path: imagePath })
      .select('id')
      .single();
    if (error) {
      if (imagePath) await supabaseClient.storage.from('post-images').remove([imagePath]);
      throw error;
    }
    return data.id;
  }

  async function deletePost(post) {
    const { error } = await supabaseClient.from('posts').delete().eq('id', post.id);
    if (error) throw error;
    if (post.image) {
      const path = decodeURIComponent(new URL(post.image).pathname.split('/post-images/')[1] || '');
      if (path) await supabaseClient.storage.from('post-images').remove([path]);
    }
  }

  async function setLike(postId, userId, liked) {
    const { error } = liked
      ? await supabaseClient.from('curtidas_posts').insert({ post_id: postId, user_id: userId })
      : await supabaseClient.from('curtidas_posts').delete().eq('post_id', postId).eq('user_id', userId);
    if (error) throw error;
  }

  async function addComment(postId, parentId, text) {
    const { data, error } = await supabaseClient
      .from('comentarios')
      .insert({ post_id: postId, parent_id: parentId || null, texto: text })
      .select('id')
      .single();
    if (error) throw error;
    return data.id;
  }

  async function deleteComment(commentId) {
    const { error } = await supabaseClient.from('comentarios').delete().eq('id', commentId);
    if (error) throw error;
  }

  window.OlhoDigitalCommunity = {
    listPosts,
    listMembers,
    createPost,
    deletePost,
    setLike,
    addComment,
    deleteComment
  };
})();
