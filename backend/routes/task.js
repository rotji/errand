const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");

// Route to create a new task
router.post("/", taskController.createTask);

// Route to fetch all tasks (optional, for admin or debugging purposes)
router.get("/", taskController.getAllTasks);

module.exports = router;
