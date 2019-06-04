import firebase, { firestore, firebaseAuth, firebaseStorage } from './firebase';

export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export const createUserProfile = async (user, additionalData) => {
  if (!user) return;

  // Get a reference to the place in the database where a user profile might be.
  const userRef = firestore.doc(`users/${user.uid}`);

  // Go and fetch the document from that location.
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { displayName, email, photoURL } = user;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.error('Error creating user', error.message);
    }
  }

  return await getUserProfile(user.uid);
};

export const getUserProfile = async uid => {
  if (!uid) return null;
  try {
    const userRef = firestore.doc(`users/${uid}`);
    const snapshot = await userRef.get();
    return { uid, ...snapshot.data() };
  } catch (error) {
    console.log(error);
  }
};

export const onAuthStateChanged = callback => firebaseAuth.onAuthStateChanged(callback);

export const getCurrentUser = () => firebaseAuth.currentUser;

export const signInWithGoogle = () => firebaseAuth.signInWithPopup(googleAuthProvider);

export const signup = async ({ email, password, displayName }) => {
  try {
    const { user } = await firebaseAuth.createUserWithEmailAndPassword(email, password);

    return createUserProfile(user, {
      displayName
    });
  } catch (error) {
    console.error(error);
  }
};

export const signOut = () => firebaseAuth.signOut();

export const updateProfile = (uid, displayName, photoURL) => {
  if (!uid) return null;
  try {
    const userRef = firestore.doc(`users/${uid}`);
    userRef.update({
      displayName,
      photoURL
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateUserProfile = (uid, file) => {
  if (file) {
    const fileType = file.name.split('.')[1]
    const fileName = `${new Date().getTime()}.${fileType}`;
    return firebaseStorage
      .ref(`/users/${uid}/${fileName}`)
      .put(file)
      .then(response => response.ref.getDownloadURL())
      .then(photoURL =>
        firestore.doc(`users/${uid}`).update({
          photoURL
        })
      );
  }
};
