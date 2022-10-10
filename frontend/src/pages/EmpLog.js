import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";


const firebaseConfig = {
  apiKey: "AIzaSyDflP_vDWj0KBe01IdVBuGUDcvCCSPAKIU",
  authDomain: "sheet-data-48b6a.firebaseapp.com",
  databaseURL: "https://sheet-data-48b6a-default-rtdb.firebaseio.com",
  projectId: "sheet-data-48b6a",
  storageBucket: "sheet-data-48b6a.appspot.com",
  messagingSenderId: "661160855667",
  appId: "1:661160855667:web:9d777eca13f23cd6714206",
  measurementId: "G-TRZ11GG5Z9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);