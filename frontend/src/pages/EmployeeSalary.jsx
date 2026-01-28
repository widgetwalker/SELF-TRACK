import { useEffect, useState } from "react";
import { fetchMySalary } from "../api/salary.api";

export default function EmployeeSalary() {
  const [salaries, setSalaries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      setLoading(true);
      const data = await fetchMySalary();
      setSalaries(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setError("Failed to load salary data");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p className="p-6 text-slate-500">Loading salary details...</p>;
  }

  if (error) {
    return <p className="p-6 text-red-500">{error}</p>;
  }

  return (
    <div className="space-y-6 p-6">

      {/* HEADER */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-2xl font-semibold text-slate-800">
           My Salary
        </h2>
        <p className="text-slate-500 mt-1">
          View your salary history and payments
        </p>
      </div>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-sm text-slate-500">Total Records</p>
          <p className="text-3xl font-bold text-slate-800 mt-2">
            {salaries.length}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-sm text-slate-500">Latest Salary</p>
          <p className="text-3xl font-bold text-emerald-600 mt-2">
            ₹ {salaries[0]?.netPay || 0}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-sm text-slate-500">Latest Month</p>
          <p className="text-3xl font-bold text-slate-800 mt-2">
            {salaries[0]?.month || "—"}
          </p>
        </div>
      </div>

      {/* SALARY TABLE */}
      <div className="bg-white rounded-xl shadow p-6">
        <h3 className="text-xl font-semibold mb-4">
           Salary History
        </h3>

        {salaries.length === 0 ? (
          <p className="text-slate-500">
            No salary records available yet
          </p>
        ) : (
          <table className="w-full text-left">
            <thead className="bg-slate-100">
              <tr>
                <th className="p-3">Month</th>
                <th className="p-3">Basic</th>
                <th className="p-3">Allowances</th>
                <th className="p-3">Deductions</th>
                <th className="p-3">Net Pay</th>
              </tr>
            </thead>
            <tbody>
              {salaries.map(s => (
                <tr key={s._id} className="border-t">
                  <td className="p-3">{s.month}</td>
                  <td className="p-3">₹ {s.basic}</td>
                  <td className="p-3">₹ {s.allowances}</td>
                  <td className="p-3">₹ {s.deductions}</td>
                  <td className="p-3 font-semibold text-emerald-600">
                    ₹ {s.netPay}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

    </div>
  );
}

