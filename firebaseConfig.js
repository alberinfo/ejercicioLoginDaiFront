import { initializeApp } from 'firebase/app';

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyCTkVRIo7Gx_44HwGGcFrsyp0RwUBKypOY',
  authDomain: 'ejerciciologindai.firebaseapp.com',
  databaseURL: 'https://ejerciciologindai.southamerica-east1.firebasedatabase.app',
  projectId: 'ejerciciologindai',
  storageBucket: 'ejerciciologindai.appspot.com',
  messagingSenderId: 'sender-id',
  appId: 'app-id',
  measurementId: 'G-measurement-id',
};

const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;