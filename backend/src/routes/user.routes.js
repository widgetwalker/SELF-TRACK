const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/auth.middleware");
const { adminOnly } = require("../middleware/role.middleware");
const User = require("../models/user.model");

// Admin – get all employees
router.get("/employees", protect, adminOnly, async (req, res) => {
  const users = await User.find({ role: "employee" }).select("fullName email");
  res.json({ employees: users });

});

module.exports = router;
