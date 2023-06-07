import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBIMKmwsLcZKuEfRS3yLJ5C2C50mtkrx1s",
    authDomain: "todo2-b46cf.firebaseapp.com",
    projectId: "todo2-b46cf",
    storageBucket: "todo2-b46cf.appspot.com",
    messagingSenderId: "442889986596",
    appId: "1:442889986596:web:6a8b2f6ad566825834aeb1",
    measurementId: "G-R2ZCY55XBW"
};




//it is kind of db for todo
let db = null;

export const initilizeFirebase = () => {
    const app = initializeApp(firebaseConfig);
    db = getFirestore(app);
}

export const getDB = () => {
    return db;
}