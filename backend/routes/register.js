const express = require("express");
const User = require("../models/User");
const Agent = require("../models/Agent"); // Import the Agent model

const router = express.Router();

// POST /register
router.post("/", async (req, res) => {
  console.log("Registration request received:", req.body);
  
  const { name, email, phone, password, role } = req.body;

  // Enhanced validation
  if (!name || !email || !password || !role) {
    console.log("Missing required fields:", { name: !!name, email: !!email, password: !!password, role: !!role });
    return res.status(400).json({ 
      error: "Missing required fields", 
      required: ["name", "email", "password", "role"] 
    });
  }

  // Validate email format
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  // Validate password length
  if (password.length < 4) {
    return res.status(400).json({ error: "Password must be at least 4 characters long" });
  }

  // Validate role
  if (!["user", "agent"].includes(role)) {
    return res.status(400).json({ error: "Role must be either 'user' or 'agent'" });
  }

  try {
    console.log("Checking for existing users with email:", email);
    
    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    const existingAgent = await Agent.findOne({ email });

    if (existingUser || existingAgent) {
      console.log("Email already exists:", { existingUser: !!existingUser, existingAgent: !!existingAgent });
      return res.status(400).json({ error: "Email already registered" });
    }

    let newEntry;
    console.log("Creating new entry for role:", role);

    if (role === "agent") {
      // Save to the Agent collection
      const agentData = { 
        name: name.trim(), 
        email: email.toLowerCase().trim(), 
        phone: phone ? phone.trim() : undefined,
        password: password // Note: In production, hash this password
      };
      
      console.log("Creating agent with data:", { ...agentData, password: "[HIDDEN]" });
      newEntry = new Agent(agentData);
      await newEntry.save();
      console.log("Agent saved successfully");
    } else {
      // Default to saving to the User collection
      const userData = { 
        name: name.trim(), 
        email: email.toLowerCase().trim(), 
        phone: phone ? phone.trim() : undefined,
        password: password, // Note: In production, hash this password
        userId: email.toLowerCase().trim() // Set userId explicitly
      };
      
      console.log("Creating user with data:", { ...userData, password: "[HIDDEN]" });
      newEntry = new User(userData);
      await newEntry.save();
      console.log("User saved successfully");
    }

    // Return success response
    const response = {
      message: "Registration successful",
      userId: email.toLowerCase().trim(),
      entry: {
        name: newEntry.name,
        email: newEntry.email,
        phone: newEntry.phone,
        role: role,
      },
    };
    
    console.log("Registration successful, sending response");
    res.status(201).json(response);
    
  } catch (err) {
    console.error("Registration error:", err);
    console.error("Error details:", {
      message: err.message,
      code: err.code,
      keyPattern: err.keyPattern,
      keyValue: err.keyValue
    });
    
    // Handle specific MongoDB errors
    if (err.code === 11000) {
      const duplicateField = Object.keys(err.keyPattern)[0];
      return res.status(400).json({ 
        error: `${duplicateField} already exists`,
        details: "Please use a different value"
      });
    }
    
    if (err.name === 'ValidationError') {
      const validationErrors = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({ 
        error: "Validation error",
        details: validationErrors
      });
    }
    
    res.status(500).json({ 
      error: "Registration failed", 
      details: process.env.NODE_ENV === 'development' ? err.message : "Internal server error"
    });
  }
});

module.exports = router;
