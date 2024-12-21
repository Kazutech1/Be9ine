import express from "express";
import { buyPlan, getCurrentPlan } from "../controllers/userInvestmentController.js";
import { showUserBalance } from "../controllers/userController.js";
import { requestWithdrawal } from "../controllers/userController.js";
import { getWithdrawalHistory } from "../controllers/userController.js";
import { showUserTransactions } from "../controllers/userController.js";
import { getCompletedPlans } from "../controllers/userInvestmentController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Route to buy an investment plan
router.post("/buy-plan", protect, buyPlan);

router.get('/current', protect, getCurrentPlan); 

// Route to get user balances
router.get("/balance", protect, showUserBalance)

router.get('/completed-plans', protect, getCompletedPlans);

router.get("/history", protect, showUserTransactions)

// Withdrawal route
router.post("/withdraw", protect, requestWithdrawal);

router.get("/withdrawal/history", protect, getWithdrawalHistory);





export default router
