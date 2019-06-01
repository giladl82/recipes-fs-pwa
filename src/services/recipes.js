import { firestore } from './firebase';

const parseDoc = doc => ({
  id: doc.id,
  ...doc.data()
});

export const createRecipe = async (userId, recipe) => firestore.collection('recipes').add({ ...recipe, userId });

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

export const getAllRecipes = async userId => {
  const myRecipes = firestore.collection('recipes').where('userId', '==', userId);
  const snapshot = await myRecipes.get();
  const docs = snapshot.docs.map(doc => parseDoc(doc));

  return docs;
};

export const getRecipe = async (id, userId) => {
  const recipeRef = firestore.doc(`recipes/${id}`);
  const doc = await recipeRef.get();

  return parseDoc(doc);
};

const demoData = [
  {
    id: 1,
    title: 'המבורגר מטוווווורף',
    content:
      '<ol><li><p>בלה בלה בלה</p></li><li><p>בלה בלה</p></li><li><p>גם קצת בלה בלה</p></li><li><p>ואז בלה בלה</p></li><li><p>רוצה לומר בלה בלה</p></li></ol><p><br></p><p>מערבבים את כל <u>הבלה </u>עם הבלה בלה ואז יוצא לנו בלה <strong>בלה בלה</strong></p>',
    image: 'https://assets3.thrillist.com/v1/image/2797371/size/tl-horizontal_main_2x.jpg'
  },
  {
    id: 2,
    title: 'סלט בריאות לא בריא',
    content:
      '<ol><li><p>בלה בלה בלה</p></li><li><p>בלה בלה</p></li><li><p>גם קצת בלה בלה</p></li><li><p>ואז בלה בלה</p></li><li><p>רוצה לומר בלה בלה</p></li></ol><p><br></p><p>מערבבים את כל <u>הבלה </u>עם הבלה בלה ואז יוצא לנו בלה <strong>בלה בלה</strong></p>',
    image:
      'https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/epic-summer-salad.jpg'
  },
  {
    id: 3,
    title: 'ירקות חתוכים לחתיכות',
    content:
      '<ol><li><p>בלה בלה בלה</p></li><li><p>בלה בלה</p></li><li><p>גם קצת בלה בלה</p></li><li><p>ואז בלה בלה</p></li><li><p>רוצה לומר בלה בלה</p></li></ol><p><br></p><p>מערבבים את כל <u>הבלה </u>עם הבלה בלה ואז יוצא לנו בלה <strong>בלה בלה</strong></p>',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWHoqjCEIuPdm_EH-9DCvAjOim4fsYZYi_qhZjJZ6X_P4Lhb0j'
  },
  {
    id: 4,
    title: 'כריך עם פרצוף',
    content:
      '<ol><li><p>בלה בלה בלה</p></li><li><p>בלה בלה</p></li><li><p>גם קצת בלה בלה</p></li><li><p>ואז בלה בלה</p></li><li><p>רוצה לומר בלה בלה</p></li></ol><p><br></p><p>מערבבים את כל <u>הבלה </u>עם הבלה בלה ואז יוצא לנו בלה <strong>בלה בלה</strong></p>',
    image:
      'https://www.sciencenews.org/sites/default/files/2018/07/main/articles/072318_LR_pediatric-chemicals_feat.jpg'
  },
  {
    id: 5,
    title: 'כריך עם פרצוף',
    content:
      '<ol><li><p>בלה בלה בלה</p></li><li><p>בלה בלה</p></li><li><p>גם קצת בלה בלה</p></li><li><p>ואז בלה בלה</p></li><li><p>רוצה לומר בלה בלה</p></li></ol><p><br></p><p>מערבבים את כל <u>הבלה </u>עם הבלה בלה ואז יוצא לנו בלה <strong>בלה בלה</strong></p>',
    image:
      'https://www.sciencenews.org/sites/default/files/2018/07/main/articles/072318_LR_pediatric-chemicals_feat.jpg'
  },
  {
    id: 6,
    title: 'כריך עם פרצוף',
    content:
      '<ol><li><p>בלה בלה בלה</p></li><li><p>בלה בלה</p></li><li><p>גם קצת בלה בלה</p></li><li><p>ואז בלה בלה</p></li><li><p>רוצה לומר בלה בלה</p></li></ol><p><br></p><p>מערבבים את כל <u>הבלה </u>עם הבלה בלה ואז יוצא לנו בלה <strong>בלה בלה</strong></p>',
    image:
      'https://www.sciencenews.org/sites/default/files/2018/07/main/articles/072318_LR_pediatric-chemicals_feat.jpg'
  },
  {
    id: 7,
    title: 'כריך עם פרצוף',
    content:
      '<ol><li><p>בלה בלה בלה</p></li><li><p>בלה בלה</p></li><li><p>גם קצת בלה בלה</p></li><li><p>ואז בלה בלה</p></li><li><p>רוצה לומר בלה בלה</p></li></ol><p><br></p><p>מערבבים את כל <u>הבלה </u>עם הבלה בלה ואז יוצא לנו בלה <strong>בלה בלה</strong></p>',
    image:
      'https://www.sciencenews.org/sites/default/files/2018/07/main/articles/072318_LR_pediatric-chemicals_feat.jpg'
  }
].sort((a, b) => {
  return a.title > b.title ? 0 : -1;
});
