import express from "express";
import { getReferralData, rewardReferrer } from "../controllers/referralController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Route to get referral code and referred users
router.get("/", protect, getReferralData);

// Route to reward a referrer
router.post("/reward", protect, rewardReferrer);

export default router;
