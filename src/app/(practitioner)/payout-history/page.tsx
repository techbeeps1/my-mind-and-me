"use client";
import WrapperBanner from "@/components/WraperBanner";
import { useEffect, useMemo, useState } from "react";
import { FiSearch } from "react-icons/fi";

import {  GetPayoutHistory } from "@/services/api";
import LoadingSpin from "@/components/LoadingSpin";
import Pagination from "@/components/comman/Pagination";
import { LiaFileInvoiceSolid } from "react-icons/lia";
import { useProfile } from "@/services/ProfileContext";

export interface PayoutHistoryType {
  uuid: string;
payout_id: string;
transfer_id: string;
total_amount: string;
payout_status: string;
payout_updated_at: string;
}

export default function PayoutHistory() {
  const [landing, setLanding] = useState(true);
  const { MMMUserData } = useProfile();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [PayoutHistory, setPayoutHistory] = useState<PayoutHistoryType[]>(
    [],
  );



  const statusColors: { [key: string]: string } = {
    confirmed: "text-green-800 border border-green-800/50 bg-green-100",
    cancelled: "text-red-800 border border-red-800/50 bg-red-100",
    refund: "text-pink-900 border border-pink-800 bg-pink-300",
    settled: "text-blue-800 border border-blue-800/50 bg-blue-100",
    hold: "text-yellow-800 border border-yellow-800/50 bg-yellow-100",
  };

  const [search, setSearch] = useState("");

  const filteredData = useMemo(() => {
    return PayoutHistory.filter((item) => {
      const matchesSearch =
        item.payout_id
          .toString()
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        item.transfer_id.toString().toLowerCase().includes(search.toLowerCase()) ||
        item.total_amount.toLowerCase().includes(search.toLowerCase()) ||
        item.payout_status.toLowerCase().includes(search.toLowerCase()) ||
        item.payout_updated_at.toLowerCase().includes(search.toLowerCase());

      return matchesSearch;
    });
  }, [search, PayoutHistory]);

  useEffect(() => {
    if (!MMMUserData?.id) return;
    GetPayoutHistory(MMMUserData?.id, page, 20)
      .then((data) => {
        setLanding(false);
        console.log("Patient Profile Data:", data);
        if (data.success) {
          setPayoutHistory(data.payouts);
          setTotalPages(data.total_pages);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, [MMMUserData?.id, page]);

  if (landing) {
    return (
      <WrapperBanner>
        <div className="flex-1 flex justify-center items-center h-[70vh]">
          <LoadingSpin />
        </div>
      </WrapperBanner>
    );
  }


 function generateInvoice (PayoutId: string) {
    
  window.open(`/api/payout-invoice/${PayoutId}`, "_self");
  }

  return (
    <>
      <WrapperBanner>
        <div className="flex-1 flex justify-start md:p-7.5 px-5 py-7.5">
          <div className="w-full bg-[linear-gradient(11deg,var(--color-AquaBlue)_-80%,var(--color-white)_34%)]  rounded-[10px] shadow-xl h-fit ">
            <h2 className="text-center rounded-t-[10px] bg-[linear-gradient(90deg,#56e1e845_70%,var(--color-background)_100%)]  w-full text-primary md:text-[25px] text-[20px] leading-9 py-3 font-semibold md:mb-11.25 mb-7.5">
              Payout History
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
                        Payout ID
                      </th>
                      <th className="px-4 py-3 text-left bg-primary/8 whitespace-nowrap">
                        Transfer ID
                      </th>
                      <th className="px-4 py-3 text-left bg-primary/8 whitespace-nowrap">Date</th>
                                 
                      <th className="px-4 py-3 text-left bg-primary/8 whitespace-nowrap ">
                        Payout Amount
                      </th>
                      
                      <th className="px-4 py-3 text-left bg-primary/8 whitespace-nowrap">
                        Status
                      </th>
                     <th className="px-4 py-3 text-left bg-primary/8 whitespace-nowrap">

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
                      <tr key={item.payout_id}>
                        <td className="px-4 py-4 font-bold text-sm leading-9 text-primary whitespace-nowrap">
                          #{item.payout_id}{" "}
                        </td>
                        <td className="px-4 py-4 font-bold text-sm leading-9 text-primary whitespace-nowrap">
                          {item.transfer_id}{" "}
                        </td>

                        <td className="px-4 py-4 text-sm text-primary font-semibold whitespace-nowrap">
                          {item.payout_updated_at}
                        </td>


                     <td className="px-4 py-4 leading-9 text-sm text-primary font-semibold whitespace-nowrap">
                        {"R "}{item.total_amount}
                        </td>

                

                        <td className={`px-4 py-4 text-sm font-semibold capitalize `}>
                          <span
                            className={`${statusColors[item.payout_status] || "bg-gray-100 text-gray-800"}  px-2 py-1 rounded-full`}
                          >
                            {item.payout_status}
                          </span>
                        </td>
                  
                        <td className="px-4 py-4">

                          <button onClick={() =>{ if(item.payout_status==='completed'){generateInvoice(item.uuid)}}} className={`flex items-center gap-1  text-sm text-white px-2 py-2 rounded-[10px] ${item.payout_status === 'completed' ? 'cursor-pointer bg-gradient-to-r from-cyan-500 to-teal-500 hover:bg-blue-600 transition hover:scale-105' : 'bg-gray-400 cursor-not-allowed'} `}>
                           <LiaFileInvoiceSolid className="w-5 h-5" /> Invoice
                          </button>
                        </td>

               

                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
                       <Pagination page={page} setPage={setPage} totalPages={totalPages} />
            
          </div>
        </div>
      </WrapperBanner>
    </>
  );
}
