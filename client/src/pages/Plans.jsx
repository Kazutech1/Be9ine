import React, { useState, useEffect } from "react";
import useInvestmentPlans from "../hooks/usePlans";
import PlanCard from "../components/plans/PlanCard";
import useDashboard from "../hooks/useDashboard";
import Modal from "../components/others/Modal";
import ErrorMessage from "../components/others/Error";
import Loading from "../components/others/Loading";

const InvestmentPlans = () => {
  const { investmentPlans, loading, error, createInvestmentPlan } = useInvestmentPlans();
  const [activeCategory, setActiveCategory] = useState(null);
  const { user, setUser } = useDashboard();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState(""); // State for modal message
  const [modalType, setModalType] = useState(""); // State to determine success or error

  // Group plans by category
  const groupedPlans = investmentPlans.reduce((acc, plan) => {
    const category = plan.type || "Others"; // Default category
    if (!acc[category]) acc[category] = [];
    acc[category].push(plan);
    return acc;
  }, {});

  // Extract categories dynamically
  const categories = Object.keys(groupedPlans).map((key) => ({
    name: key,
    key,
  }));

  // Set initial active category after data fetch
  useEffect(() => {
    if (categories.length > 0 && !activeCategory) {
      setActiveCategory(categories[0].key);
    }
  }, [categories, activeCategory]);

  // Handle purchase
  const handlePurchase = async (planId, amount) => {
    if (!user || user.globalBalance < amount) {
      setModalMessage("Insufficient balance or user is not logged in.");
      setModalType("error");
      setIsModalOpen(true);
      return;
    }

    try {
      const updatedPlan = await createInvestmentPlan(planId, amount);
      setModalMessage("Plan purchased successfully!");
      setModalType("success");
      setIsModalOpen(true);

      // Update user's balance after successful purchase
      setUser((prevUser) => ({
        ...prevUser,
        globalBalance: prevUser.globalBalance - amount,
      }));

      console.log("Purchased Plan Details:", updatedPlan);
    } catch (err) {
      console.error(err);
      setModalMessage("There was an error processing your purchase.");
      setModalType("error");
      setIsModalOpen(true);
    }
  };

  if (loading) {
    return (
    <Loading />
    );
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (categories.length === 0) {
    return <div className="text-center text-gray-400">No categories available.</div>;
  }

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen flex flex-col">
      <h1 className="text-3xl font-bold text-green-500 mb-6">Investment Plans</h1>

      {/* Category Selector */}
      <div className="flex space-x-4 mb-6 flex-wrap">
        {categories.map((category) => (
          <button
            key={category.key}
            onClick={() => setActiveCategory(category.key)}
            className={`px-6 py-3 rounded-lg font-semibold transition-all text-lg ${
              activeCategory === category.key
                ? "bg-green-500 text-gray-900"
                : "bg-gray-700 hover:bg-gray-600"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Scrollable Content Section */}
      <div className="flex-grow overflow-y-auto">
        {groupedPlans[activeCategory] && groupedPlans[activeCategory].length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {groupedPlans[activeCategory].map((plan, index) => (
              <PlanCard
                key={`${plan.planId}-${index}`} // Combines planId with the index for uniqueness
                plan={plan}
                user={user}
                onPurchase={handlePurchase} // Pass the handlePurchase function
              />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-400 mt-6">No plans available for this category.</div>
        )}
      </div>

      {/* Modal to show purchase status */}
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={modalType === "success" ? "Success" : "Error"}>
          <div className="text-center">
            <p className={modalType === "success" ? "text-green-500" : "text-red-500"}>{modalMessage}</p>
            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-4 py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default InvestmentPlans;
