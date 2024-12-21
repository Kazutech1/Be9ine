import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import VoidImage from "../../assets/void.svg"; // Renamed the import for clarity

const Placeholder = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-6 bg-gray-500 rounded-lg shadow-md">
      {/* Placeholder Image */}
      <img
        src={VoidImage}
        alt="No Investment Plans"
        className="w-40 h-40 mb-4 object-contain"
      />
      <h2 className="text-2xl font-bold text-gray-900 mb-4">No Investment Plans Yet</h2>
      <p className="text-gray-900 mb-4">
        You haven't purchased any investment plans. Explore our available plans to get started!
      </p>
      {/* Use Link for navigation */}
      <Link to="/plans">
        <button
          className="bg-green-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition duration-300"
        >
          Browse Plans
        </button>
      </Link>
    </div>
  );
};

export default Placeholder;
