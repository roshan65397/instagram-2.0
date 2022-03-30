import { initializeApp, getApp, getApps } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAsdJYdoOnqNj8gN4JzgxouWazYk0Mq04M",
  authDomain: "insta-3-de9a2.firebaseapp.com",
  projectId: "insta-3-de9a2",
  storageBucket: "insta-3-de9a2.appspot.com",
  messagingSenderId: "267460550611",
  appId: "1:267460550611:web:33c6d19ed88d546fc95926",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export { app, db, storage };
