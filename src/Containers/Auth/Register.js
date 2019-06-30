import React from 'react';
import { signup } from '../../services/auth';

import RegisterForm from '../../Components/Auth/RegisterForm';

import './login-options.css'

export default function CreateUser() {
  const handleSignup = data => {
    signup(data);
  };
  return (
    <section className='main-container auth-panel'>
      <header>
        <h2 className='header__title'>צור משתמש חדש</h2>
      </header>
      <RegisterForm onSignup={handleSignup} />
    </section>
  );
}
