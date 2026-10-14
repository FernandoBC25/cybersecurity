// Catálogo: Golpes e engenharia social (10 cursos).
Object.assign((window.novosCursos = window.novosCursos || {}), {
  'engenharia-social': {
    category: 'Golpes e engenharia social', difficulty: 'Médio', icon: '🎭', title: 'Engenharia Social: Hackeando Pessoas',
    summary: 'Entenda como golpistas exploram confiança, urgência e curiosidade, e como não cair.',
    material: {
      title: 'O elo mais explorado é o humano',
      paragraphs: [
        'Engenharia social é o conjunto de técnicas que manipulam pessoas para que entreguem informações ou executem ações. Em vez de quebrar um sistema, o golpista convence alguém a abrir a porta.',
        'Os gatilhos mais comuns são urgência ("sua conta será bloqueada hoje"), autoridade ("sou da diretoria"), medo, curiosidade e a vontade de ajudar. Esses gatilhos fazem a pessoa agir antes de pensar.',
        'A defesa é criar uma pausa: desconfiar de pedidos inesperados, verificar a identidade por outro canal e saber que ninguém legítimo pede senha, código de verificação ou transferência com pressa.'
      ],
      tips: ['Desconfie de urgência, segredo e pedidos fora da rotina.', 'Confirme a identidade por um canal que você mesmo procurou, não o que veio na mensagem.', 'Não forneça senha ou códigos a ninguém, nem a "funcionários".', 'Em dúvida, pare e peça uma segunda opinião.']
    },
    video: {
      title: 'Cenários reais e como reagir',
      paragraphs: [
        'Pretexting: o golpista inventa uma história convincente, como "sou do suporte e preciso corrigir sua conta". Baiting: deixa um pendrive "esquecido" para despertar curiosidade. Tailgating: entra em um prédio logo atrás de alguém com crachá.',
        'Em todos os casos, o que funciona é o procedimento: se a empresa tem um processo para validar visitantes ou pedidos, siga-o mesmo quando a pessoa parecer simpática ou apressada.'
      ],
      tips: ['Nunca conecte pendrives de origem desconhecida.', 'Não segure a porta para quem não conhece sem validar.', 'Relate tentativas suspeitas à equipe de segurança.']
    },
    questions: [
      ['O que a engenharia social explora principalmente?', ['Falhas humanas e a confiança das pessoas', 'Apenas falhas de software', 'Somente a velocidade da internet'], 0],
      ['Qual destes é um gatilho típico de golpe?', ['Urgência exagerada', 'Mensagem sem erros', 'Resposta atrasada'], 0],
      ['Alguém se diz do suporte e pede seu código de verificação. O que fazer?', ['Informar, pois é do suporte', 'Recusar e contatar o suporte por canal oficial', 'Enviar só metade'], 1],
      ['O que é baiting?', ['Deixar mídia infectada para atrair a curiosidade', 'Pedir senha por telefone', 'Entrar atrás de alguém no prédio'], 0],
      ['Qual a melhor defesa contra pressa e pressão?', ['Criar uma pausa e verificar por outro canal', 'Responder logo', 'Aceitar o pedido para evitar conflito'], 0]
    ]
  },
  'golpes-pix-pagamentos': {
    category: 'Golpes e engenharia social', difficulty: 'Fácil', icon: '💸', title: 'Golpes com Pix e Pagamentos Digitais',
    summary: 'Reconheça os golpes mais comuns com Pix, boletos e cartões e proteja seu dinheiro.',
    material: {
      title: 'Pagamentos instantâneos exigem atenção extra',
      paragraphs: [
        'O Pix é rápido e prático, e justamente por isso é atraente para golpistas: depois de enviado, o dinheiro é difícil de recuperar. Os golpes mais comuns envolvem falsos pedidos de ajuda de parentes, QR codes adulterados e "cobranças" por engano.',
        'Antes de confirmar, leia com atenção o nome do destinatário que aparece na tela do banco. Se ele não bate com quem você pensa estar pagando, interrompa a operação.',
        'Configure limites de valor e de horário no aplicativo do banco, especialmente para transferências noturnas. Isso reduz o estrago caso alguém acesse sua conta.'
      ],
      tips: ['Confira o nome do favorecido antes de confirmar.', 'Defina limite de Pix e horário noturno reduzido.', 'Desconfie de "pagamentos por engano" que pedem devolução por outra chave.', 'Cheque boletos pelo aplicativo do banco antes de pagar.']
    },
    video: {
      title: 'Quando algo já deu errado',
      paragraphs: [
        'Se você percebeu o golpe logo após enviar, contate imediatamente o banco pelo canal oficial e peça o acionamento do Mecanismo Especial de Devolução. Quanto mais rápido, maiores as chances de bloqueio.',
        'Guarde comprovantes, conversas e dados do golpista e registre o boletim de ocorrência. Essas provas ajudam o banco e a polícia na investigação.'
      ],
      tips: ['Ligue para o número oficial que aparece no aplicativo ou no cartão.', 'Nunca aceite "ajuda" de quem oferece recuperar o dinheiro mediante pagamento.', 'Registre a ocorrência e guarde todas as provas.']
    },
    questions: [
      ['Por que o Pix é alvo de golpes?', ['A transferência é imediata e difícil de reverter', 'Ele é lento', 'Exige conta de empresa'], 0],
      ['O que conferir antes de confirmar uma transferência?', ['O nome do favorecido exibido pelo banco', 'A cor do aplicativo', 'O horário do dia'], 0],
      ['Um desconhecido diz que enviou dinheiro por engano e pede devolução por outra chave. O que fazer?', ['Devolver rapidamente', 'Não devolver por outra chave e falar com o banco', 'Pedir mais dinheiro'], 1],
      ['Qual medida ajuda a limitar prejuízos em caso de invasão?', ['Definir limites de valor e de horário', 'Desativar o bloqueio de tela', 'Compartilhar a senha'], 0],
      ['Percebeu o golpe logo após enviar. Qual o primeiro passo?', ['Aguardar dias', 'Contatar o banco pelo canal oficial imediatamente', 'Postar nas redes sociais'], 1]
    ]
  },
  'golpes-whatsapp': {
    category: 'Golpes e engenharia social', difficulty: 'Fácil', icon: '💬', title: 'Golpes no WhatsApp e Mensageiros',
    summary: 'Proteja sua conta de mensageiro contra clonagem, falsos contatos e links perigosos.',
    material: {
      title: 'Como as contas são clonadas',
      paragraphs: [
        'O golpe mais comum é pedir o código de seis dígitos que chega por SMS. Esse código autoriza o cadastro do seu número em outro aparelho: quem o recebe passa a controlar sua conta e a pedir dinheiro aos seus contatos.',
        'Outra variação é o perfil novo que usa a foto de um conhecido e diz "mudei de número", pedindo um favor financeiro. O golpe depende da sua confiança em alguém que você acha que conhece.',
        'As melhores proteções são a verificação em duas etapas do próprio aplicativo, uma senha (PIN) de seis dígitos que só você sabe e a regra de nunca compartilhar códigos recebidos.'
      ],
      tips: ['Ative a verificação em duas etapas e defina um PIN.', 'Nunca informe códigos recebidos por SMS ou ligação.', 'Confirme pedidos de dinheiro por ligação de voz antes de pagar.', 'Restrinja quem pode adicionar você a grupos.']
    },
    video: {
      title: 'Links, grupos e arquivos',
      paragraphs: [
        'Mensagens com promoções, "veja quem visitou seu perfil" ou prêmios costumam levar a páginas falsas ou instalar programas maliciosos. Se parece bom demais, provavelmente é golpe.',
        'Se sua conta foi clonada, reinstale o aplicativo com seu número para retomar o controle, avise os contatos por outro canal e ative a verificação em duas etapas assim que possível.'
      ],
      tips: ['Não clique em links de promoções recebidos de desconhecidos.', 'Desconfie de arquivos APK ou programas "para ver o status".', 'Avise os contatos por outro canal se a conta for clonada.']
    },
    questions: [
      ['Por que não se deve passar o código de seis dígitos recebido por SMS?', ['Ele permite que outra pessoa controle sua conta', 'Ele serve só para propaganda', 'Ele expira em um ano'], 0],
      ['Um contato diz "mudei de número" e pede dinheiro. O que fazer?', ['Pagar rápido', 'Confirmar por ligação ou contato antigo', 'Enviar seus dados'], 1],
      ['O que a verificação em duas etapas do aplicativo faz?', ['Exige um PIN para cadastrar seu número em outro aparelho', 'Apaga mensagens antigas', 'Bloqueia todos os grupos'], 0],
      ['Qual destes links é mais suspeito?', ['Promoção milagrosa de desconhecido', 'Link enviado por você mesmo', 'Site oficial digitado por você'], 0],
      ['Sua conta foi clonada. O que fazer?', ['Reinstalar com seu número e avisar contatos por outro canal', 'Apagar o celular', 'Pedir dinheiro de volta ao golpista'], 0]
    ]
  },
  'fraudes-compras-online': {
    category: 'Golpes e engenharia social', difficulty: 'Fácil', icon: '🛒', title: 'Fraudes em Compras Online',
    summary: 'Compre na internet com segurança: lojas falsas, anúncios enganosos e pagamentos.',
    material: {
      title: 'Como identificar uma loja suspeita',
      paragraphs: [
        'Lojas falsas copiam o visual de marcas conhecidas e anunciam preços muito abaixo do mercado, com prazos curtos de oferta. O objetivo é receber o pagamento e nunca entregar o produto, ou capturar os dados do seu cartão.',
        'Antes de comprar, pesquise o nome da loja junto com palavras como "reclamações" ou "é confiável". Verifique o endereço do site, o CNPJ, canais de atendimento reais e a política de troca. Sites criados há poucos dias merecem cuidado.',
        'Prefira meios de pagamento com proteção ao comprador, como cartão de crédito, e desconfie de lojas que aceitam apenas transferência ou Pix para "garantir o desconto".'
      ],
      tips: ['Pesquise reputação da loja fora do próprio site.', 'Desconfie de descontos muito acima do normal.', 'Evite pagar por transferência para pessoas físicas.', 'Use cartão virtual ou de uso único quando disponível.']
    },
    video: {
      title: 'Boas práticas antes e depois da compra',
      paragraphs: [
        'Digite o endereço da loja você mesmo ou use o aplicativo oficial, em vez de clicar em anúncios e mensagens. Nunca finalize compras em páginas que pedem dados além do necessário para o pagamento.',
        'Depois da compra, guarde o comprovante e acompanhe o pedido. Ao notar cobrança indevida, contate o banco para contestar e bloquear o cartão.'
      ],
      tips: ['Guarde prints do anúncio, comprovantes e e-mails.', 'Confira a fatura do cartão após a compra.', 'Contate a operadora do cartão ao perceber cobrança suspeita.']
    },
    questions: [
      ['Qual sinal indica possível loja falsa?', ['Preço muito abaixo do mercado e pressão para pagar rápido', 'Telefone de atendimento válido', 'Política de troca clara'], 0],
      ['O que fazer antes de comprar em uma loja desconhecida?', ['Pesquisar a reputação em fontes externas', 'Pagar logo para garantir', 'Compartilhar o link com amigos'], 0],
      ['Qual meio de pagamento costuma oferecer mais proteção ao comprador?', ['Transferência a pessoa física', 'Cartão de crédito', 'Dinheiro em mãos'], 1],
      ['Qual a forma mais segura de acessar uma loja?', ['Digitar o endereço ou usar o aplicativo oficial', 'Clicar em anúncios de mensagens', 'Usar links encurtados'], 0],
      ['Percebeu cobrança indevida. O que fazer?', ['Contatar o banco para contestar e bloquear o cartão', 'Ignorar', 'Pagar a fatura sem verificar'], 0]
    ]
  },
  'falso-emprego-investimento': {
    category: 'Golpes e engenharia social', difficulty: 'Fácil', icon: '📈', title: 'Falsas Vagas e Falsos Investimentos',
    summary: 'Descubra como golpistas usam promessas de emprego fácil e lucro garantido.',
    material: {
      title: 'Se a oferta é boa demais, desconfie',
      paragraphs: [
        'Em golpes de falso emprego, o golpista oferece uma vaga com salário alto e poucas exigências e depois pede pagamento de taxas, compra de equipamentos ou envio de documentos pessoais. Empresas sérias não cobram para contratar.',
        'Nos falsos investimentos, a promessa é de retornos altos, rápidos e garantidos. Muitos usam esquemas de pirâmide, em que o lucro dos primeiros vem do dinheiro dos novos participantes, até tudo desmoronar.',
        'Qualquer investimento tem risco, e rentabilidade garantida muito acima do mercado é um alerta. Antes de aplicar, confira se a instituição é autorizada pelo órgão regulador e desconfie de pressão para decidir rápido.'
      ],
      tips: ['Nunca pague para conseguir emprego.', 'Desconfie de rentabilidade garantida muito acima do mercado.', 'Confirme se a empresa ou corretora é autorizada por um órgão regulador.', 'Não envie documentos antes de confirmar que a vaga e a empresa são reais.']
    },
    video: {
      title: 'Como checar uma proposta',
      paragraphs: [
        'Pesquise a empresa nos canais oficiais, procure a vaga no site dela e ligue para um contato que você encontrou por conta própria. Entrevistas apenas por aplicativo de mensagem e pedidos de transferência são sinais de alerta.',
        'Em ofertas de investimento recebidas por influenciadores, grupos ou desconhecidos, desconfie de prints de ganhos e depoimentos. Eles são fáceis de falsificar.'
      ],
      tips: ['Confirme a vaga no site oficial da empresa.', 'Desconfie de prints de lucros e depoimentos prontos.', 'Peça opinião de alguém de confiança antes de transferir dinheiro.']
    },
    questions: [
      ['Uma empresa séria pede pagamento para contratar. Isso é:', ['Normal', 'Um sinal de golpe', 'Obrigatório por lei'], 1],
      ['O que caracteriza uma pirâmide financeira?', ['Lucros pagos com dinheiro de novos participantes', 'Investimento regulado e fiscalizado', 'Rendimento previsto em contrato público'], 0],
      ['Qual alerta aparece em ofertas de investimento fraudulentas?', ['Retorno alto e garantido', 'Aviso claro de risco', 'Autorização do regulador'], 0],
      ['Como confirmar uma vaga?', ['Procurando no site oficial da empresa', 'Pagando a taxa pedida', 'Enviando documentos por mensagem'], 0],
      ['Depoimentos e prints de ganhos são:', ['Provas confiáveis', 'Fáceis de falsificar', 'Exigidos por lei'], 1]
    ]
  },
  'deepfakes-golpes-ia': {
    category: 'Golpes e engenharia social', difficulty: 'Médio', icon: '🤖', title: 'Deepfakes e Golpes com Inteligência Artificial',
    summary: 'Vozes, vídeos e textos criados por IA: como reconhecer e se proteger.',
    material: {
      title: 'Quando ver e ouvir já não basta',
      paragraphs: [
        'Ferramentas de inteligência artificial conseguem clonar vozes com poucos segundos de áudio e gerar vídeos em que alguém parece dizer o que nunca disse. Esses conteúdos são chamados de deepfakes e já são usados em golpes de falso parente em apuros, falso executivo e falsas celebridades.',
        'A IA também melhora e-mails e mensagens de golpe: textos sem erros de português, perfis falsos mais convincentes e conversas automáticas. Por isso, a ausência de erros deixou de ser sinal de confiança.',
        'A defesa mais eficaz é o processo: combinar uma palavra de segurança com a família, conferir pedidos de dinheiro por outro canal e desconfiar de qualquer apelo emocional com urgência.'
      ],
      tips: ['Combine uma palavra de segurança com familiares e equipe.', 'Desligue e ligue de volta para o número que você já conhece.', 'Procure por sinais: sincronia labial estranha, piscar irregular, voz monótona.', 'Verifique notícias e vídeos em fontes confiáveis antes de compartilhar.']
    },
    video: {
      title: 'Verificando antes de agir',
      paragraphs: [
        'Diante de um pedido urgente por áudio ou vídeo, interrompa e contate a pessoa por um canal já conhecido. Empresas devem exigir uma segunda aprovação em pagamentos fora do padrão, mesmo que o pedido pareça vir do presidente.',
        'Evite expor vozes e imagens em excesso em perfis públicos. Quanto mais material, mais fácil é clonar. Configure a privacidade das suas redes sociais.'
      ],
      tips: ['Exija dupla aprovação para pagamentos incomuns.', 'Restrinja a visibilidade de vídeos e áudios nas redes.', 'Denuncie conteúdos falsos nas plataformas.']
    },
    questions: [
      ['O que é um deepfake?', ['Conteúdo falso de áudio ou vídeo criado por IA', 'Um tipo de senha forte', 'Um antivírus'], 0],
      ['Você recebe um áudio de um parente pedindo dinheiro urgente. O que fazer?', ['Transferir logo', 'Ligar para o número conhecido da pessoa', 'Pedir o valor em dobro'], 1],
      ['Por que a ausência de erros de português já não indica confiança?', ['IA escreve textos bem formulados', 'Golpistas não usam texto', 'Mensagens de golpe sempre têm erros'], 0],
      ['Qual medida ajuda a família a se proteger?', ['Combinar uma palavra de segurança', 'Publicar áudios sempre que possível', 'Atender todas as chamadas'], 0],
      ['Em empresas, o que reduz o risco de falso executivo?', ['Dupla aprovação para pagamentos incomuns', 'Pagar sem questionar', 'Desativar os registros'], 0]
    ]
  },
  'sim-swap-clonagem-chip': {
    category: 'Golpes e engenharia social', difficulty: 'Médio', icon: '📞', title: 'SIM Swap e Clonagem de Chip',
    summary: 'Como golpistas tomam seu número de telefone e como bloquear esse ataque.',
    material: {
      title: 'Quem controla seu número controla seus códigos',
      paragraphs: [
        'No SIM swap, o golpista convence a operadora (ou suborna um funcionário) a transferir seu número para um chip que está com ele. A partir daí, recebe seus SMS e ligações, inclusive códigos de verificação de bancos, e-mails e redes sociais.',
        'Os sinais mais comuns são ficar sem sinal de repente, sem motivo, e receber avisos de tentativas de acesso às suas contas. A pessoa percebe tarde, pois o celular parece apenas "sem rede".',
        'Para reduzir o risco, evite usar SMS como segundo fator em contas críticas e prefira aplicativos autenticadores ou chaves de segurança. Proteja sua conta na operadora com senha ou PIN adicional.'
      ],
      tips: ['Prefira autenticador ou chave física ao SMS para contas importantes.', 'Peça à operadora uma senha extra para trocas de chip.', 'Não divulgue seu CPF, endereço e número publicamente.', 'Fique alerta a sinais de falta de sinal sem explicação.']
    },
    video: {
      title: 'Agindo rápido diante do sinal',
      paragraphs: [
        'Se ficar sem sinal de forma suspeita, ligue para a operadora de outro telefone ou vá a uma loja, informe a suspeita e peça o bloqueio da linha. Em paralelo, avise o banco e troque senhas pelo e-mail.',
        'Registre a ocorrência e guarde protocolos. Quanto mais rápido, menor o tempo que o golpista tem para esvaziar contas e redefinir senhas.'
      ],
      tips: ['Avise o banco ao suspeitar da clonagem.', 'Troque as senhas das contas ligadas ao número, começando pelo e-mail.', 'Guarde protocolos de atendimento e registro de ocorrência.']
    },
    questions: [
      ['O que acontece em um SIM swap?', ['O golpista passa a controlar seu número em outro chip', 'O chip fica mais rápido', 'A operadora troca seu plano'], 0],
      ['Qual segundo fator é mais resistente a esse golpe?', ['SMS', 'Aplicativo autenticador ou chave de segurança', 'Pergunta secreta'], 1],
      ['Ficou sem sinal de repente e sem motivo. O que fazer?', ['Esperar semanas', 'Contatar a operadora e o banco rapidamente', 'Reiniciar e ignorar'], 1],
      ['O que ajuda a proteger a linha na operadora?', ['Senha ou PIN extra para troca de chip', 'Divulgar o CPF', 'Compartilhar o número'], 0],
      ['Por que trocar a senha do e-mail rápido?', ['Ele costuma ser usado para redefinir outras contas', 'Para trocar o provedor', 'Para limpar a caixa de entrada'], 0]
    ]
  },
  'vishing-smishing': {
    category: 'Golpes e engenharia social', difficulty: 'Fácil', icon: '☎️', title: 'Golpes por Ligação e SMS (Vishing e Smishing)',
    summary: 'Reconheça ligações e SMS falsos que se passam por banco, operadora e órgãos públicos.',
    material: {
      title: 'Ligações e mensagens que enganam',
      paragraphs: [
        'Vishing é o golpe por voz: o criminoso liga se passando por banco, operadora ou polícia e diz que há problema na sua conta. Smishing é o equivalente por SMS, com links para páginas falsas ou números para "regularizar" pendências.',
        'Os golpistas podem falsificar o número que aparece na tela, inclusive o do seu banco. Por isso, o identificador de chamada não prova nada. Eles criam urgência e pedem que você instale aplicativos, informe senhas, códigos ou faça transferências.',
        'Bancos legítimos não pedem senha completa, código de token nem pedem para transferir dinheiro para "contas seguras". Em dúvida, desligue e ligue você mesmo para o número oficial.'
      ],
      tips: ['Desligue e ligue de volta pelo número do cartão ou do aplicativo.', 'Nunca informe senha, token ou código por telefone.', 'Não instale aplicativos de acesso remoto a pedido de terceiros.', 'Não clique em links de SMS sobre pendências ou prêmios.']
    },
    video: {
      title: 'Como lidar com a pressão',
      paragraphs: [
        'O golpista tenta manter você na linha, falando rápido e dizendo que há risco imediato. Interromper a ligação quebra esse ciclo. Procure o canal oficial e verifique se existe mesmo algum problema.',
        'Se você caiu no golpe, ligue imediatamente para o banco, bloqueie cartões e acessos, e registre ocorrência. Informe também o número e o horário da ligação.'
      ],
      tips: ['Interromper a ligação não é rude: é proteção.', 'Anote número, horário e o que foi pedido.', 'Bloqueie cartões e acessos se tiver passado dados.']
    },
    questions: [
      ['O que é smishing?', ['Golpe por SMS', 'Golpe por voz', 'Golpe por pendrive'], 0],
      ['O número que aparece na ligação prova que é o banco?', ['Sim', 'Não, ele pode ser falsificado', 'Sim, se tiver o logotipo'], 1],
      ['O que fazer ao receber uma ligação suspeita do banco?', ['Desligar e ligar para o número oficial', 'Informar a senha para provar quem é', 'Fazer uma transferência segura'], 0],
      ['O que o banco nunca pede?', ['Senha completa e código de token por telefone', 'Que você confira o extrato', 'Que você use o aplicativo oficial'], 0],
      ['Por que não instalar aplicativos de acesso remoto a pedido de terceiros?', ['Dão controle do seu aparelho ao golpista', 'Consomem bateria', 'São pagos'], 0]
    ]
  },
  'quishing-qr-code': {
    category: 'Golpes e engenharia social', difficulty: 'Fácil', icon: '🔳', title: 'QR Codes: Quando Escanear é um Risco',
    summary: 'Veja como QR codes adulterados levam a páginas falsas e como escanear com segurança.',
    material: {
      title: 'O que há por trás do código',
      paragraphs: [
        'Um QR code é só um endereço codificado. Golpistas colam adesivos falsos sobre QR codes legítimos em cardápios, estacionamentos e postes, ou enviam códigos por e-mail para levar a páginas que roubam senhas ou dados de pagamento. Isso se chama quishing.',
        'Como o olho humano não consegue ler o endereço do código, não dá para saber para onde ele leva sem escanear. Por isso, a câmera mostra uma prévia do link: leia antes de abrir.',
        'Desconfie de códigos que pedem login, instalação de aplicativos ou pagamento imediato, principalmente se estiverem em locais públicos, sobrepostos ou com aparência de adesivo colado.'
      ],
      tips: ['Confira o endereço exibido antes de abrir o link.', 'Desconfie de QR codes colados sobre outros.', 'Não digite senhas em páginas abertas via QR code recebido por e-mail.', 'Para pagamentos, prefira digitar o endereço ou usar o aplicativo oficial.']
    },
    video: {
      title: 'Uso seguro no dia a dia',
      paragraphs: [
        'Em restaurantes, peça o cardápio físico se o QR code parecer adulterado. Em estacionamentos, prefira pagar pelo aplicativo oficial do operador, em vez de escanear códigos colados nas máquinas.',
        'Se você abriu uma página suspeita, feche-a sem digitar nada. Se já digitou senha, troque-a imediatamente e ative a autenticação multifator.'
      ],
      tips: ['Mantenha o navegador atualizado.', 'Se digitou senha em página suspeita, troque-a na hora.', 'Informe o estabelecimento sobre QR codes adulterados.']
    },
    questions: [
      ['O que é quishing?', ['Phishing feito por QR code', 'Uma criptografia', 'Um tipo de vírus de impressora'], 0],
      ['O que um QR code realmente contém?', ['Um endereço ou dado codificado', 'Um antivírus', 'Uma senha secreta do banco'], 0],
      ['O que fazer antes de abrir o link do QR code?', ['Conferir o endereço mostrado', 'Abrir sem olhar', 'Salvar sem ver'], 0],
      ['Um QR code parece colado sobre outro. O que fazer?', ['Escanear mesmo assim', 'Desconfiar e evitar', 'Compartilhar com amigos'], 1],
      ['Você digitou a senha em uma página suspeita. O que fazer?', ['Trocar a senha e ativar o MFA', 'Nada', 'Reinstalar o navegador'], 0]
    ]
  },
  'golpes-de-relacionamento': {
    category: 'Golpes e engenharia social', difficulty: 'Fácil', icon: '💔', title: 'Golpes de Relacionamento e Falsos Perfis',
    summary: 'Entenda como criminosos constroem confiança por meses para pedir dinheiro.',
    material: {
      title: 'Confiança construída para ser usada',
      paragraphs: [
        'No golpe do relacionamento falso, o criminoso cria um perfil atraente e conversa por semanas, demonstrando carinho e interesse. Depois surge uma emergência: doença, viagem, alfândega, investimento. Sempre há um pedido de dinheiro.',
        'Sinais comuns: a pessoa nunca pode fazer videochamada, evita encontros, declara amor muito rápido, pede segredo e muda de plataforma de conversa. As fotos costumam ser roubadas de outras pessoas e podem ser encontradas por busca reversa de imagens.',
        'Amor e amizade verdadeiros não exigem dinheiro de quem você mal conhece. Compartilhe o que está acontecendo com alguém de confiança: golpistas dependem do isolamento da vítima.'
      ],
      tips: ['Peça videochamada ao vivo e desconfie das desculpas repetidas.', 'Faça busca reversa nas fotos do perfil.', 'Nunca envie dinheiro, cartões ou fotos íntimas a quem não conhece pessoalmente.', 'Converse com alguém de confiança sobre a relação.']
    },
    video: {
      title: 'Protegendo-se e pedindo ajuda',
      paragraphs: [
        'Mantenha suas redes com perfil restrito e evite divulgar informações como rotina e situação financeira. Golpistas usam o que você publica para criar uma história que combine com a sua.',
        'Se você foi vítima, não sinta vergonha: isso acontece com muitas pessoas. Interrompa o contato, não envie mais dinheiro, guarde as conversas e registre ocorrência. Cuidado com "recuperadores" que prometem reaver o dinheiro mediante pagamento.'
      ],
      tips: ['Não pague a quem promete recuperar o dinheiro perdido.', 'Guarde conversas, números e perfis para denúncia.', 'Denuncie o perfil à plataforma e à polícia.']
    },
    questions: [
      ['Qual sinal é comum em perfis falsos de relacionamento?', ['Evitar videochamadas e encontros', 'Mostrar a rotina real', 'Aceitar visitas'], 0],
      ['Como checar se as fotos de um perfil são roubadas?', ['Com busca reversa de imagens', 'Pedindo a senha', 'Mudando a foto de perfil'], 0],
      ['Qual pedido deve acender um alerta?', ['Dinheiro por uma "emergência"', 'Um café', 'Uma indicação de filme'], 0],
      ['O que ajuda quando você tem dúvidas sobre uma relação online?', ['Conversar com alguém de confiança', 'Manter em segredo', 'Enviar dinheiro para testar'], 0],
      ['Alguém oferece recuperar o dinheiro perdido por uma taxa. É:', ['Provavelmente outro golpe', 'Sempre confiável', 'Um serviço do banco'], 0]
    ]
  }
});
