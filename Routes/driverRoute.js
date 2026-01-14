const express = require("express")
const router = express.Router()
const {
  getDrivers,
  getDriverById,
  updateDriver,
  deleteDriver,
} = require("../controllers/driverController")
const { protect, adminOnly } = require("../Middleware/authMiddleware")

// Only ADMIN should manage drivers
router.get("/", protect, adminOnly, getDrivers)
router.get("/:id", protect, adminOnly, getDriverById)
router.put("/:id", protect, adminOnly, updateDriver)
router.delete("/:id", protect, adminOnly, deleteDriver)

module.exports = router
