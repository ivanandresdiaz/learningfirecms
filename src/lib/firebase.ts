import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";
import { getFunctions } from "firebase/functions";
import { AppCheck } from "firebase/app-check";
// Initialize Firebase
// import {
//   initializeAppCheck,
//   ReCaptchaEnterpriseProvider,
// } from "firebase/app-check";

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
};

// Detect if it is dev mode
declare global {
  interface Window {
    FIREBASE_APPCHECK_DEBUG_TOKEN: boolean;
  }
}

// if (typeof window !== "undefined" && window.location.hostname === "localhost") {
//   window.FIREBASE_APPCHECK_DEBUG_TOKEN = true;
//   // Genera un debug token en la consola
// }

// const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const app = initializeApp(firebaseConfig);
// console.log("app", app);

const AppCheckInstance: AppCheck | null = null;

// if (typeof window !== "undefined" && !AppCheckInstance) {
//   import("firebase/app-check").then(async (firebaseAppCheck) => {
//     const captachp = process.env
//       .NEXT_PUBLIC_RECAPTCHA_SITE_KEY_APP_CHECK as string;
//     AppCheckInstance = firebaseAppCheck.initializeAppCheck(app, {
//       provider: new firebaseAppCheck.ReCaptchaV3Provider(captachp),
//       isTokenAutoRefreshEnabled: true,
//     });
//     console.log("AppCheckInstance", AppCheckInstance);
//   });
// }
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);
const realtimeDb = getDatabase(app);
const functions = getFunctions(app);

export { db, storage, auth, app, realtimeDb, functions, AppCheckInstance };
