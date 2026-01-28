import { useEffect, useState } from "react";
import { fetchSkillOverview } from "../api/skill.api";

export default function AdminSkills() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      const data = await fetchSkillOverview();
      setRecords(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p className="p-6 text-slate-500">Loading skills...</p>;
  }

  return (
    <div className="p-6 space-y-6">

      {/* Header */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-2xl font-semibold text-slate-800">
          🛠 Skills Overview
        </h2>
        <p className="text-slate-500 mt-1">
          Skills across all employees
        </p>
      </div>

      {/* Skills Table */}
      <div className="bg-white rounded-xl shadow p-6 overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-3">Employee</th>
              <th className="p-3">Email</th>
              <th className="p-3">Skills</th>
            </tr>
          </thead>
          <tbody>
            {records.length === 0 ? (
              <tr>
                <td
                  colSpan="3"
                  className="p-6 text-center text-slate-500"
                >
                  No skills data available
                </td>
              </tr>
            ) : (
              records.map((r) => (
                <tr key={r._id} className="border-t">
                  <td className="p-3 font-medium">
                    {r.user?.fullName || "—"}
                  </td>
                  <td className="p-3 text-slate-600">
                    {r.user?.email || "—"}
                  </td>
                  <td className="p-3">
                    <div className="flex flex-wrap gap-2">
                      {r.skills?.map((s, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-sm"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}



