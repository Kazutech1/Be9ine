import InvestmentPlan from '../models/investmentPlansModel.js';
import Investment from '../models/investmentModel.js';

// @desc    Create a new investment plan
// @route   POST /api/investments
// @access  Admin

export const createInvestmentPlan = async (req, res) => {
  const { name, type, minDeposit, duration, expectedReturn, image } = req.body;

  // Validate required fields
  if (!name || !type || !minDeposit || !duration || !expectedReturn) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Create the investment plan
    const investmentPlan = new InvestmentPlan({
      name,
      type,
      minDeposit,
      duration,
      expectedReturn,
      createdBy: req.user._id, // Associate with the admin creating the plan
      image, // Expecting a URL or base64 string for the image
    });

    await investmentPlan.save();

    res.status(201).json({
      message: "Investment plan created successfully",
      investmentPlan,
    });
  } catch (error) {
    console.error("Error creating investment plan:", error.message);
    res.status(500).json({ message: "Failed to create investment plan", error: error.message });
  }
};


// @desc    Get all investment plans
// @route   GET /api/investments
// @access  Public
export const getAllInvestmentPlans = async (req, res) => {
  try {
    const investmentPlans = await InvestmentPlan.find({});
    res.json(investmentPlans);
  } catch (error) {
    console.error('Error fetching investment plans:', error.message);
    res.status(500).json({ message: 'Failed to fetch investment plans.' });
  }
};

// @desc    Get all investments (Admin)
// @route   GET /api/investments/all
// @access  Admin
export const getAllInvestments = async (req, res) => {
  try {
    const investments = await Investment.find()
      .populate('userId', 'name email')
      .populate('planId', 'name durationInDays interestRate');

    res.status(200).json({
      message: 'Investments retrieved successfully',
      investments,
    });
  } catch (error) {
    console.error('Error fetching investments:', error.message);
    res.status(500).json({
      message: 'Error fetching investments',
      error: error.message,
    });
  }
};
