import React from "react";
import { FaShieldAlt, FaLock, FaUserCheck } from "react-icons/fa";
import ImageCarousel from "./ImageCarousel";
import { Link } from "react-router-dom";

const Heading = () => {
  return (
    <div className="relative w-full h-auto bg-base-100">
      {/* Desktop Layout */}
      <div className="hidden lg:flex items-center justify-between px-8 md:px-16 py-10">
        {/* Text Section */}
        <div className="max-w-md">
          <h1 className="text-4xl font-bold text-primary mb-4">Welcome to Be 9ine</h1>
          <p className="text-lg text-gray-700 mb-6">
            Explore the world of cryptocurrency investments with ease and confidence. Manage your portfolio, track markets, and stay ahead of the game.
          </p>
          <Link to="/signup">
            <button className="btn btn-primary text-lg px-6 py-3 rounded-lg">
              Get Started
            </button>
          </Link>
        </div>

        {/* Image Section */}
        <div className="flex-shrink-0">
          <ImageCarousel />
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden relative">
        <ImageCarousel />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-center px-6">
          <div className="text-white">
            <h1 className="text-3xl font-bold mb-4">Welcome to Be 9ine</h1>
            <p className="text-base mb-6">
              Explore the world of cryptocurrency investments with ease and confidence. Manage your portfolio, track markets, and stay ahead of the game.
            </p>
            <Link to="/signup">
              <button className="btn btn-primary text-lg px-6 py-3 rounded-lg">
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* New Section After Heading */}
      <div className="mt-16 px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Regulated */}
          <div className="flex flex-col items-center text-start">
            <FaShieldAlt className="text-4xl text-green-600 mb-4" />
            <h2 className="text-2xl font-bold text-green-600 mb-4">Regulated</h2>
            <p className="text-lg mb-4">
              Austria based and European regulated crypto & securities broker platform
            </p>
            <Link to="#read-more" className="text-blue-500 hover:text-blue-700">
              Read more
            </Link>
          </div>

          {/* Safe and Secure */}
          <div className="flex flex-col items-center text-start">
            <FaLock className="text-4xl text-green-600 mb-4" />
            <h2 className="text-2xl font-bold text-green-600 mb-4">Safe and Secure</h2>
            <p className="text-lg mb-4">
              Funds secured in offline wallets. Fully compliant with European data, IT and money laundering security standards
            </p>
            <Link to="#read-more" className="text-blue-500 hover:text-blue-700">
              Read more
            </Link>
          </div>

          {/* Trusted */}
          <div className="flex flex-col items-center text-start">
            <FaUserCheck className="text-4xl text-green-600 mb-4" />
            <h2 className="text-2xl font-bold text-green-600 mb-4">Trusted</h2>
            <p className="text-lg mb-4">
              5+ million happy users. Excellent Trustpilot rating.
            </p>
            <Link to="#read-reviews" className="text-blue-500 hover:text-blue-700">
              Read reviews
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Heading;
