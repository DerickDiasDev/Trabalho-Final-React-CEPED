import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { FoodProvider } from "./context/FoodContext";
import PrivateRoute from "./routes/PrivateRoute";
import Layout from "./components/Layout";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import CadastroPage from "./pages/CadastroPage";
import DetalhesPage from "./pages/DetalhesPage";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <FoodProvider>
          <Routes>
            <Route path="/login" element={<LoginPage />} />

            <Route element={<PrivateRoute />}>
              <Route element={<Layout />}>
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/cadastro" element={<CadastroPage />} />
                <Route path="/detalhes/:id" element={<DetalhesPage />} />{" "}
              </Route>
            </Route>

            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </FoodProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
