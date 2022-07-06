import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAbVxUyGo8wrxxg5KFvRD0ADWS6k_NjsJk",
    authDomain: "sheygram-lite-fac2c.firebaseapp.com",
    projectId: "sheygram-lite-fac2c",
    storageBucket: "sheygram-lite-fac2c.appspot.com",
    messagingSenderId: "131893191357",
    appId: "1:131893191357:web:54debe979563159c090dd4",
    measurementId: "G-23Q5ZWTN8J"
};

const app = initializeApp(firebaseConfig);
const fireDb = getFirestore(app)

export { app, fireDb }