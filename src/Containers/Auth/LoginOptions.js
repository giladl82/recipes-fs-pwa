import React from 'react';
import { navigate } from '@reach/router';
import { signInWithGoogle } from '../../services/auth';



export default function Login({ user }) {
  if (user) {
    navigate('/');
    return null;
  }

  return (
    <section className='login-options'>
    <header>
      <h2 className='header__title'>התחבר באמצעות</h2>
    </header>
    <button className='login-options__button' onClick={signInWithGoogle}>
      <img src='https://upload.wikimedia.org/wikipedia/commons/2/20/Google-Logo.svg' alt='התחבר עם חשבון גוגל' />{' '}
    </button>
    <button className='login-options__button'>
      <img
        src='https://www.totaldigitalsecurity.com/hs-fs/hubfs/TDS%20Brand%20Icons/TDS%20brand%20icon-%20private%20email%20account.png?width=614&name=TDS%20brand%20icon-%20private%20email%20account.png'
        alt='שם משתמש וסיסמא'
      />
    </button>
  </section>
  );
}
