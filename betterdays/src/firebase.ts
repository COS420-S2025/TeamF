import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCGwhJo3NDiKpt2pI27KX-WhUFIqX9hRwI",
  authDomain: "betterdays-892d3.firebaseapp.com",
  projectId: "betterdays-892d3",
  storageBucket: "betterdays-892d3.firebasestorage.app",
  messagingSenderId: "619443596607",
  appId: "1:619443596607:web:6c8da16199758efd9d378a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);