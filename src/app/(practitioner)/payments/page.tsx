"use client";
import WrapperBanner from "@/components/WraperBanner";
import { useEffect, useMemo, useState } from "react";
import { FiSearch } from "react-icons/fi";

import {  GetPaymentHistory } from "@/services/api";
import LoadingSpin from "@/components/LoadingSpin";
export interface PaymentHistoryType {
  payment_id: number;
  booking_id: string;
  fee: string;
  platform_fee: string;
  payment_status: string;
  practitioner_payout: string;
  date: string;
  time: string;
  patient_id: string;
  practitioner_id: string;
}

export default function PaymentHistory() {
  const [landing, setLanding] = useState(true);
  const [PaymentHistory, setPaymentHistory] = useState<PaymentHistoryType[]>(
    [],
  );

  const [MMMUserData] = useState(() => {
    if (typeof window === "undefined") return null;
    const data = localStorage.getItem("MMMDT");
    return data ? JSON.parse(data) : null;
  });

  const statusColors: { [key: string]: string } = {
    confirmed: "text-green-800 border border-green-800/50 bg-green-100",
    cancelled: "text-red-800 border border-red-800/50 bg-red-100",
    refund: "text-pink-900 border border-pink-800 bg-pink-300",
    settled: "text-blue-800 border border-blue-800/50 bg-blue-100",
    hold: "text-yellow-800 border border-yellow-800/50 bg-yellow-100",
  };

  const [search, setSearch] = useState("");

  const filteredData = useMemo(() => {
    return PaymentHistory.filter((item) => {
      const matchesSearch =
        item.payment_id
          .toString()
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        item.booking_id.toString().toLowerCase().includes(search.toLowerCase()) ||
        item.fee.toLowerCase().includes(search.toLowerCase()) ||
        item.payment_status.toLowerCase().includes(search.toLowerCase()) ||
        item.practitioner_payout.toLowerCase().includes(search.toLowerCase()) ||
        item.date.toLowerCase().includes(search.toLowerCase()) ||
        item.time.toLowerCase().includes(search.toLowerCase());

      return matchesSearch;
    });
  }, [search, PaymentHistory]);

  useEffect(() => {
    GetPaymentHistory(MMMUserData?.id)
      .then((data) => {
        setLanding(false);
        console.log("Patient Profile Data:", data);
        if (data.success) {
          setPaymentHistory(data.history);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, [MMMUserData?.id]);

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
          <div className="w-full bg-[linear-gradient(11deg,var(--color-AquaBlue)_-80%,var(--color-white)_34%)]  rounded-[10px] shadow-xl h-fit ">
            <h2 className="text-center rounded-t-[10px] bg-[linear-gradient(90deg,#56e1e845_70%,var(--color-background)_100%)]  w-full text-primary md:text-[25px] text-[20px] leading-9 py-3 font-semibold md:mb-11.25 mb-7.5">
              Payments
            </h2>

            <div className="md:px-12.5 px-5 md:pb-12.5 pb-5 rounded-xl ">
              {/* Search & Filter */}
              <div className="flex justify-between flex-wrap  mb-5">
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
              </div>

              {/* Table */}
              <div className="overflow-x-auto rounded-lg  bg-white">
                <table className="w-full">
                  <thead>
                    <tr className=" text-primary text-sm font-semibold">
                      <th className="px-4 py-3 text-left bg-primary/8 whitespace-nowrap">
                        Booking ID
                      </th>
                      <th className="px-4 py-3 text-left bg-primary/8 whitespace-nowrap">Date</th>
                      <th className="px-4 py-3 text-left bg-primary/8 whitespace-nowrap">Time</th>
                      <th className="px-4 py-3 text-left bg-primary/8 whitespace-nowrap">
                        Total
                      </th>
                      <th className="px-4 py-3 text-left bg-primary/8 whitespace-nowrap ">
                        Platform Fee
                      </th>
                      <th className="px-4 py-3 text-left bg-primary/8 whitespace-nowrap ">
                        Payout Amount
                      </th>

                      <th className="px-4 py-3 text-left bg-primary/8 whitespace-nowrap">
                        Status
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
                      <tr key={item.payment_id}>
                        <td className="px-4 py-4 font-bold text-sm leading-9 text-primary whitespace-nowrap">
                          #{item.booking_id}{" "}
                        </td>
                        <td className="px-4 py-4 font-bold text-sm leading-9 text-primary whitespace-nowrap">
                          {item.date}{" "}
                        </td>

                        <td className="px-4 py-4 text-sm text-primary font-semibold whitespace-nowrap">
                          {item.time}{" "}
                        </td>

                        <td className="px-4 py-4 leading-9 text-sm text-primary font-semibold whitespace-nowrap">
                         {"R "}{item.fee}
                        </td>
                        <td className="px-4 py-4 leading-9 text-sm text-primary font-semibold whitespace-nowrap">
                        {"R "}{item.platform_fee}
                        </td>
                          <td className="px-4 py-4 leading-9 text-sm text-primary font-semibold whitespace-nowrap">
                          {"R "}{item.practitioner_payout}
                        </td>

                        <td className={`px-4 py-4 text-sm font-semibold capitalize `}>
                          <span
                            className={`${statusColors[item.payment_status] || "bg-gray-100 text-gray-800"}  px-2 py-1 rounded-full`}
                          >
                            {item.payment_status}
                          </span>
                        </td>
               

                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </WrapperBanner>
    </>
  );
}
