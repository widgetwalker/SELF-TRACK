import api from "./axios";

// Employee productivity history
export const fetchProductivityHistory = async () => {
  const res = await api.get("/ml/productivity/history");
  return res.data.data || [];
};

/* ADMIN */
export const fetchAdminProductivity = async () => {
  const res = await api.get("/ml/admin/productivity");
  return res.data.data || [];   
};

export const fetchAdminBurnout = async () => {
  const res = await api.get("/ml/admin/burnout");
  return res.data;              
};

export const fetchAdminAnomalies = async () => {
  const res = await api.get("/ml/admin/anomaly");
  return res.data.anomalies || []; 
};
