const Shipment = require("../Models/shipmentModel");
const User = require("../Models/userModel");
const Tracking = require("../Models/trackingModel");

getDashboardData = async (req, res) => {
  try {
    const customerId = req.user.id; // assuming you store user ID in JWT

    // Get logged-in customer
    const customer = await User.findById(customerId).select("firstname email");

    // Get shipments belonging to this customer
    const shipments = await Shipment.find({ customer: customerId })
      .sort({ createdAt: -1 })
      .select(
        "tracking_id pickup_address delivery_address status created_at"
      );

    res.json({
      customer,
      shipments,
    });
  } catch (err) {
    console.error("Dashboard fetch error:", err);
    res.status(500).json({ message: "Server error fetching dashboard data" });
  }
};
  

getMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Failed to load profile" });
  }
};

updateMyProfile = async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(
      req.user._id,
      req.body,
      { new: true }
    ).select("-password");

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Failed to update profile" });
  }
};

createShipment = async (req, res) => {
  try {
    const shipment = await Shipment.create({
      ...req.body,
      customer: req.user._id,
      status: "pending",
    });

    res.status(201).json(shipment);
  } catch (err) {
    res.status(500).json({ message: "Failed to create shipment" });
  }
};

getMyShipments = async (req, res) => {
  try {
    const shipments = await Shipment.find({ customer: req.user._id })
      .populate("driver", "fullName email")
      .populate("customer", "fullName email");

    res.json(shipments);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch shipments" });
  }
};

trackShipment = async (req, res) => {
  try {
    const tracking = await Tracking.findOne({
      trackingNumber: req.params.trackingNumber,
    });

    if (!tracking) {
      return res.status(404).json({ message: "Tracking number not found" });
    }

    res.json(tracking);
  } catch (err) {
    res.status(500).json({ message: "Unable to track shipment" });
  }
};

module.exports = {
  getDashboardData,
  getMyProfile,
  updateMyProfile,  
  createShipment,
  getMyShipments,
  trackShipment
}