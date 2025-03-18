import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD5KJT3aa6G_ESksiXRXej9ccTGmq3LbFI",
  authDomain: "test-8aaf7.firebaseapp.com",
  projectId: "test-8aaf7",
  storageBucket: "test-8aaf7.firebasestorage.app",
  messagingSenderId: "501904115087",
  appId: "1:501904115087:web:307d36224fe5f4393337fa",
};

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
export const db = getFirestore(app);
