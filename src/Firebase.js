/************ ---- EXAM  ---- ******************** */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB0Pk8OFmQkyjxctXul5FSf_XrSHRwH0no",
    authDomain: "exam-4b161.firebaseapp.com",
    projectId: "exam-4b161",
    storageBucket: "exam-4b161.appspot.com",
    messagingSenderId: "661130480347",
    appId: "1:661130480347:web:c9a0329bcb63684000dafe"
};





// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default getFirestore();


// apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
// authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
// projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
// storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
// messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
// appId: process.env.REACT_APP_FIREBASE_APP_ID




/*******************  Test   ********************** */


// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getFirestore } from 'firebase/firestore';
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//     apiKey: "AIzaSyCKK2zELgEySayaTRZRxYkNqBFw8O8jsb0",
//     authDomain: "auth-test-c186b.firebaseapp.com",
//     projectId: "auth-test-c186b",
//     storageBucket: "auth-test-c186b.appspot.com",
//     messagingSenderId: "915445696278",
//     appId: "1:915445696278:web:7971f86d00b2b80aefb237"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// export default getFirestore();