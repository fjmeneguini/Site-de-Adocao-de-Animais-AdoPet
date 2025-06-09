// Adiciona um listener para o envio do formulário de contato
document.getElementById('fale-form')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  // Obtém os valores dos campos do formulário
  const nome = document.getElementById('nome').value;
  const email = document.getElementById('email').value;
  const animalInteresse = document.getElementById('animal-interesse').value;
  const mensagem = document.getElementById('mensagem').value;
  // Se o usuário estiver logado, pega o ID, senão deixa null
  const userId = auth.currentUser ? auth.currentUser.uid : null;

  try {
    // Salva os dados do contato na coleção 'contatos' do Firestore
    await db.collection('contatos').add({
      nome, 
      email, 
      animalInteresse, 
      mensagem, 
      userId, 
      data: new Date()
    });
    // Exibe mensagem de sucesso e reseta o formulário
    document.getElementById('msg-sucesso').innerText = "Mensagem enviada com sucesso!";
    document.getElementById('fale-form').reset();
  } catch (error) {
    // Exibe erro caso aconteça algum problema ao salvar
    alert(error.message);
  }
});