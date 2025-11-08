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
  phone: {
    type: String,
    required: false, // Set to false for now
    match: /^[0-9]{10,15}$/, // Allows only numbers with a length of 10 to 15 digits
  },

  userId: { 
    type: String,
    required: true,
    unique: true,
    default: function () {
      return this.email; // Automatically set `userId` to the value of `email`
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  // Subscription details
  subscription: {
    plan: { type: String, enum: ['1-task', '2-tasks', '5-tasks', 'custom'], required: false },
    tasksLeft: { type: Number, default: 0 },
    expiryDate: { type: Date, default: null },
  },
  // Transaction history
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
  // Assigned tasks
  tasks: [
    {
      description: String,
      status: { type: String, enum: ['pending', 'completed'], default: 'pending' },
      transportCost: { type: Number, default: 0 },
      completionDate: Date,
    },
  ],
  // Created tasks by the user
  createdTasks: [
    {
      description: { type: String, required: true },
      from: { type: String, required: true },
      to: { type: String, required: true },
      phone: { type: String, required: true },
      status: { type: String, enum: ['open', 'assigned', 'completed'], default: 'open' },
      bids: [
        {
          agent: { type: mongoose.Schema.Types.ObjectId, ref: 'Agent' },
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
