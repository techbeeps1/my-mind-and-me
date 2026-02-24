"use client";

import { useState } from "react";
import { HiArrowNarrowRight } from "react-icons/hi";
import Link from "next/link";
import { GoDotFill } from "react-icons/go";
import Image from "next/image";

export default function SidebarDashBoard({ ishide }: { ishide: boolean }) {
    const [open, setOpen] = useState(false);
    

    return (
        <>
          <div className={`w-85  lg:mt-0 md:mt-25 mt-22.5 fixed left-0 h-full top-0 z-2 max-w-full bg-[linear-gradient(50deg,var(--color-AquaBlue)_-95%,var(--color-white)_100%)]  py-5 transform transition-all duration-500 ease-in-out  ${ishide?'w-0 lg:w-85 invisible lg:visible -translate-x-full lg:translate-x-0 ':' translate-x-0 visible lg:w-85'}`}>
            <div className="pb-6.5 border-b-4 border-primary lg:ps-12.5 ps-7.5">
              {/* Logo */}
              <Image
                src="/logo-deshboard.svg"
                alt="logo deshboard "
                height={90}
                width={80}
                priority
                className="object-cover"
              />
            </div>

            <nav className="space-y-4.5 text-primary lg:text-lg font-bold mt-7.5 lg:ps-12.5 ps-7.5">
              <button className="bg-white text-left w-full rounded-l-full px-3.75 py-2.5  cursor-pointer">Medical Credentials</button>
              <button className="text-left cursor-pointer w-full px-3.75 py-2.5">Practice Info</button>
              <button className="text-left cursor-pointer w-full px-3.75 py-2.5">Specialty</button>
              <button className=" text-left cursor-pointer w-full px-3.75 py-2.5">Referral History</button>
            </nav>
          </div>
        </>
    );
}
