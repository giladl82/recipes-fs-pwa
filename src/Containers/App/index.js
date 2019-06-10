import React, { Suspense, lazy, useEffect, useState } from 'react';
import { Router, Link, navigate } from '@reach/router';
import { onAuthStateChanged, createUserProfile } from '../../services/auth';

import logo from './logo.svg';
import UserDisplay from '../../Components/Auth/UserDisplay';
import './app.css';

const Main = lazy(() => import('../Main'));
const New = lazy(() => import('../New'));
const Edit = lazy(() => import('../Edit'));
const LoginOptions = lazy(() => import('../Auth/LoginOptions'));
const Login = lazy(() => import('../Auth/Login'));
const Register = lazy(() => import('../Auth/Register'));
const Recipe = lazy(() => import('../Recipe'));

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
    <div className="app">
      <header className="header">
        <h1 className="header__title">
          {user ? (
            <Link to="/">
              <img className="header__logo" src={logo} alt="ספר המתכונים שלי" />
              ספר המתכונים שלי
            </Link>
          ) : (
            <>
              <img className="header__logo" src={logo} alt="ספר המתכונים שלי" />
              ספר המתכונים שלי
            </>
          )}
        </h1>
        <UserDisplay user={user} />
      </header>
      {ready && (
        <Suspense fallback={null}>
          <main className="container">
            <Router>
              <Main path="/" user={user} />
              <LoginOptions path="login" />
              <Login path="login/email" />
              <Register path="login/create" />
              <Recipe path="recipe/:id" user={user} />
              <Edit path="recipe/edit/:id" user={user} />
              <New path="new" user={user} />
            </Router>
          </main>
        </Suspense>
      )}
    </div>
  );
}

export default App;
