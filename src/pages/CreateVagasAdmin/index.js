// src/screens/JobCreationScreen.js

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import vagas from "../../Services/vagas";

const JobCreationScreen = () => {
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [description, setDescription] = useState('');
  const navigation = useNavigation(); // Hook de navegação

  const handleCreateJob = () => {
    // Lógica para criar uma nova vaga
    vagas.createVaga(title, company, description);
    console.log('Vaga Criada:', { title, company, description });
    alert("Vaga criada com sucesso");
    // Resetar campos após criar a vaga
    setTitle('');
    setCompany('');
    setDescription('');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <FontAwesome name="arrow-left" size={24} color="#004461" />
      </TouchableOpacity>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
      <Text style={styles.label}>Título:</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
      />
      <Text style={styles.label}>Empresa:</Text>
      <TextInput
        style={styles.input}
        value={company}
        onChangeText={setCompany}
      />
      <Text style={styles.label}>Descrição:</Text>
      <TextInput
        style={styles.textarea}
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <Button
        title="Criar Vaga"
        onPress={handleCreateJob}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: "8%",
    backgroundColor: 'white'
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  textarea: {
    height: 80,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    textAlignVertical: 'top',
  },
  backButton: {
    marginTop: "5%",
    marginBottom: 15,
  },
});

export default JobCreationScreen;