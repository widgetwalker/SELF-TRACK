const Task = require('../models/task.model');
const Leave = require('../models/leave.model');
const User = require('../models/user.model');

//  DASHBOARD DATA
exports.getDashboard = async (req, res) => {
  try {
    // 👤 EMPLOYEE DASHBOARD
    if (req.user.role === 'employee') {
      const taskCount = await Task.countDocuments({
        assignedTo: req.user._id
      });

      const completedTasks = await Task.countDocuments({
        assignedTo: req.user._id,
        status: 'completed'
      });

      const pendingLeaves = await Leave.countDocuments({
        employee: req.user._id,
        status: 'pending'
      });

      const skillCount = req.user.skills?.length || 0;

      return res.json({
        role: 'employee',
        tasks: {
          total: taskCount,
          completed: completedTasks
        },
        leaves: {
          pending: pendingLeaves
        },
        skills: {
          total: skillCount
        }
      });
    }

    //  ADMIN DASHBOARD
    if (req.user.role === 'admin') {
      const totalUsers = await User.countDocuments({
        role: 'employee'
      });

      const totalTasks = await Task.countDocuments();
      const pendingLeaves = await Leave.countDocuments({
        status: 'pending'
      });

      const approvedLeaves = await Leave.countDocuments({
        status: 'approved'
      });

      return res.json({
        role: 'admin',
        users: {
          employees: totalUsers
        },
        tasks: {
          total: totalTasks
        },
        leaves: {
          pending: pendingLeaves,
          approved: approvedLeaves
        }
      });
    }

    // fallback (should never hit)
    res.status(403).json({ message: 'Invalid role' });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
