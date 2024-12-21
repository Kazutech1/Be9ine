import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDb from "./db/connecctDb.js";
import authRoutes from './routes/authRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import profileRoutes from './routes/profileRoutes.js';
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import investmentPlanRoutes from "./routes/investmentPlanRoutes.js";
import referralRoutes from "./routes/referralRoutes.js";
// import "./cron/cronJobs.js";

dotenv.config();
connectDb();

const app = express();

// CORS configuration
app.use(cors({
  origin: 'https://be9ine-kazutos-projects-2eff7a65.vercel.app', // Correct URL without trailing slash
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, // If you need to send cookies or other credentials
}));

app.use(express.json());
app.use(cookieParser()); // Middleware to parse cookies

// Routes
app.use("/api/profile", profileRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use("/api/investments", investmentPlanRoutes);
app.use("/api/referral", referralRoutes);
app.use("/api/admin", adminRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
