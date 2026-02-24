"use client";
import WrapperBanner from "@/app/components/WraperBanner";
import Image from "next/image";
import { useMemo, useState } from "react";
import { FiSearch } from "react-icons/fi";

// data/patients.ts
export type PatientStatus = "Active" | "Inactive";

export interface Patient {
  id: number;
  name: string;
  avatar: string;
  date: string;
  time: string;
  referral: string;
  status: PatientStatus;
}

export const patients: Patient[] = [
  {
    id: 1,
    name: "Alexa Rawles",
    avatar: "https://i.pravatar.cc/40?img=47",
    date: "2028-09-20",
    time: "09:00 AM",
    referral: "Dr. Paul Carter",
    status: "Active",
  },
  {
    id: 2,
    name: "Alexa Rawles",
    avatar: "https://i.pravatar.cc/40?img=47",
    date: "2028-09-20",
    time: "09:00 AM",
    referral: "Dr. Paul Carter",
    status: "Inactive",
  },
];

export default function ReferralHistory() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<PatientStatus | "All">(
    "All",
  );

  const filteredData = useMemo(() => {
    return patients.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.referral.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || item.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);
  return (
    <>
      <WrapperBanner>
        <div className="flex-1 flex justify-start md:p-7.5 px-5 py-7.5">
          <div className="max-w-337.5 w-full bg-[linear-gradient(11deg,var(--color-AquaBlue)_-80%,var(--color-white)_34%)]  rounded-[10px] shadow-xl h-fit ">
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
                      <th className="px-4 py-3 text-left bg-primary/8">Referrals</th>
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
                          <img
                            src={item.avatar}
                            alt={item.name}
                            className="w-9 h-9 rounded-full"
                          />
                          <span className="font-bold text-sm leading-9 text-primary">
                            {item.name}
                          </span>
                        </td>

                        <td className="px-4 py-4 text-sm text-primary font-semibold">
                          <div>{item.date}</div>
                          <div className="text-xs text-primary/54">
                            {item.time}
                          </div>
                        </td>

                        <td className="px-4 py-4 leading-9 text-sm text-primary font-semibold">
                          {item.referral}
                        </td>

                        <td className="px-4 py-4 text-right">
                          {item.status === "Active" ? (
                            <span className="px-4.25 py-1.25 text-sm font-semibold text-primary bg-primary/8 rounded-[3px]">
                              Active
                            </span>
                          ) : (
                            <span className="px-4.25 py-1.25 text-sm font-semibold text-[#B80600] bg-[#B80600]/8 rounded-[3px]">
                              Inactive
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
