"use client";
import WrapperBanner from "@/components/WraperBanner";

import { FaVideo } from "react-icons/fa";

import { useEffect, useMemo, useState } from "react";
import ResourceVideoPlayer from "@/components/ResourceVideoPlayer";

import { GetMyPurchases } from "@/services/api";
import LoadingSpin from "@/components/LoadingSpin";
import { FaClock } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { useProfile } from "@/services/ProfileContext";
import { IoNewspaperSharp } from "react-icons/io5";
import ResourceReflectionQ from "@/components/ResourceReflectionQ";

interface ResourcesType {
  id: string;
  title: string;
  type: string;
  url: string;
  is_paid: string;
  price: string;
  description: string;
  end_time: string;
  remaining_time: string;
}

export default function MyPurchases() {
  const { MMMUserData } = useProfile();
  const [selectedSessionVideo, setSelectedSessionVideo] = useState("");
  const [selectedSessionRQ, setSelectedSessionRQ] = useState("");
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
    if (!MMMUserData) return;
    GetMyPurchases(MMMUserData?.id).then((data) => {
      if (data.success) {
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
            <h2 className="text-center rounded-t-[10px] bg-[linear-gradient(90deg,#56e1e845_70%,var(--color-background)_100%)]  w-full text-primary md:text-[25px] text-[20px] leading-9 py-3 font-semibold">
              My Purchases
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
            {landing && (
              <div className="flex justify-center min-h-50">
                <LoadingSpin color="bg-primary" />
              </div>
            )}

            <div className="grid px-7.5 2xl:grid-cols-5 xl:grid-cols-4 sm:grid-cols-3 gap-5 mb-12.5 ">
              {!filteredData.length && !landing && (
                <div className="col-span-5 text-center text-gray-500">
                  No purchases found.
                </div>
              )}
              {filteredData.map((item) => (
                <div
                  onClick={() =>
                    item.type === "Video"
                      ? setSelectedSessionVideo(item.id)
                      : setSelectedSessionRQ(item.id)
                  }
                  key={item.id}
                  className="cursor-pointer relative w- max-w-full bg-white rounded-[10px] border-2 border-primary/8 shadow-[0_0_6px_0_hsl(0deg_0%_0%/6%)] p-2.5"
                >
                  <span className=" flex gap-1 items-center absolute top-2.5 left-2.5 px-2 py-1 text-xs rounded-[3px] bg-yellow-600 text-white font-semibold">
                    <FaClock />
                    {item.remaining_time}
                  </span>
                  <div className="bg-[#B8E1D9] rounded-[10px] h-30 flex items-center justify-center mb-2.5">
                    {item.type === "Video" ? (
                      <FaVideo className="text-primary w-15 h-15" />
                    ) : (
                      <IoNewspaperSharp className="text-primary w-15 h-15" />
                    )}
                  </div>
                  <h3 className="text-primary text-sm font-semibold mb-2.5">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 text-xs">
                    Expires: {item.end_time}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </WrapperBanner>
      <ResourceVideoPlayer
        isOpen={selectedSessionVideo}
        onClose={() => setSelectedSessionVideo("")}
      />
      <ResourceReflectionQ
        isOpen={selectedSessionRQ}
        onClose={() => setSelectedSessionRQ("")}
      />
    </>
  );
}
