const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const chatSchema = new mongoose.Schema({
  roomName: {
    type: String,
    required: true
  },
  roomType: {
    type: String,
    enum: ['class', 'subject', 'mentor', 'direct'],
    required: true
  },
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  messages: [messageSchema],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// This is just a model definition, not actually connected to MongoDB
module.exports = mongoose.model('Chat', chatSchema); 