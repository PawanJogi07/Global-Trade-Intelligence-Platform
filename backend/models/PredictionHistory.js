const mongoose = require("mongoose");

const predictionHistorySchema = new mongoose.Schema({
  shipmentId: {
    type: String,
    required: true,
  },

  predictedRisk: {
    type: Number,
    required: true,
  },

  risk: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model(
  "PredictionHistory",
  predictionHistorySchema
);