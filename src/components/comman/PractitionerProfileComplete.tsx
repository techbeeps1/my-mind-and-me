"use client";


import Image from "next/image";
import { FaRegUser, FaPhone } from "react-icons/fa6";
import { SlCalender } from "react-icons/sl";

import { useEffect, useState } from "react";
import { GetPractitionerProfile, imagePath, PractitionerProfileEdit } from "@/services/api";
import { toastTBS } from "@/lib/toast";
import LoadingSpin from "@/components/LoadingSpin";
import { useRouter } from "next/navigation";
import TagSelector from "./TagSelector";
import { RiImageEditFill } from "react-icons/ri";


const StepProgress = ({ step }: { step: number }) => {
  const steps = [1, 2, 3, 4,5];
  return (
    <div className="flex items-center justify-between w-full max-w-xl mx-auto mb-10">
      {steps.map((item, index) => {
        const isCompleted = step > item;
        const isActive = step === item;
        return (
          <div key={item} className={`flex items-center ${index !== steps.length - 1 ? "w-full" : ""}`}>
            <div
              className={`text-xs font-black flex items-center justify-center w-5 h-5 rounded-full border-2 transition-all
                ${isCompleted ? "bg-primary border-primary text-white" : ""}
                ${isActive ? "border-primary text-primary" : ""}
                ${!isCompleted && !isActive ? "border-gray-300 text-gray-400" : ""}
              `}
            >
              {isCompleted ? "✓" : ""}
              {isActive && !isCompleted && (
                <div className="w-3 h-3 bg-primary rounded-full text-xs font-black"></div>
              )}
            </div>
            {index !== steps.length - 1 && (
              <div
                className={`flex-1 h-[2px] transition-all
                  ${step > item ? "bg-primary" : "bg-gray-300"}
                `}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default function PractitionerProfileComplete() {
  const router = useRouter();
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [preview, setPreview] = useState("/profile-img.png");
  const [landingData, setLandingData] = useState(false);
  const [landing, setLanding] = useState(true);
  const [MMMUserData] = useState(() => {
    if (typeof window === "undefined") return null;
    const data = localStorage.getItem("MMMDT");
    return data ? JSON.parse(data) : null;
  });

  const SpecialInterest = [
    "Anxiety",
    "Depression",
    "Trauma",

  ];
  const Modalities = [
    "CBT",
    "DBT",
    "Psychodynamic",

  ];
  const Languages = [
    "English",
    "Hindi",
    "Dutch",
    "German",
  ];
  const [SpInterestData, setSpInterestData] = useState<string[]>([]);

  const [ModalitiesData, setModalitiesData] = useState<string[]>([]);

  const [LanguagesData, setLanguagesData] = useState<string[]>([]);


  const [step, setStep] = useState(1);


  const validateStep = (step: number, data: FormDataType) => {
    const errors: string[] = [];

    if (step === 1) {
      if (!data.full_name.trim()) {
        errors.push("Full Name is required");
        return errors;
      }
      else if (!/^[A-Za-z\s]+$/.test(data.full_name)) {
        errors.push("Full Name should contain only letters and spaces");
        return errors;
      }
      if (!data.phone.trim()) {
        errors.push("Phone number is required");
        return errors;
      }
      else if (!/^[1-9]\d{9}$/.test(data.phone)) {
        errors.push("Enter valid 10-digit phone number");
        return errors;
      }
      if (!data.gender) {
        errors.push("Please select gender");
        return errors;
      }
      if (!data.dob) {
        errors.push("Date of birth is required");
        return errors;
      }
    }

    if (step === 2) {
      if (!data.license_number.trim()){
        errors.push("License number is required");
           return errors;
      }

      if (!data.qualifications.trim())
        errors.push("Qualifications are required");
         return errors;
    }
         if (step === 3) {
       if(LanguagesData.length == 0) {
         errors.push("Please select at least one language");
         return errors;
       }
    }

    if (step === 4) {
    if(SpInterestData.length == 0) {
      errors.push("Please select at least one special interest");
      return errors;
    }
    }
    if (step === 5) {
       if(ModalitiesData.length == 0) {
         errors.push("Please select at least one modality");
         return errors;
       }
    }
 
    return errors;
  };

  function nextStep() {
    const errors = validateStep(step, formData);
    if (errors.length > 0) {

      errors.forEach((err) => toastTBS.error(err));
      return;
    }
    setStep((prev) => prev + 1);
  }

  type FormDataType = {
    user_id: string;
    full_name: string;
    phone: string;
    gender: string;
    dob: string;
    license_number: string;
    qualifications: string;
    languages: string;
    modalities: string;
    special_interests: string;
    profile_image: string | null;
  };
 const [formData, setFormData] = useState<FormDataType>({
    user_id: MMMUserData?.id || "",
    full_name: "",
    phone: "",
    gender: "",
    dob: "",
    license_number: "",
    qualifications: "",
    languages: "",
    modalities: "",
    special_interests: "",
    profile_image: "/profile-img.png",
  });


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setProfileImage(file)

    const imageUrl = URL.createObjectURL(file);
    setPreview(imageUrl);
  };

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  useEffect(() => {
    GetPractitionerProfile(MMMUserData?.id).then((data) => {
      setLanding(false)
      setFormData(data.data);
      setSpInterestData(data.data.special_interests || []);
      setModalitiesData(data.data.modalities || []);
      setLanguagesData(data.data.languages || []);
      setPreview(imagePath + data.data.profile_image || "/profile-img.png");
    }).catch((err) => {
      console.error(err);
    });
  }, [MMMUserData?.id]);

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData();

    Object.keys(formData).forEach((key) => {
      const typedKey = key as keyof FormDataType;

      const value = formData[typedKey];

      if (value !== null) {
        data.append(typedKey, value as string | Blob);
      }
    });

       if(SpInterestData.length > 0) {
      data.append("special_interests", JSON.stringify(SpInterestData));
    }
    if(ModalitiesData.length > 0) {
      data.append("modalities", JSON.stringify(ModalitiesData));
    }
    if(LanguagesData.length > 0) {
      data.append("languages", JSON.stringify(LanguagesData));
    }

    if (profileImage) {
      data.append("profile_image", profileImage as Blob);
    } else {
      data.delete("profile_image");
    }

    if (landingData) return;
    setLandingData(true);
    try {
      const res = await PractitionerProfileEdit(data)
      if (res.status) {

        toastTBS.success("Profile updated successfully");
        router.push("dashboard");

        setTimeout(() => {
          setLandingData(false);

        }, 1500);
      }
      else {
        toastTBS.error("Failed to update profile");
        setTimeout(() => {
          setLandingData(false);
        }, 1500);
      }

    } catch (err) {
      console.error(err);
      toastTBS.error("An error occurred while updating profile");
    }
  };

  if (landing) {
    return (
      <div className=" bg-cover bg-center bg-no-repeat min-h-screen " style={{ backgroundImage: "url('/banner-bg.jpg')" }}>
        <div className="flex-1 flex justify-center items-center h-[70vh]">
          <LoadingSpin />
        </div>
      </div>
    );
  }
  return (
    <>
      <div className=" bg-cover bg-center bg-no-repeat min-h-screen " style={{ backgroundImage: "url('/banner-bg.jpg')" }}>
        <div className="flex-1 flex justify-center md:p-7.5 px-5 py-7.5">
          <div className="max-w-150 w-full bg-white rounded-[10px] shadow-xl h-fit ">
            <h2 className="text-center rounded-t-[10px] bg-[linear-gradient(90deg,#56e1e845_70%,var(--color-background)_100%)]  w-full text-primary md:text-[25px] text-[20px] leading-9 py-3 font-semibold md:mb-2.25 mb-2.5">
              Complete Your Profile
            </h2>
            <div>
              <StepProgress step={step} />
            </div >
            <form onSubmit={handleSave}>
              <div className="w-150  max-w-full mx-auto md:mb-11.25 mb-7.5 px-5">
                {step === 1 && (
                  <>
                    <h2 className=" w-full text-primary md:text-[25px] text-[20px] leading-9 mb-3 font-semibold">
                      Profile
                    </h2>
                    <div className="flex justify-center mb-7.5 items-center gap-4 text-white ">

                      <div className="flex items-center gap-2.5 relative z-0">
                        <Image
                          src={preview}
                          alt="profile img"
                          height={90}
                          width={90}
                          priority
                          className="object-cover md:h-15 md:w-15 h-10 w-10 rounded-full"
                        />

                        <label className="absolute left-10 -top-2.5 bg-primary text-white text-xs p-1 rounded-full cursor-pointer">
                          <RiImageEditFill className="h-5 w-5" />
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                          />
                        </label>


                      </div>



                    </div>
                    <div className="flex md:flex-row flex-col md:gap-5 gap-3.75 justify-between mb-5">
                      <div className="w-full">
                        {/* Name */}
                        <label className="block text-sm font-semibold leading-[24px] text-primary mb-[8px]">
                          Full Name
                        </label>
                        <div className="flex items-center gap-[12px] bg-primary/[0.08] rounded-md px-[16px] py-[10px]">
                          <FaRegUser className="h-[15px] w-[15px] text-primary" />
                          <input

                            value={formData.full_name}
                            onChange={handleChange}
                            type="text"
                            name="full_name"
                            placeholder="Full Name"
                            className="w-full text-primary text-sm placeholder:text-primary leading-[20px] bg-transparent  outline-none text-sm"
                          />
                        </div>
                      </div>
                      {/* Phone */}
                      <div className="w-full">
                        <label className="block text-sm font-semibold leading-[24px] text-primary mb-[8px]">
                          Phone
                        </label>
                        <div className="flex items-center gap-[12px] bg-primary/[0.08] rounded-md px-[16px] py-[10px]">
                          <FaPhone className="h-[15px] w-[15px] text-primary" />
                          <input

                            value={formData.phone}
                            name="phone"
                            onChange={handleChange}
                            type="number"

                            placeholder="Phone"
                            className="w-full text-primary text-sm placeholder:text-primary leading-[20px] bg-transparent  outline-none text-sm"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex md:gap-5 gap-3.75 md:flex-row flex-col justify-between">
                      <div className="w-full">
                        {/* Name */}
                        <label className="text-sm block font-semibold leading-6 text-primary mb-2">
                          Gender
                        </label>
                        <select name="gender" value={formData.gender}
                          onChange={handleChange} className="w-full  text-primary text-sm px-4 py-2.5 rounded-md  leading-5 bg-primary/[0.08] outline-none">
                          <option value="" disabled selected>Select gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      {/* Phone */}
                      <div className="w-full">
                        <label className="block text-sm font-semibold leading-[24px] text-primary mb-[8px]">
                          DOB
                        </label>
                        <div className="flex items-center gap-[12px] bg-primary/[0.08] rounded-md px-[16px] py-[10px]">
                          <input

                            name="dob"
                            value={formData.dob}
                            onChange={handleChange}
                            max={ new Date().toISOString().split("T")[0] }
                            type="date"
                            placeholder="DD/MM/YYYY"
                            className="w-full text-primary text-sm placeholder:text-primary leading-[20px] bg-transparent  outline-none text-sm"
                          />
                          <SlCalender className="h-[15px] w-[15px] text-primary" />
                        </div>
                      </div>
                    </div>
                  </>)}
                {step === 2 && (
                  <div className="mt-5">
                    <h2 className=" w-full text-primary md:text-[25px] text-[20px] leading-9 mb-3 font-semibold">
                      Medical Credentials
                    </h2>
                    <div className="flex md:gap-5 gap-3.75 md:flex-row flex-col justify-between">
                      <div className="w-full">
                        <label className="text-sm block font-semibold leading-6 text-primary mb-2">
                          License number <span className="text-red-500">*</span>
                        </label>
                        <input
                          name="license_number"

                          value={formData.license_number}
                          onChange={handleChange}
                          type="text"
                          placeholder="License number"
                          className="w-full  text-primary text-sm px-4 py-2.5 rounded-md placeholder:text-primary leading-5 bg-primary/[0.08]  outline-none "
                        />
                      </div>
                      <div className="w-full">
                        <label className="text-sm font-semibold block leading-6 text-primary mb-2">
                          Qualifications <span className="text-red-500">*</span>
                        </label>
                        <input

                          value={formData.qualifications}
                          onChange={handleChange}
                          type="text"
                          name="qualifications"
                          placeholder="Qualifications"
                          className="w-full  text-primary text-sm px-4 py-2.5 rounded-md placeholder:text-primary leading-5 bg-primary/[0.08]  outline-none"
                        />
                      </div>
                    </div>
                  </div>
                )}
                {step === 3 && (
                  <div className="mt-5">
                    <h2 className=" w-full text-primary md:text-[25px] text-[20px] leading-9 mb-3 font-semibold">
                      Languages
                    </h2>
                    <div className="md:w-[100%] ">
                      <TagSelector selected={LanguagesData} setSelected={setLanguagesData} options={Languages} columnCount={2} />

                    </div>
                  </div>
                )}
                {step === 4 && (
                   <div className="mt-5">
                                   <h2 className=" w-full text-primary md:text-[25px] text-[20px] leading-9 mb-3 font-semibold">
                                     Special Interest
                                   </h2>
                                   <div className="md:w-[100%] ">
                                     <TagSelector selected={SpInterestData} setSelected={setSpInterestData} options={SpecialInterest} columnCount={2}  />
                 
                 
                                   </div>
                                 </div>
                )}
{step === 5 && (
                <div className="mt-5">
                                  <h2 className=" w-full text-primary md:text-[25px] text-[20px] leading-9 mb-3 font-semibold">
                                    Modalities
                                  </h2>
                                  <div className="md:w-[100%] ">
                                    <TagSelector selected={ModalitiesData} setSelected={setModalitiesData} options={Modalities} columnCount={2} />
                
                                  </div>
                                </div>
                
)}
                <div className="flex justify-end mt-10 gap-2">
                  {step > 1 && (
                    <button type="button" onClick={() => setStep(step - 1)} className="lg:py-3 py-1.25 flex items-center lg:gap-2.5 gap-[5px] lg:px-6.5 px-3.75 duration-500 cursor-pointer rounded-full bg-[linear-gradient(90deg,var(--color-AquaBlue)_0%,var(--color-primary)_100%)] text-white font-bold lg:text-lg md:tex-base text-sm lg:leading-6 leding-3 hover:opacity-90 transition">
                      Back
                    </button>
                  )}

                  {step < 5 && (
                    <button type="button" onClick={nextStep} className="lg:py-3 py-1.25 flex items-center lg:gap-2.5 gap-[5px] lg:px-6.5 px-3.75 duration-500 cursor-pointer rounded-full bg-[linear-gradient(90deg,var(--color-AquaBlue)_0%,var(--color-primary)_100%)] text-white font-bold lg:text-lg md:tex-base text-sm lg:leading-6 leding-3 hover:opacity-90 transition">
                      Next
                    </button>
                  )}

                  {step === 5 && (
                    <button className="lg:py-3 py-1.25 flex items-center lg:gap-2.5 gap-[5px] lg:px-6.5 px-3.75 duration-500 cursor-pointer rounded-full bg-[linear-gradient(90deg,var(--color-AquaBlue)_0%,var(--color-primary)_100%)] text-white font-bold lg:text-lg md:tex-base text-sm lg:leading-6 leding-3 hover:opacity-90 transition">
                      {landingData ? (<LoadingSpin width={2} height={11} />) : "Save"}
                    </button>
                  )}
                </div>


              </div>
            </form>
          </div>
        </div>
      </div>

    </>
  );
}
