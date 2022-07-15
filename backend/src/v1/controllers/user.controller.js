const asyncHandler = require('express-async-handler');
const { hashPassword, comparePassword } = require('../helpers/privatePassword');
const { generateToken } = require('../helpers/generateToken');
const User = require('../models/user.model');

// @desc    Register new user
// @route   POST /api/v1/users
// @access  Public
const register = asyncHandler(async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      res.status(400);
      throw new Error('Please add all fields');
    }
    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400);
      throw new Error('User already exists');
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password: await hashPassword(password),
    });
    if (user) {
      res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error('Invalid user data');
    }
  } catch (error) {
    console.log('🚀 ~ file: user.controller.js ~ line 42 ~ register ~ error', error);
  }
});
// @desc    Login user
// @route   POST /api/v1/users/login
// @access  Public
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error('Please add all fields');
  }
  const userExist = await User.findOne({ email });
  if (userExist && (await comparePassword(password, userExist.password))) {
    res.json({
      _id: userExist.id,
      name: userExist.name,
      email: userExist.email,
      token: generateToken(userExist._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid credentials');
  }
});

module.exports = {
  register,
  login,
};
