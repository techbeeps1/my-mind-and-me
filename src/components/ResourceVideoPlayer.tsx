"use client";
import { changeProgressStatus } from "@/services/api";
import { useProfile } from "@/services/ProfileContext";
import LoadingSpin from "./LoadingSpin";
import { useState } from "react";

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
  data:ResourcesType | undefined;
  onClose: () => void;
};

export default function ResourceVideoPlayer({
  isOpen,
  data,
  onClose,
}: SessionModalProps) {

  const { MMMUserData } = useProfile();

  function handleMarkAsCompleted() {
  changeProgressStatus({ userID: MMMUserData?.id || "", resourceID: data?.id || "" }).then((res) => {
    if(res.success){
      console.log("Progress Updated:", res.data);
      onClose();
    }else{
      console.error("Progress Update Failed:");
    }
  }).catch((err) => {
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
      <div className="relative bg-white w-180 rounded-2xl shadow-2xl p-6 z-50 animate-fadeIn">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-1 text-white cursor-pointer font-bold h-7.5 w-7.5 rounded-full bg-primary text-sm flex items-center justify-center"
        >
          ✕
        </button>

        {/* Video Section */}
        <div className="rounded-xl overflow-hidden mb-5">
          <video
            src="https://www.w3schools.com/html/mov_bbb.mp4"
            controls
            controlsList="nodownload noplaybackrate"
            disablePictureInPicture
            onContextMenu={(e) => e.preventDefault()}
            className="w-full h-100 object-cover rounded-xl"
          />
        </div>

        {/* Title */}
        <div className="flex justify-between ">
        <h3 className=" text-[18px] leading-7 font-semibold ">
          {data?.title}
        </h3>
        {data?.status && data?.status !== "completed" && (
        <button onClick={handleMarkAsCompleted} className="flex justify-center items-center gap-2 bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors cursor-pointer">
          Mark as Completed <LoadingSpin width={3} height={15} color="bg-white" />
        </button>
)}
        </div>
      </div>
    </div>
  );
}
