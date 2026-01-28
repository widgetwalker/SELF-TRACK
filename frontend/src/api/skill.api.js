import api from "./axios";

/* EMPLOYEE */
export const fetchMySkills = async () => {
  const res = await api.get("/skills/me");
  return res.data.skills;
};

export const saveMySkills = async (data) => {
  const res = await api.post("/skills", data);
  return res.data;
};

/* ADMIN */
export const fetchSkillOverview = async () => {
  const res = await api.get("/skills/admin");
  return res.data; //  backend returns array directly
};
