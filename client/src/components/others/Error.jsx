import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
        {/* Error Icon */}
        <svg
          className="w-12 h-12 mx-auto mb-4 text-red-600"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.29 3.86l-8.4 14A1 1 0 002.6 20h16.8a1 1 0 00.86-1.54l-8.4-14a1 1 0 00-1.72 0zM12 9v4m0 4h.01"
          ></path>
        </svg>

        {/* Error Message */}
        <p className="text-lg font-semibold text-gray-800 mb-4">
          {message || "Something went wrong!"}
        </p>

        {/* Retry Button */}
        {onRetry && (
          <button
            onClick={onRetry}
            className="px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition duration-300"
          >
            Retry
          </button>
        )}

        {/* Close Button */}
        <Link to="/dash">
          <button
            className="mt-4 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-400 transition duration-300"
          >
            Close
          </button>
        </Link>
      </div>
    </div>
  );
};

ErrorMessage.propTypes = {
  message: PropTypes.string,
  onRetry: PropTypes.func,
};

export default ErrorMessage;
