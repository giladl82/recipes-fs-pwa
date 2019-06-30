import React from 'react';
import { navigate } from '@reach/router';
import { signInWithGoogle } from '../../services/auth';

import './login-options.css';

export default function Login() {
  const handleNavigateToLogin  = event => {
    event.preventDefault();
    navigate('/login/email');
  }
  return (
    <section className='main-container auth-panel'>
      <header>
        <h2 className='header__title'>התחבר באמצעות</h2>
      </header>
      <button className='login-options__button' onClick={signInWithGoogle}>
        <img src='https://upload.wikimedia.org/wikipedia/commons/2/20/Google-Logo.svg' alt='התחבר עם חשבון גוגל' />{' '}
      </button>
      <button className='login-options__button' onClick={handleNavigateToLogin}>
        <img
          src='/account.png'
          alt='שם משתמש וסיסמא'
        />
      </button>
    </section>
  );
}
