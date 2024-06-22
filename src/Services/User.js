 import supabase from "./supabase";

  const handleCadastro = async (user : Object) => {
    try {
      const { data , error } = await supabase.from("user").insert({
        nome: user.nome,
        cpf: user.cpf,
        email: user.email,
        senha: user.password
      });

      if (error) {
        console.error('Erro ao cadastrar:', error.message);
      } else {
        console.log('Usuário cadastrado com sucesso:', user);
      }
    } catch (error) {
      console.error('Erro ao cadastrar:', error.message);
    }
  };


  const allUsers = async () => {
  try {
    const { data, error } = await supabase.from('user').select('*');

    if (error) {
      console.error('Erro ao buscar usuários:', error.message);
    } else if (data.length === 0) {
      console.log('Nenhum usuário encontrado.');
    } else {
      console.log('Usuários:', data);
    }
  } catch (error) {
    console.error('Erro inesperado ao buscar usuários:', error.message);
  }
};


const getUserById = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('user') 
      .select('*') 
      .eq('id', userId); // Filtrar por ID

    if (error) {
      console.error('Erro ao buscar usuário:', error.message);
      

    } else if (data.length === 0) {
      console.log('Usuário não encontrado.');
    } else {
      console.log('Usuário:', data[0]);
      
    }
  } catch (error) {
    console.error('Erro inesperado ao buscar usuário:', error.message);
    // Lógica para exibir mensagem de erro ao usuário
  }
};


// atenção: esse método está funcionando mais está com bug
const updateUserById = async (userId, newUser) => {
  if (!userId || typeof userId !== 'number') {
    console.error('ID do usuário inválido');
    return;
  }

  try {
    const { data, error } = await supabase
      .from('user') 
      .update(newUser) 
      .eq('id', userId); 

    if (error) {
      console.error('Erro ao atualizar usuário:', error.message);
      
    } else if (data != null) {
      console.log('Usuário não encontrado ou não atualizado.');
    } else {
      console.log('Usuário atualizado:');
    }
  } catch (error) {
    console.error('Erro inesperado ao atualizar usuário:', error.message);
  }
}


const deleteUserById = async (userId) => {
  if (!userId || typeof userId !== 'number') {
    console.error('ID do usuário inválido');
    return;
  }

  try {
    const { data, error } = await supabase
      .from('user') 
      .delete() 
      .eq('id', userId); 

    if (error) {
      console.error('Erro ao deletar usuário:', error.message);
      
    } else if (data != null) {
      console.log('Usuário não encontrado ou não deletado.');
    } else {
      console.log('Usuário deletado:', data);
      
    }
  } catch (error) {
    console.error('Erro inesperado ao deletar usuário:', error.message);
    
  }
};


async function uploadPdf(file) {
  const fileName = `${Date.now()}-${file.name}`;

  try {
    console.log(`Tentando fazer upload do arquivo: ${fileName}`);

    // Realiza o upload do arquivo
    const { data, error } = await supabase.storage.from('profiles').upload(fileName, file);

    if (error) {
      console.error('Erro ao fazer upload do PDF:', error.message); 
      return null;
    }

    console.log('Upload realizado com sucesso:', data);

    // Tentando obter a URL pública do arquivo
    const { data: publicURLData, error: urlError } = supabase.storage.from('profiles').getPublicUrl(fileName);
    console.log('Dados da URL pública:', { publicURLData, urlError });
    
    if (urlError) {
      console.error('Erro ao obter URL pública do PDF:', urlError.message);
      return null;
    }

    console.log('URL pública obtida com sucesso:', publicURLData.publicUrl);
    return publicURLData.publicUrl;
  } catch (err) {
    console.error('Erro inesperado ao fazer upload do PDF:', err.message);
    return null;
  }
}


const getUserIdFromUUID = async (uuid) => {
  try {
    const { data: users, error } = await supabase
      .from('user')
      .select('id')
      .eq('auth_user_id', uuid);

   
    if (error) {
      throw error;
    }

    if (users && users.length > 0) {
      // Se o usuário for encontrado, retorne o ID do usuário
      return users[0].id;
    } else {

      return null;
    }
  } catch (error) {
    console.error('Erro ao obter o ID do usuário:', error);
    throw error; 
  }
};


  export default {
    handleCadastro,
    allUsers,
    getUserById,
    updateUserById, 
    deleteUserById,
    uploadPdf,
    getUserIdFromUUID
    }