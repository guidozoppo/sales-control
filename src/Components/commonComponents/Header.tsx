import { Link, NavLink, useLocation } from 'react-router-dom'
import './Header.css'

export const Header = () => {
  const location = useLocation();
  
  return (
    <header className='nav-header'>
      <Link className="brand" to='/'>
        <span className="brand-mark">
          <i className="bi bi-graph-up-arrow"></i>
        </span>
        <div>
          <h1>Sales Control</h1>
          <small>Panel de gestión</small>
        </div>
      </Link>

      {location.pathname !== '/login' && (
        <nav className="header-nav">
          <NavLink to="/" end>Inicio</NavLink>
          <NavLink to="/registerSale">Ventas</NavLink>
          <NavLink to="/inventory">Inventario</NavLink>
          <NavLink to="/customers">Clientes</NavLink>
          <NavLink to="/salesReports">Reportes</NavLink>
        </nav>
      )}

      {location.pathname !== '/login' && (
        <Link className="profile-chip" to="/login">
          <i className="bi bi-person-circle"></i>
          <span>Perfil</span>
        </Link>
      )}
    </header>
  )
}
