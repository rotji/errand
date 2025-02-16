const { connectToMongoDB } = require('../utils/mongoClient');
const { ObjectId } = require("mongodb");
const TaskService = require("../services/TaskService");

const createTask = async (req, res) => {
  try {
    const { title, description, from, to, phone, amount, transport } = req.body;
    const userId = req.body.userId || req.headers["user-email"];

    if (!title || !description || !from || !to || !phone || !amount || !transport || !userId) {
      return res.status(400).json({ error: "All fields are required" });
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

    const db = await connectToMongoDB();
    const result = await db.collection("tasks").insertOne(newTask);

    if (!result.insertedId) {
      return res.status(500).json({ error: "Failed to save the task" });
    }

    res.status(201).json({ message: "Task created successfully", task: { ...newTask, _id: result.insertedId } });
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ error: "An error occurred while creating the task" });
  }
};

const getUserTasks = async (req, res) => {
  try {
    const userId = req.params.userId;
    const db = await connectToMongoDB();
    const tasks = await db.collection("tasks").find({ userId }).toArray();

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
    const db = await connectToMongoDB();
    const tasks = await db.collection("tasks").find().toArray();

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

    const db = await connectToMongoDB();
    const task = await db.collection("tasks").findOne({ _id: taskId });

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    const result = await db.collection("tasks").updateOne(
      { _id: taskId },
      { $set: { status: "submitted" } }
    );

    if (result.modifiedCount === 0) {
      return res.status(500).json({ error: "Failed to update the task" });
    }

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

    const task = await TaskService.getTaskById(taskId);
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

    const db = await connectToMongoDB();
    const updateResult = await db.collection("tasks").updateOne(
      { _id: new ObjectId(taskId) },
      { $set: { bids: updatedBids, status: "assigned" } }
    );

    if (updateResult.modifiedCount === 0) {
      return res.status(500).json({ error: "Failed to accept bid." });
    }

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
