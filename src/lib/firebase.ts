// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  "projectId": "jayas-universe",
  "appId": "1:550950026368:web:f4b90d4f771020b9fb3a65",
  "storageBucket": "jayas-universe.firebasestorage.app",
  "apiKey": "YOUR_API_KEY_NEEDS_TO_BE_HERE",
  "authDomain": "jayas-universe.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "550950026368"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { db };