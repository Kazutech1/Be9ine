import mongoose from "mongoose";

const referralSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  referredUser: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  reward: { type: Number, default: 0 }, // Referral reward, if applicable
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Referral", referralSchema);
