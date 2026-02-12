import api from "./axios";

export const fetchEmployees = async () => {
  const res = await api.get("/users/employees");
  return res.data; // NOT res.data.employees
};

