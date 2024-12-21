import React, { useEffect } from 'react';

const Modal = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'; // Disable scroll when modal is open
    } else {
      document.body.style.overflow = 'auto'; // Enable scroll when modal is closed
    }

    // Close modal on Escape key press
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50 transition-opacity duration-300 ease-in-out"
    >
      <div className="bg-gray-800 p-6 rounded-lg w-96 shadow-lg opacity-100 transition-opacity duration-300 ease-in-out">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-green-500">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Close modal"
          >
            X
          </button>
        </div>
        <div className="text-gray-300">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
