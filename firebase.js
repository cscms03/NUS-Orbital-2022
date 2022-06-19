// Import the functions you need from the SDKs you need
import { getApp, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB44VHhIYg-uYjBZle0qnSzgdQON-i3BYU",
  authDomain: "nus-orbital-2022.firebaseapp.com",
  databaseURL:
    "https://nus-orbital-2022-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "nus-orbital-2022",
  storageBucket: "nus-orbital-2022.appspot.com",
  messagingSenderId: "667775733054",
  appId: "1:667775733054:web:11bd5d1113a915c483306f",
  measurementId: "G-MXPLS2FVQX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
export { app, auth };
