import React from "react";

const PaymentStatus = () => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-37 mx-auto">
      <h3 className="text-2xl font-semibold text-green-500 mb-6">Payment Status</h3>

      {/* Status */}
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <span className="text-gray-400 text-lg">Status:</span>
          <span className="text-yellow-400 text-lg" >Pending</span>
        </div>
        <div className="h-1 bg-green-600 rounded-full mt-2">
          <div
           
          ></div>
        </div>
      </div>

      {/* Amount */}
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <span className="text-gray-400 text-lg">Amount:</span>
          <span className="text-white text-lg font-semibold"></span>
        </div>
      </div>

      {/* Transaction ID */}
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <span className="text-gray-400 text-lg">Transaction ID:</span>
          <span className="text-white text-lg"></span>
        </div>
      </div>

      {/* Payment History */}
      <div className="bg-gray-700 p-4 rounded-lg mt-6">
        <h4 className="text-green-500 text-lg font-semibold mb-4">Payment History</h4>
        <ul className="space-y-4">
          <li className="flex justify-between items-center">
            <span className="text-gray-400 text-sm">Payment #1:</span>
            <span className="text-white text-sm">$500.00</span>
          </li>
          <li className="flex justify-between items-center">
            <span className="text-gray-400 text-sm">Payment #2:</span>
            <span className="text-white text-sm">$700.00</span>
          </li>
          <li className="flex justify-between items-center">
            <span className="text-gray-400 text-sm">Payment #3:</span>
            <span className="text-white text-sm">$1200.00</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PaymentStatus;
