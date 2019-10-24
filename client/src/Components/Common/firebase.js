import firebase from "firebase";
import "firebase/storage";

const config = {
  apiKey: "AIzaSyBjtJWP9H9ezHqbWNPAtUkQ85uWwJxFJZA",
  authDomain: "menlyn-home-care-agency.firebaseapp.com",
  databaseURL: "https://menlyn-home-care-agency.firebaseio.com",
  projectId: "menlyn-home-care-agency",
  storageBucket: "menlyn-home-care-agency.appspot.com",
  messagingSenderId: "142230964306",
  appId: "1:142230964306:web:c088ba83b87fc314b0778b",
  measurementId: "G-2B0L3M45XN"
};
firebase.initializeApp(config);

export default firebase;
