import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBfzuHfryXf3EBK_l01eTC2d94_FKbjvtI",
  authDomain: "mini-bolg.firebaseapp.com",
  projectId: "mini-bolg",
  storageBucket: "mini-bolg.appspot.com",
  messagingSenderId: "30434533548",
  appId: "1:30434533548:web:80b9d1e585071d6dd4ff09"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore();