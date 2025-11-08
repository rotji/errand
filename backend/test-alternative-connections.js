// Alternative connection test using different approaches
require('dotenv').config();
const mongoose = require('mongoose');

async function testAlternativeConnections() {
  console.log('🔄 Testing alternative MongoDB connection methods...\n');
  
  // Method 1: Try with different DNS servers
  const { Resolver } = require('dns').promises;
  const resolver = new Resolver();
  resolver.setServers(['8.8.8.8', '8.8.4.4']); // Use Google DNS
  
  // Method 2: Try direct connection without SRV
  const originalUrl = process.env.MONGODB_URL;
  const directUrl = originalUrl.replace('mongodb+srv://', 'mongodb://').replace('.mongodb.net', '.mongodb.net:27017');
  
  // Method 3: Try with additional connection parameters
  const enhancedUrl = originalUrl + '&directConnection=false&authMechanism=SCRAM-SHA-1';
  
  const connectionTests = [
    { name: 'Original Connection', url: originalUrl },
    { name: 'Direct MongoDB Protocol', url: directUrl },
    { name: 'Enhanced Parameters', url: enhancedUrl }
  ];
  
  for (const test of connectionTests) {
    console.log(`Testing: ${test.name}`);
    try {
      const options = {
        serverSelectionTimeoutMS: 15000,
        socketTimeoutMS: 15000,
        connectTimeoutMS: 15000,
        family: 4,
        retryWrites: true,
        ssl: true
      };
      
      const conn = await mongoose.connect(test.url, options);
      console.log(`✅ SUCCESS: ${test.name} worked!`);
      console.log(`Database: ${conn.connection.db.databaseName}`);
      await mongoose.disconnect();
      return true;
      
    } catch (error) {
      console.log(`❌ FAILED: ${test.name} - ${error.message}`);
      await mongoose.disconnect().catch(() => {});
    }
    console.log('');
  }
  
  console.log('🚨 All connection methods failed. IP whitelisting is required.');
  return false;
}

testAlternativeConnections();