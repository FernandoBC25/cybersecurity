// Catálogo: Segurança no trabalho (10 cursos).
Object.assign((window.novosCursos = window.novosCursos || {}), {
  'politica-seguranca-informacao': {
    category: 'Segurança no trabalho', difficulty: 'Médio', icon: '📜', title: 'Política de Segurança da Informação',
    summary: 'Como regras claras transformam a segurança em hábito dentro da organização.',
    material: {
      title: 'O que uma política de segurança define',
      paragraphs: [
        'Uma política de segurança da informação é o documento que registra o que a organização protege, quem é responsável, o que é permitido e proibido e quais as consequências do descumprimento. Ela dá direção para decisões do dia a dia e para a auditoria.',
        'Uma boa política é curta, clara e aplicável. Ela se apoia em três pilares: confidencialidade, integridade e disponibilidade, e é complementada por normas e procedimentos mais detalhados, como controle de acesso, uso de dispositivos, backup e resposta a incidentes.',
        'Política que ninguém lê não protege. Por isso ela deve ser divulgada, treinada e revisada periodicamente, com apoio visível da direção e canais simples para tirar dúvidas e relatar problemas.'
      ],
      tips: ['Escreva em linguagem simples e com exemplos.', 'Defina responsáveis e canais para relatar incidentes.', 'Revise a política ao menos uma vez por ano.', 'Treine as pessoas e registre quem recebeu o treinamento.']
    },
    video: {
      title: 'Da política à prática',
      paragraphs: [
        'Transforme regras em procedimentos fáceis de seguir: listas de verificação, modelos e automações. Quanto menor o atrito, maior a adesão. Meça indicadores simples, como percentual de treinamentos concluídos e tempo para corrigir vulnerabilidades.',
        'Exceções devem ser formais, justificadas e com prazo. Sem esse controle, as exceções viram regra e a política perde força.'
      ],
      tips: ['Documente exceções com justificativa e validade.', 'Meça a adesão com indicadores simples.', 'Faça revisões após incidentes para melhorar a política.']
    },
    questions: [
      ['Para que serve a política de segurança da informação?', ['Definir regras, responsáveis e consequências', 'Substituir backups', 'Aumentar a velocidade da rede'], 0],
      ['Quais são os três pilares clássicos da segurança?', ['Confidencialidade, integridade e disponibilidade', 'Custo, tempo e escopo', 'Rede, servidor e senha'], 0],
      ['Uma boa política deve ser:', ['Clara, curta e aplicável', 'Secreta e complexa', 'Escrita apenas em termos técnicos'], 0],
      ['Como tratar exceções?', ['Formalizar com justificativa e prazo', 'Aceitar verbalmente', 'Ignorar'], 0],
      ['Por que revisar a política periodicamente?', ['Ameaças e negócios mudam', 'Para trocar o logotipo', 'Para reduzir treinamentos'], 0]
    ]
  },
  'trabalho-remoto-seguro': {
    category: 'Segurança no trabalho', difficulty: 'Fácil', icon: '🏡', title: 'Trabalho Remoto Seguro',
    summary: 'Proteja dados da empresa quando o escritório é a sua casa ou um café.',
    material: {
      title: 'O escritório mudou, os riscos ficaram',
      paragraphs: [
        'No trabalho remoto, a empresa perde parte do controle sobre rede, equipamentos e ambiente. Roteadores domésticos sem atualização, computadores compartilhados com a família e redes públicas aumentam o risco de vazamento e de invasão.',
        'Use equipamentos fornecidos pela empresa sempre que possível, mantenha sistema e antivírus atualizados e acesse sistemas internos por VPN ou solução de acesso seguro aprovada. Ative MFA em todas as contas profissionais.',
        'Cuide também do ambiente físico: trave a tela ao se afastar, evite que terceiros vejam documentos na sua tela ou em chamadas de vídeo e não deixe anotações de senhas à vista.'
      ],
      tips: ['Use VPN ou acesso seguro aprovado pela empresa.', 'Trave a tela sempre que se afastar.', 'Separe o uso pessoal do profissional e não compartilhe o equipamento de trabalho.', 'Atualize roteador e troque a senha padrão do Wi-Fi.']
    },
    video: {
      title: 'Reuniões, arquivos e comunicação',
      paragraphs: [
        'Em reuniões online, use senha ou sala de espera, verifique os participantes antes de compartilhar a tela e não grave sem aviso. Cuidado com o que aparece ao fundo e com notificações pessoais durante o compartilhamento.',
        'Não envie dados da empresa para e-mails pessoais, nem use serviços de nuvem não aprovados. Quando algo der errado, avise a equipe de segurança logo: relatar rápido reduz o impacto.'
      ],
      tips: ['Use somente ferramentas de colaboração aprovadas.', 'Não envie arquivos de trabalho para e-mail pessoal.', 'Avise a segurança imediatamente em caso de perda ou suspeita.']
    },
    questions: [
      ['Qual cuidado vale em casa ao trabalhar?', ['Travar a tela ao se afastar', 'Deixar a senha anotada na mesa', 'Compartilhar o notebook'], 0],
      ['Como acessar sistemas internos com segurança?', ['Por VPN ou acesso aprovado, com MFA', 'Por qualquer Wi-Fi aberto', 'Pelo celular de um amigo'], 0],
      ['Por que não enviar arquivos de trabalho ao e-mail pessoal?', ['Foge do controle e da proteção da empresa', 'Gasta internet', 'O e-mail pessoal não aceita anexos'], 0],
      ['O que fazer ao perder o notebook da empresa?', ['Avisar a equipe de segurança imediatamente', 'Esperar alguns dias', 'Comprar outro por conta própria'], 0],
      ['O que verificar em reuniões online?', ['Participantes e o que aparece ao compartilhar a tela', 'Só a cor do fundo', 'O volume do microfone'], 0]
    ]
  },
  'byod-dispositivos-pessoais': {
    category: 'Segurança no trabalho', difficulty: 'Médio', icon: '📲', title: 'Dispositivos Pessoais no Trabalho (BYOD)',
    summary: 'Equilíbrio entre praticidade e proteção de dados quando o celular pessoal acessa a empresa.',
    material: {
      title: 'Traga seu próprio dispositivo, com regras',
      paragraphs: [
        'BYOD (Bring Your Own Device) é a prática de usar celulares, tablets e notebooks pessoais para trabalhar. É prática e econômica, mas mistura dados pessoais e corporativos e reduz o controle da empresa sobre o aparelho.',
        'Os riscos incluem aplicativos inseguros, aparelhos sem atualização, perda ou roubo, uso por familiares e redes inseguras. Um incidente pode expor dados da empresa e também dados pessoais do usuário.',
        'Boas práticas combinam política clara e tecnologia: exigir bloqueio de tela, criptografia, sistema atualizado e, quando adequado, gestão de dispositivos móveis (MDM) com separação entre perfil pessoal e profissional e possibilidade de apagar apenas os dados corporativos.'
      ],
      tips: ['Aceite as exigências mínimas: bloqueio, criptografia e atualização.', 'Use perfil ou container separado para aplicativos corporativos.', 'Não faça root ou jailbreak em aparelhos que acessam a empresa.', 'Comunique perda ou roubo imediatamente.']
    },
    video: {
      title: 'Privacidade e responsabilidade dos dois lados',
      paragraphs: [
        'A política de BYOD deve deixar claro o que a empresa pode ver e controlar. Em geral, ela gerencia apenas a parte corporativa, sem acesso a fotos e mensagens pessoais. Transparência evita conflitos e aumenta a adesão.',
        'Na saída do funcionário, o acesso corporativo deve ser revogado e os dados da empresa, removidos do aparelho, sem apagar dados pessoais.'
      ],
      tips: ['Leia a política de BYOD para saber o que é monitorado.', 'Solicite remoção segura de dados corporativos ao sair.', 'Evite armazenar arquivos da empresa em nuvens pessoais.']
    },
    questions: [
      ['O que é BYOD?', ['Uso de dispositivos pessoais para trabalhar', 'Um tipo de backup', 'Um antivírus'], 0],
      ['Qual é um risco do BYOD?', ['Misturar dados pessoais e corporativos', 'Aumentar a bateria', 'Reduzir o armazenamento'], 0],
      ['O que o MDM pode fazer?', ['Separar perfis e apagar só os dados corporativos', 'Ler suas fotos', 'Trocar seu operador'], 0],
      ['Por que não fazer root ou jailbreak?', ['Reduz proteções de segurança do aparelho', 'Aumenta a segurança', 'Aumenta a velocidade'], 0],
      ['O que fazer ao sair da empresa?', ['Remover acesso e dados corporativos', 'Manter tudo', 'Compartilhar com colegas'], 0]
    ]
  },
  'fraude-falso-executivo-bec': {
    category: 'Segurança no trabalho', difficulty: 'Médio', icon: '💼', title: 'Fraude do Falso Executivo e BEC',
    summary: 'Como golpes por e-mail corporativo desviam pagamentos e como bloquear.',
    material: {
      title: 'O pedido urgente do "chefe"',
      paragraphs: [
        'BEC (Business Email Compromise) são fraudes em que o criminoso se passa por um executivo, fornecedor ou parceiro para convencer o financeiro a pagar uma fatura falsa, alterar dados bancários ou enviar documentos. Os prejuízos costumam ser altos.',
        'O golpista pesquisa a empresa, imita o estilo da comunicação e cria urgência e sigilo ("estou em reunião, não ligue"). Em muitos casos, ele usa um domínio parecido (empresa-sa.com no lugar de empresa.com) ou invade uma conta real.',
        'A melhor defesa é o processo: pagamentos e alterações de dados bancários devem ser confirmados por um segundo canal, com dupla aprovação e registros. A pressa não é motivo para pular etapas.'
      ],
      tips: ['Confirme alterações de dados bancários por ligação ao contato cadastrado.', 'Exija dupla aprovação para pagamentos acima de um limite.', 'Verifique o domínio completo do remetente.', 'Treine o financeiro para reconhecer urgência e sigilo.']
    },
    video: {
      title: 'Reconhecendo e respondendo',
      paragraphs: [
        'Preste atenção em detalhes: pequenas diferenças no endereço, pedido de segredo, mudança de conta de recebimento e linguagem fora do padrão. Use o catálogo de contatos oficiais, não os dados que vêm no e-mail suspeito.',
        'Se um pagamento já foi feito, comunique imediatamente o banco e a equipe de segurança. Quanto mais cedo, maiores as chances de bloquear ou reaver o valor.'
      ],
      tips: ['Ative alertas e regras de marcação para e-mails externos.', 'Use autenticação de e-mail (SPF, DKIM, DMARC) no domínio.', 'Avise o banco imediatamente se um pagamento foi desviado.']
    },
    questions: [
      ['O que é BEC?', ['Fraude por e-mail se passando por executivo ou fornecedor', 'Um tipo de backup', 'Uma criptografia'], 0],
      ['Qual sinal é típico desses golpes?', ['Urgência e pedido de sigilo', 'Pedido de relatório mensal', 'Aviso de manutenção da empresa'], 0],
      ['Como validar uma alteração de dados bancários?', ['Ligando para um contato conhecido e cadastrado', 'Respondendo ao e-mail', 'Aprovando sem conferir'], 0],
      ['Qual controle reduz o risco de pagamento fraudulento?', ['Dupla aprovação e registros', 'Pagamento em um clique', 'Remover limites'], 0],
      ['O que fazer se o pagamento já foi enviado ao golpista?', ['Acionar o banco e a segurança imediatamente', 'Aguardar', 'Pedir outro pagamento'], 0]
    ]
  },
  'gestao-acessos-privilegio-minimo': {
    category: 'Segurança no trabalho', difficulty: 'Médio', icon: '🪪', title: 'Gestão de Acessos e Privilégio Mínimo',
    summary: 'Quem acessa o quê, por quanto tempo e por quê: o coração do controle de acesso.',
    material: {
      title: 'Cada pessoa só precisa do que precisa',
      paragraphs: [
        'Gestão de identidades e acessos (IAM) define quem pode entrar em quais sistemas e com quais permissões. O princípio do privilégio mínimo diz que cada usuário e cada programa deve ter apenas as permissões necessárias para sua função, e nada além.',
        'Permissões em excesso aumentam o impacto de erros e invasões: uma conta comum comprometida com acesso de administrador permite ao atacante controlar a rede. Contas compartilhadas ainda impedem saber quem fez o quê.',
        'Para manter o controle, use contas individuais, autenticação multifator, perfis por função (RBAC) e revisões periódicas de acesso. Quando alguém muda de área ou sai, as permissões devem ser ajustadas ou removidas no mesmo dia.'
      ],
      tips: ['Use contas individuais e evite compartilhar credenciais.', 'Separe contas administrativas das contas do dia a dia.', 'Revise os acessos periodicamente e remova o que não é mais necessário.', 'Revogue acessos imediatamente na saída ou troca de função.']
    },
    video: {
      title: 'Ciclo de vida do acesso',
      paragraphs: [
        'O ciclo começa na entrada (concessão com aprovação), segue com mudanças (ajuste de perfil) e termina na saída (revogação). Registrar solicitações, aprovações e remoções facilita auditorias e a investigação de incidentes.',
        'Acessos privilegiados merecem controles adicionais: aprovação, uso temporário, gravação de sessões e monitoramento. Use cofres de senhas e elevação de privilégios sob demanda sempre que possível.'
      ],
      tips: ['Conceda acessos temporários quando possível.', 'Monitore e registre o uso de contas privilegiadas.', 'Documente concessões e remoções para auditoria.']
    },
    questions: [
      ['O que diz o princípio do privilégio mínimo?', ['Conceder só as permissões necessárias à função', 'Dar acesso total a todos', 'Compartilhar senhas'], 0],
      ['Qual problema há em contas compartilhadas?', ['Não é possível saber quem fez cada ação', 'Gastam mais energia', 'São mais seguras'], 0],
      ['O que fazer ao desligar um colaborador?', ['Revogar os acessos imediatamente', 'Manter por um mês', 'Entregar a senha ao gestor'], 0],
      ['Para que serve o RBAC?', ['Atribuir permissões por função', 'Acelerar a rede', 'Criptografar e-mails'], 0],
      ['Qual controle vale para contas privilegiadas?', ['Monitoramento e uso temporário', 'Senha curta', 'Sem registro'], 0]
    ]
  },
  'plano-resposta-incidentes': {
    category: 'Segurança no trabalho', difficulty: 'Difícil', icon: '🚨', title: 'Plano de Resposta a Incidentes',
    summary: 'Prepare equipe e processos para agir com calma quando algo grave acontece.',
    material: {
      title: 'Quem se prepara reage melhor',
      paragraphs: [
        'Um incidente de segurança é qualquer evento que compromete a confidencialidade, integridade ou disponibilidade de informações. Ninguém está imune, e a diferença entre um problema contornado e uma crise está no preparo: papéis claros, contatos atualizados e procedimentos testados.',
        'O ciclo de resposta tem fases: preparação, detecção e análise, contenção, erradicação, recuperação e lições aprendidas. Cada uma tem decisões a tomar, como isolar sistemas afetados, preservar evidências, comunicar a direção, clientes e autoridades, e restaurar serviços com segurança.',
        'O plano deve definir níveis de severidade, quem decide, quem comunica e como registrar cada ação. Em incidentes com dados pessoais, é preciso avaliar a comunicação à ANPD e aos titulares conforme a LGPD.'
      ],
      tips: ['Mantenha uma lista atualizada de contatos e responsáveis.', 'Defina níveis de severidade e critérios de escalonamento.', 'Preserve evidências e registre horários e ações.', 'Faça simulações (exercícios de mesa) pelo menos uma vez por ano.']
    },
    video: {
      title: 'Comunicação e aprendizado',
      paragraphs: [
        'Durante o incidente, a comunicação deve ser centralizada e clara: quem fala com a imprensa, com clientes e com o regulador. Evite informações especulativas e use um canal alternativo caso os sistemas habituais estejam comprometidos.',
        'Após o encerramento, faça uma revisão sem culpados: o que aconteceu, como foi detectado, o que funcionou, o que falhou e quais ações de melhoria serão adotadas, com responsáveis e prazos.'
      ],
      tips: ['Tenha um canal de comunicação alternativo.', 'Faça revisão pós-incidente sem buscar culpados.', 'Transforme as lições aprendidas em ações com dono e prazo.']
    },
    questions: [
      ['Qual é a primeira fase do ciclo de resposta?', ['Preparação', 'Recuperação', 'Lições aprendidas'], 0],
      ['O que a contenção busca?', ['Limitar a propagação e o impacto do incidente', 'Apagar todas as evidências', 'Desligar a empresa'], 0],
      ['Por que preservar evidências?', ['Para investigar a causa e dar suporte a ações legais', 'Para reduzir espaço em disco', 'Para ocultar o incidente'], 0],
      ['Qual é o objetivo da revisão pós-incidente?', ['Aprender e melhorar, sem buscar culpados', 'Punir o responsável', 'Esquecer o ocorrido'], 0],
      ['Em incidentes com dados pessoais, é preciso avaliar:', ['A comunicação à ANPD e aos titulares', 'Apenas a aparência do site', 'A troca do logotipo'], 0]
    ]
  },
  'continuidade-negocios': {
    category: 'Segurança no trabalho', difficulty: 'Médio', icon: '🔁', title: 'Continuidade de Negócios e Recuperação de Desastres',
    summary: 'Como manter a operação funcionando quando algo importante deixa de funcionar.',
    material: {
      title: 'Continuar operando apesar das falhas',
      paragraphs: [
        'A continuidade de negócios (BCP) é o conjunto de planos para manter funções críticas em operação durante e após interrupções, como ataque, falha de energia, incêndio ou indisponibilidade de fornecedor. A recuperação de desastres (DRP) cuida da parte técnica de restaurar sistemas e dados.',
        'O ponto de partida é a análise de impacto no negócio (BIA): identificar processos críticos, quanto tempo a empresa suporta ficar sem eles (RTO) e quanta perda de dados é aceitável (RPO). Esses números orientam investimentos em backup, redundância e sites alternativos.',
        'Um plano só vale se for testado. Exercícios de restauração e de mesa revelam falhas de documentação, contatos desatualizados e dependências esquecidas antes que um desastre real aconteça.'
      ],
      tips: ['Mapeie processos críticos e seus responsáveis.', 'Defina RTO e RPO para cada sistema importante.', 'Teste restauração de backups e planos de contingência.', 'Mantenha documentação acessível mesmo sem a rede da empresa.']
    },
    video: {
      title: 'Dependências e comunicação',
      paragraphs: [
        'Verifique dependências: provedores de nuvem, energia, internet, fornecedores e pessoas-chave. Tenha alternativas para cada ponto único de falha e contratos com acordos de nível de serviço claros.',
        'Defina como a equipe será acionada, como os clientes serão informados e quais serviços serão restabelecidos primeiro. A ordem de recuperação deve refletir o impacto no negócio.'
      ],
      tips: ['Identifique pontos únicos de falha.', 'Tenha plano de comunicação para clientes e equipe.', 'Priorize a restauração pelo impacto no negócio.']
    },
    questions: [
      ['O que o RTO representa?', ['Tempo máximo tolerável para restaurar um serviço', 'Quantidade de dados que podem ser perdidos', 'Número de usuários'], 0],
      ['O que o RPO representa?', ['Perda máxima de dados aceitável', 'Tempo de restauração', 'Custo do backup'], 0],
      ['Qual é o objetivo da BIA?', ['Identificar processos críticos e impactos', 'Escolher o papel de parede', 'Aprovar férias'], 0],
      ['Por que testar o plano de continuidade?', ['Revelar falhas antes de um desastre real', 'Cumprir tabela', 'Substituir o backup'], 0],
      ['O que fazer com pontos únicos de falha?', ['Criar alternativas ou redundância', 'Ignorar', 'Torná-los secretos'], 0]
    ]
  },
  'terceiros-fornecedores': {
    category: 'Segurança no trabalho', difficulty: 'Médio', icon: '🤝', title: 'Segurança com Terceiros e Fornecedores',
    summary: 'A segurança da sua empresa depende também da dos parceiros que acessam seus dados.',
    material: {
      title: 'O elo mais fraco pode estar fora de casa',
      paragraphs: [
        'Fornecedores, prestadores e parceiros costumam ter acesso a sistemas, dados ou redes da empresa. Se um deles for invadido, o atacante pode chegar até você. Esse tipo de ataque é chamado de ataque à cadeia de suprimentos.',
        'Antes de contratar, avalie a maturidade em segurança do fornecedor: certificações, políticas, histórico de incidentes e como ele protege dados. Quanto mais crítico o serviço ou mais sensíveis os dados, mais profunda deve ser a avaliação.',
        'O contrato deve prever requisitos de segurança, prazo para notificar incidentes, direito de auditoria, cuidados com dados pessoais conforme a LGPD e a devolução ou eliminação dos dados ao término.'
      ],
      tips: ['Classifique fornecedores por criticidade e dados acessados.', 'Inclua cláusulas de segurança, notificação e auditoria nos contratos.', 'Conceda acessos mínimos e temporários a terceiros.', 'Revise periodicamente a conformidade dos fornecedores.']
    },
    video: {
      title: 'Monitorando a relação ao longo do tempo',
      paragraphs: [
        'A avaliação não termina na contratação. Revise acessos regularmente, monitore o uso das contas de terceiros e mantenha atualizado o inventário de quem tem acesso a quê.',
        'No encerramento, revogue acessos, recupere equipamentos e exija a eliminação segura dos dados, com declaração formal. Esquecer essa etapa deixa portas abertas por anos.'
      ],
      tips: ['Mantenha um inventário de fornecedores e acessos.', 'Monitore atividade de contas de terceiros.', 'Exija comprovação de exclusão de dados ao final do contrato.']
    },
    questions: [
      ['O que é um ataque à cadeia de suprimentos?', ['Invadir a empresa por meio de um fornecedor ou software de terceiros', 'Um ataque a entregas físicas apenas', 'Um tipo de backup'], 0],
      ['O que avaliar antes de contratar?', ['A maturidade em segurança do fornecedor', 'A cor do site', 'O tamanho da equipe'], 0],
      ['Qual cláusula é importante no contrato?', ['Prazo para notificar incidentes', 'Isenção total de responsabilidade', 'Silêncio sobre dados'], 0],
      ['Que tipo de acesso dar a terceiros?', ['Mínimo e temporário', 'Total e permanente', 'Sem registro'], 0],
      ['O que fazer no encerramento do contrato?', ['Revogar acessos e exigir eliminação dos dados', 'Manter acessos', 'Esquecer o fornecedor'], 0]
    ]
  },
  'cultura-conscientizacao': {
    category: 'Segurança no trabalho', difficulty: 'Fácil', icon: '🌱', title: 'Cultura de Segurança e Conscientização',
    summary: 'Como transformar segurança em hábito coletivo, sem medo e sem culpa.',
    material: {
      title: 'Pessoas são parte da solução',
      paragraphs: [
        'A tecnologia sozinha não basta: muitos incidentes começam com um clique, uma senha fraca ou um pedido atendido sem verificar. Uma cultura de segurança faz com que as pessoas entendam os riscos, saibam o que fazer e se sintam seguras para pedir ajuda.',
        'Conscientização eficaz é frequente, curta, prática e adaptada ao público. Exemplos reais, simulações de phishing e microtreinamentos funcionam melhor do que um curso anual longo e genérico.',
        'Cultura se constrói com exemplo da liderança e com ambiente sem punição para quem relata erros. Se as pessoas têm medo de errar, escondem o problema, e o incidente cresce.'
      ],
      tips: ['Faça treinamentos curtos e frequentes.', 'Use exemplos reais e simulações com feedback educativo.', 'Incentive relatos sem punição.', 'A liderança deve seguir as mesmas regras.']
    },
    video: {
      title: 'Medindo e melhorando',
      paragraphs: [
        'Acompanhe indicadores como taxa de relatos de e-mails suspeitos, tempo para reportar incidentes e resultados das simulações. O mais importante é a evolução ao longo do tempo, não a pontuação isolada.',
        'Reconheça comportamentos positivos: agradecer quem relatou um e-mail suspeito reforça o hábito e mostra que o relato é valorizado.'
      ],
      tips: ['Comemore e agradeça relatos de suspeitas.', 'Acompanhe a evolução, não só a nota.', 'Adapte o conteúdo ao dia a dia de cada área.']
    },
    questions: [
      ['Por que a conscientização é importante?', ['Muitos incidentes começam por falhas humanas', 'Substitui todas as ferramentas', 'Só serve para a TI'], 0],
      ['Qual formato costuma funcionar melhor?', ['Treinamentos curtos, frequentes e práticos', 'Um curso anual longo', 'Apenas e-mails longos'], 0],
      ['Qual postura reduz a ocultação de erros?', ['Ambiente sem punição para quem relata', 'Punir quem errar', 'Ignorar relatos'], 0],
      ['O que a liderança deve fazer?', ['Dar o exemplo seguindo as regras', 'Estar isenta das regras', 'Delegar tudo à TI'], 0],
      ['O que reforça o hábito de relatar?', ['Agradecer e reconhecer quem relata', 'Ignorar', 'Criticar em público'], 0]
    ]
  },
  'carreira-ciberseguranca': {
    category: 'Segurança no trabalho', difficulty: 'Fácil', icon: '🧑‍💻', title: 'Carreira em Cibersegurança',
    summary: 'Áreas, habilidades e caminhos para quem quer trabalhar com segurança da informação.',
    material: {
      title: 'Um campo amplo e em crescimento',
      paragraphs: [
        'A cibersegurança reúne muitas áreas: defesa e monitoramento (SOC), resposta a incidentes, testes de invasão autorizados (red team), desenvolvimento seguro, governança, riscos e conformidade, perícia forense, arquitetura e conscientização. Há espaço para perfis técnicos e não técnicos.',
        'Uma base sólida em redes, sistemas operacionais, programação e noções de criptografia ajuda em quase todas as áreas. Habilidades comportamentais também contam: comunicação clara, ética, curiosidade e trabalho em equipe.',
        'O caminho costuma combinar estudo contínuo, prática em laboratórios, projetos pessoais, participação em comunidades e eventos e, quando fizer sentido, certificações reconhecidas do mercado.'
      ],
      tips: ['Domine fundamentos de redes, sistemas e programação.', 'Pratique em laboratórios legais e ambientes de treino autorizados.', 'Participe de comunidades, eventos e competições do tipo CTF.', 'Documente projetos e estudos para mostrar no portfólio.']
    },
    video: {
      title: 'Ética e primeiros passos',
      paragraphs: [
        'A ética é central: testar sistemas só com autorização formal, respeitar a privacidade e comunicar vulnerabilidades de forma responsável. Práticas sem permissão podem ser crime.',
        'Para começar, escolha uma área, monte um laboratório em máquinas virtuais, resolva desafios guiados e acompanhe fontes confiáveis de notícias e boletins de segurança. Mostre o que aprendeu, mesmo em projetos pequenos.'
      ],
      tips: ['Teste apenas sistemas que você tem autorização para testar.', 'Monte um laboratório com máquinas virtuais.', 'Acompanhe fontes confiáveis e atualize-se continuamente.']
    },
    questions: [
      ['O que significa SOC?', ['Centro de operações de segurança', 'Um tipo de senha', 'Um protocolo de e-mail'], 0],
      ['Qual base ajuda em quase todas as áreas?', ['Redes, sistemas e programação', 'Apenas edição de vídeo', 'Somente planilhas'], 0],
      ['Quando é aceitável testar a segurança de um sistema?', ['Com autorização formal', 'Sempre que quiser', 'Se o sistema for de um desconhecido'], 0],
      ['O que são competições CTF?', ['Desafios práticos de segurança', 'Corridas de dados', 'Concursos de design'], 0],
      ['Além do conhecimento técnico, o que é valorizado?', ['Comunicação, ética e trabalho em equipe', 'Apenas velocidade de digitação', 'Segredo absoluto'], 0]
    ]
  }
});
