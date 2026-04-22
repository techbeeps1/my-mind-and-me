"use client";

import { useEffect, useRef, useState } from "react";
import { IoSend } from "react-icons/io5";
import { getConversation, SendConversation } from "@/services/api";

import LoadingSpin from "./LoadingSpin";
import { useProfile } from "@/services/ProfileContext";
import { Patient } from "@/app/(commanpages)/referral-history/page";

export interface BookingHistoryType {
  id: string;
  notes: string;
  created_at: string;
  role: string;
  user_name: string;
}

type SessionModalProps = {
  isOpen: boolean;
  onClose: () => void;
  data: Patient;
};

export default function PrivateNotesTable({
  isOpen,
  onClose,
  data
}: SessionModalProps) {
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  const [message, setMessage] = useState("");
  const [loading, setLanding] = useState(true);

  const { MMMUserData } = useProfile();
  const [medicalHistoryUpdate, setMedicalHistoryUpdate] = useState(0);

  const [BookingHistory, setBookingHistory] = useState<BookingHistoryType[]>(
    [],
  );

   

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [BookingHistory]);

  useEffect(() => {
    setTimeout(() => {
      setLanding(true);
    }, 1);
    const payload = {
      patient_id: data.patient_id,
      practitioner_id: data.practitioner_id,
      referrer_id: data.doctor_id,
      role: MMMUserData?.role ?? "practitioner",
    };
    getConversation(payload)
      .then((data) => {
        setLanding(false);
        if (data.success) {
          setBookingHistory(data.data);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, [MMMUserData, data, medicalHistoryUpdate]);

  const handleSend = async () => {
    if (!message.trim()) return;
    try {
      const payload = {
        patient_id: data.patient_id,
        practitioner_id: data.practitioner_id,
        referrer_id: data.doctor_id,
        role: MMMUserData?.role ?? "practitioner",
        notes: message,
      };
        SendConversation(payload).then((data) => {
          if (data.success) {
            setMedicalHistoryUpdate((prev) => prev + 1);
          }
        }).catch((err) => {
          console.error(err);
        });
      if (!MMMUserData) return;
      const newData = {
        id: Math.random().toString(),
        notes: message,
        created_at: new Intl.DateTimeFormat("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }).format(new Date()),
        role: MMMUserData.role,
        user_name: MMMUserData?.user_name ?? "You",
      };
      setBookingHistory((prev) => [...prev, newData]);
      setMessage("");
      // setMedicalHistoryUpdate((prev) => prev + 1);
    } catch (err) {
      console.error(err);
    }
  };
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={onClose}
        />
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-1 text-white cursor-pointer font-bold h-7.5 w-7.5 rounded-full bg-primary text-sm flex items-center justify-center"
          >
            ✕
          </button>

          <div className="s w-[70vw] bg-[linear-gradient(11deg,var(--color-AquaBlue)_-80%,var(--color-white)_34%)]  rounded-[10px] shadow-xl h-fit ">
            <h2 className="text-center rounded-t-[10px] bg-[linear-gradient(90deg,#56e1e845_70%,var(--color-background)_100%)]  w-full text-primary md:text-[25px] text-[20px] leading-9 py-3 font-semibold md:mb-5 mb-1.5">
              Private Notes
            </h2>
          
       
              <div className="md:px-12.5 px-5 md:pb-12.5 pb-5 rounded-xl">
                <div
                  className="bg-white rounded-lg p-4 h-[60vh] overflow-y-auto space-y-4 custom-scroll+  "
                >

                  {BookingHistory.length === 0 && (
                    <>
                    { loading ? (
                       <div className="flex-1 flex justify-center items-center h-[48vh] ">
                <LoadingSpin color="bg-primary" />
              </div>):(
                    <div className="text-center text-gray-400 py-10">
                      No private notes available.
                    </div>
              )}</>
                  )}
          
                  {BookingHistory.map((item) => {
                    const isDoctor = item.role !== MMMUserData?.role;

                    return (
                      <>
                        <div
                          key={item.id}
                          className={`flex ${isDoctor ? "justify-start" : "justify-end"}`}
                        >
                          <div
                            className={`max-w-[70%] px-4 py-3 rounded-2xl shadow-sm ${
                              isDoctor
                                ? "bg-[#56e1e845] text-gray-800"
                                : "bg-primary text-white"
                            }`}
                          >
                            {/* Header */}
                            <div className="text-xs opacity-70 mb-1 flex justify-between gap-2">
                              <span>{item.user_name}</span>
                              <span>{item.created_at}</span>
                            </div>

                            {/* Message */}
                            <div className="text-sm leading-relaxed">
                              {item.notes}
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })}
                  <div ref={chatEndRef} />
                </div>

                <div className="pt-2 flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Type a message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="flex-1 px-4 py-4 rounded bg-gray-100 outline-none"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleSend();
                    }}
                  />

                  <button
                    onClick={handleSend}
                    className="cursor-pointer p-2.5 text-center rounded-full bg-primary text-white hover:translate-x-0.5 transition"
                  >
                    <IoSend className="text-2xl" />
                  </button>
                </div>
              </div>
         
          </div>
        </div>
      </div>

      
    </>
  );
}
