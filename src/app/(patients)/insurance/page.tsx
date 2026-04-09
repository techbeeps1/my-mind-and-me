"use client";
import WrapperBanner from "@/components/WraperBanner";
import { useEffect, useMemo, useState } from "react";
import { FiSearch } from "react-icons/fi";
import SessionModal from "@/components/SessionModal";
import { GetInsuranceData } from "@/services/api";
import LoadingSpin from "@/components/LoadingSpin";
import { IoMdArrowRoundBack } from "react-icons/io";

import AddInsurance from "@/components/comman/AddInsurance";
export interface Patient {
  id: number;
  insurance_name: string;
  notes: string;
  full_name: string;
  policy_number: string;
  end_date: string;
  start_date: string;
  created_at: string;
  coverage_details: string;
  patient_id:string;
  
}



export default function Insurance() {
  const [landing, setLanding] = useState(true);
  const [patients, setPatients] = useState<Patient[]>([]);
   const [uploadModal, setUploadModal] = useState(false);
  const [MMMUserData] = useState(() => {
    if (typeof window === "undefined") return null;
    const data = localStorage.getItem("MMMDT");
    return data ? JSON.parse(data) : null;
  });




  const [search, setSearch] = useState("");

const filteredData = useMemo(() => {
  return patients.filter((item) => {
    const matchesSearch =

      item.insurance_name.toLowerCase().includes(search.toLowerCase()) ||
      item.policy_number.toLowerCase().includes(search.toLowerCase()) ||
      item.coverage_details.toLowerCase().includes(search.toLowerCase()) ||
      item.notes.toLowerCase().includes(search.toLowerCase());
       
    return matchesSearch;
  });
}, [search, patients]);



     useEffect(() => {
     GetInsuranceData(MMMUserData?.id)
       .then((data) => {
         setLanding(false);
         if(data.status){
 setPatients(data.data);
         }
   
        
       })
       .catch((err) => {
         console.error(err);
       });
   }, [MMMUserData?.id,uploadModal]);
 
 if (landing) {
    return (
      <WrapperBanner>
        <div className="flex-1 flex justify-center items-center h-[70vh]">
          <LoadingSpin />
        </div>
      </WrapperBanner>
    );
  }

if (uploadModal) {
  return (
       <WrapperBanner>
    <div className="relative">
          
        <button onClick={() => setUploadModal(false)} className="px-2 py-2 rounded-full bg-gradient-to-r from-teal-400 to-teal-700 text-white font-semibold shadow-lg hover:scale-105 transition absolute top-10 left-10 text-2xl font-bold">
          <IoMdArrowRoundBack />
        </button>

        <AddInsurance />
    
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
              Insurance
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
                  <button className="absolute top-1/2 right-6 z-1  text-primary -translate-y-1/2 transform ">
                    <FiSearch className=" h-5 w-5  " />
                  </button>
                </div>
                  <button onClick={() => setUploadModal(true)} className="px-4 py-2 cursor-pointer rounded-full bg-gradient-to-r from-teal-400 to-teal-700 text-white font-semibold shadow-lg hover:scale-105 transition">
        Add New Insurance
      </button>
              </div>

              {/* Table */}
              <div className="overflow-x-auto rounded-lg  bg-white">
                <table className="w-full">
                  <thead>
                    <tr className=" text-primary text-sm font-semibold">
                      <th className="px-4 py-3 text-left bg-primary/8 rounded-tl-lg">
                        Insurance name
                      </th>                      
                      <th className="px-4 py-3 text-left bg-primary/8">
                        Policy Number
                      </th>
                      <th className="px-4 py-3 text-left bg-primary/8">
                        Coverage Details
                      </th>
                      <th className="px-4 py-3 text-left bg-primary/8 ">
                        Notes
                      </th>
                       <th className="px-4 py-3 text-left bg-primary/8">
                        Date
                      </th> 
                      <th className="px-4 py-3 text-left bg-primary/8">
                       Expiry date
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
                          {item.insurance_name}                        </td>

                        <td className="px-4 py-4 text-sm text-primary font-semibold">                         
                          {item.policy_number}
                        </td>

                        <td className="px-4 py-4 leading-9 text-sm text-primary font-semibold">
                          {item.coverage_details}
                        </td>
                         <td className="px-4 py-4 leading-9 text-sm text-primary font-semibold">
                          {item.notes}
                        </td>

                       <td className="px-4 py-4 text-sm text-primary font-semibold">
                          {item.start_date}            
                        </td>
                           <td className="px-4 py-4 text-sm text-primary font-semibold">
                          {item.end_date}
                         
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
