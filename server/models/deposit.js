import mongoose from "mongoose";

const depositSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  amount: { type: Number, required: true },
  transactionId: { type: String, required: true }, // Blockchain Tx ID
  status: { type: String, enum: ["pending", "approved"], default: "pending" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Deposit", depositSchema);
