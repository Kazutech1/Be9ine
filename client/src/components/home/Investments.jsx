import React from "react";
import { FaBitcoin, FaChartBar, FaRobot, FaCog } from "react-icons/fa"; // Updated import for FaChartBar

const Investment = () => {
  return (
    <div className="py-16 bg-white text-center">
      <h2 className="text-3xl font-bold text-green-600 mb-8">What You Can Invest In</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
        {/* Cryptocurrency */}
        <div className="flex flex-col items-center text-start p-6 border border-gray-300 rounded-lg shadow-md">
          <FaBitcoin className="text-5xl text-yellow-500 mb-4" />
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Cryptocurrencies</h3>
          <p className="text-lg text-gray-600 mb-4">
            Invest in the most popular cryptocurrencies like Bitcoin, Ethereum, and more.
          </p>
        </div>

        {/* Commodities */}
        <div className="flex flex-col items-center text-start p-6 border border-gray-300 rounded-lg shadow-md">
          <FaChartBar className="text-5xl text-blue-600 mb-4" /> {/* Updated icon */}
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Commodities</h3>
          <p className="text-lg text-gray-600 mb-4">
            Diversify your portfolio with stable and reliable commodities such as gold, oil, and more.
          </p>
        </div>

        {/* ETFs */}
        <div className="flex flex-col items-center text-start p-6 border border-gray-300 rounded-lg shadow-md">
          <FaCog className="text-5xl text-green-600 mb-4" />
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">ETFs</h3>
          <p className="text-lg text-gray-600 mb-4">
            Invest in exchange-traded funds that give you exposure to diverse markets and industries.
          </p>
        </div>
      </div>

      {/* AI Trading */}
      <div className="mt-12 px-4">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">
          AI-Powered Trading with 93% Winrate
        </h3>
        <p className="text-lg text-gray-600 mb-6">
          Let us take the stress out of trading for you! Our platform uses advanced AI to manage your investments with an impressive 93% win rate.
          Focus on what matters most while we handle the trading for you, ensuring consistent profits and reducing the risk.
        </p>
      </div>

      {/* Get Started Button */}
      <div className="mt-8">
        <button className="btn btn-primary text-lg px-8 py-3 rounded-lg">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Investment;
