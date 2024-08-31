const { initializeApp } = require("firebase/app");
//import { getAnalytics } from "firebase/analytics";
const { getFirestore, collection } = require("firebase/firestore");
const firebaseConfig = {
  apiKey: "AIzaSyDGhxxmfheQPi87WbAMIMb4sE5t8p0D-6s",
  authDomain: "fir-functions-3d2bb.firebaseapp.com",
  projectId: "fir-functions-3d2bb",
  storageBucket: "fir-functions-3d2bb.appspot.com",
  messagingSenderId: "682482382906",
  appId: "1:682482382906:web:161daf2fb364fb60e69d03",
  measurementId: "G-BRVT5Z0L1F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const User = collection(db, "users");

module.exports = { User }