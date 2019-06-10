import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { getFileFromInput } from '../../services/utils';

export default function RegisterForm({ onSignup }) {
  const [formValues, setValues] = useState({});
  const fileRef = useRef(null);
  const pwdConfirmRef = useRef(null);

  const handleInputChange = event => {
    const newValues = { ...formValues, [event.target.id]: event.target.value };
    setValues(newValues);
  };

  const handleFileClick = () => {
    fileRef.current.click();
  };

  const handlePasswordFieldsChange = event => {
    pwdConfirmRef.current.setCustomValidity('')
    if(formValues.password !== formValues['password-confirm']) {
      pwdConfirmRef.current.setCustomValidity('Password and password confirm do not match')
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    const photoImage = getFileFromInput(fileRef.current);

    onSignup({ ...formValues, photoImage });
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
        onBlur={handlePasswordFieldsChange}
      />

      <label className='form__label' htmlFor='password-confirm'>
        אימות סיסמה
      </label>
      <input
        className='form__input'
        onChange={handleInputChange}
        type='password'
        id='password-confirm'
        name='password-confirm'
        ref={pwdConfirmRef}
      />

      <label className='form__label' htmlFor='displayName'>
        שם לתצוגה
      </label>
      <input className='form__input' onChange={handleInputChange} type='text' id='displayName' minLength={4} required />

      <label className='form__label' htmlFor='photoURL'>
        תמונת פרופיל
      </label>
      <input
        className='form__input--hidden'
        onChange={handleInputChange}
        type='file'
        ref={fileRef}
        id='photoURL'
        accept='.gif, .jpg, .png'
      />
      <button onClick={handleFileClick} className='form__file-rep' style={{ width: '100%' }}>
        <i className='fas fa-cloud-upload-alt' /> בחר תמונה
      </button>

      <div className='form__submit-container'>
        <button className='form__submit'>
          <i className='fas fa-user-check' /> הרשמה
        </button>
      </div>
    </form>
  );
}

RegisterForm.propTypes = {
  onSignup: PropTypes.func.isRequired
};
