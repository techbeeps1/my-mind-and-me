"use client";
import WrapperBanner from "@/components/WraperBanner";
import { useEffect, useMemo, useState } from "react";
import { FiSearch } from "react-icons/fi";

import { GetInsuranceData } from "@/services/api";
import LoadingSpin from "@/components/LoadingSpin";

import Link from "next/link";
export interface Patient {
  id: number;
  Practitioner_name: string;
  Date: string;
  Time: string;  
  Appointment_Fee: string;
  Status: string;
  Action: string;  
}



export default function Insurance() {
  const [landing, setLanding] = useState(true);
  const [patients, setPatients] = useState<Patient[]>([]);
 
  const [MMMUserData] = useState(() => {
    if (typeof window === "undefined") return null;
    const data = localStorage.getItem("MMMDT");
    return data ? JSON.parse(data) : null;
  });




  const [search, setSearch] = useState("");

const filteredData = useMemo(() => {
  return patients.filter((item) => {
    const matchesSearch =

      item.Practitioner_name.toLowerCase().includes(search.toLowerCase()) ||
      item.Date.toLowerCase().includes(search.toLowerCase()) ||
      item.Time.toLowerCase().includes(search.toLowerCase()) ||
      item.Appointment_Fee.toLowerCase().includes(search.toLowerCase());
      item.Status.toLowerCase().includes(search.toLowerCase());
      item.Action.toLowerCase().includes(search.toLowerCase());
       
    return matchesSearch;
  });
}, [search, patients]);



     useEffect(() => {
     GetInsuranceData(MMMUserData?.id)
       .then((data) => {
         setLanding(false);
         console.log("Patient Profile Data:", data);
         //setPatients(data.data);
       })
       .catch((err) => {
         console.error(err);
       });
   }, []);
 
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
              Booking History
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
                  <Link href={"/book-a-appointment"} className="px-4 cursor-pointer py-2 rounded-full bg-gradient-to-r from-teal-400 to-teal-700 text-white font-semibold shadow-lg hover:scale-105 transition">
        Book a Appointment
      </Link>
              </div>

              {/* Table */}
              <div className="overflow-x-auto rounded-lg  bg-white">
                <table className="w-full">
                  <thead>
                    <tr className=" text-primary text-sm font-semibold">
                      <th className="px-4 py-3 text-left bg-primary/8 rounded-tl-lg">
                        Practitioner Name
                      </th>                      
                      <th className="px-4 py-3 text-left bg-primary/8">
                        Date
                      </th>
                      <th className="px-4 py-3 text-left bg-primary/8">
                        Time
                      </th>
                      <th className="px-4 py-3 text-left bg-primary/8 ">
                        Appointment Fee
                      </th>
                       <th className="px-4 py-3 text-left bg-primary/8">
                        Status
                      </th> 
                      <th className="px-4 py-3 text-left bg-primary/8">
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
