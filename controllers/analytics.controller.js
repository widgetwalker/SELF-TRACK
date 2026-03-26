const Task = require('../models/task.model');
const Leave = require('../models/leave.model');
const User = require('../models/user.model');

//  ANALYTICS
exports.getAnalytics = async (req, res) => {
  try {
    // 👤 EMPLOYEE ANALYTICS
    if (req.user.role === 'employee') {
      const totalTasks = await Task.countDocuments({
        assignedTo: req.user._id
      });

      const completedTasks = await Task.countDocuments({
        assignedTo: req.user._id,
        status: 'completed'
      });

      const pendingTasks = totalTasks - completedTasks;

      const totalLeaves = await Leave.countDocuments({
        employee: req.user._id
      });

      const approvedLeaves = await Leave.countDocuments({
        employee: req.user._id,
        status: 'approved'
      });

      const skillCount = req.user.skills?.length || 0;

      const productivityScore =
        totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

      return res.json({
        role: 'employee',
        tasks: {
          total: totalTasks,
          completed: completedTasks,
          pending: pendingTasks
        },
        leaves: {
          total: totalLeaves,
          approved: approvedLeaves
        },
        skills: {
          total: skillCount
        },
        productivityScore // %
      });
    }

    //  ADMIN ANALYTICS
    if (req.user.role === 'admin') {
      const totalEmployees = await User.countDocuments({
        role: 'employee'
      });

      const totalTasks = await Task.countDocuments();

      const completedTasks = await Task.countDocuments({
        status: 'completed'
      });

      const pendingLeaves = await Leave.countDocuments({
        status: 'pending'
      });

      const taskCompletionRate =
        totalTasks === 0
          ? 0
          : Math.round((completedTasks / totalTasks) * 100);

      return res.json({
        role: 'admin',
        users: {
          employees: totalEmployees
        },
        tasks: {
          total: totalTasks,
          completed: completedTasks,
          completionRate: taskCompletionRate
        },
        leaves: {
          pending: pendingLeaves
        }
      });
    }

    res.status(403).json({ message: 'Invalid role' });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
