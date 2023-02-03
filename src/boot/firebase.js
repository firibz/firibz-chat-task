// Firebase App (the core Firebase SDK) is always required and must be listed first
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBFk7gB6BbJWm9CoRX6Cc53R0kKCVdeKpU",
  authDomain: "firibz-chat.firebaseapp.com",
  projectId: "firibz-chat",
  storageBucket: "firibz-chat.appspot.com",
  messagingSenderId: "1020537454098",
  appId: "1:1020537454098:web:8ba065e44b18c7547422cb",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const firebaseDb = getDatabase(firebaseApp);

export { firebaseAuth, firebaseDb };
