require("dotenv").config(); // Load environment variables
const { MongoClient } = require("mongodb");

const mongoClient = new MongoClient(process.env.MONGODB_URL, {
  // Removed deprecated options `useNewUrlParser` and `useUnifiedTopology`
  // These options are now unnecessary in MongoDB Driver v4+
});

// Function to connect to the database
async function connectToMongoDB() {
  try {
    console.log("Connecting to MongoDB...");

    // Since isConnected() is deprecated, we no longer need to check the connection status
    // Just attempt to connect directly
    await mongoClient.connect();

    console.log("Connected to MongoDB successfully!");

    // Return the database instance
    return mongoClient.db(process.env.DATABASE_NAME);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error; // Re-throw the error for handling elsewhere
  }
}

// Query helper for fetching all tasks
async function getAllTasks() {
  try {
    const db = await connectToMongoDB();
    const tasks = await db
      .collection("tasks")
      .find()  // ✅ Fetch all tasks (no filter)
      .sort({ _id: -1 })  // ✅ Newest tasks appear at the top
      .toArray();
    return tasks;
  } catch (error) {
    console.error("Error fetching all tasks:", error);
    throw error;
  }
}

module.exports = { connectToMongoDB, mongoClient, getAllTasks, };

