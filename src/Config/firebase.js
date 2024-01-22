// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBHasaeJHyT-78-kidsX3klke7kb4BKzZc",
  authDomain: "task-manager-f7125.firebaseapp.com",
  projectId: "task-manager-f7125",
  storageBucket: "task-manager-f7125.appspot.com",
  messagingSenderId: "306096982029",
  appId: "1:306096982029:web:8e801827d5fa57bb766d44"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);