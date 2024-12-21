import { useState, useEffect, useCallback } from "react";
import axios from "axios";

// Helper function to get authorization headers
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Helper function to extract error messages
const getErrorMessage = (err) =>
  err.response?.data?.message || "An error occurred. Please try again later.";

// Hook for fetching transactions
export const useTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTransactions = useCallback(async () => {
    setLoading(true);
    setError(null); // Clear any previous errors
    try {
      const response = await axios.get("/api/user/history", {
        headers: getAuthHeaders(),
      });
      setTransactions(response.data.transactions || []);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  return { transactions, loading, error, fetchTransactions };
};

// Hook for fetching withdrawal history
export const useWithdrawalHistory = (userId) => {
  const [withdrawalHistory, setWithdrawalHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWithdrawalHistory = useCallback(async () => {
    if (!userId) return;

    setLoading(true);
    setError(null); // Clear any previous errors
    try {
      const response = await axios.get("/api/user/withdrawal/history", {
        headers: getAuthHeaders(),
      });
      setWithdrawalHistory(response.data.withdrawalHistory || []);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchWithdrawalHistory();
  }, [fetchWithdrawalHistory]);

  return { withdrawalHistory, loading, error, fetchWithdrawalHistory };
};
