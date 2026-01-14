const jwt = require("jsonwebtoken");
const User = require("../Models/userModel");
require("dotenv").config()

// -------------------
// MAIN AUTH MIDDLEWARE
// -------------------
const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Not authorized, token missing" });
    }

    const token = authHeader.split(" ")[1];

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch user from DB
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({ message: "Not authorized, user not found" });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Not authorized, invalid or expired token" });
  }
};

// -------------------
// ROLE CHECK MIDDLEWARE
// -------------------
const allowRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Not authorized" });
    }
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied, insufficient permissions" });
    }
    next();
  };
};

// Convenience wrappers
const adminOnly = allowRoles("admin");
const driverOnly = allowRoles("driver");
const customerOnly = allowRoles("customer");

module.exports = {
  protect,
  allowRoles,
  adminOnly,
  driverOnly,
  customerOnly,
};
