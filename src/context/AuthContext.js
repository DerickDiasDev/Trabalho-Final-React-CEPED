import { createContext, useContext } from 'react';

/**
 * Auth context contract.
 * Provider is required; missing provider should fail fast in `useAuth`.
 */
export const AuthContext = createContext(undefined);

/**
 * Safely consume authentication state and actions from context.
 * @returns {{
 *   user: Object|null,
 *   isAuthenticated: boolean,
 *   isLoading: boolean,
 *   login: Function,
 *   logout: Function
 * }}
 */
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider.');
  }

  return context;
};
