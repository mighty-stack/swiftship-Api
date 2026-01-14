const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")

const UserSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["driver", "customer", "admin"],
      default: "customer"
    }
  },
  { timestamps: true }
)





module.exports = mongoose.model("User", UserSchema)
