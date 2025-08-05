// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC-X7-t3vYInFXlY4EeAcWZ6FCmPGaZ0Qk",
  authDomain: "jayas-universe.firebaseapp.com",
  projectId: "jayas-universe",
  storageBucket: "jayas-universe.firebasestorage.app",
  messagingSenderId: "550950026368",
  appId: "1:550950026368:web:f4b90d4f771020b9fb3a65"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, app };
