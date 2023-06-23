// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore,collection} from 'firebase/firestore'
const firebaseConfig = {
  apiKey: "AIzaSyBKQW7I_M4pHdT0EK-0_8KNLZ55m9cH9x0",
  authDomain: "filmyverse-48c76.firebaseapp.com",
  projectId: "filmyverse-48c76",
  storageBucket: "filmyverse-48c76.appspot.com",
  messagingSenderId: "118272285910",
  appId: "1:118272285910:web:1b35f37f98423e53b33d77"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const  db = getFirestore(app);
export const moviesRef = collection(db,"movies")
export const reviewsRef = collection(db,"reviews")
export const usersRef = collection(db,"users")
export default app;