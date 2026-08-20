import { Link, useNavigate } from 'react-router-dom';
import './login.css';
import { useState } from 'react';
import { REQUIRED_FORM_MESSAGE, fieldClass, isBlank } from '../../../utils/formValidation';

export const Login = () => {
  const [loginInfo, setLoginInfo] = useState("");
  const [fieldErrors, setFieldErrors] = useState({ email: false, password: false });
  const navigate = useNavigate();

  const handleSubmitLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const loginData = Object.fromEntries(new window.FormData(form));
    const {email, password} = loginData as {email: string, password: string};
    const errors = {
      email: isBlank(email),
      password: isBlank(password),
    };

    setFieldErrors(errors);
    if (errors.email || errors.password) {
      setLoginInfo(REQUIRED_FORM_MESSAGE);
      return;
    }

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
        <form onSubmit={handleSubmitLogin} noValidate>
          <h2>Ingresar</h2>
          <p className="form-subtitle">Usá tu email y contraseña para continuar</p>
          <label htmlFor="email">Email *</label>
          <input id="email" name='email' placeholder='leo.a@example.org' type="email" className={fieldClass(fieldErrors.email)} />
          <label htmlFor="password">Contraseña *</label>
          <input id="password" name='password' placeholder='••••••••' type="password" className={fieldClass(fieldErrors.password)} />
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
