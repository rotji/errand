// routes/bids.js
const express = require("express");
const router = express.Router();
const { connectToMongoDB } = require("../utils/mongoClient");

router.get("/", async (req, res) => {
  try {
    const db = await connectToMongoDB();
    // Fetch all tasks
    const tasks = await db.collection("tasks").find().toArray();
    // Aggregate bids from each task
    let allBids = [];
    tasks.forEach(task => {
      if (task.bids && Array.isArray(task.bids)) {
        allBids = allBids.concat(task.bids);
      }
    });
    res.status(200).json(allBids);
  } catch (error) {
    console.error("Error fetching all bids:", error);
    res.status(500).json({ error: "Failed to fetch bids" });
  }
});

module.exports = router;
