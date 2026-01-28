import { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { fetchEmployeeDashboard } from "../api/dashboard.api";
import { useNavigate } from "react-router-dom";
import { fetchProductivityHistory } from "../api/ml.api";
import ProductivityTrend from "../components/ProductivityTrend";

export default function EmployeeDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [trend, setTrend] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const dashboardData = await fetchEmployeeDashboard();
        setData(dashboardData);

        const history = await fetchProductivityHistory();
        setTrend(history || []);
      } catch (err) {
        setError("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  if (loading) return <p className="p-6">Loading dashboard...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  const burnoutColor =
    data.burnoutRisk === "high"
      ? "text-red-600"
      : data.burnoutRisk === "medium"
      ? "text-yellow-500"
      : "text-green-600";

  return (
    <div className="space-y-6">

      {/* Welcome */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-2xl font-bold text-slate-800">
          Welcome back, {user?.fullName || user?.email}
        </h2>
        <p className="text-slate-500 mt-1">
          Here’s a calm overview of your work & well-being 🌿
        </p>
      </div>

      {/*  Burnout Warning Banner */}
      {data.burnoutRisk === "high" && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
          <div className="text-red-600 text-xl"></div>
          <div>
            <h3 className="font-semibold text-red-700">
              Burnout Risk Detected
            </h3>
            <p className="text-sm text-red-600 mt-1">
              Your recent activity indicates a high risk of burnout.
              Consider taking breaks or applying for leave.
            </p>

            <button
              onClick={() => navigate("/employee/leaves")}
              className="mt-3 text-sm text-red-700 underline"
            >
              Apply for leave
            </button>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-sm text-slate-500">Productivity Score</p>
          <p className="text-4xl font-bold text-emerald-600 mt-2">
            {data.productivityScore}%
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-sm text-slate-500">Burnout Risk</p>
          <p className={`text-3xl font-bold mt-2 ${burnoutColor}`}>
            {data.burnoutRisk.toUpperCase()}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-sm text-slate-500">Pending Leaves</p>
          <p className="text-3xl font-bold text-slate-800 mt-2">
            {data.leaves.pending}
          </p>
        </div>
      </div>

      {/*  Productivity Trend (STEP 6) */}
      <ProductivityTrend data={trend} />

      {/* Insights */}
      <div className="bg-white rounded-xl shadow p-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-3">
           Insights
        </h3>
        <ul className="list-disc list-inside space-y-1 text-slate-600">
          {data.insights.map((insight, index) => (
            <li key={index}>{insight}</li>
          ))}
        </ul>
      </div>

      {/* Recommendations */}
      <div className="bg-white rounded-xl shadow p-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-3">
           Recommendations
        </h3>
        <ul className="list-disc list-inside space-y-1 text-slate-600">
          {data.recommendations.map((rec, index) => (
            <li key={index}>{rec}</li>
          ))}
        </ul>
      </div>

    </div>
  );
}
