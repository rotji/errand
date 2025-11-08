const Task = require('../models/Task');
const TaskService = require("../services/TaskService");

const createTask = async (req, res) => {
  try {
    console.log("Task creation request body:", req.body);
    console.log("Task creation headers:", req.headers);
    
    const { description, from, to, phone, amount, transport, email } = req.body;
    const userId = req.body.userId || req.body.email || req.headers["user-email"];

    console.log("Extracted userId:", userId);

    // All fields are required
    if (!description || !from || !to || !phone || !amount || !transport || !userId) {
      const missingFields = [];
      if (!description) missingFields.push('description');
      if (!from) missingFields.push('from');
      if (!to) missingFields.push('to');
      if (!phone) missingFields.push('phone');
      if (!amount) missingFields.push('amount');
      if (!transport) missingFields.push('transport');
      if (!userId) missingFields.push('userId/email');
      
      console.log("Missing fields:", missingFields);
      return res.status(400).json({ 
        error: "Missing required fields", 
        missingFields,
        received: { description: !!description, from: !!from, to: !!to, phone: !!phone, amount: !!amount, transport: !!transport, userId: !!userId }
      });
    }

    const newTaskData = {
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

    const task = new Task(newTaskData);
    const savedTask = await task.save();

    res.status(201).json({ 
      message: "Task created successfully", 
      task: savedTask 
    });
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ error: "An error occurred while creating the task" });
  }
};

const getUserTasks = async (req, res) => {
  try {
    const userId = req.params.userId;
    const tasks = await Task.find({ userId }).sort({ createdAt: -1 });

    if (!tasks || tasks.length === 0) {
      return res.status(404).json({ message: "No tasks found for this user." });
    }
    return res.status(200).json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error.message);
    return res.status(500).json({ message: "Internal server error." });
  }
};

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });

    if (!tasks || tasks.length === 0) {
      return res.status(404).json({ message: "No tasks found." });
    }
    return res.status(200).json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return res.status(500).json({ error: "An error occurred while fetching tasks" });
  }
};

const submitTask = async (req, res) => {
  try {
    const { taskId, userId } = req.body;
    if (!taskId || !userId) {
      return res.status(400).json({ error: "Task ID and User ID are required" });
    }

    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    task.status = "submitted";
    await task.save();

    res.status(200).json({ message: "Task submitted successfully!" });
  } catch (error) {
    console.error("Error submitting task:", error);
    res.status(500).json({ error: "An error occurred while submitting the task" });
  }
};

const placeBid = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { agentId } = req.body;
    if (!taskId || !agentId) {
      return res.status(400).json({ error: "Task ID and Agent ID are required." });
    }

    const bid = {
      _id: new ObjectId(),
      agentId,
      date: new Date(),
      status: "pending"
    };

    const result = await TaskService.addBid(taskId, bid);
    return res.status(200).json({ message: "Bid placed successfully.", bids: result.bids });
  } catch (error) {
    console.error("Error placing bid:", error.message);
    return res.status(500).json({ error: "Failed to place bid." });
  }
};

const getTaskBids = async (req, res) => {
  try {
    const { taskId } = req.params;
    if (!taskId) {
      return res.status(400).json({ error: "Task ID is required." });
    }

    const task = await TaskService.getTaskById(taskId);
    if (!task) {
      return res.status(404).json({ error: "Task not found." });
    }
    return res.status(200).json({ bids: task.bids || [] });
  } catch (error) {
    console.error("Error fetching bids:", error.message);
    return res.status(500).json({ error: "Failed to fetch bids." });
  }
};

const acceptBid = async (req, res) => {
  try {
    const { taskId, bidId } = req.params;
    if (!taskId || !bidId) {
      return res.status(400).json({ error: "Task ID and Bid ID are required." });
    }

    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ error: "Task not found." });
    }

    let bidFound = false;
    const updatedBids = (task.bids || []).map(bid => {
      if (bid._id.toString() === bidId) {
        bidFound = true;
        return { ...bid, status: "accepted" };
      } else {
        return { ...bid, status: "rejected" };
      }
    });

    if (!bidFound) {
      return res.status(404).json({ error: "Bid not found." });
    }

    task.bids = updatedBids;
    task.status = "assigned";
    await task.save();

    return res.status(200).json({ message: "Bid accepted successfully.", bids: updatedBids });
  } catch (error) {
    console.error("Error accepting bid:", error.message);
    return res.status(500).json({ error: "Failed to accept bid." });
  }
};

module.exports = {
  createTask,
  getUserTasks,
  getAllTasks,
  submitTask,
  placeBid,
  getTaskBids,
  acceptBid,
};
