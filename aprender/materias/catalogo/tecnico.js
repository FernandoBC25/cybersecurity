// Catálogo: Técnico e defesa (10 cursos). Sempre com enfoque defensivo.
Object.assign((window.novosCursos = window.novosCursos || {}), {
  'ransomware-prevencao-resposta': {
    category: 'Técnico e defesa', difficulty: 'Médio', icon: '🔒', title: 'Ransomware: Prevenção e Resposta',
    summary: 'Como o ransomware chega, o que ele faz e como se preparar para não depender de resgate.',
    material: {
      title: 'Sequestro de dados',
      paragraphs: [
        'Ransomware é um malware que criptografa arquivos e sistemas e exige pagamento para devolver o acesso. Muitos grupos também roubam os dados antes e ameaçam divulgá-los, a chamada dupla extorsão. A porta de entrada costuma ser phishing, credenciais vazadas, acesso remoto exposto e falhas sem correção.',
        'A prevenção combina várias camadas: atualizações em dia, MFA, privilégios mínimos, segmentação de rede, proteção de e-mail, antivírus e EDR e, principalmente, backups testados e isolados que o atacante não consegue alterar.',
        'Pagar o resgate não garante a devolução dos dados, financia novos ataques e pode ter implicações legais. A decisão deve envolver direção, jurídico, especialistas e autoridades, mas o melhor cenário é não precisar decidir, por ter backups e plano de resposta.'
      ],
      tips: ['Mantenha backups offline ou imutáveis e teste a restauração.', 'Desabilite acessos remotos desnecessários e use MFA.', 'Aplique correções rapidamente, em especial em sistemas expostos à internet.', 'Segmente a rede para limitar a propagação.']
    },
    video: {
      title: 'O que fazer ao ser atingido',
      paragraphs: [
        'Ao suspeitar de ransomware, isole imediatamente os equipamentos afetados da rede (desconecte cabos e Wi-Fi), mas evite desligá-los se for necessário preservar evidências na memória. Acione a equipe de resposta e a direção.',
        'Identifique o escopo, preserve logs, comunique as partes interessadas e restaure a partir de backups limpos, depois de eliminar a causa. Avalie também as obrigações de comunicação à ANPD e aos titulares.'
      ],
      tips: ['Isole os equipamentos da rede antes de qualquer outra ação.', 'Preserve logs e evidências para a investigação.', 'Restaure somente depois de eliminar a causa da invasão.']
    },
    questions: [
      ['O que o ransomware faz?', ['Criptografa dados e exige resgate', 'Apenas apaga o histórico', 'Acelera o computador'], 0],
      ['O que é dupla extorsão?', ['Roubar os dados e também criptografá-los, ameaçando divulgar', 'Cobrar duas vezes pelo mesmo serviço', 'Usar dois vírus em dias diferentes'], 0],
      ['Qual a principal defesa para não depender de resgate?', ['Backups testados e isolados', 'Pagar sempre', 'Desligar o antivírus'], 0],
      ['Qual a primeira ação ao suspeitar de ransomware?', ['Isolar os equipamentos afetados da rede', 'Continuar trabalhando', 'Enviar arquivos a colegas'], 0],
      ['Pagar o resgate garante a devolução dos dados?', ['Sim', 'Não, e ainda financia novos ataques', 'Sim, em 24 horas'], 1]
    ]
  },
  'owasp-aplicacoes-web': {
    category: 'Técnico e defesa', difficulty: 'Difícil', icon: '🕸️', title: 'OWASP Top 10: Riscos em Aplicações Web',
    summary: 'Os principais riscos de aplicações web e como preveni-los no desenvolvimento.',
    material: {
      title: 'As falhas mais comuns da web',
      paragraphs: [
        'O OWASP Top 10 é uma lista, mantida por uma comunidade aberta, com as categorias de risco mais críticas em aplicações web. Ela inclui controle de acesso quebrado, falhas criptográficas, injeção (como SQL injection), design inseguro, configuração incorreta de segurança e componentes vulneráveis ou desatualizados, entre outras.',
        'Controle de acesso quebrado ocorre quando o sistema não verifica corretamente o que cada usuário pode fazer, permitindo ver ou alterar dados de outros. Injeção ocorre quando dados fornecidos pelo usuário são interpretados como comandos, o que exige validação e consultas parametrizadas.',
        'Prevenção é uma combinação de boas práticas: validar entradas, codificar saídas, usar consultas parametrizadas, aplicar o princípio do privilégio mínimo, proteger sessões, manter dependências atualizadas e revisar o código com foco em segurança.'
      ],
      tips: ['Use consultas parametrizadas em vez de montar SQL com texto.', 'Verifique permissões no servidor a cada requisição.', 'Mantenha frameworks e bibliotecas atualizados.', 'Não exponha mensagens de erro detalhadas ao usuário final.']
    },
    video: {
      title: 'Segurança durante o desenvolvimento',
      paragraphs: [
        'Incorpore segurança ao ciclo de desenvolvimento: requisitos de segurança, revisão de código, análise estática (SAST), testes dinâmicos (DAST) e análise de dependências (SCA). Quanto mais cedo uma falha é encontrada, mais barata é a correção.',
        'Testes de segurança devem ser feitos apenas em ambientes e sistemas autorizados. Use ambientes de treino criados para esse fim para praticar com segurança e legalidade.'
      ],
      tips: ['Automatize análises de código e dependências no pipeline.', 'Pratique somente em ambientes de laboratório e autorizados.', 'Registre e priorize vulnerabilidades por impacto.']
    },
    questions: [
      ['O que é o OWASP Top 10?', ['Uma lista dos principais riscos de aplicações web', 'Um antivírus', 'Uma linguagem de programação'], 0],
      ['Como prevenir injeção de SQL?', ['Usando consultas parametrizadas', 'Concatenando texto do usuário', 'Desativando o banco'], 0],
      ['O que é controle de acesso quebrado?', ['Falha em verificar o que cada usuário pode fazer', 'Um erro de rede', 'Uma senha esquecida'], 0],
      ['Qual prática ajuda a lidar com componentes vulneráveis?', ['Manter dependências atualizadas e analisá-las', 'Nunca atualizar', 'Copiar código de qualquer lugar'], 0],
      ['Onde fazer testes de segurança?', ['Em sistemas autorizados ou laboratórios', 'Em qualquer site na internet', 'No site de um concorrente'], 0]
    ]
  },
  'desenvolvimento-seguro': {
    category: 'Técnico e defesa', difficulty: 'Difícil', icon: '🧱', title: 'Desenvolvimento Seguro de Software',
    summary: 'Como integrar segurança ao ciclo de vida do software, do requisito ao deploy.',
    material: {
      title: 'Segurança desde o início',
      paragraphs: [
        'Desenvolvimento seguro (SSDLC) significa tratar segurança como requisito em todas as fases: levantamento, projeto, codificação, testes, implantação e manutenção. Corrigir uma falha depois da entrega custa muito mais do que evitá-la no projeto.',
        'Na modelagem de ameaças, a equipe identifica o que precisa ser protegido, quem pode atacar e por onde. Frameworks como STRIDE ajudam a pensar em falsificação, adulteração, repúdio, vazamento, negação de serviço e elevação de privilégios.',
        'Na codificação, use padrões seguros: validação de entradas, tratamento correto de erros, gerenciamento adequado de segredos (nunca no código), criptografia com bibliotecas consolidadas, registro de eventos relevantes e revisão de código por pares.'
      ],
      tips: ['Faça modelagem de ameaças nas decisões de arquitetura.', 'Nunca coloque senhas, chaves e tokens no repositório de código.', 'Use bibliotecas criptográficas consolidadas, sem criar algoritmos próprios.', 'Faça revisão de código e inclua checagens de segurança.']
    },
    video: {
      title: 'Pipeline e cadeia de suprimentos',
      paragraphs: [
        'Automatize verificações no pipeline de CI/CD: varredura de segredos, SAST, análise de dependências, testes automatizados e, para contêineres, análise de imagens. Falhas críticas devem bloquear a implantação.',
        'Cuide da cadeia de suprimentos de software: fixe versões de dependências, verifique origem e integridade, mantenha um inventário (SBOM) e tenha um processo para corrigir rapidamente componentes vulneráveis.'
      ],
      tips: ['Escaneie o repositório em busca de segredos expostos.', 'Mantenha um SBOM atualizado das dependências.', 'Bloqueie implantações com falhas críticas.']
    },
    questions: [
      ['Por que tratar segurança desde o início?', ['Corrigir depois custa muito mais', 'Para aumentar o código', 'Para reduzir equipes'], 0],
      ['O que é modelagem de ameaças?', ['Identificar o que proteger, quem ataca e por onde', 'Desenhar telas', 'Medir desempenho'], 0],
      ['Onde guardar segredos como chaves e senhas?', ['Em cofres de segredos, nunca no código', 'No repositório público', 'Em comentários'], 0],
      ['O que é um SBOM?', ['Inventário dos componentes de um software', 'Um tipo de firewall', 'Um relatório de vendas'], 0],
      ['O que o pipeline seguro pode fazer?', ['Verificar segredos, dependências e bloquear falhas críticas', 'Apagar logs', 'Ignorar testes'], 0]
    ]
  },
  'seguranca-apis': {
    category: 'Técnico e defesa', difficulty: 'Difícil', icon: '🔌', title: 'Segurança de APIs',
    summary: 'Autenticação, autorização e limites para APIs que expõem dados e funções.',
    material: {
      title: 'APIs são a nova superfície de ataque',
      paragraphs: [
        'APIs permitem que aplicativos, sites e sistemas conversem entre si, e por isso concentram dados e funções valiosas. Uma API mal protegida pode expor informações de milhares de usuários sem que o site visível mostre qualquer problema.',
        'Os riscos mais comuns incluem autenticação fraca, autorização quebrada em nível de objeto (acessar dados de outro usuário alterando um identificador), exposição excessiva de dados, falta de limites de uso e configurações inseguras.',
        'Boas práticas: usar protocolos de autenticação consolidados (OAuth 2.0, OpenID Connect), validar o escopo e a identidade em cada requisição, retornar só os campos necessários, aplicar limites de requisições e usar sempre HTTPS.'
      ],
      tips: ['Valide autorização a cada requisição, para cada objeto acessado.', 'Retorne apenas os dados necessários, nunca o objeto completo.', 'Aplique limites de taxa (rate limiting) e cotas.', 'Mantenha inventário e versionamento das APIs, desativando as antigas.']
    },
    video: {
      title: 'Observabilidade e gestão de ciclo de vida',
      paragraphs: [
        'Registre acessos, erros e padrões anormais, como muitas chamadas com identificadores sequenciais. Esses sinais ajudam a detectar abuso e tentativas de enumeração de dados.',
        'APIs esquecidas ("shadow APIs") e versões antigas sem manutenção são alvos fáceis. Mantenha um catálogo atualizado, aposente versões antigas e use um gateway para centralizar autenticação, limites e monitoramento.'
      ],
      tips: ['Use um API gateway para controles centralizados.', 'Monitore padrões anormais de uso.', 'Descomissione versões antigas e APIs sem dono.']
    },
    questions: [
      ['O que é autorização quebrada em nível de objeto?', ['Acessar dados de outro usuário alterando um identificador', 'Uma senha fraca', 'Um erro de rede'], 0],
      ['Qual prática reduz a exposição excessiva de dados?', ['Retornar apenas os campos necessários', 'Retornar o objeto completo sempre', 'Desativar o HTTPS'], 0],
      ['Para que serve o limite de requisições?', ['Reduzir abuso e tentativas em massa', 'Aumentar a velocidade', 'Esconder erros'], 0],
      ['O que são shadow APIs?', ['APIs não documentadas ou esquecidas', 'APIs muito rápidas', 'APIs de design'], 0],
      ['O que o API gateway pode fazer?', ['Centralizar autenticação, limites e monitoramento', 'Substituir o banco de dados', 'Criar senhas'], 0]
    ]
  },
  'gestao-vulnerabilidades': {
    category: 'Técnico e defesa', difficulty: 'Médio', icon: '🩹', title: 'Gestão de Vulnerabilidades',
    summary: 'Como descobrir, priorizar e corrigir falhas antes que sejam exploradas.',
    material: {
      title: 'Encontrar, priorizar, corrigir',
      paragraphs: [
        'Vulnerabilidade é uma fraqueza em software, configuração ou processo que pode ser explorada para causar dano. A gestão de vulnerabilidades é um ciclo contínuo: inventariar ativos, varrer e identificar falhas, avaliar o risco, corrigir ou mitigar e verificar se a correção funcionou.',
        'Nem toda falha tem a mesma urgência. A pontuação CVSS indica a severidade técnica, mas a prioridade deve considerar também se há exploração conhecida (listas como a do CISA KEV), se o sistema está exposto à internet e qual o valor do ativo para o negócio.',
        'Sem inventário não há gestão: não se corrige o que não se conhece. Mantenha uma lista atualizada de equipamentos, sistemas, versões e responsáveis, incluindo itens de TI não oficial (shadow IT).'
      ],
      tips: ['Mantenha o inventário de ativos atualizado.', 'Priorize por exploração conhecida, exposição e criticidade, não só pelo CVSS.', 'Defina prazos de correção por severidade.', 'Verifique se a correção foi aplicada com uma nova varredura.']
    },
    video: {
      title: 'Processo e métricas',
      paragraphs: [
        'Defina responsáveis por cada sistema e prazos (SLAs) para correção. Quando não for possível corrigir de imediato, aplique mitigações, como isolar o sistema, restringir acessos ou desativar o recurso afetado, e registre a exceção com prazo.',
        'Acompanhe métricas como tempo médio de correção, vulnerabilidades críticas abertas e cobertura das varreduras. Elas mostram se o processo funciona e onde falta apoio.'
      ],
      tips: ['Registre exceções com justificativa e prazo.', 'Use mitigações temporárias quando a correção demorar.', 'Acompanhe o tempo médio de correção.']
    },
    questions: [
      ['O que é uma vulnerabilidade?', ['Uma fraqueza que pode ser explorada', 'Um backup', 'Um tipo de senha'], 0],
      ['Qual é o primeiro passo da gestão de vulnerabilidades?', ['Conhecer e inventariar os ativos', 'Aplicar patches sem planejamento', 'Desligar servidores'], 0],
      ['Além do CVSS, o que considerar na prioridade?', ['Exploração conhecida, exposição e criticidade do ativo', 'A cor do relatório', 'O tamanho da equipe'], 0],
      ['O que fazer quando a correção não pode ser aplicada logo?', ['Aplicar mitigações e registrar a exceção', 'Ignorar', 'Esconder o problema'], 0],
      ['Como confirmar que a correção funcionou?', ['Com nova varredura ou teste', 'Presumindo que sim', 'Desativando o scanner'], 0]
    ]
  },
  'logs-monitoramento-siem': {
    category: 'Técnico e defesa', difficulty: 'Difícil', icon: '📡', title: 'Logs, Monitoramento e SIEM',
    summary: 'Como registrar eventos úteis e transformá-los em detecção de ameaças.',
    material: {
      title: 'Sem registro, não há investigação',
      paragraphs: [
        'Logs são registros de eventos de sistemas, aplicações e redes: logins, erros, mudanças de configuração, acessos a arquivos. Eles permitem detectar ataques, investigar incidentes e comprovar o que aconteceu, inclusive para fins de auditoria.',
        'Um SIEM (Security Information and Event Management) coleta logs de várias fontes, normaliza, correlaciona e gera alertas. Por exemplo, diversas falhas de login seguidas de um sucesso em outro país podem indicar uma conta comprometida.',
        'Qualidade importa mais do que quantidade. Registre eventos relevantes, sincronize os relógios dos sistemas, proteja os logs contra alteração, defina prazos de retenção e evite registrar dados sensíveis, como senhas e números completos de cartão.'
      ],
      tips: ['Sincronize os horários (NTP) em todos os sistemas.', 'Centralize logs e proteja-os contra alteração e exclusão.', 'Nunca registre senhas, tokens ou dados de cartão.', 'Defina retenção conforme requisitos legais e de negócio.']
    },
    video: {
      title: 'Detecção na prática',
      paragraphs: [
        'Regras de detecção devem refletir os riscos do negócio: logins fora do padrão, criação de contas privilegiadas, desativação de proteções, grande volume de dados saindo da rede. Ajuste regras para reduzir falsos positivos, para que a equipe não ignore alertas por cansaço.',
        'Associe alertas a procedimentos de resposta: quem analisa, como classifica, quando escala. Referências como o MITRE ATT&CK ajudam a organizar a cobertura de técnicas de ataque conhecidas.'
      ],
      tips: ['Documente o que fazer em cada tipo de alerta.', 'Revise regras para reduzir falsos positivos.', 'Use o MITRE ATT&CK para mapear lacunas de detecção.']
    },
    questions: [
      ['Para que servem os logs?', ['Detectar, investigar e comprovar eventos', 'Acelerar o sistema', 'Substituir o backup'], 0],
      ['O que faz um SIEM?', ['Coleta, correlaciona e alerta sobre eventos de várias fontes', 'Cria senhas', 'Atualiza o navegador'], 0],
      ['Por que sincronizar os relógios dos sistemas?', ['Para correlacionar eventos na ordem correta', 'Para economizar energia', 'Para trocar o fuso'], 0],
      ['O que nunca deve ser registrado em logs?', ['Senhas, tokens e dados de cartão', 'Horário do evento', 'Tipo do evento'], 0],
      ['Qual é o risco de muitos falsos positivos?', ['A equipe passar a ignorar alertas', 'Aumentar a bateria', 'Reduzir os backups'], 0]
    ]
  },
  'containers-devops': {
    category: 'Técnico e defesa', difficulty: 'Difícil', icon: '📦', title: 'Segurança em Contêineres e DevOps',
    summary: 'Como proteger imagens, orquestradores e pipelines em ambientes modernos.',
    material: {
      title: 'Velocidade com controle',
      paragraphs: [
        'Contêineres empacotam aplicações com suas dependências e permitem implantações rápidas e repetíveis. Essa velocidade exige controles automáticos: uma imagem vulnerável pode ser replicada em centenas de servidores em minutos.',
        'Boas práticas incluem usar imagens base mínimas e de fontes confiáveis, escanear imagens em busca de vulnerabilidades, não executar processos como root, remover ferramentas desnecessárias e fixar versões em vez de usar a tag "latest".',
        'No orquestrador (como o Kubernetes), aplique controle de acesso por funções (RBAC), políticas de rede para limitar a comunicação entre serviços, gerencie segredos em cofres próprios e restrinja o acesso à API do cluster.'
      ],
      tips: ['Use imagens mínimas e fixe versões das dependências.', 'Não execute contêineres como root.', 'Escaneie imagens no pipeline antes da implantação.', 'Guarde segredos em cofre, não em variáveis expostas ou na imagem.']
    },
    video: {
      title: 'Infraestrutura como código e pipelines',
      paragraphs: [
        'A infraestrutura como código (IaC) permite revisar e auditar mudanças. Analise arquivos de configuração em busca de más práticas, como portas abertas para o mundo e armazenamento público, antes que cheguem à produção.',
        'Proteja o pipeline: ele tem acesso poderoso a ambientes e segredos. Use credenciais de curta duração, permissões mínimas, revisão obrigatória de alterações e logs de auditoria.'
      ],
      tips: ['Analise arquivos de IaC automaticamente.', 'Dê ao pipeline apenas as permissões necessárias.', 'Prefira credenciais temporárias a chaves permanentes.']
    },
    questions: [
      ['Por que escanear imagens de contêineres?', ['Para achar vulnerabilidades antes da implantação', 'Para reduzir o tamanho do código', 'Para trocar o sistema'], 0],
      ['Qual prática reduz o risco ao executar contêineres?', ['Evitar executar como root', 'Executar sempre como root', 'Compartilhar o host'], 0],
      ['Para que serve o RBAC em orquestradores?', ['Limitar permissões por função', 'Acelerar a rede', 'Criar backups'], 0],
      ['Onde guardar segredos de aplicações?', ['Em cofres de segredos', 'Dentro da imagem', 'No repositório público'], 0],
      ['Por que proteger o pipeline de CI/CD?', ['Ele tem acesso a ambientes e segredos poderosos', 'Ele só roda testes', 'Ele não tem acesso a nada'], 0]
    ]
  },
  'zero-trust': {
    category: 'Técnico e defesa', difficulty: 'Difícil', icon: '🛂', title: 'Zero Trust: Nunca Confie, Sempre Verifique',
    summary: 'O modelo de segurança que não confia em nada só por estar dentro da rede.',
    material: {
      title: 'O fim do perímetro confiável',
      paragraphs: [
        'No modelo tradicional, a rede interna era considerada confiável e o perímetro (firewall) era a barreira principal. Com trabalho remoto, nuvem e aplicativos SaaS, esse perímetro desapareceu. Zero Trust parte da ideia de que nenhum usuário, dispositivo ou rede é confiável por padrão.',
        'Seus princípios incluem verificar explicitamente (identidade, dispositivo, localização e contexto a cada acesso), usar privilégio mínimo e assumir que a violação pode ocorrer, reduzindo o impacto com segmentação e monitoramento contínuo.',
        'Na prática, isso significa MFA em todos os acessos, verificação da saúde do dispositivo, acesso por aplicativo em vez de acesso amplo à rede, microsegmentação e políticas adaptativas que reavaliam o risco durante a sessão.'
      ],
      tips: ['Exija MFA em todos os acessos.', 'Verifique a saúde e a conformidade do dispositivo antes de conceder acesso.', 'Segmente a rede e conceda acesso por aplicação, não pela rede inteira.', 'Monitore continuamente e reavalie o risco durante a sessão.']
    },
    video: {
      title: 'Adoção gradual',
      paragraphs: [
        'Zero Trust não é um produto, e sim uma estratégia. Comece mapeando ativos e fluxos de dados, depois proteja as identidades, em seguida os dispositivos e as aplicações mais críticas, e expanda gradualmente.',
        'Evite promessas de solução única. A adoção exige integração entre identidade, endpoint, rede, dados e monitoramento, além de mudança cultural e comunicação clara com os usuários.'
      ],
      tips: ['Comece pelas identidades e pelos ativos mais críticos.', 'Adote em etapas e meça os resultados.', 'Comunique os motivos e os benefícios para os usuários.']
    },
    questions: [
      ['Qual é a ideia central do Zero Trust?', ['Não confiar por padrão em nenhum usuário ou rede', 'Confiar em tudo dentro da rede', 'Eliminar senhas'], 0],
      ['O que "verificar explicitamente" significa?', ['Checar identidade, dispositivo e contexto a cada acesso', 'Verificar só uma vez por ano', 'Ignorar o dispositivo'], 0],
      ['O que é microsegmentação?', ['Dividir a rede em partes menores com regras específicas', 'Reduzir o tamanho dos arquivos', 'Uma senha curta'], 0],
      ['Zero Trust é:', ['Uma estratégia, não um produto único', 'Um antivírus', 'Uma marca de roteador'], 0],
      ['Por onde começar a adoção?', ['Por identidades e ativos críticos', 'Pela troca de todos os computadores', 'Pela remoção do MFA'], 0]
    ]
  },
  'email-spf-dkim-dmarc': {
    category: 'Técnico e defesa', difficulty: 'Difícil', icon: '✉️', title: 'Segurança de E-mail: SPF, DKIM e DMARC',
    summary: 'Como proteger seu domínio contra falsificação de remetente e melhorar a entrega.',
    material: {
      title: 'Provando quem é o remetente',
      paragraphs: [
        'O protocolo original de e-mail não verifica se o remetente é de fato quem diz ser, o que facilita phishing e fraudes que imitam seu domínio. Três padrões trabalham juntos para reduzir esse risco.',
        'O SPF lista os servidores autorizados a enviar e-mails em nome do seu domínio. O DKIM adiciona uma assinatura digital às mensagens, permitindo ao destinatário verificar que não foram alteradas e que vêm de quem controla a chave. O DMARC define o que fazer quando SPF e DKIM falham (nada, quarentena ou rejeição) e envia relatórios.',
        'A implantação deve ser gradual: publique os registros, comece com o DMARC em modo de monitoramento (p=none), analise os relatórios para identificar remetentes legítimos e só então avance para quarentena e rejeição.'
      ],
      tips: ['Mapeie todos os serviços que enviam e-mail em nome do domínio.', 'Comece o DMARC em monitoramento e avance gradualmente.', 'Analise os relatórios DMARC regularmente.', 'Proteja também domínios que não enviam e-mails, com política de rejeição.']
    },
    video: {
      title: 'Boas práticas complementares',
      paragraphs: [
        'Use também TLS no transporte de e-mails, proteção avançada contra phishing e malware nos servidores e avisos para mensagens de fora da organização. Ative MFA em todas as contas de e-mail e monitore regras de encaminhamento suspeitas.',
        'Registre domínios parecidos com o seu para evitar abuso e monitore o uso indevido da marca. Treine usuários para checar o domínio completo do remetente e relatar mensagens suspeitas.'
      ],
      tips: ['Ative MFA e monitore regras de encaminhamento.', 'Registre variações do domínio da marca quando possível.', 'Ofereça um botão simples para relatar e-mails suspeitos.']
    },
    questions: [
      ['Para que serve o SPF?', ['Listar servidores autorizados a enviar e-mail pelo domínio', 'Criptografar o disco', 'Gerar senhas'], 0],
      ['O que o DKIM adiciona às mensagens?', ['Uma assinatura digital', 'Um anexo', 'Uma cor de fundo'], 0],
      ['O que o DMARC define?', ['O que fazer quando SPF e DKIM falham', 'A senha do usuário', 'O tamanho da caixa'], 0],
      ['Como implantar o DMARC com segurança?', ['Começar em monitoramento e avançar gradualmente', 'Rejeitar tudo desde o primeiro dia', 'Não analisar relatórios'], 0],
      ['Qual proteção é importante nas contas de e-mail?', ['MFA e monitoramento de regras de encaminhamento', 'Senha curta', 'Compartilhar a conta'], 0]
    ]
  },
  'forense-digital-basica': {
    category: 'Técnico e defesa', difficulty: 'Difícil', icon: '🔍', title: 'Noções de Forense Digital',
    summary: 'Como preservar evidências digitais e investigar incidentes com método.',
    material: {
      title: 'Preservar para poder provar',
      paragraphs: [
        'A forense digital é a coleta, preservação e análise de evidências em dispositivos, redes e sistemas para entender o que aconteceu em um incidente e, quando necessário, dar suporte a processos legais. O método importa tanto quanto o conhecimento técnico.',
        'O princípio mais importante é preservar a integridade da evidência. Sempre que possível, trabalhe em uma cópia (imagem forense) e registre hashes criptográficos (como SHA-256) do original e da cópia para demonstrar que nada foi alterado.',
        'A cadeia de custódia documenta quem teve acesso à evidência, quando, onde e para quê. Qualquer lacuna pode comprometer a validade da prova. Anote data, hora, ações realizadas, ferramentas e responsáveis.'
      ],
      tips: ['Não altere o original: trabalhe em cópias verificadas por hash.', 'Registre tudo: horários, ações, ferramentas e responsáveis.', 'Mantenha a cadeia de custódia documentada.', 'Priorize dados voláteis, como memória e conexões, quando o equipamento estiver ligado.']
    },
    video: {
      title: 'Linha do tempo e comunicação',
      paragraphs: [
        'A análise costuma buscar uma linha do tempo dos eventos: logs de sistema, histórico de acessos, arquivos criados ou alterados e conexões de rede. Correlacionar fontes diferentes ajuda a entender a origem, o alcance e o impacto.',
        'Documente os resultados em relatório claro, com fatos, método, evidências e conclusões separados de opiniões. Em casos que envolvem possíveis crimes, envolva o jurídico e as autoridades antes de continuar a investigação por conta própria.'
      ],
      tips: ['Separe fatos de hipóteses no relatório.', 'Envolva o jurídico em casos com possíveis implicações legais.', 'Investigue somente com autorização formal.']
    },
    questions: [
      ['Qual é o princípio central da forense digital?', ['Preservar a integridade da evidência', 'Apagar logs antigos', 'Acelerar a análise a qualquer custo'], 0],
      ['Para que serve o hash de uma evidência?', ['Demonstrar que o conteúdo não foi alterado', 'Comprimir arquivos', 'Trocar a senha'], 0],
      ['O que é a cadeia de custódia?', ['O registro de quem teve acesso à evidência e quando', 'Uma lista de senhas', 'Um tipo de backup'], 0],
      ['Por que trabalhar em cópia?', ['Para não alterar o original', 'Para deixar mais bonito', 'Para gastar espaço'], 0],
      ['Qual é um cuidado em casos com possíveis crimes?', ['Envolver o jurídico e as autoridades', 'Investigar sem registro', 'Publicar os dados'], 0]
    ]
  }
});
