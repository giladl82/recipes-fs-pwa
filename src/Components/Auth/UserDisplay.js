import React from 'react';
import PropTypes from 'prop-types';
import { signOut } from '../../services/auth';
import './user-display.css';

export default function UserDisplay({ user }) {
  return (
    <>
      {user ? (
        <div className="user-display">
          <img className="user-display__avatar" src={user.photoURL} alt={user.displayName} /> {user.displayName}{' '}
          <button className="user-display__signOut" onClick={signOut}>
            התנתקות
          </button>
        </div>
      ) : null}
    </>
  );
}

UserDisplay.propTypes = {
  user: PropTypes.shape({
    displayName: PropTypes.string,
    photoURL: PropTypes.string
  })
};
