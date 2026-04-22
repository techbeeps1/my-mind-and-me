"use client";

import { toastTBS } from "@/lib/toast";
import { getSlotManageSettings, slotManageAPI } from "@/services/api";
import { useEffect, useState } from "react";

import { FaRegClock } from "react-icons/fa";
import LoadingSpin from "../LoadingSpin";
import { IoMdArrowRoundBack } from "react-icons/io";

type DaySchedule = {
  fee: string;
  enabled: boolean;
  start: string;
  end: string;
  haveBusyHours?: boolean;
  busyStart?: string;
  busyEnd?: string;
};
type BookingSettings = {
  user_id: string;
  days: Record<string, DaySchedule>;
  slotduration: number;
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
  fee: "50",
  start: "09:00",
  end: "18:00",
  haveBusyHours: true,
  busyStart: "13:00",
  busyEnd: "14:00",
};

export default function BookingSettingsPage({
  setSlotChange,
  setManageSlots,
}: {
  setSlotChange: React.Dispatch<React.SetStateAction<number>>;
  setManageSlots: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [MMMUserData] = useState(() => {
    if (typeof window === "undefined") return null;
    const data = localStorage.getItem("MMMDT");
    return data ? JSON.parse(data) : null;
  });
  const [landingData, setLandingData] = useState(false);
  const [settings, setSettings] = useState<BookingSettings>({
    user_id: MMMUserData?.id || "",
    days: Object.fromEntries(daysList.map((d) => [d, { ...defaultDay }])),
    slotduration: 60,
    holidays: [],
  });

  const [holidayInput, setHolidayInput] = useState("");
  const [landing, setLanding] = useState(true);

  useEffect(() => {
    getSlotManageSettings(MMMUserData?.id)
      .then((data) => {
        setLanding(false);
        console.log("Fetched Slot Manage Settings:", data);
        if (data.success) {
          setSettings(data);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, [MMMUserData?.id]);

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
  const updateTime = (
    day: string,
    field: "start" | "end" | "busyEnd" | "busyStart",
    value: string,
  ) => {
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
  function checkboxhandle(day: string, checked: boolean) {
    setSettings((prev) => ({
      ...prev,
      days: {
        ...prev.days,
        [day]: {
          ...prev.days[day],
          haveBusyHours: checked,
        },
      },
    }));
  }

  // validation can be added here before submission

  function validateSettings(settings: BookingSettings) {
    // 1. Slot Duration validation
    if (settings.slotduration < 15) {
      toastTBS.error("Slot duration must be at least 15 minutes");
      return false;
    }
    // 2. Days validation
    for (const [day, d] of Object.entries(settings.days)) {
      if (d.enabled) {
        // Fee validation
        const fee = Number(d.fee);
        if (!fee || fee <= 0) {
          toastTBS.error(`${day}: Fee must be greater than 0`);
          return false;
        }

        // Time validation
        if (!d.start || !d.end) {
          toastTBS.error(`${day}: Start and End time required`);
          return false;
        }

        const start = new Date(`1970-01-01T${d.start}`);
        const end = new Date(`1970-01-01T${d.end}`);

        if (start >= end) {
          toastTBS.error(`${day}: Start time must be before End time`);
          return false;
        }

        // Busy hours validation
        if (d.haveBusyHours) {
          if (!d.busyStart || !d.busyEnd) {
            toastTBS.error(`${day}: Busy hours start and end time required`);
            return false;
          }
          const busyStart = new Date(`1970-01-01T${d.busyStart}`);
          const busyEnd = new Date(`1970-01-01T${d.busyEnd}`);

          if (busyStart >= busyEnd) {
            toastTBS.error(`${day}: Busy hours start time must be before end time`);
            return false;
          }
      }
    }
  }

    return true;
  }

  const handleSubmit = () => {
    if (!validateSettings(settings)) return;

    if (landingData) return;
    setLandingData(true);

    setSlotChange((prev) => prev + 1); // Trigger slot change to refresh slots in calendar

    slotManageAPI({ ...settings, user_id: MMMUserData?.id || "" })
      .then((res) => {
        if (res.success) {
          console.log("API Response:", res);
          toastTBS.success("Booking settings saved successfully");
          setLandingData(false);
        } else {
          toastTBS.error("Failed to save booking settings");
          setLandingData(false);
        }
      })
      .catch((err) => {
        toastTBS.error("Failed to save booking settings: " + err.message);
        console.error("API Error:", err);
        setLandingData(false);
      });
  };
  if (landing) {
    return (
      <div
        className=" bg-cover bg-center bg-no-repeat min-h-screen "
        style={{ backgroundImage: "url('/banner-bg.jpg')" }}
      >
        <div className="flex-1 flex justify-center items-center h-[70vh]">
          <LoadingSpin />
        </div>
      </div>
    );
  }

  return (
    <>
      {" "}
      <div className="relative">
        <button
          onClick={() => setManageSlots(false)}
          className="px-2 py-2 rounded-full cursor-pointer bg-[linear-gradient(90deg,var(--color-AquaBlue)_0%,var(--color-primary)_100%)] text-white shadow-lg hover:scale-105 transition absolute top-12 left-10 text-2xl font-bold"
        >
          <IoMdArrowRoundBack />
        </button>
      </div>
      <div className="flex-1 flex justify-start md:p-7.5 px-5 py-7.5">
        <div className="max-w-337.5 w-full bg-[linear-gradient(11deg,var(--color-AquaBlue)_-80%,var(--color-white)_34%)] rounded-[10px] shadow-xl h-fit ">
          <h2 className="text-center rounded-t-[10px] bg-[linear-gradient(90deg,#56e1e845_70%,var(--color-background)_100%)]  w-full text-primary md:text-[25px] text-[20px] leading-6 py-5 font-semibold md:mb-11.25 mb-7.5">
            Booking Settings
            <p className="text-gray-500 text-[12px] p-0 m-0  ">
              Configure your availability and appointment slots
            </p>
          </h2>
          {/* Submit */}
          <div className="flex justify-end max-w-175 mx-auto w-full pe-5">
            <button
              onClick={handleSubmit}
              className=" px-4 cursor-pointer py-2 rounded-full bg-[linear-gradient(90deg,var(--color-AquaBlue)_0%,var(--color-primary)_100%)] text-white font-semibold shadow-lg hover:scale-105 transition"
            >
              {landingData ? <LoadingSpin width={3} height={15} /> : "Save"}
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
                  className="flex items-center bg-primary/8 justify-between rounded-xl p-3 flex-wrap gap-4"
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
                    <>
                      <div className="flex items-center gap-4">
                        <span className="text-primary text-sm">Fee:</span>
                        <input
                          className="border border-primary text-sm text-primary rounded-lg px-2 py-1 w-20"
                          type="number"
                          value={d.fee ?? "0"}
                          min={0.1}
                          step={0.1}
                          onChange={(e) =>
                            setSettings((prev) => ({
                              ...prev,
                              days: {
                                ...prev.days,
                                [day]: {
                                  ...prev.days[day],
                                  fee: e.target.value,
                                },
                              },
                            }))
                          }
                        />
                      </div>
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
                            onChange={(e) =>
                              updateTime(day, "end", e.target.value)
                            }
                            className="border border-primary [&::-webkit-calendar-picker-indicator]:opacity-0 text-sm text-primary rounded-lg px-2 py-1"
                          />
                          <FaRegClock className="w-3.5 h-3.5 text-primary absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>

                      <div className="flex items-center gap-4 py-1 ">
                           <button
                          onClick={() => checkboxhandle(day, !d.haveBusyHours)}
                          className={`w-10 h-5 flex items-center rounded-full p-1 transition ${
                            d.haveBusyHours ? "bg-primary" : "bg-gray-300"
                          }`}
                        >
                          <div
                            className={`bg-white w-4 h-4 rounded-full shadow transform transition ${
                              d.haveBusyHours ? "translate-x-5" : ""
                            }`}
                          />
                        </button>
                        <label className="flex items-center gap-2 cursor-pointer">
                          {" "}
                          Busy?
                        </label>

                    
                      </div>
                      {d.haveBusyHours && (
                      <div className="flex items-center gap-2">
                        <div className="relative">
                          <input
                          readOnly={!d.haveBusyHours}
                            type="time"
                            value={d.busyStart}
                            onChange={(e) =>
                              updateTime(day, "busyStart", e.target.value)
                            }
                            className={`border [&::-webkit-calendar-picker-indicator]:opacity-0 border-primary text-sm text-primary rounded-lg px-2 py-1`}
                          />
                          <FaRegClock className="w-3.5 h-3.5 text-primary absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>

                        <span className="text-primary text-sm">—</span>
                        <div className="relative">
                          <input
                            type="time"
                            value={d.busyEnd}
                            onChange={(e) =>
                              updateTime(day, "busyEnd", e.target.value)
                            }
                            className="border border-primary [&::-webkit-calendar-picker-indicator]:opacity-0 text-sm text-primary rounded-lg px-2 py-1"
                          />
                          <FaRegClock className="w-3.5 h-3.5 text-primary absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>
                      )}
                    </>
                  )}
                </div>
              );
            })}
          </div>
          <div className="max-w-175 mx-auto w-full p-6">
            {/* Slot Duration */}
            <div className="w-full">
              <h2 className="text-lg font-semibold mb-3">Slot Duration</h2>
              <select
                value={settings.slotduration}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    slotduration: Number(e.target.value),
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
            <div className=" w-full">
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
    </>
  );
}
