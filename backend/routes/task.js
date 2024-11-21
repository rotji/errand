const express = require("express");
const router = express.Router();
const Task = require("../models/Task"); // Import the Task model

// Create a new task
router.post("/create", async (req, res) => {
  const { description, userId, agentId, status, location } = req.body;

  // Validate incoming data
  if (!description || !userId || !agentId || !status || !location) {
    return res.status(400).json({ error: "Description, userId, agentId, status, and location are required" });
  }

  try {
    const newTask = new Task({ description, userId, agentId, status, location });
    await newTask.save(); // Save to MongoDB
    res.status(201).json({ message: "Task created successfully", task: newTask });
  } catch (err) {
    console.error("Error creating task:", err);
    res.status(500).json({ error: "Failed to create task" });
  }
});

// Retrieve all tasks
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find(); // Find all tasks from MongoDB
    res.status(200).json(tasks);
  } catch (err) {
    console.error("Error retrieving tasks:", err);
    res.status(500).json({ error: "Failed to retrieve tasks" });
  }
});

// Get tasks by agentId
router.get("/agent/:agentId", async (req, res) => {
  const { agentId } = req.params;

  try {
    const tasks = await Task.find({ agentId }); // Find tasks by agentId
    res.status(200).json(tasks);
  } catch (err) {
    console.error("Error retrieving tasks by agent:", err);
    res.status(500).json({ error: "Failed to retrieve tasks" });
  }
});

// Get tasks by userId
router.get("/user/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const tasks = await Task.find({ userId }); // Find tasks by userId
    res.status(200).json(tasks);
  } catch (err) {
    console.error("Error retrieving tasks by user:", err);
    res.status(500).json({ error: "Failed to retrieve tasks" });
  }
});

// Get tasks by status
router.get("/status/:status", async (req, res) => {
  const { status } = req.params;

  try {
    const tasks = await Task.find({ status }); // Find tasks by status
    res.status(200).json(tasks);
  } catch (err) {
    console.error("Error retrieving tasks by status:", err);
    res.status(500).json({ error: "Failed to retrieve tasks" });
  }
});

// Find tasks near a given location (geospatial query)
router.get("/near", async (req, res) => {
  const { latitude, longitude, maxDistance = 5000 } = req.query; // Default maxDistance is 5000 meters (5 km)

  if (!latitude || !longitude) {
    return res.status(400).json({ error: "Latitude and longitude are required" });
  }

  try {
    // Perform a geospatial query to find tasks near the given coordinates
    const tasks = await Task.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [longitude, latitude], // [longitude, latitude]
          },
          $maxDistance: maxDistance, // In meters
        },
      },
    });

    res.status(200).json(tasks);
  } catch (err) {
    console.error("Error retrieving tasks near location:", err);
    res.status(500).json({ error: "Failed to retrieve tasks" });
  }
});

module.exports = router;
