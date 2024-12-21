import Investment from "../models/investmentModel.js";
import User from "../models/userModel.js";

// Get all investments (Admin)
export const getAllInvestments = async (req, res) => {
  try {
    const investments = await Investment.find()
      .populate("userId", "name email")
      .populate("planId", "name durationInDays interestRate");

    res.status(200).json({
      message: "Investments retrieved successfully",
      investments,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error fetching investments",
      error,
    });
  }
};


// Get user investments (Protected)
export const getUserInvestments = async (req, res) => {
  try {
    const investments = await Investment.find({ userId: req.user._id });
    res.status(200).json(investments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching your investments", error });
  }
};

// Process maturity (Admin)
//  export const processInvestmentMaturity = async (req, res) => {
//   try {
//     const investments = await Investment.find({ status: "active" });

//     const currentDate = new Date();
//     const maturedInvestments = investments.filter((investment) =>
//       currentDate >= investment.maturityDate
//     );

//     for (const investment of maturedInvestments) {
//       investment.status = "completed";
//       await investment.save();

//       // Update user balance
//       const user = await User.findById(investment.userId);
//       const plan = await InvestmentPlan.findById(investment.planId);

//       const interest = (plan.interestRate / 100) * plan.durationInDays;
//       user.balance += interest;
//       await user.save();
//     }

//     res.status(200).json({
//       message: "Processed matured investments successfully",
//       maturedCount: maturedInvestments.length,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       message: "Error processing investment maturity",
//       error,
//     });
//   }
//  };

export const processMaturity = async (req, res) => {
  try {
    const today = new Date();

    // Fetch matured investments with criteria
    const maturedInvestments = await Investment.find({
      maturityDate: { $lte: today },
      status: "active",
    });

    let maturedCount = 0;
    const maturedDetails = []; // To track details for response

    for (const investment of maturedInvestments) {
      investment.status = "completed";
      await investment.save();

      maturedCount++;
      maturedDetails.push({
        id: investment._id,
        userId: investment.userId,
        planId: investment.planId,
        maturityDate: investment.maturityDate,
        status: investment.status,
      });
    }

    res.status(200).json({
      message: "Processed matured investments successfully",
      maturedCount: maturedCount,
      details: maturedDetails, // Return details of processed investments
    });
  } catch (error) {
    res.status(500).json({
      message: "Error processing matured investments",
      error: error.message,
    });
  }
};

