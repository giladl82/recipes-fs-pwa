import { firebaseStorage } from './firebase';

export const uploadFile = (uid, file) => {
  if (file) {
    const fileType = file.name.split('.')[1];
    const fileName = `${new Date().getTime()}.${fileType}`;
    return firebaseStorage
      .ref(`/users/${uid}/${fileName}`)
      .put(file)
      .then(response => response.ref.getDownloadURL())
      .then(photoURL => photoURL);
  }
};
