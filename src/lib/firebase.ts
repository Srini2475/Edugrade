import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCDDZi3nd1jaGh3_CElL_fgxO2T5PhxI3U",
  authDomain: "edugrade-ai.firebaseapp.com",
  projectId: "edugrade-ai",
  storageBucket: "edugrade-ai.firebasestorage.app",
  messagingSenderId: "306789858325",
  appId: "1:306789858325:web:fa84d4eb2420ae5097e21c",
  measurementId: "G-J4KEEHD9BH"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();