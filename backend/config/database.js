const mongoose = require("mongoose");

const connectDB = async () => {
  const maxRetries = 5;
  let retryCount = 0;

  const connectWithRetry = async () => {
    try {
      // Enhanced connection options for better reliability
      const options = {
        serverSelectionTimeoutMS: 30000,
        socketTimeoutMS: 30000,
        connectTimeoutMS: 30000,
        retryWrites: true,
        w: 'majority'
      };

      // Connect to MongoDB with enhanced options
      const conn = await mongoose.connect(process.env.MONGODB_URL, options);

      // Set up connection event listeners
      mongoose.connection.on('error', (err) => {
        console.error('MongoDB connection error:', err);
      });
      
      mongoose.connection.on('disconnected', () => {
        console.warn('MongoDB disconnected. Will attempt to reconnect automatically...');
      });
      
      mongoose.connection.on('reconnected', () => {
        console.log('MongoDB reconnected successfully');
      });

      // Log success message with connection details
      console.log(`MongoDB Connected Successfully!`);
      console.log(`Database: ${conn.connection.db.databaseName}`);
      console.log(`Host: ${conn.connection.host}`);
      
    } catch (error) {
      console.error(`MongoDB connection attempt ${retryCount + 1} failed:`, error.message);
      
      if (retryCount < maxRetries - 1) {
        retryCount++;
        console.log(`Retrying connection in 5 seconds... (${retryCount}/${maxRetries})`);
        setTimeout(connectWithRetry, 5000);
      } else {
        console.error('Max connection retries reached. Exiting...');
        console.error('Troubleshooting steps:');
        console.error('1. Check if your IP is whitelisted in MongoDB Atlas');
        console.error('2. Verify your connection string is correct');
        console.error('3. Ensure your cluster is not paused');
        console.error('4. Check your network connectivity');
        process.exit(1);
      }
    }
  };

  await connectWithRetry();
};

module.exports = connectDB;
