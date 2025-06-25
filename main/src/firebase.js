import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAHwPshjipm6ZeDIx9TP_Rwn-w1I2YkZdE",
  authDomain: "grouptask-4588c.firebaseapp.com",
  projectId: "grouptask-4588c",
  storageBucket: "grouptask-4588c.firebasestorage.app",
  messagingSenderId: "171229055631",
  appId: "1:171229055631:web:bec4f5aa000618722fbefa",
};
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
