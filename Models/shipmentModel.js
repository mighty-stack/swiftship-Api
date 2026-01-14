const mongoose = require("mongoose")

const shipmentSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    driver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    tracking_id: {
      type: String,
      unique: true,
      required: true,
    },

    pickup_address: { type: String, required: true },
    delivery_address: { type: String, required: true },
    package_description: { type: String },
    weight: { type: Number },

    status: {
      type: String,
      enum: ["pending", "picked-up", "in-transit", "delivered", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model("Shipment", shipmentSchema)
