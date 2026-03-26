const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

//  Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};

//  REGISTER USER
exports.register = async (req, res) => {
  try {
    const { fullName, email, password, role } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user (password will be hashed by model)
    const user = await User.create({
      fullName,
      email,
      password,
      role
    });

    return res.status(201).json({
      message: 'User registered successfully',
      token: generateToken(user._id)
    });

  } catch (error) {
    console.error('Register Error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

//  LOGIN USER
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user and include password
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Compare password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    return res.json({
      message: 'Login successful',
      token: generateToken(user._id)
    });

  } catch (error) {
    console.error('Login Error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

  //  GET LOGGED-IN USER
  exports.getMe = async (req, res) => {
    return res.status(200).json({
      success: true,
      user: req.user
    });
  }
