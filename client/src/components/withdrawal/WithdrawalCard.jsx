// WithdrawalCard.jsx
import React, { useState } from "react";

const WithdrawalCard = ({ withdraw, onDeposit, error, onSuccess }) => {
  const [amount, setAmount] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("TRX");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!amount || !walletAddress) {
      alert("Please fill in all fields");
      return;
    }

    try {
      // Trigger withdrawal request
      await withdraw(amount, walletAddress, paymentMethod);
      onDeposit({ amount, walletAddress, paymentMethod }); // Add deposit to history

      // Call the onSuccess callback to show the success popup
      onSuccess();
    } catch (err) {
      console.error("Error with withdrawal:", err);
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md max-w-md mx-auto">
      <h3 className="text-xl font-semibold text-green-500 mb-4">Withdraw Funds</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Amount Input */}
        <div>
          <label className="text-gray-400">Amount</label>
          <input
            type="number"
            className="w-full p-3 mt-2 bg-gray-700 text-white rounded-md"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>

        {/* Payment Method Selection */}
        <div>
          <label className="text-gray-400">Withdrawal Method</label>
          <select
            className="w-full p-3 mt-2 bg-gray-700 text-white rounded-md"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="TRX">TRX</option>
            <option value="USDT">USDT</option>
          </select>
        </div>

        {/* Wallet Address Input */}
        <div>
          <label className="text-gray-400">Wallet Address</label>
          <input
            type="text"
            className="w-full p-3 mt-2 bg-gray-700 text-white rounded-md"
            placeholder="Enter wallet address"
            value={walletAddress}
            onChange={(e) => setWalletAddress(e.target.value)}
            required
          />
        </div>

        {/* Payment Button */}
        <button
          type="submit"
          className="w-full py-3 mt-4 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition"
        >
          Withdraw
        </button>
      </form>

      {/* Show Error */}
      {error && <div className="mt-4 text-red-500">{error}</div>}
    </div>
  );
};

export default WithdrawalCard;
