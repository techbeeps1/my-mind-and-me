"use client";

import WrapperBanner from "@/components/WraperBanner";
import Image from "next/image";
import { FaRegUser, FaPhone } from "react-icons/fa6";
import { SlCalender } from "react-icons/sl";
import { GoDotFill } from "react-icons/go";
import { useEffect, useState } from "react";
import { imagePath, referralProfile, referralProfileEdit } from "@/services/api";
import { toastTBS } from "@/lib/toast";
import LoadingSpin from "@/components/LoadingSpin";
import { RiImageEditFill } from "react-icons/ri";
export default function DoctorProfile() {
  const [isEdit, setisEdit] = useState(true);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [preview, setPreview] = useState("/profile-img.png");
  const [landingData, setLandingData] = useState(false);
  const [landing, setLanding] = useState(true);
  const [MMMUserData] = useState(() => {
    if (typeof window === "undefined") return null;
    const data = localStorage.getItem("MMMDT");
    return data ? JSON.parse(data) : null;
  });

  type FormErrors = Partial<Record<keyof FormDataType, string>>;


  const validateDoctorProfile = (data: FormDataType): FormErrors => {
  const errors: FormErrors = {};

  if(!data.full_name.trim()) {
    errors.full_name = "Full name is required";
  } else if (data.full_name.trim().length < 2 || data.full_name.trim().length > 50) {
    errors.full_name = "Full name must be 2–50 characters";
  }

  if (!data.gender) {
    errors.gender = "Gender is required";
  }

  if (!data.dob) {
    errors.dob = "Date of birth is required";
  }
  if(!data.phone.trim()) {
    errors.phone = "Phone number is required";
  } else if (!/^\d{10}$/.test(data.phone.trim())) {
    errors.phone = "Phone number must be exactly 10 digits";
  }
  // License Number
  const license = data.license_number.trim();
  if (!license) {
    errors.license_number = "License number is required";
  } else if (!/^[a-zA-Z0-9]+$/.test(license)) {
    errors.license_number = "License number must be alphanumeric only";
  } else if (license.length < 5 || license.length > 25) {
    errors.license_number = "License number must be 5–25 characters";
  }

  // Registration
  const registration = data.registration.trim();
  if (!registration) {
    errors.registration = "Registration is required";
  } else if (!/^[a-zA-Z0-9]+$/.test(registration)) {
    errors.registration = "Registration must be alphanumeric only";
  } else if (registration.length < 5 || registration.length > 25) {
    errors.registration = "Registration must be 5–25 characters";
  }

  // Clinic Name
  const clinicName = data.clinic_name.trim();
  if (!clinicName) {
   // errors.clinic_name = "Clinic name is required";
  } else if (clinicName.length < 2 || clinicName.length > 50) {
    errors.clinic_name = "Clinic name must be 2–50 characters";
  } else if (!/^[a-zA-Z0-9\s.,&()-]+$/.test(clinicName)) {
    errors.clinic_name = "Invalid clinic name";
  }

  // Phone Number (10 digits)
  const phone = data.clinic_phone.trim();
  if (!phone) {
   // errors.clinic_phone = "Phone number is required";
  } else if (!/^\d{10}$/.test(phone)) {
    errors.clinic_phone = "Clinic phone number must be exactly 10 digits";
  }

  // Address
  const address = data.address.trim();
  if (!address) {
   // errors.address = "Address is required";
  } else if (address.length < 5 || address.length > 150) {
    errors.address = "Address must be 5–150 characters";
  }

  return errors;
};

  type FormDataType = {
    user_id: string;
    full_name: string;
    phone: string;
    gender: string;
    dob: string;
    license_number: string;
    registration: string;
    clinic_name: string;
    clinic_phone: string;
    address: string;
    special_interest: string;
    profile_image: string | null;
  };
  const [formData, setFormData] = useState<FormDataType>({
    user_id: MMMUserData?.id || "",
    full_name: "",
    phone: "",
    gender: "",
    dob: "",
    license_number: "",
    registration: "",
    clinic_name: "",
    clinic_phone: "",
    address: "",
    special_interest: "",
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
     referralProfile(MMMUserData?.id).then((data) => {
      setLanding(false)
      setFormData(data.data);
      setPreview(data.data.profile_image ? imagePath + data.data.profile_image : "/profile-img.png");
    }).catch((err) => {
      console.error(err);
    });
  }, [MMMUserData?.id]);

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData();

    const errors = validateDoctorProfile(formData);

if (Object.keys(errors).length > 0) {
  toastTBS.error(Object.values(errors)[0]); // show first error
  return;
}

    Object.keys(formData).forEach((key) => {
      const typedKey = key as keyof FormDataType;

      const value = formData[typedKey];

      if (value !== null) {
        data.append(typedKey, value as string | Blob);
      }
    });


    if (profileImage) {
      data.append("profile_image", profileImage as Blob);
    } else {
      data.delete("profile_image");
    }

    if (landingData) return;
    setLandingData(true);
    try {
      const res = await referralProfileEdit(data)
      if (res.status) {

        toastTBS.success("Profile updated successfully");
        setisEdit(true);
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
      <WrapperBanner>   
        <div className="flex-1 flex justify-center items-center h-[70vh]">
           <LoadingSpin />
        </div>
      </WrapperBanner>
    );
  }
  return (
    <>
      <WrapperBanner>
        <div className="flex-1 flex justify-start md:p-7.5 px-5 py-7.5">
          <div className="max-w-337.5 w-full bg-white rounded-[10px] shadow-xl h-fit ">
            <h2 className="text-center rounded-t-[10px] bg-[linear-gradient(90deg,#56e1e845_70%,var(--color-background)_100%)]  w-full text-primary md:text-[25px] text-[20px] leading-9 py-3 font-semibold md:mb-11.25 mb-7.5">
              Profile
            </h2>
            <form onSubmit={handleSave}>
              <div className="w-245  max-w-full mx-auto md:mb-11.25 mb-7.5 px-5">
                <div className="flex justify-between mb-7.5 items-center gap-4 text-white ">
                  <div className="flex items-center gap-2.5 relative z-0">
                    <Image
                      src={preview}
                      alt="profile img"
                      height={90}
                      width={90}
                      priority
                      className="object-cover md:h-15 md:w-15 h-10 w-10 rounded-full"
                    />
                    {!isEdit && (
                         <label className="absolute left-10 -top-2.5 bg-primary text-white text-xs p-1 rounded-full cursor-pointer">
                                              <RiImageEditFill className="h-5 w-5" />
                                              <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageChange}
                                                className="hidden"
                                              />
                                            </label>
                    )}
                    <div className="lg:text-lg md:text-base text-sm text-primary">
                      <div className="font-semibold">{formData.full_name}</div>
                      <div className="lg:text-base md:text-sm text-xs text-[#C6C6C6]">Referrer</div>
                    </div>
                  </div>

                  {isEdit ? (<button onClick={() => setisEdit(false)} className="lg:py-3 py-1.25 flex items-center lg:gap-2.5 gap-[5px] lg:px-6.5 px-3.75 duration-500 cursor-pointer rounded-full bg-[linear-gradient(90deg,var(--color-AquaBlue)_0%,var(--color-primary)_100%)] text-white font-bold lg:text-lg md:tex-base text-sm lg:leading-6 leding-3 hover:opacity-90 transition">
                    <GoDotFill className="md:h-3 md:w-3 h-2 w-2" /> Edit
                  </button>) : (
                    <div className="flex gap-2">

                      <button className="lg:py-3 py-1.25 flex items-center lg:gap-2.5 gap-[5px] lg:px-6.5 px-3.75 duration-500 cursor-pointer rounded-full bg-[linear-gradient(90deg,var(--color-AquaBlue)_0%,var(--color-primary)_100%)] text-white font-bold lg:text-lg md:tex-base text-sm lg:leading-6 leding-3 hover:opacity-90 transition">
                        { landingData ? (<LoadingSpin width={2} height={11} />) :  "Save"} 
                      </button>
                      <button onClick={() => setisEdit(true)} className="lg:py-3 py-1.25 flex items-center lg:gap-2.5 gap-[5px] lg:px-6.5 px-3.75 duration-500 cursor-pointer rounded-full bg-[linear-gradient(90deg,var(--color-AquaBlue)_0%,var(--color-primary)_100%)] text-white font-bold lg:text-lg md:tex-base text-sm lg:leading-6 leding-3 hover:opacity-90 transition">
                       Cancel
                      </button>
                    </div>
                  )}

                </div>
                <div className="flex md:flex-row flex-col md:gap-5 gap-3.75 justify-between mb-5">
                  <div className="w-full">
                    {/* Name */}
                    <label className="block text-sm font-semibold leading-[24px] text-primary mb-[8px]">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <div className="flex items-center gap-[12px] bg-primary/[0.08] rounded-md px-[16px] py-[10px]">
                      <FaRegUser className="h-[15px] w-[15px] text-primary" />
                      <input
                        readOnly={isEdit}
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
                      Phone <span className="text-red-500">*</span>
                    </label>
                    <div className="flex items-center gap-[12px] bg-primary/[0.08] rounded-md px-[16px] py-[10px]">
                      <FaPhone className="h-[15px] w-[15px] text-primary" />
                      <input
                        readOnly={isEdit}
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
                      Gender <span className="text-red-500">*</span>
                    </label>
                    <select name="gender" value={formData.gender}
                      onChange={handleChange} disabled={isEdit} className="w-full  text-primary text-sm px-4 py-2.5 rounded-md  leading-5 bg-primary/[0.08] outline-none">
                       <option value="" selected disabled>
                        Select Gender
                      </option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  {/* Phone */}
                  <div className="w-full">
                    <label className="block text-sm font-semibold leading-[24px] text-primary mb-[8px]">
                      DOB <span className="text-red-500">*</span>
                    </label>
                    <div className="flex items-center gap-[12px] bg-primary/[0.08] rounded-md px-[16px] py-[10px]">
                      <input
                        readOnly={isEdit}
                        name="dob"
                        max={ new Date().toISOString().split("T")[0] }
                        value={formData.dob}
                        onChange={handleChange}
                        type="date"
                        placeholder="DD/MM/YYYY"
                        className="w-full text-primary text-sm placeholder:text-primary leading-[20px] bg-transparent  outline-none text-sm"
                      />
                      <SlCalender className="h-[15px] w-[15px] text-primary" />
                    </div>
                  </div>
                </div>
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
                        readOnly={isEdit}
                        value={formData.license_number}
                        onChange={handleChange}
                        type="text"
                        placeholder="License number"
                        className="w-full  text-primary text-sm px-4 py-2.5 rounded-md placeholder:text-primary leading-5 bg-primary/[0.08]  outline-none "
                      />
                    </div>
                    <div className="w-full">
                      <label className="text-sm font-semibold block leading-6 text-primary mb-2">
                        Registration <span className="text-red-500">*</span>
                      </label>
                      <input
                        readOnly={isEdit}
                        value={formData.registration}
                        onChange={handleChange}
                        type="text"
                        name="registration"
                        placeholder="Registration"
                        className="w-full  text-primary text-sm px-4 py-2.5 rounded-md placeholder:text-primary leading-5 bg-primary/[0.08]  outline-none"
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-5">
                  <h2 className=" w-full text-primary md:text-[25px] text-[20px] leading-9 mb-3 font-semibold">
                    Practice Info
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 justify-between">
                    <div className="w-full">
                      <label className="text-sm block font-semibold leading-6 text-primary mb-2">
                        Clinic name
                      </label>
                      <input
                        type="text"
                        readOnly={isEdit}
                        name="clinic_name"
                        value={formData.clinic_name}
                        onChange={handleChange}
                        placeholder="Clinic name"
                        className="w-full  text-primary text-sm px-4 py-2.5 rounded-md placeholder:text-primary leading-5 bg-primary/[0.08]  outline-none "
                      />
                    </div>
                    <div className="w-full">
                      <label className="text-sm font-semibold block leading-6 text-primary mb-2">
                        Phone
                      </label>
                      <input
                        readOnly={isEdit}
                        value={formData.clinic_phone}
                        onChange={handleChange}
                        name="clinic_phone"
                        type="number"
                        placeholder="Phone"
                        className="w-full  text-primary text-sm px-4 py-2.5 rounded-md placeholder:text-primary leading-5 bg-primary/[0.08]  outline-none"
                      />
                    </div>
                    <div className="w-full md:col-span-2">
                      <label className="text-sm font-semibold block leading-6 text-primary mb-2">
                        Address
                      </label>
                      <textarea readOnly={isEdit} name="address" value={formData.address}
                        onChange={handleChange}
                        className="w-full resize-none text-primary text-sm px-4 py-2.5 rounded-md placeholder:text-primary leading-5 bg-primary/[0.08]  outline-none"
                        placeholder="Address"
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-5">
                  <h2 className=" w-full text-primary md:text-[25px] text-[20px] leading-9 mb-3 font-semibold">
                    Special Interest
                  </h2>
                  <div className="md:w-[50%] ">
                    <label className="text-sm block font-semibold leading-6 text-primary mb-2">
                      Psychiatry
                    </label>
                    <select name="special_interest" value={formData.special_interest}
                      onChange={handleChange} disabled={isEdit} className="w-full  text-primary text-sm px-4 py-2.5 rounded-md  leading-5 bg-primary/[0.08] outline-none">
                      <option>Psychiatry</option>
                      <option>Neurology</option>
                    </select>
                  </div>
                </div>

                {!isEdit && (
                  <div className="flex gap-2 mt-10">
                    <button className="lg:py-3 py-1.25 flex items-center lg:gap-2.5 gap-[5px] lg:px-6.5 px-3.75 duration-500 cursor-pointer rounded-full bg-[linear-gradient(90deg,var(--color-AquaBlue)_0%,var(--color-primary)_100%)] text-white font-bold lg:text-lg md:tex-base text-sm lg:leading-6 leding-3 hover:opacity-90 transition">
                     { landingData ? (<LoadingSpin width={2} height={11} />) :  "Save"} 
                    </button>
                    <button onClick={() => setisEdit(true)} className="lg:py-3 py-1.25 flex items-center lg:gap-2.5 gap-[5px] lg:px-6.5 px-3.75 duration-500 cursor-pointer rounded-full bg-[linear-gradient(90deg,var(--color-AquaBlue)_0%,var(--color-primary)_100%)] text-white font-bold lg:text-lg md:tex-base text-sm lg:leading-6 leding-3 hover:opacity-90 transition">
                      Cancel
                    </button>
                  </div>
                )}

              </div>
            </form>
          </div>
        </div>
      </WrapperBanner>
    </>
  );
}
