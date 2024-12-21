import express from "express";
import { getProfile } from "../controllers/ProfileController.js";
import { updateProfile } from "../controllers/ProfileController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getProfile);
router.put("/", protect, updateProfile);

export default router;
