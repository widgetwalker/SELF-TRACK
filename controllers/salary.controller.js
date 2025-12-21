const Salary = require('../models/salary.model');
const Notification = require('../models/notification.model');


//  Admin uploads salary
exports.createSalary = async (req, res) => {
  try {
    const { employee, month, basic, allowances, deductions } = req.body;

    const netPay = basic + (allowances || 0) - (deductions || 0);

    const salary = await Salary.create({
      employee,
      month,
      basic,
      allowances,
      deductions,
      netPay,
      uploadedBy: req.user._id
    });

    await Notification.create({
      user: employee,
      title: 'Salary Uploaded',
      message: 'your salary for ${month} has been uploaded'
    });
    res.status(201).json({
      message: 'Salary uploaded successfully',
      salary
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        message: 'Salary already exists for this employee and month'
      });
    }
    res.status(500).json({ message: error.message });
  }
};

//  Employee views own salary history
exports.getMySalary = async (req, res) => {
  try {
    const salaries = await Salary.find({ employee: req.user._id })
      .sort({ month: -1 });

    res.json({ salaries });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
