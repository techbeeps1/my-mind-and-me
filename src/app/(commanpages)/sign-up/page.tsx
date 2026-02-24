'use client'
import { url } from "inspector";
import Image from "next/image";
import Link from "next/link";
import { GoPlus, GoEyeClosed, GoEye } from "react-icons/go";
import SidebarMenu from "../../components/Sidebar";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { CiLock } from "react-icons/ci";
import { useState } from "react";
import { LuMail } from "react-icons/lu";
import { FaRegUser, FaPhone } from "react-icons/fa6";



export default function Home() {
  const [passVisble, setPassVisble] = useState(false);
  const [confpassVisble, setConfPassVisble] = useState(false);
  const [userRole, setUserRole] = useState('');

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
            <div className="w-full max-w-[680px] z-1 bg-white rounded-[10px] shadow-[0_4px_50px_hsl(0_0%_0%_/_20%)] md:p-[30px] p-[25px]">
              <h1 className="text-[35px] leading-[36px] font-semibold text-center text-primary mb-[40px]">
                Sign Up
              </h1>            
              <div className="mb-[15px]">
                <p className="font-semibold text-primary leading-[24px] mb-2">
                  Role Selection
                </p>
                <div className="flex justify-between">
                  {["Patient", "Practitioner", "Referrer"].map((role, i) => (
                    <label
                      key={role}
                      className={`flex items-center gap-2 w-[175px] max-w-full px-4 py-2 rounded-lg font-semibold cursor-pointer text-[15px] text-primary
                ${role === userRole ? "bg-primary/[0.08] border-primary/[0.08] " : " border border-primary/[0.08]"}`}
                    >
                      <input
                        type="radio"
                        name="role"
                        defaultChecked={i === 0}
                        className="primary"
                        value={role}
                        onChange={(e)=>setUserRole(e.target.value)}
                      />
                      {role}
                    </label>
                  ))}
                </div>
              </div>
              <div className="space-y-[15px]">
                {/* Username */}
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
               <div className="flex gap-[20px] justify-between">
                <div className="w-full">
                  {/* email */}
                  <label className="block text-sm font-semibold leading-[24px] text-primary mb-[8px]">
                    Email
                  </label>
                  <div className="flex items-center gap-[12px] bg-primary/[0.08] rounded-md px-[16px] py-[10px]">
                    <LuMail className="h-[20px] w-[20px] text-primary" />
                    <input
                      type="email"
                      placeholder="Email"
                      className="w-full text-primary text-sm placeholder:text-primary leading-[20px] bg-transparent  outline-none text-sm"
                    />
                  </div>
                </div>
                {/* Phone */}
                <div className="w-full">
                  <label className="block text-sm font-semibold leading-[24px] text-primary mb-[8px]">Phone</label>
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
                <div className="flex gap-[20px] justify-between">
                {/* Password */}
                <div className="space-y-[8px] w-full">
                  <label className="text-sm block leading-[24px] text-primary font-semibold">Password</label>
                  <div className="flex items-center gap-[12px] bg-primary/[0.08] rounded-md px-[16px] py-[10px]">
                    <CiLock className="h-[20px] w-[20px] text-primary" />
                    <input
                      type={passVisble ? "text" : "password"}
                      placeholder="Password"
                      className="w-full bg-transparent w-full text-primary text-sm placeholder:text-primary leading-[20px] bg-transparent  outline-none text-sm"

                    />
                    <span className="text-gray-400 cursor-pointer text-primary" onClick={() => setPassVisble(!passVisble)}> {passVisble ? <GoEye /> : <GoEyeClosed />} </span>
                  </div>
                  <p className="text-primary text-sm leading-[20px]">Minimum length is 8 characters.</p>
                </div>
                {/* Confirm Password */}
                <div className="space-y-[8px] w-full">
                  <label className="text-sm block leading-[24px] text-primary font-semibold">Confirm Password</label>
                  <div className="flex items-center gap-[12px] bg-primary/[0.08] rounded-md px-[16px] py-[10px]">
                    <CiLock className="h-[20px] w-[20px] text-primary" />
                    <input
                      type={confpassVisble ? "text" : "password"}
                      placeholder="Confirm Password"
                      className="w-full bg-transparent w-full text-primary text-sm placeholder:text-primary leading-[20px] bg-transparent  outline-none text-sm"

                    />
                    <span className="text-gray-400 cursor-pointer text-primary" onClick={() => setConfPassVisble(!confpassVisble)}> {confpassVisble ? <GoEye /> : <GoEyeClosed />} </span>
                  </div>
                  
                </div>
                </div>
                {/* Remember me */}
                <div className="flex items-center gap-2 mb-6">
                  <input type="checkbox" className="text-primary" />
                  <span className="text-sm text-primary">I agree to the <Link href={"#"} className="font-semibold underline">Terms & Conditions</Link> </span>
                </div>

                {/* Button */}
                <button disabled={true} className="disabled w-full py-[12px] duration-400 cursor-pointer rounded-full bg-[linear-gradient(90deg,var(--color-AquaBlue)_0%,var(--color-primary)_100%)] text-white font-bold text-lg leading-[24px] hover:opacity-90 transition">
                  Sign up
                </button>
              </div>

              {/* Footer */}
              <p className="text-center text-sm text-primary leading-[14px] mt-[30px]">
                Do not have an account?{" "}
                <Link href="#" className="text-[#1F625F] font-bold hover:underline">
                  Log In
                </Link>
              </p>
            </div>
          </div>
        </section>
      </main>

    </>
  );
}
