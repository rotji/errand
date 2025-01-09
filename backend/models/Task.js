const mongoose = require("mongoose");

const bidSchema = new mongoose.Schema({
  agentId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  bidAmount: { type: Number, required: true },
  bidTime: { type: Date, default: Date.now },
});

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    from: { type: String, required: true },
    to: { type: String, required: true },
    phone: { type: String, required: true },
    amount: { type: Number, required: true },
    transport: { type: Number, required: true }, // Updated to accept transport amount
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Optional task creator
    submittedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Optional submitter
    bids: [bidSchema], // Array of bids using subdocument schema
    acceptedBid: bidSchema, // Single accepted bid
    status: {
      type: String,
      default: "open",
      enum: ["open", "in-progress", "completed", "closed"],
    },
  },
  { timestamps: true } // Automatically add createdAt and updatedAt fields
);

module.exports = mongoose.model("Task", taskSchema);
