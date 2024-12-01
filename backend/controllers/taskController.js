const Task = require("../models/Task"); // Import the Task model

// Create a new task
exports.createTask = async (req, res) => {
  const { description, userId, agentId, status, location } = req.body;

  if (!description || !userId || !agentId || !status || !location) {
    return res.status(400).json({ error: "Description, userId, agentId, status, and location are required" });
  }

  try {
    const newTask = new Task({ description, userId, agentId, status, location });
    await newTask.save();
    res.status(201).json({ message: "Task created successfully", task: newTask });
  } catch (err) {
    console.error("Error creating task:", err);
    res.status(500).json({ error: "Failed to create task" });
  }
};

// Retrieve all tasks
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (err) {
    console.error("Error retrieving tasks:", err);
    res.status(500).json({ error: "Failed to retrieve tasks" });
  }
};

// Get tasks by agentId
exports.getTasksByAgent = async (req, res) => {
  const { agentId } = req.params;

  try {
    const tasks = await Task.find({ agentId });
    res.status(200).json(tasks);
  } catch (err) {
    console.error("Error retrieving tasks by agent:", err);
    res.status(500).json({ error: "Failed to retrieve tasks" });
  }
};

// Get tasks by userId
exports.getTasksByUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const tasks = await Task.find({ userId });
    res.status(200).json(tasks);
  } catch (err) {
    console.error("Error retrieving tasks by user:", err);
    res.status(500).json({ error: "Failed to retrieve tasks" });
  }
};

// Get tasks by status
exports.getTasksByStatus = async (req, res) => {
  const { status } = req.params;

  try {
    const tasks = await Task.find({ status });
    res.status(200).json(tasks);
  } catch (err) {
    console.error("Error retrieving tasks by status:", err);
    res.status(500).json({ error: "Failed to retrieve tasks" });
  }
};

// Find tasks near a given location
exports.findTasksNearLocation = async (req, res) => {
  const { latitude, longitude, maxDistance = 5000 } = req.query;

  if (!latitude || !longitude) {
    return res.status(400).json({ error: "Latitude and longitude are required" });
  }

  try {
    const tasks = await Task.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [longitude, latitude],
          },
          $maxDistance: maxDistance,
        },
      },
    });

    res.status(200).json(tasks);
  } catch (err) {
    console.error("Error retrieving tasks near location:", err);
    res.status(500).json({ error: "Failed to retrieve tasks" });
  }
};
