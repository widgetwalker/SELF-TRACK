import { useEffect, useState } from "react";
import { fetchDashboard } from "../api/dashboard.api";
import LeaveStatusChart from "../components/LeaveStatusChart";

export default function AdminDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const dashboardData = await fetchDashboard();
      setData(dashboardData);
    } catch (err) {
      setError("Failed to load admin dashboard data");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading admin dashboard...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-2xl font-bold text-slate-800">
          Admin Overview
        </h2>
        <p className="text-slate-500 mt-1">
          Monitor team health, workload, salaries, and alerts 🌿
        </p>
      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">

        <StatCard label="Employees" value={data.users.employees} />
        <StatCard label="Total Tasks" value={data.tasks.total} />
        <StatCard label="Pending Leaves" value={data.leaves.pending} color="text-yellow-500" />
        <StatCard label="Approved Leaves" value={data.leaves.approved} color="text-emerald-600" />

        {/* Salary Card (NEW) */}
        {data.salary && (
          <StatCard
            label="Avg Salary"
            value={`₹${data.salary.avgSalary}`}
            color="text-indigo-600"
          />
        )}
      </div>

      {/* Charts + Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Leave Chart */}
        <div className="bg-white rounded-xl shadow p-6 h-[350px]">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">
             Leave Status
          </h3>

          <div className="h-64">
            <LeaveStatusChart
              data={[
                { name: "Pending", value: data.leaves.pending },
                { name: "Approved", value: data.leaves.approved }
              ]}
            />
          </div>
        </div>

        {/* Alerts */}
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">
             Alerts
          </h3>

          {/* Burnout Alerts */}
          {data.alerts?.burnout?.length > 0 ? (
            <div className="space-y-2">
              {data.alerts.burnout.map((b, i) => (
                <div
                  key={i}
                  className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700"
                >
                  High burnout risk:{" "}
                  <b>{b.user?.fullName || b.user?.email}</b>
                  {b.confidence && (
                    <span className="text-xs ml-2">
                      ({Math.round(b.confidence * 100)}%)
                    </span>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-slate-500">
               No burnout alerts at the moment
            </p>
          )}

          {/* Pending Leaves */}
          <div className="mt-4 text-slate-700">
            Pending leave approvals:{" "}
            <b>{data.leaves.pending}</b>
          </div>
        </div>

      </div>
    </div>
  );
}

/* =======================
   Reusable Stat Card
======================= */
function StatCard({ label, value, color = "text-slate-800" }) {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <p className="text-sm text-slate-500">{label}</p>
      <p className={`text-3xl font-bold mt-2 ${color}`}>
        {value}
      </p>
    </div>
  );
}


