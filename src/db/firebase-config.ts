import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCdLKVHSkIViQUeKmDPownqCxtQ0Uqj--k",
  authDomain: "memory-cardz.firebaseapp.com",
  projectId: "memory-cardz",
  storageBucket: "memory-cardz.appspot.com",
  messagingSenderId: "882302854456",
  appId: "1:882302854456:web:633913e8787f875a71cdcd",
  measurementId: "G-GRY2FWR070"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);