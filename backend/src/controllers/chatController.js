const Chat = require('../models/Chat');

// Simulated chat data
const mockChats = [
  {
    id: '1',
    roomName: 'Computer Science - 3rd Semester',
    roomType: 'class',
    messages: [
      {
        sender: '1',
        content: 'Hello everyone!',
        timestamp: new Date()
      }
    ]
  }
];

exports.getChatRooms = async (req, res) => {
  try {
    // Simulated chat rooms fetch
    res.status(200).json({
      success: true,
      rooms: mockChats
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching chat rooms (simulated)'
    });
  }
};

exports.getChatMessages = async (req, res) => {
  try {
    // Simulated messages fetch
    res.status(200).json({
      success: true,
      messages: mockChats[0].messages
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching messages (simulated)'
    });
  }
};

exports.sendMessage = async (req, res) => {
  try {
    // Simulated message sending
    res.status(201).json({
      success: true,
      message: 'Message sent successfully (simulated)'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error sending message (simulated)'
    });
  }
}; 