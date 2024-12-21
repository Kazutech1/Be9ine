import React from "react";

const PlanCard = ({ plan, user, onPurchase }) => {
  const { name, price, duration, profit, returns, image, planId } = plan;

  const handleClick = () => {
    onPurchase(plan._id, user.globalDepositBalance); // Pass planId and globalDepositBalance
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col justify-between h-96">
      {/* Plan Image */}
      <div className="w-full h-40 overflow-hidden rounded-lg mb-4">
      <img
  src={plan.image}
  alt={name}
  className="w-full h-full object-contain"
/>
      </div>

      {/* Plan Details */}
      <div className="flex-1">
        <h2 className="text-xl font-semibold text-green-500 mb-4">{name}</h2>
        <p className="text-gray-400 mb-2">
          <span className="font-bold text-white">Price:</span> {plan.minDeposit}
        </p>
        <p className="text-gray-400 mb-2">
          <span className="font-bold text-white">Duration:</span> {plan.duration} day
        </p>
        <p className="text-gray-400 mb-2">
          <span className="font-bold text-white">Profit:</span> {plan.expectedReturn}%
        </p>
        <p className="text-gray-400 mb-4">
          <span className="font-bold text-white">Returns:</span>{" "}
          {plan.minDeposit + (plan.expectedReturn / 100) + 1}
        </p>
      </div>

      {/* Purchase Button */}
      <button
        onClick={handleClick} // Use the updated handleClick function
        className="bg-green-500 text-gray-900 font-bold py-2 px-4 rounded-lg hover:bg-green-600"
      >
        Purchase
      </button>
    </div>
  );
};

export default PlanCard;
