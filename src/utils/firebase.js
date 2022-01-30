import firebase from 'firebase';

let config = {
  apiKey: "AIzaSyBVU4jITdCm4Sljvlr1roQJb4lpF7iRFF8",
  authDomain: "ola-humano.firebaseapp.com",
  projectId: "ola-humano",
  storageBucket: "ola-humano.appspot.com",
  messagingSenderId: "383821408030",
  appId: "1:383821408030:web:8c03a3a81e355c893b4b0f",
};

let app = firebase.initializeApp(config);
export const db = app.firestore();
export const auth = app.auth();