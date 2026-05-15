"use client";
import { useProfile } from "@/services/ProfileContext";
import WrapperBanner from "@/components/WraperBanner";
import Image from "next/image";
import { FaRegUser, FaPhone } from "react-icons/fa6";
import { SlCalender } from "react-icons/sl";
import { GoDotFill } from "react-icons/go";
import { useEffect, useState } from "react";
import { deleteAccount, GetPractitionerProfile, imagePath, PractitionerProfileEdit } from "@/services/api";
import { toastTBS } from "@/lib/toast";
import LoadingSpin from "@/components/LoadingSpin";
import TagSelector from "@/components/comman/TagSelector";
import { RiImageEditFill } from "react-icons/ri";
import { useRouter } from "next/navigation";
export default function MyPractitionerProfile() {
        const router = useRouter();
    const [deleteChecked, setDeleteChecked] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
  const { setUsername, setIsProfileUpdated } = useProfile();
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
  const [SpInterestData, setSpInterestData] = useState<string[]>([ ]);
    const [ModalitiesData, setModalitiesData] = useState<string[]>([]);
    const [LanguagesData, setLanguagesData] = useState<string[]>([]);

      const [OriginalSpInterestData, setOriginalSpInterestData] = useState<string[]>([ ]);
    const [OriginalModalitiesData, setOriginalModalitiesData] = useState<string[]>([]);
    const [OriginalLanguagesData, setOriginalLanguagesData] = useState<string[]>([]);

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
      const [OriginalformData, setOriginalformData] = useState<FormDataType>({
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

    const handleDeleteAccount = async () => {
    try {
  
      setDeleteLoading(true);
   
      const res = await deleteAccount();
  
  
      if (res.success) {
    toastTBS.success(
        "Account deletion request submitted."
      );
      setTimeout(() => {
       router.push("/logout");
      }, 3000);

      setShowDeleteModal(false);
      setDeleteChecked(false);
      }
      if (!res.success) {
        toastTBS.error("Failed to request account deletion");
        return;
      }
  
     
  
  
    } catch (error) {
      toastTBS.error("Failed to request account deletion");
      console.error("Error requesting account deletion:", error);
    } finally {
      setDeleteLoading(false);
    }
  };
  
  function handleCancel() {
    setisEdit(true);
    if (OriginalformData) {
      setFormData(OriginalformData); // 👈 reset to old data
      setSpInterestData(OriginalSpInterestData);
      setModalitiesData(OriginalModalitiesData);
      setLanguagesData(OriginalLanguagesData);


      setPreview(
        OriginalformData.profile_image
          ? OriginalformData.profile_image
          : "/profile-img.png"
      );
    }
  }

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
  if(file && !["image/jpeg", "image/png", "image/jpg", "image/gif", "image/webp"].includes(file.type)){
    toastTBS.error("Please select a valid image file (jpeg, png, jpg, gif, webp)");
    return;
  }
    
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

      setFormData(() => ({
        user_id: MMMUserData?.id || "",
        full_name: data.data.full_name || "",
        phone: data.data.phone || "",
        gender: data.data.gender || "",
        dob: data.data.dob || "",
        license_number: data.data.license_number || "",
        qualifications: data.data.qualifications || "",
        languages: data.data.languages || "",
        modalities: data.data.modalities || "",
        special_interests: data.data.special_interests || "",
        profile_image: "/profile-img.png",
      }));
      
      setOriginalformData(() => ({
        user_id: MMMUserData?.id || "",
        full_name: data.data.full_name || "",
        phone: data.data.phone || "",
        gender: data.data.gender || "",
        dob: data.data.dob || "",
        license_number: data.data.license_number || "",
        qualifications: data.data.qualifications || "",
        languages: data.data.languages || "",
        modalities: data.data.modalities || "",
        special_interests: data.data.special_interests || "",
        profile_image: data.data.profile_image ? imagePath + data.data.profile_image : "/profile-img.png",
      }));
      
      setSpInterestData(data.data.special_interests ?? []);
      setModalitiesData(data.data.modalities ?? []);
      setLanguagesData(data.data.languages ?? []);
      setOriginalSpInterestData(data.data.special_interests ?? []);
      setOriginalModalitiesData(data.data.modalities ?? []);
      setOriginalLanguagesData(data.data.languages ?? []);
       
       setPreview(data.data.profile_image ? imagePath + data.data.profile_image : "/profile-img.png");
    }).catch((err) => {
      console.error(err);
    });
  }, [MMMUserData?.id]);




const validateForm = (data: FormDataType): string => {
  let errors: string = "";

  if (!data.full_name.trim()) {
    errors = "Full name is required";
    return errors;
  }else if (data.full_name.trim().length < 3 || data.full_name.trim().length > 50) {
    errors = "Full name must be between 3 and 50 characters long";
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

  if (!data.license_number.trim()) {
    errors = "License number is required";
    return errors;
  }else if (data.license_number.trim().length < 5 || data.license_number.trim().length > 20) {
    errors = "License number must be between 5 and 20 characters long";
    return errors;
  }

  if (!data.qualifications.trim()) {
    errors = "Qualifications are required";
    return errors;
  }else if (data.qualifications.trim().length < 2 || data.qualifications.trim().length > 50) {
    errors = "Qualifications must be between 5 and 50 characters long";
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

    if(SpInterestData.length > 0) {
      data.append("special_interests", JSON.stringify(SpInterestData));
    }else{
      toastTBS.error("Please select at least one special interest");
      return;
    }
    if(ModalitiesData.length > 0) {
      data.append("modalities", JSON.stringify(ModalitiesData));
    }else{
      toastTBS.error("Please select at least one modality");
      return;
    }
      if(LanguagesData.length > 0) {
      data.append("languages", JSON.stringify(LanguagesData));
    }else{
      toastTBS.error("Please select at least one language");
      return;
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
        setisEdit(true);
        setUsername(formData.full_name);
              setIsProfileUpdated(Date.now());
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
          <div className=" w-full bg-white rounded-[10px] shadow-xl h-fit ">
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
                      <div className="lg:text-base md:text-sm text-xs text-[#C6C6C6] capitalize">{MMMUserData.role}</div>
                    </div>
                  </div>

                  {isEdit ? (<button onClick={() => setisEdit(false)} className="lg:py-3 py-1.25 flex items-center lg:gap-2.5 gap-[5px] lg:px-6.5 px-3.75 duration-500 cursor-pointer rounded-full bg-[linear-gradient(90deg,var(--color-AquaBlue)_0%,var(--color-primary)_100%)] text-white font-bold lg:text-lg md:tex-base text-sm lg:leading-6 leding-3 hover:opacity-90 transition">
                    <GoDotFill className="md:h-3 md:w-3 h-2 w-2" /> Edit
                  </button>) : (
                    <div className="flex gap-2">

                      <button className="lg:py-3 py-1.25 flex items-center lg:gap-2.5 gap-[5px] lg:px-6.5 px-3.75 duration-500 cursor-pointer rounded-full bg-[linear-gradient(90deg,var(--color-AquaBlue)_0%,var(--color-primary)_100%)] text-white font-bold lg:text-lg md:tex-base text-sm lg:leading-6 leding-3 hover:opacity-90 transition">
                        {landingData ? (<LoadingSpin width={2} height={11} />) : "Save"}
                      </button>
                      <button onClick={handleCancel} className="lg:py-3 py-1.25 flex items-center lg:gap-2.5 gap-[5px] lg:px-6.5 px-3.75 duration-500 cursor-pointer rounded-full bg-[linear-gradient(90deg,var(--color-AquaBlue)_0%,var(--color-primary)_100%)] text-white font-bold lg:text-lg md:tex-base text-sm lg:leading-6 leding-3 hover:opacity-90 transition">
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
                      Gender
                    </label>
                    <select name="gender" value={formData.gender}
                      onChange={handleChange} disabled={isEdit} className="w-full  text-primary text-sm px-4 py-2.5 rounded-md  leading-5 bg-primary/[0.08] outline-none">
                      <option value="" selected disabled>
                        Select Gender <span className="text-red-500">*</span>
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
                        Qualifications <span className="text-red-500">*</span>
                      </label>
                      <input
                        readOnly={isEdit}
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

                <div className="mt-5">
                  <h2 className=" w-full text-primary md:text-[25px] text-[20px] leading-9 mb-3 font-semibold">
                    Languages
                  </h2>
                  <div className="md:w-[100%] ">
                    <TagSelector selected={LanguagesData} setSelected={setLanguagesData} options={Languages} edit={isEdit}  />

                  </div>
                </div>
                <div className="mt-5">
                  <h2 className=" w-full text-primary md:text-[25px] text-[20px] leading-9 mb-3 font-semibold">
                    Special Interest
                  </h2>
                  <div className="md:w-[100%] ">
                    <TagSelector selected={SpInterestData} setSelected={setSpInterestData} options={SpecialInterest} edit={isEdit} />


                  </div>
                </div>
                <div className="mt-5">
                  <h2 className=" w-full text-primary md:text-[25px] text-[20px] leading-9 mb-3 font-semibold">
                    Modalities
                  </h2>
                  <div className="md:w-[100%] ">
                    <TagSelector selected={ModalitiesData} setSelected={setModalitiesData} options={Modalities} edit={isEdit} />

                  </div>
                </div>

                {!isEdit && (
                  <div className="flex gap-2 mt-10">
                    <button className="lg:py-3 py-1.25 flex items-center lg:gap-2.5 gap-[5px] lg:px-6.5 px-3.75 duration-500 cursor-pointer rounded-full bg-[linear-gradient(90deg,var(--color-AquaBlue)_0%,var(--color-primary)_100%)] text-white font-bold lg:text-lg md:tex-base text-sm lg:leading-6 leding-3 hover:opacity-90 transition">
                      {landingData ? (<LoadingSpin width={2} height={11} />) : "Save"}
                    </button>
                    <button onClick={handleCancel} className="lg:py-3 py-1.25 flex items-center lg:gap-2.5 gap-[5px] lg:px-6.5 px-3.75 duration-500 cursor-pointer rounded-full bg-[linear-gradient(90deg,var(--color-AquaBlue)_0%,var(--color-primary)_100%)] text-white font-bold lg:text-lg md:tex-base text-sm lg:leading-6 leding-3 hover:opacity-90 transition">
                      Cancel
                    </button>
                  </div>
                )}

              </div>
            </form>
            
<div className="w-245 mx-auto my-12 border border-red-200 rounded-xl p-5 bg-red-50">
  <h2 className="text-red-600 md:text-[25px] text-[20px] font-semibold mb-2">
    Account Deletion
  </h2>

  <p className="text-sm text-gray-700 leading-6">
    You may request permanent account deletion. After requesting deletion,
    your account will be deactivated immediately and permanently removed after
    <span className="font-semibold text-red-600"> 30 days</span>.
    During this recovery period.
  </p>

  {/* Checkbox */}
  <label className="flex items-start gap-3 mt-5 cursor-pointer">
    <input
      type="checkbox"
      checked={deleteChecked}
      onChange={(e) => setDeleteChecked(e.target.checked)}
      className="mt-1 accent-red-500"
    />

  <span className="text-sm text-gray-700">
  I understand that my account will be scheduled for deletion and can only be recovered within 30 days by contacting support via email.
</span>
  </label>

  {/* Button */}
  <button
    type="button"
    disabled={!deleteChecked}
    onClick={() => setShowDeleteModal(true)}
    className={`mt-5 px-6 py-3 rounded-full font-semibold transition 
      ${
        deleteChecked
          ? "bg-red-500 hover:bg-red-600 text-white cursor-pointer"
          : "bg-gray-300 text-gray-500 cursor-not-allowed"
      }
    `}
  >
    Request Account Deletion
  </button>
</div>
{showDeleteModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-5">
    <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl">
      <h3 className="text-xl font-semibold text-red-600 mb-3">
        Confirm Account Deletion
      </h3>

      <p className="text-gray-700 text-sm leading-6">
        Are you sure you want to request account deletion?
        <br />
        Your account can be recovered within
        <span className="font-semibold text-red-600">
          {" "}30 days
        </span>.
        After that, it may be permanently deleted.
      </p>

      <div className="flex justify-end gap-3 mt-6">
           <button
          onClick={() => setShowDeleteModal(false)}
          className="px-5 py-2 rounded-full border border-gray-300 hover:bg-gray-100 transition transition-all hover:-translate-y-1 cursor-pointer"
        >
          Cancel
        </button>

        <button
          onClick={handleDeleteAccount}
          disabled={deleteLoading}
          className="px-5 py-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition transition-all hover:-translate-y-1 cursor-pointer"
        >
          {deleteLoading ? "Please wait..." : "Yes, Delete"}
        </button>
      </div>
    </div>
  </div>
)}
          </div>
        </div>
      </WrapperBanner>
    </>
  );
}



