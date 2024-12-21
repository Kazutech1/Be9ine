import React from "react";
import { Line } from "react-chartjs-2"; // Chart library
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import Placeholder from "./PlaceHolder";

// Registering chartjs components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Investments = ({ investments }) => {
  // Ensure investments is not null or undefined
  if (!investments || !investments.currentTradePlan) {
    return <Placeholder />; // Show placeholder if no valid investment data
  }
  

  // Example chart data for returns over time
  const chartData = {
    labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
    datasets: [
      {
        label: `${investments.totalReturns} Returns Over Time`,
        data: [0, 10, 20, 30, 40, 60, 70, 80, 90, 100],
        borderColor: "#4CAF50", // Green color for the line
        backgroundColor: "rgba(76, 175, 80, 0.2)",
        fill: true,
      },
    ],
  };

  // Investment duration in hours
  const totalDuration = investments.currentTradeDuration * 24 * 60; // Convert days to hours if duration is in days
  const hoursLeft = investments.timeRemaining; // Time remaining in hours
  const progress = ((totalDuration - hoursLeft) / totalDuration) * 100; // Percentage of completion

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold text-green-500 mb-4">Investments</h3>
      <div className="space-y-4">
        {/* Current Trade Plan */}
        <div className="flex justify-between">
          <span className="text-gray-400">Current Trade Plan:</span>
          <span className="text-white">{investments.currentTradePlan}</span>
        </div>

        {/* Current Trade Amount */}
        <div className="flex justify-between">
          <span className="text-gray-400">Current Trade Amount:</span>
          <span className="text-white text-lg font-semibold">{`$${investments.currentTradeAmount}`}</span>
        </div>

        {/* Current Trade Duration */}
        <div className="flex justify-between">
          <span className="text-gray-400">Current Trade Duration:</span>
          <span className="text-white">{investments.currentTradeDuration} days</span>
        </div>

        {/* Progress Bar for Trade Duration */}
        <div className="flex justify-between items-center">
          <span className="text-gray-400">Progress:</span>
          <div className="w-full bg-gray-600 h-2 rounded-full">
            <div
              className="bg-green-500 h-2 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <span className="text-white ml-2">{`${progress.toFixed(2)}% Completed`}</span>
        </div>

        {/* Total Returns */}
        <div className="flex justify-between">
          <span className="text-gray-400">Total Returns:</span>
          <span className="text-white text-lg font-semibold">{investments.totalReturns}</span>
        </div>

        {/* Projected Earnings */}
        <div className="flex justify-between">
          <span className="text-gray-400">Projected Earnings:</span>
          <span className="text-white text-lg font-semibold"> {investments.projectedEarnings}</span>
        </div>

        {/* Investment History */}
        <div className="bg-gray-700 p-4 rounded-lg mt-4">
          <h4 className="text-green-500 text-lg font-semibold mb-3">Investment History</h4>
          <ul className="space-y-2">
            <li className="flex justify-between">
              <span className="text-gray-400">Trade #1:</span>
              <span className="text-white">+ $200.00</span>
            </li>
            <li className="flex justify-between">
              <span className="text-gray-400">Trade #2:</span>
              <span className="text-white">+ $300.00</span>
            </li>
            <li className="flex justify-between">
              <span className="text-gray-400">Trade #3:</span>
              <span className="text-white">+ $500.00</span>
            </li>
          </ul>
        </div>

        {/* Chart - Returns Over Time */}
        <div className="mt-6">
          <h4 className="text-green-500 text-lg font-semibold mb-3">Returns Over Time</h4>
          <Line data={chartData} />
        </div>
      </div>
    </div>
  );
};

export default Investments;
