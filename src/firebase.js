import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDuw4NXXyiY7t_-jx8tX5GZvBj5PkhGCIw",
  authDomain: "undangan-siti-septian.firebaseapp.com",
  projectId: "undangan-siti-septian",
  storageBucket: "undangan-siti-septian.firebasestorage.app",
  messagingSenderId: "782668117756",
  appId: "1:782668117756:web:f03f62b428ead5f8c20979",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
