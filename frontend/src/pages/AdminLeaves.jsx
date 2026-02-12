import { useEffect, useState } from "react";
import { fetchAllLeaves, updateLeaveStatus } from "../api/leave.api";

export default function AdminLeaves() {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    loadLeaves();
  }, []);

  const loadLeaves = async () => {
    try {
      const data = await fetchAllLeaves();
      setLeaves(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load leave requests");
    }
  };

  const handleAction = async (id, status) => {
    setLoading(true);
    setError("");

    try {
      await updateLeaveStatus(id, status);
      await loadLeaves(); // refresh list
    } catch (err) {
      console.error(err);
      setError("Failed to update leave status");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">

      <h2 className="text-2xl font-semibold">Leave Requests</h2>

      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded-lg">
          {error}
        </div>
      )}

      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-3 text-left">Employee</th>
              <th className="p-3 text-left">Reason</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {leaves.map((l) => (
              <tr key={l._id} className="border-t">
                <td className="p-3">
                  {l.employee?.fullName || l.employee?.email}
                </td>
                <td className="p-3">{l.reason}</td>
                <td className="p-3 capitalize font-medium">
                  {l.status}
                </td>
                <td className="p-3 space-x-2">
                  {l.status === "pending" && (
                    <>
                      <button
                        disabled={loading}
                        onClick={() => handleAction(l._id, "approved")}
                        className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded disabled:opacity-50"
                      >
                        {loading ? "..." : "Approve"}
                      </button>

                      <button
                        disabled={loading}
                        onClick={() => handleAction(l._id, "rejected")}
                        className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded disabled:opacity-50"
                      >
                        {loading ? "..." : "Reject"}
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}

            {leaves.length === 0 && (
              <tr>
                <td colSpan="4" className="p-4 text-center text-slate-500">
                  No leave requests
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

