import mongoose from "mongoose";

const withdrawalRequestSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    amount: { type: Number, required: true },
    walletAddress: { type: String, required: true },
    status: { type: String, enum: ["Pending", "Approved", "Rejected"], default: "Pending" },
    processedAt: { type: Date }, // Date when the request is processed
  },
  { timestamps: true } // Adds createdAt and updatedAt fields
);

const WithdrawalRequest = mongoose.model("WithdrawalRequest", withdrawalRequestSchema);
export default WithdrawalRequest;
