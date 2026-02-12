import { useEffect, useState } from "react";
import { fetchEmployees } from "../api/users.api";

export default function AdminEmployees() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEmployees = async () => {
      try {
        const data = await fetchEmployees();

        //  SAFETY: handle both response shapes
        if (Array.isArray(data)) {
          setEmployees(data);
        } else if (Array.isArray(data?.employees)) {
          setEmployees(data.employees);
        } else {
          setEmployees([]);
        }

      } catch (err) {
        console.error("Failed to load employees:", err);
        setEmployees([]);
      } finally {
        setLoading(false);
      }
    };

    loadEmployees();
  }, []);

  if (loading) {
    return (
      <div className="p-6 text-gray-500">
        Loading employees...
      </div>
    );
  }

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-semibold">
        Employees
      </h2>

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-100 text-gray-600 text-sm">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Role</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>

          <tbody>
            {employees.length === 0 ? (
              <tr>
                <td
                  colSpan="4"
                  className="p-4 text-center text-gray-500"
                >
                  No employees found
                </td>
              </tr>
            ) : (
              employees.map((emp) => (
                <tr
                  key={emp._id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="p-3">
                    {emp.fullName || "—"}
                  </td>
                  <td className="p-3">
                    {emp.email}
                  </td>
                  <td className="p-3 capitalize">
                    {emp.role}
                  </td>
                  <td className="p-3">
                    <span className="text-emerald-600 font-medium">
                      Active
                    </span>
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

