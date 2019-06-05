import React, { useState, useRef } from 'react';
import sanitize from 'sanitize-html';
import { uploadFile } from '../../services/storage';

import './editor.css';

export default function RecipeEditor({ uid, onSubmit }) {
  const [formValues, setValues] = useState({});
  const fileRef = useRef(null);

  const setFormValues = (key, value) => {
    const newValues = { ...formValues, [key]: value };
    setValues(newValues);
  };

  const handleInputChange = event => {
    const value = sanitize(event.target.value.replace(/(?:\r\n|\r|\n)/g, '<br>'));
    setFormValues(event.target.name, value);
  };

  const handleFileClick = evnet => {
    fileRef.current.click();
  };

  const handleSubmit = async event => {
    event.preventDefault();
    event.stopPropagation();
    const photoImage =
      fileRef.current && fileRef.current.files && fileRef.current.files[0] ? fileRef.current.files[0] : null;
    const photoURL = await uploadFile(uid, photoImage);

    setFormValues('image', photoURL);

    onSubmit(formValues);
  };

  return (
    <div className='editor'>
      <input className='editor__title' onChange={handleInputChange} name='title' type='text' />
      <input
        className='login-form__input login-form__input-hidden'
        type='file'
        ref={fileRef}
        id='photoURL'
        required
        accept='.gif, .jpg, .png'
      />
      <button onClick={handleFileClick} className='login-form__file-rep'>
        <i className='fas fa-cloud-upload-alt' /> בחר תמונה
      </button>
      <div className='editor__content'>
        <textarea className='editor__content__input' name='text' onChange={handleInputChange} />
      </div>
      <button className='editor__submit' onClick={handleSubmit}>
        <i className='fas fa-check' /> שמירה
      </button>
    </div>
  );
}
