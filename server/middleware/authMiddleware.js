import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const protect = async (req, res, next) => {
  let token;

  try {
    // Check for token in Authorization header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    // Fallback: Check for token in cookies
    else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }

    // No token found
    if (!token) {
      return res.status(401).json({ message: "Not authorized, no token found." });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user data to request
    req.user = await User.findById(decoded.userId).select("-password");

    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Not authorized, token failed." });
  }
};

const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
      next();
    } else {
      res.status(403).json({ message: "Not authorized as an admin" });
    }
  };
  
  export { protect, admin };
  


