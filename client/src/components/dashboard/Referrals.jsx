import React from 'react';

const Referrals = ({ referrals }) => {
  const { referralData, referredUsers } = referrals;

  if (!referralData) {
    return (
      <div className="bg-gray-800 p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-green-500 mb-4">Referrals</h3>
        <div className="text-gray-400">No referral data available.</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold text-green-500 mb-4">Referrals</h3>
      <div className="space-y-4">
        <div className="flex justify-between">
          <span className="text-gray-400">Referral Code:</span>
          <span className="text-white">{referralData.referralCode || "N/A"}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Referral Link:</span>
          <span className="text-white">
            {`www.example.com/referral/${referralData.referralCode || "N/A"}`}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-400">Referred By:</span>
          <span className="text-white">{referralData.referredByEmail || "None"}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">People Referred:</span>
          <span className="text-white">{referredUsers?.length || 0}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Referral Bonus:</span>
          <span className="text-white">$200.00</span>
        </div>
      </div>
    </div>
  );
};

export default Referrals;
