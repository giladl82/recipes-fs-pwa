import React, { useState } from 'react';
import sanitize from 'sanitize-html';
// import Editor from 'nib-core';

import './editor.css';

export default function RecipeEditor({ onSubmit }) {
  const [formValues, setValues] = useState({});

  const setFormValues = (key, value) => {
    const newValues = { ...formValues, [key]: value };
    setValues(newValues);
  };

  const handleInputChange = event => {
    const value = sanitize(event.target.value.replace(/(?:\r\n|\r|\n)/g, '<br>'));
    setFormValues(event.target.name, value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    event.stopPropagation();
    onSubmit(formValues);
  };

  return (
    <div className='editor'>
      <input className='editor__title' onChange={handleInputChange} name='title' type='text' />
      <input className='editor__image' onChange={handleInputChange} name='image' type='file' />
      <div className='editor__content'>
        <textarea className='editor__content__input'
          name='text'
          onChange={handleInputChange}
        />
      </div>
      <button className='editor__submit' onClick={handleSubmit}>
        Save
      </button>
    </div>
  );
}
