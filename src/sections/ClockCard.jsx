import { useEffect, useState } from "react";

export default function ClockCard() {
  const [time, setTime] = useState(new Date());
  const [checkedIn, setCheckedIn] = useState(true);
  const [checkInTime] = useState("08:11 PM");

  useEffect(() => {
    const i = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(i);
  }, []);

  return (
    <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-6 rounded-[var(--radius)] shadow-xl">
      <h1 className="text-4xl font-bold">
        {time.toLocaleTimeString()}
      </h1>

      <p className="text-white/80 mt-1">
        {time.toLocaleDateString()}
      </p>

      <span
        className={`inline-block mt-4 px-4 py-1 rounded-full text-sm
          ${checkedIn ? "bg-green-500/20 text-green-300" : "bg-red-500/20 text-red-300"}
        `}
      >
        {checkedIn ? "Currently Working" : "Checked Out"}
      </span>

      <p className="mt-4 text-sm">
        Check In: <strong>{checkInTime}</strong>
      </p>

      <button
        onClick={() => setCheckedIn(!checkedIn)}
        className="mt-6 w-full bg-white text-indigo-600 font-semibold py-2 rounded-xl"
      >
        {checkedIn ? "Check Out" : "Check In"}
      </button>
    </div>
  );
}
