import React from 'react';
import { navigate } from '@reach/router';
import Editor from '../../Components/Editor';
import { getCurrentUser } from '../../services/auth';
import { createRecipe } from '../../services/recipes';

export default function New() {
  const handleAddRecipe = async recipe => {
    const { uid } = getCurrentUser() || {};
    await createRecipe(uid, recipe);
    navigate('/');
  };
  return <Editor onSubmit={handleAddRecipe} />;
}
