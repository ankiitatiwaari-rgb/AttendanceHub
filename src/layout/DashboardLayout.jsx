import React, { useState, useEffect } from "react";
import {
  ShieldCheck,
  ChevronDown,
  LogOut,
  Clock,
  Calendar as CalendarIcon,
  User,
  Settings,
  ArrowUpRight,
} from "lucide-react";
import * as XLSX from "xlsx";

import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";

export default function AttendanceDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [time, setTime] = useState(new Date());
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [records, setRecords] = useState([]);
  const downloadExcel = () => {
    if (!records || records.length === 0) {
      alert("No attendance records to download");
      return;
    }

    // Convert records into Excel-friendly format
    const excelData = records.map((r) => ({
      Date: r.date,
      Day: r.day,
      "Check In": r.in,
      "Check Out": r.out,
      Status: r.status,
    }));

    // Create worksheet
    const worksheet = XLSX.utils.json_to_sheet(excelData);

    // Create workbook
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Attendance");

    // File name (user-specific)
    const fileName = `${user.name.replace(" ", "_")}_Attendance.xlsx`;

    // Download
    XLSX.writeFile(workbook, fileName);
  };

  // ⛔ SAFETY: Redirect if user logs out
  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  // Update real-time clock
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Your Original Logic (Unchanged)
  const handleAttendanceAction = () => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    const dateStr = now.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    const dayStr = now.toLocaleDateString("en-US", { weekday: "long" });

    if (!isClockedIn) {
      setRecords([
        {
          date: dateStr,
          day: dayStr,
          in: timeStr,
          out: "-",
          status: "Present",
        },
        ...records,
      ]);
      setIsClockedIn(true);
    } else {
      setRecords((prev) => {
        const updated = [...prev];
        updated[0].out = timeStr;
        return updated;
      });
      setIsClockedIn(false);
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#0b0f1a] text-slate-200 font-sans selection:bg-indigo-500/30">
      {/* PREMIUM HEADER */}
      <header className="sticky top-0 z-50 bg-[#0b0f1a]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <ShieldCheck className="text-white" size={28} />
            </div>
            <div className="hidden sm:block">
              <h1 className="font-bold text-white tracking-tight text-lg">
                AttendanceHub
              </h1>
              <p className="text-[10px] text-indigo-400 font-bold uppercase tracking-[0.2em]">
                Enterprise V2.0
              </p>
            </div>
          </div>

          {/* PROFILE DROPDOWN */}
          <div className="relative">
            <div
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-4 p-1.5 pr-4 rounded-2xl hover:bg-white/5 transition-all cursor-pointer border border-transparent hover:border-white/10"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-slate-800 to-slate-700 flex items-center justify-center border border-white/10 text-indigo-400 font-bold">
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div className="hidden md:block text-right">
                <p className="text-sm font-bold text-white leading-none">
                  {user.name}
                </p>
                <p className="text-[11px] text-slate-500 mt-1 uppercase tracking-wider">
                  {user.role}
                </p>
              </div>
              <ChevronDown
                size={14}
                className={`text-slate-500 transition-transform duration-300 ${isProfileOpen ? "rotate-180" : ""}`}
              />
            </div>

            {isProfileOpen && (
              <div className="absolute right-0 mt-3 w-56 bg-[#161b2c] border border-white/10 rounded-2xl shadow-2xl py-2 z-50 animate-in fade-in zoom-in duration-200">
                <div className="px-4 py-3 border-b border-white/5 mb-2">
                  <p className="text-[10px] text-slate-500 font-bold uppercase">
                    Employee ID
                  </p>
                  <p className="text-xs text-indigo-400 font-mono">
                    #{user.id || "EMP-2026-084"}
                  </p>
                </div>
                <button
                  onClick={() => navigate("/profile")}
                  className="w-full flex items-center gap-3 px-4 py-2
             text-sm text-slate-300 hover:bg-slate-800 hover:text-white"
                >
                  <User size={16} /> Profile Settings
                </button>

                <button
                  onClick={() => navigate("/preferences")}
                  className="w-full flex items-center gap-3 px-4 py-2
             text-sm text-slate-300 hover:bg-slate-800 hover:text-white"
                >
                  <Settings size={16} /> Preferences
                </button>

                <div className="h-px bg-white/5 my-2 mx-2" />
                <button
                  onClick={() => {
                    logout();
                    navigate("/login");
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-rose-400 hover:bg-rose-500/10 transition-colors"
                >
                  <LogOut size={16} /> Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6 md:p-10">
        {/* HERO SECTION */}
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold text-white tracking-tight italic">
            Hello, {user.name.split(" ")[0]}!
          </h1>
          <p className="text-slate-500 mt-2 text-lg">
            Welcome back! Here is your attendance overview.
          </p>
        </div>

        {/* TOP CARDS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-12">
          {/* ACTION CARD */}
          <div className="bg-gradient-to-br from-indigo-600 to-purple-700 p-8 rounded-[32px] shadow-2xl shadow-indigo-500/20 flex flex-col justify-between min-h-[240px]">
            <div>
              <h2 className="text-4xl font-mono font-bold text-white tracking-tighter">
                {time.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })}
              </h2>
              <p className="text-indigo-100/70 mt-2 font-medium">
                {time.toLocaleDateString(undefined, {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
              <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full border border-white/10">
                <div
                  className={`w-2 h-2 rounded-full ${isClockedIn ? "bg-emerald-400 animate-pulse" : "bg-slate-400"}`}
                />
                <span className="text-[10px] font-bold uppercase tracking-widest text-white">
                  {isClockedIn ? "Currently Working" : "Shift Inactive"}
                </span>
              </div>
            </div>

            <button
              onClick={handleAttendanceAction}
              className={`w-full py-4 rounded-2xl font-bold text-sm transition-all active:scale-95 shadow-lg ${
                isClockedIn
                  ? "bg-white text-indigo-600 hover:bg-slate-100"
                  : "bg-indigo-400 text-white hover:bg-indigo-300"
              }`}
            >
              {isClockedIn ? "Check Out" : "Check In"}
            </button>
          </div>

          {/* STATS CARDS */}
          <StatCard title="Days Present" value="22" subtitle="Total for Feb" />
          <StatCard title="Hours Worked" value="176" subtitle="This month" />
          <StatCard
            title="On-Time Rate"
            value="95%"
            subtitle="Current Status"
          />
        </div>

        {/* TABLE SECTION */}
        <div className="bg-[#161b2c] border border-white/5 rounded-[32px] overflow-hidden shadow-sm">
          <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
            <h3 className="text-xl font-bold text-white">
              Log History: {user.name}
            </h3>
            <button
              onClick={downloadExcel}
              className="px-4 py-2 text-xs font-bold bg-white/5 border border-white/10
             rounded-xl hover:bg-white/10 transition-all"
            >
              Download Report
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.2em] border-b border-white/5">
                  <th className="px-8 py-6">Date & Day</th>
                  <th className="px-8 py-6">Check In</th>
                  <th className="px-6 py-6 text-center">Check Out</th>
                  <th className="px-8 py-6 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {records.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="px-8 py-24 text-center">
                      <p className="text-slate-500 italic">
                        No history available for {user.name} yet.
                      </p>
                    </td>
                  </tr>
                ) : (
                  records.map((row, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-white/[0.02] transition-colors group"
                    >
                      <td className="px-8 py-6">
                        <p className="font-bold text-white group-hover:text-indigo-400 transition-colors">
                          {row.date}
                        </p>
                        <p className="text-xs text-slate-500">{row.day}</p>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-2 text-emerald-400 font-mono">
                          <ArrowUpRight size={14} className="rotate-45" />
                          {row.in}
                        </div>
                      </td>
                      <td className="px-6 py-6 text-center">
                        <span
                          className={`font-mono ${row.out === "-" ? "text-slate-600" : "text-rose-400"}`}
                        >
                          {row.out}
                        </span>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <span className="px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tighter bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

// Helper Stat Card Component
function StatCard({ title, value, subtitle }) {
  return (
    <div className="bg-[#161b2c] p-8 rounded-[32px] border border-white/5 hover:border-indigo-500/30 transition-all group shadow-sm">
      <p className="text-slate-500 text-[11px] font-bold uppercase tracking-[0.2em] group-hover:text-slate-400 transition-colors">
        {title}
      </p>
      <div className="mt-4 flex items-end gap-2">
        <h3 className="text-5xl font-extrabold text-white tracking-tighter">
          {value}
        </h3>
      </div>
      <p className="text-slate-600 text-xs mt-4 italic">{subtitle}</p>
    </div>
  );
}
