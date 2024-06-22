import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Button, Modal, TextInput, TouchableOpacity, StatusBar } from 'react-native';
import vagasServices from "../../Services/vagas";
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';

const TelaListaVagas = () => {
  const [vagas, setVagas] = useState([]);
  const [modalVisivelEditar, setModalVisivelEditar] = useState(false);
  const [modalVisivelExcluir, setModalVisivelExcluir] = useState(false);
  const [vagaEditando, setVagaEditando] = useState(null);
  const [vagaAtual, setVagaAtual] = useState(null);
  const [vagaParaExcluir, setVagaParaExcluir] = useState(null);

  const navigation = useNavigation(); // Hook para usar a navegação

  const buscarVagas = async () => {
    try {
      const listaDeVagas = await vagasServices.vagasAll();
      setVagas(listaDeVagas);
    } catch (error) {
      console.error('Erro ao buscar vagas:', error);
    }
  };

  useEffect(() => {
    buscarVagas();
  }, []);

  const editarVaga = (vaga) => {
    setVagaAtual(vaga);
    setVagaEditando({ ...vaga });
    setModalVisivelEditar(true);
    setVagaParaExcluir(null);
  };

  const salvarEdicao = async () => {
    await vagasServices.updateVaga(vagaEditando.id, vagaEditando.titulo, vagaEditando.empresa, vagaEditando.descricao);
    console.log('Vaga atualizada com sucesso!');
    alert("Vaga atualizada com sucesso!");
    buscarVagas();
    setModalVisivelEditar(false);
  };

  const confirmarExclusao = (vaga) => {
    setVagaParaExcluir(vaga);
    setModalVisivelExcluir(true);
  };

  const cancelarExclusao = () => {
    setVagaParaExcluir(null);
    setModalVisivelExcluir(false);
  };

  const excluirVaga = async () => {
    await vagasServices.deleteVaga(vagaParaExcluir.id);
    console.log("Vaga excluída com sucesso!");
    alert("Vaga excluída com sucesso!");
    buscarVagas();
    setModalVisivelExcluir(false);
    setVagaParaExcluir(null);
  };

  const renderizarItemVaga = ({ item }) => (
    <View style={styles.itemVaga}>
      <Text style={styles.rotulo}>Título:</Text>
      <Text style={styles.dadosVaga}>{item.titulo}</Text>
      <Text style={styles.rotulo}>Empresa:</Text>
      <Text style={styles.dadosVaga}>{item.empresa}</Text>
      <Text style={styles.rotulo}>Descrição:</Text>
      <Text style={styles.dadosVaga}>{item.descricao}</Text>
      <View style={styles.botoesContainer}>
        <Button title="Editar" onPress={() => editarVaga(item)} />
        <Button title="Excluir" onPress={() => confirmarExclusao(item)} />
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <FontAwesome name="arrow-left" size={24} color="#004461" />
      </TouchableOpacity>
      <Text style={styles.titulo}>Vagas disponíveis</Text>
      {vagas.map((vaga) => (
        <View key={vaga.id}>
          {renderizarItemVaga({ item: vaga })}
        </View>
      ))}

      {vagaAtual && (
        <Modal
          animationType="slide"
          transparent={false}
          visible={modalVisivelEditar}
          onRequestClose={() => setModalVisivelEditar(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalConteudo}>
              <Text style={styles.modalTitulo}>Editar Vaga</Text>
              <View style={styles.containerInput}>
                <Text style={styles.rotulo}>Título:</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Título"
                  value={vagaEditando.titulo}
                  onChangeText={(text) => setVagaEditando({ ...vagaEditando, titulo: text })}
                />
              </View>
              <View style={styles.containerInput}>
                <Text style={styles.rotulo}>Empresa:</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Empresa"
                  value={vagaEditando.empresa}
                  onChangeText={(text) => setVagaEditando({ ...vagaEditando, empresa: text })}
                />
              </View>
              <View style={styles.containerInput}>
                <Text style={styles.rotulo}>Descrição:</Text>
                <TextInput
                  style={[styles.input, styles.descricaoInput]}
                  placeholder="Descrição"
                  value={vagaEditando.descricao}
                  onChangeText={(text) => setVagaEditando({ ...vagaEditando, descricao: text })}
                  multiline={true}
                  numberOfLines={4}
                />
              </View>
              <View style={styles.containerBotoes}>
                <TouchableOpacity style={styles.botaoModal} onPress={salvarEdicao}>
                  <Text style={styles.textoBotaoModal}>Salvar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.botaoModal} onPress={() => setModalVisivelEditar(false)}>
                  <Text style={styles.textoBotaoModal}>Cancelar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}

      {vagaParaExcluir && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisivelExcluir}
          onRequestClose={cancelarExclusao}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalConteudo}>
              <Text style={styles.modalTitulo}>Confirmar Exclusão</Text>
              <Text style={styles.textoModal}>Tem certeza que deseja excluir esta vaga?</Text>
              <View style={styles.containerBotoes}>
                <TouchableOpacity style={styles.botaoModal} onPress={excluirVaga}>
                  <Text style={styles.textoBotaoModal}>Sim</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.botaoModal} onPress={cancelarExclusao}>
                  <Text style={styles.textoBotaoModal}>Não</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: "5%",
  },
  titulo: {
    fontSize: 24,
    marginBottom: 16,
  },
  itemVaga: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 16,
  },
  rotulo: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  dadosVaga: {
    fontSize: 16,
    marginBottom: 8,
  },
  botoesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalConteudo: {
    width: '90%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  modalTitulo: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  containerInput: {
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    width: '100%',
  },
  descricaoInput: {
    height: 120,
    textAlignVertical: 'top',
  },
  containerBotoes: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  botaoModal: {
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
  },
  textoBotaoModal: {
    color: 'white',
    textAlign: 'center',
  },
  backButton: {
    marginTop: "5%",
    marginBottom: 15,
  },
});

export default TelaListaVagas;
