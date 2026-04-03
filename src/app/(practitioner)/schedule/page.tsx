"use client";
import { useEffect, useState } from "react";
import WraperBanner from "@/components/WraperBanner";
import GoogleOauth from "@/components/google/GoogleOauth";
import { IoMdLogOut } from "react-icons/io";
import { CiSettings } from "react-icons/ci";
import { FaRegCalendarTimes } from "react-icons/fa";
import BookingSettingsPage from "@/components/comman/BookingSettingsPage";
import { disconnectGoogleCalendarAPI, getBookingbyMonth, getSlotManageSettings, isGoogleConnect } from "@/services/api";
import LoadingSpin from "@/components/LoadingSpin";
import ScheduleDetails from "@/components/ScheduleDetails";
import { IoToday } from "react-icons/io5";
import { toastTBS } from "@/lib/toast";



type DayName =
  | "Sunday"
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday";

type DayConfig = {
  start: string;
  end: string;
  fee: string;
  enabled: boolean;
};

type DaysObject = Record<DayName, DayConfig>;

const dayMap: Record<DayName, number> = {
  Sunday: 0,
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
};

export default function Calendar() {
  const [openModal, setOpenModal] = useState(false);
  const [bookedDates, setBookedDates] = useState<{ date: string; count: string }[]>([]);
  const [slotchanage, setSlotChange] = useState(0);
  const [offweekDays, setOffweekDays] = useState<number[]>([]);
  const [blockedDates, setBlockedDates] = useState<string[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [manageSlots, setManageSlots] = useState(false);
  const [Loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [MMMUserData] = useState(() => {
    if (typeof window === "undefined") return null;
    const data = localStorage.getItem("MMMDT");
    return data ? JSON.parse(data) : null;
  });

  useEffect(() => {
    isGoogleConnect(MMMUserData.id).then((data) => {
    setIsLoggedIn(data.success)

    }).catch((err) => {
      console.error(err);
    });

  }, [MMMUserData.id])

  function disconnectGoogleCalendar() {
    setIsLoggedIn(false);

    if (!MMMUserData?.id) {
      toastTBS.error("User ID not found. Please log in again.");
      return;
    }

    disconnectGoogleCalendarAPI(MMMUserData.id).then((res) => {
      if (res.success) {
        toastTBS.success("Google Calendar disconnected successfully");
        setIsLoggedIn(false);
      }

    }).catch((err) => {
      console.error(err);
    });
  }


  const getOffWeekDays = (days: DaysObject): number[] => {
    return (Object.keys(days) as DayName[])
      .filter((day) => !days[day].enabled)
      .map((day) => dayMap[day]);
  };

  const today = new Date();

  const todayStr = `${today.getFullYear()}-${String(
    today.getMonth() + 1
  ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();



  let firstDay = new Date(year, month, 1).getDay();
  firstDay = (firstDay === 0 ? 6 : firstDay - 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1));
    getBookingbyMonth(MMMUserData.id, new Date(year, (month - 1) + 1).toISOString().slice(0, 7)).then((data) => {
      if (data.success) { setBookedDates(data.data); }
    })
  };
  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1));
    getBookingbyMonth(MMMUserData.id, new Date(year, (month + 1) + 1).toISOString().slice(0, 7)).then((data) => {
      if (data.success) { setBookedDates(data.data); }
    })
  };

  const days = [];

  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }

  for (let d = 1; d <= daysInMonth; d++) {
    days.push(d);
  }

  const monthName = currentDate.toLocaleString("default", { month: "long" });

  const [open, setOpen] = useState(false);


  useEffect(() => {
    if (!MMMUserData?.id) return;

    const fetchData = async () => {
      try {
        setLoading(true);

        const [slotData, bookingData] = await Promise.all([
          getSlotManageSettings(MMMUserData.id),
          getBookingbyMonth(MMMUserData.id, new Date().toISOString().slice(0, 7)),
        ]);

        if (slotData.success) {
          setBlockedDates(slotData.holidays);
          setOffweekDays(getOffWeekDays(slotData.days));
        }

        if (bookingData.success) {
          setBookedDates(bookingData.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [MMMUserData?.id, slotchanage]);



  if (manageSlots)
    return (
      <WraperBanner>

        <BookingSettingsPage setSlotChange={setSlotChange} setManageSlots={setManageSlots} />
      </WraperBanner>
    );

  if (!isLoggedIn) {
    return (
      <WraperBanner>
        <GoogleOauth />
      </WraperBanner>
    );
  }

  if (Loading) {
    return (
      <WraperBanner>
        <div className="flex-1 flex justify-center items-center h-[70vh]">
          <LoadingSpin />
        </div>
      </WraperBanner>
    );



  }

  return (
    <WraperBanner>
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-md mt-5">
        {/* create this as dropdown and add the functionality to manage the slot and disconnect google calendar
         */}

        <div className="flex justify-end mb-4">
          <div className="relative inline-block text-left">
            {/* Trigger Button */}
            <button
              onClick={() => setOpen(!open)}
              className="cursor-pointer  flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-teal-400 to-teal-700 text-white font-semibold shadow-lg hover:scale-105 transition"
            >
              Manage{" "}
              <CiSettings
                className={`text-[25px] transition-transform duration-600 ${open ? "rotate-180" : ""
                  }`}
              />
            </button>
            {open && (
              <div className="absolute right-0 mt-2 w-75 border border-gray-100 rounded-xl bg-white shadow-xl z-50 overflow-hidden">
                <button
                  onClick={() => {
                    setManageSlots(true);
                  }}
                  className="cursor-pointer flex items-center gap-2 block w-full text-left px-6 py-2 text-gray-700 hover:bg-teal-100"
                >
                  <FaRegCalendarTimes /> Manage Your Slot
                </button>
                <div className="bg-gray-100  h-0.5" />
                <button
                  onClick={() => {
                    disconnectGoogleCalendar();
                  }}
                  className="cursor-pointer flex items-center gap-2 block w-full text-left px-6 py-2 text-gray-700 hover:bg-teal-100"
                >
                  <IoMdLogOut /> Disconnect Google Calendar
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="max-w-4xl mx-auto  rounded-lg overflow-hidden">
          {/* Header */}
          <div className="bg-teal-700 text-white flex justify-center gap-5 items-center px-6 py-4">
            <button className="cursor-pointer px-4 py-2 text-[20px]" onClick={prevMonth}>❮</button>
            <h2 className="text-xl font-semibold">
              {monthName} {year}
            </h2>
            <button className="cursor-pointer px-4 py-2 text-[20px]" onClick={nextMonth}>❯</button>
          </div>

          {/* Days Name */}
          <div className="grid grid-cols-7 bg-teal-600 text-white text-center text-sm">
            {[
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday",
            ].map((day) => (
              <div key={day} className="py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7">
            {days.map((day, i) => {
              const dateStr = day
                ? `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
                : "";

              const booking = bookedDates.find((b) => b.date === dateStr);
              const isBlocked = blockedDates.includes(dateStr);
              const isToday = dateStr === todayStr;
              const isOffweek = offweekDays.includes(
                new Date(year, month, day || 0).getDay(),
              );

              return (
                <div
                  key={i} onClick={() => booking ? (setSelectedDate(dateStr), setOpenModal(true)) : ''}
                  className={`${isBlocked || isOffweek ? "bg-gray-100 cursor-not-allowed" : ""} h-28 border border-gray-300 p-2 text-sm relative ${booking ? "cursor-pointer  bg-primary hover:bg-[#2a9f9a]" : ""}`}
                >
                  {day && (
                    <>
                      <div className="flex justify-between">
                        <span className={`text-xs ${booking ? "text-white" : "text-gray-500"}`}>{day}</span>
                        {isToday && <IoToday className="text-gray-600" />}
                      </div>
                      {booking && (
                        <div className="mt-4 text-[#fff] p-2 rounded text-md font-semibold">
                          You have {booking.count} sessions
                        </div>
                      )}
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="h-16"></div>

      {openModal && (<ScheduleDetails isOpen={openModal} onClose={() => setOpenModal(false)} date={selectedDate} />)}
    </WraperBanner>
  );
}
