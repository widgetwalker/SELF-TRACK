import { NavLink } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Sidebar() {
  const { user, logout } = useAuth();
  const role = user?.role;

  const baseLink =
    "block px-4 py-2 rounded-lg transition text-slate-200 hover:bg-emerald-600 hover:text-white";

  const activeLink =
    "bg-emerald-600 text-white font-semibold";

  return (
    <aside className="w-64 bg-slate-900 text-white flex flex-col min-h-screen">

      {/* Logo */}
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-xl font-bold flex items-center gap-2">
          🌿 Self Tracking
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Calm. Focus. Growth.
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">

        {/* DASHBOARD */}
        <NavLink
          to={role === "admin" ? "/admin" : "/employee"}
          end
          className={({ isActive }) =>
            `${baseLink} ${isActive ? activeLink : ""}`
          }
        >
           Dashboard
        </NavLink>

        {/* ================= EMPLOYEE ================= */}
        {role === "employee" && (
          <>
            <NavLink
              to="/employee/tasks"
              className={({ isActive }) =>
                `${baseLink} ${isActive ? activeLink : ""}`
              }
            >
               My Tasks
            </NavLink>

            <NavLink
              to="/employee/skills"
              className={({ isActive }) =>
                `${baseLink} ${isActive ? activeLink : ""}`
              }
            >
               My Skills
            </NavLink>

            <NavLink
              to="/employee/salary"
              className={({ isActive }) =>
                `${baseLink} ${isActive ? activeLink : ""}`
              }
            >
               Salary
            </NavLink>

            <NavLink
              to="/employee/leaves"
              className={({ isActive }) =>
                `${baseLink} ${isActive ? activeLink : ""}`
              }
            >
               Leaves
            </NavLink>

            <NavLink
              to="/employee/notifications"
              className={({ isActive }) =>
                `${baseLink} ${isActive ? activeLink : ""}`
              }
            >
               Notifications
            </NavLink>
          </>
        )}

        {/* ================= ADMIN ================= */}
        {role === "admin" && (
          <>
            <NavLink
              to="/admin/employees"
              className={({ isActive }) =>
                `${baseLink} ${isActive ? activeLink : ""}`
              }
            >
               Employees
            </NavLink>

            <NavLink
              to="/admin/tasks"
              className={({ isActive }) =>
                `${baseLink} ${isActive ? activeLink : ""}`
              }
            >
               Tasks
            </NavLink>

            <NavLink
              to="/admin/skills"
              className={({ isActive }) =>
                `${baseLink} ${isActive ? activeLink : ""}`
              }
            >
               Skills
            </NavLink>

            <NavLink
              to="/admin/salary"
              className={({ isActive }) =>
                `${baseLink} ${isActive ? activeLink : ""}`
              }
            >
               Salary
            </NavLink>

            <NavLink
              to="/admin/leaves"
              className={({ isActive }) =>
                `${baseLink} ${isActive ? activeLink : ""}`
              }
            >
               Leave Requests
            </NavLink>

            <NavLink
              to="/admin/analytics"
              className={({ isActive }) =>
                `${baseLink} ${isActive ? activeLink : ""}`
              }
            >
               Analytics
            </NavLink>

            <NavLink
              to="/admin/notifications"
              className={({ isActive }) =>
                `${baseLink} ${isActive ? activeLink : ""}`
              }
            >
               Alerts
            </NavLink>
          </>
        )}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-slate-700">
        <button
          onClick={logout}
          className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition"
        >
           Logout
        </button>
      </div>
    </aside>
  );
}


