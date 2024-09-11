import * as app from "firebase/app";
import * as firestore from "firebase/firestore";
import * as auth from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const credentials = {
    apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_APP_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_APP_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_APP_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_APP_FIREBASE_MEASUREMENT_ID
}

const init = app.initializeApp(credentials);
// console.log(credentials)
export const config = firestore.getFirestore(init);
export const db = config;
export const storageApp = getStorage(init);
export { firestore, auth, app };
export default config;
