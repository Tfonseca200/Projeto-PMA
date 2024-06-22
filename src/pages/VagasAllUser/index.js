// src/screens/JobListScreen.js

import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, StatusBar, Button, Alert, TouchableOpacity } from 'react-native';
import vagasSevices from "../../Services/vagas";
import { useAuth } from "../../Services/AuthContext";
import userService from "../../Services/User";
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';


const JobListScreen = () => {
  const { currentUser, loggedIn, userType } = useAuth();
  const [vaga, setVagas] = useState([]);
  const navigation = useNavigation(); // Hook para usar a navegação
  
  

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const vagasLista = await vagasSevices.vagasAll();
        setVagas(vagasLista);
      } catch (error) {
        console.error('Erro ao buscar vagas:', error);
      }
    };

    fetchJobs();
  }, []);

 const handleInscrever = async (vagaId) => {
  try {
    const userId = await userService.getUserIdFromUUID(currentUser.id);
    console.log("userID:", userId);
    console.log("vagaID:", vagaId);

    if (!userId) {
      console.log("Erro", "Usuário não encontrado. Por favor, faça login novamente.");
      return;
    }

    const success = await vagasSevices.inscreverEmVaga(userId, vagaId);
    if (success) {
      console.log("Sucesso", "Inscrição realizada com sucesso!");
      alert("Inscrição realizada com sucesso!")
    } else {
      console.log("Erro", "Erro ao se inscrever na vaga. Tente novamente mais tarde.");
    }
  } catch (error) {
    console.error("Erro ao se inscrever na vaga:", error);
    Alert.alert("Erro", "Erro ao se inscrever na vaga. Tente novamente mais tarde.");
  }
};

  const renderJobItem = ({ item }) => (
    <View style={styles.jobItem}>
      <Text style={styles.label}>Título:</Text>
      <Text style={styles.jobData}>{item.titulo}</Text>
      <Text style={styles.label}>Empresa:</Text>
      <Text style={styles.jobData}>{item.empresa}</Text>
      <Text style={styles.label}>Descrição:</Text>
      <Text style={styles.jobData}>{item.descricao}</Text>
      <Button title="Inscrever-se" onPress={() => handleInscrever(item.id)} />
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
      <Text style={styles.title}>Vagas disponíveis</Text>
      {vaga.map((job) => (
        <View key={job.id}>
          {renderJobItem({ item: job })}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: "5%"
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  jobItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  jobData: {
    fontSize: 16,
    marginBottom: 8,
  },
    backButton: {
    marginTop: "5%",
    marginBottom: 15,
  },
});

export default JobListScreen;
