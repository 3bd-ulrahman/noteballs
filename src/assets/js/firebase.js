// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBk6GybswesHF6U8t3WWDfA_QZj57Yuu_A',
  authDomain: 'noteballs-1989f.firebaseapp.com',
  projectId: 'noteballs-1989f',
  storageBucket: 'noteballs-1989f.appspot.com',
  messagingSenderId: '25954924883',
  appId: '1:25954924883:web:5376fb3cf89a5e264809a6'
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth }