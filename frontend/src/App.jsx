import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./auth/AuthContext";

import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import AdminLayout from "./layouts/AdminLayout";
import EmployeeLayout from "./layouts/EmployeeLayout";
import ProtectedRoute from "./auth/ProtectedRoute";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import EmployeeTasks from "./pages/EmployeeTasks";
import AdminTasks from "./pages/AdminTasks";
import AdminEmployees from "./pages/AdminEmployees";
import EmployeeLeaves from "./pages/EmployeeLeaves";
import AdminLeaves from "./pages/AdminLeaves";
import NotificationsPage from "./pages/NotificationsPage";
import AdminAnalytics from "./pages/AdminAnalytics";
import EmployeeSkills from "./pages/EmployeeSkills";
import AdminSkills from "./pages/AdminSkills";
import AdminSalary from "./pages/AdminSalary";
import EmployeeSalary from "./pages/EmployeeSalary";


function App() {
  const { user, loading } = useAuth();

  // Prevent flicker while auth loads
  if (loading) return null;

  return (
    <BrowserRouter>
      <Routes>

        {/* DEFAULT ROUTE */}
        <Route
          path="/"
          element={
            user
              ? user.role === "admin"
                ? <Navigate to="/admin" />
                : <Navigate to="/employee" />
              : <Navigate to="/login" />
          }
        />

        {/* AUTH ROUTES */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ADMIN ROUTES */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="tasks" element={<AdminTasks />} />
          <Route path="employees" element={<AdminEmployees />} />
          <Route path="leaves" element={<AdminLeaves />} />
          <Route path="notifications" element={<NotificationsPage />} />
          <Route path="analytics" element={<AdminAnalytics />} />
          <Route path="skills" element={<AdminSkills />} />
          <Route path="salary" element={<AdminSalary />} />





        </Route>

        {/* EMPLOYEE ROUTES */}
        <Route
          path="/employee"
          element={
            <ProtectedRoute role="employee">
              <EmployeeLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<EmployeeDashboard />} />
          <Route path="tasks" element={<EmployeeTasks />} />
          <Route path="leaves" element={<EmployeeLeaves />} />
          <Route path="notifications" element={<NotificationsPage />} />
          <Route path="skills" element={<EmployeeSkills />} />
          <Route path="salary" element={<EmployeeSalary />} />



        </Route>

        {/* FALLBACK */}
        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
