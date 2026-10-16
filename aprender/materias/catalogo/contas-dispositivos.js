// Catálogo: Contas e dispositivos (10 cursos). Formato igual ao de cursos-extras.js.
Object.assign((window.novosCursos = window.novosCursos || {}), {
  'gerenciadores-de-senhas': {
    category: 'Contas e dispositivos', difficulty: 'Fácil', icon: '🗝️', title: 'Gerenciadores de Senhas na Prática',
    summary: 'Como guardar dezenas de senhas fortes e únicas sem depender da memória.',
    material: {
      title: 'Por que usar um gerenciador de senhas',
      paragraphs: [
        'Ninguém consegue memorizar dezenas de senhas longas e diferentes. Por isso muita gente repete a mesma senha em vários serviços, e basta um vazamento para o atacante testar essa senha em todas as outras contas.',
        'Um gerenciador cria, guarda e preenche senhas fortes e exclusivas. Você só precisa lembrar de uma senha principal, que protege o cofre inteiro, e ela deve ser longa, como uma frase de várias palavras.',
        'O cofre fica criptografado: sem a senha principal, o conteúdo não pode ser lido, nem pelo fabricante. Escolha ferramentas conhecidas, com boa reputação e que recebam atualizações regulares.'
      ],
      tips: ['Crie a senha principal com uma frase longa e que você nunca use em outro lugar.', 'Ative a autenticação multifator no próprio gerenciador.', 'Deixe o gerenciador gerar senhas de 16 caracteres ou mais.', 'Troque primeiro as senhas das contas mais importantes: e-mail, banco e redes sociais.']
    },
    video: {
      title: 'Colocando o gerenciador para trabalhar',
      paragraphs: [
        'Comece instalando o aplicativo no celular e a extensão no navegador. Depois, a cada login, aceite salvar a senha e substitua as antigas por senhas geradas pelo programa.',
        'O preenchimento automático também ajuda contra phishing: se o site for falso, o gerenciador não reconhece o endereço e não preenche a senha, o que serve de alerta.'
      ],
      tips: ['Guarde uma cópia de recuperação do cofre em local seguro e offline.', 'Revise periodicamente o relatório de senhas fracas ou repetidas.', 'Não envie senhas por mensagem; use o compartilhamento seguro do gerenciador.']
    },
    questions: [
      ['Qual é o principal risco de repetir a mesma senha em vários serviços?', ['Um vazamento em um serviço expõe todas as outras contas', 'O navegador fica mais lento', 'As senhas expiram mais rápido'], 0],
      ['Como deve ser a senha principal do gerenciador?', ['Curta, para não esquecer', 'Longa, exclusiva e fácil de lembrar como uma frase', 'Igual à do e-mail'], 1],
      ['O que o gerenciador faz quando o site é falso?', ['Preenche a senha mesmo assim', 'Não reconhece o endereço e não preenche', 'Envia a senha ao site'], 1],
      ['O que fazer primeiro ao adotar um gerenciador?', ['Trocar as senhas das contas mais importantes', 'Apagar todas as contas antigas', 'Compartilhar o cofre com amigos'], 0],
      ['Qual proteção extra vale ativar no gerenciador?', ['Desativar o bloqueio automático', 'Autenticação multifator', 'Salvar a senha principal no navegador'], 1]
    ]
  },
  'autenticacao-multifator': {
    category: 'Contas e dispositivos', difficulty: 'Fácil', icon: '📲', title: 'Autenticação Multifator sem Mistério',
    summary: 'Entenda os tipos de segundo fator e escolha o mais seguro para cada conta.',
    material: {
      title: 'Uma senha só não basta',
      paragraphs: [
        'A autenticação multifator (MFA) exige duas ou mais provas de identidade: algo que você sabe (senha), algo que você tem (celular ou chave) e algo que você é (digital ou rosto). Mesmo que a senha vaze, o atacante ainda precisa do segundo fator.',
        'Nem todo segundo fator é igual. Códigos por SMS são melhores que nada, mas podem ser interceptados. Aplicativos autenticadores e chaves de segurança físicas oferecem proteção bem maior.',
        'Ative o MFA primeiro nas contas que dão acesso a outras: e-mail, gerenciador de senhas, banco e serviços de nuvem.'
      ],
      tips: ['Prefira aplicativo autenticador ou chave de segurança ao SMS.', 'Guarde os códigos de recuperação offline.', 'Nunca informe o código a ninguém, nem a quem diga ser do suporte.', 'Cadastre um segundo método para não perder o acesso se trocar de celular.']
    },
    video: {
      title: 'Ativando e usando o MFA',
      paragraphs: [
        'Nas configurações de segurança da conta, escolha a opção de verificação em duas etapas, leia o código QR com o aplicativo autenticador e confirme com o primeiro código gerado.',
        'Cuidado com o "cansaço de notificação": se chegarem pedidos de aprovação que você não iniciou, negue todos e troque a senha, pois alguém pode estar tentando entrar.'
      ],
      tips: ['Teste o acesso em outro dispositivo antes de depender do MFA.', 'Faça backup da configuração do autenticador, se o aplicativo permitir.', 'Negue qualquer aprovação que você não solicitou.']
    },
    questions: [
      ['O que o MFA acrescenta à senha?', ['Um segundo fator de verificação', 'Uma senha mais curta', 'Um aviso de expiração'], 0],
      ['Qual destes segundos fatores costuma ser mais seguro?', ['Código por SMS', 'Chave de segurança física', 'Pergunta sobre o nome do pet'], 1],
      ['Você recebe várias aprovações de login que não pediu. O que fazer?', ['Aprovar uma para parar as notificações', 'Negar todas e trocar a senha', 'Ignorar e esperar'], 1],
      ['Uma pessoa do "suporte" pede o código que chegou por SMS. O que fazer?', ['Informar, pois ela é do suporte', 'Não informar a ninguém', 'Informar só metade do código'], 1],
      ['Para que servem os códigos de recuperação?', ['Para acessar a conta se perder o segundo fator', 'Para compartilhar a conta', 'Para desativar a senha'], 0]
    ]
  },
  'passkeys-chaves-seguranca': {
    category: 'Contas e dispositivos', difficulty: 'Médio', icon: '🔑', title: 'Passkeys e Chaves de Segurança',
    summary: 'O futuro sem senha: como passkeys e chaves físicas resistem a phishing.',
    material: {
      title: 'Autenticação que não pode ser digitada',
      paragraphs: [
        'Uma passkey é uma credencial criptográfica guardada no seu dispositivo. Em vez de digitar uma senha, você confirma com biometria ou PIN, e o dispositivo prova sua identidade ao site sem enviar nenhum segredo reutilizável.',
        'Cada passkey está vinculada ao endereço do site verdadeiro. Por isso, mesmo que você seja levado a uma página falsa, o navegador não consegue usá-la ali: o phishing perde o efeito.',
        'Chaves de segurança físicas (padrão FIDO2) funcionam de forma parecida e são uma boa opção para contas de alto risco, pois a credencial nunca sai do dispositivo.'
      ],
      tips: ['Cadastre mais de uma chave ou dispositivo para ter reserva.', 'Mantenha a tela de bloqueio do celular com PIN ou biometria.', 'Mantenha um método de recuperação seguro para o caso de perda.', 'Use passkeys onde o serviço oferecer, começando pelo e-mail.']
    },
    video: {
      title: 'Passkeys no dia a dia',
      paragraphs: [
        'Ao criar uma passkey, o site pede para você confirmar com o desbloqueio do dispositivo. Nos logins seguintes basta repetir o gesto. Em muitos sistemas a passkey sincroniza com a sua conta de nuvem, facilitando o uso em vários aparelhos.',
        'Se perder o dispositivo, revogue as passkeys e as chaves no painel de segurança de cada serviço e use um método de recuperação previamente configurado.'
      ],
      tips: ['Guarde a chave física em local seguro, separada do computador.', 'Revise o painel de segurança para ver quais dispositivos têm acesso.', 'Não desative todos os outros métodos sem testar a recuperação.']
    },
    questions: [
      ['Por que passkeys resistem a phishing?', ['Elas só funcionam no site verdadeiro ao qual estão vinculadas', 'Elas são mais longas que senhas', 'Elas expiram em um minuto'], 0],
      ['O que é enviado ao site quando você usa uma passkey?', ['Sua senha em texto', 'Uma prova criptográfica, sem segredo reutilizável', 'Seu PIN'], 1],
      ['Qual cuidado vale ao adotar uma chave de segurança física?', ['Ter uma segunda chave de reserva', 'Usar a mesma chave em todas as casas', 'Deixá-la sempre conectada em computadores públicos'], 0],
      ['Se perder o dispositivo com a passkey, o que fazer?', ['Nada, ela some sozinha', 'Revogar a credencial nos serviços e usar a recuperação', 'Criar uma conta nova'], 1],
      ['Qual proteção continua importante no celular?', ['Bloqueio de tela com PIN ou biometria', 'Desativar atualizações', 'Compartilhar o PIN com a família'], 0]
    ]
  },
  'recuperacao-de-contas': {
    category: 'Contas e dispositivos', difficulty: 'Fácil', icon: '🛟', title: 'Recuperação de Contas e Códigos de Backup',
    summary: 'Prepare-se antes de perder o acesso e saiba reagir se alguém invadir sua conta.',
    material: {
      title: 'Planeje a recuperação antes do problema',
      paragraphs: [
        'Perder o acesso a uma conta pode acontecer por esquecimento, troca de celular ou invasão. Quem se prepara antes recupera tudo em minutos; quem não se prepara pode perder fotos, contatos e dinheiro.',
        'Mantenha e-mail e telefone de recuperação atualizados, e guarde os códigos de backup do MFA em local seguro. A conta de e-mail é a chave-mestra: quem a controla pode redefinir as demais senhas.',
        'Se desconfiar de invasão, aja rápido: troque a senha pelo canal oficial, encerre as sessões ativas, revise e-mails de recuperação e regras de encaminhamento e avise seus contatos.'
      ],
      tips: ['Teste a recuperação das contas importantes uma vez por ano.', 'Remova e-mails e telefones antigos das opções de recuperação.', 'Verifique se há regras de encaminhamento criadas sem você.', 'Avise contatos próximos se a conta enviou mensagens estranhas.']
    },
    video: {
      title: 'Passo a passo após uma invasão',
      paragraphs: [
        'Use sempre o site ou aplicativo oficial para recuperar o acesso, nunca links recebidos por mensagem. Se a recuperação for pedida por um "suporte" que entrou em contato primeiro, desconfie.',
        'Depois de recuperar, revise atividades recentes, dispositivos conectados e aplicativos autorizados. Troque a senha de qualquer outra conta que usasse a mesma senha.'
      ],
      tips: ['Guarde capturas de tela e datas para eventual denúncia.', 'Ative o MFA assim que recuperar o acesso.', 'Registre um boletim de ocorrência se houver prejuízo financeiro.']
    },
    questions: [
      ['Por que a conta de e-mail é tão importante?', ['Ela permite redefinir as senhas de outras contas', 'Ela guarda as fotos do celular', 'Ela é a única conta com senha'], 0],
      ['Onde guardar os códigos de backup do MFA?', ['Em um e-mail sem proteção', 'Em local seguro, de preferência offline', 'Em uma rede social'], 1],
      ['Após suspeitar de invasão, qual é um passo importante?', ['Encerrar as sessões ativas e trocar a senha pelo canal oficial', 'Esperar alguns dias', 'Enviar a senha antiga ao suporte'], 0],
      ['Como recuperar uma conta com segurança?', ['Pelo link enviado por um desconhecido', 'Pelo site ou aplicativo oficial', 'Pagando a quem oferece ajuda'], 1],
      ['O que verificar no e-mail após uma invasão?', ['Regras de encaminhamento criadas sem seu conhecimento', 'A cor do tema', 'O tamanho da caixa de entrada'], 0]
    ]
  },
  'vazamento-de-dados': {
    category: 'Contas e dispositivos', difficulty: 'Fácil', icon: '💧', title: 'O que Fazer Após um Vazamento de Dados',
    summary: 'Descubra se seus dados vazaram e quais ações reduzem o dano.',
    material: {
      title: 'Vazou. E agora?',
      paragraphs: [
        'Vazamentos de dados acontecem quando informações de clientes são expostas por falhas, erros ou ataques a empresas. Seus dados podem aparecer em listas usadas para golpes, mesmo que você nunca tenha sido atacado diretamente.',
        'O primeiro passo é descobrir o que foi exposto: e-mail, senha, CPF, endereço ou dados de cartão. Serviços de verificação de vazamentos confiáveis informam se o seu e-mail aparece em incidentes conhecidos.',
        'A resposta depende do dado. Senha vazada exige troca imediata (em todos os lugares em que foi usada). Dados de cartão pedem contato com o banco. Dados pessoais exigem atenção redobrada contra golpes direcionados.'
      ],
      tips: ['Troque a senha do serviço afetado e de qualquer conta que a repita.', 'Ative o MFA nas contas importantes.', 'Desconfie de contatos que citam dados seus corretos: podem usar o vazamento.', 'Acompanhe extratos e considere bloquear ou trocar o cartão.']
    },
    video: {
      title: 'Seus direitos e as medidas práticas',
      paragraphs: [
        'A LGPD obriga empresas a comunicar incidentes relevantes aos titulares e à autoridade competente. Guarde o aviso recebido e procure o canal do encarregado de dados da empresa para pedir informações.',
        'Em casos de golpe ou fraude, registre ocorrência e avise o banco. Quanto mais cedo a comunicação, maiores as chances de bloquear transações e limitar o prejuízo.'
      ],
      tips: ['Desconfie de e-mails sobre "vazamento" com links: confira no site oficial.', 'Monitore seu CPF e seus cadastros em serviços de proteção de crédito.', 'Evite reutilizar o mesmo e-mail em cadastros sem importância.']
    },
    questions: [
      ['O que fazer primeiro se sua senha vazou?', ['Trocá-la e também nas contas que a repetem', 'Aguardar notícias da empresa', 'Apagar o aplicativo'], 0],
      ['Por que dados vazados aumentam o risco de golpes?', ['Golpistas usam os dados para parecer legítimos', 'Eles aceleram o celular', 'Eles tornam as senhas mais fortes'], 0],
      ['Dados de cartão foram expostos. Qual a medida mais indicada?', ['Contatar o banco e trocar o cartão', 'Compartilhar o número com o suporte por mensagem', 'Ignorar'], 0],
      ['O que a LGPD exige em incidentes relevantes?', ['Que a empresa comunique os titulares', 'Que o usuário pague multa', 'Que os dados sejam publicados'], 0],
      ['Você recebe um e-mail alertando sobre vazamento, com um link. O que fazer?', ['Clicar para verificar', 'Acessar o site oficial por conta própria', 'Responder com sua senha'], 1]
    ]
  },
  'seguranca-no-celular': {
    category: 'Contas e dispositivos', difficulty: 'Fácil', icon: '📱', title: 'Segurança no Celular',
    summary: 'Proteja o aparelho que guarda sua vida: bloqueio, aplicativos e permissões.',
    material: {
      title: 'O celular como alvo',
      paragraphs: [
        'O celular concentra banco, e-mail, fotos e códigos de verificação. Se alguém tem acesso ao aparelho desbloqueado, tem acesso a quase tudo. A primeira defesa é um bloqueio de tela forte, com PIN de seis dígitos ou mais, ou biometria.',
        'Instale aplicativos apenas das lojas oficiais e confira o desenvolvedor, as avaliações e as permissões pedidas. Um aplicativo de lanterna que pede acesso a contatos e SMS é um sinal de alerta.',
        'Mantenha o sistema e os aplicativos atualizados e ative o recurso de localizar e apagar o aparelho remotamente, que ajuda em caso de perda ou roubo.'
      ],
      tips: ['Use PIN longo ou biometria e bloqueio automático curto.', 'Revise as permissões de cada aplicativo e revogue as desnecessárias.', 'Ative localizar dispositivo e apagar remotamente.', 'Desinstale aplicativos que você não usa mais.']
    },
    video: {
      title: 'Roubo, perda e comportamento suspeito',
      paragraphs: [
        'Se o aparelho for roubado, bloqueie a linha com a operadora, localize ou apague o aparelho remotamente, troque as senhas principais e avise o banco. Ter o IMEI anotado ajuda no bloqueio.',
        'Sinais de comprometimento incluem bateria acabando rápido, consumo estranho de dados e aplicativos desconhecidos. Nesses casos, atualize, remova o que não reconhece e, se preciso, restaure o aparelho.'
      ],
      tips: ['Anote o IMEI e guarde em local separado.', 'Desative a pré-visualização de mensagens na tela bloqueada.', 'Evite instalar aplicativos por arquivos (APK) enviados por terceiros.']
    },
    questions: [
      ['Qual bloqueio de tela é mais indicado?', ['Deslizar o dedo sem senha', 'PIN longo ou biometria', 'Padrão simples em formato de L'], 1],
      ['De onde instalar aplicativos com segurança?', ['De lojas oficiais', 'De links enviados por mensagem', 'De qualquer site de download'], 0],
      ['Um app de lanterna pede acesso a SMS e contatos. O que fazer?', ['Aceitar, pois é necessário', 'Negar e desconfiar do aplicativo', 'Aceitar apenas contatos'], 1],
      ['Após o roubo do celular, qual passo é importante?', ['Bloquear a linha e trocar senhas principais', 'Esperar alguns dias', 'Publicar o número do IMEI'], 0],
      ['Para que serve o recurso localizar dispositivo?', ['Achar, bloquear ou apagar o aparelho remotamente', 'Aumentar a bateria', 'Instalar aplicativos mais rápido'], 0]
    ]
  },
  'navegador-seguro': {
    category: 'Contas e dispositivos', difficulty: 'Fácil', icon: '🧭', title: 'Navegador Seguro: Extensões, Cookies e Permissões',
    summary: 'Configure seu navegador para reduzir rastreamento e evitar sites e extensões perigosos.',
    material: {
      title: 'O navegador é a porta de entrada',
      paragraphs: [
        'Quase tudo o que fazemos online passa pelo navegador. Mantê-lo atualizado corrige falhas que atacantes exploram para infectar o computador apenas com a visita a uma página.',
        'Extensões ganham muito poder: algumas leem tudo o que você digita e acessa. Instale poucas, de desenvolvedores conhecidos, e revise periodicamente o que está ativo. Remova as que você não usa.',
        'Fique atento ao cadeado e ao endereço. O cadeado indica conexão criptografada, mas não garante que o site é confiável: sites falsos também usam HTTPS. Confira sempre o nome do domínio.'
      ],
      tips: ['Ative as atualizações automáticas do navegador.', 'Revise e remova extensões que você não reconhece ou não usa.', 'Bloqueie cookies de terceiros e revise permissões de câmera, microfone e localização.', 'Evite salvar senhas no navegador sem proteção: prefira um gerenciador.']
    },
    video: {
      title: 'Configurações que fazem diferença',
      paragraphs: [
        'Nas configurações de privacidade, ative a proteção contra sites perigosos, bloqueie pop-ups e limite as permissões que os sites podem pedir. Se um site pedir notificações sem motivo claro, negue.',
        'Em computadores compartilhados, use janela anônima ou perfil separado e saia das contas ao terminar. Lembre que o modo anônimo não esconde a navegação do provedor ou do empregador.'
      ],
      tips: ['Desconfie de alertas na tela dizendo que seu computador está infectado.', 'Não permita notificações de sites que você não conhece.', 'Limpe cookies e dados de sites ao usar um computador de terceiros.']
    },
    questions: [
      ['Por que manter o navegador atualizado?', ['Para corrigir falhas exploráveis por sites maliciosos', 'Para trocar o visual', 'Para apagar o histórico'], 0],
      ['O cadeado na barra de endereço garante que o site é confiável?', ['Sim, sempre', 'Não, indica só conexão criptografada', 'Sim, se o site for novo'], 1],
      ['Qual é o risco de extensões em excesso?', ['Elas podem ler o que você acessa e digita', 'Elas apagam os favoritos', 'Elas bloqueiam o antivírus'], 0],
      ['Um site pede permissão de notificações sem motivo. O que fazer?', ['Negar', 'Permitir sempre', 'Permitir e depois esquecer'], 0],
      ['O modo anônimo esconde sua navegação de quem?', ['Do provedor de internet e do empregador', 'De ninguém na rede; só não guarda histórico local', 'Do próprio site visitado'], 1]
    ]
  },
  'wifi-publico-vpn': {
    category: 'Contas e dispositivos', difficulty: 'Fácil', icon: '📶', title: 'Wi-Fi Público e VPN',
    summary: 'Use redes de cafés, aeroportos e hotéis sem expor suas informações.',
    material: {
      title: 'Os riscos de redes abertas',
      paragraphs: [
        'Redes Wi-Fi públicas são convenientes, mas você não controla quem as administra nem quem está conectado. Um atacante pode criar uma rede com nome parecido ("Cafe_Gratis") para que você se conecte a ela e tentar observar ou alterar o tráfego.',
        'Hoje a maioria dos sites usa HTTPS, o que protege o conteúdo da conexão. Ainda assim, evite operações sensíveis, como banco e compras, em redes desconhecidas. Se for inevitável, prefira os dados móveis do seu plano.',
        'Uma VPN cria um túnel criptografado entre o seu aparelho e um servidor da VPN. Ela protege o tráfego na rede local, mas você passa a confiar no provedor da VPN: escolha um com boa reputação e política de privacidade clara.'
      ],
      tips: ['Confirme o nome exato da rede com o estabelecimento.', 'Desative a conexão automática a redes abertas.', 'Prefira dados móveis para operações financeiras.', 'Desligue o compartilhamento de arquivos e o AirDrop em redes públicas.']
    },
    video: {
      title: 'Boas práticas ao se conectar',
      paragraphs: [
        'Antes de conectar, verifique o nome da rede com um funcionário. Evite portais que pedem muitas informações pessoais ou instalação de programas para liberar o acesso.',
        'Se aparecer um aviso de certificado inválido no navegador, não prossiga. Esse aviso pode indicar que alguém está interceptando a conexão.'
      ],
      tips: ['Mantenha o sistema e o navegador atualizados.', 'Use VPN confiável em redes que você não controla.', 'Esqueça a rede ao terminar, para não reconectar sozinho depois.']
    },
    questions: [
      ['Qual risco existe em redes Wi-Fi públicas?', ['Redes falsas com nome parecido para interceptar tráfego', 'O sinal ser sempre lento', 'A bateria acabar mais rápido'], 0],
      ['Qual opção é mais segura para acessar o banco fora de casa?', ['Wi-Fi aberto desconhecido', 'Dados móveis do seu plano', 'Qualquer rede com senha simples'], 1],
      ['O que uma VPN faz?', ['Cria um túnel criptografado até um servidor da VPN', 'Impede qualquer vírus', 'Torna a internet mais rápida sempre'], 0],
      ['Aparece um aviso de certificado inválido. O que fazer?', ['Ignorar e continuar', 'Não prosseguir', 'Desativar o navegador'], 1],
      ['Como confirmar o nome da rede correta?', ['Perguntando ao estabelecimento', 'Escolhendo a de sinal mais forte', 'Conectando a todas'], 0]
    ]
  },
  'atualizacoes-patches': {
    category: 'Contas e dispositivos', difficulty: 'Fácil', icon: '🔄', title: 'Atualizações e Correções de Segurança',
    summary: 'Entenda por que atualizar é uma das defesas mais baratas e eficazes.',
    material: {
      title: 'Por que atualizar importa',
      paragraphs: [
        'Todo software tem falhas. Quando uma vulnerabilidade é descoberta, o fabricante lança uma correção (patch). A partir daí, qualquer pessoa pode estudar o patch e criar ataques contra quem ainda não atualizou, e muitos incidentes graves exploraram falhas para as quais já existia correção.',
        'Atualizar vale para tudo: sistema operacional, navegador, aplicativos, roteador, câmeras e até a TV inteligente. Dispositivos sem suporte do fabricante não recebem mais correções e representam risco permanente.',
        'Ative as atualizações automáticas sempre que possível. Em ambientes de trabalho, atualizações são testadas e aplicadas de forma planejada, mas sem adiar correções críticas por muito tempo.'
      ],
      tips: ['Ative as atualizações automáticas do sistema e dos aplicativos.', 'Atualize roteador e dispositivos conectados, não só computador e celular.', 'Substitua equipamentos que perderam o suporte do fabricante.', 'Baixe atualizações apenas de fontes oficiais.']
    },
    video: {
      title: 'Criando uma rotina simples',
      paragraphs: [
        'Reserve um dia do mês para conferir se há atualizações pendentes em roteador, impressora e outros aparelhos que não atualizam sozinhos. Reinicie quando for pedido, pois muitas correções só valem depois disso.',
        'Cuidado com avisos falsos de atualização em sites e pop-ups: eles podem instalar programas maliciosos. Atualize sempre pelas configurações do próprio sistema ou da loja oficial.'
      ],
      tips: ['Reinicie o aparelho quando a atualização pedir.', 'Faça backup antes de grandes atualizações do sistema.', 'Desconfie de pop-ups que mandam "atualizar o navegador" ou "o player".']
    },
    questions: [
      ['O que é um patch?', ['Uma correção de segurança lançada pelo fabricante', 'Um tipo de vírus', 'Um aplicativo de limpeza'], 0],
      ['Por que dispositivos sem suporte são um risco?', ['Não recebem mais correções para novas falhas', 'Consomem mais energia', 'Têm telas menores'], 0],
      ['Qual destes deve ser atualizado?', ['Apenas o celular', 'Sistema, aplicativos, roteador e dispositivos conectados', 'Somente o antivírus'], 1],
      ['Um pop-up manda atualizar o player para ver um vídeo. O que fazer?', ['Instalar rapidamente', 'Não instalar e atualizar pela fonte oficial', 'Baixar de outro site'], 1],
      ['Por que reiniciar após atualizar?', ['Muitas correções só entram em vigor depois', 'Para limpar o histórico', 'Para trocar a senha'], 0]
    ]
  },
  'backup-3-2-1': {
    category: 'Contas e dispositivos', difficulty: 'Fácil', icon: '💾', title: 'Backup 3-2-1: Seus Dados a Salvo',
    summary: 'Aprenda a regra que protege suas fotos e documentos de falhas, roubo e ransomware.',
    material: {
      title: 'A regra 3-2-1',
      paragraphs: [
        'Backup é uma cópia dos seus dados guardada em outro lugar. Ele protege contra falha de disco, roubo, erro humano, incêndio e ataques de ransomware, que bloqueiam arquivos e pedem pagamento.',
        'A regra 3-2-1 é um bom ponto de partida: tenha 3 cópias dos dados, em 2 tipos diferentes de mídia (por exemplo, disco externo e nuvem), com 1 cópia guardada fora do local principal.',
        'Um backup só vale se for restaurável. Teste de tempos em tempos recuperando alguns arquivos, e mantenha ao menos uma cópia desconectada do computador, para que um ataque não a criptografe também.'
      ],
      tips: ['Automatize o backup para não depender da memória.', 'Mantenha uma cópia offline, desconectada depois da cópia.', 'Teste a restauração de arquivos regularmente.', 'Proteja backups com criptografia, principalmente os que ficam na nuvem.']
    },
    video: {
      title: 'Montando seu esquema de backup',
      paragraphs: [
        'Defina o que é importante: documentos, fotos, contratos e arquivos de trabalho. Use a sincronização da nuvem como uma das cópias, lembrando que sincronizar não é o mesmo que fazer backup, pois um arquivo apagado ou criptografado também some do outro lado.',
        'Se possível, use serviços que mantêm versões anteriores dos arquivos. Assim você consegue voltar no tempo caso perceba um problema dias depois.'
      ],
      tips: ['Escolha um dia fixo para conferir se os backups rodaram.', 'Guarde o disco externo em local diferente do computador.', 'Prefira soluções que mantenham versões antigas dos arquivos.']
    },
    questions: [
      ['O que significa 3-2-1?', ['3 cópias, 2 tipos de mídia, 1 fora do local', '3 senhas, 2 contas, 1 backup', '3 discos iguais no mesmo lugar'], 0],
      ['Sincronizar com a nuvem é o mesmo que fazer backup?', ['Sim, sempre', 'Não, arquivos apagados ou criptografados também são sincronizados', 'Sim, se o serviço for pago'], 1],
      ['Por que manter uma cópia offline?', ['Para que o ransomware não a atinja', 'Para economizar energia', 'Para abrir mais rápido'], 0],
      ['Como saber se o backup funciona?', ['Testando a restauração', 'Confiando no ícone verde', 'Apagando os originais'], 0],
      ['O que ajuda a proteger backups na nuvem?', ['Criptografia e MFA', 'Compartilhar o link publicamente', 'Usar senha curta'], 0]
    ]
  }
});
