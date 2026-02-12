import { useEffect, useState } from "react";
import {
  fetchNotifications,
  markNotificationRead
} from "../api/notification.api";

export default function NotificationBell() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);

  //  FIX: use isRead (not read)
  const unreadCount = notifications.filter(n => !n.isRead).length;

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      const data = await fetchNotifications();
      setNotifications(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to load notifications", err);
    }
  };

  const handleOpen = async () => {
    setOpen(prev => !prev);

    //  Mark unread notifications as read
    const unread = notifications.filter(n => !n.isRead);

    for (const n of unread) {
      await markNotificationRead(n._id);
    }

    //  Update local state
    setNotifications(prev =>
      prev.map(n => ({ ...n, isRead: true }))
    );
  };

  return (
    <div className="relative">
      {/*  Bell */}
      <button
        onClick={handleOpen}
        className="relative p-2 rounded-full hover:bg-slate-100"
      >
        
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        )}
      </button>

      {/*  Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-white shadow-xl rounded-lg z-50">
          <div className="p-3 border-b font-semibold">
            Notifications
          </div>

          {notifications.length === 0 ? (
            <p className="p-4 text-sm text-slate-500">
              No notifications
            </p>
          ) : (
            <ul className="max-h-80 overflow-y-auto">
              {notifications.map(n => (
                <li
                  key={n._id}
                  className={`p-3 border-b text-sm ${
                    n.isRead ? "bg-white" : "bg-slate-50"
                  }`}
                >
                  <p className="font-medium">{n.title}</p>
                  <p className="text-slate-600">{n.message}</p>
                  <p className="text-xs text-slate-400 mt-1">
                    {new Date(n.createdAt).toLocaleString()}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

