const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const Agent = require("../models/Agent");

router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find({ bids: { $exists: true, $ne: [] } }); // Get tasks with bids

    let allBids = [];

    for (const task of tasks) {
      if (task.bids && Array.isArray(task.bids)) {
        for (const bid of task.bids) {
          let agent = await Agent.findOne({ email: bid.agentId }); // Query by email

          allBids.push({
            ...bid.toObject(),
            agentEmail: agent ? agent.email : "Unknown", // Attach actual agent email
            taskTitle: task.title, // Add task context
          });
        }
      }
    }

    res.status(200).json(allBids);
  } catch (error) {
    console.error("Error fetching all bids:", error);
    res.status(500).json({ error: "Failed to fetch bids" });
  }
});

module.exports = router;
