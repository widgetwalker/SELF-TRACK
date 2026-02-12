import api from "./axios";

export const fetchEmployeeDashboard = async () => {
  const res = await api.get("/dashboard"); 
  return res.data;
};
export const fetchDashboard = async () => {
  const res = await api.get("/dashboard");
  return res.data;
};
export const fetchProductivityHistory = async () => {
  const res = await api.get("/ml/productivity/history");
  return res.data.history || [];
};
