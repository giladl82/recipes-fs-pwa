import firebase from './firebase';

export const firebaseAuth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export const onAuthStateChanged = (callback) => firebaseAuth.onAuthStateChanged(callback);

export const getCurrentUser = () => firebaseAuth.currentUser;

export const signInWithGoogle = () => firebaseAuth.signInWithPopup(googleAuthProvider);

export const signOut = () => firebaseAuth.signOut();
