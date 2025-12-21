const express = require('express');
const router = express.Router();

const { protect } = require('../middleware/auth.middleware');
const { adminOnly } = require('../middleware/role.middleware');
const salaryController = require('../controllers/salary.controller');

//  Admin
router.post('/', protect, adminOnly, salaryController.createSalary);

//  Employee
router.get('/my', protect, salaryController.getMySalary);

module.exports = router;
