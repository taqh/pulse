// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCXabhLGt3kRso2uyq5otrLUbE3tGC4Rwc",
  authDomain: "daza-blog.firebaseapp.com",
  projectId: "daza-blog",
  storageBucket: "daza-blog.appspot.com",
  messagingSenderId: "126692486801",
  appId: "1:126692486801:web:6ca1a7ce087e7070d01930",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)
