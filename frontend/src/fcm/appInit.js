import { initializeApp } from "firebase/app";
import firebaseConfig from "../utils/firebase-config";

const firebaseapp = initializeApp(firebaseConfig);

export default firebaseapp;