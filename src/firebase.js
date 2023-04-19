// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD_Vbm4cgSU3XWd5N9a6L7RVsVXWif90x4",
  authDomain: "rubrica-web2.firebaseapp.com",
  projectId: "rubrica-web2",
  storageBucket: "rubrica-web2.appspot.com",
  messagingSenderId: "660600659825",
  appId: "1:660600659825:web:d13dfd9601345018af60d0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
export {db}