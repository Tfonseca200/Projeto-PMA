import supabase from "./supabase";
import pdfService from "./User";



//registro de usuario na autenticação do supabase
async function signUp(email, password) {
  console.log("Iniciando o registro do usuário...");

  
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
  });

  if (error) {
    console.error('Erro ao registrar:', error.message);
    return null;
  }

  const { user, session } = data;

  console.log("Sucesso", "Usuário criado com sucesso!");
  console.log("Dados do usuário autenticado:", user);
  console.log("Sessão do usuário:", session);

  return user;
}



// inserindo usuario no database com o id da autenticação como referencia
async function insertUserData(userId, nome, cpf, email, password, pdfUrl) {
  console.log("Iniciando a inserção dos dados do usuário...");

  const { data, error: dbError } = await supabase.from("user").insert({
    nome: nome,
    cpf: cpf,
    email: email,
    senha: password,
    pdfUrl: pdfUrl,  
    auth_user_id: userId  // Armazena o UUID do Supabase para referência
  });

  if (dbError) {
    console.error('Erro ao salvar usuário no banco de dados:', dbError.message);
  } else {
    console.log('Usuário registrado com sucesso na tabela users:', data);
  }

  return { data, error: dbError };
}



// função de registra usuario que chama duas funções( singUp ,insertUserData ) 
async function registerUser(nome, cpf, email, password, pdfFile) {

  console.log(pdfFile);
  
  const user = await signUp(email, password);

  if (!user) {
    console.error('Erro na autenticação. Registro abortado.');
    return;
  }

// Upload do PDF
  const pdfUrl = await pdfService.uploadPdf(pdfFile);

  if (!pdfUrl) {
    console.error('Erro ao fazer upload do PDF. Registro abortado.');
    return;
  }



  
  const { data, error } = await insertUserData(user.id, nome, cpf, email, password, pdfUrl);

  if (error) {
    console.error('Erro ao salvar dados do usuário no banco de dados:', error.message);
  } else {
    console.log('Usuário registrado com sucesso:', data);
  }
}



// função de autenticação de usuario
async function signIn(email, password) {
  console.log("Iniciando a autenticação do usuário...");

  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) {
    console.error('Erro ao autenticar:', error.message);
    return null;
  }

  const { user, session } = data;

  console.log("Sucesso", "Usuário autenticado com sucesso!");
  console.log("Dados do usuário autenticado:", user);
  console.log("Sessão do usuário:", session);

  return { user, session };
}



// função de login de usuario que chama singIn pra autenticar
async function loginUser(email, password) {
  const result = await signIn(email, password);

  if (!result) {
    console.error('Erro na autenticação. Login abortado.');
    return;
  }

  const { user, session } = result;

  console.log('Usuário autenticado com sucesso:', user);
  console.log('Sessão do usuário:', session);

  return { user, session };
}



//unicas funções que precisa ser usada na camada view
export default {
  registerUser,
  loginUser
};

