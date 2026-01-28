import { useAuth } from "../auth/AuthContext";

export default function TopHeader() {
  const { user } = useAuth();

  return (
    <header className="h-16 flex items-center justify-between px-6 bg-white/70 backdrop-blur border-b">
      <h1 className="text-lg font-semibold text-slate-800">
        Welcome, {user?.fullName || user?.email}
      </h1>

      <span className="text-sm text-slate-600 capitalize">
        Role: {user?.role}
      </span>
    </header>
  );
}
