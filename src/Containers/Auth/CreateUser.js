import React, { useState } from 'react';
import { signup } from '../../services/auth';
import './login-options.css';

export default function CreateUser() {
  const [formValues, setValues] = useState({});

  const handleInputChange = event => {
    const newValues = { ...formValues, [event.target.id]: event.target.value };
    setValues(newValues);
  };

  const handlePasswordFieldsChange = event => {};

  const handleSubmit = async event => {
    event.preventDefault();
    await signup(formValues);
  };

  return (
    <section className='login-options'>
      <header>
        <h2 className='login-header__title'>צור משתמש חדש</h2>
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
          onBlur={handlePasswordFieldsChange}
        />

        <label className='login-form__label' htmlFor='password-confirm'>
          אימות סיסמה
        </label>
        <input
          className='login-form__input'
          onChange={handleInputChange}
          type='password'
          id='password-confirm'
          name='password-confirm'
        />

        <label className='login-form__label' htmlFor='displayName'>
          שם לתצוגה
        </label>
        <input
          className='login-form__input'
          onChange={handleInputChange}
          type='text'
          id='displayName'
          minLength={4}
          required
        />

        <label className='login-form__label' htmlFor='photoURL'>
          תמונת פרופיל
        </label>
        <input
          className='login-form__input'
          onChange={handleInputChange}
          type='file'
          id='photoURL'
          accept='.gif, .jpg, .png'
        />

        <div className='login-form__submit-container'>
          <input type='submit' value='הרשמה' />
        </div>
      </form>
    </section>
  );
}
