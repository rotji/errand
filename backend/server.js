const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());  // Middleware to parse JSON bodies

// Simple Home Route (for testing)
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Errand Platform Backend!" });
});

// Import agent routes and use them with the '/api/agents' path
const agentRoutes = require("./routes/agent");
app.use("/api/agents", agentRoutes);

// MongoDB connection
mongoose
  .connect("mongodb://127.0.0.1:27017/errand")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
