import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getStorage } from "firebase/storage";



const firebaseConfig = {
    apiKey: "AIzaSyD8YBp5qlM0tfk9jz4Iuz5aMIP6eDho_UQ",
    authDomain: "hobbyxchange-839d1.firebaseapp.com",
    projectId: "hobbyxchange-839d1",
    storageBucket: "hobbyxchange-839d1.firebasestorage.app",
    messagingSenderId: "944136098938",
    appId: "1:944136098938:web:c271efd92ea0131a0d97c3"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

onAuthStateChanged(auth, user => {
    if (user) {
        console.log('logged in!');
    } else {
        console.log('no user')
    }
});

export const storage = getStorage(app);
export { app, auth, db };