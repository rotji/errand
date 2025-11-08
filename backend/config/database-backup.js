const mongoose = require('mongoose');

// Backup connection method with retry logic
const connectWithRetry = async (mongoURL, maxRetries = 5) => {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`Connection attempt ${attempt}/${maxRetries}...`);
      
      await mongoose.connect(mongoURL, {
        serverSelectionTimeoutMS: 60000,
        socketTimeoutMS: 60000,
        connectTimeoutMS: 60000,
        maxPoolSize: 10,
        retryWrites: true,
        w: 'majority',
        bufferCommands: false,
        bufferMaxEntries: 0,
      });
      
      console.log('✅ MongoDB Connected Successfully!');
      console.log(`Database: ${mongoose.connection.db.databaseName}`);
      return;
      
    } catch (error) {
      console.error(`❌ Connection attempt ${attempt} failed:`, error.message);
      
      if (attempt === maxRetries) {
        console.error('🚨 All connection attempts failed. Please check:');
        console.error('1. Internet connection');
        console.error('2. MongoDB Atlas cluster status');
        console.error('3. Network Access settings in Atlas');
        console.error('4. Connection string validity');
        throw error;
      }
      
      // Wait before retry (exponential backoff)
      const delay = Math.min(1000 * Math.pow(2, attempt - 1), 10000);
      console.log(`⏳ Retrying in ${delay/1000} seconds...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
};

module.exports = { connectWithRetry };