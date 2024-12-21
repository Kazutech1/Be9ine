import mongoose from "mongoose";

const depositRequestSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  walletAddress: { type: String, required: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ["pending", "confirmed"], default: "pending" },
  requestedAt: { type: Date, default: Date.now },
  confirmedAt: { type: Date },
});

const DepositRequest = mongoose.model("DepositRequest", depositRequestSchema);
export default DepositRequest;
