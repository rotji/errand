const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");

// Middleware to associate tasks with email
// Ensure routes handling tasks associate tasks with email (from request body or headers)
router.use((req, res, next) => {
  if (req.body.email) {
    req.body.userId = req.body.email; // Use email as userId for association
  } else if (req.headers["user-email"]) {
    req.body.userId = req.headers["user-email"]; // Alternative: Use email from headers
  }
  next(); // Proceed to the next middleware/route handler
});

// Existing Routes

// Route to create a new task
router.post("/", taskController.createTask);

// Route to fetch all tasks (optional, for admin or debugging purposes)
router.get("/", taskController.getAllTasks);

// New Routes

// Route to submit a task by a user
router.post("/submit", (req, res, next) => {
  console.log("POST /submit route hit");
  taskController.submitTask(req, res, next);
});




// Route for agents to place a bid on a task
router.post("/:taskId/bid", taskController.placeBid);

// Endpoint to fetch tasks created by a specific user
router.get("/user-tasks", taskController.getUserTasks);

// Route to get all bids for a specific task
router.get("/:taskId/bids", taskController.getTaskBids);

// Route to accept a bid for a task
router.patch("/:taskId/bids/:bidId/accept", taskController.acceptBid);

module.exports = router;
