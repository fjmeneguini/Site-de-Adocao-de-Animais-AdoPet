// Seleciona a div onde os resultados dos animais serão exibidos
const resultadosDiv = document.getElementById('resultados');
// Seleciona o formulário de filtros de busca
const formFiltros = document.getElementById('form-filtros');

// Se o formulário existir na página...
if(formFiltros){
  // Adiciona um listener para o envio do formulário de filtros
  formFiltros.addEventListener('submit', async (e) => {
    e.preventDefault();
    // Obtém os valores selecionados nos filtros
    const especie = document.getElementById('especie').value;
    const porte = document.getElementById('porte').value;
    const idade = document.getElementById('idade').value;

    // Monta a consulta ao Firestore com base nos filtros selecionados
    let query = db.collection('animais');
    if (especie) query = query.where('especie', '==', especie);
    if (porte) query = query.where('porte', '==', porte);
    if (idade) query = query.where('idade', '==', idade);

    // Executa a consulta e obtém os resultados
    const snapshot = await query.get();
    // Limpa os resultados anteriores
    resultadosDiv.innerHTML = '';
    // Para cada animal encontrado, cria um card na tela
    snapshot.forEach(doc => {
      const animal = doc.data();
      const card = document.createElement('div');
      card.className = 'animal-card';
      card.innerHTML = `
        <img src="${animal.fotoUrl}" alt="${animal.nome}">
        <h3>${animal.nome}</h3>
        <p>${animal.especie} | ${animal.porte} | ${animal.idade}</p>
        <button class="like-btn">❤️ Curtir</button>
      `;
      resultadosDiv.appendChild(card);
    });
  });
}