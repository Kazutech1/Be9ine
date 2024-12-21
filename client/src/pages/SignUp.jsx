import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import useSignup from "../hooks/useSignUp";
import Loading from "../components/others/Loading";

const SignUp = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { signup, isLoading, error } = useSignup();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match. Please try again.");
      return;
    }
    try {
      await signup({
        name: fullName,
        email,
        password,
        referralCode: referralCode || undefined,
      });
      navigate("/login");
    } catch (err) {
      console.error("Signup failed:", err);
    }
  };

  const inputClass =
    "w-full p-3 border-2 border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 hover:border-green-400 transition-all duration-200";

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-green-500 via-green-400 to-green-300">

      <div className="w-full max-w-lg p-8 bg-white rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold text-center text-green-700 mb-6">
          Create an Account
        </h2>

        <form onSubmit={handleSubmit} noValidate>
          {/* Full Name */}
          <div className="mb-5">
            <label htmlFor="fullName" className="block text-green-700 font-medium mb-2">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              placeholder="Enter your full name"
              className={inputClass}
              aria-label="Full Name"
            />
          </div>

          {/* Email */}
          <div className="mb-5">
            <label htmlFor="email" className="block text-green-700 font-medium mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
              className={inputClass}
              aria-label="Email Address"
            />
          </div>

          {/* Password */}
          <div className="mb-5 relative">
            <label htmlFor="password" className="block text-green-700 font-medium mb-2">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Create a password"
              className={inputClass}
              aria-label="Password"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-10 cursor-pointer text-gray-500 hover:text-green-500"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {/* Confirm Password */}
          <div className="mb-5 relative">
            <label htmlFor="confirmPassword" className="block text-green-700 font-medium mb-2">
              Confirm Password
            </label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="Confirm your password"
              className={inputClass}
              aria-label="Confirm Password"
            />
            <span
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-10 cursor-pointer text-gray-500 hover:text-green-500"
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {/* Referral Code */}
          <div className="mb-5">
            <label htmlFor="referralCode" className="block text-green-700 font-medium mb-2">
              Referral Code (Optional)
            </label>
            <input
              type="text"
              id="referralCode"
              value={referralCode}
              onChange={(e) => setReferralCode(e.target.value)}
              placeholder="Enter referral code"
              className={inputClass}
              aria-label="Referral Code"
            />
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full py-3 text-white font-semibold rounded-lg transition duration-300 ${
              isLoading
                ? "bg-green-400 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600"
            }`}
            disabled={isLoading}
          >
            {isLoading ? 
            "Signing Up..." : "Sign Up"}
          </button>
        </form>

        {/* Redirect to Login */}
        <div className="text-center mt-6">
          <p className="text-gray-600 text-sm">
            Already have an account?{" "}
            <a href="/login" className="text-green-600 hover:underline font-medium">
              Log In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
