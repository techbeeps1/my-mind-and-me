"use client";
import { useState } from "react";

import { toastTBS } from "@/lib/toast";
import LoadingSpin from "@/components/LoadingSpin";
import { BookingHistoryType } from "@/app/(commanpages)/booking-history/page";
import { changeBookingStatus } from "@/services/api";

import AddResourcesForPetient from "./AddResourcesForPetient";
import BookingReschedule from "./BookingReschedule";

export default function BookingStatusChange({
  setBookingUpdate,
  setOpenStatusChange,
  data,
  Role,
}: {
  setBookingUpdate: React.Dispatch<React.SetStateAction<number>>;
  setOpenStatusChange: React.Dispatch<React.SetStateAction<boolean>>;
  data: BookingHistoryType;
  Role: string;
}) {
  const [formData, setFormData] = useState({
    type: "",
    reason: "",
    medical_note: "",
    private_note: "",
  });

  const [openReschedule, setOpenReschedule] = useState(false);
  const [bookingIsCompleted, setBookingIsCompleted] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) {
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

    if (
      formData.type === "cancelled" &&
      (formData.reason.trim().length < 2 || formData.reason.trim().length > 250)
    ) {
      toastTBS.error("Reason must be between 2 to 250 characters");
      return;
    }

if (formData.type === "completed") {

  if (formData.medical_note.trim().length < 5 || formData.medical_note.trim().length > 250) {
    toastTBS.error("Medical note for patient must be between 5 to 250 characters");
    return;
  }

  if (formData.private_note.trim().length < 5 || formData.private_note.trim().length > 250) {
    toastTBS.error("Private note for doctor must be between 5 to 250 characters");
    return;
  }
}
    

    if (loading) return;
    setLoading(true);
   
    changeBookingStatus({
      booking_id: data.id,
      status: formData.type,
      reason:
        formData.type === "cancelled" ? Role + ": " + formData.reason : "",
      medical_note: formData.medical_note,
      private_note: formData.private_note,
    })
      .then((res) => {
        if (res.success) {
        
          if (formData.type === "completed") {
            setBookingIsCompleted(true);
            
          }
          else {
            toastTBS.success(res.message);
            setOpenStatusChange(false);
            setBookingUpdate((prev) => prev + 1);
          }

        } else {
          toastTBS.error(res.message || "Failed to update booking status");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        toastTBS.error("Failed to update booking status");
        setLoading(false);
      });
  }

  return (
    <>
    
      {!openReschedule  && !bookingIsCompleted ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setOpenStatusChange(false)}
          />
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
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="w-full  text-primary text-sm px-4 py-2.5 rounded-md  leading-5 bg-primary/[0.08] outline-none"
                  >
                    <option value="" disabled selected>
                      Select type
                    </option>

                    <option value="cancelled">Cancelled</option>
                    {Role === "practitioner" && (
                      <option value="completed"> Mark as Completed</option>
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

                {formData.type === "completed" && (
                  <>
                    <div className="w-full">
                      <label className="block text-sm font-semibold leading-[24px] text-primary mb-[8px]">
                        Medical Notes (
                        <span className="text-xs text-gray-500">
                          for Patient
                        </span>
                        )
                      </label>
                      <div className="flex items-center gap-[12px] bg-primary/[0.08] rounded-md px-[16px] py-[10px]">
                        <textarea
                          name="medical_note"
                          value={formData.medical_note}
                          onChange={handleChange}
                          rows={3}
                          placeholder="Enter medical notes "
                          className="w-full text-primary text-sm placeholder:text-primary leading-[20px] bg-transparent  outline-none text-sm"
                        />
                      </div>
                    </div>
                    <div className="w-full">
                      <label className="block text-sm font-semibold leading-[24px] text-primary mb-[8px]">
                        Private Notes (
                        <span className="text-xs text-gray-500">
                          for Doctor
                        </span>
                        )
                      </label>
                      <div className="flex items-center gap-[12px] bg-primary/[0.08] rounded-md px-[16px] py-[10px]">
                        <textarea
                          name="private_note"
                          value={formData.private_note}
                          onChange={handleChange}
                          rows={3}
                          placeholder="Enter medical notes "
                          className="w-full text-primary text-sm placeholder:text-primary leading-[20px] bg-transparent  outline-none text-sm"
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Button */}
              <button
                onClick={handleSubmut}
                className="flex justify-center mt-4 w-full cursor-pointer bg-[linear-gradient(90deg,var(--color-AquaBlue)_-26%,var(--color-primary)_100%)] text-white py-3 text-lg rounded-full font-bold hover:opacity-90 duration-300"
              >
                {loading ? <LoadingSpin width={3} height={18} /> : "Update Now"}
              </button>
            </>

          </div>
        </div>



      ): bookingIsCompleted ? (

          <div className="fixed top-0 inset-0 z-50 flex justify-center">
              <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
               
              />
              <div className="relative my-7.5 overflow-y-auto  min-w-[80%] z-50 animate-fadeIn custom-scroll">
        
                <AddResourcesForPetient setClose={setOpenStatusChange} patient_id={data.patient_id} setBookingUpdate={setBookingUpdate} />
              </div>
            </div>

      ) : (
        <div className="fixed top-0 inset-0 z-50 flex justify-center">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setOpenStatusChange(false)}
          />
          <div className="relative my-12.5 overflow-y-auto  min-w-[75%] z-50 animate-fadeIn custom-scroll">
            <button
              className="absolute top-4 right-4 z-1 text-white cursor-pointer font-bold h-7.5 w-7.5 rounded-full bg-primary text-sm flex items-center justify-center"
              onClick={() => setOpenStatusChange(false)}
            >
              ✕
            </button>
            <BookingReschedule
              setBookingUpdate={setBookingUpdate}
              Data={data}
            />
          </div>
        </div>
      ) }
    </>
  );
}
