const User = require("../models/user.model");

//  Admin: get all employees
exports.getEmployees = async (req, res) => {
  try {
    const employees = await User.find({ role: "employee" })
      .select("fullName email");

    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
