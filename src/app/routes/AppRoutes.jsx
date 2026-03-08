import { Routes, Route, Navigate } from 'react-router-dom';
import { Login } from '../../presentation/pages/public/Login';
import { Home } from '../../presentation/pages/protected/Home';
import { AuthGuard } from '../guards/AuthGuard';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      
      {/* Rota Protegida */}
      <Route 
        path="/home" 
        element={
          <AuthGuard>
            <Home />
          </AuthGuard>
        } 
      />

      {/* Redirecionamento padrão: se não souber pra onde ir, vai para a Home (e o Guard decide se entra ou não) */}
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
};
