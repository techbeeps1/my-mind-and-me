"use client";

import WrapperBanner from "@/app/components/WraperBanner";
import Image from "next/image";
import { FaRegUser, FaPhone } from "react-icons/fa6";
import { SlCalender } from "react-icons/sl";
import { GoDotFill } from "react-icons/go";
export default function DoctorProfile() {
  return (
    <>
      <WrapperBanner>
        <div className="flex-1 flex justify-start md:p-7.5 px-5 py-7.5">
          <div className="max-w-337.5 w-full bg-white rounded-[10px] shadow-xl h-fit ">
            <h2 className="text-center rounded-t-[10px] bg-[linear-gradient(90deg,#56e1e845_70%,var(--color-background)_100%)]  w-full text-primary md:text-[25px] text-[20px] leading-9 py-3 font-semibold md:mb-11.25 mb-7.5">
              Profile
            </h2>
            <div className="w-245  max-w-full mx-auto md:mb-11.25 mb-7.5 px-5">
              <div className="flex justify-between mb-7.5 items-center gap-4 text-white">
                <div className="flex items-center gap-2.5">
                  <Image
                    src="/profile-img.png"
                    alt="profile img"
                    height={60}
                    width={60}
                    priority
                    className="object-cover md:h-15 md:w-15 h-10 w-10"
                  />
                  <div className="lg:text-lg md:text-base text-sm text-primary">
                    <div className="font-semibold">Ashley Lars</div>
                    <div className="lg:text-base md:text-sm text-xs text-[#C6C6C6]">
                      Receptionist
                    </div>
                  </div>
                </div>
                <button className="lg:py-3 py-1.25 flex items-center lg:gap-2.5 gap-[5px] lg:px-6.5 px-3.75 duration-500 cursor-pointer rounded-full bg-[linear-gradient(90deg,var(--color-AquaBlue)_0%,var(--color-primary)_100%)] text-white font-bold lg:text-lg md:tex-base text-sm lg:leading-6 leding-3 hover:opacity-90 transition">
                  <GoDotFill className="md:h-3 md:w-3 h-2 w-2" /> Edit
                </button>
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
                      type="text"
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
                      type="tel"
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
                  <select className="w-full  text-primary text-sm px-4 py-2.5 rounded-md  leading-5 bg-primary/[0.08] outline-none">
                    <option>Male</option>
                    <option>Female</option>
                  </select>
                </div>
                {/* Phone */}
                <div className="w-full">
                  <label className="block text-sm font-semibold leading-[24px] text-primary mb-[8px]">
                    Phone
                  </label>
                  <div className="flex items-center gap-[12px] bg-primary/[0.08] rounded-md px-[16px] py-[10px]">
                    <input
                      type="DOB"
                      placeholder="DD/MM/YYYY"
                      className="w-full text-primary text-sm placeholder:text-primary leading-[20px] bg-transparent  outline-none text-sm"
                    />
                    <SlCalender className="h-[15px] w-[15px] text-primary" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </WrapperBanner>
    </>
  );
}
