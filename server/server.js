import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
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

// CORS configuration to allow all origins
app.use(cors({
  origin: '*', // Allow requests from any origin
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, // Allow credentials (cookies, authorization headers)
}));

const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser()); // Middleware to parse cookies

// Handle preflight requests
app.options('*', cors());

// Routes
app.use("/api/profile", profileRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use("/api/investments", investmentPlanRoutes);
app.use("/api/referral", referralRoutes);
app.use("/api/admin", adminRoutes);

app.use(express.static(path.join(__dirname, "client", "dist")));


app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

// Health check route
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "API is running" });
});

// Listen on the port from the .env file
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Export the server handler for Vercel
export default app;
