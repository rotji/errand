const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
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
    type: {
      type: String,  // Geospatial type (Point)
      default: "Point",
    },
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

// Create a 2dsphere index for geospatial queries
userSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("User", userSchema);
