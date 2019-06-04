import React, { useState } from 'react';
import { Link } from '@reach/router';
import './create-user.css';

export default function LoginByEmail() {
  const [formValues, setValues] = useState({});

  const handleInputChange = event => {
    const newValues = { ...formValues, [event.target.id]: event.target.value };
    setValues(newValues);
  };

  const handleSubmit = event => {
    event.preventDefault();
    alert(JSON.stringify(formValues));
  };

  return (
    <section className='login-options'>
      <header>
        <h2 className='login-header__title'>כניסה</h2>
      </header>
      <form onSubmit={handleSubmit}>
        <label className='login-form__label' htmlFor='email'>
          כתובת דוא"ל
        </label>
        <input
          className='login-form__input'
          onChange={handleInputChange}
          type='email'
          id='email'
          name='email'
          required
        />

        <label className='login-form__label' htmlFor='password'>
          סיסמה
        </label>
        <input
          className='login-form__input'
          onChange={handleInputChange}
          type='password'
          id='password'
          name='password'
          required
          minLength={6}
          autoComplete='new-password'
        />
        <br />
        <br />
        <div className='login-form__submit-container'>
          <input type='submit' value='הרשמה' />
        </div>
      </form>
      <Link to='/login/create'>משתמש חדש</Link>
    </section>
  );
}
