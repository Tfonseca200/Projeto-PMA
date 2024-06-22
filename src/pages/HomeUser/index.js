import React, { useState } from "react";
import { StatusBar } from "react-native";


import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import * as Animatable from "react-native-animatable";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons"; // Importe o ícone de seta

export default function HomeUser() {
  const navigation = useNavigation();

  return (
    <LinearGradient
      colors={["#00c6b1","#00a5a8","#008398","#00637f","#004461"]}
      style={styles.gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      {
        <View style={styles.container}>
        <StatusBar backgroundColor="#00D3DB" barStyle="light-content" />
          <Animatable.View
            animation="fadeInLeft"
            delay={500}
            style={styles.containerHeader}
          >
            <Text style={styles.message}>Área do Candidato(a)</Text>
          </Animatable.View>

          <Animatable.View animation="fadeInUp" style={styles.containerForm}>
            <TouchableOpacity
              onPress={() => navigation.navigate("Welcome")}
              style={styles.backButton}
            >
              <FontAwesome name="arrow-left" size={24} color="#004461" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("VagasAllUser")}
            >
              <Text style={styles.buttonText}>Vagas</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("")}
            >
              <Text style={styles.buttonText}>Minhas candidaturas</Text>
            </TouchableOpacity>
          </Animatable.View>
        </View>
      }
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
  },
  containerHeader: {
    marginTop: "5%",
    marginBottom: "8%",
    alignItems: "center",
  },
  message: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#FFF",
    marginTop: "5%",
  },
  containerForm: {
    backgroundColor: "#FFF",
    flex: 1,
    paddingStart: "5%",
    paddingEnd: "5%",
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    fontSize: 20,
    marginTop: 28,
    marginVertical: "1%",
  },
  input: {
    borderBottomWidth: 1,
    height: 40,
    marginBottom: 12,
    fontSize: 16,
    paddingStart: "2%",
  },
  button: {
    backgroundColor: "#004461",
    width: "100%",
    borderRadius: 4,
    paddingVertical: 8,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonRegister: {
    marginTop: 14,
    alignSelf: "center",
  },
  RegisterText: {
    color: "#a1a1a1",
  },
  labelError: {
    alignSelf: "flex-start",
    color: "#ff375b",
    marginBottom: 8,
  },
  backButton: {
    position: 'absolute',
    top: 10, // Ajuste conforme necessário
    left: 10, // Ajuste conforme necessário
    flexDirection: "row",
    alignItems: "center",

  },
  backButtonText: {
    marginLeft: 5,
    fontSize: 16,

  }
});
