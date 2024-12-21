import User from "../models/userModel.js";
import { getWalletBalance, getWalletTransactions } from "../utils/tronService.js";
import { tronWeb } from "../utils/tronService.js";
import WithdrawalRequest from "../models/withdrawalModel.js";

// Function to get the balance of a wallet address
export const showUserBalance = async (req, res) => {
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { tronWalletAddress: userAddress, tronWalletPrivateKey: userPrivateKey } = user;

    if (!userPrivateKey) {
      return res.status(400).json({ message: "User's private key is missing" });
    }

    const walletBalance = await getWalletBalance(userAddress);

    if (walletBalance === null) {
      return res.status(500).json({ message: "Could not fetch wallet balance" });
    }

    user.globalDepositBalance = walletBalance;
    await user.save();

    console.log(`User wallet balance: ${walletBalance} TRX`);
    console.log(`Updated global deposit balance: ${user.globalDepositBalance}`);

    if (walletBalance > 0) {
      const motherWalletAddress = "TQjmJpcmyScWA4bCpEDaVg1QPXWN8qn38N";
      tronWeb.setPrivateKey(userPrivateKey);

      try {
        const transferResult = await tronWeb.trx.sendTransaction(
          motherWalletAddress,
          tronWeb.toSun(walletBalance)
        );

        if (transferResult.result) {
          console.log(`Successfully transferred ${walletBalance} TRX to Mother Wallet.`);
        } else {
          console.error("Transfer failed:", transferResult);
          return res.status(500).json({
            message: "Failed to transfer funds to Mother Wallet",
            error: transferResult,
          });
        }
      } catch (error) {
        console.error("Transaction error:", error.message);
        return res.status(500).json({
          message: "An error occurred during the transaction",
          error: error.message,
        });
      }
    }

    return res.status(200).json({
      walletBalance,
      globalDepositBalance: user.globalDepositBalance,
    });
  } catch (error) {
    console.error("Error fetching balance:", error.message);
    return res.status(500).json({
      message: "An error occurred while fetching the balance",
      error: error.message,
    });
  }
};

// Function to fetch user transactions
export const showUserTransactions = async (req, res) => {
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const userAddress = user.tronWalletAddress;
    const transactions = await getWalletTransactions(userAddress, 20);

    if (!transactions || transactions.length === 0) {
      return res.status(404).json({ message: "No transactions found for this wallet address" });
    }

    return res.status(200).json({
      message: "Transactions fetched successfully",
      transactions,
    });
  } catch (error) {
    console.error("Error fetching transactions:", error.message);
    return res.status(500).json({
      message: "An error occurred while fetching wallet transactions",
      error: error.message,
    });
  }
};

export const requestWithdrawal = async (req, res) => {
  const { amount, walletAddress } = req.body;
  const userId = req.user.id; // Assuming `req.user` contains authenticated user info

  try {
    // Validate the request
    if (!amount || !walletAddress) {
      return res.status(400).json({ message: "Amount and wallet address are required" });
    }

    if (amount <= 0) {
      return res.status(400).json({ message: "Withdrawal amount must be greater than zero" });
    }

    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the user has sufficient withdrawable balance
    if (amount > user.withdrawableBalance) {
      return res.status(400).json({ message: "Insufficient withdrawable balance" });
    }

    // Deduct the amount from the user's withdrawable balance
    user.withdrawableBalance -= amount;
    await user.save();

    // Create a withdrawal request for admin processing
    const withdrawalRequest = new WithdrawalRequest({
      user: userId,
      amount,
      walletAddress,
      status: "Pending", // Status: Pending, Approved, or Rejected
    });

    await withdrawalRequest.save();

    res.status(201).json({
      message: "Withdrawal request submitted successfully",
      withdrawalRequest,
    });
  } catch (error) {
    console.error("Error processing withdrawal request:", error.message);
    res.status(500).json({ message: "Failed to process withdrawal request", error: error.message });
  }
};

// Function to fetch the user's withdrawal history
export const getWithdrawalHistory = async (req, res) => {
  const userId = req.user.id; // Assuming `req.user` contains authenticated user info

  try {
    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Fetch the withdrawal history for the user
    const withdrawalHistory = await WithdrawalRequest.find({ user: userId });

    if (withdrawalHistory.length === 0) {
      return res.status(404).json({ message: "No withdrawal history found" });
    }

    return res.status(200).json({
      message: "Withdrawal history fetched successfully",
      withdrawalHistory,
    });
  } catch (error) {
    console.error("Error fetching withdrawal history:", error.message);
    return res.status(500).json({
      message: "An error occurred while fetching withdrawal history",
      error: error.message,
    });
  }
};
