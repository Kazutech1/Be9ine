import React from "react";

const PaymentStatus = ({ transaction }) => {
  // Extract values from the transaction object
  const amountInSun = transaction?.raw_data?.contract?.[0]?.parameter?.value?.amount;
  const amountInTrx = amountInSun ? amountInSun / 1000000 : 0; // Convert to TRX
  const status = transaction?.ret?.[0]?.contractRet === "SUCCESS" ? "Completed" : "Pending";
  const transactionId = transaction?.txID;

  // Check if amount or transactionId is missing, and provide a fallback value or message
  if (amountInSun === undefined || transactionId === undefined) {
    return <div className="text-red-500">Error: Missing transaction details</div>;
  }

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h3 className="text-2xl font-semibold text-green-500 mb-6">Transaction Details</h3>

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
      </div>

      {/* Amount */}
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <span className="text-gray-400 text-lg">Amount:</span>
          <span className="text-white text-lg font-semibold">{amountInTrx} TRX</span>
        </div>
      </div>

      {/* Transaction ID */}
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <span className="text-gray-400 text-lg">Transaction ID:</span>
          <div className="flex-1 overflow-x-auto">
            <span className="text-white text-lg whitespace-nowrap">{transactionId}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentStatus;
