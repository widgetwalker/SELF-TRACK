const Task = require("../models/task.model");
const Leave = require("../models/leave.model");
const MLResult = require("../models/mlResult.model");
const Notification = require("../models/notification.model");
const Skill = require("../models/skill.model");


const {
  getProductivityScore,
  getBurnoutRisk,
  getAnomalyResult,
  getPerformanceInsights
} = require("../services/ml.service");

/* =======================
   PRODUCTIVITY ML
======================= */
exports.runProductivityML = async (req, res) => {
  try {
    const tasksTotal = await Task.countDocuments({ assignedTo: req.user._id });
    const tasksCompleted = await Task.countDocuments({
      assignedTo: req.user._id,
      status: "completed"
    });

    const leaveCount = await Leave.countDocuments({ employee: req.user._id });

    const skillsCount = await Skill.countDocuments({
      user: req.user._id
    });

    const features = {
      tasks_total: tasksTotal,
      tasks_completed: tasksCompleted,
      leave_count: leaveCount,
      skills_count: skillsCount
    };

    const productivityScore = await getProductivityScore(features);

    await MLResult.create({
      user: req.user._id,
      type: "productivity",
      result: { productivity_score: productivityScore },
      confidence: null
    });

    res.json({
      productivity_score: productivityScore
    });
  } catch (error) {
    console.error("PRODUCTIVITY ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};


/* =======================
   PRODUCTIVITY HISTORY
======================= */
exports.getProductivityHistory = async (req, res) => {
  try {
    const history = await MLResult.find({
      user: req.user._id,
      type: "productivity"
    })
      .sort({ createdAt: 1 })
      .limit(5);

    res.json(
      history.map(r => ({
        score: r.result.productivity_score,
        date: r.createdAt
      }))
    );
  } catch (error) {
    res.status(500).json({ message: "Error" });
  }
};

/* =======================
   BURNOUT ML
======================= */
exports.runBurnoutDetection = async (req, res) => {
  try {
    const totalTasks = await Task.countDocuments({ assignedTo: req.user._id });
    const overdueTasks = await Task.countDocuments({
      assignedTo: req.user._id,
      status: "overdue"
    });

    const leaveCount = await Leave.countDocuments({ employee: req.user._id });

    const avgTasksPerWeek = Math.round(totalTasks / 4);
    const overdueRatio = totalTasks === 0 ? 0 : overdueTasks / totalTasks;

    const lastProductivity = await MLResult.findOne({
      user: req.user._id,
      type: "productivity"
    }).sort({ createdAt: -1 });

    const productivityTrend = lastProductivity
      ? lastProductivity.result.productivity_score - 70
      : 0;

    const features = {
      avg_tasks_per_week: avgTasksPerWeek,
      leave_frequency: leaveCount,
      productivity_trend: productivityTrend,
      overdue_task_ratio: overdueRatio
    };

    const result = await getBurnoutRisk(features);

    await MLResult.create({
      user: req.user._id,
      type: "burnout",
      result
    });

    if (result.burnout_risk === "high") {
      await Notification.create({
        user: req.user._id,
        title: "Burnout Risk Alert",
        message:
          "You may be experiencing burnout. Consider taking breaks or applying for leave."
      });
    }

    res.json({
      burnoutRisk: result.burnout_risk,
      confidence: result.confidence
    });
  } catch (error) {
    console.error("BURNOUT ERROR:", error);
    res.status(500).json({ message: "Error" });
  }
};

/* =======================
   ANOMALY DETECTION
======================= */
exports.runAnomalyDetection = async (req, res) => {
  try {
    const history = await MLResult.find({
      user: req.user._id,
      type: "productivity"
    }).sort({ createdAt: -1 });

    if (history.length < 2) {
      return res.status(400).json({
        message: "Not enough data for anomaly detection"
      });
    }

    const current = history[0].result.productivity_score;
    const avg =
      history.reduce((s, r) => s + r.result.productivity_score, 0) /
      history.length;

    const totalTasks = await Task.countDocuments({ assignedTo: req.user._id });
    const overdueTasks = await Task.countDocuments({
      assignedTo: req.user._id,
      status: "overdue"
    });

    const features = {
      current_productivity: current,
      historical_avg_productivity: Math.round(avg),
      overdue_task_ratio: totalTasks === 0 ? 0 : overdueTasks / totalTasks
    };

    const result = await getAnomalyResult(features);

    await MLResult.create({
      user: req.user._id,
      type: "anomaly",
      result
    });

    res.json(result);
  } catch (error) {
    console.error("ANOMALY ERROR:", error);
    res.status(500).json({ message: "Error" });
  }
};

/* =======================
   PERFORMANCE INSIGHTS
======================= */
exports.runPerformanceInsights = async (req, res) => {
  try {
    const productivity = await MLResult.findOne({
      user: req.user._id,
      type: "productivity"
    }).sort({ createdAt: -1 });

    const burnout = await MLResult.findOne({
      user: req.user._id,
      type: "burnout"
    }).sort({ createdAt: -1 });

    if (!productivity || !burnout) {
      return res.status(400).json({
        message: "Not enough data for insights"
      });
    }

    const totalTasks = await Task.countDocuments({ assignedTo: req.user._id });
    const overdueTasks = await Task.countDocuments({
      assignedTo: req.user._id,
      status: "overdue"
    });

    const features = {
      productivity_score: productivity.result.productivity_score,
      burnout_risk: burnout.result.burnout_risk,
      overdue_task_ratio: totalTasks === 0 ? 0 : overdueTasks / totalTasks,
      leave_frequency: await Leave.countDocuments({ employee: req.user._id })
    };

    const insights = await getPerformanceInsights(features);

    res.json(insights);
  } catch (error) {
    console.error("INSIGHTS ERROR:", error);
    res.status(500).json({ message: "Error" });
  }
};

/* =======================
   ADMIN ANALYTICS
======================= */

// ADMIN: Productivity Overview
exports.adminProductivityOverview = async (req, res) => {
  try {
    const results = await MLResult.aggregate([
      {
        $match: { type: "productivity" }
      },
      {
        $sort: { createdAt: -1 }
      },
      {
        $group: {
          _id: "$user",
          latestResult: { $first: "$$ROOT" }
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user"
        }
      },
      {
        $unwind: "$user"
      },
      {
        $project: {
          _id: 0,
          user: {
            fullName: "$user.fullName",
            email: "$user.email"
          },
          productivity_score:
            "$latestResult.result.productivity_score",
          createdAt: "$latestResult.createdAt"
        }
      }
    ]);

    res.json({
      total_records: results.length,
      data: results
    });
  } catch (error) {
    console.error("ADMIN PRODUCTIVITY ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

// ADMIN: Burnout Overview
exports.adminBurnoutOverview = async (req, res) => {
  try {
    const results = await MLResult.find({ type: "burnout" })
      .populate("user", "fullName email");

    const highRisk = results.filter(
      r => r.result?.burnout_risk === "high"
    );

    res.json({
      total_checked: results.length,
      high_risk_count: highRisk.length,
      high_risk_employees: highRisk.map(r => ({
        user: r.user,
        confidence: r.result.confidence
      }))
    });
  } catch (error) {
    console.error("ADMIN BURNOUT ERROR:", error);
    res.status(500).json({ message: "Error" });
  }
};

// ADMIN: Anomaly Overview
exports.adminAnomalyOverview = async (req, res) => {
  try {
    const results = await MLResult.find({ type: "anomaly" })
      .populate("user", "fullName email")
      .sort({ createdAt: -1 });

    const anomalies = results.filter(r => r.result?.anomaly);

    res.json({
      total_anomalies: anomalies.length,
      anomalies: anomalies.map(r => ({
        user: r.user,
        severity: r.result.severity,
        createdAt: r.createdAt
      }))
    });
  } catch (error) {
    console.error("ADMIN ANOMALY ERROR:", error);
    res.status(500).json({ message: "Error" });
  }
};



