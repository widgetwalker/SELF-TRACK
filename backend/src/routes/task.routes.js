const express = require('express');
const router = express.Router();

const { protect } = require('../middleware/auth.middleware');
const { adminOnly } = require('../middleware/role.middleware');
const taskController = require('../controllers/task.controller');

// =========================
// ADMIN ROUTES
// =========================

// Admin creates task
router.post('/', protect, adminOnly, taskController.createTask);

// Admin gets ALL tasks
router.get('/', protect, adminOnly, taskController.getAllTasks);

// Admin views all tasks
router.get('/', protect, adminOnly, taskController.getAllTasks);


// =========================
// EMPLOYEE ROUTES
// =========================

// Employee views own tasks
router.get('/my', protect, taskController.getMyTasks);

// Employee updates task status
router.put('/:id/status', protect, taskController.updateTaskStatus);

// Employee marks task as complete
router.patch('/:id/complete', protect, taskController.completeTask);

router.get('/', protect, adminOnly, taskController.getAllTasks);


module.exports = router;


