import Investment from '../models/investmentModel.js';
import User from '../models/userModel.js';

export const getDashboardData = async (req, res) => {
  try {
    const userId = req.user.id;

    // Fetch active investments
    const activeInvestments = await Investment.find({ userId, status: 'active' })
      .populate('planId', 'name durationInDays interestRate');

    // Fetch user balance
    const user = await User.findById(userId).select('balance');

    // Fetch investment history
    const investmentHistory = await Investment.find({ userId }).sort({ createdAt: -1 });

    res.status(200).json({
      message: 'Dashboard data retrieved successfully',
      data: {
        balance: user.balance,
        activeInvestments,
        investmentHistory,
      },
    });
  } catch (error) {
    console.error('Error fetching dashboard data:', error.message);
    res.status(500).json({
      message: 'Error fetching dashboard data',
    });
  }
};
