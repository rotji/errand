const express = require("express");
const router = express.Router();
const { connectToMongoDB } = require("../utils/mongoClient");

router.get("/", async (req, res) => {
  try {
    const db = await connectToMongoDB();
    const tasks = await db.collection("tasks").find().toArray(); // Get all tasks

    let allBids = [];

    for (const task of tasks) {
      if (task.bids && Array.isArray(task.bids)) {
        for (const bid of task.bids) {
          let agent = await db.collection("agents").findOne({ email: bid.agentId }); // Query by email

          allBids.push({
            ...bid,
            agentEmail: agent ? agent.email : "Unknown", // Attach actual agent email
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
