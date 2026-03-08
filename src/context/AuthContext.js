import { createContext, useContext } from 'react';

export const AuthContext = createContext({});

// Hook
export const useAuth = () => useContext(AuthContext);
