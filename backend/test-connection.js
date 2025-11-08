require('dotenv').config();
const mongoose = require('mongoose');

const testConnection = async () => {
  const mongoURL = process.env.MONGODB_URL;
  
  console.log('🔍 Testing MongoDB connection...');
  console.log('Connection string (hidden password):', mongoURL.replace(/:([^:@]*@)/, ':****@'));
  
  try {
    await mongoose.connect(mongoURL, {
      serverSelectionTimeoutMS: 30000,
      connectTimeoutMS: 30000,
    });
    
    console.log('✅ Connection successful!');
    console.log('Database:', mongoose.connection.db.databaseName);
    console.log('Host:', mongoose.connection.host);
    
    // Test a simple operation
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('📁 Available collections:', collections.map(c => c.name));
    
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    console.error('Error code:', error.code);
    
    // Provide specific guidance based on error
    if (error.code === 'ETIMEOUT') {
      console.log('\n🔧 Troubleshooting steps:');
      console.log('1. Check your internet connection');
      console.log('2. Verify MongoDB Atlas cluster is running');
      console.log('3. Add 0.0.0.0/0 to Network Access in Atlas');
      console.log('4. Try connecting from MongoDB Compass');
    }
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
};

testConnection();