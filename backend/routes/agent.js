const express = require("express");
const router = express.Router();
const agentController = require("../controllers/agentController"); // Import the agentController

// Route for creating a new agent
router.post("/create", agentController.createAgent);

// Route for retrieving all agents
router.get("/", agentController.getAllAgents);

// Route for finding nearby agents based on location
router.get("/find", agentController.findNearbyAgents);

module.exports = router;
