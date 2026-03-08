import { Navigate } from 'react-router-dom';

export const AuthGuard = ({ children }) => {
  // Por enquanto, simula que não está logado
  const isAuthenticated = false; 

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
