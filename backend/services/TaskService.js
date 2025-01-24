const { connectToMongoDB } = require("../utils/mongoClient"); // MongoDB client utility
const { ObjectId } = require("mongodb"); // Import ObjectId for MongoDB queries

const TaskService = {
  // Create a new task
  async createTask(taskData) {
    try {
      console.log("// Input taskData:", taskData); // Log input arguments
      
      if (!taskData.title || !taskData.userId) {
        throw new Error("Task must include a title and userId");
      }

      const db = await connectToMongoDB();
      console.log("// Connected to MongoDB for createTask"); // Log successful connection
      
      const result = await db.collection("tasks").insertOne(taskData);
      console.log("// MongoDB insertOne result:", result); // Log MongoDB query result
      
      return { success: true, task: { ...taskData, _id: result.insertedId } };
    } catch (error) {
      console.error("Error creating task:", error.message || error);
      throw new Error("Failed to create task");
    }
  },

  // Get all tasks
  async getAllTasks() {
    try {
      const db = await connectToMongoDB();
      console.log("// Connected to MongoDB for getAllTasks"); // Log successful connection

      const tasks = await db.collection("tasks").find().toArray();
      console.log("// MongoDB find result for all tasks:", tasks); // Log query result

      return { success: true, tasks };
    } catch (error) {
      console.error("Error retrieving tasks:", error.message || error);
      throw new Error("Failed to retrieve tasks");
    }
  },

  // Get tasks by user email (userId refers to user email)
  async getTasksByUserId(userId) {
    try {
      console.log("// Input userId:", userId); // Log input argument
      
      if (!userId) {
        throw new Error("User email is required to fetch tasks");
      }

      const db = await connectToMongoDB();
      console.log("// Connected to MongoDB for getTasksByUserId"); // Log successful connection
      
      const tasks = await db.collection("tasks").find({ userId }).toArray();
      console.log("// MongoDB find result for userId:", tasks); // Log query result

      return tasks;
    } catch (error) {
      console.error("Error retrieving tasks by user email:", error.message || error);
      throw new Error("Failed to retrieve tasks for user");
    }
  },

  // Get a task by ID
  async getTaskById(taskId) {
    try {
      console.log("// Input taskId:", taskId); // Log input argument
      
      if (!ObjectId.isValid(taskId)) {
        throw new Error("Invalid task ID format");
      }

      const db = await connectToMongoDB();
      console.log("// Connected to MongoDB for getTaskById"); // Log successful connection
      
      const task = await db.collection("tasks").findOne({ _id: new ObjectId(taskId) });
      console.log("// MongoDB findOne result for taskId:", task); // Log query result

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
      console.log("// Input taskId:", taskId, "// Input bid:", bid); // Log input arguments
      
      if (!ObjectId.isValid(taskId)) {
        throw new Error("Invalid task ID format");
      }

      const db = await connectToMongoDB();
      console.log("// Connected to MongoDB for addBid"); // Log successful connection

      const task = await db.collection("tasks").findOne({ _id: new ObjectId(taskId) });
      console.log("// MongoDB findOne result for taskId (before update):", task); // Log query result
      
      if (!task) {
        throw new Error("Task not found");
      }

      const updatedBids = task.bids || [];
      updatedBids.push(bid);

      const updateResult = await db.collection("tasks").updateOne(
        { _id: new ObjectId(taskId) },
        { $set: { bids: updatedBids } }
      );
      console.log("// MongoDB updateOne result for addBid:", updateResult); // Log update result

      return { success: true, bids: updatedBids };
    } catch (error) {
      console.error("Error adding bid:", error.message || error);
      throw new Error("Failed to add bid to task");
    }
  },

  // Update task status
  async updateTaskStatus(taskId, status) {
    try {
      console.log("// Input taskId:", taskId, "// Input status:", status); // Log input arguments
      
      if (!ObjectId.isValid(taskId)) {
        throw new Error("Invalid task ID format");
      }

      const db = await connectToMongoDB();
      console.log("// Connected to MongoDB for updateTaskStatus"); // Log successful connection

      const task = await db.collection("tasks").findOne({ _id: new ObjectId(taskId) });
      console.log("// MongoDB findOne result for taskId (before update):", task); // Log query result
      
      if (!task) {
        throw new Error("Task not found");
      }

      const updateResult = await db.collection("tasks").updateOne(
        { _id: new ObjectId(taskId) },
        { $set: { status } }
      );
      console.log("// MongoDB updateOne result for updateTaskStatus:", updateResult); // Log update result

      return { success: true, task: { ...task, status } };
    } catch (error) {
      console.error("Error updating task status:", error.message || error);
      throw new Error("Failed to update task status");
    }
  },
};

module.exports = TaskService;
