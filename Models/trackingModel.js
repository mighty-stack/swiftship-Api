const mongoose = require("mongoose")

const trackingSchema = new mongoose.Schema(
  {
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },

    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    status: {
      type: String,
      enum: [
        "pending",
        "processing",
        "in-progress",
        "completed",
        "cancelled",
      ],
      default: "pending",
    },

    message: {
      type: String,
      default: "",
    },

    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin", // or "User" depending on system
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Tracking", trackingSchema);
