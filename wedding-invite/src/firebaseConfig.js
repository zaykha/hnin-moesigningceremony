// src/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyC822p3YX1z-fe-g5LVwLHsWQICXpL2_Ek",
    authDomain: "mzk-hys-wedding-invite.firebaseapp.com",
    projectId: "mzk-hys-wedding-invite",
    storageBucket: "mzk-hys-wedding-invite.appspot.com",
    messagingSenderId: "982539872294",
    appId: "1:982539872294:web:2fb2027a7f445ff9dddee7"
  };
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
