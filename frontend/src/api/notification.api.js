import api from "./axios";

//  FIXED: correct endpoint
export const fetchNotifications = async () => {
  const res = await api.get("/notifications/my");
  return res.data.notifications;
};

export const markNotificationRead = async (id) => {
  await api.patch(`/notifications/${id}/read`);
};

export const fetchUnreadCount = async () => {
  const res = await api.get("/notifications/my");
  const notifications = res.data.notifications || [];
  return notifications.filter(n => !n.isRead).length;
};

