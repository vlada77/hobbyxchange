import { initializeApp } from 'firebase/app';
import { getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
    apiKey: "AIzaSyD8YBp5qlM0tfk9jz4Iuz5aMIP6eDho_UQ",
    authDomain: "hobbyxchange-839d1.firebaseapp.com",
    projectId: "hobbyxchange-839d1",
    storageBucket: "hobbyxchange-839d1.firebasestorage.app",
    messagingSenderId: "944136098938",
    appId: "1:944136098938:web:c271efd92ea0131a0d97c3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

setPersistence(auth, browserLocalPersistence)
    .then(() => {
        console.log("Persistence set to local storage.");
    })
    .catch((error) => {
        console.error("Error setting persistence:", error);
    });



export const db = getFirestore(app);
export { app, auth };