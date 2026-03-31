"use client";
import { useState } from "react";

const bookedDates = [
  { date: "2026-01-09", title: "Session with John" },
  { date: "2026-01-18", title: "Session with John" },
  { date: "2026-01-23", title: "Session with John" },
];

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 0));

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1));
  };

  const days = [];

  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }

  for (let d = 1; d <= daysInMonth; d++) {
    days.push(d);
  }

  const monthName = currentDate.toLocaleString("default", { month: "long" });

  return (
    <div className="max-w-6xl mx-auto border rounded-lg overflow-hidden">

      {/* Header */}
      <div className="bg-teal-700 text-white flex justify-between items-center px-6 py-4">
        <button onClick={prevMonth}>❮</button>
        <h2 className="text-xl font-semibold">
          {monthName} {year}
        </h2>
        <button onClick={nextMonth}>❯</button>
      </div>

      {/* Days Name */}
      <div className="grid grid-cols-7 bg-teal-600 text-white text-center text-sm">
        {["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"].map(day => (
          <div key={day} className="py-2">{day}</div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7">
        {days.map((day, i) => {

          const dateStr = day
            ? `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
            : "";

          const booking = bookedDates.find(b => b.date === dateStr);

          return (
            <div
              key={i}
              className="h-28 border p-2 text-sm relative"
            >
              {day && (
                <>
                  <span className="text-gray-500 text-xs">{day}</span>

                  {booking && (
                    <div className="mt-4 bg-teal-200 text-gray-700 p-2 rounded text-xs">
                      {booking.title}
                    </div>
                  )}
                </>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
}