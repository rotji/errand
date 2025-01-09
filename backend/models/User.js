const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: { 
    type: String,
    required: true,
    unique: true,
    match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, // Basic email validation
  },
  password: {  
    type: String,
    required: true,
    minlength: 4, // Shorter password allowed for prototype
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  // Existing fields for subscription, transactions, and tasks
  subscription: {
    plan: { type: String, enum: ['1-task', '2-tasks', '5-tasks', 'custom'], required: false },
    tasksLeft: { type: Number, default: 0 },
    expiryDate: { type: Date, default: null },
  },
  transactions: [
    {
      plan: String,
      amount: Number,
      date: { type: Date, default: Date.now },
      paymentMethod: String,
      details: {
        tasksCompleted: Number,
        transportCharges: Number,
        platformCharges: Number,
      },
    },
  ],
  tasks: [
    {
      description: String,
      status: { type: String, enum: ['pending', 'completed'], default: 'pending' },
      transportCost: { type: Number, default: 0 },
      completionDate: Date,
    },
  ],
  // New: User-created tasks
  createdTasks: [
    {
      title: { type: String, required: true },
      description: { type: String, required: true },
      from: { type: String, required: true },
      to: { type: String, required: true },
      phone: { type: String, required: true },
      status: { type: String, enum: ['open', 'assigned', 'completed'], default: 'open' }, // Task status
      bids: [
        {
          agent: { type: mongoose.Schema.Types.ObjectId, ref: 'Agent' }, // Reference to the bidding agent
          amount: Number,
          date: { type: Date, default: Date.now },
          status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
        },
      ],
      createdAt: { type: Date, default: Date.now },
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
