const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const { asyncHandler, AppError } = require('../utils/error-handler');
const logger = require('../utils/logger');

// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};

// REGISTER USER
exports.register = asyncHandler(async (req, res) => {
  const { fullName, email, password, role } = req.body;

  // Check if user already exists
  const userExists = await User.findOne({ email: email.toLowerCase() });
  if (userExists) {
    throw new AppError('Email already registered', 'EMAIL_EXISTS', 409);
  }

  // Create new user (password will be hashed by model)
  const user = await User.create({
    fullName,
    email: email.toLowerCase(),
    password,
    role: role || 'employee',
    skills: []
  });

  const token = generateToken(user._id);
  
  logger.info('User registered successfully', { userId: user._id, email: user.email });

  return res.status(201).json({
    success: true,
    message: 'User registered successfully',
    token,
    user: {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      role: user.role
    }
  });
});

// LOGIN USER
exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Find user and include password field
  const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
  
  if (!user) {
    logger.warn('Login failed - user not found', { email });
    throw new AppError('Invalid credentials', 'INVALID_CREDENTIALS', 401);
  }

  // Compare password
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    logger.warn('Login failed - invalid password', { email });
    throw new AppError('Invalid credentials', 'INVALID_CREDENTIALS', 401);
  }

  const token = generateToken(user._id);
  
  logger.info('User logged in successfully', { userId: user._id, email: user.email });

  return res.json({
    success: true,
    message: 'Login successful',
    token,
    user: {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      role: user.role
    }
  });
});

// LOGOUT USER
exports.logout = asyncHandler(async (req, res) => {
  logger.info('User logged out successfully', { userId: req.user._id });
  
  return res.json({
    success: true,
    message: 'Logged out successfully'
  });
});

// GET LOGGED-IN USER
exports.getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  
  if (!user) {
    throw new AppError('User not found', 'USER_NOT_FOUND', 404);
  }

  return res.status(200).json({
    success: true,
    user: {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      skills: user.skills
    }
  });
});

