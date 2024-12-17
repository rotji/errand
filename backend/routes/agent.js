const express = require("express");
const router = express.Router();
const agentController = require("../controllers/agentController"); // Import the agentController

// Route for creating a new agent
router.post("/create", async (req, res) => {
    try {
        await agentController.createAgent(req, res);
    } catch (error) {
        console.error("Error in /create route:", error);
        res.status(500).json({ error: "Something went wrong while creating the agent." });
    }
});

// Route for registering a new agent
router.post("/register", async (req, res) => {
    try {
        await agentController.registerAgent(req, res);
    } catch (error) {
        console.error("Error in /register route:", error);
        res.status(500).json({ error: "Something went wrong while registering the agent." });
    }
});

// Route for retrieving all agents
router.get("/", async (req, res) => {
    try {
        await agentController.getAllAgents(req, res);
    } catch (error) {
        console.error("Error in / route:", error);
        res.status(500).json({ error: "Failed to retrieve agents." });
    }
});

// Updated route for finding nearby agents based on location
router.get("/find", async (req, res) => {
    const { lat, lng } = req.query;

    // Validate that latitude and longitude are provided
    if (!lat || !lng) {
        return res.status(400).json({ error: "Latitude and longitude are required" });
    }

    try {
        // Delegate to the controller for finding nearby agents
        await agentController.findNearbyAgents(req, res);
    } catch (error) {
        console.error("Error in /find route:", error);
        res.status(500).json({ error: "Failed to find nearby agents." });
    }
});

module.exports = router;
