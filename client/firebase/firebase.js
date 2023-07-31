
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCdBSEmdnT2Mw8mSjuOex_2J9ckXnWPc-A",
  authDomain: "expense-tracker-492f9.firebaseapp.com",
  projectId: "expense-tracker-492f9",
  storageBucket: "expense-tracker-492f9.appspot.com",
  messagingSenderId: "30485517894",
  appId: "1:30485517894:web:79b7ad6385a06324715c47"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);