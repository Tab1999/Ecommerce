import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyDIH6xMgNBnb_nRBpEvG_fmrrCl5NP4gZE",
    authDomain: "signup-2a299.firebaseapp.com",
    projectId: "signup-2a299",
    storageBucket: "signup-2a299.appspot.com",
    messagingSenderId: "975503454381",
    appId: "1:975503454381:web:410315f10b4eac0c4f1624",
    measurementId: "G-VCKF1K8XEV"
  };
  

const app = initializeApp(firebaseConfig);
export const database = getAuth(app)