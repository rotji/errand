const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");

// Existing Routes

// Route to create a new task
router.post("/", taskController.createTask);

// Route to fetch all tasks (optional, for admin or debugging purposes)
router.get("/", taskController.getAllTasks);

// New Routes

// Route to submit a task by a user
router.post("/submit", taskController.submitTask);

// Route for agents to place a bid on a task
router.post("/:taskId/bid", taskController.placeBid);

// Endpoint to fetch tasks created by a specific user
router.get("/user-tasks", taskController.getUserTasks);


// Route to get all bids for a specific task
router.get("/:taskId/bids", taskController.getTaskBids);

// Route to accept a bid for a task
router.patch("/:taskId/bids/:bidId/accept", taskController.acceptBid);

module.exports = router;
