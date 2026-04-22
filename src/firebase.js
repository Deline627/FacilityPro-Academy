import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAs-TRgoVzkBEVSkrtuwm3VKg_FCL_qHMM",
  authDomain: "facilitypro-academy.firebaseapp.com",
  projectId: "facilitypro-academy",
  storageBucket: "facilitypro-academy.firebasestorage.app",
  messagingSenderId: "531914810060",
  appId: "1:531914810060:web:4aa0b8b29c44d79e6b5869"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
