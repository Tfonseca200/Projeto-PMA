/* eslint-disable */

import React, { useState } from "react";
import { StatusBar, Alert, Modal, TouchableOpacity, View, Text, StyleSheet, TextInput, ScrollView, ActivityIndicator, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as Animatable from "react-native-animatable";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import CheckBox from 'react-native-check-box';
import auth from "../../Services/auth";

const schema = yup.object({
  nome: yup.string().required("Informe seu Nome"),
  cpf: yup
    .string()
    .min(11, "minimo de 11 digitos")
    .max(11, "Máximo de 11 dígitos")
    .required("Informe seu cpf"),
  email: yup.string().email("Email inválido!").required("Informe seu email"),
  password: yup
    .string()
    .min(6, "A senha deve ter pelo menos 6 dígitos")
    .max(8, "A senha deve ter no maximo 8 dígitos")
    .required("Informe sua senha"),
  cpassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "As senhas devem corresponder")
    .required("Confirme sua senha"),
});

export default function SignUp() {
  const navigation = useNavigation();
  const [isChecked, setIsChecked] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [pdfFile, setPdfFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleSignUp = async (data) => {
    if (!isChecked) {
      Alert.alert("Erro", "Você deve aceitar os termos e condições para continuar.");
      return;
    }

    setLoading(true);

    try {
      await auth.registerUser(data.nome, data.cpf, data.email, data.password, pdfFile);
      setShowSuccessModal(true);
      setTimeout(() => {
        setShowSuccessModal(false);
        navigation.navigate('SignIn');
      }, 2000); // Fecha o modal após 3 segundos
    } catch (error) {
      alert('Erro ao registrar. Tente novamente.', 'error');
      console.error('Erro ao registrar:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChooseFile = (event) => {
    const file = event.target.files[0];
    if (file && (file.type === 'application/pdf' || file.type === 'image/png' || file.type === 'image/jpeg')) {
      setPdfFile(file);
      alert('Arquivo anexado com sucesso!');
    } else {
      console.error('Por favor, selecione um arquivo PDF, PNG ou JPEG.');
    }
  };



  return (
    <LinearGradient
      colors={["#00c6b1", "#00a5a8", "#008398", "#00637f", "#004461"]}
      style={styles.gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <KeyboardAwareScrollView
        extraScrollHeight={10}
        enableOnAndroid={true}
        keyboardShouldPersistTaps="always"
      >
        <StatusBar backgroundColor="#00AEB2" barStyle="light-content" />
        <Animatable.View
          animation="fadeInLeft"
          delay={500}
          style={styles.containerHeader}
        >
          <Text style={styles.message}>Cadastre-se</Text>
        </Animatable.View>
        <Animatable.View animation="fadeInUp" style={styles.containerForm}>
          <Text style={styles.title}>Nome</Text>
          <Controller
            control={control}
            name="nome"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[
                  styles.input,
                  {
                    borderWidth: errors.nome && 1,
                    borderColor: errors.nome && "#fa0707",
                    backgroundColor: errors.nome && "#ffcfcf",
                  },
                ]}
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="Digite o seu nome"
              />
            )}
          />
          {errors.nome && (
            <Text style={styles.labelError}>{errors.nome?.message}</Text>
          )}

          <Text style={styles.title}>Cpf</Text>
          <Controller
            control={control}
            name="cpf"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[
                  styles.input,
                  {
                    borderWidth: errors.cpf && 1,
                    borderColor: errors.cpf && "#fa0707",
                    backgroundColor: errors.cpf && "#ffcfcf",
                  },
                ]}
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="Digite seu cpf"
                keyboardType="numeric"
              />
            )}
          />
          {errors.cpf && (
            <Text style={styles.labelError}>{errors.cpf?.message}</Text>
          )}

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

          <Text style={styles.title}>Confirme a Senha</Text>
          <Controller
            control={control}
            name="cpassword"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[
                  styles.input,
                  {
                    borderWidth: errors.cpassword && 1,
                    borderColor: errors.cpassword && "#fa0707",
                    backgroundColor: errors.cpassword && "#ffcfcf",
                  },
                ]}
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="Confirme sua senha"
                secureTextEntry={true}
                keyboardType="numeric"
              />
            )}
          />
          {errors.cpassword && (
            <Text style={styles.labelError}>{errors.cpassword?.message}</Text>
          )}

          {loading && <ActivityIndicator size="large" color="#0000ff" />}

          <input
            type="file"
            accept="application/pdf, image/png, image/jpeg"
            onChange={handleChooseFile}
            style={{ display: 'none' }}
            id="fileInput"
            required
          />

          <TouchableOpacity
            style={styles.button}
            onPress={() => document.getElementById('fileInput').click()}
          >
            <Text style={styles.buttonText}>Anexar Curriculo</Text>
          </TouchableOpacity>
          <View style={styles.checkboxContainer}>
            <CheckBox
              isChecked={isChecked}
              onClick={() => setIsChecked(!isChecked)}
              style={styles.checkbox}
            />
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Text style={styles.label}>Aceito os <Text style={styles.link}>termos e condições</Text></Text>
            </TouchableOpacity>
          </View>

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalContainer}>
                <ScrollView>
                  <Text style={styles.titleT}>Termos e Condições de Uso</Text>
                  <Text style={styles.subtitle}>1. Introdução</Text>
                  <Text style={styles.paragraph}>
                    Bem-vindo ao Consulta Vagas Estacio. Estes Termos e Condições de
                    Uso regem o uso do nosso aplicativo. Ao acessar ou usar o
                    aplicativo, você concorda em cumprir e ficar vinculado a estes
                    termos. Se você não concorda com estes termos, não deve usar o
                    aplicativo.
                  </Text>
                  <Text style={styles.subtitle}>2. Descrição do Serviço</Text>
                  <Text style={styles.paragraph}>
                    O Consulta Vagas Estacio é um aplicativo desenvolvido para ajudar
                    os usuários a encontrar vagas de emprego relacionadas aos cursos
                    oferecidos pela Estácio. O aplicativo permite que os usuários
                    pesquisem vagas, recebam notificações sobre novas oportunidades e
                    se candidatem diretamente através da plataforma.
                  </Text>
                  <Text style={styles.subtitle}>3. Uso do Aplicativo</Text>
                  <Text style={styles.paragraph}>
                    3.1 Conta de Usuário
                    Para utilizar algumas funcionalidades do Consulta Vagas Estacio, 
                    você pode ser solicitado a criar uma conta de usuário. Você é 
                    responsável por manter a confidencialidade das informações da sua
                    conta, incluindo sua senha, e por todas as atividades que ocorram
                    sob sua conta.
                  </Text>
                  <Text style={styles.paragraph}>
                    3.2 Precisão das Informações
                    Você concorda em fornecer informações precisas e completas ao criar
                    uma conta ou utilizar o aplicativo. A falsificação de informações 
                    pode resultar no encerramento da sua conta e no cancelamento 
                    do seu acesso ao aplicativo.
                  </Text>
                  <Text style={styles.paragraph}>
                    3.3 Conduta do Usuário
                    Você concorda em usar o aplicativo apenas para fins legais e em conformidade com todas 
                    as leis aplicáveis. Você não deve usar o aplicativo para qualquer finalidade fraudulenta 
                    ou ilegal, incluindo, mas não se limitando a, infringir direitos de propriedade intelectual 
                    ou violar a privacidade de outros usuários.
                  </Text>
                  <Text style={styles.subtitle}>4. Propriedade Intelectual</Text>
                  <Text style={styles.paragraph}>
                    Todos os conteúdos, marcas registradas, logotipos, e outros elementos 
                    do aplicativo são de propriedade exclusiva do Consulta Vagas Estacio 
                    ou de seus licenciadores. Você não pode copiar, modificar, distribuir, 
                    vender ou alugar qualquer parte do aplicativo sem permissão 
                    explícita por escrito.
                  </Text>
                  <Text style={styles.subtitle}>5. Privacidade e Proteção de Dados</Text>
                  <Text style={styles.paragraph}>
                    5.1 Política de Privacidade
                    Respeitamos a privacidade dos nossos usuários. Para obter mais informações 
                    sobre como coletamos, usamos e protegemos suas informações pessoais, 
                    consulte nossa Política de Privacidade.

                    5.2 Conformidade com a LGPD
                    Nos comprometemos a proteger os dados pessoais dos nossos usuários em conformidade 
                    com a Lei Geral de Proteção de Dados (LGPD) - Lei nº 13.709/2018. Isso inclui o 
                    tratamento adequado dos dados pessoais, garantindo sua privacidade, segurança e o 
                    uso responsável das informações coletadas.

                    5.3 Direitos dos Titulares dos Dados
                    Como usuário, você tem o direito de acessar, corrigir, atualizar e excluir seus 
                    dados pessoais armazenados no Consulta Vagas Estacio. Você também tem o direito de 
                    solicitar a portabilidade dos seus dados e de retirar seu consentimento para o 
                    tratamento de dados a qualquer momento. Para exercer esses direitos, entre em 
                    contato conosco através do e-mail lgpd@consultavagasestacio.com.

                    5.4 Coleta e Uso de Dados
                    Coletamos dados pessoais dos usuários para melhorar a experiência no aplicativo 
                    e fornecer os serviços oferecidos. Isso pode incluir informações como nome, CPF, 
                    e-mail, e dados de uso do aplicativo. Garantimos que esses dados serão utilizados 
                    apenas para os fins descritos e com o consentimento explícito dos usuários.
                  </Text>                
                  <Text style={styles.subtitle}>6. Limitação de Responsabilidade</Text>
                  <Text style={styles.paragraph}>
                    O Consulta Vagas Estacio é fornecido "como está" e "conforme disponível". Não garantimos 
                    que o aplicativo estará disponível em todos os momentos, sem interrupções ou erros. 
                    Não nos responsabilizamos por qualquer dano direto, indireto, incidental ou consequente 
                    que possa surgir do uso ou da incapacidade de usar o aplicativo.
                  </Text>
                  <Text style={styles.subtitle}>7. Modificações nos Termos</Text>
                  <Text style={styles.paragraph}>
                    Reservamo-nos o direito de modificar estes Termos e Condições de Uso a qualquer momento. 
                    Notificaremos você sobre quaisquer alterações substanciais através do aplicativo ou por 
                    outros meios apropriados. Seu uso continuado do aplicativo após a modificação dos termos 
                    constitui sua aceitação das alterações.

                  </Text>   
                  <Text style={styles.subtitle}>8. Rescisão</Text>
                  <Text style={styles.paragraph}>
                    Podemos rescindir ou suspender seu acesso ao aplicativo a qualquer momento, sem aviso prévio 
                    ou responsabilidade, por qualquer motivo, incluindo se você violar estes Termos e Condições de Uso.

                  </Text>
                  <Text style={styles.subtitle}>9. Contato</Text>
                  <Text style={styles.paragraph}>
                    Se você tiver alguma dúvida sobre estes Termos e Condições de Uso, entre em contato 
                    conosco através do e-mail suporte@consultavagasestacio.com.
                  </Text> 
                  <Text style={styles.paragraph}>
                    Estes são os Termos e Condições de Uso para o aplicativo Consulta Vagas Estacio. 
                    Ao utilizar o aplicativo, você concorda em cumprir todas as diretrizes descritas acima, 
                    incluindo nossa política de proteção de dados pessoais conforme a LGPD.
                  </Text>                                                             
                  <TouchableOpacity
                    style={styles.buttonClose}
                    onPress={() => setModalVisible(!modalVisible)}
                  >
                    <Text style={styles.buttonText}>Fechar</Text>
                  </TouchableOpacity>
                </ScrollView>
              </View>
            </View>
          </Modal>

          <Modal
            animationType="slide"
            transparent={true}
            visible={showSuccessModal}
            onRequestClose={() => setShowSuccessModal(!showSuccessModal)}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalContainerSuccess}>
                <Text style={styles.modalText}>Registro bem-sucedido!</Text>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setShowSuccessModal(false)}
                >
                  <Text style={styles.textStyle}>Fechar</Text>
                </Pressable>
              </View>
            </View>
          </Modal>

          <TouchableOpacity
            style={styles.button}
            onPress={handleSubmit(handleSignUp)}
            disabled={loading}
          >
            <Text style={styles.buttonText}>Cadastrar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonRegister}
            onPress={() => navigation.navigate("SignIn")}
          >
            <Text style={styles.RegisterText}>Voltar</Text>
          </TouchableOpacity>
        </Animatable.View>
      </KeyboardAwareScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
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
  RegisterText: {
    padding: 10,
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
    marginTop: 20,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 5,
    fontSize: 16,
  },
  labelError: {
    color: "#fa0707",
    marginBottom: 8,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
  },
  checkbox: {
    alignSelf: "center",
  },
  label: {
    margin: 8,
  },
  button: {
    backgroundColor: "#00AEB2",
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonRegister: {
    marginTop: 20,
    alignItems: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  buttonClose: {
    backgroundColor: "#00AEB2",
    borderRadius: 8,
    padding: 10,
    elevation: 2,
    textAlign: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    maxHeight: "80%",
  },
  titleT: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 5,
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 10,
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
  modalContainerSuccess: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    maxHeight: '80%',
    width: '80%',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  modalText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
