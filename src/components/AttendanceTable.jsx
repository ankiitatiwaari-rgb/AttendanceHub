import React from 'react';

export default function AttendanceTable({ logs }) {
  return (
    <div className="bg-[#161b2c] border border-slate-800 rounded-[24px] overflow-hidden">
      <div className="p-6 border-b border-slate-800">
        <h3 className="text-lg font-bold text-white">Attendance History</h3>
      </div>
      <table className="w-full text-left">
        <thead>
          <tr className="text-[11px] text-slate-500 uppercase tracking-widest border-b border-slate-800">
            <th className="px-6 py-4">Date & Day</th>
            <th className="px-6 py-4">Check In</th>
            <th className="px-6 py-4">Check Out</th>
            <th className="px-6 py-4">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800/50">
          {logs.map((log, index) => (
            <tr key={index} className="hover:bg-slate-800/20 transition-colors">
              <td className="px-6 py-4">
                <div className="text-sm font-bold text-white">{log.date}</div>
                <div className="text-[10px] text-slate-500">{log.day}</div>
              </td>
              <td className="px-6 py-4 text-emerald-400 font-mono text-sm">{log.in}</td>
              <td className="px-6 py-4 text-rose-400 font-mono text-sm">{log.out}</td>
              <td className="px-6 py-4">
                <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                  {log.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}