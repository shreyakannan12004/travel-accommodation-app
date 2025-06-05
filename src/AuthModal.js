import React, { useState } from "react";
import {
  auth,
  googleProvider,
  signInWithPopup,
  RecaptchaVerifier,
  signInWithPhoneNumber
} from "../firebaseConfig";
import { IoClose } from "react-icons/io5"; // Close Button
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

const AuthModal = ({ onClose }) => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isSignup, setIsSignup] = useState(false); // Toggle Sign Up/Login

  // Handle Google Sign-In
  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      alert("Google Sign-In Successful!");
      onClose(); // Close modal after login
    } catch (error) {
      console.error("Google Sign-In Error:", error.message);
    }
  };

  // Handle Email/Password Sign-In
  const handleEmailAuth = async () => {
    try {
      if (isSignup) {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("Account Created Successfully!");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        alert("Login Successful!");
      }
      onClose();
    } catch (error) {
      console.error("Email Authentication Error:", error.message);
    }
  };

  // Send OTP
  const sendOtp = async () => {
    if (!phone.startsWith("+")) {
      alert("Enter phone number in international format (e.g., +91xxxxxxxxxx)");
      return;
    }
    try {
      window.recaptchaVerifier = new RecaptchaVerifier("recaptcha-container", {
        size: "invisible",
        callback: () => console.log("Recaptcha Verified!"),
      }, auth);

      const confirmation = await signInWithPhoneNumber(auth, phone, window.recaptchaVerifier);
      setConfirmationResult(confirmation);
      setIsOtpSent(true);
      alert("OTP Sent Successfully!");
    } catch (error) {
      console.error("OTP Sending Error:", error.message);
    }
  };

  // Verify OTP
  const verifyOtp = async () => {
    if (!otp) {
      alert("Enter OTP!");
      return;
    }
    try {
      if (confirmationResult) {
        await confirmationResult.confirm(otp);
        alert("Phone Sign-In Successful!");
        onClose(); // Close modal after login
      } else {
        alert("No OTP Confirmation Result found!");
      }
    } catch (error) {
      console.error("OTP Verification Failed:", error.message);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <IoClose className="close-btn" onClick={onClose} />
        <h2 className="text-xl font-bold mb-4">Continue with</h2>

        {/* Google Sign-In Button */}
        <button onClick={handleGoogleSignIn} className="w-full p-2 bg-red-500 text-white rounded">
          Continue with Google
        </button>

        <hr className="my-4" />

        {/* Phone Authentication */}
        <input
          type="text"
          placeholder="Enter phone number (e.g., +91xxxxxxxxxx)"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <button onClick={sendOtp} className="w-full p-2 bg-blue-500 text-white rounded mt-2">
          Send OTP
        </button>

        {isOtpSent && (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full p-2 border rounded mt-2"
            />
            <button onClick={verifyOtp} className="w-full p-2 bg-green-500 text-white rounded mt-2">
              Verify OTP
            </button>
          </>
        )}

        <hr className="my-4" />

        {/* Email Authentication */}
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded mt-2"
        />
        <button onClick={handleEmailAuth} className="w-full p-2 bg-purple-500 text-white rounded mt-2">
          {isSignup ? "Sign Up" : "Login"}
        </button>

        <button onClick={() => setIsSignup(!isSignup)} className="w-full p-2 text-sm mt-2">
          {isSignup ? "Already have an account? Login" : "Don't have an account? Sign Up"}
        </button>

        {/* Recaptcha Container (Invisible) */}
        <div id="recaptcha-container"></div>
      </div>
    </div>
  );
};

export default AuthModal;
