"use client";
import WrapperBanner from "@/components/WraperBanner";
import { useEffect, useMemo, useState } from "react";
import { FiSearch } from "react-icons/fi";

import { GetBookingHistory } from "@/services/api";
import LoadingSpin from "@/components/LoadingSpin";
import { FaRegEdit } from "react-icons/fa";
import Link from "next/link";

import BookingStatusChange from "@/components/comman/BookingStatusChange";
import ReadMorePopup from "@/components/comman/ReadMorePopup";
import ReadMoreButton from "@/components/comman/ReadMoreButton";
import { SiGooglemeet } from "react-icons/si";
export interface BookingHistoryType {
  id: string;
  practitioner_id: string;
  patient_id: string;
  booking_id: string;
  full_name: string;
  slot: string;
  booking_date: string;
  appointment_type: string;
  status: string;
  booking_fee: string;
  meeting_link: string;
  reason: string;
}

export default function Insurance() {
  const [landing, setLanding] = useState(true);
  const [openStatusChange, setOpenStatusChange] = useState(false);
  const [openReadMore, setOpenReadMore] = useState("");
  const [openReadMoreTitle, setOpenReadMoreTitle] = useState("");
  const [selectedBooking, setSelectedBooking] = useState<BookingHistoryType>();
  const [BookingHistory, setBookingHistory] = useState<BookingHistoryType[]>(
    [],
  );
  const [bookingUpdate, setBookingUpdate] = useState<number>(0);

  const [MMMUserData] = useState(() => {
    if (typeof window === "undefined") return null;
    const data = localStorage.getItem("MMMDT");
    return data ? JSON.parse(data) : null;
  });

  const statusColors: { [key: string]: string } = {
    completed: "text-green-800 border border-green-800/50 bg-green-100",
    cancelled: "text-red-800 border border-red-800/50 bg-red-100",
    pending: "text-yellow-800 border border-yellow-800/50 bg-yellow-100",
    rescheduled: "text-blue-800 border border-blue-800/50 bg-blue-100",
    booked: "text-green-800 border border-green-800/50 bg-green-100",
  };

  const [search, setSearch] = useState("");

  const filteredData = useMemo(() => {
    return BookingHistory.filter((item) => {
      const matchesSearch =
        item.booking_id
          .toString()
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        item.full_name.toLowerCase().includes(search.toLowerCase()) ||
        item.booking_date.toLowerCase().includes(search.toLowerCase()) ||
        item.slot.toLowerCase().includes(search.toLowerCase()) ||
        item.booking_fee.toLowerCase().includes(search.toLowerCase()) ||
        item.status.toLowerCase().includes(search.toLowerCase()) ||
        item.appointment_type.toLowerCase().includes(search.toLowerCase());

      return matchesSearch;
    });
  }, [search, BookingHistory]);

  useEffect(() => {
    GetBookingHistory(MMMUserData?.id)
      .then((data) => {
        setLanding(false);

        if (data.success) {
          setBookingHistory(data.history);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, [MMMUserData?.id, bookingUpdate]);

  if (landing) {
    return (
      <WrapperBanner>
        <div className="flex-1 flex justify-center items-center h-[70vh]">
          <LoadingSpin />
        </div>
      </WrapperBanner>
    );
  }

  return (
    <>
      <WrapperBanner>
        <div className="flex-1 flex justify-start md:p-7.5 px-5 py-7.5">
          <div className=" w-full bg-[linear-gradient(11deg,var(--color-AquaBlue)_-80%,var(--color-white)_34%)]  rounded-[10px] shadow-xl h-fit ">
            <h2 className="text-center rounded-t-[10px] bg-[linear-gradient(90deg,#56e1e845_70%,var(--color-background)_100%)]  w-full text-primary md:text-[25px] text-[20px] leading-9 py-3 font-semibold md:mb-11.25 mb-7.5">
              Booking History
            </h2>

            <div className="md:px-12.5 px-5 md:pb-12.5 pb-5 rounded-xl ">
              {/* Search & Filter */}
              <div className="flex justify-between flex-wrap md:gap-0 gap-4  mb-5">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className=" bg-primary/8 placeholder:text-primary w-75 rounded-md px-4 py-2.5 outline-none"
                  />
                  <button className="absolute top-1/2 right-6 z-1 cursor-pointer text-primary -translate-y-1/2 transform ">
                    <FiSearch className=" h-5 w-5  " />
                  </button>
                </div>
                {MMMUserData?.role === "patient" && (
                  <Link
                    href={"/book-a-appointment"}
                    className="px-4 cursor-pointer py-2 rounded-full bg-gradient-to-r from-teal-400 to-teal-700 text-white font-semibold shadow-lg hover:scale-105 transition"
                  >
                    Book a Appointment
                  </Link>
                )}
              </div>

              {/* Table */}
              <div className="overflow-x-auto rounded-lg  bg-white">
                <table className="w-full">
                  <thead>
                    <tr className=" text-primary text-sm font-semibold">
                      <th className="px-4 py-3 text-left bg-primary/8 ">
                        Booking ID
                      </th>
                      <th className="px-4 py-3 text-left bg-primary/8 ">
                        {MMMUserData?.role === "patient"
                          ? "Practitioner Name"
                          : "Patient Name"}
                      </th>
                      <th className="px-4 py-3 text-left bg-primary/8 whitespace-nowrap">
                        Date
                      </th>
                      <th className="px-4 py-3 text-left bg-primary/8 whitespace-nowrap">
                        Time
                      </th>
                      <th className="px-4 py-3 text-left bg-primary/8  ">
                        Amount
                      </th>
                      <th className="px-4 py-3 text-left bg-primary/8 ">
                        Status
                      </th>
                      <th className="px-4 py-3 text-left bg-primary/8 ">
                        Reason
                      </th>
                      <th className="px-4 py-3 text-left bg-primary/8 ">
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-primary/8">
                    {filteredData.length === 0 && (
                      <tr>
                        <td
                          colSpan={4}
                          className="text-center py-6 text-sm text-gray-400"
                        >
                          No records found
                        </td>
                      </tr>
                    )}

                    {filteredData.map((item) => (
                      <tr key={item.id}>
                        <td className="px-4 py-4 font-bold text-sm leading-9 text-primary">
                          #{item.booking_id}
                        </td>
                        <td className="px-4 py-4 font-bold text-sm leading-9 text-primary ">
                          {item.full_name}{" "}
                        </td>

                        <td className="px-4 py-4 text-sm text-primary font-semibold whitespace-nowrap">
                          {item.booking_date}
                        </td>

                        <td className="px-4 py-4 leading-9 text-sm text-primary font-semibold whitespace-nowrap">
                          {item.slot}
                        </td>
                        <td className="px-4 py-4 leading-9 text-sm text-primary font-semibold ">
                          {"R "}
                          {item.booking_fee}
                        </td>

                        <td className={`px-4 py-4 text-sm font-semibold`}>
                          <span
                            className={`capitalize ${statusColors[item.status] || "bg-gray-100 text-gray-800"}  px-2 py-1 rounded-full`}
                          >
                            {item.status}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-sm text-primary font-semibold capitalize ">
                          <ReadMoreButton
                            text={item.reason}
                            title="Reason"
                            limit={40}
                            setdata={setOpenReadMore}
                            setdataTitle={setOpenReadMoreTitle}
                          />
                        </td>
                        <td className="px-4 py-4 text-sm text-primary font-semibold  flex items-center gap-2">
                          <div
                            onClick={() => {
                              if (item.status == "booked") {
                                setSelectedBooking(item);
                                setOpenStatusChange(true);
                              }
                            }}
                          >
                            <FaRegEdit
                              className={`text-xl  ${item.status !== "booked" ? "text-gray-300 cursor-not-allowed" : "hover:text-gray-500 cursor-pointer"}`}
                            />
                          </div>
                           
                          <Link
                            href={item.meeting_link ?? "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`${item.status !== "booked" ? "text-gray-400 cursor-not-allowed bg-gray-300" : "bg-gradient-to-r from-teal-400 to-teal-700 text-white" }  hover:scale-105 transition text-md   font-semibold shadow-lg flex items-center justify-center gap-1 px-2 py-1 rounded-md text-sm`}
                          >
                            <SiGooglemeet className="text-lg" /> Join
                          </Link>
                            
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <ReadMorePopup
          setOpenReadMore={setOpenReadMore}
          openReadMore={openReadMore}
          openReadMoreTitle={openReadMoreTitle}
        />
      </WrapperBanner>

      {openStatusChange && selectedBooking && (
        <BookingStatusChange
          setBookingUpdate={setBookingUpdate}
          setOpenStatusChange={setOpenStatusChange}
          data={selectedBooking}
          Role={MMMUserData?.role}
        />
      )}
    </>
  );
}
