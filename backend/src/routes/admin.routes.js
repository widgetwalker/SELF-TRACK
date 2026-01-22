const express = require('express');
const router = express.Router();

const { protect } = require('../middleware/auth.middleware');
const { adminOnly } = require('../middleware/role.middleware');
const adminController = require('../controllers/admin.controller');

// Dashboard
router.get('/dashboard', protect, adminOnly, adminController.getDashboard);

// Employees
router.get('/employees', protect, adminOnly, adminController.getAllEmployees);
router.get('/employees/:employeeId', protect, adminOnly, adminController.getEmployeeProfile);
router.get('/employees/:employeeId/leaves', protect, adminOnly, adminController.getEmployeeLeaves);
router.get('/employees/:employeeId/salary', protect, adminOnly, adminController.getEmployeeSalary);
router.get('/employees/:employeeId/analytics', protect, adminOnly, adminController.getEmployeeAnalytics);

module.exports = router;

