import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import sanitize from 'sanitize-html';
import { uploadFile } from '../../services/storage';
import { getFileFromInput } from '../../services/utils';
import './editor.css';

export default function RecipeEditor({ uid, recipe, onSubmit }) {
  const [formValues, setValues] = useState({});
  const fileRef = useRef();
  const editorRef = useRef();

  useEffect(() => {
    const height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    editorRef.current.style.height = `${height - 170}px`;
    if (recipe) {
      setValues(recipe);
    }
  }, [uid, recipe]);

  const setFormValues = (key, value) => {
    const newValues = { ...formValues, [key]: value };
    setValues(newValues);

    return newValues;
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
    const photoImage = getFileFromInput(fileRef.current);
    const photoURL = photoImage ? await uploadFile(uid, photoImage) : formValues.image;
    const dataToSave = setFormValues('image', photoURL || '');

    onSubmit(dataToSave);
  };

  return (
    <div className='editor' ref={editorRef}>
      <label className='form__label' htmlFor='title'>
        כותרת
      </label>
      <input
        id='title'
        className='form__input'
        value={formValues.title || ''}
        onChange={handleInputChange}
        name='title'
        type='text'
      />
      <input
        className='form__input--hidden'
        type='file'
        ref={fileRef}
        id='photoURL'
        required
        accept='.gif, .jpg, .png'
      />
      <br />
      <button onClick={handleFileClick} className='form__file-rep'>
        <i className='fas fa-cloud-upload-alt' /> בחר תמונה
      </button>
      <label className='form__label' htmlFor='text'>
        המתכון
      </label>

      <textarea
        id='text'
        value={formValues.text ? formValues.text.replace(/<br\s*[/]?>/gi, '\n') : ''}
        className='form__input--multiline'
        name='text'
        onChange={handleInputChange}
      />

      <button className='form__submit' onClick={handleSubmit}>
        <i className='fas fa-check' /> שמירה
      </button>
    </div>
  );
}

RecipeEditor.propTypes = {
  uid: PropTypes.string.isRequired,
  recipe: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    text: PropTypes.string,
    image: PropTypes.string
  }),
  onSubmit: PropTypes.func.isRequired
};
