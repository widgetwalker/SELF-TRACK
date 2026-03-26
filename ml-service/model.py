import numpy as np
from sklearn.linear_model import LinearRegression, LogisticRegression

# =====================================================
# PRODUCTIVITY MODEL
# =====================================================

X_prod = np.array([
    [10, 7, 2, 3],
    [8, 5, 1, 2],
    [15, 12, 0, 5],
    [6, 3, 3, 1]
])

y_prod = np.array([75, 60, 90, 40])

productivity_model = LinearRegression()
productivity_model.fit(X_prod, y_prod)

def predict_productivity(data):
    features = np.array([[
        data["tasks_total"],
        data["tasks_completed"],
        data["leave_count"],
        data["skills_count"]
    ]])

    score = productivity_model.predict(features)[0]
    return round(max(0, min(score, 100)))


# =====================================================
# BURNOUT MODEL
# =====================================================

X_burnout = np.array([
    [15, 0, -20, 0.7],  # high risk
    [12, 1, -10, 0.5],  # medium
    [8, 2, 5, 0.2],     # low
    [6, 3, 10, 0.1]     # very low
])

y_burnout = np.array([1, 1, 0, 0])  # 1 = burnout, 0 = healthy

burnout_model = LogisticRegression()
burnout_model.fit(X_burnout, y_burnout)

def predict_burnout(data):
    features = np.array([[
        data["avg_tasks_per_week"],
        data["leave_frequency"],
        data["productivity_trend"],
        data["overdue_task_ratio"]
    ]])

    prob = burnout_model.predict_proba(features)[0][1]

    if prob > 0.7:
        risk = "high"
    elif prob > 0.4:
        risk = "medium"
    else:
        risk = "low"

    return {
        "burnout_risk": risk,
        "confidence": round(float(prob), 2)
    }
def detect_anomaly(data):
    drop = data["historical_avg_productivity"] - data["current_productivity"]
    overdue = data["overdue_task_ratio"]

    if drop > 25 and overdue > 0.5:
        return {
            "anomaly": True,
            "severity": "high"
        }
    elif drop > 15:
        return {
            "anomaly": True,
            "severity": "medium"
        }
    else:
        return {
            "anomaly": False,
            "severity": "low"
        }

def generate_insights(data):
    strengths = []
    weaknesses = []
    recommendations = []

    if data["productivity_score"] >= 70:
        strengths.append("High productivity")
    else:
        weaknesses.append("Low productivity")
        recommendations.append("Focus on completing high-priority tasks")

    if data["overdue_task_ratio"] > 0.4:
        weaknesses.append("Task delays")
        recommendations.append("Improve task prioritization")

    if data["burnout_risk"] == "high":
        weaknesses.append("Burnout risk")
        recommendations.append("Take time off and reduce workload")
    elif data["burnout_risk"] == "medium":
        recommendations.append("Maintain work-life balance")

    if data["leave_frequency"] == 0:
        recommendations.append("Consider taking short breaks")

    return {
        "strengths": strengths,
        "weaknesses": weaknesses,
        "recommendations": recommendations
    }
