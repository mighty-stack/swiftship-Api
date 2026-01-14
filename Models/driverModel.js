const mongoose = require('mongoose')

const driverSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  full_name: { type: String, required: true },
  phone: { type: String, required: true },
  license_number: { type: String, required: true },
  vehicle_type: { type: String, required: true },
  vehicle_plate: { type: String, required: true },
  vehicle_model: { type: String, required: true },
}, { timestamps: true })

module.exports = mongoose.model('Driver', driverSchema)
