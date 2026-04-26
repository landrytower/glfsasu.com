import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getStorage, type FirebaseStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB36BUlrkkHRekkc_EyxNzwpQeSLt4u0Rg",
  authDomain: "lipanda-60aa3.firebaseapp.com",
  projectId: "lipanda-60aa3",
  storageBucket: "lipanda-60aa3.firebasestorage.app",
  messagingSenderId: "344338158024",
  appId: "1:344338158024:web:16f7df85f882453a0270fd",
  measurementId: "G-7ZJDQCQLPH",
};

// Lazy singletons — only initialised in the browser so Next.js SSR
// never pulls the Firebase client SDK into a server bundle.
let _app: FirebaseApp | undefined;
let _auth: Auth | undefined;
let _db: Firestore | undefined;
let _storage: FirebaseStorage | undefined;

function getApp() {
  if (!_app) {
    _app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
  }
  return _app;
}

export function getClientAuth() {
  if (!_auth) _auth = getAuth(getApp());
  return _auth;
}

export function getClientDb() {
  if (!_db) _db = getFirestore(getApp());
  return _db;
}

export function getClientStorage() {
  if (!_storage) _storage = getStorage(getApp());
  return _storage;
}
