import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useFood } from '../context/FoodContext'
import StatusBadge from '../components/StatusBadge'
import ConfirmModal from '../components/ConfirmModal'
import { useToast } from '../hooks/useToast'
import ToastContainer from '../components/Toast'
import './DashboardPage.css'

/**
 * DashboardPage
 * - Lista todos os itens cadastrados
 * - Exibe estatísticas de status (Ok / Perto de Vencer / Vencidos)
 * - Permite pesquisar por nome
 * - Permite excluir itens com confirmação
 * - Rota dinâmica: clique no item → /detalhes/:id
 */
export default function DashboardPage() {
  const { items, stats, removeItem, calcStatus, calcDaysLeft } = useFood()
  const { toasts, addToast, removeToast } = useToast()
  const navigate = useNavigate()

  const [search, setSearch]     = useState('')
  const [deleteId, setDeleteId] = useState(null)

  // Filtro de busca
  const filtered = items.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase())
  )

  function handleDeleteConfirm() {
    removeItem(deleteId)
    setDeleteId(null)
    addToast('Item excluído com sucesso.', 'success')
  }

  const hasItems = items.length > 0

  return (
    <>
      {/* Cabeçalho */}
      <div className="dashboard-header">
        <h1 className="dashboard-title">
          Seus <span>Alimentos</span>
        </h1>
        <Link to="/cadastro" className="btn btn-primary">
          + Adicionar Item
        </Link>
      </div>

      {/* Estado vazio */}
      {!hasItems && (
        <div className="card">
          <div className="empty-state">
            <div className="empty-state-icon">📦</div>
            <div className="empty-state-title">Seus alimentos ainda não foram cadastrados</div>
            <div className="empty-state-sub">Comece adicionando seu primeiro item para acompanhar a validade</div>
            <Link to="/cadastro" className="btn btn-primary" style={{ marginTop: 12 }}>
              + Adicionar Item
            </Link>
          </div>
        </div>
      )}

      {/* Conteúdo quando há itens */}
      {hasItems && (
        <>
          {/* Cards de estatística */}
          <div className="stats-row">
            <div className="stat-card ok">
              <div className="stat-label ok">
                <span className="stat-dot ok" /> Ok
              </div>
              <div className="stat-number ok">{stats.ok}</div>
            </div>

            <div className="stat-card warn">
              <div className="stat-label warn">
                <span className="stat-dot warn" /> Perto de Vencer
              </div>
              <div className="stat-number warn">{stats.warn}</div>
            </div>

            <div className="stat-card danger">
              <div className="stat-label danger">
                <span className="stat-dot danger" /> Vencidos
              </div>
              <div className="stat-number danger">{stats.danger}</div>
            </div>
          </div>

          {/* Tabela de produtos */}
          <div className="card">
            <div className="table-header">
              <div className="table-title">
                🥦 Produtos cadastrados
              </div>

              <div className="search-input-wrap">
                <span className="search-icon">🔍</span>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Pesquisar..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  style={{ paddingLeft: 32 }}
                />
              </div>
            </div>

            {filtered.length === 0 ? (
              <p className="no-results">
                Nenhum item encontrado para "{search}"
              </p>
            ) : (
              <div style={{ overflowX: 'auto' }}>
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
                    {filtered.map(item => {
                      const status   = calcStatus(item.expirationDate)
                      const daysLeft = calcDaysLeft(item.expirationDate)

                      return (
                        <tr
                          key={item.id}
                          className={status !== 'ok' ? `row-${status}` : ''}
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
                                onClick={() => setDeleteId(item.id)}
                              >
                                🗑️
                              </button>
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}

      {/* Modal de confirmação de exclusão */}
      <ConfirmModal
        isOpen={deleteId !== null}
        title="Excluir item?"
        message="Esta ação não pode ser desfeita. O item será removido permanentemente."
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteId(null)}
      />

      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </>
  )
}

function formatDate(dateStr) {
  if (!dateStr) return '—'
  const [y, m, d] = dateStr.split('-')
  return `${d}/${m}/${y}`
}
