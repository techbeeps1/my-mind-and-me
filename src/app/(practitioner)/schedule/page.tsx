"use client";
import { useState } from "react";
import WraperBanner from "@/components/WraperBanner";
import GoogleOauth from "@/components/google/GoogleOauth";
import {  IoMdArrowRoundBack, IoMdLogOut } from "react-icons/io";
import { CiSettings } from "react-icons/ci";
import { FaRegCalendarTimes } from "react-icons/fa";
import BookingSettingsPage from "@/components/comman/BookingSettingsPage";

const bookedDates = [
  { date: "2026-03-09", title: "Session with John" },
  { date: "2026-03-18", title: "Session with John" },
  { date: "2026-03-23", title: "Session with John" },
  { date: "2026-03-23", title: "Session with John" },
];

const blockedDates = ["2026-03-15", "2026-03-20"];

const offweekDays = [0, 6]; 

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 2));
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [manageSlots, setManageSlots] = useState(false);

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
  const [open, setOpen] = useState(false);


if(manageSlots) return(
    <WraperBanner>
       <div className="relative">
                
              <button onClick={() => setManageSlots(false)} className="px-2 py-2 rounded-full bg-gradient-to-r from-teal-400 to-teal-700 text-white font-semibold shadow-lg hover:scale-105 transition absolute top-12 left-10 text-2xl font-bold">
                <IoMdArrowRoundBack />
              </button>
              </div>
  <BookingSettingsPage  />
  </WraperBanner>
) 



  if (!isLoggedIn) {
    return (
      <WraperBanner>
        <GoogleOauth />
      </WraperBanner>


    )
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
        Manage  <CiSettings className={`text-[25px] transition-transform duration-600 ${
              open ? "rotate-180" : ""            }`
            } /> 
        </button>
        {open && (
          <div className="absolute right-0 mt-2 w-75 border border-gray-100 rounded-xl bg-white shadow-xl z-50 overflow-hidden">
            
            <button
              onClick={() => {setManageSlots(true)}}
              className="cursor-pointer flex items-center gap-2 block w-full text-left px-6 py-2 text-gray-700 hover:bg-teal-100"
            >
             <FaRegCalendarTimes /> Manage Your Slot
            </button>
<div className="bg-gray-100  h-0.5" />
            <button
              onClick={() => {setIsLoggedIn(false)}}
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
          <div className="bg-teal-700 text-white flex justify-between items-center px-6 py-4">
            <button onClick={prevMonth}>❮</button>
            <h2 className="text-xl font-semibold">
              {monthName} {year}
            </h2>
            <button onClick={nextMonth}>❯</button>
          </div>

          {/* Days Name */}
          <div className="grid grid-cols-7 bg-teal-600 text-white text-center text-sm">
            {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map(day => (
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
              const isBlocked = blockedDates.includes(dateStr);
              const isOffweek = offweekDays.includes(new Date(year, month, day || 0).getDay());

              

              return (
                <div
                  key={i}
                  className={`${isBlocked || isOffweek ? "bg-gray-100 cursor-not-allowed" : "hover:bg-gray-200"} h-28 border border-gray-300 p-2 text-sm relative ${booking ? "cursor-pointer  bg-[#d3e3e2]" : ""}`}
                >
                  {day && (
                    <>
                      <span className="text-gray-500 text-xs">{day}</span>

                      {booking && (
                        <div className="mt-4 text-[#444444] p-2 rounded text-xs">
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
      </div>
      <div className="h-16"></div>
    </WraperBanner>
  );
}