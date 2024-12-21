// hooks/useSignup.js
import { useState } from "react";
import axios from "axios";

const useSignup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const signup = async ({ name, email, password, confirmPassword, referralCode }) => {
    
    try {
      setIsLoading(true);
      setError("");

      const response = await axios.post("http://localhost:5000/api/auth/signup", {
        name,
        email,
        password,
        referralCode,
      });

      // Handle success (e.g., redirect, show a message, etc.)
      console.log("User signed up successfully:", response.data);
    } catch (err) {
      // Handle errors
      setError(err.response?.data?.message || "An error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return { signup, isLoading, error };
};

export default useSignup;
