import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
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
  }, [user]);

  const handleItemDeleted = id => {
    setRecipes(recipes.filter(recipe => recipe.id !== id));
  };

  return (
    <>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="list-container">
          <Link className="link-button" to="new">
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
