console.log("Starting controllers/task.js");

const { connectToMongoDB } = require('../utils/mongoClient');



// Controller to create a task
const createTask = async (req, res) => {
  console.log("Inside createTask Controller");
  try {
    const { title, description, from, to, phone, amount, transport } = req.body;
    const userId = req.body.userId || req.headers["user-email"];

    if (!title || !description || !from || !to || !phone || !amount || !transport || !userId) {
      console.log("Validation failed: Missing required fields", { title, description, from, to, phone, amount, transport, userId });
      return res.status(400).json({ error: "All fields are required" });
    }

    const newTask = {
      title,
      description,
      from,
      to,
      phone,
      amount,
      transport,
      userId,
      bids: [],
      status: "open",
      createdBy: req.user ? req.user._id : null,
    };

    const db = await connectToMongoDB(); // Connect to MongoDB
    const result = await db.collection("tasks").insertOne(newTask); // Save the task to MongoDB

    if (!result.insertedId) {
      return res.status(500).json({ error: "Failed to save the task" });
    }

    res.status(201).json({ message: "Task created successfully", task: { ...newTask, _id: result.insertedId } });
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ error: "An error occurred while creating the task" });
  }
};

// Controller to fetch tasks created by a specific user
const getUserTasks = async (req, res) => {
  try {
    const userId = req.params.userId; // Extract userId from URL params
    console.log("Fetching tasks for userId:", userId); // Debug log

    const db = await connectToMongoDB(); // Connect to MongoDB
    const tasks = await db.collection("tasks").find({ userId }).toArray(); // Fetch tasks by userId

    if (!tasks || tasks.length === 0) {
      return res.status(404).json({ message: "No tasks found for this user." });
    }

    return res.status(200).json(tasks); // Send the tasks in response
  } catch (error) {
    console.error("Error fetching tasks:", error.message);
    return res.status(500).json({ message: "Internal server error." });
  }
};

// Controller to fetch all tasks
const getAllTasks = async (req, res) => {
  try {
    const db = await connectToMongoDB(); // Connect to the database
    const tasks = await db.collection("tasks").find().toArray(); // Fetch all tasks from the 'tasks' collection

    if (!tasks || tasks.length === 0) {
      return res.status(404).json({ message: "No tasks found." });
    }

    return res.status(200).json(tasks); // Return the tasks as the response
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return res.status(500).json({ error: "An error occurred while fetching tasks" });
  }
};

// Controller to submit a task
const submitTask = async (req, res) => {
  console.log("Received request for submitTask:", req.body);
  try {
    const { taskId, userId } = req.body;

    if (!taskId || !userId) {
      return res.status(400).json({ error: "Task ID and User ID are required" });
    }

    const db = await connectToMongoDB(); // Connect to MongoDB
    const task = await db.collection("tasks").findOne({ _id: taskId }); // Fetch task by ID

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    // Update the task to mark it as submitted (adjust this logic as needed)
    const result = await db.collection("tasks").updateOne(
      { _id: taskId },
      { $set: { status: "submitted" } }
    );

    if (result.modifiedCount === 0) {
      return res.status(500).json({ error: "Failed to update the task" });
    }

    res.status(200).json({ message: "Task submitted successfully!" });
  } catch (error) {
    console.error("Error submitting task:", error);
    res.status(500).json({ error: "An error occurred while submitting the task" });
  }
};

// Add the placeBid function here
const placeBid = async (req, res) => {
  res.status(200).send("Bid placed successfully.");
};

// Controller to fetch bids for a task
const getTaskBids = (req, res) => {
  res.status(200).send({ message: "getTaskBids functionality is not implemented yet." });
};

// Controller to accept a bid
const acceptBid = (req, res) => {
  res.status(200).send({ message: "acceptBid functionality is not implemented yet." });
};

// Export all controllers
module.exports = {
  createTask,
  getUserTasks,
  getAllTasks,
  submitTask,
  placeBid,
  getTaskBids,
  acceptBid,
};

console.log("controllers/task.js exported successfully");
