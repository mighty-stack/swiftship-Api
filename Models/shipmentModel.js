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
    pickup_city: { type: String },
    pickup_state: { type: String },

    delivery_address: { type: String, required: true },
    delivery_city: { type: String },
  delivery_state: { type: String },

  receiver_name: { type: String },
  receiver_phone: { type: String },

  package_type: { type: String },
    package_description: { type: String },
    weight: { type: Number },

    price: { type: Number },

  payment_status: {
    type: String,
    enum: ["pending","paid"],
    default: "pending"
  },


    status: {
      type: String,
      enum: ["pending", "picked-up", "in-transit", "delivered", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model("Shipment", shipmentSchema)
