import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import "./LoginPage.css";

export default function LoginPage() {
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [apiError, setApiError] = useState("");

  const from = location.state?.from?.pathname || "/dashboard";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { username: "", password: "" },
  });

  async function onSubmit({ username, password }) {
    setApiError("");
    const result = await login(username.trim(), password);
    if (result.success) {
      navigate(from, { replace: true });
    } else {
      setApiError(result.message);
    }
  }

  return (
    <div className="login-bg">
      <div className="login-card">
        <div className="login-logo">
          <img src="../logo.svg" alt="" />
          <div className="login-logo-title">Valy</div>
          <div className="login-logo-sub">Gestor de Validade de Alimentos</div>
        </div>

        <form
          className="login-form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <div className="form-group">
            <label className="form-label" htmlFor="username">
              Usuário <span>*</span>
            </label>
            <input
              id="username"
              type="text"
              className={`form-input ${errors.username ? "error" : ""}`}
              placeholder="Digite seu usuário"
              autoComplete="username"
              {...register("username", { required: "Usuário é obrigatório" })}
            />
            {errors.username && (
              <span className="form-error">{errors.username.message}</span>
            )}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="password">
              Senha <span>*</span>
            </label>
            <input
              id="password"
              type="password"
              className={`form-input ${errors.password ? "error" : ""}`}
              placeholder="Digite sua senha"
              autoComplete="current-password"
              {...register("password", { required: "Senha é obrigatória" })}
            />
            {errors.password && (
              <span className="form-error">{errors.password.message}</span>
            )}
          </div>

          {apiError && <div className="login-error">⚠️ {apiError}</div>}

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: "100%", marginTop: 4 }}
            disabled={loading}
          >
            {loading ? (
              <>
                <span
                  className="spinner"
                  style={{ width: 18, height: 18, borderWidth: 2 }}
                />
                Entrando...
              </>
            ) : (
              "Entrar →"
            )}
          </button>
        </form>

        <div className="login-hint" style={{ marginTop: 16 }}>
          <strong>Contas de teste (FakeStore API):</strong>
          <br />
          👤 <strong>mor_2314</strong> / 🔑 <strong>83r5^_</strong>
          <br />
          👤 <strong>johnd</strong> / 🔑 <strong>m38rmF$</strong>
        </div>
      </div>
    </div>
  );
}
