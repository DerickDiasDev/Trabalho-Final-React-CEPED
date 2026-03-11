import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

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

      const receivedToken = data.token;

      let found = { username };
      try {
        const usersRes = await fetch("https://fakestoreapi.com/users");
        if (usersRes.ok) {
          const users = await usersRes.json();
          found = users.find((u) => u.username === username) || { username };
        }
      } catch {
        // Fallback to username-only if user fetch fails
      }
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
