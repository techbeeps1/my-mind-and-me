"use client";
import WrapperBanner from "@/components/WraperBanner";
import { useMemo, useState } from "react";
import { FiSearch } from "react-icons/fi";
import SessionModal from "@/components/SessionModal";
export interface Patient {
  id: number;
  name: string;
  avatar: string;
  date: string;
  time: string;
  referral: string;
  
}

export const patients: Patient[] = [
  {
    id: 1,
    name: "Alexa Rawles",
    avatar: "https://i.pravatar.cc/40?img=47",
    date: "2028-09-20",
    time: "09:00 AM",
    referral: "Dr. Paul Carter",
   
  },
  {
    id: 2,
    name: "Alexa Rawles",
    avatar: "https://i.pravatar.cc/40?img=47",
    date: "2028-09-20",
    time: "09:00 AM",
    referral: "Dr. Paul Carter",
   
  },
];

export default function Insurance() {
  const [search, setSearch] = useState("");
  const filteredData = useMemo(() => {
    return patients.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.referral.toLowerCase().includes(search.toLowerCase());
      return matchesSearch;
    });
  }, [search]);
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      <WrapperBanner>
        <div className="flex-1 flex justify-start md:p-7.5 px-5 py-7.5">
          <div className="max-w-337.5 w-full bg-[linear-gradient(11deg,var(--color-AquaBlue)_-80%,var(--color-white)_34%)]  rounded-[10px] shadow-xl h-fit ">
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
                          Alexa Rawles
                        </td>

                        <td className="px-4 py-4 text-sm text-primary font-semibold">                         
                          123456
                        </td>

                        <td className="px-4 py-4 leading-9 text-sm text-primary font-semibold">
                          Text
                        </td>
                         <td className="px-4 py-4 leading-9 text-sm text-primary font-semibold">
                          Text
                        </td>

                       <td className="px-4 py-4 text-sm text-primary font-semibold">
                          <div>2028-09-20</div>
                          <div className="text-xs text-primary/54">
                            09:00 AM
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
        <SessionModal isOpen={openModal} onClose={() => setOpenModal(false)} />
      </WrapperBanner>
    </>
  );
}
