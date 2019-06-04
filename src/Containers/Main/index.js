import React, { useEffect, useState } from 'react';
import { Link } from '@reach/router';
import List from '../../Components/List';
import { getAllRecipes } from '../../services/recipes';
import './main.css';

export default function Main({ user }) {
  const [isLoading, setLoadingState] = useState(true);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    async function getRecipes() {
      if (user) {
        const docs = await getAllRecipes(user.uid);
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
  }, [user, recipes.length]);

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

  return (
    <>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <div className='list-container'>
          <Link className='link-button' to='new'>
            להוספה של מתכון חדש
          </Link>
          <List recipes={recipes} />
        </div>
      )}
    </>
  );
}
