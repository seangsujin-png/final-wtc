import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCOMWYKnfBlB8LoUvoe9Gn9rJGNWghZE3g",
  authDomain: "myweb-71945.firebaseapp.com",
  projectId: "myweb-71945",
  storageBucket: "myweb-71945.firebasestorage.app",
  messagingSenderId: "994203116804",
  appId: "1:994203116804:web:a6508c952e9173a80f5c51"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);