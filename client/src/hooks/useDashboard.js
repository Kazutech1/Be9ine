import { useState, useEffect } from "react";
import axios from "axios";
import { useUserContext } from "../contexts/UserContext";
const useDashboard = () => {
  const {
    user,
    setUser,
    currentPlan,
    setCurrentPlan,
    setLoading,
    setError,
  } = useUserContext(); // Use global context

  const [profileLoading, setProfileLoading] = useState(true);
  const [referralLoading, setReferralLoading] = useState(false);

  // Helper function to get the token from localStorage
  const getAuthHeaders = () => {
    const userData = JSON.parse(localStorage.getItem("chat-user"));
    const token = userData?.token;

    return token
      ? { Authorization: `Bearer ${token}` }
      : {}; // Return headers with token if available
  };

  // Fetch user profile data
  const fetchUserProfile = async () => {
    try {
      setProfileLoading(true);
      setError(""); // Reset error

      const response = await axios.get("/api/profile", {
        headers: getAuthHeaders(),
      });

      setUser(response.data.user); // Set global user state
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch profile data");
    } finally {
      setProfileLoading(false);
    }
  };

  // Fetch current plan
  const fetchCurrentPlan = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get("/api/user/current", {
        headers: getAuthHeaders(),
      });

      setCurrentPlan(response.data); // Set global current plan state
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch current plan");
    } finally {
      setLoading(false);
    }
  };

  // Fetch referral information
  const fetchReferralInfo = async () => {
    try {
      setReferralLoading(true);
      setError("");

      const response = await axios.get("/api/referral", {
        headers: getAuthHeaders(),
      });

      // Merge referral data with global user state
      setUser((prevUser) => ({
        ...prevUser,
        referralData: response.data,
      }));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch referral data");
    } finally {
      setReferralLoading(false);
    }
  };

  // Update user profile
  const updateUserProfile = async (updatedData) => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.put(
        "/api/profile",
        updatedData,
        {
          headers: getAuthHeaders(),
        }
      );

      setUser(response.data.user); // Update global user state
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  // Fetch user profile on component mount
  useEffect(() => {
    fetchUserProfile();
  }, []);

  // Fetch current plan and referral info after user is fetched
  useEffect(() => {
    if (user) {
      fetchCurrentPlan();
      fetchReferralInfo();
    }
  }, [user]);

  return {
    user,
    currentPlan,
    profileLoading,
    referralLoading,
    fetchUserProfile,
    fetchReferralInfo,
    updateUserProfile,
  };
};

export default useDashboard;
