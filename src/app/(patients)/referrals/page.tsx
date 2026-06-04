"use client";
import LoadingSpin from "@/components/LoadingSpin";

import WrapperBanner from "@/components/WraperBanner";
import { GetReferralHistory, GetReferralInPatient } from "@/services/api";
import { useProfile } from "@/services/ProfileContext";

import { useEffect, useMemo, useState } from "react";
import { FiSearch } from "react-icons/fi";

import Pagination from "@/components/comman/Pagination";

export type PatientStatus = "Active" | "Inactive";

export interface Patient {
  id: string;
  doctor: string;
  practitioner: string;
  date: string;
  status: string;

}



export default function ReferralHistory() {
  const { MMMUserData } = useProfile();
  const [search, setSearch] = useState("");
  const [landing, setLanding] = useState(true);
  const [patients, setPatients] = useState<Patient[]>([]);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [statusFilter, setStatusFilter] = useState<PatientStatus | "All">(
    "All",
  );

  useEffect(() => {
    if (!MMMUserData) return;
    GetReferralInPatient(MMMUserData?.id,page,20)
      .then((data) => {
        setLanding(false);
        if(data.success){
        setPatients(data.data);
        setTotalPages(data.total_pages || 1);
        }
      })
      .catch((error) => {
        console.error("Error fetching referral history:", error);
      });
  }, [MMMUserData, page]);

  const filteredData = useMemo(() => {
    return patients.filter((item) => {
      const matchesSearch =
        item.doctor.toLowerCase().includes(search.toLowerCase()) ||
        item.practitioner.toLowerCase().includes(search.toLowerCase()) ||
        item.date.toLowerCase().includes(search.toLowerCase()) ||
        item.status.toLowerCase().includes(search.toLowerCase());


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
              Referrals
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
                  <option value="accepted">Accepted</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>

              {/* Table */}
              <div className="overflow-x-auto rounded-lg  bg-white">
                <table className="w-full">
                  <thead>
                    <tr className=" text-primary text-sm font-semibold">
                      <th className="px-4 py-3 text-left bg-primary/8 rounded-tl-lg whitespace-nowrap">
                        Practitioner Name
                      </th>
                      <th className="px-4 py-3 text-left bg-primary/8 whitespace-nowrap">
                       Doctor Name
                      </th>
                      <th className="px-4 py-3 text-left bg-primary/8 whitespace-nowrap">Date</th>        
                      <th className="px-4 py-3 text-right bg-primary/8 whitespace-nowrap">
                        Status
                      </th>
                 
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-primary/8">
                    {filteredData.length === 0 && (
                      <tr>
                        <td
                          colSpan={7}
                          className="text-center py-6 text-sm text-gray-400"
                        >
                          No records found
                        </td>
                      </tr>
                    )}

                    {filteredData.map((item) => (
                      <tr key={item.id}>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <span className="font-bold text-sm leading-9 text-primary">
                            {item.practitioner}
                          </span>
                        </td>
                               <td className="px-4 py-4 leading-9 text-sm text-primary font-semibold whitespace-nowrap">
                          {item.doctor}
                        </td>

                        <td className="px-4 py-4 text-sm text-primary font-semibold whitespace-nowrap">
                          <div>{item.date}</div>
                        </td>
           
         
                 

                        <td className="px-4 py-4 text-right">
                          {item.status === "accepted" ? (
                            <span className="px-4.25 py-1.25 text-sm font-semibold text-green-900 bg-green-100 rounded-[3px]">
                              Accepted
                            </span>
                          ) : item.status === "pending" ? (
                            <span className="px-4.25 py-1.25 text-sm font-semibold text-yellow-900 bg-yellow-100 rounded-[3px] capitalize">
                              {item.status}
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
           <Pagination page={page} setPage={setPage} totalPages={totalPages} />

          </div>
          
        </div>     
        {/* Pagination */}
      </WrapperBanner>
    </>
  );
}
