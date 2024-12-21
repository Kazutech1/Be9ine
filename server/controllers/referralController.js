import User from "../models/userModel.js";

// Get user's referral code, referred users, and the email of the user who referred them
export const getReferralData = async (req, res) => {
  try {
    // Find the user and populate the referredUsers and referredBy fields
    const user = await User.findById(req.user._id).populate([
      {
        path: "referredUsers",
        select: "name email", // Fetch only name and email of referred users
      },
      {
        path: "referredBy", // Populate the user who referred the current user
        select: "email", // Fetch only the email of the referrer
      },
    ]);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the user has a referrer and send the response
    const referredByEmail = user.referredBy ? user.referredBy.email : "none";

    res.json({
      referralCode: user.referralCode,
      referredUsers: user.referredUsers, // Populated referred users
      referredByEmail, // Email of the user who referred
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching referral data", error });
  }
};

// Reward referrer for a successful referral
export const rewardReferrer = async (req, res) => {
  const { referrerId, rewardAmount } = req.body;

  try {
    const referrer = await User.findById(referrerId);

    if (!referrer) {
      return res.status(404).json({ message: "Referrer not found" });
    }

    // Example logic: Add reward to user's balance
    referrer.balance = (referrer.balance || 0) + rewardAmount;
    await referrer.save();

    res.json({ message: "Referrer rewarded successfully", balance: referrer.balance });
  } catch (error) {
    res.status(500).json({ message: "Error rewarding referrer", error });
  }
};
