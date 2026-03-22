const Shipment = require("../Models/shipmentModel.js")

// Generate random tracking ID
const generateTrackingId = () =>
  "TRK" + Math.floor(100000 + Math.random() * 900000)

const createShipment = async (req, res) => {
  try {
    const tracking_id = generateTrackingId()

    const shipment = await Shipment.create({
      ...req.body,
      customer: req.user.id, // customer from token
      tracking_id,
    })

    res.status(201).json(shipment)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Cannot create shipment" })
  }
}

const getCustomerShipments = async (req, res) => {
  try {
    const shipments = await Shipment.find({ customer: req.user.id })
      .sort({ createdAt: -1 })

    res.json(shipments)
  } catch (err) {
    res.status(500).json({ message: "Error loading shipments" })
  }
}

// GET /tracking/:id
const trackShipment = async (req, res) => {
  try {
    const shipment = await Shipment.findById(req.params.id)

    if (!shipment)
      return res.status(404).json({ message: "Shipment not found" })

    res.json(shipment)
  } catch (err) {
    res.status(500).json({ message: "Tracking error" })
  }
}

// ADMIN / DRIVER: Update status
const updateShipmentStatus = async (req, res) => {
  try {
    const shipment = await Shipment.findById(req.params.id)

    if (!shipment) return res.status(404).json({ message: "Shipment not found" })

    shipment.status = req.body.status
    await shipment.save()

    res.json(shipment)
  } catch (err) {
    res.status(500).json({ message: "Failed to update status" })
  }
}

module.exports = {
  createShipment,
  getCustomerShipments,
  trackShipment,
  updateShipmentStatus,
}