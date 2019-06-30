import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from '@reach/router';
import { getAllRecipes } from '../../services/recipes';
import { setRecipes } from '../../store/Recipes/actions';
import List from '../../Components/List';
import loader from './loader.gif';

import './main.css';

export default function Main({ user }) {
  const dispatch = useDispatch();
  const recipes = useSelector(state => state.recipes);
  const [isLoading, setLoadingState] = useState(true);
  // const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    async function getRecipes() {
      if (user) {
        const docs = await getAllRecipes(user.uid);
        dispatch(setRecipes(docs));
      }

      setLoadingState(false);
    }

    if (user) {
      getRecipes();
    }
    return () => {
      return null;
    };
  }, [user]);

  const handleItemDeleted = id => {
    dispatch(setRecipes(recipes.filter(recipe => recipe.id !== id)));
  };

  return (
    <>
      {isLoading ? (
        <img className='loading' src={loader} alt='' />
      ) : (
        <div className='list-container'>
          <Link className='link-button' to='new'>
            להוספה של מתכון חדש
          </Link>
          <List recipes={recipes} user={user} onItemDeleted={handleItemDeleted} />
        </div>
      )}
    </>
  );
}

Main.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired
  })
};
