import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCF1TIyWGT-wD63jkriuxhMYX1A1044G-0",
  authDomain: "anbu-clinic-43c81.firebaseapp.com",
  projectId: "anbu-clinic-43c81",
  storageBucket: "anbu-clinic-43c81.appspot.com",
  messagingSenderId: "496719384260",
  appId: "1:496719384260:web:de7515ae8d1f24c0158391",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
