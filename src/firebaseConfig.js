import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBOgNjTq8KOdqujL29tIyAHVVk1MsyrdgQ",
  authDomain: "fir-frontend-608db.firebaseapp.com",
  projectId: "fir-frontend-608db",
  storageBucket: "fir-frontend-608db.appspot.com",
  messagingSenderId: "823510806850",
  appId: "1:823510806850:web:86c5526e315faca7db18db",
  measurementId: "G-WPB1T32K1R"
};


 const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();