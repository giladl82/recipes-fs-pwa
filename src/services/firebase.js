import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBHmjDX0vvxufxcoeoyQJ__9WYRLhd5vhE",
  authDomain: "todo-fs-pwa.firebaseapp.com",
  databaseURL: "https://todo-fs-pwa.firebaseio.com",
  projectId: "todo-fs-pwa",
  storageBucket: "todo-fs-pwa.appspot.com",
  messagingSenderId: "546777320859",
  appId: "1:546777320859:web:5e7ac7d0cd18589c"
};

firebase.initializeApp(firebaseConfig);

/*---- firestore ----*/
export const firestore = firebase.firestore();

export default firebase;