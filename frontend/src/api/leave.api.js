import api from "./axios";

// EMPLOYEE


// Apply leave (expects startDate, endDate, reason)
export const applyLeave = async (data) => {
  const res = await api.post("/leaves", data);
  return res.data;
};

// Fetch logged-in employee leaves
export const fetchMyLeaves = async () => {
  const res = await api.get("/leaves/my");
  return res.data.leaves ?? [];
};

// ADMIN

// Fetch all leave requests
export const fetchAllLeaves = async () => {
  const res = await api.get("/leaves");
  return res.data.leaves ?? [];
};

// Approve / reject leave
export const updateLeaveStatus = async (id, status) => {
  const res = await api.patch(`/leaves/${id}`, { status });
  return res.data;
};
