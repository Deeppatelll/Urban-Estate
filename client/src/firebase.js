import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC5Hy6I0r0Szuz3k1Ix0bNQE4jIlcWbnPA",
  authDomain: "prime-estate-68349.firebaseapp.com",
  projectId: "prime-estate-68349",
  storageBucket: "prime-estate-68349.firebasestorage.app",
  messagingSenderId: "277578918252",
  appId: "1:277578918252:web:4302bb56210306e6c72b49",
  measurementId: "G-ZQSQG5LBYM"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

let analytics;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}
export { analytics };
