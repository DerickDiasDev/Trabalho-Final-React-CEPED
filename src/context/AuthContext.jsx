import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

/**
 * AuthProvider
 * - Persiste token no localStorage
 * - Expõe: user, token, login(), logout(), isAuthenticated
 * - Login consome a FakeStore API: POST /auth/login
 */
export function AuthProvider({ children }) {
  const [token, setToken] = useState(
    () => localStorage.getItem("valy_token") || null,
  );
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("valy_user"));
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(false);

  const isAuthenticated = Boolean(token);

  /**
   * login – chama FakeStore API e salva o token
   * @param {string} username
   * @param {string} password
   * @returns {{ success: boolean, message?: string }}
   */
  async function login(username, password) {
    setLoading(true);
    try {
      const res = await fetch("https://fakestoreapi.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        return {
          success: false,
          message: data.message || "Usuário ou senha incorretos.",
        };
      }

      const data = await res.json();
      // FakeStore retorna { token: "..." }
      const receivedToken = data.token;

      // Busca dados do usuário para exibir nome na interface
      const usersRes = await fetch("https://fakestoreapi.com/users");
      const users = await usersRes.json();
      const found = users.find((u) => u.username === username) || { username };

      setToken(receivedToken);
      setUser(found);
      localStorage.setItem("valy_token", receivedToken);
      localStorage.setItem("valy_user", JSON.stringify(found));

      return { success: true };
    } catch (err) {
      return { success: false, message: "Erro de conexão. Tente novamente." };
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    setToken(null);
    setUser(null);
    localStorage.removeItem("valy_token");
    localStorage.removeItem("valy_user");
  }

  return (
    <AuthContext.Provider
      value={{ token, user, loading, isAuthenticated, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth deve ser usado dentro de <AuthProvider>");
  return ctx;
}
