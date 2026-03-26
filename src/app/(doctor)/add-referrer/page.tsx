"use client";

import LoadingSpin from "@/components/LoadingSpin";
import WrapperBanner from "@/components/WraperBanner";
import { toastTBS } from "@/lib/toast";
import { AddReferrerFun, GetAllPatient, GetAllPractitioner } from "@/services/api";
import {  useEffect, useState } from "react";
type UserPatientANDPractitioner = {
  id: string;
  unique_id: string;
  user_name: string;
  email: string;
  phone_number: string;
  gender: string | null;
  dob?: string | null;
};


type Referral = {
  doctor_id: string;
  patient_id: string;
  therapist_id: string;
  urgency_level: string;
  preferred_modality: string;
  clinical_presentation: string;
  chief_complaint: string;
  additional_requirements: string;
};
export default function AddReferrer() {
  const [PreferredModality, setPreferredModality] = useState("");
  const [allPractitioners, setAllPractitioners] = useState<UserPatientANDPractitioner[]>([]);
  const [allPatients, setAllPatients] = useState<UserPatientANDPractitioner[]>([]);
  const [loading, setLoading] = useState(false);
  const [MMMUserData] = useState(() => {
    if (typeof window === "undefined") return null;
    const data = localStorage.getItem("MMMDT");
    return data ? JSON.parse(data) : null;
  });

  const initialReferralData: Referral = {
  doctor_id: "",
  patient_id: "",
  therapist_id: "",
  urgency_level: "",
  preferred_modality: "Therapy",
  clinical_presentation: "",
  chief_complaint: "",
  additional_requirements: ""
};
  const [referralData, setReferralData] = useState<Referral>(initialReferralData)

const validateForm = () => {
  if (!referralData.patient_id) {
    toastTBS.error("Please select a patient");
    return false;
  }
  if (!referralData.therapist_id) {
    toastTBS.error("Please select a practitioner");
    return false;
  }
  if (!referralData.urgency_level) {
    toastTBS.error("Please select urgency level");
    return false;
  }
  if (!referralData.preferred_modality) {
    toastTBS.error("Please select preferred modality");
    return false;
  }
  if (!referralData.clinical_presentation.trim()) {
    toastTBS.error("Clinical presentation is required");
    return false;
  }
  if (!referralData.chief_complaint.trim()) {
    toastTBS.error("Chief complaint is required");
    return false;
  }
  return true;
};

  const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
) => {
  const { name, value } = e.target;

  setReferralData((prev) => ({
    ...prev!,
    [name]: value
  }));
};

useEffect(() => {console.log(referralData)}, [referralData]);
  useEffect(() => {
      GetAllPatient().then((data) => {
          setAllPatients(data.data);
       }).catch((err) => {
         console.error(err);
       });
     GetAllPractitioner().then((data) => {
          setAllPractitioners(data.data);
       }).catch((err) => {
         console.error(err);
       });

  }, []);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
      if(loading) return;
      if (!validateForm()) return;
      setLoading(true);
      AddReferrerFun({...referralData,user_id: MMMUserData?.id}).then((data) => {
      console.log("Referral added successfully:", data);
      if(data.status){
        toastTBS.success("Referral added successfully");
         (e.target as HTMLFormElement).reset();
         setReferralData(initialReferralData);
        setTimeout(() => {  
          setLoading(false);
      }, 1500);
    }
    }).catch((err) => {
      console.error("Failed to add referral:", err);
        toastTBS.error("Failed to add referral");
        setTimeout(() => {
          setLoading(false);
        }, 1500);
    })

  };

  return (
    <>
      <WrapperBanner>
        <div className="flex-1 flex justify-start md:p-7.5 px-5 py-7.5">
          <div className="max-w-337.5 w-full bg-white rounded-[10px] shadow-xl h-fit ">
            <h2 className="text-center rounded-t-[10px] bg-[linear-gradient(90deg,#56e1e845_70%,var(--color-background)_100%)]  w-full text-primary md:text-[25px] text-[20px] leading-9 py-3 font-semibold md:mb-11.25 mb-7.5">
              Referrer Form
            </h2>
            <div className="w-245  max-w-full mx-auto md:mb-11.25 mb-7.5 px-5">
              <form className="space-y-3.75" onSubmit={handleSubmit}>                
                <div>
                  <label className="text-sm block font-semibold leading-6 text-primary mb-2">
                    Patient Selection
                  </label>
                  <select onChange={handleChange} name="patient_id" className="w-full  text-primary text-sm px-4 py-2.5 rounded-md  leading-5 bg-primary/[0.08] outline-none">
                    <option value="" disabled selected >Patient Selection</option>
                    {allPatients?.map((patient) => (
                      <option key={patient.id} value={patient.id}>{patient.unique_id
}{" | "}{patient.user_name}</option>
                    ))}
                  </select>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm block font-semibold leading-6 text-primary mb-2">
                      Preferred Practitioner
                    </label>
                    <select onChange={handleChange} name="therapist_id" className="w-full  text-primary text-sm px-4 py-2.5 rounded-md  leading-5 bg-primary/[0.08] outline-none">
                    <option value="" disabled selected >Preferred Practitioner</option>
                    
                      {allPractitioners?.map((practitioner) => (
                      <option key={practitioner.id} value={practitioner.id}>{practitioner.unique_id
}{" | "}{practitioner.user_name}</option>
                    ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-sm block font-semibold leading-6 text-primary mb-2">
                      Urgency Level
                    </label>
                    <select onChange={handleChange} name="urgency_level" className="w-full  text-primary text-sm px-4 py-2.5 rounded-md  leading-5 bg-primary/[0.08] outline-none">
                     <option value="" disabled selected>Select Level</option>
                      <option>Emergency</option>
                      <option>High</option>
                      <option>Low</option>
                    </select>
                  </div>
                </div>
                <div>
                  <p className="font-semibold text-primary leading-6 mb-2">
                    Preferred Modality
                  </p>
                  <div className="flex gap-[20px] md:flex-row flex-col justify-between">
                    {["Therapy", "Psychiatric Assessment", "Both"].map(
                      (role, i) => (
                        <label
                          key={role}
                          className={`flex items-center gap-2 md:w-59 w-full max-w-full px-4 py-2 rounded-lg font-semibold cursor-pointer text-[15px] text-primary
                ${role === PreferredModality ? "bg-primary/[0.08] border-primary/[0.08] " : " border border-primary/[0.08]"}`}
                        >
                          <input
                            type="radio"
                            name="preferred_modality"
                            defaultChecked={i === 0}
                            className="primary"
                            value={role}
                            onChange={(e) => {handleChange(e); setPreferredModality(e.target.value);}}
                          />
                          {role}
                        </label>
                      ),
                    )}
                  </div>
                </div>
                <div>
                  <label className="text-sm block font-semibold leading-6 text-primary mb-2">
                    Clinical Presentation
                  </label>
                  <textarea onChange={handleChange} name="clinical_presentation"
                    className="w-full  text-primary text-sm px-4 py-2.5 rounded-md placeholder:text-primary leading-5 bg-primary/[0.08]  outline-none"
                    placeholder="Clinical Presentation"
                  />
                </div>
                <div>
                  <label className="text-sm block font-semibold leading-6 text-primary mb-2">
                    Chief Complaint
                  </label>
                  <textarea onChange={handleChange} name="chief_complaint"
                    className="w-full  text-primary text-sm px-4 py-2.5 rounded-md placeholder:text-primary leading-5 bg-primary/[0.08]  outline-none"
                    placeholder="Chief Complaint"
                  />
                </div>
                <div>
                  <label className="text-sm block font-semibold leading-6 text-primary mb-2">
                    Additional requirements
                  </label>
                  <textarea onChange={handleChange} name="additional_requirements"
                    className="w-full  text-primary text-sm px-4 py-2.5 rounded-md placeholder:text-primary leading-5 bg-primary/[0.08]  outline-none"
                    placeholder="Additional requirements"
                  />
                </div>

                <div className="flex justify-center">
                  <button className="py-3 px-15 md:w-auto w-full duration-500 cursor-pointer rounded-full bg-[linear-gradient(90deg,var(--color-AquaBlue)_0%,var(--color-primary)_100%)] text-white font-bold text-lg leading-6 hover:opacity-90 transition">
                  { loading ? (<LoadingSpin width={3} height={15} />) :  "Submit"}    
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      
      </WrapperBanner>
    </>
  );
}
