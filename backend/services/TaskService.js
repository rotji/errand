const Task = require("../models/Task"); // Mongoose Task model

const TaskService = {
  // Create a new task
  async createTask(taskData) {
    try {
      console.log("// Input taskData:", taskData);
      
      if (!taskData.title || !taskData.userId) {
        throw new Error("Task must include a title and userId");
      }

      const task = new Task(taskData);
      const savedTask = await task.save();
      console.log("// Mongoose save result:", savedTask);
      
      return { success: true, task: savedTask };
    } catch (error) {
      console.error("Error creating task:", error.message || error);
      throw new Error("Failed to create task");
    }
  },

  // Get all tasks
  async getAllTasks() {
    try {
      const tasks = await Task.find().sort({ createdAt: -1 });
      console.log("// Mongoose find result for all tasks:", tasks.length, "tasks found");

      return { success: true, tasks };
    } catch (error) {
      console.error("Error retrieving tasks:", error.message || error);
      throw new Error("Failed to retrieve tasks");
    }
  },

  // Get tasks by user email (userId refers to user email)
  async getTasksByUserId(userId) {
    try {
      console.log("// Input userId:", userId);
      
      if (!userId) {
        throw new Error("User email is required to fetch tasks");
      }

      const tasks = await Task.find({ userId }).sort({ createdAt: -1 });
      console.log("// Mongoose find result for userId:", tasks.length, "tasks found");

      return tasks;
    } catch (error) {
      console.error("Error retrieving tasks by user email:", error.message || error);
      throw new Error("Failed to retrieve tasks for user");
    }
  },

  // Get a task by ID
  async getTaskById(taskId) {
    try {
      console.log("// Input taskId:", taskId);
      
      const task = await Task.findById(taskId);
      console.log("// Mongoose findById result:", task ? "Task found" : "Task not found");

      if (!task) {
        throw new Error("Task not found");
      }
      return task;
    } catch (error) {
      console.error("Error retrieving task by ID:", error.message || error);
      throw new Error("Failed to retrieve task");
    }
  },

  // Add a bid to a task
  async addBid(taskId, bid) {
    try {
      console.log("// Input taskId:", taskId, "// Input bid:", bid);
      
      const task = await Task.findById(taskId);
      console.log("// Task found for bid:", task ? "Yes" : "No");
      
      if (!task) {
        throw new Error("Task not found");
      }

      task.bids.push(bid);
      const updatedTask = await task.save();
      console.log("// Mongoose save result for addBid:", updatedTask.bids.length, "total bids");

      return { success: true, bids: updatedTask.bids };
    } catch (error) {
      console.error("Error adding bid:", error.message || error);
      throw new Error("Failed to add bid to task");
    }
  },

  // Update task status
  async updateTaskStatus(taskId, status) {
    try {
      console.log("// Input taskId:", taskId, "// Input status:", status);
      
      const task = await Task.findByIdAndUpdate(
        taskId, 
        { status }, 
        { new: true, runValidators: true }
      );
      console.log("// Mongoose findByIdAndUpdate result:", task ? "Updated successfully" : "Task not found");
      
      if (!task) {
        throw new Error("Task not found");
      }

      return { success: true, task };
    } catch (error) {
      console.error("Error updating task status:", error.message || error);
      throw new Error("Failed to update task status");
    }
  },
};

module.exports = TaskService;
