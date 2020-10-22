import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCp1lfisJ4cUsjDEN2Ld61lq6HFRLIfbw4",
  authDomain: "amzn-clone-2199.firebaseapp.com",
  databaseURL: "https://amzn-clone-2199.firebaseio.com",
  projectId: "amzn-clone-2199",
  storageBucket: "amzn-clone-2199.appspot.com",
  messagingSenderId: "1056769333446",
  appId: "1:1056769333446:web:81cbacf7a7b033e571dfc7",
  measurementId: "G-8CGYYFQPG5",
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
