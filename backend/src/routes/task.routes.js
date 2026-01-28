const express = require('express');
const router = express.Router();

const { protect } = require('../middleware/auth.middleware');
const { adminOnly } = require('../middleware/role.middleware');
const taskController = require('../controllers/task.controller');

//  Admin creates task for others
router.post('/admin', protect, adminOnly, taskController.createTask);

//  Employee creates own task
router.post('/', protect, taskController.createOwnTask);

//  Employee views own tasks
router.get('/my', protect, taskController.getMyTasks);

//  Employee updates task status
router.put('/:id/status', protect, taskController.updateTaskStatus);

module.exports = router;
