import { Link } from "react-router-dom";
import "./EmptyState.css";

export default function EmptyState() {
  return (
    <div className="card">
      <div className="empty-state">
        <div className="empty-state-icon">📦</div>
        <div className="empty-state-title">
          Seus alimentos ainda não foram cadastrados
        </div>
        <div className="empty-state-sub">
          Comece adicionando seu primeiro item para acompanhar a validade
        </div>
        <Link
          to="/cadastro"
          className="btn btn-primary"
          style={{ marginTop: 12 }}
        >
          + Adicionar Item
        </Link>
      </div>
    </div>
  );
}
