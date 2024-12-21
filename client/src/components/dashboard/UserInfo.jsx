import React from 'react';

const UserDetails = ({ user }) => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold text-green-500 mb-4">User Details</h3>
      <div className="space-y-4">
        <div className="flex justify-between">
          <span className="text-gray-400">Username:</span>
          <span className="text-white">{user.name}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Email:</span>
          <span className="text-white">{user.email}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Global Balance:</span>
          <span className="text-white">
            ${user.globalDepositBalance ? user.globalDepositBalance.toFixed(2) : '0.00'}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Withdrawable Balance:</span>
          <span className="text-white">
            ${user.withdrawableBalance ? user.withdrawableBalance.toFixed(2) : '0.00'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
