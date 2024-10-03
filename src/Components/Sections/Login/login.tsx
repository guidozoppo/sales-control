import { Link, useNavigate } from 'react-router-dom';
import './login.css';
import { useState } from 'react';

export const Login = () => {
  // CHEQUEAR SI EL USUARIO ESTÁ LOGUEADO, SI ESTÁ LOGUEADO MANDAR AL HOME DE UNA
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
    // const existEmailINBD = check if exists email in bd
    /*if (!existEmailINBD) {
      setLoginInfo('Email not registered');
      return;
    }*/
    
    const passwordBD = "asdasd";  //buscar la contraseña con el mail en la bd

    if (password !== passwordBD) {
      setLoginInfo("Wrong password");
      return;
    }

    setLoginInfo("");
    navigate("/");
  }
  
  return (
    <div className="login-container">
      <div className='welcome-container'>
        <h1>WELCOME TO SALES CONTROL</h1>
      </div>
      <div className='form-container'>
        <form onSubmit={handleSubmitLogin}>
          <h2>LOGIN</h2>
          <div>
            <input name='email' placeholder='Email Adress' type="mail" />
          </div>
          <div>
            <input name='password' placeholder='Password' type="password" />
          </div>
          <button>Login</button>
          <div className='loginInfo'>
            {loginInfo && <h4>{loginInfo}</h4>}
          </div>
          <Link to="/resetPassword">
            <h4>Forgot Password?</h4>
          </Link>
        </form>
      </div>
    </div>
  )
}