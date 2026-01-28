import { useEffect, useState } from "react";
import {
  fetchAdminProductivity,
  fetchAdminBurnout,
  fetchAdminAnomalies
} from "../api/ml.api";

export default function AdminAnalytics() {
  const [productivity, setProductivity] = useState([]);
  const [burnout, setBurnout] = useState(null);
  const [anomalies, setAnomalies] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const p = await fetchAdminProductivity();
    const b = await fetchAdminBurnout();
    const a = await fetchAdminAnomalies();

    setProductivity(p);
    setBurnout(b);
    setAnomalies(a);
  };

  return (
    <div className="space-y-8">

      {/* PRODUCTIVITY */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4">
           Productivity Overview
        </h2>

        <table className="w-full text-left">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-3">Employee</th>
              <th className="p-3">Score</th>
            </tr>
          </thead>
          <tbody>
            {productivity.map((p, i) => (
              <tr key={i} className="border-t">
                <td className="p-3">
                  {p.user?.fullName || p.user?.email}
                </td>
                <td className="p-3 font-semibold">
                  {p.productivity_score}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* BURNOUT */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-2">
           Burnout Alerts
        </h2>

        <p className="text-slate-600">
          High risk employees:{" "}
          <b className="text-red-600">
            {burnout?.high_risk_count || 0}
          </b>
        </p>
      </div>

      {/* ANOMALIES */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4">
           Anomaly Detection
        </h2>

        {anomalies.length === 0 ? (
          <p className="text-slate-500">No anomalies detected</p>
        ) : (
          <ul className="space-y-2">
            {anomalies.map((a, i) => (
              <li key={i} className="text-red-600">
                {a.user?.fullName} — Severity: {a.severity}
              </li>
            ))}
          </ul>
        )}
      </div>

    </div>
  );
}

