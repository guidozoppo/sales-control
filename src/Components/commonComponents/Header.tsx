import { Link, useLocation } from 'react-router-dom'
import './Header.css'

export const Header = () => {
  const location = useLocation();
  
  return (
    <header className='nav-header'>
      <div>
        <Link to='/'>
          <i className="bi bi-box"></i>
          <h1>Sales Control</h1>
        </Link>
      </div>
      {location.pathname != '/login' && <div>
        <i className="bi bi-person"></i>
        <p>Profile</p>
      </div>}
    </header>
  )
}