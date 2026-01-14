const User = require("../Models/userModel")
// GET ALL DRIVERS
const getDrivers = async (req, res) => {
  try {
    const drivers = await User.find({ role: "driver" }).select("-password")
    res.json(drivers)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// GET SINGLE DRIVER BY ID
const getDriverById = async (req, res) => {
  try {
    const driver = await User.findOne({ _id: req.params.id, role: "driver" }).select("-password")
    if (!driver) return res.status(404).json({ message: "Driver not found" })
    res.json(driver)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// UPDATE DRIVER PROFILE
const updateDriver = async (req, res) => {
  try {
    const updates = req.body

    const driver = await User.findOneAndUpdate(
      { _id: req.params.id, role: "driver" },
      updates,
      { new: true }
    ).select("-password")

    if (!driver) return res.status(404).json({ message: "Driver not found" })

    res.json(driver)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// DELETE DRIVER
const deleteDriver = async (req, res) => {
  try {
    const driver = await User.findOneAndDelete({
      _id: req.params.id,
      role: "driver"
    })

    if (!driver) return res.status(404).json({ message: "Driver not found" })

    res.json({ message: "Driver deleted successfully" })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

module.exports = {
  getDrivers,
  getDriverById,
  updateDriver,
  deleteDriver,
}