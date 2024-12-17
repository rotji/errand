const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  from: { type: String, required: true },
  to: { type: String, required: true },
  phone: { type: String, required: true },
});

module.exports = mongoose.model("Task", taskSchema);
