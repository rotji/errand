const express = require("express");
const router = express.Router();
const { connectToMongoDB } = require("../utils/mongoClient");


router.get("/bids", async (req, res) => {
  try {
    const db = await connectToMongoDB();
    const tasks = await db.collection("tasks").find().toArray();
    
    let allBids = [];
    for (const task of tasks) {
      if (task.bids && Array.isArray(task.bids)) {
        for (const bid of task.bids) {
          // Fetch the agent's email using agentId
          const agent = await db.collection("agents").findOne({ email: bid.agentId });

          allBids.push({
            ...bid,
            agentEmail: agent ? agent.email : "Unknown",
          });
        }
      }
    }

    res.status(200).json(allBids);
  } catch (error) {
    console.error("Error fetching bids:", error);
    res.status(500).json({ error: "Failed to fetch bids" });
  }
});

module.exports = router;