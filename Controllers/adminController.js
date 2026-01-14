const User = require("../Models/userModel")
const Shipment = require("../Models/shipmentModel")

//  GET ALL USERS
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password")
    res.json(users)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// UPDATE A USER (role, status, phone, etc.)
const updateUser = async (req, res) => {
  try {
    const updates = req.body

    const user = await User.findByIdAndUpdate(req.params.id, updates, {
      new: true,
    }).select("-password")

    if (!user) return res.status(404).json({ message: "User not found" })

    res.json(user)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// DELETE USER
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id)

    if (!user) return res.status(404).json({ message: "User not found" })

    res.json({ message: "User deleted successfully" })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// ADMIN ANALYTICS (Dashboard)
const getAdminStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments()
    const totalDrivers = await User.countDocuments({ role: "driver" })
    const totalCustomers = await User.countDocuments({ role: "customer" })

    const totalShipments = await Shipment.countDocuments()
    const delivered = await Shipment.countDocuments({ status: "delivered" })
    const pending = await Shipment.countDocuments({ status: "pending" })
    const cancelled = await Shipment.countDocuments({ status: "cancelled" })

    const earningsData = await Shipment.aggregate([
      { $match: { status: "delivered" } },
      {
        $group: {
          _id: { $month: "$delivery_date" },
          earnings: { $sum: "$price" },
        },
      },
      { $sort: { "_id": 1 } },
    ])

    res.json({
      users: {
        totalUsers,
        totalDrivers,
        totalCustomers,
      },
      shipments: {
        totalShipments,
        delivered,
        pending,
        cancelled,
      },
      earningsData,
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

module.exports = {
  getAllUsers,
  updateUser,
  deleteUser,
  getAdminStats,
}