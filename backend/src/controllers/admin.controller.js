const User = require('../models/user.model');
const Task = require('../models/task.model');
const Leave = require('../models/leave.model');
const Notification = require('../models/notification.model');
const Salary = require('../models/salary.model');

// Get all employees
exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await User.find({ role: 'employee' })
      .select('_id fullName email role skills createdAt')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      users: employees
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get employee profile
exports.getEmployeeProfile = async (req, res) => {
  try {
    const { employeeId } = req.params;
    
    const employee = await User.findOne({
      _id: employeeId,
      role: 'employee'
    }).select('-password');

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    const taskCount = await Task.countDocuments({ assignedTo: employeeId });
    const completedTasks = await Task.countDocuments({ 
      assignedTo: employeeId, 
      status: 'completed' 
    });

    res.json({
      success: true,
      user: employee,
      stats: {
        tasks: taskCount,
        completedTasks: completedTasks
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get employee leaves
exports.getEmployeeLeaves = async (req, res) => {
  try {
    const { employeeId } = req.params;
    
    const leaves = await Leave.find({ employee: employeeId })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      leaves
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get employee salary
exports.getEmployeeSalary = async (req, res) => {
  try {
    const { employeeId } = req.params;
    
    const salary = await Salary.findOne({ employee: employeeId });

    if (!salary) {
      return res.json({
        success: true,
        salary: {
          baseSalary: 0,
          allowances: 0,
          deductions: 0,
          netSalary: 0
        }
      });
    }

    res.json({
      success: true,
      salary
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get employee analytics
exports.getEmployeeAnalytics = async (req, res) => {
  try {
    const { employeeId } = req.params;
    
    const taskCount = await Task.countDocuments({ assignedTo: employeeId });
    const completedTasks = await Task.countDocuments({ 
      assignedTo: employeeId, 
      status: 'completed' 
    });

    const completionRate = taskCount > 0 ? Math.round((completedTasks / taskCount) * 100) : 0;

    res.json({
      success: true,
      analytics: {
        productivityScore: 70 + Math.random() * 30,
        completionRate: completionRate,
        tasksCompleted: completedTasks,
        tasksTotal: taskCount,
        workLifeBalance: 60 + Math.random() * 40
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Dashboard overview
exports.getDashboard = async (req, res) => {
  try {
    const totalEmployees = await User.countDocuments({ role: 'employee' });
    const totalTasks = await Task.countDocuments();
    const activeTasks = await Task.countDocuments({ status: { $ne: 'completed' } });
    const pendingLeaves = await Leave.countDocuments({ status: 'pending' });

    res.json({
      success: true,
      stats: {
        totalEmployees,
        totalTasks,
        activeTasks,
        pendingLeaves,
        avgProductivity: 75
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
