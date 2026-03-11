import { Link } from 'react-router-dom'
import './NotFoundPage.css'

export default function NotFoundPage() {
  return (
    <div className="not-found">
      <h1>404</h1>
      <p>Página não encontrada.</p>
      <Link to="/dashboard" className="btn btn-primary" style={{ marginTop: 12 }}>
        ← Voltar ao Dashboard
      </Link>
    </div>
  )
}
