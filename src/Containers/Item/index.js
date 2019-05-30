import React, { useEffect } from 'react';

export default function Item({ id, user }) {
  useEffect(() => {
    if (user) {
      console.log('useEffect', id, user);
    }
  }, [id, user]);
  return <h1>Item</h1>;
}
