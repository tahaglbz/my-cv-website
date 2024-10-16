// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBBhNxdroghFfVp8WNforp9gEggQlVaTk0",
  authDomain: "tahadev-8c26c.firebaseapp.com",
  projectId: "tahadev-8c26c",
  storageBucket: "tahadev-8c26c.appspot.com",
  messagingSenderId: "1099257851699",
  appId: "1:1099257851699:web:31acc440c8a17931591846",
  measurementId: "G-0NB25KLNYT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
