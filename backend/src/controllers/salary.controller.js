const Salary = require("../models/salary.model");
const Notification = require("../models/notification.model");

/* =======================
   ADMIN: CREATE SALARY
======================= */
exports.createSalary = async (req, res) => {
  try {
    const { user, month, basic, allowances = 0, deductions = 0 } = req.body;

    const netPay = basic + allowances - deductions;

    const salary = await Salary.create({
      user,
      month,
      basic,
      allowances,
      deductions,
      netPay,
      createdBy: req.user._id
    });

    await Notification.create({
      user,
      title: "Salary Uploaded",
      message: `Your salary for ${month} has been uploaded`
    });

    res.status(201).json({ salary });
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ message: "Salary already exists for this month" });
    }
    res.status(500).json({ message: error.message });
  }
};

/* =======================
   EMPLOYEE: MY SALARY
======================= */
exports.getMySalary = async (req, res) => {
  const salaries = await Salary.find({ user: req.user._id }).sort({
    createdAt: -1
  });
  res.json(salaries);
};

/* =======================
   ADMIN: ALL SALARIES
======================= */
exports.getAllSalaries = async (req, res) => {
  const salaries = await Salary.find()
    .populate("user", "fullName email")
    .sort({ createdAt: -1 });

  res.json(salaries);
};

/* =======================
   ADMIN: SALARY STATS
======================= */
exports.getSalaryStats = async (req, res) => {
  const salaries = await Salary.find();

  const totalPayroll = salaries.reduce((sum, s) => sum + s.netPay, 0);
  const avgSalary = salaries.length
    ? Math.round(totalPayroll / salaries.length)
    : 0;

  res.json({
    totalPayroll,
    avgSalary,
    records: salaries.length
  });
};
