import { useState } from "react";
import { useAuthContext } from "../contexts/AuthContext";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // State to manage error messages
  const { setAuthUser } = useAuthContext();

  const login = async (email, password) => {
    setLoading(true);
    setError(null); // Reset error before attempting login

    if (!email || !password) {
      setError("Email and password are required.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to log in");
      }
      

      const data = await res.json();
      localStorage.setItem("chat-user", JSON.stringify(data));
      setAuthUser(data);
    } catch (error) {
      setError(error.message); // Set error message to display in the UI
    } finally {
      setLoading(false);
    }
  };

  return { loading, login, error }; // Return error state
};

export default useLogin;
