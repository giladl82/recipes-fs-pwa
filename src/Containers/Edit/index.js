import React, { useRef } from 'react';
import { navigate } from '@reach/router';
import Editor from '../../Components/Editor';
import { getCurrentUser } from '../../services/auth';
// import { updateRecipe } from '../../services/recipes';

export default function New({}) {
  const user = useRef(getCurrentUser() || {});

  const handleAddRecipe = async recipe => {
   // await updateRecipe(user.current.uid, recipe);
    navigate('/');
  };
  return <Editor onSubmit={handleAddRecipe} uid={user.current.uid} />;
}
