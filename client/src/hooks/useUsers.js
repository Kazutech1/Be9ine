import { useState, useEffect } from "react";
import axios from "axios";

const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Helper function to get the token from localStorage
  const getAuthHeaders = () => {
    const userData = JSON.parse(localStorage.getItem("chat-user"));
    const token = userData?.token;

    return token ? { Authorization: `Bearer ${token}` } : {}; // Return headers with token if available
  };

  // Fetch users data
  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(""); // Reset error

      const response = await axios.get("http://localhost:5000/api/admin/users", {
        headers: getAuthHeaders(),
      });

      setUsers(response.data); // Set users data
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  // Delete user
  const deleteUser = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/admin/users/${id}`, {
        headers: getAuthHeaders(),
      });

      // Remove deleted user from the local state
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));

      alert("User deleted successfully");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete user");
    }
  };

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  return { users, loading, error, deleteUser };
};

export default useUsers;
