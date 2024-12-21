import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useUsers from "../../hooks/useUsers";
import Loading from "../others/Loading";
const UserDet = () => {
  const { userId } = useParams(); // Get the user ID from the URL
  const { users, loading, error } = useUsers();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (users && userId) {
      const selectedUser = users.find((user) => user._id === userId);
      setUser(selectedUser);
    }
  }, [users, userId]);

  if (loading) {
    return <Loading />; // Loading state
  }

  if (error) {
    return <div>{error}</div>; // Error state
  }

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto bg-gray-900 rounded-lg shadow-lg p-6 text-white">
      <h2 className="text-2xl font-bold text-center mb-6 text-green-400">User Details</h2>

      {/* Basic Information */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-300 mb-3">Basic Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-gray-800 p-4 rounded-lg shadow-sm">
            <span className="font-semibold text-green-400">Name:</span> {user.name}
          </div>
          <div className="bg-gray-800 p-4 rounded-lg shadow-sm">
            <span className="font-semibold text-green-400">Email:</span> {user.email}
          </div>
          <div className="bg-gray-800 p-4 rounded-lg shadow-sm">
            <span className="font-semibold text-green-400">Admin:</span> {user.isAdmin? "true" : "false"}
          </div>
          <div className="bg-gray-800 p-4 rounded-lg shadow-sm">
            <span className="font-semibold text-green-400">Referral Code:</span> {user.referralCode}
          </div>
          <div className="bg-gray-800 p-4 rounded-lg shadow-sm">
            <span className="font-semibold text-green-400">Global Deposit Balance:</span> ${user.globalDepositBalance}
          </div>
          <div className="bg-gray-800 p-4 rounded-lg shadow-sm">
            <span className="font-semibold text-green-400">Withdrawable Balance:</span> ${Math.floor(user.withdrawableBalance * 100) / 100}

          </div>
        </div>
      </div>

      {/* Wallet Information */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-300 mb-3">Wallet Information</h3>
        <div className="grid grid-cols-1 gap-4">
          <div className="bg-gray-800 p-4 rounded-lg shadow-sm">
            <span className="font-semibold text-green-400">Tron Wallet Address:</span> {user.tronWalletAddress}
          </div>
          <div className="bg-gray-800 p-4 rounded-lg shadow-sm max-h-40 overflow-y-auto">
  <span className="font-semibold text-green-400">Tron Wallet Private Key:</span> {user.tronWalletPrivateKey}
</div>
        </div>
      </div>

      {/* Referred Users */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-300 mb-3">Referred Users</h3>
        <div className="bg-gray-800 p-4 rounded-lg shadow-sm text-gray-400">{user.referredUsers?.length  || "No referred user" }</div>
      </div>

      {/* Completed Plans */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-300 mb-3">Completed Plans</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-800 border border-gray-700 rounded-lg shadow-sm">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left text-gray-400 font-semibold border-b border-gray-700">
                  Plan Name
                </th>
                <th className="px-4 py-2 text-left text-gray-400 font-semibold border-b border-gray-700">
                  Invested Amount
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2 border-b border-gray-700 text-gray-300">Trx Investment2</td>
                <td className="px-4 py-2 border-b border-gray-700 text-gray-300">$100</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Timestamps */}
      <div className="text-sm text-gray-400">
        <p>
          <span className="font-semibold text-green-400">Created At:</span> {user.createdAt}
        </p>
        <p>
          <span className="font-semibold text-green-400">Updated At:</span> {user.updatedAt}
        </p>
      </div>
    </div>
  );
};

export default UserDet;
