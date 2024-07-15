// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCJg9kPWXpe3FQ1kzYXz6XO5ZDaE4_YLNQ",
  authDomain: "app-music-ok.firebaseapp.com",
  projectId: "app-music-ok",
  storageBucket: "app-music-ok.appspot.com",
  messagingSenderId: "387474946788",
  appId: "1:387474946788:web:dfa18f2d87897cf6050af1",
  measurementId: "G-KJF5ZFVLXR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, analytics, db, storage };
