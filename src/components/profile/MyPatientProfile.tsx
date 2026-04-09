"use client";

import WrapperBanner from "@/components/WraperBanner";
import Image from "next/image";
import { FaRegUser, FaPhone } from "react-icons/fa6";
import { GoDotFill } from "react-icons/go";
import { useEffect, useState } from "react";
import {
  imagePath,
  patientProfile,
  patientProfileEdit,

} from "@/services/api";
import { toastTBS } from "@/lib/toast";
import LoadingSpin from "@/components/LoadingSpin";
import { RiImageEditFill } from "react-icons/ri";
import { useProfile } from "@/services/ProfileContext";
export default function MyPatientProfile() {
    const { setUsername } = useProfile();
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

  type FormDataType = {    
    user_id: string;
    full_name: string;
    phone: string;
    gender: string;
    dob: string;
    blood_group: string ;
    profile_image: string | null;
  };
  const [formData, setFormData] = useState<FormDataType>({
    user_id: MMMUserData?.id || "",
    full_name: "",
    phone: "",
    gender: "",
    dob: "",
    blood_group: "",
    profile_image: "/profile-img.png",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setProfileImage(file);

    const imageUrl = URL.createObjectURL(file);
    setPreview(imageUrl);
  };

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  useEffect(() => {
    patientProfile(MMMUserData?.id)
      .then((data) => {
        setLanding(false);
        setFormData(data.data);
        
        setPreview(data.data.profile_image ? imagePath + data.data.profile_image : "/profile-img.png");
      })
      .catch((err) => {
        console.error(err);
      });
  }, [MMMUserData?.id]);


  const validateForm = (data: FormDataType): string => {
  let errors: string = "";

  if (!data.full_name.trim()) {
    errors = "Full name is required";
    return errors;
  }

  if (!data.phone.trim()) {
    errors = "Phone number is required";
    return errors;
  } else if (!/^[1-9]\d{9}$/.test(data.phone)) {
    errors = "Enter valid 10 digit phone number";
    return errors;
  }

  if (!data.gender) {
    errors = "Gender is required";
    return errors;
  }

  if (!data.dob) {
    errors = "Date of birth is required";
    return errors;
  }

  if (!data.blood_group.trim()) {
    errors = "Blood group is required";
    return errors;
  }



  return "";
};

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

      const validationErrors = validateForm(formData);
  if (validationErrors) { 
  toastTBS.error(validationErrors)
  return;
  }
    const data = new FormData();

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
      const res = await patientProfileEdit(data);
      if (res.status) {
        toastTBS.success("Profile updated successfully");
        setisEdit(true);
        setUsername(formData.full_name);
        setTimeout(() => {
          setLandingData(false);
        }, 1500);
      } else {
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
                      <div className="lg:text-base md:text-sm text-xs text-[#C6C6C6]">
                        Patient
                      </div>
                    </div>
                  </div>

                  {isEdit ? (
                    <button
                      onClick={() => setisEdit(false)}
                      className="lg:py-3 py-1.25 flex items-center lg:gap-2.5 gap-1.25 lg:px-6.5 px-3.75 duration-500 cursor-pointer rounded-full bg-[linear-gradient(90deg,var(--color-AquaBlue)_0%,var(--color-primary)_100%)] text-white font-bold lg:text-lg md:tex-base text-sm lg:leading-6 leding-3 hover:opacity-90 transition"
                    >
                      <GoDotFill className="md:h-3 md:w-3 h-2 w-2" /> Edit
                    </button>
                  ) : (
                    <div className="flex gap-2">
                      <button className="lg:py-3 py-1.25 flex items-center lg:gap-2.5 gap-1.25 lg:px-6.5 px-3.75 duration-500 cursor-pointer rounded-full bg-[linear-gradient(90deg,var(--color-AquaBlue)_0%,var(--color-primary)_100%)] text-white font-bold lg:text-lg md:tex-base text-sm lg:leading-6 leding-3 hover:opacity-90 transition">
                        {landingData ? (
                          <LoadingSpin width={2} height={11} />
                        ) : (
                          "Save"
                        )}
                      </button>
                      <button
                        onClick={() => setisEdit(true)}
                        className="lg:py-3 py-1.25 flex items-center lg:gap-2.5 gap-1.25 lg:px-6.5 px-3.75 duration-500 cursor-pointer rounded-full bg-[linear-gradient(90deg,var(--color-AquaBlue)_0%,var(--color-primary)_100%)] text-white font-bold lg:text-lg md:tex-base text-sm lg:leading-6 leding-3 hover:opacity-90 transition"
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
                <div className="flex md:flex-row flex-col md:gap-5 gap-3.75 justify-between mb-5">
                  <div className="w-full">
                    {/* Name */}
                    <label className="block text-sm font-semibold leading-6 text-primary mb-2">
                      Full Name
                    </label>
                    <div className="flex items-center gap-3 bg-primary/8 rounded-md px-4 py-2.5">
                      <FaRegUser className="h-3.75 w-3.75 text-primary" />
                      <input
                        readOnly={isEdit}
                        value={formData.full_name}
                        onChange={handleChange}
                        type="text"
                        name="full_name"
                        placeholder="Full Name"
                        className="w-full text-primary text-sm placeholder:text-primary leading-5 bg-transparent  outline-none"
                      />
                    </div>
                  </div>
                  {/* Phone */}
                  <div className="w-full">
                    <label className="block text-sm font-semibold leading-6 text-primary mb-2">
                      Phone
                    </label>
                    <div className="flex items-center gap-3 bg-primary/8 rounded-md px-4 py-2.5">
                      <FaPhone className="h-3.75 w-3.75 text-primary" />
                      <input
                        readOnly={isEdit}
                        value={formData.phone}
                        name="phone"
                        onChange={handleChange}
                        type="number"
                        placeholder="Phone"
                        className="w-full text-primary text-sm placeholder:text-primary leading-5 bg-transparent  outline-none"
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
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      disabled={isEdit}
                      className="w-full  text-primary text-sm px-4 py-2.5 rounded-md  leading-5 bg-primary/8 outline-none"
                    >
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
                    <label className="block text-sm font-semibold leading-6 text-primary mb-2">
                      DOB
                    </label>
                    <div className="flex items-center gap-3 bg-primary/8 rounded-md px-4 py-2.5">
                      <input
                        readOnly={isEdit}
                        name="dob"
                        max={ new Date().toISOString().split("T")[0] }
                        value={formData.dob}
                        onChange={handleChange}
                        type="date"
                        placeholder="DD/MM/YYYY"
                        className="w-full text-primary text-sm placeholder:text-primary leading-5 bg-transparent  outline-none"
                      />                      
                    </div>
                  </div>
                </div>
                <div className="mt-5">
                    {/* Name */}
                    <label className="text-sm block font-semibold leading-6 text-primary mb-2">
                      Blood Group
                    </label>
                    <select
                      name="blood_group"
                      value={formData.blood_group}
                      onChange={handleChange}
                      disabled={isEdit}
                      className="w-full  text-primary text-sm px-4 py-2.5 rounded-md  leading-5 bg-primary/8 outline-none"
                    >
                       <option value="" disabled selected>Select</option>
                      <option value="A+">A+</option>
                      <option value="A−">A−</option>
                      <option value="B+">B+</option>
                      <option value="B−">B−</option>
                      <option value="AB+">AB+</option>
                      <option value="AB−">AB−</option>
                      <option value="O+">O+</option>
                      <option value="O−">O−</option>
                    </select>
                  </div>
          
              </div>
            </form>
          </div>
        </div>
      </WrapperBanner>
    </>
  );
}
