import React, { useEffect, useState } from 'react';
import { Link } from '@reach/router';
import { getRecipe } from '../../services/recipes';

import './recipe.css';

export default function Item({ id, user }) {
  const [recipe, setRecipe] = useState({});
  useEffect(() => {
    async function getCurrentRecipe() {
      const result = await getRecipe(id, user.uid);
      setRecipe(result);
    }
    if (user && id) {
      getCurrentRecipe();
    }
  }, [id, user]);
  return (
    <>
      <Link className='back-link' to='/'>
        חזרה לרשימת המתכונים
      </Link>
      <article className='recipe'>
        <h1 className='recipe__title'>{recipe.title}</h1>
        {recipe.image && <img className='recipe__image' src={recipe.image} alt={recipe.title} />}
        <p
          className='recipe__text'
          dangerouslySetInnerHTML={{
            __html: recipe.text
          }}
        />
      </article>
      <Link className='back-link back-link__closing' to='/'>
        חזרה לרשימת המתכונים
      </Link>
    </>
  );
}
