import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCRD-pj7Jba2UuxS-xV9KsAzKYMtfPGTuo",
    authDomain: "datn-ecommerce.firebaseapp.com",
    projectId: "datn-ecommerce",
    storageBucket: "datn-ecommerce.appspot.com",
    messagingSenderId: "658502476447",
    appId: "1:658502476447:web:089dfe221f139b9e6178aa",
    measurementId: "G-J7S9K5BND0"
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };