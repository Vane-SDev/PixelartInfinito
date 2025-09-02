// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // <-- Esta es la línea que faltaba

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDt2bUrlrpFhw8GfsfXmR1gZ-zGRw2-tXc",
  authDomain: "pixelartinfinito.firebaseapp.com",
  projectId: "pixelartinfinito",
  storageBucket: "pixelartinfinito.appspot.com", // Corregí un pequeño error aquí, usualmente termina en .appspot.com
  messagingSenderId: "1056516854052",
  appId: "1:1056516854052:web:2b782340d9fa4ea56ce3b1",
  measurementId: "G-F091B7Q6TH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Exportar la instancia de la base de datos (Firestore) para usarla en otros archivos
export const db = getFirestore(app);
