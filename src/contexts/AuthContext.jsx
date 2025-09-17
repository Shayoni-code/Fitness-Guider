import React, { createContext, useContext, useState, useEffect } from 'react';
import { login as apiLogin } from '../api/authApi';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('hp_token') || null);
  const [userEmail, setUserEmail] = useState(localStorage.getItem('hp_userEmail') || null);

  useEffect(() => {
    if (token) {
      localStorage.setItem('hp_token', token);
      localStorage.setItem('hp_userEmail', userEmail || '');
    } else {
      localStorage.removeItem('hp_token');
      localStorage.removeItem('hp_userEmail');
    }
  }, [token, userEmail]);

  const login = async (email, password) => {
    const res = await apiLogin({ email, password });
    const t = res.data.token;
    setToken(t);
    setUserEmail(email);
    return res;
  };

  const logout = () => {
    setToken(null);
    setUserEmail(null);
  };

  return (
    <AuthContext.Provider value={{ token, userEmail, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
