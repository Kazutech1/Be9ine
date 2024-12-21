import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import { generateReferralCode } from "../utils/referralUtils.js"; // We'll create this utility
import { generateWallet } from "../utils/tronService.js";


// Generate JWT
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "15d" });
};

// Sign Up
export const signup = async (req, res) => {
  const { name, email, password, referralCode, isAdmin = false } = req.body;

  try {
    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Generate a unique referral code for the new user
    const userReferralCode = generateReferralCode();

    // Generate TRON Wallet for the new user (await the promise)
    const { address, privateKey } = await generateWallet(); // Await the promise

    // Create the new user with the wallet information
    const user = await User.create({
      name,
      email,
      password,
      referralCode: userReferralCode, // Save the generated referral code for the user
      isAdmin,
      tronWalletAddress: address, // Save TRON wallet address
      tronWalletPrivateKey: privateKey, // Save the private key
    });

    // Handle referral logic after user creation
    if (referralCode) {
      const existingReferrer = await User.findOne({ referralCode });
      if (existingReferrer) {
        user.referredBy = existingReferrer._id; // Save the referrer to the user
        await user.save(); // Save user after adding referredBy

        // Add the new user to the referrer's referredUsers array
        existingReferrer.referredUsers.push(user._id);
        await existingReferrer.save(); // Save the referrer
      }
    }

    // Respond with the created user's data, excluding password
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      tronWalletAddress: user.tronWalletAddress, // Return the wallet address
      token: generateToken(user._id),
      referralCode: user.referralCode,
      referredBy: user.referredBy,
    });
  } catch (error) {
    res.status(500).json({ message: "Error signing up", error });
  }
};




// Login
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      // Generate the token
      const token = generateToken(user._id);

      // Set token in cookies (this is optional if you prefer to handle it on the frontend)
      res.cookie("jwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development", // Use secure cookies in production
        maxAge: 15 * 24 * 60 * 60 * 1000, // Cookie expires in 15 days
      });

      // Return user data along with token (optional)
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token, // Return the token to the frontend
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error logging in" });
  }
};


// Logout
export const logout = (req, res) => {
  res.cookie("jwt", "", { maxAge: 0 });
  res.json({ message: "Logged out successfully" });
};


