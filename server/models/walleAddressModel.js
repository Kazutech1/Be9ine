import mongoose from "mongoose";

const walletAddressSchema = new mongoose.Schema({
  address: { type: String, required: true, unique: true },
  isActive: { type: Boolean, default: true },
});

const WalletAddress = mongoose.model("WalletAddress", walletAddressSchema);
export default WalletAddress;
