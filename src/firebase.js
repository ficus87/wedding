// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCHFstprFK4yzx9WE1PYSmGIRLDI_ALNUE",
  authDomain: "wedding-20e54.firebaseapp.com",
  projectId: "wedding-20e54",
  storageBucket: "wedding-20e54.appspot.com",
  messagingSenderId: "253486846006",
  appId: "1:253486846006:web:115641eb91d9addcb10897"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);