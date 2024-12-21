import Withdrawal from "../models/withdrawalModel.js";
import WalletAddress from "../models/walleAddressModel.js";
import WithdrawalRequest from "../models/withdrawalModel.js";
import User from '../models/userModel.js'

export const getWithdrawRequests = async (req, res) => {
  try {
    const requests = await Withdrawal.find().populate("user", "name email");
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: "Error fetching withdrawal requests", error });
  }
};

export const approveWithdrawRequest = async (req, res) => {
  try {
    // Find the withdrawal request by ID
    const withdrawal = await WithdrawalRequest.findById(req.params.id);
    if (!withdrawal) {
      return res.status(404).json({ message: "Withdrawal request not found" });
    }

    // Update the status to "approved"
    withdrawal.status = "Approved";
    withdrawal.processedAt = new Date(); // Track when it was processed
    await withdrawal.save();

    res.json({
      message: "Withdrawal request approved successfully",
      withdrawal,
    });
  } catch (error) {
    res.status(500).json({ message: "Error approving withdrawal request", error });
  }
};

export const rejectWithdrawRequest = async (req, res) => {
  try {
    // Find the withdrawal request by ID
    const withdrawal = await WithdrawalRequest.findById(req.params.id);
    if (!withdrawal) {
      return res.status(404).json({ message: "Withdrawal request not found" });
    }

    // Update the status to "rejected"
    withdrawal.status = "Rejected";
    withdrawal.processedAt = new Date(); // Track when it was processed
    await withdrawal.save();

    res.json({
      message: "Withdrawal request rejected successfully",
      withdrawal,
    });
  } catch (error) {
    res.status(500).json({ message: "Error rejecting withdrawal request", error });
  }
};



  export const getAllUsers = async (req, res) => {
    try {
      const users = await User.find().select("-password");
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch users", error });
    }
  };
  
  
  // Delete a user
  export const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
      const user = await User.findByIdAndDelete(id);
      if (!user) return res.status(404).json({ message: "User not found" });
  
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete user", error });
    }
  };
  
