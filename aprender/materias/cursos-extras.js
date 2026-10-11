const extraCourses = {
  'proteger-sites': {
    title: 'Como Proteger Sites',
    difficulty: 'Médio',
    icon: '🛡️',
    summary: 'Práticas defensivas para proteger sites, contas administrativas e dados de visitantes.',
    material: {
      title: 'Bases de segurança para sites',
      paragraphs: ['A proteção de um site combina desenvolvimento seguro, configuração adequada, atualizações e monitoramento. Um único controle não evita todos os riscos.', 'Comece reduzindo o que fica exposto e limitando quem pode administrar o site. Planeje atualizações e mantenha cópias de segurança testadas.'],
      tips: ['Use HTTPS e mantenha certificados válidos.', 'Ative autenticação multifator nas contas administrativas.', 'Atualize plataforma, extensões e dependências a partir de fontes confiáveis.', 'Colete apenas os dados necessários e restrinja o acesso a eles.']
    },
    video: {
      title: 'Camadas de proteção de um site',
      paragraphs: ['Revise como autenticação, atualizações, validação de entradas, controle de acesso e cópias de segurança trabalham em conjunto.', 'Em um site real, mudanças devem passar por revisão e testes em ambiente separado antes de chegar à produção.'],
      tips: ['Separe ambientes de teste e produção.', 'Registre alterações e monitore erros de acesso.', 'Tenha um plano para corrigir vulnerabilidades e comunicar incidentes.']
    },
    questions: [
      ['Qual medida reduz o risco de acesso indevido ao painel administrativo?', ['Compartilhar uma única conta entre toda a equipe', 'Ativar autenticação multifator e contas individuais', 'Desativar os registros de acesso'], 1],
      ['Por que manter componentes do site atualizados?', ['Para corrigir falhas conhecidas e manter compatibilidade', 'Para deixar as senhas visíveis', 'Para dispensar cópias de segurança'], 0],
      ['Qual é uma boa prática para dados de visitantes?', ['Coletar o máximo possível por precaução', 'Guardar tudo sem prazo definido', 'Coletar apenas o necessário e restringir o acesso'], 2],
      ['Onde testar uma mudança antes de publicar?', ['Diretamente no ambiente de produção', 'Em ambiente de teste separado', 'Em uma conta compartilhada sem registro'], 1],
      ['O que ajuda a recuperar o site após uma falha?', ['Cópias de segurança testadas e plano de recuperação', 'Desativar o monitoramento', 'Manter uma única cópia no mesmo servidor'], 0]
    ]
  },
  'protecao-dados-senhas': {
    title: 'Proteção de Dados e Senhas',
    difficulty: 'Médio',
    icon: '🔐',
    summary: 'Como proteger informações pessoais e reduzir o risco de comprometimento de contas.',
    material: {
      title: 'Proteja seus dados e acessos',
      paragraphs: ['Dados pessoais podem ser usados para fraudes quando expostos ou compartilhados sem cuidado. Antes de fornecer uma informação, confira quem está pedindo, por qual canal e para qual finalidade.', 'Senhas longas e únicas dificultam que o vazamento de uma conta comprometa outras. Um gerenciador confiável ajuda a criar e guardar credenciais diferentes.'],
      tips: ['Use uma senha exclusiva para cada serviço.', 'Ative autenticação multifator, de preferência por aplicativo ou chave de segurança.', 'Não compartilhe códigos de recuperação nem códigos temporários.', 'Revise permissões e encerre sessões que não reconhece.']
    },
    video: {
      title: 'Hábitos para manter contas seguras',
      paragraphs: ['Veja como gerenciadores de senhas, autenticação multifator e alertas de acesso ajudam a proteger contas no dia a dia.', 'Se suspeitar de exposição, troque a senha usando o site ou aplicativo oficial, encerre sessões abertas e avise o provedor.'],
      tips: ['Proteja o gerenciador com uma senha principal forte.', 'Guarde códigos de recuperação em local seguro.', 'Desconfie de pedidos inesperados de senha ou código.']
    },
    questions: [
      ['Por que usar senhas diferentes em cada serviço?', ['Para limitar o impacto se uma delas vazar', 'Para facilitar o compartilhamento', 'Para evitar atualizações'], 0],
      ['Qual é uma forma adicional de proteger uma conta?', ['Reutilizar a senha em sites conhecidos', 'Desativar alertas de acesso', 'Ativar autenticação multifator'], 2],
      ['Uma pessoa pede seu código de autenticação por mensagem. O que fazer?', ['Enviar se ela souber seu nome', 'Não compartilhar e confirmar o pedido por canal oficial', 'Publicar o código para pedir ajuda'], 1],
      ['Qual dado deve ser compartilhado em um formulário?', ['Somente o necessário para uma finalidade legítima', 'Todos os dados pessoais', 'Senha e códigos temporários'], 0],
      ['O que fazer se notar um acesso desconhecido?', ['Ignorar se a conta ainda funciona', 'Apagar todos os avisos', 'Trocar a senha pelo canal oficial e encerrar sessões'], 2]
    ]
  },
  'como-hackers-agem': {
    title: 'Como os Hackers Agem',
    difficulty: 'Difícil',
    icon: '🧭',
    summary: 'Uma visão defensiva de como incidentes se desenvolvem e onde detectar sinais de risco.',
    material: {
      title: 'Entenda o ciclo de um incidente',
      paragraphs: ['Incidentes podem envolver reconhecimento, tentativa de acesso, uso indevido de privilégios e impacto nos sistemas. Conhecer essas etapas ajuda equipes a planejar controles e identificar sinais cedo.', 'O estudo aqui é defensivo: observe indicadores, reduza exposição e reporte atividades suspeitas. Qualquer teste deve ter autorização explícita e limites definidos.'],
      tips: ['Reduza informações públicas desnecessárias sobre sistemas internos.', 'Use autenticação forte e privilégios mínimos.', 'Centralize registros e monitore mudanças incomuns.', 'Defina responsáveis e canais para comunicar incidentes.']
    },
    video: {
      title: 'Da prevenção à resposta',
      paragraphs: ['Relacione cada etapa de um incidente a controles defensivos: inventário e atualização reduzem exposição; autenticação e segmentação limitam acessos; monitoramento ajuda a detectar mudanças.', 'Uma resposta coordenada preserva evidências, contém o impacto e recupera serviços a partir de fontes confiáveis.'],
      tips: ['Investigue alertas com contexto e registros.', 'Não tente acessar sistemas sem autorização.', 'Registre decisões e escale incidentes conforme o plano.']
    },
    questions: [
      ['Qual prática limita o impacto de uma conta comprometida?', ['Usar privilégios mínimos e autenticação multifator', 'Compartilhar credenciais administrativas', 'Desativar registros'], 0],
      ['Você observa uma atividade incomum em um sistema. Qual é a ação inicial adequada?', ['Apagar os registros', 'Publicar detalhes técnicos', 'Registrar o alerta e seguir o fluxo de resposta'], 2],
      ['Por que manter inventário de ativos?', ['Para ignorar equipamentos antigos', 'Para saber o que proteger e identificar ativos desconhecidos', 'Para compartilhar senhas'], 1],
      ['Quando um teste de segurança deve ser realizado?', ['Com autorização, escopo e limites definidos', 'Em qualquer sistema acessível', 'Sem avisar os responsáveis'], 0],
      ['Qual medida ajuda a detectar mudanças suspeitas?', ['Desligar os alertas', 'Remover logs antigos sem revisão', 'Monitorar registros e alterações importantes'], 2]
    ]
  },
  'seguranca-na-nuvem': {
    title: 'Segurança na Nuvem',
    difficulty: 'Médio',
    icon: '☁️',
    summary: 'Controles essenciais para proteger contas, arquivos e serviços hospedados na nuvem.',
    material: {
      title: 'Responsabilidade compartilhada',
      paragraphs: ['Serviços de nuvem protegem a infraestrutura, enquanto clientes configuram identidades, permissões, dados e serviços contratados. As responsabilidades exatas variam conforme o serviço.', 'Configurações abertas por engano podem expor arquivos. Revise permissões e use contas individuais para que as ações possam ser atribuídas.'],
      tips: ['Ative autenticação multifator nas contas administrativas.', 'Conceda somente as permissões necessárias.', 'Revise compartilhamentos públicos e links com acesso amplo.', 'Ative registros de atividade e mantenha cópias de segurança.']
    },
    video: {
      title: 'Proteja identidades e armazenamento',
      paragraphs: ['Revise como permissões, criptografia, registros e alertas reduzem riscos em serviços de nuvem.', 'Antes de disponibilizar um recurso, confirme quem pode acessá-lo, como o acesso é autenticado e como será revogado.'],
      tips: ['Use grupos e funções em vez de credenciais compartilhadas.', 'Remova acessos quando uma pessoa ou serviço não precisar mais deles.', 'Teste procedimentos de recuperação.']
    },
    questions: [
      ['Quem configura permissões de acesso aos dados de uma conta de nuvem?', ['Sempre apenas o provedor', 'O cliente, conforme o serviço e o modelo de responsabilidade', 'Qualquer pessoa com o link'], 1],
      ['Qual prática ajuda a proteger uma conta administrativa?', ['Ativar autenticação multifator', 'Compartilhar a senha entre equipes', 'Deixar a conta sem monitoramento'], 0],
      ['O que revisar ao encontrar um arquivo compartilhado publicamente?', ['Nada, se o link for difícil de adivinhar', 'Somente o nome do arquivo', 'A necessidade do compartilhamento e quem tem acesso'], 2],
      ['Para que servem registros de atividade?', ['Substituir controles de acesso', 'Ajudar a identificar e investigar ações', 'Tornar os arquivos públicos'], 1],
      ['Como conceder acesso a uma equipe?', ['Permitir somente as ações necessárias para cada função', 'Dar privilégios administrativos a todos', 'Usar uma conta comum'], 0]
    ]
  },
  'evitar-golpes-internet': {
    title: 'Como Evitar Golpes na Internet',
    difficulty: 'Fácil',
    icon: '🛑',
    summary: 'Sinais simples para reconhecer mensagens suspeitas, ofertas falsas e pedidos de pagamento.',
    material: {
      title: 'Pare, confira e só então responda',
      paragraphs: ['Golpes costumam criar urgência, prometer vantagens improváveis ou pedir dinheiro e dados pessoais. A aparência de uma marca ou o nome de alguém conhecido não prova que a mensagem é verdadeira.', 'Confirme solicitações por um canal que você já conhece. Para compras, verifique o endereço do site, formas de contato e condições antes de pagar.'],
      tips: ['Desconfie de prazos e ameaças que pressionam você a agir.', 'Não clique em links nem abra anexos inesperados.', 'Nunca compartilhe senhas ou códigos de autenticação.', 'Converse com alguém de confiança antes de transferir dinheiro.']
    },
    video: {
      title: 'Confira antes de pagar ou fornecer dados',
      paragraphs: ['Veja como reconhecer sinais comuns de fraude em mensagens, lojas e pedidos de ajuda financeira.', 'Abra aplicativos e sites digitando o endereço conhecido. Se já compartilhou dados ou fez um pagamento, contate imediatamente o banco ou serviço oficial.'],
      tips: ['Confira o domínio completo e erros no endereço.', 'Pesquise a empresa por fontes independentes.', 'Guarde comprovantes e reporte tentativas de golpe.']
    },
    questions: [
      ['Uma mensagem promete um prêmio e pede uma taxa para liberar o valor. O que fazer?', ['Pagar rapidamente para não perder o prêmio', 'Não pagar e confirmar a oferta por fontes oficiais', 'Enviar seus dados bancários'], 1],
      ['Um conhecido pede dinheiro com urgência por uma conta nova. Como confirmar?', ['Transferir um valor pequeno', 'Responder com seus dados pessoais', 'Ligar para a pessoa por um número já conhecido'], 2],
      ['Como acessar com segurança um serviço mencionado numa mensagem?', ['Digitar o endereço oficial ou usar o aplicativo conhecido', 'Clicar no primeiro link recebido', 'Enviar sua senha para confirmar a conta'], 0],
      ['O que fazer com um código de autenticação recebido sem solicitá-lo?', ['Compartilhar com quem pediu', 'Não informar a ninguém e revisar a segurança da conta', 'Publicar o código'], 1],
      ['Uma oferta parece boa demais e exige decisão imediata. Qual sinal isso representa?', ['Garantia de que a oferta é legítima', 'Um procedimento comum de segurança', 'Possível tentativa de pressionar a vítima'], 2]
    ]
  },
  'identificar-combater-ataques': {
    title: 'Como Identificar e Combater Ataques',
    difficulty: 'Difícil',
    icon: '🚨',
    summary: 'Reconhecimento de sinais de incidentes e resposta defensiva coordenada.',
    material: {
      title: 'Detecte, contenha e recupere',
      paragraphs: ['Um ataque pode se manifestar como acessos incomuns, alterações inesperadas, indisponibilidade ou alertas de segurança. Um sinal isolado precisa ser avaliado junto ao contexto e aos registros disponíveis.', 'Siga o plano da organização: reporte, preserve evidências, contenha o incidente com autorização e recupere serviços de fontes confiáveis.'],
      tips: ['Registre horário, sistema afetado e mensagens de alerta.', 'Use canais definidos para acionar a equipe responsável.', 'Não apague arquivos ou registros antes da orientação técnica.', 'Após a contenção, revise a causa e os controles necessários.']
    },
    video: {
      title: 'Resposta organizada a incidentes',
      paragraphs: ['Uma resposta eficiente define responsáveis, prioridades de contenção, comunicação e recuperação. A equipe deve preservar evidências e limitar o impacto sem improvisar mudanças em sistemas críticos.', 'Depois da recuperação, monitore sinais recorrentes e registre as lições aprendidas para fortalecer os controles.'],
      tips: ['Siga o plano de resposta aprovado.', 'Comunique apenas informações verificadas pelos canais autorizados.', 'Confirme a integridade dos backups antes de restaurar.']
    },
    questions: [
      ['Um dispositivo apresenta alertas e comportamento inesperado. Qual é a primeira resposta adequada?', ['Ignorar até que outros dispositivos falhem', 'Registrar os sinais e acionar o fluxo de resposta', 'Apagar os registros do sistema'], 1],
      ['Por que preservar registros durante um incidente?', ['Eles ajudam a entender o que ocorreu e orientar a resposta', 'Para compartilhá-los publicamente', 'Para substituir as cópias de segurança'], 0],
      ['Como conter um incidente em um sistema corporativo?', ['Fazer mudanças sem avisar ninguém', 'Desligar todos os sistemas sem avaliação', 'Seguir o plano e as orientações da equipe responsável'], 2],
      ['O que verificar antes de recuperar um serviço?', ['Se a fonte de recuperação é confiável e íntegra', 'Se os logs foram apagados', 'Se o acesso administrativo é público'], 0],
      ['O que fazer após a recuperação?', ['Encerrar o monitoramento', 'Revisar a causa, monitorar e registrar melhorias', 'Apagar o relatório do incidente'], 1]
    ]
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const courseKey = document.body.dataset.courseKey;
  const course = extraCourses[courseKey];
  const user = OlhoDigitalAccount.requireAuthentication();
  const app = document.getElementById('courseApp');
  if (!user || !course || !app) return;

  OlhoDigitalAccount.applySettings(OlhoDigitalAccount.getEffectiveSettings(user));
  OlhoDigitalAccount.updateProfileAvatars(user);
  OlhoDigitalAccount.initProfileMenu();
  localStorage.setItem(`${courseKey}Started`, 'true');

  const create = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  };
  const stages = ['material', 'video', 'quiz', 'evaluation'];
  const labels = ['Material', 'Vídeo', 'Questionário', 'Avaliação do curso'];
  const requestedStage = new URLSearchParams(window.location.search).get('etapa');
  let currentStage = stages.includes(requestedStage) ? requestedStage : 'material';
  let quizPassed = false;
  let evaluationSubmitted = false;

  const backLink = create('a', 'back-link', '← Voltar para Aprender');
  backLink.href = '../../../aprender.html';
  app.append(backLink);

  const hero = create('section', 'course-hero');
  const heroCopy = create('div');
  heroCopy.append(create('span', 'level course-difficulty', course.difficulty));
  heroCopy.append(create('h1', '', course.title));
  heroCopy.append(create('p', '', course.summary));
  hero.append(heroCopy, create('div', 'hero-shield', course.icon));
  app.append(hero);

  const layout = create('div', 'course-layout');
  const contentColumn = create('div', 'course-content');
  const sidebar = create('aside', 'course-sidebar');
  const progressCard = create('div', 'progress-card');
  const progressHeading = create('div', 'progress-heading');
  progressHeading.append(create('strong', '', 'Seu progresso'));
  const progressValue = create('span', '', '0%');
  progressHeading.append(progressValue);
  const progressTrack = create('div', 'progress-track');
  progressTrack.append(create('span'));
  const stepDescription = create('p');
  const advanceButton = create('button', 'primary-btn block', 'Avançar');
  advanceButton.type = 'button';
  progressCard.append(progressHeading, progressTrack, stepDescription, advanceButton);

  const contentsCard = create('div', 'contents-card');
  contentsCard.append(create('h3', '', 'Conteúdo do curso'));
  const contentsList = create('ol');
  labels.forEach((label, index) => {
    const item = create('li', '', label);
    item.dataset.stage = stages[index];
    contentsList.append(item);
  });
  contentsCard.append(contentsList);
  sidebar.append(progressCard, contentsCard);
  layout.append(contentColumn, sidebar);
  app.append(layout);

  const renderTextContent = (stage) => {
    const data = course[stage];
    const section = create('section', 'content-section');
    section.append(create('h2', '', data.title));
    const guide = create('div', 'lesson-guide');
    guide.append(create('h3', '', stage === 'video' ? 'Conteúdo da etapa' : 'Pontos principais'));
    data.paragraphs.forEach((paragraph) => guide.append(create('p', '', paragraph)));
    const list = create('ul', 'security-tips');
    data.tips.forEach((tip) => list.append(create('li', '', tip)));
    guide.append(list);
    section.append(guide);
    contentColumn.replaceChildren(section);
  };

  const renderQuiz = () => {
    const section = create('section', 'content-section');
    section.append(create('p', 'eyebrow', 'Avaliação final'), create('h2', '', 'Confira seus conhecimentos'));
    const form = create('form', 'quiz-form');
    form.id = 'extraQuizForm';
    course.questions.forEach(([question, options], questionIndex) => {
      const fieldset = create('fieldset');
      const legend = create('legend', '', `${questionIndex + 1}. ${question}`);
      fieldset.append(legend);
      options.forEach((option, optionIndex) => {
        const label = create('label');
        const input = document.createElement('input');
        input.type = 'radio';
        input.name = `question-${questionIndex}`;
        input.value = String(optionIndex);
        input.required = optionIndex === 0;
        label.append(input, document.createTextNode(` ${option}`));
        fieldset.append(label);
      });
      form.append(fieldset);
    });
    const actions = create('div', 'quiz-actions');
    const submit = create('button', 'primary-btn', 'Enviar respostas');
    submit.type = 'submit';
    const feedback = create('p', 'quiz-feedback');
    feedback.setAttribute('role', 'status');
    actions.append(submit, feedback);
    form.append(actions);
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const score = course.questions.reduce((total, question, index) => {
        const selected = form.querySelector(`input[name="question-${index}"]:checked`);
        return total + (Number(selected?.value) === question[2] ? 1 : 0);
      }, 0);
      feedback.textContent = `Respostas enviadas! Sua nota foi ${score}/5 (${score * 20}%). Agora você pode avançar para a avaliação do curso.`;
      feedback.classList.add('success');
      quizPassed = true;
      advanceButton.disabled = false;
    });
    section.append(form);
    contentColumn.replaceChildren(section);
  };

  const renderEvaluation = () => {
    const section = create('section', 'content-section');
    section.append(create('p', 'eyebrow', 'Sua opinião'), create('h2', '', 'Como foi sua experiência?'));
    const form = create('form', 'evaluation-form');
    form.id = 'extraEvaluationForm';
    const fieldset = create('fieldset');
    fieldset.append(create('legend', '', 'Como você avalia o curso?'));
    for (let rating = 5; rating >= 1; rating -= 1) {
      const label = create('label');
      const input = document.createElement('input');
      input.type = 'radio';
      input.name = 'course-rating';
      input.value = String(rating);
      input.required = rating === 5;
      label.append(input, document.createTextNode(` ${'⭐'.repeat(rating)} ${rating === 5 ? 'Excelente' : rating === 4 ? 'Muito bom' : rating === 3 ? 'Bom' : rating === 2 ? 'Regular' : 'Precisa melhorar'}`));
      fieldset.append(label);
    }
    const commentLabel = create('label', 'evaluation-comment', 'Deixe um comentário (opcional)');
    commentLabel.htmlFor = 'extra-course-comment';
    const comment = create('textarea');
    comment.id = 'extra-course-comment';
    comment.rows = 5;
    comment.placeholder = 'Conte o que achou do curso...';
    const updateCommentRequirement = () => {
      const selected = form.querySelector('input[name="course-rating"]:checked');
      const required = selected && Number(selected.value) < 4;
      comment.required = Boolean(required);
      comment.setAttribute('aria-required', String(Boolean(required)));
      commentLabel.textContent = required ? 'Informe o motivo da sua avaliação (obrigatório)' : 'Deixe um comentário (opcional)';
      comment.placeholder = required ? 'Explique o motivo da nota...' : 'Conte o que achou do curso...';
      comment.setCustomValidity(required && !comment.value.trim() ? 'Escreva o motivo da sua avaliação.' : '');
    };
    fieldset.querySelectorAll('input').forEach((input) => input.addEventListener('change', updateCommentRequirement));
    comment.addEventListener('input', updateCommentRequirement);
    const actions = create('div', 'quiz-actions');
    const submit = create('button', 'primary-btn', 'Enviar avaliação');
    submit.type = 'submit';
    const feedback = create('p', 'quiz-feedback');
    feedback.setAttribute('role', 'status');
    actions.append(submit, feedback);
    form.append(fieldset, commentLabel, comment, actions);
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const selected = form.querySelector('input[name="course-rating"]:checked');
      localStorage.setItem(`${courseKey}Rating`, selected.value);
      feedback.textContent = 'Avaliação enviada! Agora você pode concluir o curso.';
      feedback.classList.add('success');
      evaluationSubmitted = true;
      advanceButton.disabled = false;
    });
    section.append(form);
    contentColumn.replaceChildren(section);
  };

  const renderStage = () => {
    const stageIndex = stages.indexOf(currentStage);
    const percentages = [0, 33, 66, 100];
    const percent = percentages[stageIndex];
    progressValue.textContent = `${percent}%`;
    progressTrack.firstElementChild.style.width = `${percent}%`;
    stepDescription.textContent = stageIndex === 3 ? 'Etapa final: Avaliação do curso' : `Parte ${stageIndex + 1} de 3: ${labels[stageIndex]}`;
    contentsList.querySelectorAll('li').forEach((item) => item.classList.toggle('current', item.dataset.stage === currentStage));
    advanceButton.disabled = currentStage === 'quiz' || currentStage === 'evaluation';
    advanceButton.textContent = stageIndex === 0 ? 'Avançar para Vídeo' : stageIndex === 1 ? 'Avançar para Questionário' : stageIndex === 2 ? 'Avançar para Avaliação' : 'Concluir curso';
    if (currentStage === 'material' || currentStage === 'video') renderTextContent(currentStage);
    if (currentStage === 'quiz') renderQuiz();
    if (currentStage === 'evaluation') renderEvaluation();
  };

  advanceButton.addEventListener('click', () => {
    const index = stages.indexOf(currentStage);
    if (currentStage === 'quiz' && !quizPassed) return;
    if (currentStage === 'evaluation') {
      if (!evaluationSubmitted) return;
      localStorage.setItem(`${courseKey}Progress`, '100');
      window.location.href = '../../../aprender.html?curso=concluido';
      return;
    }
    localStorage.setItem(`${courseKey}Progress`, String([33, 66, 75][index]));
    currentStage = stages[index + 1];
    const url = new URL(window.location.href);
    url.searchParams.set('etapa', currentStage);
    window.history.pushState({ stage: currentStage }, '', url);
    renderStage();
  });

  window.addEventListener('popstate', () => {
    const stage = new URLSearchParams(window.location.search).get('etapa');
    currentStage = stages.includes(stage) ? stage : 'material';
    renderStage();
  });

  renderStage();
});
