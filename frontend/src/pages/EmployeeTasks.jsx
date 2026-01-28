import { useEffect, useState } from "react";
import { fetchMyTasks, completeTask } from "../api/task.api";
import { useDashboard } from "../context/DashboardContext";

export default function EmployeeTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { refreshDashboard } = useDashboard();

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const data = await fetchMyTasks();
      setTasks(data || []);
    } catch (err) {
      console.error("Failed to load tasks", err);
    } finally {
      setLoading(false);
    }
  };

  const handleComplete = async (taskId) => {
    try {
      await completeTask(taskId);
      await loadTasks();          // refresh tasks
      await refreshDashboard();   //  auto-update productivity
    } catch (err) {
      alert("Failed to complete task");
    }
  };

  if (loading) return <p>Loading tasks...</p>;

  return (
    <div className="space-y-6">

      <h2 className="text-2xl font-semibold text-slate-800">
        My Tasks
      </h2>

      {tasks.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-6 text-slate-500">
           No tasks assigned yet. Enjoy the calm.
        </div>
      ) : (
        <div className="space-y-4">
          {tasks.map((task) => (
            <div
              key={task._id}
              className="bg-white rounded-xl shadow p-5 flex justify-between items-center"
            >
              <div>
                <h3 className="font-semibold text-slate-800">
                  {task.title}
                </h3>
                <p className="text-sm text-slate-500">
                  {task.description}
                </p>
              </div>

              {task.status === "completed" ? (
                <span className="text-emerald-600 font-medium">
                   Completed
                </span>
              ) : (
                <button
                  onClick={() => handleComplete(task._id)}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition"
                >
                  Mark Complete
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


