// AuthContext.js
import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userType, setUserType] = useState(null);

  // Função para definir o usuário atual
  const setCurrentUserAndLoginStatus = (user, loggedInStatus, type) => {
    setCurrentUser(user);
    setLoggedIn(loggedInStatus);
    setUserType(type);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        loggedIn,
        userType,
        setCurrentUserAndLoginStatus,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
