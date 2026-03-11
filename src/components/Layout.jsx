import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import './Layout.css'

/**
 * Layout – shell das páginas privadas
 * Renderiza: Navbar + <Outlet /> (página filha)
 */
export default function Layout() {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="page-container">
        <Outlet />
      </main>
    </div>
  )
}
