const { connectToMongoDB } = require("../utils/mongoClient"); // MongoDB client utility
const Task = require("../models/Task"); // Task model

const TaskService = {
  // Create a new task
  async createTask(taskData) {
    try {
      // Using MongoDB connection
      const db = await connectToMongoDB();
      const result = await db.collection("tasks").insertOne(taskData);
      return { success: true, task: result.ops[0] }; // MongoDB returns ops array with inserted document
    } catch (error) {
      console.error("Error creating task:", error);
      throw new Error("Failed to create task");
    }
  },

  // Get all tasks
  async getAllTasks() {
    try {
      // Using MongoDB connection
      const db = await connectToMongoDB();
      const tasks = await db.collection("tasks").find().toArray();
      return { success: true, tasks };
    } catch (error) {
      console.error("Error retrieving tasks:", error);
      throw new Error("Failed to retrieve tasks");
    }
  },

  // Get a task by ID
  async getTaskById(taskId) {
    try {
      // Using the Task model for this functionality
      const task = await Task.findById(taskId);
      if (!task) {
        throw new Error("Task not found");
      }
      return { success: true, task };
    } catch (error) {
      console.error("Error retrieving task by ID:", error);
      throw new Error("Failed to retrieve task");
    }
  },

  // Add a bid to a task
  async addBid(taskId, bid) {
    try {
      // Using the Task model for business logic
      const task = await Task.findById(taskId);
      if (!task) {
        throw new Error("Task not found");
      }
      task.bids.push(bid);
      await task.save();
      return { success: true, task };
    } catch (error) {
      console.error("Error adding bid:", error);
      throw new Error("Failed to add bid to task");
    }
  },

  // Update task status
  async updateTaskStatus(taskId, status) {
    try {
      // Using the Task model for status updates
      const task = await Task.findById(taskId);
      if (!task) {
        throw new Error("Task not found");
      }
      task.status = status;
      await task.save();
      return { success: true, task };
    } catch (error) {
      console.error("Error updating task status:", error);
      throw new Error("Failed to update task status");
    }
  },
};

module.exports = TaskService;
