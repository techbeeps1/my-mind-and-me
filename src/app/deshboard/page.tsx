"use client";
import { url } from "inspector";
import Image from "next/image";
import Link from "next/link";


import WrapperBanner from "../components/WraperBanner";

export default function Home() {
  
  const steps = [
    "Understand The Patient",
    "Evaluation",
    "Assessment Continued",
    "Diagnostic",
    "Re-Do Initial Assessment",
  ];
  return (
    <>
      <WrapperBanner>
          <div className="flex-1 flex justify-start md:p-7.5 px-5 py-7.5">
            <div className="max-w-337.5 w-full bg-white rounded-[10px] shadow-xl h-fit ">
              <h2 className="text-center rounded-t-[10px] bg-[linear-gradient(90deg,#56e1e845_70%,var(--color-background)_100%)]  w-full text-primary md:text-[25px] text-[20px] leading-9 py-3 font-semibold md:mb-11.25 mb-7.5">
                Medical Credentials
              </h2>
              <div className="w-132.5 max-w-full mx-auto md:mb-11.25 mb-7.5 md:p-0 px-5">
                <div className="md:mb-6 mb-3.75">
                  <label className="text-sm block font-semibold leading-6 text-primary mb-2">
                    License number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="License number"
                    className="w-full  text-primary text-sm px-4 py-2.5 rounded-md placeholder:text-primary leading-5 bg-primary/[0.08]  outline-none "
                  />
                </div>
                <div className="md:mb-10 mb-3.75">
                  <label className="text-sm font-semibold block leading-6 text-primary mb-2">
                    Registration <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Registration"
                    className="w-full  text-primary text-sm px-4 py-2.5 rounded-md placeholder:text-primary leading-5 bg-primary/[0.08]  outline-none"
                  />
                </div>
                <div className="flex justify-center">
                  <button className="py-3 px-15 md:w-auto w-full cursor-pointer rounded-full bg-[linear-gradient(90deg,var(--color-AquaBlue)_0%,var(--color-primary)_100%)] text-white font-bold text-lg leading-6 hover:opacity-90 transition">
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>        
      </WrapperBanner>
    </>
  );
}
