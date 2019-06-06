import React, { useEffect, useState } from 'react';
import { Router, Link, navigate } from '@reach/router';
import { onAuthStateChanged, createUserProfile } from '../../services/auth';

import logo from './logo.svg';
import Main from '../Main';
import New from '../New';
import Edit from '../Edit';
import LoginOptions from '../Auth/LoginOptions';
import Login from '../Auth/Login';
import Register from '../Auth/Register';
import Recipe from '../Recipe';

import UserDisplay from '../../Components/Auth/UserDisplay';

import './app.css';

function App() {
  const [user, setUser] = useState();
  const [ready, setReady] = useState();

  useEffect(() => {
    const unsubscribeMethods = onAuthStateChanged(async authUser => {
      const user = await createUserProfile(authUser);

      setReady(true);
      setUser(user);

      if (!user && window.location.pathname.indexOf('/login') < 0) {
        navigate('/login');
      } else if (user && window.location.pathname.indexOf('/login') >= 0) {
        navigate('/');
      }
    });
    return () => {
      unsubscribeMethods.forEach(method => {
        if (method && typeof method === 'function') {
          method();
        }
      });
    };
  }, []);

  return (
    <div className='app'>
      <header className='header'>
        <h1 className='header__title'>
          {user ? (
            <Link to='/'>
              <img className='header__logo' src={logo} alt='ספר המתכונים שלי' />
              ספר המתכונים שלי
            </Link>
          ) : (
            <>
              <img className='header__logo' src={logo} alt='ספר המתכונים שלי' />
              ספר המתכונים שלי
            </>
          )}
        </h1>
        <UserDisplay user={user} />
      </header>
      {ready && (
        <main className='container'>
          <Router>
            <Main path='/' user={user} />
            <LoginOptions path='login' />
            <Login path='login/email' />
            <Register path='login/create' />
            <Recipe path='recipe/:id' user={user} />
            <Edit path='recipe/edit/:id' user={user} />
            <New path='new' user={user} />
          </Router>
        </main>
      )}
    </div>
  );
}

export default App;
