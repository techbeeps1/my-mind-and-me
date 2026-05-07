"use client";

import { changeProgressStatus } from "@/services/api";
import { useProfile } from "@/services/ProfileContext";
import LoadingSpin from "./LoadingSpin";
import { useState } from "react";
import { toastTBS } from "@/lib/toast";


interface ResourcesType {
  id: string;
  title: string;
  type: string;
  url: string;
  is_paid: string;
  price: string;
  description: string;
  status?: string;
}
type SessionModalProps = {
  isOpen: string | undefined;
  data: ResourcesType | undefined;
  onClose: () => void;
};

export default function ResourceReflectionQ({ 
  isOpen, 
  data,

  onClose 
}: SessionModalProps) {
const { MMMUserData } = useProfile();
const [isUpdating, setIsUpdating] = useState(false);
  function handleMarkAsCompleted() {
    if(isUpdating) return;
    setIsUpdating(true);
     changeProgressStatus({ userID: MMMUserData?.id || "", resourceID: data?.id || "" }).then((res) => {
    if(res.success){
      setIsUpdating(false);
     toastTBS.success("Progress Updated Successfully!");
      onClose();
    }else{
      setIsUpdating(false);
      toastTBS.error("Progress Update Failed");
    }
  }).catch((err) => {
    setIsUpdating(false);
    console.error("API Error:", err);
  });
}

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">

      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white w-180 rounded-2xl shadow-2xl p-6 z-50 animate-fadeIn overflow-y-auto custom-scroll">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-1 text-white cursor-pointer font-bold h-7.5 w-7.5 rounded-full bg-primary text-sm flex items-center justify-center"
        >
          ✕
        </button>

        {/* Video Section */}
        <div className="rounded-xl  mb-5  ">
         <iframe src={data?.url} className="w-full h-[80vh] custom-scroll" >Loading…</iframe>
              </div>
                 {data?.status && data?.status !== "completed" && (
             <div className="flex justify-end">
                <button onClick={handleMarkAsCompleted} className="flex justify-center items-center gap-2 bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors cursor-pointer">
          Mark as Completed {isUpdating && <LoadingSpin width={3} height={15} color="bg-white" />}
        </button>
        </div>)}
       
      </div>
    </div>
  );
}