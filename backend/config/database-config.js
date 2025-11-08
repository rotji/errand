// MongoDB Atlas Connection Configuration
// This file contains multiple connection strategies for reliability

const connectionConfigs = {
  // Primary connection (current)
  primary: {
    url: process.env.MONGODB_URL,
    name: 'Primary Atlas Cluster'
  },
  
  // Alternative connection formats
  alternatives: [
    // SRV format with different DNS resolution
    {
      url: process.env.MONGODB_URL?.replace('mongodb+srv://', 'mongodb://').replace('.mongodb.net', '.mongodb.net:27017'),
      name: 'Direct MongoDB Protocol'
    },
    
    // Backup cluster URL (if you have one)
    {
      url: process.env.MONGODB_BACKUP_URL,
      name: 'Backup Atlas Cluster'
    }
  ]
};

// Enhanced connection options
const getConnectionOptions = () => ({
  // Connection timeouts
  serverSelectionTimeoutMS: 60000,
  socketTimeoutMS: 60000,
  connectTimeoutMS: 60000,
  
  // Connection pool settings
  maxPoolSize: 10,
  minPoolSize: 2,
  maxIdleTimeMS: 30000,
  
  // Heartbeat and retry settings
  heartbeatFrequencyMS: 10000,
  retryWrites: true,
  w: 'majority',
  
  // DNS and network settings
  family: 4, // Force IPv4 to avoid DNS issues
  bufferCommands: false,
  bufferMaxEntries: 0,
  
  // Authentication settings
  authSource: 'admin',
  ssl: true,
  sslValidate: true
});

// Fallback connection strategy
const tryConnections = async (mongoose) => {
  const configs = [connectionConfigs.primary, ...connectionConfigs.alternatives].filter(config => config.url);
  
  for (let i = 0; i < configs.length; i++) {
    const config = configs[i];
    console.log(`Attempting connection to: ${config.name}`);
    
    try {
      const conn = await mongoose.connect(config.url, getConnectionOptions());
      console.log(`✅ Successfully connected to: ${config.name}`);
      return conn;
    } catch (error) {
      console.log(`❌ Failed to connect to ${config.name}: ${error.message}`);
      if (i === configs.length - 1) {
        throw new Error('All connection attempts failed');
      }
    }
  }
};

module.exports = {
  connectionConfigs,
  getConnectionOptions,
  tryConnections
};