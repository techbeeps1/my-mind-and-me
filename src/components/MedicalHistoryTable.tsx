"use client";

import { useEffect, useMemo, useState } from "react";

import {  GetMedicalHistory } from "@/services/api";

import LoadingSpin from "./LoadingSpin";
import { FiSearch } from "react-icons/fi";
import MedicalHistoryPopup from "./comman/MedicalHistoryPopup";

export interface BookingHistoryType {
id: string;
patient_id: string;
doctor_id: string;
notes: string;
created_at: string;
updated_at: string;
patient_name: string;
doctor_name: string;
  

}



type SessionModalProps = {
  isOpen: boolean;
  onClose: () => void;
  id: string;
};

export default function MedicalHistoryTable({ 
  isOpen, 
  onClose,
  id, 
}: SessionModalProps) {

  
    const [search, setSearch] = useState("");
    const [loading, setLanding] = useState(true);
    const [openReschedule, setOpenReschedule] = useState(false);
    const [medicalHistoryUpdate, setMedicalHistoryUpdate] = useState(0);
    const [BookingHistory, setBookingHistory] = useState<BookingHistoryType[]>([]);
      const filteredData = useMemo(() => {
        return BookingHistory.filter((item) => {
          const matchesSearch =
           item.id?.toString().toLowerCase().includes(search.toLowerCase()) ||
            item.patient_name?.toLowerCase().includes(search.toLowerCase()) ||
            item.doctor_name?.toLowerCase().includes(search.toLowerCase()) ||
            item.notes?.toLowerCase().includes(search.toLowerCase()) ||
            item.created_at?.toLowerCase().includes(search.toLowerCase()) 

    
          return matchesSearch;
        });
      }, [search, BookingHistory]);
 
  
    const [MMMUserData] = useState(() => {
      if (typeof window === "undefined") return null;
      const data = localStorage.getItem("MMMDT");
      return data ? JSON.parse(data) : null;
    });
  


    useEffect(() => {
      setTimeout(() => {
        setLanding(true);
    }, 1);
      GetMedicalHistory(id) 
        .then((data) => {
          setLanding(false);
          if (data.data) {
            setBookingHistory(data.data);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }, [MMMUserData?.id, id,medicalHistoryUpdate]);
  
if (!isOpen) return null;


  return (
    <>
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

                  <div className="min-h-[90vh] w-[80vw] bg-[linear-gradient(11deg,var(--color-AquaBlue)_-80%,var(--color-white)_34%)]  rounded-[10px] shadow-xl h-fit ">
                    <h2 className="text-center rounded-t-[10px] bg-[linear-gradient(90deg,#56e1e845_70%,var(--color-background)_100%)]  w-full text-primary md:text-[25px] text-[20px] leading-9 py-3 font-semibold md:mb-5 mb-1.5">
                      Medical History
                    </h2>
              {loading ? (
                <div className="flex-1 flex justify-center items-center h-[48vh] ">
                  <LoadingSpin color="bg-primary" />
                </div>
              ):( 
                
                    <div className="md:px-12.5 px-5 md:pb-12.5 pb-5 rounded-xl ">
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
                                
                                        <div onClick={() => setOpenReschedule(true)} className="px-4 cursor-pointer py-2 rounded-full bg-gradient-to-r from-teal-400 to-teal-700 text-white font-semibold shadow-lg hover:scale-105 transition">
                                         Add New
                                        </div>
                             
                                    </div>

                      <div className="overflow-x-auto rounded-lg  bg-white">
                        <table className="w-full">
                          <thead>
                            <tr className=" text-primary text-sm font-semibold">
                                <th className="px-4 py-3 text-left bg-primary/8">
                                Patient Name
                              </th>
                               <th className="px-4 py-3 text-left bg-primary/8">
                                Date
                              </th>
                              <th className="px-4 py-3 text-left bg-primary/8 ">
                                Notes
                              </th>                       
                              <th className="px-4 py-3 text-left bg-primary/8">
                               Doctor / Practitioner Name
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
                                  {item.patient_name}
                                </td>
                               
        
                                <td className="px-4 py-4 text-sm text-primary font-semibold">
                                  {item.created_at}
                                </td>
                                 <td className="px-4 py-4 font-bold text-sm leading-9 text-primary">
                                  {item.notes}
                                </td>
        
                                <td className="px-4 py-4 leading-9 text-sm text-primary font-semibold">
                                  {item.doctor_name}
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
    {openReschedule && (
      <div className="fixed inset-0 z-100 flex items-center justify-center">
    <MedicalHistoryPopup setMedicalHistoryUpdate={setMedicalHistoryUpdate} setOpenStatusChange={setOpenReschedule} id={id}  />
    </div>
    )}
    </>
  );
}