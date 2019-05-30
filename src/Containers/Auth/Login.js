import React from 'react';
import { navigate } from '@reach/router';

import Logins from '../../Components/Auth/Logins';

export default function Login({ user }) {
  if (user) {
    navigate('/');
    return null;
  }

  return <Logins />;
}
