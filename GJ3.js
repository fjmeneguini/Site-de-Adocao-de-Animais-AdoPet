// Inicializa o serviço de autenticação do Firebase
const auth = firebase.auth();
const db = firebase.firestore();

// Cadastro de novo usuário
document.getElementById('cadastro-form')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  // Obtém os dados do formulário de cadastro
  const email = document.getElementById('cadastro-email').value;
  const senha = document.getElementById('cadastro-senha').value;
  const tipo = document.getElementById('tipo-usuario').value;

  try {
    // Cria usuário no Firebase Authentication
    const userCred = await auth.createUserWithEmailAndPassword(email, senha);
    // Salva o tipo de usuário (user/admin) no Firestore
    await db.collection('usuarios').doc(userCred.user.uid).set({ tipo });
    alert('Usuário cadastrado! Faça login.');
  } catch (error) {
    alert(error.message);
  }
});

// Login de usuário existente
document.getElementById('login-form')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  // Obtém os dados do formulário de login
  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;

  try {
    // Faz login com Firebase Authentication
    await auth.signInWithEmailAndPassword(email, senha);
    // Busca o tipo de usuário no Firestore para redirecionar
    const doc = await db.collection('usuarios').doc(auth.currentUser.uid).get();
    if (doc.exists && doc.data().tipo === 'admin') {
      // Se for admin/ONG, vai para o painel administrativo
      window.location.href = 'admin.html';
    } else {
      // Se for usuário comum, vai para a página inicial
      window.location.href = 'index.html';
    }
  } catch (error) {
    alert(error.message);
  }
});