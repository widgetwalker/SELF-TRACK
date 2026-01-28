import { useEffect, useState } from "react";
import { fetchAllSalaries, createSalary } from "../api/salary.api";
import { fetchEmployees } from "../api/users.api";

export default function AdminSalary() {
  const [salaries, setSalaries] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    user: "",
    month: "",
    basic: "",
    allowances: 0,
    deductions: 0
  });

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      setLoading(true);

      const sals = await fetchAllSalaries();
      const empRes = await fetchEmployees();

      //  normalize API response
      setEmployees(Array.isArray(empRes) ? empRes : empRes.employees || []);
      setSalaries(Array.isArray(sals) ? sals : []);

    } catch (err) {
      console.error("Failed to load salary data", err);
    } finally {
      setLoading(false);
    }
  };

  const submit = async () => {
    if (!form.user || !form.month || !form.basic) {
      alert("Please fill employee, month and basic salary");
      return;
    }

    try {
      await createSalary(form);

      setForm({
        user: "",
        month: "",
        basic: "",
        allowances: 0,
        deductions: 0
      });

      load();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to assign salary");
    }
  };

  if (loading) {
    return <p className="p-6 text-slate-500">Loading salary data...</p>;
  }

  return (
    <div className="space-y-6">

      {/* ================= ASSIGN SALARY ================= */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4"> Assign Salary</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <select
            value={form.user}
            onChange={e => setForm({ ...form, user: e.target.value })}
            className="border p-2 rounded"
          >
            <option value="">Select Employee</option>

            {Array.isArray(employees) &&
              employees.map(e => (
                <option key={e._id} value={e._id}>
                  {e.fullName}
                </option>
              ))}
          </select>

          <input
            type="month"
            value={form.month}
            onChange={e => setForm({ ...form, month: e.target.value })}
            className="border p-2 rounded"
          />

          <input
            type="number"
            placeholder="Basic Salary"
            value={form.basic}
            onChange={e => setForm({ ...form, basic: Number(e.target.value) })}
            className="border p-2 rounded"
          />

          <input
            type="number"
            placeholder="Allowances"
            value={form.allowances}
            onChange={e =>
              setForm({ ...form, allowances: Number(e.target.value) })
            }
            className="border p-2 rounded"
          />

          <input
            type="number"
            placeholder="Deductions"
            value={form.deductions}
            onChange={e =>
              setForm({ ...form, deductions: Number(e.target.value) })
            }
            className="border p-2 rounded"
          />
        </div>

        <button
          onClick={submit}
          className="mt-4 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded"
        >
          Assign Salary
        </button>
      </div>

      {/* ================= SALARY TABLE ================= */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4"> Salary Records</h2>

        {salaries.length === 0 ? (
          <p className="text-slate-500">No salary records yet</p>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b text-left">
                <th className="py-2">Employee</th>
                <th>Month</th>
                <th>Net Pay</th>
              </tr>
            </thead>
            <tbody>
              {salaries.map(s => (
                <tr key={s._id} className="border-b">
                  <td className="py-2">
                    {s.user?.fullName || "—"}
                  </td>
                  <td>{s.month}</td>
                  <td>₹ {s.netPay}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

    </div>
  );
}
