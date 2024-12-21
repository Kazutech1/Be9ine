import mongoose from "mongoose";

const investmentPlanSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Plan name is required"],
    trim: true,
  },
  type: {
    type: String,
    required: [true, "Plan type is required"],
    trim: true,
  },
  minDeposit: {
    type: Number,
    required: [true, "Minimum deposit is required"],
  },
  duration: {
    type: Number,
    required: [true, "Duration is required"], 
    min: 0.001, // Ensure the duration is at least 1 day
  },
  expectedReturn: {
    type: Number,
    required: [true, "Expected return is required"],
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  image: {
    type: String,  // This will store the URL or file path of the image
    required: false,  // Set to true if the image is required
  },
}, { timestamps: true });

const InvestmentPlan = mongoose.model("InvestmentPlan", investmentPlanSchema);

export default InvestmentPlan;
