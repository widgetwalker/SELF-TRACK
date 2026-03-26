const Task = require('../models/task.model');
const Leave = require('../models/leave.model');
const MLResult = require('../models/mlResult.model');
const Notification = require('../models/notification.model');
const {
  getProductivityScore,
  getBurnoutRisk
} = require('../services/ml.service');

// =======================
// PRODUCTIVITY ML
// =======================
exports.runProductivityML = async (req, res) => {
  try {
    const tasksTotal = await Task.countDocuments({ assignedTo: req.user._id });
    const tasksCompleted = await Task.countDocuments({
      assignedTo: req.user._id,
      status: 'completed'
    });
    const leaveCount = await Leave.countDocuments({ employee: req.user._id });
    const skillsCount = req.user.skills.length;

    const features = {
      tasks_total: tasksTotal,
      tasks_completed: tasksCompleted,
      leave_count: leaveCount,
      skills_count: skillsCount
    };

    const result = await getProductivityScore(features);

    const saved = await MLResult.create({
      user: req.user._id,
      type: 'productivity',
      result,
      confidence: null
    });

    res.json({
      features,
      ml_result: saved
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// =======================
// BURNOUT ML   NEW
// =======================
exports.runBurnoutDetection = async (req, res) => {
  try {
    const totalTasks = await Task.countDocuments({ assignedTo: req.user._id });
    const overdueTasks = await Task.countDocuments({
      assignedTo: req.user._id,
      status: 'overdue'
    });

    const leaveCount = await Leave.countDocuments({ employee: req.user._id });

    const avgTasksPerWeek = Math.round(totalTasks / 4);
    const overdueRatio =
      totalTasks === 0 ? 0 : overdueTasks / totalTasks;

    const lastProductivity = await MLResult.findOne({
      user: req.user._id,
      type: 'productivity'
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

    const saved = await MLResult.create({
      user: req.user._id,
      type: 'burnout',
      result,
      confidence: result.confidence
    });

    //  Notify only if HIGH risk
    if (result.burnout_risk === 'high') {
      await Notification.create({
        user: req.user._id,
        title: 'Burnout Risk Alert',
        message:
          'You may be experiencing burnout. Consider taking a break or reducing workload.'
      });
    }

    res.json({
      features,
      burnout_result: saved
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.runAnomalyDetection = async (req, res) => {
  try {
    const lastProductivity = await MLResult.findOne({
      user: req.user._id,
      type: 'productivity'
    }).sort({ createdAt: -1 });

    if (!lastProductivity) {
      return res.status(400).json({
        message: 'Not enough data for anomaly detection'
      });
    }

    const currentProductivity = lastProductivity.result.productivity_score;

    const history = await MLResult.find({
      user: req.user._id,
      type: 'productivity'
    }).limit(5);

    const avgProductivity =
      history.reduce((sum, r) => sum + r.result.productivity_score, 0) /
      history.length;

    const totalTasks = await Task.countDocuments({ assignedTo: req.user._id });
    const overdueTasks = await Task.countDocuments({
      assignedTo: req.user._id,
      status: 'overdue'
    });

    const overdueRatio =
      totalTasks === 0 ? 0 : overdueTasks / totalTasks;

    const features = {
      current_productivity: currentProductivity,
      historical_avg_productivity: Math.round(avgProductivity),
      overdue_task_ratio: overdueRatio
    };

    const result = await getAnomalyResult(features);

    const saved = await MLResult.create({
      user: req.user._id,
      type: 'anomaly',
      result
    });

    res.json({
      features,
      anomaly_prediction: saved.result
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.runPerformanceInsights = async (req, res) => {
  try {
    const productivity = await MLResult.findOne({
      user: req.user._id,
      type: 'productivity'
    }).sort({ createdAt: -1 });

    const burnout = await MLResult.findOne({
      user: req.user._id,
      type: 'burnout'
    }).sort({ createdAt: -1 });

    const totalTasks = await Task.countDocuments({ assignedTo: req.user._id });
    const overdueTasks = await Task.countDocuments({
      assignedTo: req.user._id,
      status: 'overdue'
    });

    if (!productivity || !burnout) {
      return res.status(400).json({
        message: 'Not enough data for insights'
      });
    }

    const features = {
      productivity_score: productivity.result.productivity_score,
      burnout_risk: burnout.result.burnout_risk,
      overdue_task_ratio:
        totalTasks === 0 ? 0 : overdueTasks / totalTasks,
      leave_frequency: await Leave.countDocuments({ employee: req.user._id })
    };

    const insights = await getPerformanceInsights(features);

    res.json({
      features,
      insights
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.adminProductivityOverview = async (req, res) => {
  try {
    const results = await MLResult.find({ type: 'productivity' })
      .populate('user', 'fullName email role')
      .sort({ createdAt: -1 });

    res.json({
      total_records: results.length,
      data: results.map(r => ({
        user: r.user,
        productivity_score: r.result.productivity_score,
        createdAt: r.createdAt
      }))
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.adminBurnoutOverview = async (req, res) => {
  try {
    const results = await MLResult.find({ type: 'burnout' })
      .populate('user', 'fullName email')
      .sort({ createdAt: -1 });

    const highRisk = results.filter(
      r => r.result.burnout_risk === 'high'
    );

    res.json({
      total_checked: results.length,
      high_risk_count: highRisk.length,
      high_risk_employees: highRisk.map(r => ({
        user: r.user,
        confidence: r.confidence
      }))
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.adminAnomalyOverview = async (req, res) => {
  try {
    const results = await MLResult.find({ type: 'anomaly' })
      .populate('user', 'fullName email')
      .sort({ createdAt: -1 });

    const anomalies = results.filter(r => r.result.anomaly);

    res.json({
      total_anomalies: anomalies.length,
      anomalies: anomalies.map(r => ({
        user: r.user,
        severity: r.result.severity,
        createdAt: r.createdAt
      }))
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
