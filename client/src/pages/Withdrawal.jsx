import React, { useState } from "react";
import WithdrawalCard from "../components/withdrawal/WithdrawalCard";
import useRequestWithdrawal from "../hooks/useWithdrawal";
import Modal from "../components/others/Modal"; // Assuming Modal is the correct component for showing modals

const Withdrawal = () => {
  const [depositHistory, setDepositHistory] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility

  const { status, loading, error, requestWithdrawal } = useRequestWithdrawal();

  // Add deposit to history
  const handleDeposit = (depositData) => {
    setDepositHistory([depositData, ...depositHistory]);
  };

  // Handle withdrawal success and open modal
  const handleWithdrawalSuccess = () => {
    setIsModalOpen(true); // Show the success modal
  };

  return (
    <div className="flex flex-col p-6 h-full bg-gray-900">
      <h1 className="text-3xl font-bold text-green-500 mb-6">Withdrawal Page</h1>

      <div className="flex flex-col lg:flex-row p-6 space-y-6 lg:space-y-0 lg:space-x-6 overflow-auto">
        {/* Left Side */}
        <div className="flex space-y-6 w-full">
          <WithdrawalCard
            withdraw={requestWithdrawal}
            onDeposit={handleDeposit}
            error={error}
            onSuccess={handleWithdrawalSuccess} // Pass the success handler to WithdrawalCard
          />
        </div>
      </div>

      {/* Popup Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Withdrawal Status">
        <div className="text-center">
          <p className="text-green-500">Withdrawal placed successfully!</p>
          <button
            onClick={() => setIsModalOpen(false)}
            className="mt-4 py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Withdrawal;
