const User = require("../models/User");

exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const newUser = new User({ name, email, password });
    await newUser.save();

    res.status(201).json({
      message: "User registered successfully",
      user: newUser,
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({
        error: "Duplicate email detected",
        details: err.keyValue,
      });
    }
    console.error(err);
    res.status(500).json({ error: "Failed to register user", details: err.message });
  }
};
