const Task = require('../models/task.model');
const Notification = require('../models/notification.model');
const { asyncHandler, AppError } = require('../utils/error-handler');
const logger = require('../utils/logger');

// Admin creates a task
exports.createTask = asyncHandler(async (req, res) => {
  const { title, description, assignedTo } = req.body;

  // Verify assigned user exists
  const User = require('../models/user.model');
  const user = await User.findById(assignedTo);
  if (!user) {
    throw new AppError('User not found', 'USER_NOT_FOUND', 404);
  }

  const task = await Task.create({
    title,
    description,
    assignedTo,
    createdBy: req.user._id
  });

  // Create notification (Fixed: using backticks for template literal)
  await Notification.create({
    user: assignedTo,
    title: 'New Task Assigned',
    message: `You have been assigned a new task: ${title}`
  });

  logger.info('Task created', { taskId: task._id, assignedTo });

  res.status(201).json({
    success: true,
    message: 'Task created successfully',
    task
  });
});

// Employee gets own tasks
exports.getMyTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find({ assignedTo: req.user._id })
    .populate('createdBy', 'fullName email')
    .sort({ createdAt: -1 });

  res.json({
    success: true,
    count: tasks.length,
    tasks
  });
});

// Update task status (employee)
exports.updateTaskStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;

  const task = await Task.findOne({
    _id: req.params.id,
    assignedTo: req.user._id
  });

  if (!task) {
    throw new AppError('Task not found', 'TASK_NOT_FOUND', 404);
  }

  const oldStatus = task.status;
  task.status = status;
  await task.save();

  logger.info('Task status updated', { taskId: task._id, oldStatus, newStatus: status });

  res.json({
    success: true,
    message: 'Task status updated successfully',
    task
  });
});
