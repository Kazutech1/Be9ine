import React from "react";
import UserDetails from "../components/dashboard/UserInfo";
import Investments from "../components/dashboard/Investments";
import Referrals from "../components/dashboard/Referrals";
import Profile from "../components/dashboard/Profile";
import CryptoNews from "../components/dashboard/CryptoNews";
import useDashboard from "../hooks/useDashboard";
import ErrorMessage from "../components/others/Error";

const Dashboard = () => {
  const { user, referralLoading, loading, error, currentPlan } = useDashboard();

  // Error State
  if (error) return <ErrorMessage message={error} />;

  // No User Data
  if (!user) return <ErrorMessage message="User data is not available." />;

  // Safe Access to currentPlan
  const activePlan = user?.activePlans || [];

  return (
    <div className="flex flex-col p-6 min-h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold text-green-500 mb-6">Dashboard</h1>

      <div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-6 overflow-auto">
        {/* Left Section */}
        <div className="flex flex-col space-y-6 lg:w-3/4 w-full">
          <UserDetails user={user} />

          {/* Investments */}
          <Investments investments={currentPlan} />

          {/* Referrals */}
          <Referrals
            referrals={{
              referralData: user?.referralData || {},
              referredUsers: user?.referredUsers || [],
            }}
          />
        </div>

        {/* Right Section */}
        <div className="lg:w-1/4 w-full space-y-6">
          <Profile user={user} loading={referralLoading} />
          <CryptoNews />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
