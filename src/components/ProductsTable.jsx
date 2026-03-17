import { useNavigate } from "react-router-dom";
import StatusBadge from "./StatusBadge";
import SearchInput from "./SearchInput";
import { formatDate } from "../utils/formatDate";
import "./ProductsTable.css";

export default function ProductsTable({
  items,
  search,
  onSearch,
  onDelete,
  calcStatus,
  calcDaysLeft,
}) {
  const navigate = useNavigate();

  return (
    <div className="card">
      <div className="table-header">
        <div className="table-title-wrapper">
          <div className="image-container">
            <img
              src="produtos-cadastrados-icon.svg"
              alt="Prancheta com uma confirmação"
            />
          </div>
          <h4 className="table-title">Produtos cadastrados</h4>
        </div>
        <SearchInput value={search} onChange={onSearch} />
      </div>

      {items.length === 0 ? (
        <p className="no-results">Nenhum item encontrado para "{search}"</p>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table className="products-table">
            <thead>
              <tr>
                <th>Qtd</th>
                <th>Nome</th>
                <th>Validade</th>
                <th>Vencimento</th>
                <th style={{ width: 90 }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => {
                const status = calcStatus(item.expirationDate);
                const daysLeft = calcDaysLeft(item.expirationDate);

                return (
                  <tr
                    key={item.id}
                    className={status !== "ok" ? `row-${status}` : ""}
                  >
                    <td style={{ fontWeight: 700 }}>{item.quantity}</td>
                    <td
                      className="product-name-link"
                      onClick={() => navigate(`/detalhes/${item.id}`)}
                    >
                      {item.name}
                    </td>
                    <td>{formatDate(item.expirationDate)}</td>
                    <td>
                      <StatusBadge status={status} daysLeft={daysLeft} />
                    </td>
                    <td>
                      <div className="table-actions">
                        <button
                          className="btn btn-ghost btn-sm btn-icon"
                          title="Ver detalhes"
                          onClick={() => navigate(`/detalhes/${item.id}`)}
                        >
                          ✏️
                        </button>
                        <button
                          className="btn btn-danger btn-sm btn-icon"
                          title="Excluir"
                          onClick={() => onDelete(item.id)}
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
