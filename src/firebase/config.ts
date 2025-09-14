import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Configuração do Firebase (do painel que você copiou)
const firebaseConfig = {
  apiKey: "AIzaSyAHMu8mQqbYPYCM1BaF1W7V-erFHIu-l7o",
  authDomain: "bibliotecaapp-894a7.firebaseapp.com",
  projectId: "bibliotecaapp-894a7",
  storageBucket: "bibliotecaapp-894a7.firebasestorage.app",
  messagingSenderId: "540554811973",
  appId: "1:540554811973:web:326c9d0883063533ea612c",
  measurementId: "G-W4B4PPN5DH", // pode deixar aqui, mas não vamos usar
};

// Inicializa o app Firebase
const app = initializeApp(firebaseConfig);

// Exporta os serviços que vamos usar no app
export const auth = getAuth(app);
export const db = getFirestore(app);
