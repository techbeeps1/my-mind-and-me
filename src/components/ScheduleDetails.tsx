"use client";

import { useEffect, useState } from "react";

import {  GetBookinglistbydate } from "@/services/api";
import { SiGooglemeet } from "react-icons/si";
import LoadingSpin from "./LoadingSpin";
import Link from "next/link";

export interface BookingHistoryType {

  booking_id: string;
  full_name: string;
  slot: string;
  booking_date: string;
  meeting_link: string;

}



type SessionModalProps = {
  isOpen: boolean;
  onClose: () => void;
  date: string;
};

export default function ScheduleDetails({ 
  isOpen, 
  onClose,
  date, 
}: SessionModalProps) {

  

    const [loading, setLanding] = useState(true);
    const [BookingHistory, setBookingHistory] = useState<BookingHistoryType[]>([]);
  
    const [MMMUserData] = useState(() => {
      if (typeof window === "undefined") return null;
      const data = localStorage.getItem("MMMDT");
      return data ? JSON.parse(data) : null;
    });
  


    useEffect(() => {
      setTimeout(() => {
        setLanding(true);
    }, 1);
      GetBookinglistbydate(MMMUserData?.id, date) 
        .then((data) => {
          setLanding(false);
          if (data.success) {
            setBookingHistory(data.data);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }, [MMMUserData?.id, date]);
  
if (!isOpen) return null;


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">

      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-1 text-white cursor-pointer font-bold h-7.5 w-7.5 rounded-full bg-primary text-sm flex items-center justify-center"
        >
          ✕
        </button>

                  <div className="max-w-337.5 w-full bg-[linear-gradient(11deg,var(--color-AquaBlue)_-80%,var(--color-white)_34%)]  rounded-[10px] shadow-xl h-fit ">
                    <h2 className="text-center rounded-t-[10px] bg-[linear-gradient(90deg,#56e1e845_70%,var(--color-background)_100%)]  w-full text-primary md:text-[25px] text-[20px] leading-9 py-3 font-semibold md:mb-5 mb-1.5">
                      Schedule
                    </h2>
              {loading ? (
                <div className="flex-1 flex justify-center items-center h-[48vh] w-150.5">
                  <LoadingSpin color="bg-primary" />
                </div>
              ):( 
                    <div className="md:px-12.5 px-5 md:pb-12.5 pb-5 rounded-xl ">

                      <div className="overflow-x-auto rounded-lg  bg-white">
                        <table className="w-full">
                          <thead>
                            <tr className=" text-primary text-sm font-semibold">
                                <th className="px-4 py-3 text-left bg-primary/8">
                                Booking ID
                              </th>
                              <th className="px-4 py-3 text-left bg-primary/8 rounded-tl-lg">
                                {MMMUserData?.role === "patient" ? "Practitioner Name" : "Patient Name"}
                              </th>
                              <th className="px-4 py-3 text-left bg-primary/8">
                                Date
                              </th>
                              <th className="px-4 py-3 text-left bg-primary/8">
                                Time
                              </th>
                              <th className="px-4 py-3 text-left bg-primary/8">
                                Meeting Link
                              </th>
                     
                            </tr>
                          </thead>
        
                          <tbody className="divide-y divide-primary/8">
                            {BookingHistory.length === 0 && (
                              <tr>
                                <td
                                  colSpan={4}
                                  className="text-center py-6 text-sm text-gray-400"
                                >
                                  No records found
                                </td>
                              </tr>
                            )}
        
                            {BookingHistory.map((item) => (
                              <tr key={item.booking_id}>
                                <td className="px-4 py-4 font-bold text-sm leading-9 text-primary">
                                  #{item.booking_id}
                                </td>
                                <td className="px-4 py-4 font-bold text-sm leading-9 text-primary">
                                  {item.full_name}                        </td>
        
                                <td className="px-4 py-4 text-sm text-primary font-semibold">
                                  {item.booking_date}
                                </td>
        
                                <td className="px-4 py-4 leading-9 text-sm text-primary font-semibold">
                                  {item.slot}
                                </td>
                                <td className="px-4 py-4 leading-9 text-sm text-primary font-semibold">
                                  <Link
                                    href={item.meeting_link ?? "#"}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className=" hover:scale-105 transition text-md bg-gradient-to-r from-teal-400 to-teal-700 text-white font-semibold shadow-lg flex items-center justify-center gap-2 px-2 py-1.5 rounded-md text-sm"
                                  >
                                    <SiGooglemeet className="text-[18px]" /> Join 
                                  </Link>
                                </td>
                             

                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
              )}
                  </div>
                


      </div>
    </div>
  );
}