import { useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { AUTH_TOKEN_KEY, USER_STORAGE_KEY } from '../core/constants';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Inicialização síncrona do localStorage evita re-renders desnecessários
    const storagedUser = localStorage.getItem(USER_STORAGE_KEY);
    const storagedToken = localStorage.getItem(AUTH_TOKEN_KEY);

    if (storagedUser && storagedToken) {
      try {
        return JSON.parse(storagedUser);
      } catch {
        return null;
      }
    }
    return null;
  });

  const [isLoading] = useState(false);

  const login = (userData, token) => {
    setUser(userData);
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
    localStorage.setItem(AUTH_TOKEN_KEY, token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(USER_STORAGE_KEY);
    localStorage.removeItem(AUTH_TOKEN_KEY);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user, 
      isLoading, 
      login, 
      logout 
    }}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};
