import { useState } from "react";
import axios from "axios";

const useRequestWithdrawal = () => {
  const [status, setStatus] = useState(null); // To track the status of the withdrawal request
  const [loading, setLoading] = useState(false); // To track loading state
  const [error, setError] = useState(null); // To track errors

  const requestWithdrawal = async (amount, walletAddress, paymentMethod) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.post(
        "/api/user/withdraw", // Replace with your actual endpoint
        { amount, walletAddress, paymentMethod },
        { headers: { "Content-Type": "application/json" } }
      );

      setStatus(response.data.message); // Assuming API response includes a message
    } catch (err) {
      setError(err.response ? err.response.data.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return { status, loading, error, requestWithdrawal };
};

export default useRequestWithdrawal;
