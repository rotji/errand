const { connectToMongoDB } = require("../utils/mongoClient"); // MongoDB client utility
const { ObjectId } = require("mongodb"); // Import ObjectId for MongoDB queries

const TaskService = {
  // Create a new task
  async createTask(taskData) {
    try {
      if (!taskData.title || !taskData.userId) {
        throw new Error("Task must include a title and userId");
      }

      const db = await connectToMongoDB();
      const result = await db.collection("tasks").insertOne(taskData);
      return { success: true, task: { ...taskData, _id: result.insertedId } }; // Ensure the response includes the insertedId
    } catch (error) {
      console.error("Error creating task:", error.message || error);
      throw new Error("Failed to create task");
    }
  },

  // Get all tasks
  async getAllTasks() {
    try {
      const db = await connectToMongoDB();
      const tasks = await db.collection("tasks").find().toArray();
      return { success: true, tasks };
    } catch (error) {
      console.error("Error retrieving tasks:", error.message || error);
      throw new Error("Failed to retrieve tasks");
    }
  },

  // Get tasks by user email (userId refers to user email)
  async getTasksByUserId(userId) {
    try {
      if (!userId) {
        throw new Error("User email is required to fetch tasks");
      }

      const db = await connectToMongoDB();
      const tasks = await db.collection("tasks").find({ userId }).toArray();
      return tasks;
    } catch (error) {
      console.error("Error retrieving tasks by user email:", error.message || error);
      throw new Error("Failed to retrieve tasks for user");
    }
  },

  // Get a task by ID
  async getTaskById(taskId) {
    try {
      if (!ObjectId.isValid(taskId)) {
        throw new Error("Invalid task ID format");
      }

      const db = await connectToMongoDB();
      const task = await db.collection("tasks").findOne({ _id: new ObjectId(taskId) });
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
      if (!ObjectId.isValid(taskId)) {
        throw new Error("Invalid task ID format");
      }

      const db = await connectToMongoDB();
      const task = await db.collection("tasks").findOne({ _id: new ObjectId(taskId) });
      if (!task) {
        throw new Error("Task not found");
      }

      const updatedBids = task.bids || [];
      updatedBids.push(bid);

      await db.collection("tasks").updateOne(
        { _id: new ObjectId(taskId) },
        { $set: { bids: updatedBids } }
      );

      return { success: true, bids: updatedBids };
    } catch (error) {
      console.error("Error adding bid:", error.message || error);
      throw new Error("Failed to add bid to task");
    }
  },

  // Update task status
  async updateTaskStatus(taskId, status) {
    try {
      if (!ObjectId.isValid(taskId)) {
        throw new Error("Invalid task ID format");
      }

      const db = await connectToMongoDB();
      const task = await db.collection("tasks").findOne({ _id: new ObjectId(taskId) });
      if (!task) {
        throw new Error("Task not found");
      }

      await db.collection("tasks").updateOne(
        { _id: new ObjectId(taskId) },
        { $set: { status } }
      );

      return { success: true, task: { ...task, status } };
    } catch (error) {
      console.error("Error updating task status:", error.message || error);
      throw new Error("Failed to update task status");
    }
  },
};

module.exports = TaskService;
