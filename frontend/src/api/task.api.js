import api from "./axios";

/* ============================
   EMPLOYEE APIS
============================ */

// fetch logged-in employee tasks
export const fetchMyTasks = async () => {
  const res = await api.get("/tasks/my");
  return res.data.tasks;
};

// mark task complete
export const completeTask = async (taskId) => {
  const res = await api.patch(`/tasks/${taskId}/complete`);
  return res.data;
};


/* ============================
   ADMIN APIS
============================ */

// fetch ALL tasks (admin)
export const fetchAllTasks = async () => {
  const res = await api.get("/tasks");
  return res.data.tasks;
};

// create new task (admin)
export const createTask = async (payload) => {
  const res = await api.post("/tasks", payload);
  return res.data;
};


