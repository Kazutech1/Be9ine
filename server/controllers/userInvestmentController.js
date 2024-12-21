import User from "../models/userModel.js";
import InvestmentPlan from "../models/investmentPlansModel.js";

// Helper function to calculate the time remaining
const calculateTimeRemaining = (endDate) => {
  const now = new Date();
  const timeRemaining = endDate - now;
  if (timeRemaining <= 0) return "Plan has ended";

  const hoursRemaining = Math.floor(timeRemaining / (1000 * 60 )); // Convert milliseconds to minutes
  return `${hoursRemaining}`;
};

// Helper function to calculate the current profit based on time elapsed
const calculateCurrentProfit = (startDate, endDate, investedAmount, expectedReturn) => {
  const now = new Date();
  
  // Calculate the time elapsed
  const timeElapsed = now - new Date(startDate);
  const totalDuration = endDate - new Date(startDate);
  
  // If the plan has ended, return the full expected return
  if (timeElapsed >= totalDuration) {
    return investedAmount * expectedReturn / 100;
  }

  // Calculate the percentage of time elapsed
  const timeElapsedPercentage = timeElapsed / totalDuration;
  
  // Calculate the current profit based on the elapsed time
  const currentProfit = investedAmount * expectedReturn / 100 * timeElapsedPercentage;  
  
  return currentProfit;
};

// Buy Investment Plan
export const buyPlan = async (req, res) => {
  const { planId, investedAmount } = req.body;
  const userId = req.user.id; // Assuming the user is authenticated

  try {
    // Find the investment plan
    const plan = await InvestmentPlan.findById(planId);
    if (!plan) {
      return res.status(404).json({ message: "Investment plan not found" });
    }

    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the user already has an active plan that hasn't ended
    if (user.activePlans.length > 0) {
      const activePlan = user.activePlans[0]; // Assuming user has only one active plan at a time
      const currentTime = new Date();
      if (activePlan.endDate > currentTime) {
        return res.status(400).json({
          message: "You already have an active plan. Please wait until it ends before purchasing another one.",
          activePlan, // Send back the current plan details to show the user
        });
      }
    }

    // Validate the user's balance
    if (user.globalDepositBalance < investedAmount) {
      return res.status(400).json({ message: "Insufficient balance" });
      investedAmount = user.globalDepositBalance
    }

    // Validate the invested amount
    if (investedAmount < plan.minDeposit) {
      return res.status(400).json({
        message: `Minimum deposit for this plan is $${plan.minDeposit}`,
      });
    }

    // Deduct the invested amount from user's global deposit balance
    user.globalDepositBalance -= investedAmount;

    // Calculate end date
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + plan.duration); // Assuming `plan.duration` is in days

    // Add the plan to the user's active plans
    const newActivePlan = {
      name: plan.name,
      minDeposit: plan.minDeposit,
      duration: plan.duration,
      expectedReturn: plan.expectedReturn,
      investedAmount,
      startDate: new Date(),
      endDate,
    };

    user.activePlans.push(newActivePlan);

    // Save the user's updated data
    await user.save();

    res.status(201).json({
      message: "Investment plan purchased successfully",
      activePlans: user.activePlans,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to purchase plan", error: error.message });
  }
};

// Display Current Trade Plan (Get Current Active Plan)
// Display Current Trade Plan (Get Current Active Plan)
export const getCurrentPlan = async (req, res) => {
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.activePlans.length === 0) {
      return res.status(200).json({ message: "No active plan" });
    }

    const activePlan = user.activePlans[0]; // Assuming the user has only one active plan
    const timeRemaining = calculateTimeRemaining(activePlan.endDate);

    // Calculate the current profit based on the time elapsed
    const currentProfit = calculateCurrentProfit(
      activePlan.startDate,
      activePlan.endDate,
      activePlan.investedAmount,
      activePlan.expectedReturn
    );

    const totalReturns = currentProfit; // Current profit

    // Check if the plan has ended
    const now = new Date();
    if (now >= activePlan.endDate && !activePlan.isCompleted) {
      // Plan has ended, update the withdrawable balance
      user.withdrawableBalance += totalReturns + activePlan.investedAmount;

      // Add the plan details to the completedPlans array
      user.completedPlans.push({
        name: activePlan.name,
        investedAmount: activePlan.investedAmount,
        profitAmount: totalReturns,
        completedDate: now, // Optional: Track when the plan was completed
      });

      // Clear the activePlans array
      user.activePlans = [];

      // Save the user data
      await user.save();
    }

    const projectedEarnings =
      activePlan.investedAmount +
      (activePlan.investedAmount * activePlan.expectedReturn) / 100;

    res.status(200).json({
      currentTradePlan: activePlan.name,
      currentTradeAmount: activePlan.investedAmount,
      currentTradeDuration: `${activePlan.duration}`,
      timeRemaining,
      totalReturns: `+ $${totalReturns.toFixed(2)}`,
      projectedEarnings: `+ $${projectedEarnings.toFixed(2)}`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch current plan", error: error.message });
  }
};



// Get Completed Plans
export const getCompletedPlans = async (req, res) => {
  const userId = req.user.id; // Assuming user is authenticated
  const userRole = req.user.role; // Assuming role is available in the user object

  try {
    if (userRole === "admin") {
      // If admin, fetch all users' completed plans
      const users = await User.find({}, "name email completedPlans"); // Select only required fields

      const completedPlans = users.map((user) => ({
        userName: user.name,
        userEmail: user.email,
        completedPlans: user.completedPlans,
      }));

      return res.status(200).json({
        message: "Completed plans for all users",
        completedPlans,
      });
    } else {
      // If user, fetch only their completed plans
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      if (user.completedPlans.length === 0) {
        return res.status(200).json({ message: "No completed plans" });
      }

      return res.status(200).json({
        message: "Completed plans retrieved successfully",
        completedPlans: user.completedPlans,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch completed plans", error: error.message });
  }
};
