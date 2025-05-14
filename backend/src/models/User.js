const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['student', 'teacher'],
    required: true
  },
  semester: {
    type: String,
    required: function() {
      return this.role === 'student';
    }
  },
  subjects: {
    type: String,
    required: function() {
      return this.role === 'teacher';
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// This is just a model definition, not actually connected to MongoDB
module.exports = mongoose.model('User', userSchema); 