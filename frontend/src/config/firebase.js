import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
const firebaseConfig = {
  apiKey: "AIzaSyAmQReXx_Ku0UyDA1gwSFJTgNKfuIozB4s",
  authDomain: "spaip4.firebaseapp.com",
  projectId: "spaip4",
  storageBucket: "spaip4.appspot.com",
  messagingSenderId: "794900612480",
  appId: "1:794900612480:web:e9dbed1c0e7e8e71baad65",
  measurementId: "G-Q5N7CQ0E7T"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);