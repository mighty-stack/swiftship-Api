const express = require("express");
const { getShipmentById } = require("../Controllers/trackingController");
const { protect } = require("../Middleware/authMiddleware");

const router = express.Router();

router.get("/:id", protect, getShipmentById);

module.exports = router;
