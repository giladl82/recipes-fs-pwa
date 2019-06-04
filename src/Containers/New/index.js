import React from 'react';
import { navigate } from '@reach/router';
import Editor from '../../Components/Editor';
import { firestore, firebaseAuth } from '../../Api/firebase';

export default function New() {
  const handleAddRecipe = async recipe => {
    const { uid } = firebaseAuth.currentUser || {};
    await firestore.collection('recipes').add({ ...recipe, userId: uid });
    navigate('/');
  };
  return <Editor onSubmit={handleAddRecipe} />;
}
