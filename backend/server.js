// Test if console.log works
console.log("Testing if console.log is working in the project");

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const analyticsRoutes = require("./routes/analyticsRoutes");

const app = express();
const port = process.env.PORT || 5000;

// Middleware - Configure CORS for Netlify frontend
const corsOptions = {
  origin: [
    'http://localhost:3000', // Local development
    'http://localhost:5173', // Vite dev server
    process.env.FRONTEND_URL, // Netlify production URL
    'https://elaborate-madeleine-8d0976.netlify.app', // Fallback Netlify URL
  ].filter(Boolean), // Remove any undefined values
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json()); // Middleware to parse JSON bodies

// Simple Home Route (for testing)
app.get("/", (req, res) => {
  res.json({ message: process.env.SERVER_MESSAGE || "Welcome to the Errand Platform Backend!" });
});

// Import routes
const agentRoutes = require("./routes/agent");
const userRoutes = require("./routes/user");
const taskRoutes = require("./routes/task");
const bidsRoutes = require("./routes/bids"); 
const registerRoute = require("./routes/register");
const loginRoute = require("./routes/login");

// Use routes
app.use("/api/agents", agentRoutes);
app.use("/api/users", userRoutes);
app.use("/api/bids", bidsRoutes);
app.use("/api/tasks", taskRoutes);

app.use("/api/register", registerRoute);
app.use("/api/login", loginRoute);
app.use("/api/analytics", analyticsRoutes);

// Import and use the enhanced database connection
const connectDB = require('./config/database');

// Connect to MongoDB with enhanced error handling and retry logic
connectDB();



// Global error handler
app.use((err, req, res, next) => {
  console.error("Unhandled Error:", err);
  res.status(500).json({ error: "An unexpected error occurred!" });
});

// Start the server
console.log(`Environment: ${process.env.NODE_ENV}`);
app.listen(port, () => {
  console.log(`Server is running on ${process.env.SERVER_URL || `http://localhost:${port}`}`);
});

