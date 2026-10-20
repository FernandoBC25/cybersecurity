window.homeData = {
  // Cursos que existem na página Aprender. A chave é a mesma usada no progresso salvo.
  // "etapas": 'paginas' = uma página por etapa; 'parametro' = material.html?etapa=...
  cursos: [
    { chave: 'fundamentos', nome: 'Fundamentos de Cibersegurança', nivel: 'Fácil', primeiraPagina: 'fundamentos.html', etapas: 'paginas', descricao: 'Os conceitos básicos para se proteger no dia a dia.', imagem: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=960&q=85' },
    { chave: 'phishing', nome: 'Proteção Contra Phishing', nivel: 'Fácil', primeiraPagina: 'material.html', etapas: 'paginas', descricao: 'Reconheça mensagens e páginas criadas para enganar.', imagem: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=720&q=80' },
    { chave: 'redes', nome: 'Segurança de Redes', nivel: 'Médio', primeiraPagina: 'material.html', etapas: 'paginas', descricao: 'Proteja conexões, Wi-Fi e dispositivos conectados.', imagem: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=720&q=80' },
    { chave: 'malware', nome: 'Análise de Malware', nivel: 'Difícil', primeiraPagina: 'material.html', etapas: 'paginas', descricao: 'Entenda vírus, ransomware e como evitá-los.', imagem: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=720&q=80' },
    { chave: 'proteger-sites', nome: 'Como Proteger Sites', nivel: 'Médio', primeiraPagina: 'material.html', etapas: 'parametro', descricao: 'Práticas defensivas para sites e contas administrativas.', imagem: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=720&q=80' },
    { chave: 'protecao-dados-senhas', nome: 'Proteção de Dados e Senhas', nivel: 'Médio', primeiraPagina: 'material.html', etapas: 'parametro', descricao: 'Proteja suas informações e suas contas.', imagem: 'https://images.unsplash.com/photo-1510511459019-5dda7724fd87?auto=format&fit=crop&w=720&q=80' },
    { chave: 'como-hackers-agem', nome: 'Como os Hackers Agem', nivel: 'Difícil', primeiraPagina: 'material.html', etapas: 'parametro', descricao: 'Uma visão defensiva de como incidentes acontecem.', imagem: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=720&q=80' },
    { chave: 'seguranca-na-nuvem', nome: 'Segurança na Nuvem', nivel: 'Médio', primeiraPagina: 'material.html', etapas: 'parametro', descricao: 'Controles essenciais para serviços na nuvem.', imagem: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=720&q=80' },
    { chave: 'evitar-golpes-internet', nome: 'Como Evitar Golpes na Internet', nivel: 'Fácil', primeiraPagina: 'material.html', etapas: 'parametro', descricao: 'Sinais simples para reconhecer golpes e ofertas falsas.', imagem: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=720&q=80' },
    { chave: 'identificar-combater-ataques', nome: 'Como Identificar e Combater Ataques', nivel: 'Difícil', primeiraPagina: 'material.html', etapas: 'parametro', descricao: 'Reconheça incidentes e responda de forma coordenada.', imagem: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=720&q=80' }
  ],
  noticiaDestaque: {
    titulo: 'Novo golpe utiliza páginas falsas para roubar contas',
    resumo: 'Saiba como identificar os principais sinais e se proteger desse tipo de ataque.',
    imagem: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=960&q=85',
    alt: 'Pessoa usando notebook para acessar uma conta online'
  },
  mensagensDoDia: [
    { texto: 'Na internet, pensar antes de clicar também é uma forma de proteção.', complemento: 'Pequenas atitudes fazem uma grande diferença.' },
    { texto: 'Uma senha única para cada conta fortalece sua segurança.', complemento: 'Um gerenciador de senhas pode ajudar.' },
    { texto: 'Desconfie da urgência. Golpistas querem que você aja sem pensar.', complemento: 'Pare, confira a fonte e só então decida.' }
  ]
};
