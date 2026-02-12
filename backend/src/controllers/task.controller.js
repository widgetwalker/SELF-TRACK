const Task = require("../models/task.model");
const Notification = require("../models/notification.model");
const User = require("../models/user.model");
const axios = require("axios");

/* ==========================
   ADMIN CREATES TASK
========================== */
exports.createTask = async (req, res) => {
  try {
    const { title, description, assignedTo } = req.body;

    const task = await Task.create({
      title,
      description,
      assignedTo,
      createdBy: req.user._id
    });

    //  Notify employee
    await Notification.create({
      user: assignedTo,
      title: "New Task Assigned",
      message: `You have been assigned a new task: ${title}`
    });

    res.status(201).json({
      message: "Task created successfully",
      task
    });
  } catch (error) {
    console.error("CREATE TASK ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

/* ==========================
   EMPLOYEE GETS OWN TASKS
========================== */
exports.getMyTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ assignedTo: req.user._id })
      .sort({ createdAt: -1 });

    res.json({ tasks });
  } catch (error) {
    console.error("GET MY TASKS ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

/* ==========================
   UPDATE TASK STATUS
========================== */
exports.updateTaskStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const task = await Task.findOne({
      _id: req.params.id,
      assignedTo: req.user._id
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    task.status = status;
    await task.save();

    res.json({
      message: "Task status updated",
      task
    });
  } catch (error) {
    console.error("UPDATE TASK ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

/* ==========================
    COMPLETE TASK
    Notify Admins
    Auto-run ML
========================== */
exports.completeTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      assignedTo: req.user._id
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    //  Prevent duplicate completion
    if (task.status === "completed") {
      return res.status(400).json({
        message: "Task already completed"
      });
    }

    /* ==========================
       1️ Mark task completed
    ========================== */
    task.status = "completed";
    await task.save();

    /* ==========================
       2️ Notify Admins
    ========================== */
    const admins = await User.find({ role: "admin" });

    await Promise.all(
      admins.map(admin =>
        Notification.create({
          user: admin._id,
          title: "Task Completed",
          message: `${
            req.user.fullName || req.user.email
          } completed task: ${task.title}`
        })
      )
    );

    /* ==========================
       3️ AUTO-RUN ML PIPELINE
    ========================== */
    const authHeader = req.headers.authorization;

    try {
      await axios.post(
        "http://localhost:5000/api/ml/productivity",
        {},
        { headers: { Authorization: authHeader } }
      );

      await axios.post(
        "http://localhost:5000/api/ml/burnout",
        {},
        { headers: { Authorization: authHeader } }
      );
    } catch (mlError) {
      console.error("AUTO ML FAILED:", mlError.message);
      //  ML failure should NOT block task completion
    }

    res.json({
      message: "Task completed & ML updated",
      task
    });
  } catch (error) {
    console.error("COMPLETE TASK ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

/* ==========================
   ADMIN GETS ALL TASKS
========================== */
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find()
      .populate("assignedTo", "fullName email")
      .sort({ createdAt: -1 });

    res.json({ tasks });
  } catch (error) {
    console.error("GET ALL TASKS ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};



