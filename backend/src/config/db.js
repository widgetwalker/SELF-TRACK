const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connected - Full features enabled');
    global.DB_AVAILABLE = true;
  } catch (error) {
    console.warn('⚠️  MongoDB connection failed:', error.message);
    console.warn('⚠️  Running in demo mode without database');
    global.DB_AVAILABLE = false;
    // Don't exit - allow backend to run without MongoDB
  }
};

module.exports = connectDB;
