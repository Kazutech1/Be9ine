import React, { useEffect } from "react";
import useWithdrawRequests from "../hooks/useWithdrawalRequest";

const WithdrawalRequests = () => {
  const {
    requests,
    loading,
    error,
    fetchWithdrawRequests,
    approveWithdrawRequest,
    rejectWithdrawRequest,
  } = useWithdrawRequests();

  // Fetch withdrawal requests when the component mounts
  useEffect(() => {
    fetchWithdrawRequests();
  }, [fetchWithdrawRequests]); // Only fetch when component mounts or fetchWithdrawRequests changes

  const handleAccept = async (id) => {
    try {
      await approveWithdrawRequest(id);
      alert("Withdrawal request approved successfully!");
    } catch (err) {
      alert(err.message || "Failed to approve the request");
    }
  };

  const handleReject = async (id) => {
    try {
      await rejectWithdrawRequest(id);
      alert("Withdrawal request rejected successfully!");
    } catch (err) {
      alert(err.message || "Failed to reject the request");
    }
  };

  // Loading and error states
  if (loading) {
    return <p className="text-center text-white">Loading withdrawal requests...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-6 text-green-400">Withdrawal Requests</h2>
      <div className="overflow-x-auto bg-gray-900 rounded-lg shadow-lg">
        <table className="min-w-full text-white">
          <thead>
            <tr className="bg-gray-800">
              <th className="px-4 py-2 text-left font-semibold text-gray-400">User</th>
              <th className="px-4 py-2 text-left font-semibold text-gray-400">Amount</th>
              <th className="px-4 py-2 text-left font-semibold text-gray-400">Wallet Address</th>
              <th className="px-4 py-2 text-left font-semibold text-gray-400">Status</th>
              <th className="px-4 py-2 text-left font-semibold text-gray-400">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <tr
                key={request._id}
                className="even:bg-gray-800 odd:bg-gray-700 hover:bg-gray-600 transition"
              >
                <td className="px-4 py-2">{request.user.name}</td>
                <td className="px-4 py-2">${request.amount}</td>
                <td className="px-4 py-2">{request.walletAddress}</td>
                <td className="px-4 py-2">{request.status}</td>
                <td className="px-4 py-2">
                  <div className="flex space-x-2">
                    <button
                      className="bg-green-500 hover:bg-green-400 text-black font-semibold py-1 px-3 rounded"
                      onClick={() => handleAccept(request._id)}
                      disabled={request.status !== "Pending"}
                    >
                      Accept
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-400 text-white font-semibold py-1 px-3 rounded"
                      onClick={() => handleReject(request._id)}
                      disabled={request.status !== "Pending"}
                    >
                      Reject
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WithdrawalRequests;
