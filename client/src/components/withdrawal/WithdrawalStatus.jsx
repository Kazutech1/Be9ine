import React from "react";

const WithdrawalStatus = ({ status, amount, transactionId }) => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-37 mx-auto">
      <h3 className="text-2xl font-semibold text-green-500 mb-6">Withdrawal Status</h3>

      {/* Status */}
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <span className="text-gray-400 text-lg">Status:</span>
          <span
            className={`text-xl font-semibold ${
              status === "Pending" ? "text-yellow-500" : "text-green-500"
            }`}
          >
            {status}
          </span>
        </div>
        <div className="h-1 bg-gray-600 rounded-full mt-2">
          <div
            className={`h-1 rounded-full ${
              status === "Pending" ? "bg-yellow-500" : "bg-green-500"
            }`}
            style={{ width: status === "Pending" ? "50%" : "100%" }}
          ></div>
        </div>
      </div>

      {/* Amount */}
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <span className="text-gray-400 text-lg">Amount:</span>
          <span className="text-white text-lg font-semibold">${amount}</span>
        </div>
      </div>

      {/* Transaction ID */}
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <span className="text-gray-400 text-lg">Transaction ID:</span>
          <span className="text-white text-lg">{transactionId}</span>
        </div>
      </div>
    </div>
  );
};

export default WithdrawalStatus;
