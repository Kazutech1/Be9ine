import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// Modify the userSchema
const userSchema = new mongoose.Schema(
  {
    // Basic User Info
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },

    // Referral System
    referralCode: { type: String, unique: true },
    referredBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    referredUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

    // Balances
    globalDepositBalance: { type: Number, default: 100 },
    withdrawableBalance: { type: Number, default: 200 },

    tronWalletAddress: { type: String, required: true },  // Store TRON wallet address
    tronWalletPrivateKey: { type: String, required: true }, // Store TRON wallet private key

    // Active Plans
    activePlans: [
      {
        name: { type: String, required: true },
        minDeposit: { type: Number, required: true },
        duration: { type: Number, required: true }, // in days
        expectedReturn: { type: Number, required: true }, // percentage
        investedAmount: { type: Number, required: true },
        startDate: { type: Date, default: Date.now },
        endDate: { type: Date },
        isCompleted: { type: Boolean, default: false },
      },
    ],

    // Completed Plans
    completedPlans: [
      {
        name: String,
        investedAmount: Number,
        earnedAmount: Number,
        completedAt: Date,
      },
    ],

    // Password Reset
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  { timestamps: true }
);


// Middleware for Password Hashing
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // Hash only if the password is new/modified
  this.password = await bcrypt.hash(this.password, 10);

  // Generate Referral Code if not provided
  if (!this.referralCode) {
    this.referralCode = `${this.name}_${Math.random().toString(36).substr(2, 9)}`;
  }

  next();
});

// Method to Compare Passwords
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Export Model
const User = mongoose.model("User", userSchema);
export default User;
