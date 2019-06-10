import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { navigate, Link } from '@reach/router';
import Editor from '../../Components/Editor';
import { getRecipe, updateRecipe } from '../../services/recipes';

export default function Edit({ id, user }) {
  const [recipe, setRecipe] = useState({});
  useEffect(() => {
    const loadRecipeData = async () => {
      setRecipe(await getRecipe(id));
    };

    loadRecipeData();
  }, [id]);

  const handleUpdateRecipe = async recipe => {
    await updateRecipe(recipe);
    navigate('/');
  };
  return (
    <>
      <Link className="back-link" to="/">
        חזרה לרשימת המתכונים
      </Link>
      <br />
      <br />
      {user && <Editor onSubmit={handleUpdateRecipe} uid={user.uid} recipe={recipe} />}
      <Link className="back-link back-link__closing" to="/">
        חזרה לרשימת המתכונים
      </Link>
    </>
  );
}

Edit.propTypes = {
  id: PropTypes.string.isRequired,
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired
  }).isRequired
};
