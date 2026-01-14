const Shipment = require("../Models/shipmentModel");

const getShipmentById = async (req, res) => {
  try {
    const shipment = await Shipment.findById(req.params.id);
    if (!shipment) return res.status(404).json({ message: "Shipment not found" });

    res.json(shipment);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getShipmentById };
