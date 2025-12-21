const express = require('express');
const router = express.Router();

const { protect } = require('../middleware/auth.middleware');
const { adminOnly } = require('../middleware/role.middleware');
const leaveController = require('../controllers/leave.controller');

//  Employee
router.post('/', protect, leaveController.applyLeave);
router.get('/my', protect, leaveController.getMyLeaves);

//  Admin
router.get('/', protect, adminOnly, leaveController.getAllLeaves);
router.put('/:id/status', protect, adminOnly, leaveController.updateLeaveStatus);

module.exports = router;
