import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/analytics";
const firebaseConfig = {
  apiKey: "AIzaSyCe0w0GEKwLGTke88kBosS6YlfedKrfzJw",
  authDomain: "message-1b1a1.firebaseapp.com",
  projectId: "message-1b1a1",
  storageBucket: "message-1b1a1.appspot.com",
  messagingSenderId: "230368877767",
  appId: "1:230368877767:web:4a27ae7d5101c5256a32e2",
  measurementId: "G-PQLDJ3SRBL",
};
firebase.initializeApp(firebaseConfig);
firebase.analytics();
const auth = firebase.auth();
const database = firebase.firestore();
export { auth, database };
export default firebase;
