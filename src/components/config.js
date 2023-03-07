// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA-ft95zKYgZrfGDrDHVGhL5xPSaV20yiQ",
  authDomain: "porjeto1-476a9.firebaseapp.com",
  projectId: "porjeto1-476a9",
  storageBucket: "porjeto1-476a9.appspot.com",
  messagingSenderId: "834501067334",
  appId: "1:834501067334:web:a8c8060f9ace782b4c8047",
  measurementId: "G-MVS99508D6"
};
// Inicializa Firebase
const app = initializeApp(firebaseConfig);
// inicializa store
export const db = getFirestore(app);
//autenticação
export const auth = getAuth(app);
//storage
export const storage = getStorage(app);