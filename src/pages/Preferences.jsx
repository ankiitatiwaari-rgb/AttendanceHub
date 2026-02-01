import { useState } from "react";

export default function Preferences() {
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="max-w-4xl mx-auto p-8 text-white">
      <h1 className="text-2xl font-bold mb-2">Preferences</h1>
      <p className="text-slate-400 mb-8">
        Customize your experience
      </p>

      <div className="bg-[#161b2c] border border-white/5 rounded-2xl p-6 space-y-6">
        {/* Dark Mode */}
        <div className="flex justify-between items-center">
          <div>
            <p className="font-medium">Dark Mode</p>
            <p className="text-xs text-slate-500">
              Use dark theme across the app
            </p>
          </div>
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
            className="accent-indigo-500 w-5 h-5"
          />
        </div>

        {/* Notifications */}
        <div className="flex justify-between items-center">
          <div>
            <p className="font-medium">Notifications</p>
            <p className="text-xs text-slate-500">
              Attendance & system alerts
            </p>
          </div>
          <input
            type="checkbox"
            checked={notifications}
            onChange={() => setNotifications(!notifications)}
            className="accent-indigo-500 w-5 h-5"
          />
        </div>

        <p className="text-xs text-slate-500 italic">
          Preferences are saved locally (frontend demo).
        </p>
      </div>
    </div>
  );
}
