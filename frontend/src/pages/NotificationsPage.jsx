import { useEffect, useState } from "react";
import { fetchNotifications, markNotificationRead } from "../api/notification.api";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      const data = await fetchNotifications();
      setNotifications(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to load notifications", err);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkRead = async (id) => {
    try {
      await markNotificationRead(id);
      setNotifications((prev) =>
        prev.map((n) =>
          n._id === id ? { ...n, isRead: true } : n
        )
      );
    } catch (err) {
      console.error("Failed to mark read");
    }
  };

  if (loading) {
    return <p className="p-6 text-slate-500">Loading notifications...</p>;
  }

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-semibold text-slate-800">
         Notifications
      </h2>

      {notifications.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-6 text-slate-500">
          No notifications yet 🌿
        </div>
      ) : (
        <div className="space-y-4">
          {notifications.map((n) => (
            <div
              key={n._id}
              className={`bg-white rounded-xl shadow p-5 flex justify-between items-start ${
                n.isRead ? "opacity-70" : ""
              }`}
            >
              <div>
                <h3 className="font-semibold text-slate-800">
                  {n.title}
                </h3>
                <p className="text-slate-600 text-sm mt-1">
                  {n.message}
                </p>
                <p className="text-xs text-slate-400 mt-2">
                  {new Date(n.createdAt).toLocaleString()}
                </p>
              </div>

              {!n.isRead && (
                <button
                  onClick={() => handleMarkRead(n._id)}
                  className="text-sm text-emerald-600 hover:underline"
                >
                  Mark read
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

