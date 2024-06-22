import React, { useState, useEffect } from "react";
import { useForm, Controller } from 'react-hook-form';
import { StatusBar, Modal, Alert, ActivityIndicator } from "react-native";
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
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuth } from "../../Services/AuthContext";

import auth from "../../Services/auth";

const schema = yup.object({
  email: yup.string().email("Email inválido!").required("Informe seu email"),
  password: yup
    .string()
    .min(6, "A senha deve ter pelo menos 6 dígitos")
    .max(8, "A senha deve ter no máximo 8 dígitos")
    .required("Informe sua senha"),
});

export default function SignIn() {
  const navigation = useNavigation();
  const [loggedIn, setLoggedIn] = useState(false);
  const [userType, setUserType] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { setCurrentUserAndLoginStatus } = useAuth();
  
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });



  const handleSignIn = async (data) => {
    const { email, password } = data;

    setLoading(true); // Mostrar indicador de carregamento

    
    const adminCredentials = { email: "admin@admin", password: "123456" };

    if (email === adminCredentials.email && password === adminCredentials.password) {
      console.log("Login como admin");
      setLoading(false); // Ocultar indicador de carregamento
      setLoggedIn(true);
      setUserType('admin');
    } else {
      console.log("Tentando autenticação no servidor"); 

      try {
        const result = await auth.loginUser(email, password);
        setLoading(false); // Ocultar indicador de carregamento
        if (result) {
          const { user, session } = result;
          setCurrentUserAndLoginStatus(user, true, 'user');
          setLoggedIn(true);
          setUserType('user');
        } else {
          setErrorMessage("Email ou senha incorreto");
          setShowErrorModal(true);
          setTimeout(() => {
            setShowErrorModal(false);
          }, 3000); // Fecha o modal após 3 segundos
        }
      } catch (error) {
        console.error("Erro ao autenticar usuário:", error.message);
        setLoading(false); // Ocultar indicador de carregamento
        setErrorMessage("Erro ao autenticar usuário");
        setShowErrorModal(true);
        setTimeout(() => {
          setShowErrorModal(false);
        }, 3000); // Fecha o modal após 3 segundos
      }
    }
  };



  useEffect(() => {
    if (loggedIn && userType) {
      console.log("Redirecionando para:", userType === 'admin' ? 'HomeRecruiter' : 'HomeUser');
      if (userType === 'admin') {
        navigation.navigate('HomeRecruiter');
      } else {
        navigation.navigate('HomeUser');
      }
    }
  }, [loggedIn, userType, navigation]);

  return (
    <LinearGradient
      colors={["#00c6b1","#00a5a8","#008398","#00637f","#004461"]}
      style={styles.gradient}
      start={{ x: 0, y: 1 }}
      end={{ x: 0, y: 1 }}
    >
      <View style={styles.container}>
        <StatusBar backgroundColor="#003F64" barStyle="light-content" />
        <Animatable.View
          animation="fadeInLeft"
          delay={500}
          style={styles.containerHeader}
        >
          <Text style={styles.message}>Bem-vindo(a)</Text>
        </Animatable.View>

        <Animatable.View animation="fadeInUp" style={styles.containerForm}>
          <Text style={styles.title}>Email</Text>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[
                  styles.input,
                  {
                    borderWidth: errors.email && 1,
                    borderColor: errors.email && "#fa0707",
                    backgroundColor: errors.email && "#ffcfcf",
                  },
                ]}
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="Digite um email"
              />
            )}
          />
          {errors.email && (
            <Text style={styles.labelError}>{errors.email?.message}</Text>
          )}

          <Text style={styles.title}>Senha</Text>
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[
                  styles.input,
                  {
                    borderWidth: errors.password && 1,
                    borderColor: errors.password && "#fa0707",
                    backgroundColor: errors.password && "#ffcfcf",
                  },
                ]}
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="Digite sua senha"
                secureTextEntry={true}
                keyboardType="numeric"
              />
            )}
          />
          {errors.password && (
            <Text style={styles.labelError}>{errors.password?.message}</Text>
          )}

          <TouchableOpacity
            style={styles.button}
            onPress={handleSubmit(handleSignIn)}
          >
            <Text style={styles.buttonText}>Acessar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonRegister}
            onPress={() => navigation.navigate("SignUp")}
          >
            <Text style={styles.RegisterText}>
              Não possui uma conta? <Text style={styles.link}>Cadastre-se</Text>
            </Text>
          </TouchableOpacity>
        </Animatable.View>
      </View>

      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={showErrorModal}
        onRequestClose={() => setShowErrorModal(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>{errorMessage}</Text>
            <TouchableOpacity
              style={styles.buttonClose}
              onPress={() => setShowErrorModal(false)}
            >
              <Text style={styles.buttonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    marginTop: "14%",
    marginBottom: "8%",
    paddingStart: "5%",
  },
  message: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFF",
  },
  containerForm: {
    backgroundColor: "#FFF",
    flex: 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingStart: "5%",
    paddingEnd: "5%",
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
    marginTop: 14,
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
    color: "#2E2E2E",
  },
  labelError: {
    alignSelf: "flex-start",
    color: "#ff375b",
    marginBottom: 8,
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  buttonClose: {
    backgroundColor: "#004461",
    borderRadius: 4,
    padding: 10,
    elevation: 2,
  },
});