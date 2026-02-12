const Skill = require("../models/skill.model");

/* =======================
   ADD / UPDATE MY SKILLS
======================= */
exports.addSkill = async (req, res) => {
  try {
    const { skills } = req.body;

    if (!Array.isArray(skills)) {
      return res.status(400).json({ message: "Skills must be an array" });
    }

    const record = await Skill.findOneAndUpdate(
      { user: req.user._id },
      { skills },
      { upsert: true, new: true }
    );

    res.json(record);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =======================
   GET MY SKILLS
======================= */
exports.getMySkills = async (req, res) => {
  try {
    const record = await Skill.findOne({ user: req.user._id });

    res.json({
      skills: record?.skills || []
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =======================
   ADMIN: GET ALL SKILLS
======================= */
exports.getAllSkills = async (req, res) => {
  try {
    const records = await Skill.find()
      .populate("user", "fullName email");

    res.json(records);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


