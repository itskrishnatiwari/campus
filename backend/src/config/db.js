const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // This is commented out to prevent actual connection
    /*
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/student-verse-chat', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    */
    console.log('Database connection simulated');
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB; 