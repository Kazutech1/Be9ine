import express from "express";
import {
  createInvestmentPlan,
  getAllInvestmentPlans,
  getAllInvestments, 
} from "../controllers/investmentPlanController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public Route
router.get("/", getAllInvestmentPlans);

// Admin-Only Route
router.post("/", protect, admin, createInvestmentPlan);


// Admin route to get all investments
router.get("/admin", protect, admin, getAllInvestments);



export default router;
