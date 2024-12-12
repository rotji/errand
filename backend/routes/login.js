const express = require("express");
const User = require("../models/User");
const Agent = require("../models/Agent");

const router = express.Router();

// POST /login
router.post("/", async (req, res) => {
  const { email, password } = req.body;

  // Basic validation
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    // Check if the email exists in User or Agent collection
    let account = await User.findOne({ email });
    let accountType = "user";

    if (!account) {
      account = await Agent.findOne({ email });
      accountType = "agent";
    }

    if (!account) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Validate password (Plain-text for prototype purposes)
    if (account.password !== password) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Respond with success
    res.status(200).json({
      message: "Login successful",
      accountType,
      account: {
        name: account.name,
        email: account.email,
        role: account.role,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

module.exports = router;
