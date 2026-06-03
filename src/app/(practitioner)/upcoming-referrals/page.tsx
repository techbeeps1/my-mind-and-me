"use client";
import LoadingSpin from "@/components/LoadingSpin";

import WrapperBanner from "@/components/WraperBanner";
import { GetUpcomingReferrals, imagePath } from "@/services/api";
import { useProfile } from "@/services/ProfileContext";

import { useEffect, useMemo, useState } from "react";
import { FiSearch } from "react-icons/fi";

import Pagination from "@/components/comman/Pagination";
import { FaUserAlt } from "react-icons/fa";
import ConfirmModal from "@/components/comman/ConfirmModal";
import Image from "next/image";

export type PatientStatus = "Active" | "Inactive";

export interface Patient {
  id: string;
  urgency_level: string;
  preferred_modality: string;
  created_at: string;
  patient_name: string;
  doctor_name: string;
  profile_image: string;
  
}



export default function ReferralHistory() {
  const { MMMUserData } = useProfile();
  const [search, setSearch] = useState("");
  const [landing, setLanding] = useState(true);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [dashboardUpdate, setDashboardUpdate] = useState(0);
  const [showStatusModal, setShowStatusModal] = useState({id: "", type: ""});


  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (!MMMUserData) return;
    GetUpcomingReferrals(MMMUserData?.id,page,20)
      .then((data) => {
        setLanding(false);
        if(data.success){
        setPatients(data.data);
        setTotalPages(data.total_pages);
        }else{
          setPatients([]);
          setTotalPages(1);
        }
      })
      .catch((error) => {
        console.error("Error fetching referral history:", error);
      });
  }, [MMMUserData, page, dashboardUpdate]);

  const filteredData = useMemo(() => {
    return patients.filter((item) => {
      const matchesSearch =
        item.patient_name.toLowerCase().includes(search.toLowerCase()) ||
        item.doctor_name.toLowerCase().includes(search.toLowerCase()) ||
        item.urgency_level.toLowerCase().includes(search.toLowerCase()) ||
        item.preferred_modality.toLowerCase().includes(search.toLowerCase()) ||

        item.created_at.toLowerCase().includes(search.toLowerCase());

  
      return matchesSearch ;
    });
  }, [search, patients]);

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
              Upcoming Referral
            </h2>
            <div className=" px-12.5 pb-12.5 rounded-xl ">
              {/* Search & Filter */}
              <div className="flex justify-between flex-wrap  mb-5">
                <div className="relative lg:block hidden">
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
                      <th className="px-4 py-3 text-left bg-primary/8 rounded-tl-lg whitespace-nowrap">
                        Patient Name
                      </th>
                   
                      <th className="px-4 py-3 text-left bg-primary/8 whitespace-nowrap">
                        Urgency Level
                      </th>
                      <th className="px-4 py-3 text-left bg-primary/8 ">
                        Preferred Modality
                      </th>
                      <th className="px-4 py-3 text-left bg-primary/8 whitespace-nowrap">
                        Doctor Name
                      </th>
                       <th className="px-4 py-3 text-left bg-primary/8 whitespace-nowrap">Date</th>
                      <th className="px-4 py-3 text-center bg-primary/8 whitespace-nowrap">
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
                        <td className="px-4 py-4 whitespace-nowrap">
                              <div className="flex items-center gap-2">
                                
                                 {item.profile_image ? (
                                                              <Image className="h-13 w-13 object-cover rounded-2xl flex items-center justify-center text-white text-2xl bg-gradient-to-r from-cyan-500 to-teal-500"
                                                                src={imagePath + item.profile_image}
                                                                width={52}
                                                                height={52}
                                                                alt="Patient Image"
                                                              />
                                                            ):( <div className="h-13 w-13 rounded-2xl flex items-center justify-center text-white text-2xl bg-gradient-to-r from-cyan-500 to-teal-500">
                                                        <FaUserAlt /> 
                                                      </div> )}
                          <span className="font-bold text-sm leading-9 text-primary">
                            {item.patient_name}
                          </span>
                          </div>
                        </td>


                        <td className="px-4 py-4 leading-9 text-sm text-primary font-semibold whitespace-nowrap">
                          {item.urgency_level}
                        </td>
                        <td className="px-4 py-4 leading-9 text-sm text-primary font-semibold leading-[1.3]">
                          {item.preferred_modality == "Both"
                            ? "Psychiatric Assessment, Therapy"
                            : item.preferred_modality}
                        </td>
               
                        <td className="px-4 py-4 leading-9 text-sm text-primary font-semibold whitespace-nowrap">
                          {item.doctor_name}
                        </td>
                                                <td className="px-4 py-4 text-sm text-primary font-semibold whitespace-nowrap">
                          <div>{item.created_at}</div>
                        </td>

                        <td className="px-4 py-4">
                                <div className="flex gap-3">
                         <button
                              className="cursor-pointer bg-emerald-500 hover:bg-emerald-600 text-white text-sm px-3 py-1.5 rounded-xl font-semibold transition transition-all hover:-translate-y-1"
                              onClick={() => {
                                setShowStatusModal({id: item.id, type: "accepted"});
                              }}
                            >
                              Accept
                            </button>

                            <button
                              className="cursor-pointer bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1.5 rounded-xl font-semibold transition transition-all hover:-translate-y-1"
                              onClick={() => {
                                setShowStatusModal({id: item.id, type: "rejected"});
                              }}
                            >
                              Reject
                            </button>
                          </div>
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
 <ConfirmModal
        isOpen={!!showStatusModal.id}
        onClose={() => setShowStatusModal({id: "", type: ""})}
        type={showStatusModal.type}
        userId={showStatusModal.id}
       callback={() => setDashboardUpdate((prev) => prev + 1)}
      />
       
      </WrapperBanner>
    </>
  );
}
