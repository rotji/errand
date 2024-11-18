const express = require("express");
const router = express.Router();

// Sample in-memory agent storage (replace with MongoDB later)
let agents = [];

// Create a new agent
router.post("/create", (req, res) => {
  const { name, phone } = req.body;

  // Validate incoming data
  if (!name || !phone) {
    return res.status(400).json({ error: "Name and phone are required" });
  }

  // Create new agent object and store it in the in-memory agents array
  const newAgent = { id: agents.length + 1, name, phone };
  agents.push(newAgent);

  // Send response with the created agent
  res.status(201).json({ message: "Agent created successfully", agent: newAgent });
});

// Retrieve all agents
router.get("/", (req, res) => {
  res.status(200).json(agents);
});

module.exports = router;
