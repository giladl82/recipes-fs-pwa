import React, { useEffect, useState } from 'react';
import { Router, navigate } from '@reach/router';
import { onAuthStateChanged } from '../../services/auth';

import Main from '../Main';
import New from '../New';
import LoginOptions from '../Auth/LoginOptions';
import Item from '../Item';

import UserDisplay from '../../Components/Auth/UserDisplay';

import './style.css';

function App() {
  const [user, setUser] = useState();
  const [ready, setReady] = useState();

  useEffect(() => {
    const unsubscribeAuthChange = onAuthStateChanged(user => {
      setReady(true);
      setUser(user);

      if(!user && window.location.pathname.indexOf('/logins') < 0) {
        navigate('/logins')
      }
    }); 
    return () => {
      unsubscribeAuthChange();
    };
  });

  return (
    <div className='app'>
      <header className='header'>
        <h1 className='header__title'>ספר המתכונים שלי</h1>
        <UserDisplay user={user} />
      </header>
      {ready && (
        <main className='container'>
          <Router>
            <Main path='/' user={user} />
            <LoginOptions path='login' user={user} />
            <Item path='item/:id' user={user} />
            <New path='new' user={user} />
          </Router>
        </main>
      )}
    </div>
  );
}

export default App;
