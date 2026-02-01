import React from "react";
// FIX: Go UP one level (..) then INTO components
import StatCard from "../components/StatCard";

export default function StatsSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      <StatCard title="Days Present" value="22" subtitle="Total for Feb" />
      <StatCard title="Hours Worked" value="176" subtitle="This month" />
      <StatCard title="On-Time Rate" value="95%" subtitle="Current Status" />
    </div>
  );
}