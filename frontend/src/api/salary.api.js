import api from "./axios";

/* ADMIN */
export const fetchAllSalaries = async () => {
  const res = await api.get("/salaries/admin");
  return res.data;
};

export const createSalary = async (data) => {
  const res = await api.post("/salaries", data);
  return res.data.salary;
};

export const fetchSalaryStats = async () => {
  const res = await api.get("/salaries/admin/stats");
  return res.data;
};

/* EMPLOYEE */
export const fetchMySalary = async () => {
  const res = await api.get("/salaries/me");
  return res.data;
};



