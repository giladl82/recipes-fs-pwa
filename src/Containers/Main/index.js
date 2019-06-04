import React, { useEffect, useState } from 'react';
import { navigate, Link } from '@reach/router';
import List from '../../Components/List';
import { firestore, firebaseAuth } from '../../Api/firebase';

import './main.css';

export default function Main({ user }) {
  const [isLoading, setLoadingState] = useState(true);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    async function getRecipes() {
      const myRecipes = firestore.collection('recipes').where('userId', '==', firebaseAuth.currentUser.uid);
      const snapshot = await myRecipes.get();
      const docs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      if (user) {
        setRecipes(docs);
      }
      
      setLoadingState(false);
    }

    if (user) {
      getRecipes();
    }
    return () => {
      return null;
    };
  }, []);

  /*
  useEffect(() => {
    const unSubscribe = firestore.collection('recipes').onSnapshot(snapshot => {
      const docs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setRecipes(docs);
      setLoadingState(false);
    });

    return () => unSubscribe();
  }, []);
  */

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }

    return () => {};
  }, [user]);

  return (
    <>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <Link className='link-button' to='new'>
            להוספה של מתכון חדש
          </Link>
          <List recipes={recipes} />
        </>
      )}
    </>
  );
}
