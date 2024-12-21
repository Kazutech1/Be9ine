import express from "express";
import {
  getWithdrawRequests,
  approveWithdrawRequest,
  rejectWithdrawRequest,
  getAllUsers,
  deleteUser,
} from "../controllers/adminController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();


router.get("/users", protect, admin, getAllUsers);
router.delete("/users/:id", protect, admin, deleteUser);
router.get("/withdrawals", protect, admin, getWithdrawRequests);
router.put("/withdrawals/:id/approve", protect, admin, approveWithdrawRequest);
router.put("/withdrawals/:id/reject", protect, admin, rejectWithdrawRequest);

export default router;
