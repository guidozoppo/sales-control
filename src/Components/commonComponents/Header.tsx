import { Link } from 'react-router-dom'
import './Header.css'

export const Header = () => {
  return (
    <header className='nav-header'>
      <div>
        <Link to='/'>
          <i className="bi bi-box"></i>
          <h1>Sales Control</h1>
        </Link>
      </div>
      <div>
        <i className="bi bi-person"></i>
        <p>Profile</p>
      </div>
    </header>
  )
}