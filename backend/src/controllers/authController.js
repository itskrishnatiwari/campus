const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Simulated user data for demonstration
const mockUsers = [
  {
    id: '1',
    name: 'John Student',
    email: 'student@example.com',
    role: 'student',
    semester: '3rd'
  },
  {
    id: '2',
    name: 'Jane Teacher',
    email: 'teacher@example.com',
    role: 'teacher',
    subjects: 'Data Structures, Algorithms'
  }
];

exports.register = async (req, res) => {
  try {
    // Simulated registration
    res.status(201).json({
      success: true,
      message: 'User registered successfully (simulated)'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error in registration (simulated)'
    });
  }
};

exports.login = async (req, res) => {
  try {
    // Simulated login
    res.status(200).json({
      success: true,
      message: 'Login successful (simulated)',
      token: 'simulated-jwt-token'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error in login (simulated)'
    });
  }
};

exports.getProfile = async (req, res) => {
  try {
    // Simulated profile fetch
    res.status(200).json({
      success: true,
      user: mockUsers[0] // Simulated user data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching profile (simulated)'
    });
  }
}; 