"use client";
import WrapperBanner from "@/components/WraperBanner";
import { useEffect, useMemo, useState } from "react";
import { FiSearch } from "react-icons/fi";

import {  GetRelatedPatients } from "@/services/api";
import LoadingSpin from "@/components/LoadingSpin";
import { FaEye } from "react-icons/fa";
import Link from "next/link";
import { useProfile } from "@/services/ProfileContext";
import MedicalHistoryTable from "@/components/MedicalHistoryTable";


export interface PatientType {
  id: string;
  unique_id: string;
  user_name: string;
  email: string;
  gender: string;
  dob: string;
}

export default function PatientsList() {
     const { MMMUserData } = useProfile();
  const [landing, setLanding] = useState(true);
  const [openModal, setOpenModal] = useState(false);

  const [selectedPatient, setSelectedPatient] = useState<PatientType | undefined>();
  const [BookingHistory, setBookingHistory] = useState<PatientType[]>([]);



  const [search, setSearch] = useState("");
  const filteredData = useMemo(() => {
    return BookingHistory.filter((item) => {
      const matchesSearch =
       item.unique_id?.toString().toLowerCase().includes(search.toLowerCase()) ||
        item.user_name?.toLowerCase().includes(search.toLowerCase()) ||
        item.email?.toLowerCase().includes(search.toLowerCase()) ||
        item.gender?.toLowerCase().includes(search.toLowerCase()) ||
        item.dob?.toLowerCase().includes(search.toLowerCase());

      return matchesSearch;
    });
  }, [search, BookingHistory]);



  useEffect(() => {
    if (!MMMUserData) return;
    GetRelatedPatients(MMMUserData?.role, MMMUserData?.id)
      .then((data) => {
        setLanding(false);
        if (data.success) {
          setBookingHistory(data.data);
        }

      })
      .catch((err) => {
        console.error(err);
      });
  }, [MMMUserData]);

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
          <div className="max-w-337.5 w-full bg-[linear-gradient(11deg,var(--color-AquaBlue)_-80%,var(--color-white)_34%)]  rounded-[10px] shadow-xl h-fit ">
            <h2 className="text-center rounded-t-[10px] bg-[linear-gradient(90deg,#56e1e845_70%,var(--color-background)_100%)]  w-full text-primary md:text-[25px] text-[20px] leading-9 py-3 font-semibold md:mb-11.25 mb-7.5">
              Patients List
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
                {MMMUserData?.role === "patient" && (
                  <Link href={"/book-a-appointment"} className="px-4 cursor-pointer py-2 rounded-full bg-gradient-to-r from-teal-400 to-teal-700 text-white font-semibold shadow-lg hover:scale-105 transition">
                    Book a Appointment
                  </Link>
                )}
              </div>

              {/* Table */}
              <div className="overflow-x-auto rounded-lg  bg-white">
                <table className="w-full">
                  <thead>
                    <tr className=" text-primary text-sm font-semibold">
                        <th className="px-4 py-3 text-left bg-primary/8 whitespace-nowrap">
                        Patient ID
                      </th>
                      <th className="px-4 py-3 text-left bg-primary/8 whitespace-nowrap">
                      Patient Name
                      </th>
                      <th className="px-4 py-3 text-left bg-primary/8 whitespace-nowrap">
                        DOB
                      </th>

                      <th className="px-4 py-3 text-left bg-primary/8 whitespace-nowrap">
                        Gender
                      </th>
                      <th className="px-4 py-3 text-left bg-primary/8 whitespace-nowrap">
                        Type
                      </th>
                  
                      <th className=" px-4 py-3 text-left bg-primary/8 whitespace-nowrap">
                        Medical History
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
                        <td className="px-4 py-4 font-bold text-sm leading-9 text-primary whitespace-nowrap">
                          #{item.unique_id}
                        </td>
                        <td className="px-4 py-4 font-bold text-sm leading-9 text-primary whitespace-nowrap">
                          {item.user_name}                        </td>

                        <td className="px-4 py-4 text-sm text-primary font-semibold whitespace-nowrap">
                          {item.dob}
                        </td>
                        <td className="px-4 py-4 leading-9 text-sm text-primary font-semibold capitalize whitespace-nowrap">
                         {item.gender}
                        </td>
                        <td className="px-4 py-4 leading-9 text-sm text-primary font-semibold capitalize whitespace-nowrap">
                        {"Direct"}
                        </td>
                        <td className="px-4 py-4 text-sm text-primary font-semibold whitespace-nowrap">
                          <div onClick={() => {
                          
                            setSelectedPatient(item);
                            setOpenModal(true);
                           
                          
                          }}
                           className={`flex gap-2 hover:text-gray-500 cursor-pointer`}  >
                            <FaEye className={`text-xl hover:text-gray-500 cursor-pointer`} /> View
                          </div>
                        </td>
                             
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
     {openModal && selectedPatient?.id && (<MedicalHistoryTable isOpen={openModal} onClose={() => setOpenModal(false)} id={selectedPatient?.id} />)}
    

      </WrapperBanner>
   
    </>
  );
}
