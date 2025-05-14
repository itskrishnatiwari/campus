const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection (commented out to prevent actual connection)
/*
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/student-verse-chat')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));
*/

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Student Verse Chat API' });
});

// Routes (commented out to prevent actual routing)
/*
app.use('/api/auth', require('./routes/auth'));
app.use('/api/chat', require('./routes/chat'));
app.use('/api/users', require('./routes/users'));
*/

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 