const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
    trim: true,
  },
  status: {
    type: String,
    enum: ["pending", "in-progress", "completed"],
    default: "pending",
  },
  requester: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  assignedAgent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Agent",
  },
  location: {
    // Geospatial data for location
    type: { type: String, default: "Point" }, // Set type to "Point"
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Create a 2dsphere index for geospatial queries
taskSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("Task", taskSchema);
