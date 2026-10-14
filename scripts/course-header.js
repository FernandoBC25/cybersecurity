// Busca dentro do curso: filtra as seções da etapa atual.
// O cabeçalho é o mesmo do resto do site (ver scripts/site-header.js); aqui só fica a busca do curso.
document.addEventListener('DOMContentLoaded', () => {
  const search = document.getElementById('courseSearch');
  if (!search) return;

  const searchableSections = document.querySelectorAll('main .content-section');
  let emptyMessage;
  search.addEventListener('input', () => {
    const query = search.value.trim().toLocaleLowerCase('pt-BR');
    let visibleSections = 0;
    searchableSections.forEach((section) => {
      const matches = !query || section.textContent.toLocaleLowerCase('pt-BR').includes(query);
      section.hidden = !matches;
      visibleSections += Number(matches);
    });
    if (!emptyMessage) {
      emptyMessage = document.createElement('p');
      emptyMessage.className = 'course-search-empty';
      emptyMessage.setAttribute('role', 'status');
      emptyMessage.textContent = 'Nenhum conteúdo encontrado nesta etapa.';
      document.querySelector('main.page-shell').append(emptyMessage);
    }
    emptyMessage.hidden = visibleSections > 0 || !query;
  });
});
