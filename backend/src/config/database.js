const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Configure mongoose
    mongoose.set('strictQuery', true);
    
    // Connect with retry logic
    const connectWithRetry = async (retries = 5, interval = 5000) => {
      try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        return conn;
      } catch (error) {
        if (retries === 0) {
          throw error;
        }
        console.log(`MongoDB connection failed. Retrying in ${interval/1000}s... (${retries} attempts remaining)`);
        await new Promise(resolve => setTimeout(resolve, interval));
        return connectWithRetry(retries - 1, interval);
      }
    };

    // Initial connection
    await connectWithRetry();

    // Connection event handlers
    mongoose.connection.on('error', err => {
      console.error('MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('MongoDB disconnected. Attempting to reconnect...');
      connectWithRetry();
    });

    mongoose.connection.on('reconnected', () => {
      console.log('MongoDB reconnected successfully');
    });

  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

// Export connection status checker
const isConnected = () => mongoose.connection.readyState === 1;

module.exports = {
  connectDB,
  isConnected
};