import './StatusBadge.css'

/**
 * StatusBadge – exibe o status de validade de um item
 * Props:
 *   status: 'ok' | 'warn' | 'danger'
 *   daysLeft: number
 */
export default function StatusBadge({ status, daysLeft }) {
  const config = {
    ok:     { label: daysLeft === 0 ? 'Vence hoje' : `${daysLeft} dias`, icon: '✅' },
    warn:   { label: daysLeft === 0 ? 'Vence hoje' : `${daysLeft} dias`, icon: '⚠️' },
    danger: { label: daysLeft === 0 ? 'Venceu hoje' : `Venceu há ${Math.abs(daysLeft)} dia${Math.abs(daysLeft) !== 1 ? 's' : ''}`, icon: '❌' },
  }

  const { label, icon } = config[status] || config.ok

  if (status === 'danger' && daysLeft < 0) {
    return <span className="badge danger">{icon} Vencido</span>
  }

  return <span className={`badge ${status}`}>{icon} {label}</span>
}
