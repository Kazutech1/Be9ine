import User from "../models/userModel.js";
import cron from "node-cron";

cron.schedule("0 0 * * *", async () => {
  console.log("Running daily interest calculation...");

  try {
    const users = await User.find({ "activePlans.isCompleted": false });

    users.forEach(async (user) => {
      user.activePlans.forEach((plan) => {
        const today = new Date();
        const isPlanActive = today >= plan.startDate && today < plan.endDate;

        if (isPlanActive) {
          const dailyReturn = (plan.investedAmount * plan.expectedReturn) / (100 * plan.duration);
          user.withdrawableBalance += dailyReturn;
        }

        // Mark plan as completed if the end date is reached
        if (today >= plan.endDate) {
          plan.isCompleted = true;
        }
      });

      // Save updated user data
      await user.save();
    });

    console.log("Daily interest calculation completed.");
  } catch (error) {
    console.error("Error during interest calculation:", error);
  }
});
