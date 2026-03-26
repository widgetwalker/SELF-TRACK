const Task = require('../models/task.model');
const Notification = require('../models/notification.model');


//  Admin creates a task
exports.createTask = async (req, res) => {
  try {
    const { title, description, assignedTo } = req.body;

    const task = await Task.create({
      title,
      description,
      assignedTo,
      createdBy: req.user._id
    });

    // create notification
    await Notification.create({
      user: assignedTo,
      title: 'New Task Assigned',
      message: 'you have been assigned a new task: ${title}'
    });

    res.status(201).json({
      message: 'Task created successfully',
      task
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  Employee gets own tasks
exports.getMyTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ assignedTo: req.user._id })
      .sort({ createdAt: -1 });

    res.json({ tasks });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  Update task status (employee)
exports.updateTaskStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const task = await Task.findOne({
      _id: req.params.id,
      assignedTo: req.user._id
    });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    task.status = status;
    await task.save();

    res.json({
      message: 'Task status updated',
      task
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
