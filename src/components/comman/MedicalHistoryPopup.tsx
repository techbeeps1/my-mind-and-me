"use client";
import { useState } from "react";

import { toastTBS } from "@/lib/toast";
import LoadingSpin from "@/components/LoadingSpin";

import { changeBookingStatus, CreateMedicalNote } from "@/services/api";
import { useProfile } from "@/services/ProfileContext";

export default function MedicalHistoryPopup({ setMedicalHistoryUpdate,setOpenStatusChange,id }: {setMedicalHistoryUpdate:React.Dispatch<React.SetStateAction<number>>, setOpenStatusChange: React.Dispatch<React.SetStateAction<boolean>>, id: string }) {
 const { MMMUserData } = useProfile();
  const [formData, setFormData] = useState({
    note: "",
  });


  const [loading, setLoading] = useState(false);



  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmut() {


    if(  formData.note.trim().length < 2 || formData.note.trim().length > 300)  {
      toastTBS.error("Medical note must be between 2 to 300 characters");
      return;
    }

    if(loading) return;
    setLoading(true);
    CreateMedicalNote({
      patient_id: id,
      doctor_id: MMMUserData?.id || "",
      note:  formData.note ,
    }).then((res) => {

       if(res.success) {
          toastTBS.success("Medical note added successfully");
       }else {
        toastTBS.error(res.message || "Failed to add medical note");
       }
        setMedicalHistoryUpdate((prev) => prev + 1); 
        setOpenStatusChange(false);
        setLoading(false);   
    }).catch((err) => {
      console.error(err);
      toastTBS.error("Failed to add medical note");
      setLoading(false);
    });
  }



  return (
    <>

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
              Medical Note
              </h2>
              <div className="flex md:gap-5 gap-3.75 md:flex-row flex-wrap justify-between">


            
                  <div className="w-full">
                    <label className="block text-sm font-semibold leading-[24px] text-primary mb-[8px]">
                      Medical Note
                    </label>
                    <div className="flex items-center gap-[12px] bg-primary/[0.08] rounded-md px-[16px] py-[10px]">
                      <textarea

                        name="note"
                        value={formData.note}
                        onChange={handleChange}
                        rows={6}
                        placeholder="Enter medical note "
                        className="w-full text-primary text-sm placeholder:text-primary leading-[20px] bg-transparent  outline-none text-sm"
                      />

                    </div>
                  </div>
            
              </div>

              {/* Button */}
              <button onClick={handleSubmut} className="flex justify-center mt-4 w-full cursor-pointer bg-[linear-gradient(90deg,var(--color-AquaBlue)_-26%,var(--color-primary)_100%)] text-white py-3 text-lg rounded-full font-bold hover:opacity-90 duration-300">
                {loading ? <LoadingSpin width={3} height={18} /> : "Submit"}
              </button>

            </>
          </div>
        </div>
  
    </>

  )

}




