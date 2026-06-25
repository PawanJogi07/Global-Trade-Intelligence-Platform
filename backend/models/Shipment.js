const mongoose = require("mongoose");

const shipmentSchema = new mongoose.Schema({
shipmentId: {
  type: String,
  required: true,
  unique: true,
},
  route: String,

  stockLevels: Number,
  leadTimes: Number,
  shippingTimes: Number,
  shippingCosts: Number,
  manufacturingCosts: Number,

  predictedRisk: Number,
  risk: String,
});

module.exports = mongoose.model("Shipment", shipmentSchema);