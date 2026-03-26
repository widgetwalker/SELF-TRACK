const User = require('../models/user.model');

//  Employee: get own skills
exports.getMySkills = async (req, res) => {
  try {
    res.json({
      skills: req.user.skills || []
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  Employee: update own skills
exports.updateMySkills = async (req, res) => {
  try {
    const { skills } = req.body;

    if (!Array.isArray(skills)) {
      return res.status(400).json({ message: 'Skills must be an array' });
    }

    req.user.skills = skills;
    await req.user.save();

    res.json({
      message: 'Skills updated successfully',
      skills: req.user.skills
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  Admin: view all users skills
exports.getAllSkills = async (req, res) => {
  try {
    const users = await User.find()
      .select('fullName email skills role');

    res.json({ users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
