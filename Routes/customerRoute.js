const express = require("express");
const router = express.Router();

const { protect, customerOnly } = require("../Middleware/authMiddleware");
const {
  getDashboardData,
  getMyProfile,
  updateMyProfile,
  createShipment,
  getMyShipments,
  trackShipment
} = require("../Controllers/customerController");

router.get("/dashboard", protect, customerOnly, getDashboardData);
router.get("/profile", protect, customerOnly, getMyProfile);
router.put("/profile", protect, customerOnly, updateMyProfile);

router.post("/shipments", protect, customerOnly, createShipment);
router.get("/shipments/my", protect, customerOnly, getMyShipments);

router.get("/track/:trackingNumber", protect, customerOnly, trackShipment);

module.exports = router;
