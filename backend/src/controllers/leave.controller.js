const Leave = require('../models/leave.model');
const Notification = require('../models/notification.model');
const User = require('../models/user.model'); 

// =======================
// Employee applies for leave
// =======================
exports.applyLeave = async (req, res) => {
  try {
    const { startDate, endDate, reason } = req.body;

    const leave = await Leave.create({
      employee: req.user._id,
      startDate,
      endDate,
      reason
    });

    //  NOTIFY ALL ADMINS
    const admins = await User.find({ role: "admin" });

    for (const admin of admins) {
      await Notification.create({
        user: admin._id,
        title: "New Leave Request",
        message: `${
          req.user.fullName || req.user.email
        } has submitted a leave request.`
      });
    }

    res.status(201).json({
      message: "Leave request submitted",
      leave
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


//  Employee views own leave history
exports.getMyLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find({ employee: req.user._id })
      .sort({ createdAt: -1 });

    res.json({ leaves });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  Admin views all leave requests
exports.getAllLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find()
      .populate('employee', 'fullName email')
      .sort({ createdAt: -1 });

    res.json({ leaves });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  Admin approves / rejects leave
exports.updateLeaveStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const leave = await Leave.findById(req.params.id);
    if (!leave) {
      return res.status(404).json({ message: "Leave not found" });
    }

    leave.status = status;
    leave.reviewedBy = req.user._id;
    await leave.save();

    //  CREATE NOTIFICATION FOR EMPLOYEE
    await Notification.create({
      user: leave.employee,
      title: `Leave ${status}`,
      message:
        status === "approved"
          ? "Your leave request has been approved."
          : "Your leave request has been rejected."
    });

    res.json({
      message: `Leave ${status}`,
      leave
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
