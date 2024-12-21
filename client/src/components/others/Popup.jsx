import React, { useState } from 'react';
import Modal from './Modal';

const PopupPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="min-h-screen bg-gray-900 flex justify-center items-center">
      <button
        onClick={openModal}
        className="py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600"
      >
        Open Custom Popup
      </button>

      <Modal isOpen={isModalOpen} onClose={closeModal} title="Custom Popup">
        <div className="text-gray-700">
          <p>This is a custom popup/modal page!</p>
          <p>You can put any content here.</p>
        </div>
        <button
          onClick={closeModal}
          className="mt-4 py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          Close
        </button>
      </Modal>
    </div>
  );
};

export default PopupPage;
