import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCsbPcd1tZMZ-KIqL7wK6_wefmQvKB-lLY",
    authDomain: "linkedin-clone-72e24.firebaseapp.com",
    projectId: "linkedin-clone-72e24",
    storageBucket: "linkedin-clone-72e24.appspot.com",
    messagingSenderId: "278173926822",
    appId: "1:278173926822:web:a2bc1c2dbb79419518fb67"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
const storage = getStorage(app);

export { db, auth, storage };
