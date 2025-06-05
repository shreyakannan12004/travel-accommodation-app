import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier } from "firebase/auth";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyDQcCC05uXC0ziUooSpOrnmFLzQWqXig-c",
  authDomain: "airbnb-website-b7e94.firebaseapp.com",
  projectId: "airbnb-website-b7e94",
  storageBucket: "airbnb-website-b7e94.appspot.com",
  messagingSenderId: "403995473784",
  appId: "1:403995473784:web:43a0b79cd12cdf7aa0fa8d",
  measurementId: "G-SP7TH7N02D",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// ✅ Function to setup reCAPTCHA
const setupRecaptcha = () => {
  window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
    size: "invisible",
    callback: (response) => {
      console.log("reCAPTCHA Verified!");
    },
  });
};

// Export Auth and ReCAPTCHA setup
export { auth, setupRecaptcha };
export default app;
