import React, { useRef } from 'react';
import { navigate } from '@reach/router';
import Editor from '../../Components/Editor';
import { getCurrentUser } from '../../services/auth';
import { createRecipe } from '../../services/recipes';

export default function New() {
  const user = useRef(getCurrentUser() || {});

  const handleAddRecipe = async recipe => {
    await createRecipe(user.current.uid, recipe);
    navigate('/');
  };
  return <Editor onSubmit={handleAddRecipe} uid={user.current.uid} />;
}
