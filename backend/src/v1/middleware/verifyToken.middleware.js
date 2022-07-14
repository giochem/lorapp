const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/user.model');

const verifyToken = asyncHandler(async (req, res, next) => {
  var token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the token
      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      res.status(401);
      throw new Error('Not authorized');
    }
    if (!token) {
      res.status(401);
      throw new Error('Not authorized, no token');
    }
  } else {
    throw new Error('Not token');
  }
});

module.exports = { verifyToken };
