const taskService = require("../services/TaskService");

// Controller to create a task
exports.createTask = async (req, res) => {
  try {
    const { title, description, from, to, phone, amount, transport, userId } = req.body;

    if (!title || !description || !from || !to || !phone || !amount || !transport || !userId) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existingTask = await taskService.getTaskByTitleAndUserId(title, userId);
    if (existingTask) {
      return res.status(400).json({ error: "A task with the same title already exists for this user" });
    }

    const newTask = {
      title,
      description,
      from,
      to,
      phone,
      amount,
      transport,
      userId,
      bids: [],
      status: "open",
      createdBy: req.user ? req.user._id : null,
    };

    const task = await taskService.createTask(newTask);
    res.status(201).json({ message: "Task created successfully", task });
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ error: "An error occurred while creating the task" });
  }
};

// Controller to fetch all tasks
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await taskService.getAllTasks();

    if (!tasks.length) {
      return res.status(404).json({ message: "No tasks found" });
    }

    res.status(200).json({ tasks });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: "An error occurred while fetching tasks" });
  }
};

// Controller to submit a task
exports.submitTask = async (req, res) => {
  try {
    const { taskId, userId } = req.body;

    if (!taskId || !userId) {
      return res.status(400).json({ error: "Task ID and User ID are required" });
    }

    const task = await taskService.getTaskById(taskId);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    const result = await taskService.submitTask(taskId, userId);
    res.status(200).json({ message: "Task submitted successfully", result });
  } catch (error) {
    console.error("Error submitting task:", error);
    res.status(500).json({ error: "An error occurred while submitting the task" });
  }
};

// Controller to place a bid on a task
exports.placeBid = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { agentId, bidAmount } = req.body;

    if (!taskId || !agentId || !bidAmount) {
      return res.status(400).json({ error: "Task ID, Agent ID, and Bid Amount are required" });
    }

    const task = await taskService.getTaskById(taskId);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    const existingBid = task.bids.find((bid) => bid.agentId === agentId);
    if (existingBid) {
      return res.status(400).json({ error: "Agent has already bid on this task" });
    }

    const updatedTask = await taskService.addBid(taskId, { agentId, bidAmount, bidTime: new Date() });
    res.status(200).json({ message: "Bid placed successfully", updatedTask });
  } catch (error) {
    console.error("Error placing bid:", error);
    res.status(500).json({ error: "An error occurred while placing a bid" });
  }
};

// Controller to fetch tasks created by a specific user
exports.getUserTasks = async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const tasks = await taskService.getTasksByUserId(userId);

    if (!tasks.length) {
      return res.status(404).json({ message: "No tasks found for this user" });
    }

    res.status(200).json({ tasks });
  } catch (error) {
    console.error("Error fetching user tasks:", error);
    res.status(500).json({ error: "An error occurred while fetching user tasks" });
  }
};

// Controller to get all bids for a specific task
exports.getTaskBids = async (req, res) => {
  try {
    const { taskId } = req.params;

    if (!taskId) {
      return res.status(400).json({ error: "Task ID is required" });
    }

    const task = await taskService.getTaskById(taskId);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json({ bids: task.bids });
  } catch (error) {
    console.error("Error fetching task bids:", error);
    res.status(500).json({ error: "An error occurred while fetching task bids" });
  }
};

// Controller to accept a bid for a task
exports.acceptBid = async (req, res) => {
  try {
    const { taskId, bidId } = req.params;

    if (!taskId || !bidId) {
      return res.status(400).json({ error: "Task ID and Bid ID are required" });
    }

    const task = await taskService.getTaskById(taskId);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    const bid = task.bids.find((b) => b._id.toString() === bidId);
    if (!bid) {
      return res.status(404).json({ error: "Bid not found" });
    }

    const result = await taskService.acceptBid(taskId, bid);
    res.status(200).json({ message: "Bid accepted successfully", acceptedBid: bid });
  } catch (error) {
    console.error("Error accepting bid:", error);
    res.status(500).json({ error: "An error occurred while accepting the bid" });
  }
};
