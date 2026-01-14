const express = require("express")
const router = express.Router()
const {
  getAllUsers,
  updateUser,
  deleteUser,
  getAdminStats,
} = require("../Controllers/adminController")
const { protect, adminOnly } = require("../Middleware/authMiddleware")

// ADMIN: Manage users
router.get("/users", protect, adminOnly, getAllUsers)
router.put("/users/:id", protect, adminOnly, updateUser)
router.delete("/users/:id", protect, adminOnly, deleteUser)

// ADMIN: Dashboard stats
router.get("/stats", protect, adminOnly, getAdminStats)

module.exports = router
