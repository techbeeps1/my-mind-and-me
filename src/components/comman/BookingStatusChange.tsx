"use client";
import { useState } from "react";

import { toastTBS } from "@/lib/toast";
import LoadingSpin from "@/components/LoadingSpin";
import { BookingHistoryType } from "@/app/(commanpages)/booking-history/page";
import { changeBookingStatus } from "@/services/api";
import BookingReschedule from "./BookingReschedule";

export default function BookingStatusChange({ setBookingUpdate,setOpenStatusChange, data, Role }: {setBookingUpdate:React.Dispatch<React.SetStateAction<number>>, setOpenStatusChange: React.Dispatch<React.SetStateAction<boolean>>, data: BookingHistoryType, Role: string }) {

  const [formData, setFormData] = useState({
    type: "",
    reason: "",
  });

  const [openReschedule, setOpenReschedule] = useState(false);
  const [loading, setLoading] = useState(false);



  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmut() {
    if (!formData.type) {
      toastTBS.error("Please select a type");
      return;
    }
    if (formData.type === "cancelled" && !formData.reason) {
      toastTBS.error("Please provide a reason for cancellation");
      return;
    }

    if (formData.type === "rescheduled") {
      setOpenReschedule(true);
      return;
    }

    if( formData.type === "cancelled" && (formData.reason.trim().length < 2 || formData.reason.trim().length > 250) ) {
      toastTBS.error("Reason must be between 2 to 250 characters");
      return;
    }

    if(loading) return;
    setLoading(true);


    changeBookingStatus({
      booking_id: data.id,
      status: formData.type,
      reason: formData.type === "cancelled" ? Role + ": " + formData.reason : "",
    }).then((res) => {

       if(res.success) {
          toastTBS.success("Booking status updated successfully");
       }else {
        toastTBS.success(res.message || "Failed to update booking status");
       }
        setBookingUpdate((prev) => prev + 1); 
          setOpenStatusChange(false);
      setLoading(false);   
    }).catch((err) => {
      console.error(err);
      toastTBS.error("Failed to update booking status");
      setLoading(false);
    });
  }



  return (
    <>
      {!openReschedule ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setOpenStatusChange(false)} />
          <div className="relative bg-white w-125 rounded-2xl shadow-2xl p-6 z-50 animate-fadeIn">
            <button

              className="absolute top-4 right-4 z-1 text-white cursor-pointer font-bold h-7.5 w-7.5 rounded-full bg-primary text-sm flex items-center justify-center"
              onClick={() => setOpenStatusChange(false)}
            >
              ✕
            </button>
            <>
              <h2 className="text-center text-[22px] leading-7 font-semibold mb-2">
                Manage Booking
              </h2>
              <div className="flex md:gap-5 gap-3.75 md:flex-row flex-wrap justify-between">
                <div className="w-full">
                  {/* Name */}
                  <label className="text-sm block font-semibold leading-6 text-primary mb-2">
                    Status
                  </label>
                  <select name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="w-full  text-primary text-sm px-4 py-2.5 rounded-md  leading-5 bg-primary/[0.08] outline-none">

                    <option value="" disabled selected>Select type</option>

                    <option value="cancelled">Cancelled</option>
                    {Role === "practitioner" && (
                      <option value="completed">Completed</option>

                    )}
                    {Role === "patient" && (
                      <option value="rescheduled">Rescheduled</option>
                    )}
                  </select>
                </div>
                {/* Phone */}

                {formData.type === "cancelled" && (
                  <div className="w-full">
                    <label className="block text-sm font-semibold leading-[24px] text-primary mb-[8px]">
                      Reason
                    </label>
                    <div className="flex items-center gap-[12px] bg-primary/[0.08] rounded-md px-[16px] py-[10px]">
                      <textarea

                        name="reason"
                        value={formData.reason}
                        onChange={handleChange}
                        rows={4}
                        placeholder="Enter reason "
                        className="w-full text-primary text-sm placeholder:text-primary leading-[20px] bg-transparent  outline-none text-sm"
                      />

                    </div>
                  </div>
                )}
              </div>

              {/* Button */}
              <button onClick={handleSubmut} className="flex justify-center mt-4 w-full cursor-pointer bg-[linear-gradient(90deg,var(--color-AquaBlue)_-26%,var(--color-primary)_100%)] text-white py-3 text-lg rounded-full font-bold hover:opacity-90 duration-300">
                {loading ? <LoadingSpin width={3} height={18} /> : "Update Now"}
              </button>

            </>
          </div>
        </div>
      ) : (
        <div className="fixed top-0 inset-0 z-50 flex justify-center">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setOpenStatusChange(false)} />
          <div className="relative my-12.5 overflow-y-auto   min-w-[75%] z-50 animate-fadeIn custom-scroll">
            <button
              className="absolute top-4 right-4 z-1 text-white cursor-pointer font-bold h-7.5 w-7.5 rounded-full bg-primary text-sm flex items-center justify-center"
              onClick={() => setOpenStatusChange(false)}
            >✕</button>
            <BookingReschedule setBookingUpdate={setBookingUpdate}  Data={data} />
          </div>
        </div>

      )}
    </>

  )

}




