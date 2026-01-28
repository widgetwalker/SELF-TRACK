import { useEffect, useState } from "react";
import { fetchAllTasks, createTask } from "../api/task.api";
import api from "../api/axios";

export default function AdminTasks() {
  const [tasks, setTasks] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    assignedTo: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadTasks();
    loadEmployees();
  }, []);

  const loadTasks = async () => {
    const data = await fetchAllTasks();

    if (Array.isArray(data)) {
      setTasks(data);
    } else {
      setTasks([]);
    }
  };


  const loadEmployees = async () => {
    const res = await api.get("/users/employees");

    const data = res.data;

    if (Array.isArray(data)) {
      setEmployees(data);
    } else if (Array.isArray(data?.employees)) {
      setEmployees(data.employees);
    } else if (Array.isArray(data?.users)) {
      setEmployees(data.users);
    } else {
      setEmployees([]);
    }
  };


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await createTask(form);
      setTasks((prev) => [res.task, ...prev]);
      setForm({ title: "", description: "", assignedTo: "" });
    } catch (err) {
      alert("Failed to create task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">

      {/* CREATE TASK */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-bold mb-4">
           Create New Task
        </h2>

        <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-3">

          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Task title"
            required
            className="border rounded-lg px-3 py-2"
          />

          <input
            type="text"
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            className="border rounded-lg px-3 py-2"
          />

          <select
            name="assignedTo"
            value={form.assignedTo}
            onChange={handleChange}
            required
            className="border rounded-lg px-3 py-2"
          >
            <option value="">Assign to employee</option>
            {employees.map((emp) => (
              <option key={emp._id} value={emp._id}>
                {emp.fullName || emp.email}
              </option>
            ))}
          </select>

          <button
            type="submit"
            disabled={loading}
            className="md:col-span-3 bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg transition"
          >
            {loading ? "Creating..." : "Create Task"}
          </button>
        </form>
      </div>

      {/* TASK LIST */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-4">Title</th>
              <th className="p-4">Assigned To</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task._id} className="border-t">
                <td className="p-4">{task.title}</td>
                <td className="p-4">
                  {task.assignedTo?.fullName || task.assignedTo?.email || "—"}
                </td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      task.status === "completed"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {task.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}

