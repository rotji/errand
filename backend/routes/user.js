const express = require("express");
const router = express.Router();
const User = require("../models/User"); // Import the User model

// Create a new user
router.post("/create", async (req, res) => {
  const { name, phone, location } = req.body;

  // Validate incoming data
  if (!name || !phone || !location) {
    return res.status(400).json({ error: "Name, phone, and location are required" });
  }

  try {
    const newUser = new User({ name, phone, location });
    await newUser.save(); // Save to MongoDB
    res.status(201).json({ message: "User created successfully", user: newUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create user" });
  }
});

// Retrieve all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find(); // Find all users from MongoDB
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to retrieve users" });
  }
});

// Retrieve a specific user's profile by ID
router.get("/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId); // Find the user by ID
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user); // Return the user's profile
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to retrieve user profile" });
  }
});

// Update a user's profile by ID
router.put("/:userId", async (req, res) => {
  const { userId } = req.params;
  const { name, phone, location } = req.body;

  // Validate incoming data
  if (!name || !phone || !location) {
    return res.status(400).json({ error: "Name, phone, and location are required" });
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, phone, location },
      { new: true } // Return the updated user
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "User profile updated successfully", user: updatedUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update user profile" });
  }
});

module.exports = router;
