import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './src/Services/AuthContext';
import Routes from './src/routes';
import vagas from "./src/Services/vagas"; 

export default function App(){ 



  return (
    <AuthProvider>
      <NavigationContainer>
        <StatusBar backgroundColor="#00c6b1" barStyle="light-content" />
        <Routes />
      </NavigationContainer>
    </AuthProvider>
  );
}