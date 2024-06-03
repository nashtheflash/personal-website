import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDuPpxS9pthcVLksqeG1JPtuESYeAAkLVE",
  authDomain: "wired-woodsman.firebaseapp.com",
  projectId: "wired-woodsman",
  storageBucket: "wired-woodsman.appspot.com",
  messagingSenderId: "451357413235",
  appId: "1:451357413235:web:28689f1f9f3e85f5ff7f06"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
