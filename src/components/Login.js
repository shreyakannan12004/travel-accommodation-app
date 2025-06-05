import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaApple, FaFacebook } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { useAuth } from "../AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, googleSignIn } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      alert("Login Successful!");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-xl font-bold mb-4">Login</h2>

      {/* Email Login Form */}
      <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border p-2 rounded-md"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="border p-2 rounded-md"
        />
        <button type="submit" className="bg-blue-500 text-white py-2 rounded-md">
          Login
        </button>
      </form>

      {/* OR Divider */}
      <div className="my-4 text-gray-500 text-sm">or</div>

      {/* Social Login Buttons */}
      <button
        className="w-full flex items-center justify-center border py-2 rounded-lg mb-2"
        onClick={googleSignIn}
      >
        <FcGoogle className="mr-2 text-xl" />
        Continue with Google
      </button>

      <button className="w-full flex items-center justify-center border py-2 rounded-lg mb-2">
        <FaApple className="mr-2 text-xl" />
        Continue with Apple
      </button>

      <button className="w-full flex items-center justify-center border py-2 rounded-lg mb-2">
        <HiOutlineMail className="mr-2 text-xl" />
        Continue with Email
      </button>

      <button className="w-full flex items-center justify-center border py-2 rounded-lg text-blue-600">
        <FaFacebook className="mr-2 text-xl" />
        Continue with Facebook
      </button>
    </div>
  );
};

export default Login;
