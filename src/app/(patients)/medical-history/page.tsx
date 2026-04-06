"use client";
import WrapperBanner from "@/components/WraperBanner";
import { useEffect, useMemo, useState } from "react";
import { FiSearch } from "react-icons/fi";
import SessionModal from "@/components/SessionModal";
import {  Getmedicalhistory } from "@/services/api";
import LoadingSpin from "@/components/LoadingSpin";
export interface Patient {
  id: number;
  created_at: string;
  diagnosis: string;
  doctor_id: string;
  medications: string;
  notes: string;
  patient_id: string;
  patient_name: string;
  doctor_name: string;
  treatment_plan: string;
  updated_at: string;
  
}



export default function MedicalHistory() {
  const [search, setSearch] = useState("");
  const [landing, setLanding] = useState(true);
  const [patientsMedicalHistory, setPatientsMedicalHistory] = useState<Patient[]>([]);

  const [MMMUserData] = useState(() => {
    if (typeof window === "undefined") return null;
    const data = localStorage.getItem("MMMDT");
    return data ? JSON.parse(data) : null;
  });

  const filteredData = useMemo(() => {
    return patientsMedicalHistory.filter((item) => {
      const matchesSearch =
        item.diagnosis.toLowerCase().includes(search.toLowerCase()) ||
        item.treatment_plan.toLowerCase().includes(search.toLowerCase()) ||
        item.medications.toLowerCase().includes(search.toLowerCase()) ||
        item.notes.toLowerCase().includes(search.toLowerCase()) ||
        item.patient_name.toLowerCase().includes(search.toLowerCase());

  
      return matchesSearch;
    });
  }, [search, patientsMedicalHistory]);
  const [openModal, setOpenModal] = useState(false);


      useEffect(() => {
       Getmedicalhistory(MMMUserData?.id)
         .then((data) => {
           setLanding(false);
           if(data.status){
            setPatientsMedicalHistory(data.data);
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
          <div className="max-w-337.5 w-full bg-[linear-gradient(11deg,var(--color-AquaBlue)_-80%,var(--color-white)_34%)]  rounded-[10px] shadow-xl h-fit ">
            <h2 className="text-center rounded-t-[10px] bg-[linear-gradient(90deg,#56e1e845_70%,var(--color-background)_100%)]  w-full text-primary md:text-[25px] text-[20px] leading-9 py-3 font-semibold md:mb-11.25 mb-7.5">
              Medical History
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
                      <th className="px-4 py-3 text-left bg-primary/8 rounded-tl-lg">
                        Diagnosis
                      </th>                      
                      <th className="px-4 py-3 text-left bg-primary/8">
                        Treatment Plan
                      </th>
                      <th className="px-4 py-3 text-left bg-primary/8">
                        Medications
                      </th>
                      <th className="px-4 py-3 text-left bg-primary/8 ">
                        Date
                      </th>
                      <th className="px-4 py-3 text-left bg-primary/8">
                        Doctor Name
                      </th>
                      <th className="px-4 py-3 text-left  bg-primary/8 rounded-tr-lg">
                        Notes
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
                        <td className="px-4 py-4 text-sm text-primary font-semibold">                         
                          {item.diagnosis}
                        </td>

                        <td className="px-4 py-4 text-sm text-primary font-semibold">                         
                          {item.treatment_plan}
                        </td>

                        <td className="px-4 py-4 leading-9 text-sm text-primary font-semibold">
                          {item.medications}
                        </td>
                        <td className="px-4 py-4 text-sm text-primary font-semibold">
                          <div>{item.created_at}</div>
                                                
                        </td>

                        <td className="px-4 py-4 font-bold text-sm leading-9 text-primary">
                          {item.doctor_name}
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
          </div>
        </div>
        <SessionModal isOpen={openModal} onClose={() => setOpenModal(false)} />
      </WrapperBanner>
    </>
  );
}
