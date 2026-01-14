const User = require("../Models/userModel")

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password")
    res.json(user)
  } catch (err) {
    res.status(500).json({ message: "Unable to load profile" })
  }
}

const updateProfile = async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(
      req.user.id,
      req.body,
      { new: true }
    ).select("-password")

    res.json(updated)
  } catch (err) {
    res.status(500).json({ message: "Unable to update profile" })
  }
}

module.exports = {
  getProfile,
  updateProfile
}
