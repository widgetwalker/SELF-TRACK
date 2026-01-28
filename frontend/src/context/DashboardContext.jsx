import { createContext, useContext, useState } from "react";
import { fetchEmployeeDashboard } from "../api/dashboard.api";

const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  const [dashboard, setDashboard] = useState(null);

  const refreshDashboard = async () => {
    const data = await fetchEmployeeDashboard();
    setDashboard(data);
  };

  return (
    <DashboardContext.Provider value={{ dashboard, setDashboard, refreshDashboard }}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => useContext(DashboardContext);
