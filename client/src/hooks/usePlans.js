import { useState, useEffect } from "react";
import axios from "axios";

const useInvestmentPlans = () => {
  const [investmentPlans, setInvestmentPlans] = useState([]); // Store investment plans
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch investment plans
  const fetchInvestmentPlans = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/api/investments");
      setInvestmentPlans(response.data); // Assuming the API returns an array of plans
    } catch (err) {
      setError("Failed to load investment plans");
    } finally {
      setLoading(false);
    }
  };

  // Buy an investment plan
  const createInvestmentPlan = async (planId, investedAmount) => {
    try {
      setLoading(true);
      const userData = JSON.parse(localStorage.getItem("chat-user"));
    const token = userData?.token;
      const response = await axios.post(
        "http://localhost:5000/api/user/buy-plan",
        { planId,   investedAmount},
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`, // Add the token here
          },
        }
      );
      return response.data;
    } catch (err) {
      console.error('Error response:', err.response); // Log the full error response
      setError(err.response?.data?.message || "Failed to buy investment");
      throw err;
    } finally {
      setLoading(false);
    }
  };
  // Fetch investment plans on component mount
  useEffect(() => {
    fetchInvestmentPlans();
  }, []); // Empty dependency array ensures this runs only once

  return { investmentPlans, loading, error, fetchInvestmentPlans, createInvestmentPlan };
};

export default useInvestmentPlans;
