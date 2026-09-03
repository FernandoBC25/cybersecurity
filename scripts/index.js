const attackCards = document.querySelectorAll('.attack-card');
const attackDetail = document.getElementById('attack-detail');
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
    attackCards.forEach((item) => item.classList.remove('selected'));
    card.classList.add('selected');

    const key = card.dataset.attack;
    const data = attackData[key];

    if (data && attackDetail) {
      attackDetail.innerHTML = `
        <h3>${data.title}</h3>
        <p>${data.text}</p>
      `;
    }
  });
});

if (year) {
  year.textContent = new Date().getFullYear();
}
