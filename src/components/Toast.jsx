import './Toast.css'

/**
 * ToastContainer – exibe notificações temporárias
 * Props:
 *   toasts: Array<{ id, message, type: 'success' | 'error' | 'info' }>
 *   onRemove: (id) => void
 */
export default function ToastContainer({ toasts, onRemove }) {
  const icons = { success: '✅', error: '❌', info: 'ℹ️' }

  return (
    <div className="toast-container">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className={`toast ${toast.type}`}
          onClick={() => onRemove(toast.id)}
          style={{ cursor: 'pointer' }}
        >
          <span>{icons[toast.type] || '🔔'}</span>
          {toast.message}
        </div>
      ))}
    </div>
  )
}
