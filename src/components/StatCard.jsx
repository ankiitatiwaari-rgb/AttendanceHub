import React from 'react';
import { Calendar } from 'lucide-react';

export default function StatCard({ title, value, subtitle }) {
  return (
    <div className="bg-[#161b2c] border border-slate-800 p-6 rounded-[24px] hover:border-indigo-500/50 transition-all group">
      <div className="flex justify-between items-start mb-4">
        <p className="text-slate-500 text-[11px] font-bold uppercase tracking-widest">{title}</p>
        <Calendar size={16} className="text-slate-600 group-hover:text-indigo-400" />
      </div>
      <h3 className="text-4xl font-bold text-white">{value}</h3>
      <p className="text-slate-500 text-xs mt-4 italic">{subtitle}</p>
    </div>
  );
}