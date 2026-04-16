"use client";

import { FaVideo } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";

import { useEffect, useMemo, useState } from "react";

import { addResourceInProgress, GetResources } from "@/services/api";
import LoadingSpin from "@/components/LoadingSpin";
import { useProfile } from "@/services/ProfileContext";
import { IoNewspaperSharp } from "react-icons/io5";
import { toastTBS } from "@/lib/toast";

interface ResourcesType {
  id: string;
  title: string;
  type: string; // Video | Audio
  url: string;
  is_paid: string;
  price: string;
  description: string;
}

interface SelectedItemsType {
  id: string;
  status: string;
}

export default function AddResourcesForPetient({ setClose,patient_id,setBookingUpdate }: { setClose: React.Dispatch<React.SetStateAction<boolean>>; patient_id: string; setBookingUpdate: React.Dispatch<React.SetStateAction<number>> }) {
  const { MMMUserData } = useProfile();

  const [landing, setLanding] = useState(true);
  const [Resources, setResources] = useState<ResourcesType[]>([]);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<"All" | "Video" | "Reflection Questions">("All")
  const [selectedItems, setSelectedItems] = useState<SelectedItemsType[]>([]);
  const [submitting, setSubmitting] = useState(false);


  useEffect(() => {
    if (!MMMUserData) return;
    Promise.all([
      GetResources("Video", MMMUserData?.id),
      GetResources("Reflection Questions", MMMUserData?.id),
    ]).then(([videoRes, audioRes]) => {
      let allData: ResourcesType[] = [];
      if (videoRes.success) allData = [...allData, ...videoRes.data];
      if (audioRes.success) allData = [...allData, ...audioRes.data];
      setResources(allData);
      setLanding(false);
    });
  }, [MMMUserData]);

  const filteredData = useMemo(() => {
    return Resources.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase());
      const matchesTab =
        activeTab === "All" ? true : item.type === activeTab;

      return matchesSearch && matchesTab;
    });
  }, [search, Resources, activeTab]);



const handleToggle = (id: string) => {
  setSelectedItems((prev) => {
    const exists = prev.find((i) => i.id === id);
    if (exists) {
      return prev.filter((i) => i.id !== id);
    } else {
      return [...prev, { id, status: "pending" }];
    }
  });
};

  const handleSubmit = async () => {
    if (!selectedItems.length) return;
    setSubmitting(true);
    if (!MMMUserData?.id && !patient_id) return;
    try {
      const payload = {
         patient_id: patient_id,
         practitioner_id: MMMUserData?.id || "",
        resources:  selectedItems.map((item) => ({
          resource_id: item.id,
          status: item.status,
        })),
      };

      addResourceInProgress(payload).then((res) => {
        if (res.success) {
          toastTBS.success("Booking status updated successfully");
          setSelectedItems([]);
          setClose(false);
          setBookingUpdate((prev) => prev + 1);        
        } else {
          toastTBS.error("Error adding resources");
        }
      }).catch((err) => {
        console.error(err);
        toastTBS.error("Error adding resources");
      });
  
    } catch (err) {
      console.error(err);
    }

    setSubmitting(false);
  };

  return (
    <div className="flex-1">
      <div className="w-full bg-white rounded-xl shadow-lg">

        {/* HEADER */}
        <h2 className="text-center rounded-t-[10px] bg-[linear-gradient(90deg,#56e1e845_70%,var(--color-background)_100%)]  w-full text-primary md:text-[25px] text-[20px] leading-9 py-3 font-semibold mb-5">
          Add Resources for Patient
        </h2>
           

        <div className="flex gap-4 px-6 pb-3">
          {["All", "Video", "Reflection Questions"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as "All" | "Video" | "Reflection Questions")}
              className={`px-4 py-1 rounded-full text-sm font-medium
                ${
                  activeTab === tab
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-gray-600"
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* SEARCH */}
        <div className="px-6 pb-4 flex justify-between items-center">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-gray-100 px-4 py-2 rounded-md outline-none"
            />
            <FiSearch className="absolute right-3 top-1/2 -translate-y-1/2" />
          </div>

      
        </div>

        {/* LOADING */}
        {landing && (
          <div className="flex justify-center py-10">
            <LoadingSpin color="bg-primary" />
          </div>
        )}

        {/* GRID */}
        <div className="grid grid-cols-5 gap-4 px-6 pb-6">

          {!filteredData.length && !landing && (
            <p className="col-span-5 text-center text-gray-500">
              No resources found
            </p>
          )}

          {filteredData.map((item) => {
            const isSelected = selectedItems.some((i) => i.id === item.id);

            return (
              <div
                key={item.id}
                onClick={() => handleToggle(item.id)}
                className={`cursor-pointer p-3 rounded-lg border-2 relative 
                  ${
                    isSelected
                      ? "border-primary bg-primary/10"
                      : "shadow-[0_0_6px_0_hsl(0deg_0%_0%/6%)] border-primary/8"
                  }`}
              >
                {/* CHECKBOX */}
                <input
                  type="checkbox" 
                  checked={isSelected}
                  onChange={() => handleToggle(item.id)}
                  className="opacity-0 absolute top-2 right-2"
                />

                {/* TYPE ICON */}
                <div className="h-24 flex items-center justify-center rounded mb-2 bg-[#B8E1D9]">
                  {item.type === "Video" ? (
                   <FaVideo className="text-primary w-15 h-15"/>
                  ) : (
                    <IoNewspaperSharp className="text-primary w-15 h-15"  />
                  )}
                </div>

                {/* TITLE */}
                <h3 className="text-sm font-semibold text-primary">
                  {item.title}
                </h3>
              </div>
            );
          })}
        </div>

        {/* SUBMIT */}
        <div className="flex justify-between px-6 pb-6">
              <div className="text-primary font-semibold">
            {selectedItems.length} Selected
          </div>
          <div className="flex gap-4">
          <button
         onClick={() => {setClose(false); setBookingUpdate((prev) => prev + 1);    toastTBS.success("Booking status updated successfully");     }}
            className="bg-primary text-white px-6 py-2 rounded-md disabled:opacity-50"
          >
            Skip
          </button>
          <button
            onClick={handleSubmit}
            disabled={!selectedItems.length || submitting}
            className="bg-primary text-white px-6 py-2 rounded-md disabled:opacity-50 min-w-[100px] flex items-center justify-center"
          >
            {submitting ? <LoadingSpin width={3} height={13} color="bg-white" /> : "Complete"}
          </button>
          </div>
        </div>
      </div>
    </div>
  );
}