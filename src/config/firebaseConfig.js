// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD5dMS1D3ujzImhTBE2X88x629JWCbNiFs",
  authDomain: "react-to-do-app-with-database.firebaseapp.com",
  projectId: "react-to-do-app-with-database",
  storageBucket: "react-to-do-app-with-database.appspot.com",
  messagingSenderId: "980668151314",
  appId: "1:980668151314:web:fd2d40233c39ac144d8acb",
  measurementId: "G-6TFQT6S0LY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;