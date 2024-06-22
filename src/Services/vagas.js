 import supabase from "./supabase";

 // Criar uma nova vaga
const createVaga = async (titulo, empresa, descricao) => {
  try {
    const { data, error } = await supabase.from('vagas').insert([{ titulo, empresa, descricao }]);
    if (error) {
      console.log('Erro ao criar vaga:', error.message);
    } else {
      console.log('Vaga criada com sucesso:', data);
      return data;
    }
  } catch (error) {
    console.log('Erro ao criar vaga:', error.message);
  }
};

// Buscar todas as vagas
const vagasAll = async () => {
  try {
    const { data, error } = await supabase.from('vagas').select('*');
    if (error) {
      console.log('Erro ao buscar vagas:', error.message);
    } else {
      console.log('Vagas encontradas:', data);
      return data;
    }
  } catch (error) {
    console.log('Erro ao buscar vagas:', error.message);
  }
};

// Atualizar uma vaga existente
const updateVaga = async (vagaId, novoTitulo, novaEmpresa, novaDescricao) => {
  try {
    const { data, error } = await supabase.from('vagas').update({ titulo: novoTitulo, empresa: novaEmpresa, descricao: novaDescricao }).eq('id', vagaId);
    if (error) {
      console.log('Erro ao atualizar vaga:', error.message);
    } else {
      console.log('Vaga atualizada com sucesso:', data);
      return data;
    }
  } catch (error) {
    console.log('Erro ao atualizar vaga:', error.message);
  }
};

// Deletar uma vaga existente
const deleteVaga = async (vagaId) => {
  try {
    const { data, error } = await supabase.from('vagas').delete().eq('id', vagaId);
    if (error) {
      console.log('Erro ao deletar vaga:', error.message);
    } else {
      console.log('Vaga deletada com sucesso:', data);
      return data;
    }
  } catch (error) {
    console.log('Erro ao deletar vaga:', error.message);
  }
};



const inscreverEmVaga = async (userId, vagaId) => {
  try {
    const { error } = await supabase
      .from('inscricoes')
      .insert([
        { user_id: userId, vaga_id: vagaId }
      ]);

    if (error) {
      throw error;
    }

    return true;
  } catch (error) {
    console.error('Erro ao inscrever em vaga:', error);
    throw error;
  }
};

export default{
  createVaga,
  vagasAll,
  updateVaga,
  deleteVaga,
  inscreverEmVaga
}