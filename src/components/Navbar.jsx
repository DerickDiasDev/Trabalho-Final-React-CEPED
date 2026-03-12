import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  const firstName = user?.name?.firstname
    ? user.name.firstname.charAt(0).toUpperCase() + user.name.firstname.slice(1)
    : user?.username || "Usuário";

  return (
    <nav className="navbar">
      <div className="navbar-wrapper">
        <Link to="/" className="navbar-brand">
          <img src="logo.svg" alt="logo Valy" />
          <span>Valy</span>
        </Link>

        <div className="navbar-actions">
          <span className="navbar-user">Olá, {firstName} 👋</span>

          <button className="btn-logout" onClick={handleLogout}>
            <img src="log-off.svg" alt="icone desligar" />
          </button>
        </div>
      </div>
    </nav>
  );
}
