const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Middleware to parse JSON bodies

// Simple Home Route (for testing)
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Errand Platform Backend!" });
});

// Import routes and use them with their respective paths
const agentRoutes = require("./routes/agent");
const userRoutes = require("./routes/user");
const taskRoutes = require("./routes/task");
const registerRoute = require("./routes/register");
const loginRoute = require("./routes/login");

app.use("/api/agents", agentRoutes);
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/register", registerRoute);
app.use("/api/login", loginRoute);

// MongoDB connection string
const mongoURI = "mongodb://127.0.0.1:27017/errand";

// MongoDB connection
mongoose
  .connect(mongoURI) // No deprecated options here
  .then(() => console.log(`MongoDB Connected: ${mongoURI}`)) // Log the MongoDB URL
  .catch((err) => console.error("MongoDB connection error:", err));

// Global error handler - catches errors not handled in individual routes
app.use((err, req, res, next) => {
  console.error("Unhandled Error:", err);
  res.status(500).json({ error: "An unexpected error occurred!" });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
