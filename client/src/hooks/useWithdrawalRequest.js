import { useState, useEffect } from "react";
import axios from "axios";

const useWithdrawRequests = () => {

  const [requests, setRequests] = useState([]);
  const [loading, setLoadingState] = useState(false); // Change the name to 'loading' for consistency
  const [error, setErrorState] = useState(null);

  // Helper function to get the token from localStorage
  const getAuthHeaders = () => {
    const userData = JSON.parse(localStorage.getItem("chat-user"));
    const token = userData?.token;

    return token
      ? { Authorization: `Bearer ${token}` }
      : {}; // Return headers with token if available
  };

  // Fetch all withdrawal requests
  const fetchWithdrawRequests = async () => {
    try {
      setLoadingState(false);
      setErrorState(null);

      const response = await axios.get("/api/admin/withdrawals", {
        headers: getAuthHeaders(),
      });

      setRequests(response.data); // Set the withdrawal requests in the state
    } catch (err) {
      setErrorState(err.response?.data?.message || "Failed to fetch withdrawal requests");
    } finally {
      setLoadingState(false);
    }
  };

  // Approve a withdrawal request
  const approveWithdrawRequest = async (id) => {
    try {
      setLoadingState(true);
      setErrorState(null);

      const { data } = await axios.put(
        `/api/admin/withdrawals/${id}/approve`,
        {},
        {
          headers: getAuthHeaders(),
        }
      );

      // Update the request status in the local state
      setRequests((prev) =>
        prev.map((req) => (req._id === id ? { ...req, status: "Approved" } : req))
      );
      return data;
    } catch (err) {
      setErrorState(err.response?.data?.message || "Failed to approve withdrawal request");
      throw err;
    } finally {
      setLoadingState(false);
    }
  };

  // Reject a withdrawal request
  const rejectWithdrawRequest = async (id) => {
    try {
      setLoadingState(true);
      setErrorState(null);

      const { data } = await axios.put(
        `/api/admin/withdrawals/${id}/reject`,
        {},
        {
          headers: getAuthHeaders(),
        }
      );

      // Update the request status in the local state
      setRequests((prev) =>
        prev.map((req) => (req._id === id ? { ...req, status: "Rejected" } : req))
      );
      return data;
    } catch (err) {
      setErrorState(err.response?.data?.message || "Failed to reject withdrawal request");
      throw err;
    } finally {
      setLoadingState(false);
    }
  };

  // Fetch withdrawal requests on component mount
  useEffect(() => {
    fetchWithdrawRequests();
  }, []); // Fetch only once when the component mounts

  return {
    requests,
    loading, // Return 'loading' here
    error, // Return error state
    fetchWithdrawRequests,
    approveWithdrawRequest,
    rejectWithdrawRequest,
  };
};

export default useWithdrawRequests;
