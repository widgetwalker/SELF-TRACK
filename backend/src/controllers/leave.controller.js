const Leave = require('../models/leave.model');
const Notification = require('../models/notification.model');


//  Employee applies for leave
exports.applyLeave = async (req, res) => {
  try {
    const { startDate, endDate, reason, type } = req.body;

    if (!startDate || !endDate || !reason) {
      return res.status(400).json({ 
        success: false,
        message: 'Start date, end date, and reason are required' 
      });
    }

    const leave = await Leave.create({
      employee: req.user._id,
      startDate,
      endDate,
      reason,
      type: type || 'casual'
    });

    res.status(201).json({
      success: true,
      message: 'Leave request submitted',
      leave
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
};

//  Employee views own leave history
exports.getMyLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find({ employee: req.user._id })
      .sort({ createdAt: -1 });

    res.json({ 
      success: true,
      leaves 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
};

//  Admin views all leave requests
exports.getAllLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find()
      .populate('employee', 'fullName email')
      .sort({ createdAt: -1 });

    res.json({ 
      success: true,
      leaves 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
};

//  Admin approves / rejects leave
exports.updateLeaveStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({ 
        success: false,
        message: 'Invalid status' 
      });
    }

    const leave = await Leave.findById(req.params.id);
    if (!leave) {
      return res.status(404).json({ 
        success: false,
        message: 'Leave not found' 
      });
    }

    leave.status = status;
    leave.reviewedBy = req.user._id;
    await leave.save();

    await Notification.create({
      user: leave.employee,
      title: 'Leave update',
      message: `Your leave request has been ${status}`
    });

    res.json({
      success: true,
      message: `Leave ${status}`,
      leave
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
};
