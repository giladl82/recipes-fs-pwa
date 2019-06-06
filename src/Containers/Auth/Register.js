import React from 'react';
import { signup } from '../../services/auth';

import RegisterForm from '../../Components/Auth/RegisterForm';

export default function CreateUser() {
  const handleSignup = data => {
    signup(data);
  };
  return (
    <main className='main-container'>
      <header>
        <h2 className='header__title'>צור משתמש חדש</h2>
      </header>
      <RegisterForm onSignup={handleSignup} />
    </main>
  );
}
