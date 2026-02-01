import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Header() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();           // ✅ clear auth
    navigate("/login"); // ✅ redirect
  };

  return (
    <header className="flex justify-between items-center px-6 py-4">
      <div>
        <h1 className="text-xl font-semibold">AttendanceHub</h1>
        <p className="text-sm text-[var(--muted)]">
          Employee Attendance Portal
        </p>
      </div>

      <button
        onClick={handleLogout}
        className="px-4 py-2 rounded-xl text-sm font-medium
                   bg-red-500/10 text-red-400
                   hover:bg-red-500/20 transition"
      >
        Sign Out
      </button>
    </header>
  );
}
