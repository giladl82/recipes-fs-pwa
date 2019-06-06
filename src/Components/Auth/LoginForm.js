import React, { useState } from 'react';

export default function LoginForm({ onLogin }) {
  const [formValues, setValues] = useState({});

  const handleInputChange = event => {
    const newValues = { ...formValues, [event.target.id]: event.target.value };
    setValues(newValues);
  };

  const handleSubmit = event => {
    event.preventDefault();
    onLogin(formValues);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label className='form__label' htmlFor='email'>
        כתובת דוא"ל
      </label>
      <input className='form__input' onChange={handleInputChange} type='email' id='email' name='email' required />

      <label className='form__label' htmlFor='password'>
        סיסמה
      </label>
      <input
        className='form__input'
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
      <div className='form__submit-container'>
        <button className='form__submit'>
          <i className='fas fa-sign-in-alt' /> כניסה
        </button>
      </div>
    </form>
  );
}
