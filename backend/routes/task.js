const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController"); // Import the taskController

// Define routes and map them to controller functions
router.post("/create", taskController.createTask);
router.get("/", taskController.getAllTasks);
router.get("/agent/:agentId", taskController.getTasksByAgent);
router.get("/user/:userId", taskController.getTasksByUser);
router.get("/status/:status", taskController.getTasksByStatus);
router.get("/near", taskController.findTasksNearLocation);

module.exports = router;
