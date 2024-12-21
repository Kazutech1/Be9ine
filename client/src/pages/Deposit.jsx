import React, { useState } from "react";
import PaymentCard from "../components/deposit/PaymentCard";
import useDashboard from "../hooks/useDashboard";
import Modal from "../components/others/Modal";
import { Link } from "react-router-dom"; // For redirection

const DepositPage = () => {
  const [depositHistory, setDepositHistory] = useState([]);
  const { user } = useDashboard();
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

  // Add deposit to history
  const handleDeposit = (depositData) => {
    setDepositHistory([depositData, ...depositHistory]);
  };

  // Handle payment success and open modal
  const handlePaymentSuccess = () => {
    setIsModalOpen(true); // Show the success modal
  };

 
  // Check if user is loaded before rendering
  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col p-6 h-full bg-gray-900">
      <h1 className="text-3xl font-bold text-green-500 mb-6">Deposit Page</h1>

      <div className="flex flex-col lg:flex-row p-6 space-y-6 lg:space-y-0 lg:space-x-6 overflow-auto">
        {/* Left Side */}
        <div className="flex space-y-6 w-full">
          <PaymentCard
            onDeposit={handleDeposit}
            address={user.tronWalletAddress}
            onPaymentSuccess={handlePaymentSuccess} // Pass success handler
          />
        </div>
      </div>

      {/* Payment Status Modal */}
      {isModalOpen && (
       <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Deposit Status">
       <div className="text-center">
         <p className="text-green-500">Checking for deposit...</p>
         <Link to="/dash">
         <button
           onClick={() => setIsModalOpen(false)}
           className="mt-4 py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600"
         >
           Close
         </button>
         </Link>
         
       </div>
     </Modal>
      )}
    </div>
  );
};

export default DepositPage;
