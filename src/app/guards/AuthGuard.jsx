import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export const AuthGuard = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
