const express = require("express");
const router = express.Router();
const agentController = require("../controllers/agentController"); // Import the agentController

// Existing Routes

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

// Route for agents to bid on a task
router.post("/:agentId/bid/:taskId", async (req, res) => {
    try {
        await agentController.placeBid(req, res);
    } catch (error) {
        console.error("Error in /:agentId/bid/:taskId route:", error);
        res.status(500).json({ error: "Failed to place a bid on the task." });
    }
});

// Route to retrieve all bids placed by an agent
router.get("/:agentId/bids", async (req, res) => {
    try {
        await agentController.getAgentBids(req, res);
    } catch (error) {
        console.error("Error in /:agentId/bids route:", error);
        res.status(500).json({ error: "Failed to retrieve agent bids." });
    }
});

// New Routes

// Get agent details
router.get("/:id", async (req, res) => {
    try {
        await agentController.getAgentDetails(req, res);
    } catch (error) {
        console.error("Error in /:id route:", error);
        res.status(500).json({ error: "Failed to retrieve agent details." });
    }
});

// Add or update task
router.post("/task", async (req, res) => {
    try {
        await agentController.addOrUpdateTask(req, res);
    } catch (error) {
        console.error("Error in /task route:", error);
        res.status(500).json({ error: "Failed to add or update task." });
    }
});

// Get transaction history
router.get("/:id/transactions", async (req, res) => {
    try {
        await agentController.getTransactionHistory(req, res);
    } catch (error) {
        console.error("Error in /:id/transactions route:", error);
        res.status(500).json({ error: "Failed to retrieve transaction history." });
    }
});

// Raise a dispute
router.post("/dispute", async (req, res) => {
    try {
        await agentController.raiseDispute(req, res);
    } catch (error) {
        console.error("Error in /dispute route:", error);
        res.status(500).json({ error: "Failed to raise dispute." });
    }
});

module.exports = router;
