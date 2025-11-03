const Task = require("../models/Task");

// Query helper for fetching all tasks using Mongoose
async function getAllTasks() {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    console.log("// Mongoose find result for all tasks:", tasks.length, "tasks found");
    return tasks;
  } catch (error) {
    console.error("Error fetching all tasks:", error);
    throw error;
  }
}

module.exports = { getAllTasks };

