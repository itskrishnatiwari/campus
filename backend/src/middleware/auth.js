const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
  try {
    // Simulated authentication
    // In a real application, this would verify the JWT token
    /*
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      throw new Error();
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    */
    
    // Simulated user data
    req.user = {
      id: '1',
      role: 'student'
    };
    
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Please authenticate (simulated)'
    });
  }
};

module.exports = auth; 