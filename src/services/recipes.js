import { firestore } from './firebase';

const parseDoc = doc => ({
  id: doc.id,
  ...doc.data()
});

export const createRecipe = async (uid, recipe) => firestore.collection('recipes').add({ ...recipe, uid });

export const getAllRecipesLive = () => {
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

export const getAllRecipes = async uid => {
  const myRecipes = firestore.collection('recipes').where('uid', '==', uid);
  const snapshot = await myRecipes.get();
  const docs = snapshot.docs.map(doc => parseDoc(doc));

  return docs;
};

export const getRecipe = async (id, uid) => {
  const recipeRef = firestore.doc(`recipes/${id}`);
  const doc = await recipeRef.get();

  return parseDoc(doc);
};