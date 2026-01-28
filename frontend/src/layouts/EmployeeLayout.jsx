import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import NotificationBell from "../components/NotificationBell";


export default function EmployeeLayout() {
  return (
    <div className="flex min-h-screen bg-slate-100">
      <div className="flex justify-end mb-4"> <NotificationBell /> </div>

      {/* Sidebar */}
      <Sidebar role="employee" />

      {/* Main Content Area */}
      <main className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </main>

    </div>
  );
}



