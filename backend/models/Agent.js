const mongoose = require("mongoose");

const agentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { 
      type: String, 
      required: true, 
      unique: true,
      lowercase: true,
      trim: true,
      match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    },
    password: { type: String, required: true, minlength: 4 },
    phone: { 
      type: String, 
      required: false, // Make optional to avoid registration issues
      validate: {
        validator: function(v) {
          return !v || /^[0-9]{10,15}$/.test(v);
        },
        message: 'Phone number must be 10-15 digits'
      }
    }, 
    verified: { type: Boolean, default: false }, // Defaults to false for unverified agents
    location: {
      lat: { type: Number, required: false }, // Optional for registration/login
      lng: { type: Number, required: false }, // Optional for registration/login
    },
    // New: Track bids placed by the agent
    bids: [
      {
        task: { type: mongoose.Schema.Types.ObjectId, ref: "Task", required: true }, // Task being bid on
        amount: { type: Number, required: true }, // Bid amount
        date: { type: Date, default: Date.now }, // Date of the bid
        status: {
          type: String,
          enum: ["pending", "accepted", "rejected"],
          default: "pending", // Default bid status
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Agent", agentSchema);
