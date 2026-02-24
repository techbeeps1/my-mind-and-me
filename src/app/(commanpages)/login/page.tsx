'use client'
import { url } from "inspector";
import Image from "next/image";
import Link from "next/link";
import { GoPlus,GoEyeClosed,GoEye } from "react-icons/go";
import SidebarMenu from "../../components/Sidebar";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { CiLock } from "react-icons/ci";
import { useState } from "react";

export default function Home() {
const [passVisble,setPassVisble] = useState(false);

  const steps = [
    "Understand The Patient",
    "Evaluation",
    "Assessment Continued",
    "Diagnostic",
    "Re-Do Initial Assessment",
  ];
  return (
    <>


      <main>
        {/* hero section */}
        <section className="relative h-screen w-full overflow-hidden">
          {/* Background Image */}
          <Image
            src="/banner-bg.jpg"
            alt="Mental Health Banner"
            fill
            priority
            className="object-cover"
          />
          <div className="min-h-screen flex items-center justify-center px-4">

            {/* Card */}
            <div className="w-full max-w-[584px] z-1 bg-white rounded-[10px] shadow-[0_4px_50px_hsl(0_0%_0%_/_20%)] md:p-[40px] p-[25px]">

              {/* Title */}
              <h1 className="text-[35px] leading-[36px] font-semibold text-center text-primary mb-[40px]">
                Login
              </h1>
              <div className="space-y-[24px]">
                {/* Username */}
                <label className="block text-sm font-semibold leading-[24px] text-primary mb-[8px]">
                  Username or email
                </label>
                <div className="flex items-center gap-[12px] bg-primary/[0.08] rounded-md px-[16px] py-[10px]">
                  <HiOutlineUserCircle className="h-[20px] w-[20px] text-primary" />
                  <input
                    type="text"
                    placeholder="Username or email"
                    className="w-full text-primary text-sm placeholder:text-primary leading-[20px] bg-transparent  outline-none text-sm"
                  />
                </div>
                {/* Password */}
                <div>
                  <div className="flex justify-between mb-1">
                    <label className="text-sm leading-[24px] text-primary">Password</label>
                    <Link href="#" className="text-sm font-bold text-primary hover:underline">
                      Forgot Password?
                    </Link>
                  </div>

                  <div className="flex items-center gap-[12px] bg-primary/[0.08] rounded-md px-[16px] py-[10px]">
                    <CiLock  className="h-[20px] w-[20px] text-primary"/>
                    <input
                      type={passVisble?"text":"password"}
                      placeholder="Password"
                      className="w-full bg-transparent w-full text-primary text-sm placeholder:text-primary leading-[20px] bg-transparent  outline-none text-sm"
                    />
                    <span className="text-gray-400 cursor-pointer text-primary" onClick={()=> setPassVisble(!passVisble)}> { passVisble ? <GoEye /> :  <GoEyeClosed />} </span>
               
                  </div>
                </div>

                {/* Remember me */}
                <div className="flex items-center gap-2 mb-6">
                  <input type="checkbox" className="text-primary" />
                  <span className="text-sm text-primary">Remember Me</span>
                </div>

                {/* Button */}
                <button className="w-full py-[12px] cursor-pointer rounded-full bg-[linear-gradient(90deg,var(--color-AquaBlue)_0%,var(--color-primary)_100%)] text-white font-bold text-lg leading-[24px] hover:opacity-90 transition">
                  Log In
                </button>
              </div>

              {/* Footer */}
              <p className="text-center text-sm text-primary leading-[14px] mt-[30px]">
                Do not have an account?{" "}
                <Link href="#" className="text-[#1F625F] font-bold hover:underline">
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </section>
      </main>

    </>
  );
}
