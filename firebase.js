import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAt-8Idk0EE9EFo5ueyPq3MYkyVuNkSVfo",
  authDomain: "personal-websi-5fafc.firebaseapp.com",
  projectId: "personal-websi-5fafc",
  storageBucket: "personal-websi-5fafc.appspot.com",
  messagingSenderId: "899815832674",
  appId: "1:899815832674:web:87b15450aa414a0dfae53b",
  measurementId: "G-49PTYZS2CW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
