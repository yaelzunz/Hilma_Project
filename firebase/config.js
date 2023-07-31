// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
    // apiKey: process.env.REACT_APP_API_KEY,
    // authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    // projectID: process.env.REACT_APP_PROJECT_ID,
    // storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    // messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    // appId: process.env.REACT_APP_APP_ID,
    apiKey: "AIzaSyDSw7PgI_jJj8HnMM5P_z61MILjUqeTP_U",
  authDomain: "hilmaproject.firebaseapp.com",
  projectId: "hilmaproject",
  storageBucket: "hilmaproject.appspot.com",
  messagingSenderId: "618674422620",
  appId: "1:618674422620:web:85a2f2db39d025af5c3799"
  

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
