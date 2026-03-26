"use client";


import Image from "next/image";
import { FaRegUser, FaPhone } from "react-icons/fa6";
import { SlCalender } from "react-icons/sl";
import { useEffect, useState } from "react";
import { imagePath, patientProfile, patientProfileEdit } from "@/services/api";
import { toastTBS } from "@/lib/toast";
import LoadingSpin from "@/components/LoadingSpin";
import { useRouter } from "next/navigation";
import { RiImageEditFill } from "react-icons/ri";




export default function PatientsProfileComplete() {
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









  type FormDataType = {
    user_id: string;
    full_name: string;
    phone: string;
    gender: string;
    dob: string;
    blood_group: string;
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
    patientProfile(MMMUserData?.id).then((data) => {
      setLanding(false)
       setFormData(data.data);

      setPreview(imagePath + data.data.profile_image || "/profile-img.png");
    }).catch((err) => {
      console.error(err);
    });
  }, [MMMUserData?.id]);

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
      const res = await patientProfileEdit(data)
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

            </div >
            <form onSubmit={handleSave}>
              <div className="w-150  max-w-full mx-auto md:mb-11.25 mb-7.5 px-5 ">
                <>

                  <div className="flex justify-center mb-7.5 items-center gap-4 text-white ">

                    <div className="flex items-center gap-2.5 relative z-0 mt-2">
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
                          type="date"
                          placeholder="DD/MM/YYYY"
                          className="w-full text-primary text-sm placeholder:text-primary leading-[20px] bg-transparent  outline-none text-sm"
                        />
                        <SlCalender className="h-[15px] w-[15px] text-primary" />
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
                </>


                <div className="flex justify-end mt-10 gap-2">
                  <button className="lg:py-3 py-1.25 flex items-center lg:gap-2.5 gap-[5px] lg:px-6.5 px-3.75 duration-500 cursor-pointer rounded-full bg-[linear-gradient(90deg,var(--color-AquaBlue)_0%,var(--color-primary)_100%)] text-white font-bold lg:text-lg md:tex-base text-sm lg:leading-6 leding-3 hover:opacity-90 transition">
                    {landingData ? (<LoadingSpin width={2} height={11} />) : "Save"}
                  </button>
                </div>


              </div>
            </form>
          </div>
        </div>
      </div>

    </>
  );
}
