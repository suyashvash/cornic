import { initializeApp } from 'firebase/app';

var firebaseConfig = {
    apiKey: "AIzaSyCFqNor6IznN2L6-20QlEUOw1TxfGleD-E",
    authDomain: "cronic-social.firebaseapp.com",
    projectId: "cronic-social",
    storageBucket: "cronic-social.appspot.com",
    messagingSenderId: "545734851722",
    appId: "1:545734851722:web:73e5471c508dc2a3f00173"
};

const app = initializeApp(firebaseConfig);

export default app;