const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Replace `your_db_name` with your database name
    await mongoose.connect('mongodb://127.0.0.1:27017/virtualInterview', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB connected (Compass local)');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;

