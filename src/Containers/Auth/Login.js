import React from 'react';
import { Link } from '@reach/router';
import { signIn } from '../../services/auth';
import LoginForm from '../../Components/Auth/LoginForm';

import './login-options.css'

export default function Login() {
  const handleLogin = data => {
    signIn(data);
  };

  return (
    <section className='main-container auth-panel'>
      <header>
        <h2 className='header__title'>כניסה</h2>
      </header>
      <LoginForm onLogin={handleLogin} />
      <Link className='auth-panel__register-link' to='/login/create'>משתמש חדש</Link>
    </section>
  );
}
