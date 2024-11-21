const express = require("express");
const router = express.Router();
const Agent = require("../models/Agent"); // Import the Agent model
const geolib = require("geolib"); // Import geolib for location-based functionality

// Create a new agent
router.post("/create", async (req, res) => {
  const { name, phone, location } = req.body;

  // Validate incoming data
  if (!name || !phone || !location) {
    return res.status(400).json({ error: "Name, phone, and location are required" });
  }

  try {
    // Create a new agent document
    const newAgent = new Agent({ name, phone, location });
    const savedAgent = await newAgent.save(); // Save to MongoDB

    // Send response with the created agent
    res.status(201).json({ message: "Agent created successfully", agent: savedAgent });
  } catch (error) {
    console.error("Error creating agent:", error);
    res.status(500).json({ error: "Failed to create agent" });
  }
});

// Retrieve all agents
router.get("/", async (req, res) => {
  try {
    // Fetch all agents from MongoDB
    const agents = await Agent.find();
    res.status(200).json(agents);
  } catch (error) {
    console.error("Error fetching agents:", error);
    res.status(500).json({ error: "Failed to fetch agents" });
  }
});

// Find nearby agents based on location (latitude and longitude)
router.get("/find", async (req, res) => {
  const { latitude, longitude, radius = 5000 } = req.query; // Default radius is 5km

  if (!latitude || !longitude) {
    return res.status(400).json({ error: "Latitude and longitude are required" });
  }

  try {
    // Fetch all agents from the database
    const agents = await Agent.find();

    // Filter agents based on proximity to the provided coordinates
    const nearbyAgents = agents.filter((agent) => {
      const distance = geolib.getDistance(
        { latitude, longitude }, // User's location
        { latitude: agent.location.latitude, longitude: agent.location.longitude } // Agent's location
      );

      // Only include agents within the specified radius (in meters)
      return distance <= radius;
    });

    // Respond with the filtered list of nearby agents
    res.status(200).json(nearbyAgents);
  } catch (error) {
    console.error("Error finding agents:", error);
    res.status(500).json({ error: "Failed to find agents" });
  }
});

module.exports = router;
