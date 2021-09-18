import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

var firebaseConfig = {
    apiKey: "AIzaSyAnjNjQdjYbZFNsIBGS1Qg9EgGmP9xIWo0",
    authDomain: "cornic-ask.firebaseapp.com",
    projectId: "cornic-ask",
    storageBucket: "cornic-ask.appspot.com",
    messagingSenderId: "374857855803",
    appId: "1:374857855803:web:f4e41c5b2c88bfccc87d1e"
};

firebase.initializeApp(firebaseConfig);
const projectFirestore = firebase.firestore()
export { projectFirestore };