const taskService = require("../services/TaskService");

// Controller to create a task
const createTask = async (req, res) => {
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

    const task = await taskService.createTask(newTask);

    if (!task) {
      return res.status(500).json({ error: "Failed to save the task" });
    }

    res.status(201).json({ message: "Task created successfully", task });
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ error: "An error occurred while creating the task" });
  }
};

// Controller to fetch tasks created by a specific user
const getUserTasks = async (req, res) => {
  try {
    const userId = req.query.userId || req.headers["user-email"];

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const tasks = await taskService.getTasksByUserId(userId);

    if (!tasks || tasks.length === 0) {
      return res.status(404).json({ message: "No tasks found for this user" });
    }

    res.status(200).json({ tasks });
  } catch (error) {
    console.error("Error fetching user tasks:", error);
    res.status(500).json({ error: "An error occurred while fetching user tasks" });
  }
};

// Controller to fetch all tasks
const getAllTasks = async (req, res) => {
  try {
    const tasks = await taskService.getAllTasks();

    if (!tasks || tasks.length === 0) {
      return res.status(404).json({ message: "No tasks found" });
    }

    res.status(200).json({ tasks });
  } catch (error) {
    console.error("Error fetching all tasks:", error);
    res.status(500).json({ error: "An error occurred while fetching tasks" });
  }
};

// Define the submitTask function (for now, responding with a success message)
const submitTask = async (req, res) => {
  console.log("Received request for submitTask:", req.body);
  try {
    const { taskId, userId } = req.body;

    if (!taskId || !userId) {
      return res.status(400).json({ error: "Task ID and User ID are required" });
    }

    // Placeholder logic for submitting a task (this should be expanded with task submission logic)
    // You might want to update the task status or perform other actions here

    res.status(200).json({ message: "Task submitted successfully!" });
  } catch (error) {
    console.error("Error submitting task:", error);
    res.status(500).json({ error: "An error occurred while submitting the task" });
  }
};

// Export all controllers
module.exports = {
  createTask,
  getUserTasks,
  getAllTasks,
  submitTask,
};
