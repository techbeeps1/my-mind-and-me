"use client";
import LoadingSpin from "@/components/LoadingSpin";
import WrapperBanner from "@/components/WraperBanner";
import { GetReferralHistory } from "@/services/api";
import { useProfile } from "@/services/ProfileContext";

import { useEffect, useMemo, useState } from "react";
import { FiSearch } from "react-icons/fi";




export type PatientStatus = "Active" | "Inactive";

export interface Patient {
  id: string;
  urgency_level: string;
  preferred_modality: string;
  clinical_presentation: string;
  chief_complaint: string;
  status: PatientStatus;
  created_at: string;
  patient_name: string;
  doctor_name: string;     
}

 

export default function ReferralHistory() {
   const { MMMUserData } = useProfile();
  const [search, setSearch] = useState("");
  const [landing, setLanding] = useState(true);
  const[patients, setPatients] = useState<Patient[]>([]);


  const [statusFilter, setStatusFilter] = useState<PatientStatus | "All">(
    "All",
  );

  useEffect(() => {
    if (!MMMUserData) return;
    GetReferralHistory(MMMUserData?.role,MMMUserData?.id).then((data) => {

         setLanding(false);
        setPatients(data.data);
        
    }).catch((error) => {     
       console.error("Error fetching referral history:", error);
    })
  }, [MMMUserData]);


const filteredData = useMemo(() => {
  return patients.filter((item) => {
    const matchesSearch =
      item.patient_name.toLowerCase().includes(search.toLowerCase()) ||
      item.doctor_name.toLowerCase().includes(search.toLowerCase()) ||
      item.urgency_level.toLowerCase().includes(search.toLowerCase()) ||
      item.preferred_modality.toLowerCase().includes(search.toLowerCase()) ||
      item.clinical_presentation.toLowerCase().includes(search.toLowerCase()) ||
      item.chief_complaint.toLowerCase().includes(search.toLowerCase()) ||
      item.created_at.toLowerCase().includes(search.toLowerCase());


    const matchesStatus =
      statusFilter === "All" || item.status === statusFilter;

    return matchesSearch && matchesStatus;
  });
}, [search, statusFilter, patients]);

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
              Referral History
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

                <select
                  value={statusFilter}
                  onChange={(e) =>
                    setStatusFilter(e.target.value as PatientStatus | "All")
                  }
                  className="text-primary text-sm px-4 py-2.5 rounded-md  leading-5 bg-primary/8 outline-none"
                >
                  <option value="All">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              {/* Table */}
              <div className="overflow-x-auto rounded-lg  bg-white">
                <table className="w-full">
                  <thead>
                    <tr className=" text-primary text-sm font-semibold">
                      <th className="px-4 py-3 text-left bg-primary/8 rounded-tl-lg">Patient Name</th>
                      <th className="px-4 py-3 text-left bg-primary/8">Date</th>            
                      <th className="px-4 py-3 text-left bg-primary/8">Urgency Level</th>                 
                      <th className="px-4 py-3 text-left bg-primary/8">Preferred Modality</th>
                      <th className="px-4 py-3 text-left bg-primary/8">Clinical Presentation</th>
                      <th className="px-4 py-3 text-left bg-primary/8">Chief Complaint</th>
                      <th className="px-4 py-3 text-left bg-primary/8">{ MMMUserData?.role == 'practitioner' ? 'Doctor Name' : 'Practitioner Name' }</th>
                      <th className="px-4 py-3 text-right bg-primary/8 rounded-tr-lg">Status</th>
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
                        <td className="px-4 py-4 flex items-center gap-3">
        
                          <span className="font-bold text-sm leading-9 text-primary">
                            {item.patient_name}
                          </span>
                        </td>

                        <td className="px-4 py-4 text-sm text-primary font-semibold">
                          <div>{item.created_at}</div>
                        </td>
                        <td className="px-4 py-4 leading-9 text-sm text-primary font-semibold">
                          {item.urgency_level}
                        </td>
                        <td className="px-4 py-4 leading-9 text-sm text-primary font-semibold">
                          {item.preferred_modality == "Both" ? "Psychiatric Assessment, Therapy" : item.preferred_modality}
                        </td>
                        <td className="px-4 py-4 leading-9 text-sm text-primary font-semibold">
                          {item.clinical_presentation}
                        </td>
                        <td className="px-4 py-4 leading-9 text-sm text-primary font-semibold">
                          {item.chief_complaint}
                        </td>

                        <td className="px-4 py-4 leading-9 text-sm text-primary font-semibold">
                          {item.doctor_name}
                        </td>

                        <td className="px-4 py-4 text-right">
                          {item.status === "Active" ? (
                            <span className="px-4.25 py-1.25 text-sm font-semibold text-primary bg-primary/8 rounded-[3px]">
                              Active
                            </span>
                          ) : (
                            <span className="px-4.25 py-1.25 text-sm font-semibold text-[#B80600] bg-[#B80600]/8 rounded-[3px] capitalize">
                              {item.status}
                            </span>
                          )}
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
