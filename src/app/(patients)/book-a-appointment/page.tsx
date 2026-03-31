"use client";

import Image from "next/image";
import { FaRegUser, FaPhone } from "react-icons/fa6";
import { SlCalender } from "react-icons/sl";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import "../../Datepicker.css";

import { useEffect, useState } from "react";
import {
  imagePath,
  referralProfile,
  referralProfileEdit,
} from "@/services/api";
import { toastTBS } from "@/lib/toast";
import LoadingSpin from "@/components/LoadingSpin";
import { useRouter } from "next/navigation";
import { RiImageEditFill } from "react-icons/ri";
import WrapperBanner from "@/components/WraperBanner";
const timeSlots = [
  "10:00 AM - 11:00 AM",
  "10:10 AM - 11:10 AM",
  "10:20 AM - 11:20 AM",
  "10:30 AM - 11:30 AM",
  "10:40 AM - 11:40 AM",
  "10:50 AM - 11:50 AM",
  "11:00 AM - 12:00 PM",
  "11:10 AM - 12:10 PM",
  "11:20 AM - 12:20 PM",
  "11:30 AM - 12:30 PM",
  "11:40 AM - 12:40 PM",
  "11:50 AM - 12:50 PM",
  "12:00 PM - 01:00 PM",
  "12:10 PM - 01:10 PM",
  "12:20 PM - 01:20 PM",
  "12:30 PM - 01:30 PM",
];

const StepProgress = ({ step }: { step: number }) => {
  const steps = [1, 2, 3];
  return (
    <div className="flex px-5 items-center justify-between w-full max-w-xl mx-auto mb-10">
      {steps.map((item, index) => {
        const isCompleted = step > item;
        const isActive = step === item;
        return (
          <div
            key={item}
            className={`flex items-center ${index !== steps.length - 1 ? "w-full" : ""}`}
          >
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

export default function DoctorProfileComplete() {
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

  const [step, setStep] = useState(1);

  const validateStep = (step: number, data: FormDataType) => {
    const errors: string[] = [];

    // if (step === 1) {
    //   if (!data.full_name.trim()) {
    //     errors.push("Full Name is required");
    //   } else if (!/^[A-Za-z\s]+$/.test(data.full_name)) {
    //     errors.push("Full Name should contain only letters and spaces");
    //   }
    //   if (!data.phone.trim()) errors.push("Phone number is required");
    //   else if (!/^[6-9]\d{9}$/.test(data.phone))
    //     errors.push("Enter valid 10-digit phone number");

    //   if (!data.gender) errors.push("Please select gender");
    //   if (!data.dob) errors.push("Date of birth is required");
    // }

    // if (step === 2) {
    //   if (!data.license_number.trim())
    //     errors.push("License number is required");

    //   if (!data.registration.trim())
    //     errors.push("Registration number is required");
    // }

    // if (step === 3) {
    //   if (!data.clinic_phone.trim()) errors.push("Clinic phone is required");
    //   else if (!/^[6-9]\d{9}$/.test(data.clinic_phone))
    //     errors.push("Enter valid 10-digit phone number");

    //   if (!data.address.trim()) errors.push("Address is required");
    // }

    // if (step === 4) {
    //   if (!data.special_interest) errors.push("Please select special interest");
    // }

    return errors;
  };

  function nextStep() {
    const errors = validateStep(step, formData);
    if (errors.length > 0) {
      // show first error OR all errors
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
    referralProfile(MMMUserData?.id)
      .then((data) => {
        setLanding(false);
        // setFormData(data.data);
        // setPreview(imagePath + data.data.profile_image || "/profile-img.png");
      })
      .catch((err) => {
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

    if (profileImage) {
      data.append("profile_image", profileImage as Blob);
    } else {
      data.delete("profile_image");
    }

    if (landingData) return;
    setLandingData(true);
    try {
      const res = await referralProfileEdit(data);
      if (res.status) {
        toastTBS.success("Profile updated successfully");
        //router.push("dashboard");

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

  const [selectedDate, setSelectedDate] = useState();
  const [selectedTime, setSelectedTime] = useState(null);

  if (landing) {
    return (
      <div
        className=" bg-cover bg-center bg-no-repeat min-h-screen "
        style={{ backgroundImage: "url('/banner-bg.jpg')" }}
      >
        <div className="flex-1 flex justify-center items-center h-[70vh]">
          <LoadingSpin />
        </div>
      </div>
    );
  }
  return (
    <>
      <WrapperBanner>
        <div
          className=" bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/banner-bg.jpg')" }}
        >
          <div className="flex-1 flex justify-center md:p-7.5 px-5 py-7.5">
            <div className="w-full bg-white rounded-[10px] shadow-xl h-fit ">
              <h2 className="text-center rounded-t-[10px] bg-[linear-gradient(90deg,#56e1e845_70%,var(--color-background)_100%)]  w-full text-primary md:text-[25px] text-[20px] leading-9 py-3 font-semibold md:mb-2.25 mb-2.5">
                Book a Appointment
              </h2>
              <div>
                <StepProgress step={step} />
              </div>
              <form onSubmit={handleSave}>
                <div className=" md:mb-11.25 mb-7.5 px-5">
                  {step === 1 && (
                    <>
                    <div className="w-full max-w-md mx-auto">
                      <h2 className=" w-full text-primary md:text-[25px] text-[20px] leading-9 mb-3 font-semibold">
                        Select Practitioner
                      </h2>

                      <div className="w-full">
                        <select
                          name="gender"
                          value={formData.gender}
                          onChange={handleChange}
                          className="w-full  text-primary text-sm px-4 py-2.5 rounded-md  leading-5 bg-primary/[0.08] outline-none"
                        >
                          <option value="" disabled selected>
                            Select gender
                          </option>
                          <option value="male">patients</option>
                          <option value="female">Practitioner</option>
                          <option value="other">Doctor</option>
                        </select>
                      </div>
                      </div>
                    </>
                  )}
                  {step === 2 && (
                    <div className="mt-5">
                      <div className="flex flex-col lg:flex-row gap-8 md:p-6 p-0">
                        {/* Calendar Section */}
                        <div className="bg-white lg:shadow rounded-xl lg:p-4 p-0 w-full lg:w-1/2">
                          <h3 className="text-lg font-semibold mb-3 text-primary">
                            Select Date
                          </h3>

                          <DayPicker
                            mode="single"
                            selected={selectedDate}
                            onSelect={setSelectedDate}
                            className="rounded-md border md:p-5 p-2 w-full"
                          />
                        </div>

                        {/* Time Slots Section */}
                        <div className="bg-white lg:shadow lg:rounded-xl lg:p-4 w-full lg:w-1/2">
                          <h3 className="text-lg font-semibold mb-3 text-primary">
                            Select preferred time slot
                          </h3>

                          <div className="grid grid-cols-2 gap-3 lg:bg-none bg-primary/8 lg:p-0 p-3.75 lg:rounded-0 rounded-xl">
                            {timeSlots.map((slot, index) => (
                              <button
                                key={index}
                                onClick={() => setSelectedTime(slot)}
                                className={` border border-primary text-primary cursor-pointer duration-400 rounded-lg p-2 text-sm font-semibold ${
                                  selectedTime === slot
                                    ? "bg-primary text-white"
                                    : "hover:bg-primary hover:text-white"
                                }`}
                              >
                                {slot}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {step === 3 && (
                    <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-lg p-6">
                      {/* Title */}
                      <h3 className="text-xl font-bold text-primary mb-5">
                        Booking Summary
                      </h3>

                      {/* Content */}
                      <div className="space-y-3 text-sm text-gray-600">
                        <div className="flex justify-between">
                          <span>Practitioner Name</span>
                          <span className="font-semibold text-gray-800">
                            Alexa Rawles
                          </span>
                        </div>                       

                        <div className="flex justify-between">
                          <span>Date</span>
                          <span className="font-semibold text-gray-800">
                            14/06/2025
                          </span>
                        </div>

                        <div className="flex justify-between">
                          <span>Time</span>
                          <span className="font-semibold text-gray-800">
                            10:00 AM - 11:00 AM
                          </span>
                        </div>

                        <div className="flex justify-between">
                          <span>Appointment Fee</span>
                          <span className="font-semibold text-gray-800">
                            KES 100
                          </span>
                        </div>
                      </div>

                      {/* Divider */}
                      <div className="border-t my-4"></div>

                      {/* Total */}
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700 font-semibold">
                          Amount to Pay
                        </span>
                        <span className="text-lg font-bold text-primary">
                          KES 2,500
                        </span>
                      </div>
                    </div>
                  )}
                  <div className="flex justify-center mt-10 gap-2">
                    {step > 1 && (
                      <button
                        type="button"
                        onClick={() => setStep(step - 1)}
                        className="lg:py-3 py-1.25 flex items-center lg:gap-2.5 gap-[5px] lg:px-6.5 px-3.75 duration-500 cursor-pointer rounded-full bg-[linear-gradient(90deg,var(--color-AquaBlue)_0%,var(--color-primary)_100%)] text-white font-bold lg:text-lg md:tex-base text-sm lg:leading-6 leding-3 hover:opacity-90 transition"
                      >
                        Back
                      </button>
                    )}

                    {step < 3 && (
                      <button
                        type="button"
                        onClick={nextStep}
                        className="lg:py-3 py-1.25 flex items-center lg:gap-2.5 gap-[5px] lg:px-6.5 px-3.75 duration-500 cursor-pointer rounded-full bg-[linear-gradient(90deg,var(--color-AquaBlue)_0%,var(--color-primary)_100%)] text-white font-bold lg:text-lg md:tex-base text-sm lg:leading-6 leding-3 hover:opacity-90 transition"
                      >
                        Next
                      </button>
                    )}

                    {step === 3 && (
                      <button className="lg:py-3 py-1.25 flex items-center lg:gap-2.5 gap-[5px] lg:px-6.5 px-3.75 duration-500 cursor-pointer rounded-full bg-[linear-gradient(90deg,var(--color-AquaBlue)_0%,var(--color-primary)_100%)] text-white font-bold lg:text-lg md:tex-base text-sm lg:leading-6 leding-3 hover:opacity-90 transition">
                        {landingData ? (
                          <LoadingSpin width={2} height={11} />
                        ) : (
                          "Book Now"
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </WrapperBanner>
    </>
  );
}
