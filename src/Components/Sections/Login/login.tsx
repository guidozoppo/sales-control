import { Link, useNavigate } from 'react-router-dom';
import './login.css';
import { useState } from 'react';

export const Login = () => {
  const [loginInfo, setLoginInfo] = useState("");
  const navigate = useNavigate();
  const handleSubmitLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const loginInfo = Object.fromEntries(new window.FormData(form));
    const {email, password} = loginInfo as {email: string, password: string};
    checkLoginInfo(email, password);
  }

  const checkLoginInfo = (email: string, password: string) => {
    const passwordBD = "asdasd";

    if (password !== passwordBD) {
      setLoginInfo("Contraseña incorrecta");
      return;
    }

    setLoginInfo("");
    navigate("/");
  }
  
  return (
    <div className="login-container">
      <div className='welcome-container'>
        <span className="brand-mark">
          <i className="bi bi-graph-up-arrow"></i>
        </span>
        <p className="eyebrow">Sales Control</p>
        <h1>Controlá tus ventas desde un solo lugar</h1>
        <p>Inventario, clientes y reportes en un panel simple para el día a día.</p>
      </div>
      <div className='form-container'>
        <form onSubmit={handleSubmitLogin}>
          <h2>Ingresar</h2>
          <p className="form-subtitle">Usá tu email y contraseña para continuar</p>
          <label htmlFor="email">Email</label>
          <input id="email" name='email' placeholder='leo.a@example.org' type="email" />
          <label htmlFor="password">Contraseña</label>
          <input id="password" name='password' placeholder='••••••••' type="password" />
          <button type="submit">
            <i className="bi bi-box-arrow-in-right"></i>
            Entrar
          </button>
          <div className='loginInfo'>
            {loginInfo && <h4>{loginInfo}</h4>}
          </div>
          <Link to="/resetPassword">¿Olvidaste tu contraseña?</Link>
        </form>
      </div>
    </div>
  )
}
