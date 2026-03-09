import { createContext, useContext } from 'react';

/**
 * AuthContext Shape (Interface)
 * Provides intellisense and default values for the authentication state
 */
export const AuthContext = createContext({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  login: () => {},
  logout: () => {}
});

/**
 * Custom hook to consume the AuthContext safely
 * @returns {Object} Authentication context (user, login, logout, etc)
 */
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }

  return context;
};
