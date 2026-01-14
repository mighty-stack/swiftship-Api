const express = require("express")
const {
  createShipment,
  getCustomerShipments,
  trackShipment,
  updateShipmentStatus,
} = require("../Controllers/shipmentController.js")
const { protect } = require("../Middleware/authMiddleware.js")

const router = express.Router()


router.post("/", protect, createShipment)
router.get("/customer", protect, getCustomerShipments)
router.get("/:id", trackShipment)
router.put("/:id/status", protect, updateShipmentStatus)

module.exports = router
