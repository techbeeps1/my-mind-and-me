"use client";

import React, { useState } from "react";
import { FaRegClock } from "react-icons/fa";

type DaySchedule = {
  enabled: boolean;
  start: string;
  end: string;
};

type BookingSettings = {
  days: Record<string, DaySchedule>;
  slotDuration: number;
  holidays: string[];
};

const daysList = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const defaultDay: DaySchedule = {
  enabled: true,
  start: "09:00",
  end: "18:00",
};

export default function BookingSettingsPage() {
  const [settings, setSettings] = useState<BookingSettings>({
    days: Object.fromEntries(daysList.map((d) => [d, { ...defaultDay }])),
    slotDuration: 60,
    holidays: [],
  });

  const [holidayInput, setHolidayInput] = useState("");

  // Toggle day
  const toggleDay = (day: string) => {
    setSettings((prev) => ({
      ...prev,
      days: {
        ...prev.days,
        [day]: {
          ...prev.days[day],
          enabled: !prev.days[day].enabled,
        },
      },
    }));
  };

  // Update time
  const updateTime = (day: string, field: "start" | "end", value: string) => {
    setSettings((prev) => ({
      ...prev,
      days: {
        ...prev.days,
        [day]: {
          ...prev.days[day],
          [field]: value,
        },
      },
    }));
  };

  // Holidays
  const addHoliday = () => {
    if (!holidayInput) return;

    setSettings((prev) => ({
      ...prev,
      holidays: [...prev.holidays, holidayInput],
    }));

    setHolidayInput("");
  };

  const removeHoliday = (date: string) => {
    setSettings((prev) => ({
      ...prev,
      holidays: prev.holidays.filter((d) => d !== date),
    }));
  };

  // Generate slots
  const generateSlots = (start: string, end: string, duration: number) => {
    const slots: { start: string; end: string }[] = [];

    let current = new Date(`2020-01-01T${start}`);
    const endTime = new Date(`2020-01-01T${end}`);

    while (current < endTime) {
      const next = new Date(current.getTime() + duration * 60000);

      slots.push({
        start: current.toTimeString().slice(0, 5),
        end: next.toTimeString().slice(0, 5),
      });

      current = next;
    }

    return slots;
  };

  const previewSlots = () => {
    const activeDay = daysList.find((d) => settings.days[d].enabled);
    if (!activeDay) return [];
    const day = settings.days[activeDay];
    return generateSlots(day.start, day.end, settings.slotDuration);
  };

  const handleSubmit = () => {
    console.log("FINAL JSON 👉", settings);

    alert(JSON.stringify(settings, null, 2));
  };

  return (
    <div className="flex-1 flex justify-start md:p-7.5 px-5 py-7.5">
      <div className="max-w-337.5 w-full bg-white rounded-[10px] shadow-xl h-fit ">
        <h2 className="text-center rounded-t-[10px] bg-[linear-gradient(90deg,#56e1e845_70%,var(--color-background)_100%)]  w-full text-primary md:text-[25px] text-[20px] leading-6 py-5 font-semibold md:mb-11.25 mb-7.5">
          Booking Settings
          <p className="text-gray-500 text-[12px] p-0 m-0  ">
            Configure your availability and appointment slots
          </p>
        </h2>
        {/* Submit */}
        <div className="flex justify-center">
        <button
          onClick={handleSubmit}
          className=" px-4 cursor-pointer py-2 rounded-full bg-gradient-to-r from-teal-400 to-teal-700 text-white font-semibold shadow-lg hover:scale-105 transition"
        >
          Save 
        </button>
        </div>
        {/* Header */}
        <div></div>

        {/* Days Card */}
        <div className="p-6 space-y-4 max-w-175 mx-auto w-full ">
          <h3 className="text-lg font-bold text-primary">Availability</h3>

          {daysList.map((day) => {
            const d = settings.days[day];

            return (
              <div
                key={day}
                className="flex items-center bg-primary/8 justify-between rounded-xl p-3"
              >
                <div className="flex items-center gap-4">
                  {/* Toggle */}
                  <button
                    onClick={() => toggleDay(day)}
                    className={`w-10 h-5 flex items-center rounded-full p-1 transition ${
                      d.enabled ? "bg-primary" : "bg-gray-300"
                    }`}
                  >
                    <div
                      className={`bg-white w-4 h-4 rounded-full shadow transform transition ${
                        d.enabled ? "translate-x-5" : ""
                      }`}
                    />
                  </button>

                  <span className="font-medium w-24">{day}</span>
                </div>

                {d.enabled && (
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <input
                        type="time"
                        value={d.start}
                        onChange={(e) =>
                          updateTime(day, "start", e.target.value)
                        }
                        className="border [&::-webkit-calendar-picker-indicator]:opacity-0 border-primary text-sm text-primary rounded-lg px-2 py-1"
                      />
                      <FaRegClock className="w-3.5 h-3.5 text-primary absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>

                    <span className="text-primary text-sm">—</span>
                    <div className="relative">
                      <input
                        type="time"
                        value={d.end}
                        onChange={(e) => updateTime(day, "end", e.target.value)}
                        className="border border-primary [&::-webkit-calendar-picker-indicator]:opacity-0 text-sm text-primary rounded-lg px-2 py-1"
                      />
                      <FaRegClock className="w-3.5 h-3.5 text-primary absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div className="max-w-175 mx-auto w-full">
          {/* Slot Duration */}
          <div className="bg-white  p-6 w-full">
            <h2 className="text-lg font-semibold mb-3">Slot Duration</h2>
            <select
              value={settings.slotDuration}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  slotDuration: Number(e.target.value),
                })
              }
              className="w-full  text-primary text-sm px-4 py-2.5 rounded-md  leading-5 bg-primary/8 outline-none"
            >
              {[15, 30, 45, 50, 60, 90, 120, 150, 180].map((min) => (
                <option key={min} value={min}>
                  {min} minutes
                </option>
              ))}
            </select>
          </div>

          {/* Holidays */}
          <div className="bg-white p-6 w-full">
            <h2 className="text-lg font-semibold mb-3">Holidays</h2>

            <div className="flex gap-2">
              <input
                type="date"
                value={holidayInput}
                onChange={(e) => setHolidayInput(e.target.value)}
                className=" bg-primary/8 w-full rounded-md px-4 py-2.5  outline-none text-sm text-primary leading-5 placeholder:text-primary"
              />

              <button
                onClick={addHoliday}
                className="lg:py-3 py-1.25 flex items-center lg:gap-2.5 gap-[5px] lg:px-6.5 px-3.75 duration-500 cursor-pointer rounded-md bg-[linear-gradient(90deg,var(--color-AquaBlue)_0%,var(--color-primary)_100%)] text-white font-bold lg:text-lg md:tex-base text-sm lg:leading-6 leding-3 hover:opacity-90 transition"
              >
                Add
              </button>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              {settings.holidays.map((d) => (
                <div
                  key={d}
                  className="bg-primary/8 px-3 text-primary py-1 rounded-full flex items-center gap-2"
                >
                  {d}
                  <button
                    onClick={() => removeHoliday(d)}
                    className="text-red-500"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
