"use client";
import WrapperBanner from "@/components/WraperBanner";

import { FaVideo } from "react-icons/fa";

import { useEffect, useMemo, useState } from "react";
import ResourceVideoPlayer from "@/components/ResourceVideoPlayer";
import ResourcePaid from "@/components/ResourcePaid";
import { GetResources } from "@/services/api";
import LoadingSpin from "@/components/LoadingSpin";
import { FiSearch } from "react-icons/fi";
import { useProfile } from "@/services/ProfileContext";

interface ResourcesType {
  id: string;
  title: string;
  type: string;
  url: string;
  is_paid: string;
  price: string;
  description: string;
}

export default function Progress() {
     const { MMMUserData } = useProfile();
  const [selectedSessionFree, setSelectedSessionFree] = useState("");
  const [selectedSessionPaid, setSelectedSessionPaid] = useState("");
  const [landing, setLanding] = useState(true);
  const [Resources, setResources] = useState<ResourcesType[]>([]);

  const [search, setSearch] = useState("");

  const filteredData = useMemo(() => {
    return Resources.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase());

      return matchesSearch;
    });
  }, [search, Resources]);

  useEffect(() => {
    if(!MMMUserData) return;
    GetResources("Video",MMMUserData?.id).then((data) => {
      if(data.success){
      setResources(data.data);
      }
      
      setLanding(false);
    });
  }, [MMMUserData]);

  return (
    <>
      <WrapperBanner>
        <div className="flex-1 flex justify-start md:p-7.5 px-5 py-7.5">
          <div className=" w-full bg-[linear-gradient(11deg,var(--color-AquaBlue)_-80%,var(--color-white)_34%)]  rounded-[10px] shadow-xl h-fit ">
            <h2 className="text-center rounded-t-[10px] bg-[linear-gradient(90deg,#56e1e845_70%,var(--color-background)_100%)]  w-full text-primary md:text-[25px] text-[20px] leading-9 py-3 font-semibold ">
              Progress
            </h2>

        <div className="flex px-7.5 flex-wrap md:gap-0 gap-4 pt-5.5 pb-7.5">
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
                      {landing && <div className="flex justify-center min-h-[200px]"><LoadingSpin color="bg-primary" /></div>}
                                   
              <div className="grid px-7.5 2xl:grid-cols-5 xl:grid-cols-4 sm:grid-cols-3 gap-5 mb-12.5 ">
      {!filteredData.length && !landing && <div className="col-span-5 text-center text-gray-500">No videos found.</div>}
           
              {filteredData.map((item) => (
                <div
                  onClick={() =>
                    item.is_paid === "Paid"
                      ? setSelectedSessionPaid(item.id)
                      : setSelectedSessionFree(item.id)
                  }
                  key={item.id}
                  className="cursor-pointer relative w- max-w-full bg-white rounded-[10px] border-2 border-primary/8 shadow-[0_0_6px_0_hsl(0deg_0%_0%/6%)] p-2.5"
                >
                  <span
                    className={`absolute top-2.5 left-2.5  px-2 py-1 text-sm rounded-[3px] text-white font-semibold ${item.is_paid === "Paid" ? "bg-yellow-600" : item.is_paid === "Free" ? "bg-[#2aac66]" : "bg-primary"}`}
                  >
                    {item.is_paid}
                  </span>
                  <div className="bg-[#B8E1D9] rounded-[10px] h-30 flex items-center justify-center mb-2.5">
                    <FaVideo className="text-primary w-15 h-15" />
                  </div>
                  <h3 className="text-primary text-sm font-semibold mb-2.5">
                    {item.title}
                  </h3>
                        <span className="px-3.25 py-1.25 text-sm rounded-[3px] bg-MintGreen/31 text-[#0EA761] font-semibold">
                  Completed
                </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </WrapperBanner>

      <ResourceVideoPlayer
        isOpen={selectedSessionFree}
        onClose={() => setSelectedSessionFree("")}
      />

      <ResourcePaid
        key={selectedSessionPaid}
        data={{
          id: selectedSessionPaid,
          name:
            Resources.find((item) => item.id === selectedSessionPaid)?.title ||
            "",
          type: "Video Session",
          amount:
            Resources.find((item) => item.id === selectedSessionPaid)?.price ||
            "",
        }}
        isOpen={selectedSessionPaid}
        onClose={() => setSelectedSessionPaid("")}
      />
    </>
  );
}
