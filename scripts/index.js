const attackCards = document.querySelectorAll('.attack-card');
const year = document.getElementById('year');

const attackData = {
  phishing: {
    title: 'Phishing',
    text: 'O phishing é responsável por 90% das violações de dados. Ataques incluem e-mails fraudulentos, páginas falsas de login e mensagens de texto maliciosas.'
  },
  malware: {
    title: 'Malware',
    text: 'Software malicioso projetado para danificar, interromper ou obter acesso não autorizado a sistemas. Inclui vírus, trojans, ransomware e spyware.'
  },
  ddos: {
    title: 'DDoS',
    text: 'Ataques de negação de serviço distribuídos que sobrecarregam sistemas com tráfego excessivo, podendo derrubar sites e serviços por horas.'
  },
  'sql-injection': {
    title: 'SQL Injection',
    text: 'Inserção de código SQL malicioso para manipular ou acessar bancos de dados, permitindo acesso ou modificações indevidas.'
  },
  mitm: {
    title: 'Man-in-the-Middle',
    text: 'Interceptação de comunicação entre duas partes para roubar ou modificar dados, especialmente em redes públicas não seguras.'
  },
  ransomware: {
    title: 'Ransomware',
    text: 'Malware que criptografa dados e exige pagamento para restaurar o acesso, afetando empresas e usuários em geral.'
  }
};

attackCards.forEach((card) => {
  card.addEventListener('click', () => {
    const wasSelected = card.classList.contains('selected');

    attackCards.forEach((item) => {
      item.classList.remove('selected');
      item.querySelector('.attack-summary')?.remove();
    });

    if (wasSelected) {
      return;
    }

    card.classList.add('selected');

    const key = card.dataset.attack;
    const data = attackData[key];

    if (data) {
      const summary = document.createElement('div');
      summary.className = 'attack-summary';
      summary.innerHTML = `<p>${data.text}</p>`;
      card.appendChild(summary);
    }
  });
});

const selectedCard = document.querySelector('.attack-card.selected');
if (selectedCard) {
  selectedCard.classList.remove('selected');
  selectedCard.click();
}

if (year) {
  year.textContent = new Date().getFullYear();
}

const statsData = {
  security: {
    brasil: {
      context: 'Recorte nacional com os principais indicadores de exposição e ataques.',
      cards: [
        ['4,8 bi', 'Tentativas de ataques cibernéticos registradas no Brasil', 'Brasil • 2023'],
        ['73%', 'Foram afetados ou conhecem alguém afetado por fraude digital', 'Brasil • 2025'],
        ['Alta', 'Exposição de empresas a campanhas de phishing e ransomware', 'Brasil • referência']
      ]
    },
    mundo: {
      context: 'Visão global sobre vulnerabilidades e o avanço das ameaças digitais.',
      cards: [
        ['87%', 'Relataram aumento nas vulnerabilidades ligadas à IA', 'Mundo • 2025'],
        ['94%', 'Dos líderes esperam que a IA transforme a segurança', 'Mundo • 2026'],
        ['Crescente', 'A superfície de ataque acompanha a expansão dos serviços digitais', 'Mundo • tendência']
      ]
    },
    tendencias: {
      context: 'Tendências que estão mudando a forma como pessoas e empresas se protegem.',
      cards: [
        ['IA', 'A inteligência artificial amplia riscos e também apoia a defesa', 'Tendência global'],
        ['Phishing', 'Mensagens fraudulentas continuam entre as ameaças mais recorrentes', 'Tendência global'],
        ['Nuvem', 'A proteção de identidades e acessos ganha cada vez mais importância', 'Tendência global']
      ]
    }
  },
  career: {
    brasil: {
      context: 'Recorte nacional sobre oportunidades e competências mais procuradas.',
      cards: [
        ['Em alta', 'A demanda por especialistas continua crescendo no mercado brasileiro', 'Brasil • referência'],
        ['+IA', 'Conhecimentos em inteligência artificial ganham espaço na área', 'Brasil • tendência'],
        ['LGPD', 'Privacidade e proteção de dados seguem entre os temas essenciais', 'Brasil • referência']
      ]
    },
    mundo: {
      context: 'Panorama internacional de profissionais e transformação do mercado.',
      cards: [
        ['94%', 'Dos líderes esperam que a IA transforme a segurança', 'Mundo • 2026'],
        ['4,0 mi', 'É a lacuna estimada de profissionais na área', 'Mundo • 2023'],
        ['Global', 'Empresas buscam equipes capazes de unir técnica, risco e negócio', 'Mundo • tendência']
      ]
    },
    habilidades: {
      context: 'Competências que ajudam a construir uma carreira preparada para o futuro.',
      cards: [
        ['Dados', 'Privacidade, governança e análise de riscos são conhecimentos valorizados', 'Habilidade-chave'],
        ['Nuvem', 'Arquiteturas modernas exigem profissionais atentos a identidades e acessos', 'Habilidade-chave'],
        ['Pessoas', 'Comunicação e pensamento crítico complementam o conhecimento técnico', 'Habilidade-chave']
      ]
    }
  }
};

document.querySelectorAll('.stats-environment').forEach((environment) => {
  const group = environment.dataset.statsGroup;
  const buttons = environment.querySelectorAll('.stats-button');
  const cards = environment.querySelectorAll('.stat-card');
  const context = environment.querySelector('.stats-context');
  const display = environment.querySelector('.stats-display');

  const updateStats = (view) => {
    const data = statsData[group]?.[view];
    if (!data) {
      return;
    }

    buttons.forEach((button) => {
      const isActive = button.dataset.statsView === view;
      button.classList.toggle('active', isActive);
      button.setAttribute('aria-selected', String(isActive));
    });
    if (context) {
      context.textContent = data.context;
    }
    cards.forEach((card, index) => {
      const [value, description, period] = data.cards[index];
      card.querySelector('strong').textContent = value;
      card.querySelector('span').textContent = description;
      card.querySelector('small').textContent = period;
    });
    display?.classList.remove('is-updating');
    requestAnimationFrame(() => display?.classList.add('is-updating'));
  };

  buttons.forEach((button) => {
    button.addEventListener('click', () => updateStats(button.dataset.statsView));
  });
});

const previewCarousel = document.getElementById('previewCarousel');
const previewSlides = previewCarousel?.querySelectorAll('.preview-slide') ?? [];
const previewDots = previewCarousel?.querySelectorAll('.preview-dot') ?? [];
const previewPrevious = document.getElementById('previewPrevious');
const previewNext = document.getElementById('previewNext');
let previewIndex = 0;
let previewTimer;

const showPreview = (index) => {
  if (!previewSlides.length) {
    return;
  }

  previewIndex = (index + previewSlides.length) % previewSlides.length;

  previewSlides.forEach((slide, slideIndex) => {
    slide.classList.toggle('active', slideIndex === previewIndex);
  });
  previewDots.forEach((dot, dotIndex) => {
    const isActive = dotIndex === previewIndex;
    dot.classList.toggle('active', isActive);
    dot.toggleAttribute('aria-current', isActive);
  });
};

const startPreviewTimer = () => {
  clearInterval(previewTimer);
  previewTimer = setInterval(() => showPreview(previewIndex + 1), 5000);
};

if (previewCarousel && previewSlides.length) {
  previewPrevious?.addEventListener('click', () => {
    showPreview(previewIndex - 1);
    startPreviewTimer();
  });
  previewNext?.addEventListener('click', () => {
    showPreview(previewIndex + 1);
    startPreviewTimer();
  });
  previewDots.forEach((dot) => {
    dot.addEventListener('click', () => {
      showPreview(Number(dot.dataset.slide));
      startPreviewTimer();
    });
  });
  previewCarousel.addEventListener('mouseenter', () => clearInterval(previewTimer));
  previewCarousel.addEventListener('mouseleave', startPreviewTimer);
  previewCarousel.addEventListener('focusin', () => clearInterval(previewTimer));
  previewCarousel.addEventListener('focusout', (event) => {
    if (!previewCarousel.contains(event.relatedTarget)) {
      startPreviewTimer();
    }
  });
  startPreviewTimer();
}
