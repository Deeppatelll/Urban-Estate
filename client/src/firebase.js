import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,  
  authDomain: "prime-estate-68349.firebaseapp.com",
  projectId: "prime-estate-68349",
  storageBucket: "prime-estate-68349.appspot.com",
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
