import { useEffect, useState } from "react";
import { applyLeave, fetchMyLeaves } from "../api/leave.api";

export default function EmployeeLeaves() {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    startDate: "",
    endDate: "",
    reason: ""
  });

  useEffect(() => {
    loadLeaves();
  }, []);

  const loadLeaves = async () => {
    const data = await fetchMyLeaves();
    setLeaves(data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await applyLeave(form);
      setForm({ startDate: "", endDate: "", reason: "" });
      loadLeaves();
    } catch (err) {
      alert("Failed to apply leave");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">

      {/* APPLY LEAVE */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Apply Leave</h2>

        <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-3">

          <input
            type="date"
            name="startDate"
            value={form.startDate}
            onChange={handleChange}
            required
            className="border rounded-lg px-3 py-2"
          />

          <input
            type="date"
            name="endDate"
            value={form.endDate}
            onChange={handleChange}
            required
            className="border rounded-lg px-3 py-2"
          />

          <textarea
            name="reason"
            value={form.reason}
            onChange={handleChange}
            placeholder="Reason for leave"
            required
            className="border rounded-lg px-3 py-2 md:col-span-3"
          />

          <button
            disabled={loading}
            className="md:col-span-3 bg-emerald-600 text-white py-2 rounded-lg"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>

        </form>
      </div>

      {/* LEAVE HISTORY */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-3">From</th>
              <th className="p-3">To</th>
              <th className="p-3">Reason</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {leaves.map(l => (
              <tr key={l._id} className="border-t">
                <td className="p-3">{l.startDate?.slice(0,10)}</td>
                <td className="p-3">{l.endDate?.slice(0,10)}</td>
                <td className="p-3">{l.reason}</td>
                <td className="p-3 capitalize font-medium">
                  {l.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}

