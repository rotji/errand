const mongoose = require("mongoose");

const agentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true, unique: true }, 
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
