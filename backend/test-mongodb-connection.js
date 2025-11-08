require('dotenv').config();
const mongoose = require('mongoose');
const dns = require('dns').promises;

async function testConnection() {
  console.log('🔍 Testing MongoDB Atlas Connection...\n');
  
  // Step 1: Test DNS resolution
  console.log('1. Testing DNS resolution...');
  try {
    const hostname = 'maste-errand.zyhxz.mongodb.net';
    const addresses = await dns.resolve4(hostname);
    console.log(`✅ DNS resolution successful: ${addresses.join(', ')}`);
  } catch (error) {
    console.log(`❌ DNS resolution failed: ${error.message}`);
    console.log('💡 Try using Google DNS: 8.8.8.8, 8.8.4.4');
  }
  
  // Step 2: Test MongoDB connection
  console.log('\n2. Testing MongoDB connection...');
  
  const options = {
    serverSelectionTimeoutMS: 30000,
    socketTimeoutMS: 30000,
    connectTimeoutMS: 30000,
    family: 4, // Force IPv4
    retryWrites: true,
    w: 'majority',
    ssl: true
  };
  
  try {
    console.log('Connecting to MongoDB Atlas...');
    const conn = await mongoose.connect(process.env.MONGODB_URL, options);
    
    console.log('✅ Connection successful!');
    console.log(`Database: ${conn.connection.db.databaseName}`);
    console.log(`Host: ${conn.connection.host}`);
    console.log(`Ready State: ${conn.connection.readyState}`);
    
    // Test a simple operation
    console.log('\n3. Testing database operations...');
    const collections = await conn.connection.db.listCollections().toArray();
    console.log(`✅ Found ${collections.length} collections`);
    collections.forEach(col => console.log(`  - ${col.name}`));
    
    console.log('\n🎉 All tests passed! Your connection is working properly.');
    
  } catch (error) {
    console.log(`❌ Connection failed: ${error.message}`);
    console.log('\n🔧 Troubleshooting steps:');
    console.log('1. Check if your IP is whitelisted in MongoDB Atlas');
    console.log('2. Verify your username and password are correct');
    console.log('3. Ensure your cluster is not paused');
    console.log('4. Try a different network connection');
    console.log('5. Check if your ISP blocks MongoDB ports');
  } finally {
    await mongoose.disconnect();
    console.log('\nConnection test completed.');
    process.exit(0);
  }
}

testConnection();