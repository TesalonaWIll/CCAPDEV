import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore' 

const firebaseConfig = {
  apiKey: "AIzaSyAqyoufAadauvaoYho1j04yPnhE3K4Ug1g",
  authDomain: "ribbit-website.firebaseapp.com",
  projectId: "ribbit-website",
  storageBucket: "ribbit-website.appspot.com",
  messagingSenderId: "46177706288",
  appId: "1:46177706288:web:1aa56379c1728caebe68f5",
  measurementId: "G-J0HHJ2PFQR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
