const User = require('../models/user.model');

//  Employee: add a new skill
exports.addMySkill = async (req, res) => {
  try {
    const { name, proficiency } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Skill name is required' });
    }

    if (!req.user.skills) {
      req.user.skills = [];
    }

    // Check if skill already exists
    const skillExists = req.user.skills.find(s => s.name.toLowerCase() === name.toLowerCase());
    if (skillExists) {
      return res.status(400).json({ message: 'Skill already exists' });
    }

    // Add new skill
    req.user.skills.push({
      name,
      proficiency: proficiency || 'intermediate',
      yearsExperience: 0
    });

    await req.user.save();

    res.status(201).json({
      success: true,
      message: 'Skill added successfully',
      skills: req.user.skills
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  Employee: get own skills
exports.getMySkills = async (req, res) => {
  try {
    res.json({
      success: true,
      skills: req.user.skills || []
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
};

//  Employee: update own skills
exports.updateMySkills = async (req, res) => {
  try {
    const { skills } = req.body;

    if (!Array.isArray(skills)) {
      return res.status(400).json({ 
        success: false,
        message: 'Skills must be an array' 
      });
    }

    req.user.skills = skills;
    await req.user.save();

    res.json({
      success: true,
      message: 'Skills updated successfully',
      skills: req.user.skills
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
};

//  Admin: view all users skills
exports.getAllSkills = async (req, res) => {
  try {
    const users = await User.find()
      .select('fullName email skills role');

    res.json({ 
      success: true,
      users 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
};
