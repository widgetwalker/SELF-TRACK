const Task = require("../models/task.model");
const Leave = require("../models/leave.model");
const User = require("../models/user.model");
const MLResult = require("../models/mlResult.model");

// =======================
// DASHBOARD DATA
// =======================
exports.getDashboard = async (req, res) => {
  try {

    /* =======================
        EMPLOYEE DASHBOARD
    ======================= */
    if (req.user.role === "employee") {

      // Core counts
      const taskCount = await Task.countDocuments({ assignedTo: req.user._id });
      const completedTasks = await Task.countDocuments({
        assignedTo: req.user._id,
        status: "completed"
      });

      const pendingLeaves = await Leave.countDocuments({
        employee: req.user._id,
        status: "pending"
      });

      const skillCount = req.user.skills?.length || 0;

      /* =======================
          PRODUCTIVITY (ML)
      ======================= */
      const latestProductivity = await MLResult.findOne({
        user: req.user._id,
        type: "productivity"
      }).sort({ createdAt: -1 });

      const productivityScore = latestProductivity
        ? latestProductivity.result.productivity_score
        : 50; // neutral baseline

      /* =======================
          BURNOUT (ML)
      ======================= */
      const latestBurnout = await MLResult.findOne({
        user: req.user._id,
        type: "burnout"
      }).sort({ createdAt: -1 });

      const burnoutRisk = latestBurnout
        ? latestBurnout.result.burnout_risk
        : "low";

      /* =======================
          PRODUCTIVITY TREND
      ======================= */
      const history = await MLResult.find({
        user: req.user._id,
        type: "productivity"
      })
        .sort({ createdAt: -1 })
        .limit(5);

      const trend = history.length
        ? history.reverse().map((r, i) => ({
            label: `Run ${i + 1}`,
            score: r.result.productivity_score
          }))
        : [];

      /* =======================
          INSIGHTS & RECOMMENDATIONS
      ======================= */
      const insights = [];
      const recommendations = [];

      if (productivityScore >= 80) {
        insights.push("Excellent productivity consistency");
      } else if (productivityScore >= 60) {
        insights.push("Moderate productivity performance");
        recommendations.push("Focus on completing tasks on time");
      } else {
        insights.push("Low productivity detected");
        recommendations.push("Break tasks into smaller achievable goals");
      }

      if (burnoutRisk === "high") {
        insights.push("High burnout risk identified");
        recommendations.push("Take a break or apply for leave");
      } else if (burnoutRisk === "medium") {
        recommendations.push("Maintain healthy work–life balance");
      }

      if (pendingLeaves === 0) {
        recommendations.push("Your workload seems balanced");
      }

      return res.json({
        role: "employee",

        tasks: {
          total: taskCount,
          completed: completedTasks
        },

        leaves: {
          pending: pendingLeaves
        },

        skills: {
          total: skillCount
        },

        productivityScore,
        burnoutRisk,
        trend,
        insights,
        recommendations
      });
    }

    /* =======================
       🛠 ADMIN DASHBOARD
    ======================= */
    if (req.user.role === "admin") {

      const totalUsers = await User.countDocuments({ role: "employee" });
      const totalTasks = await Task.countDocuments();

      const pendingLeaves = await Leave.countDocuments({ status: "pending" });
      const approvedLeaves = await Leave.countDocuments({ status: "approved" });

      /* =======================
          ADMIN ALERTS (ML)
      ======================= */
      const burnoutAlerts = await MLResult.find({
        type: "burnout",
        "result.burnout_risk": "high"
      })
        .populate("user", "fullName email")
        .sort({ createdAt: -1 });

      return res.json({
        role: "admin",

        users: {
          employees: totalUsers
        },

        tasks: {
          total: totalTasks
        },

        leaves: {
          pending: pendingLeaves,
          approved: approvedLeaves
        },

        alerts: {
          burnout: burnoutAlerts.map(b => ({
            user: b.user,
            confidence: b.confidence
          })),
          pendingLeaves
        }
      });
    }

    return res.status(403).json({ message: "Invalid role" });

  } catch (error) {
    console.error("DASHBOARD ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};


