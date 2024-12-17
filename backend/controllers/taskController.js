const Task = require("../models/Task"); 

// Controller to create a task
exports.createTask = async (req, res) => {
  try {
    const { title, description, from, to, phone } = req.body;

    // Validate input fields
    if (!title || !description || !from || !to || !phone) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Create and save the new task
    const newTask = new Task({ title, description, from, to, phone });
    await newTask.save();

    res.status(201).json({
      message: "Task created successfully",
      task: newTask,
    });
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ error: "An error occurred while creating the task" });
  }
};

// Controller to fetch all tasks (optional for admin view or debugging)
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    return res.status(200).json({ tasks });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return res.status(500).json({ error: "An error occurred while fetching tasks" });
  }
};
