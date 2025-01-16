const express = require("express");
const User = require("../models/User");
const Agent = require("../models/Agent"); // Import the Agent model

const router = express.Router();

// POST /register
router.post("/", async (req, res) => {
  const { name, email, password, role } = req.body;

  // Basic validation
  if (!name || !email || !password || !role) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    const existingAgent = await Agent.findOne({ email });

    if (existingUser || existingAgent) {
      return res.status(400).json({ error: "Email already registered" });
    }

    let newEntry;

    if (role === "agent") {
      // Save to the Agent collection
      newEntry = new Agent({ name, email, password, role });
      await newEntry.save();
    } else {
      // Default to saving to the User collection
      newEntry = new User({ name, email, password, role });
      await newEntry.save();
    }

    // Update: Return email as `userId` on successful registration
    res.status(201).json({
      message: "Registration successful",
      userId: email, // Add email as userId
      entry: {
        name: newEntry.name,
        email: newEntry.email,
        role: newEntry.role,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Registration failed", details: err.message });
  }
});

module.exports = router;
