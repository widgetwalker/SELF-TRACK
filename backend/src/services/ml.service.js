// src/services/ml.service.js

exports.getProductivityScore = async (features) => {
  const { tasks_total, tasks_completed, leave_count, skills_count } = features;

  let score =
    tasks_completed * 20 +
    skills_count * 5 -
    leave_count * 10;

  score = Math.max(0, Math.min(100, score));
  return score;
};

exports.getBurnoutRisk = async (features) => {
  const { avg_tasks_per_week, overdue_task_ratio } = features;

  let risk = "low";
  let confidence = 0.3;

  if (avg_tasks_per_week > 12 || overdue_task_ratio > 0.5) {
    risk = "high";
    confidence = 0.85;
  } else if (avg_tasks_per_week > 8) {
    risk = "medium";
    confidence = 0.6;
  }

  return {
    burnout_risk: risk,
    confidence
  };
};

exports.getAnomalyResult = async (features) => {
  const drop =
    features.historical_avg_productivity -
    features.current_productivity;

  if (drop > 20) {
    return { anomaly: true, severity: "high" };
  }

  return { anomaly: false, severity: "low" };
};

exports.getPerformanceInsights = async (features) => {
  const insights = [];
  const recommendations = [];

  if (features.productivity_score < 60) {
    insights.push("Productivity is below optimal level");
    recommendations.push("Focus on completing priority tasks");
  }

  if (features.burnout_risk === "high") {
    insights.push("High burnout risk detected");
    recommendations.push("Apply for leave or reduce workload");
  }

  return {
    insights,
    recommendations
  };
};

