import { Link } from "react-router-dom";
import "./DashboardHeader.css";

export default function DashboardHeader() {
  return (
    <div className="dashboard-header">
      <h1 className="dashboard-title">
        Seus <span>Alimentos</span>
      </h1>
      <Link to="/cadastro" className="btn btn-primary">
        + Adicionar Item
      </Link>
    </div>
  );
}
