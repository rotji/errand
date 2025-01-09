require("dotenv").config(); // Load environment variables
const { MongoClient } = require("mongodb");

const mongoClient = new MongoClient(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true, // Ensures compatibility with MongoDB driver
});

// Function to connect to the database
async function connectToMongoDB() {
  try {
    console.log("Connecting to MongoDB...");

    // Ensure the connection is established
    if (!mongoClient.isConnected) {
      await mongoClient.connect();
    }

    console.log("Connected to MongoDB successfully!");

    // Return the database instance
    return mongoClient.db(process.env.DATABASE_NAME);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error; // Re-throw the error for handling elsewhere
  }
}

module.exports = { connectToMongoDB, mongoClient };
