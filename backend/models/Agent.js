const mongoose = require("mongoose");

const agentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  location: {
    type: { type: String, default: "Point" }, // This ensures the location is a Point
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create a geospatial index on the location field
agentSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("Agent", agentSchema);
