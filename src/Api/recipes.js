import { firestore } from './firebase';

export const getAllRecipes = () => {
  return new Promise(resolve => {
    const unSubscribe = firestore.collection('recipes').onSnapshot(snapshot => {
      const docs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      resolve({
        docs,
        unSubscribe
      });
    });
  });
};
