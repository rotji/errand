
const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");

// Middleware for associating tasks with email
router.use((req, res, next) => {
  if (["POST", "PUT", "DELETE"].includes(req.method)) {
    const email = req.body.email || req.headers["user-email"];
    if (!email) {
      return res.status(400).json({ error: "Email is required for task association." });
    }
    req.body.userId = email;
  }
  next();
});

// Route to create a new task
router.post("/create", async (req, res, next) => {
  try {
    await taskController.createTask(req, res, next);
  } catch (error) {
    next(error);
  }
});

// Route to fetch all tasks (for admin or debugging)
router.get("/all-tasks", async (req, res, next) => {
  try {
    await taskController.getAllTasks(req, res, next);
  } catch (error) {
    next(error);
  }
});

// Route to fetch tasks created by a specific user
router.get("/:userId", async (req, res, next) => {
  try {
    await taskController.getUserTasks(req, res, next);
  } catch (error) {
    next(error);
  }
});

// Route to submit a task
router.post("/submit", async (req, res, next) => {
  console.info("POST /submit route hit");
  try {
    await taskController.submitTask(req, res, next);
  } catch (error) {
    next(error);
  }
});

// Route to place a bid on a task
router.post("/:taskId/bid", async (req, res, next) => {
  try {
    await taskController.placeBid(req, res, next);
  } catch (error) {
    next(error);
  }
});

// Route to get all bids for a specific task
router.get("/:taskId/bids", async (req, res, next) => {
  try {
    await taskController.getTaskBids(req, res, next);
  } catch (error) {
    next(error);
  }
});

// Route to accept a bid for a task
router.patch("/:taskId/bids/:bidId/accept", async (req, res, next) => {
  try {
    await taskController.acceptBid(req, res, next);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

