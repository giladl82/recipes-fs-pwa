import React from 'react';
import PropTypes from 'prop-types';
import { Link, navigate } from '@reach/router';
import Editor from '../../Components/Editor';
import { createRecipe } from '../../services/recipes';

export default function New({ user }) {
  const handleAddRecipe = async recipe => {
    await createRecipe(user.uid, recipe);
    navigate('/');
  };

  return (
    <>
      <Link className="back-link" to="/">
        חזרה לרשימת המתכונים
      </Link>
      <br />
      <br />
      {user && <Editor onSubmit={handleAddRecipe} uid={user.uid} />}
      <Link className="back-link back-link__closing" to="/">
        חזרה לרשימת המתכונים
      </Link>
    </>
  );
}

New.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired
  }).isRequired
};
