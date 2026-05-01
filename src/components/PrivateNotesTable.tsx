"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { IoSend } from "react-icons/io5";
import { getConversation, SendConversation } from "@/services/api";

import LoadingSpin from "./LoadingSpin";
import { useProfile } from "@/services/ProfileContext";
import { Patient } from "@/app/(commanpages)/referral-history/page";

import { FiSearch } from "react-icons/fi";
import Pagination from "./comman/Pagination";

export interface BookingHistoryType {
  id: string;
  notes: string;
  created_at: string;
  role: string;
  user_name: string;
}

type SessionModalProps = {
  isOpen: boolean;
  onClose: () => void;
  data: Patient;
};

export default function PrivateNotesTable({
  isOpen,
  onClose,
  data
}: SessionModalProps) {
  const chatEndRef = useRef<HTMLDivElement | null>(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
  
  const [message, setMessage] = useState("");
  const [loading, setLanding] = useState(true);

  const { MMMUserData } = useProfile();
  const [medicalHistoryUpdate, setMedicalHistoryUpdate] = useState(0);

  const [BookingHistory, setBookingHistory] = useState<BookingHistoryType[]>([]);
    const [search, setSearch] = useState("");


  
    const filteredData = useMemo(() => {
      return BookingHistory.filter((item) => {
        const matchesSearch =
          item.notes.toLowerCase().includes(search.toLowerCase()) ||
          item.created_at.toLowerCase().includes(search.toLowerCase()) ||
          item.notes.toLowerCase().includes(search.toLowerCase()) 
  
    
        return matchesSearch;
      });
    }, [search, BookingHistory]);
   

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [BookingHistory]);

  useEffect(() => {
    setTimeout(() => {
      setLanding(true);
    }, 1);
    const payload = {
      patient_id: data.patient_id,
      practitioner_id: data.practitioner_id,
      referrer_id: data.doctor_id,
      role: MMMUserData?.role ?? "practitioner",
      page: page,
      limit: 10,
    };
    getConversation(payload)
      .then((data) => {
        setLanding(false);
        if (data.success) {
          setBookingHistory(data.data);
          setTotalPages(data.total_pages);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, [MMMUserData, data, medicalHistoryUpdate,page]);

  const handleSend = async () => {
    if (!message.trim()) return;
    try {
      const payload = {
        patient_id: data.patient_id,
        practitioner_id: data.practitioner_id,
        referrer_id: data.doctor_id,
        role: MMMUserData?.role ?? "practitioner",
        notes: message,
      };
        SendConversation(payload).then((data) => {
          if (data.success) {
            setMedicalHistoryUpdate((prev) => prev + 1);
          }
        }).catch((err) => {
          console.error(err);
        });
      if (!MMMUserData) return;
      const newData = {
        id: Math.random().toString(),
        notes: message,
        created_at: new Intl.DateTimeFormat("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }).format(new Date()),
        role: MMMUserData.role,
        user_name: MMMUserData?.user_name ?? "You",
      };
      setBookingHistory((prev) => [...prev, newData]);
      setMessage("");
      // setMedicalHistoryUpdate((prev) => prev + 1);
    } catch (err) {
      console.error(err);
    }
  };
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex justify-center">
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={onClose}
        />
        <div className="relative my-12.5 overflow-x-auto custom-scroll">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-1 text-white cursor-pointer font-bold h-7.5 w-7.5 rounded-full bg-primary text-sm flex items-center justify-center"
          >
            ✕
          </button>

          <div className=" pb-2 w-[80vw] bg-[linear-gradient(11deg,var(--color-AquaBlue)_-80%,var(--color-white)_34%)]  rounded-[10px] shadow-xl h-fit ">
            <h2 className="text-center rounded-t-[10px] bg-[linear-gradient(90deg,#56e1e845_70%,var(--color-background)_100%)]  w-full text-primary md:text-[25px] text-[20px] leading-9 py-3 font-semibold md:mb-5 mb-1.5">
              Private Notes
            </h2>
          
       
        <div className="md:px-12.5 px-5 md:pb-12.5 pb-5 rounded-xl  ">
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
                <table className="w-full ">
                  <thead>
                    <tr className=" text-primary text-sm font-semibold">
                      <th className="px-4 py-3 text-left bg-primary/8">
                       Practitioner Name
                      </th>
                      <th className="px-4 py-3 text-left bg-primary/8 ">
                        Date
                      </th>
                      <th className="w-1/2 px-4 py-3 text-left  bg-primary/8 rounded-tr-lg">
                        Notes
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-primary/8">
                    {filteredData.length === 0 && (
                          <tr>
                            <td colSpan={3} className="px-4 py-4 text-center text-gray-400">
                                        { loading ? (
                                           <div className="flex justify-center items-center h-[48vh] ">
                                    <LoadingSpin color="bg-primary" />
                                  </div>):(
                                        <div className="text-center text-gray-400 py-10">
                                          No private notes available.
                                        </div>
                                  )}
                                  </td>
                                  </tr>
                    )}

                    {filteredData.map((item) => (
                      <tr key={item.id}>
                       <td className="px-4 py-4 font-bold text-sm leading-9 text-primary">
                          {item.user_name}
                        </td>
                        <td className="px-4 py-4 text-sm text-primary font-semibold">
                          <div>{item.created_at}</div>
                 
                                                
                        </td>                  
                        <td className="px-4 py-4 text-sm text-primary font-semibold">
                       {item.notes}
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
      </div>

      
    </>
  );
}
