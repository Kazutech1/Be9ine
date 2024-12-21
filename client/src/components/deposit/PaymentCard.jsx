import React, { useState } from 'react';
import QRCode from "react-qr-code";

const PaymentCard = ({ address, onDeposit, onPaymentSuccess }) => {
  const [paymentMethod, setPaymentMethod] = useState('TRX');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Payment submitted:', { paymentMethod });
    
    // Simulate a payment and call the onDeposit function
    const depositData = {
      method: paymentMethod,
      address: address,
      amount: 100, // Example amount
    };

    // Trigger the deposit action
    onDeposit(depositData);
    onPaymentSuccess()
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md max-w-md mx-auto">
      <h3 className="text-xl font-semibold text-green-500 mb-4">Make a Payment</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-gray-400">Payment Method (Make sure you send the correct Token)</label>
          <select
            className="w-full p-3 mt-2 bg-gray-700 text-white rounded-md"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="USDT">USDT</option>
          </select>
        </div>

        <div>
          <label className="text-gray-400">Wallet Address</label>
          <p className="w-full p-3 mt-2 bg-gray-700 text-white rounded-md">{address}</p>
        </div>

        {/* QR Code for Wallet Address */}
        <div className="mt-4 flex justify-center">
          <div className="mt-2 flex justify-center">
            <QRCode value={address} size={128} fgColor="#fff" bgColor="#111" />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 mt-4 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition"
        >
          I Have Made Payment
        </button>
      </form>
    </div>
  );
};

export default PaymentCard;
