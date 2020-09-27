import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";


const FirebaseApp = firebase.initializeApp({
  apiKey: process.env.REACT_APP_KEY,
  authDomain: process.env.REACT_APP_DOMAIN,
  databaseURL: process.env.REACT_APP_DB,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID

});

export const auth = FirebaseApp.auth();
export const firestore = FirebaseApp.firestore();


