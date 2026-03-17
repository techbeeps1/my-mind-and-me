"use client";

import { useState } from "react";
import { HiArrowNarrowRight } from "react-icons/hi";
import Link from "next/link";
import { GoDotFill } from "react-icons/go";

export default function SidebarMenu() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* MENU BUTTON (top right) */}
      <button
        onClick={() => setOpen(true)}
        className="flex md:w-71.25 w-auto md:justify-between justify-end md:p-5.5 p-0 md:border-t border-0 lg:absolute relative cursor-pointer right-0 items-center gap-3 text-white"
      >
        <span className="text-sm tracking-widest md:block hidden">MENU</span>
        <span className="grid grid-cols-3 gap-1">
          {[...Array(9)].map((_, i) => (
            <span key={i} className="w-1 h-1 bg-white rounded-full"></span>
          ))}
        </span>
      </button>

      {/* OVERLAY */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity duration-500
        ${open ? "opacity-100 visible" : "opacity-0 invisible"}`}
      />

      {/* SIDEBAR */}
      <aside
        className={`fixed top-[12%] right-0 2xl:h-[80%] w-[90%] sm:w-111.5 z-50
        bg-[linear-gradient(220deg,var(--color-AquaBlue)_0%,var(--color-background)_90%)]
        rounded-[20px] shadow-xl
        transform transition-transform duration-700 ease-in-out
        ${open ? "-translate-x-[30px]" : "translate-x-full"}`}
      >
        {/* CLOSE */}
        <div className="2xl:p-12.5 p-7.5">
          <button
            onClick={() => setOpen(false)}
            className=" cursor-pointer flex items-center gap-2.5 text-primary font-semibold text-lg"
          >
            CLOSE{" "}
            <span className="text-[24px]">
              <HiArrowNarrowRight />
            </span>
          </button>

          {/* CONTENT */}
          <div className="h-full 2xl:mt-35 mt-12.5 flex flex-col justify-center  space-y-7.5">
            <h2 className="2xl:text-[44px] text-[30px] text-primary 2xl:leading-12.5 leading-10">
              My Mind <br /> And Me
            </h2>

            <ul className="2xl:space-y-7.5 space-y-5 text-primary font-bold uppercase 2xl:text-[18px] ">
              <li>
                <Link href={"#"} className="hover:text-AquaBlue duration-500">
                  Twitter
                </Link>
              </li>
              <li>
                <Link href={"#"} className="hover:text-AquaBlue duration-500">
                  Linkedin
                </Link>
              </li>
              <li>
                <Link href={"#"} className="hover:text-AquaBlue duration-500">
                  Email
                </Link>
              </li>
            </ul>
            <div className="flex gap-5">
              <Link
                href="login"
                className=" cursor-pointer max-w-fit text-white flex items-center gap-2.5 rounded-full bg-[linear-gradient(90deg,var(--color-AquaBlue)_0%,var(--color-primary)_90%)] 2xl:px-6.5 2xl:py-3 px-5 py-2.5 2xl:text-lg font-bold"
              >
                <GoDotFill className="h-3 w-3" /> Login
              </Link>
              <Link
                href="sign-up"
                className=" cursor-pointer text-white max-w-fit flex items-center gap-2.5 rounded-full bg-[linear-gradient(90deg,var(--color-AquaBlue)_0%,var(--color-primary)_90%)] 2xl:px-6.5 2xl:py-3 px-5 py-2.5 2xl:text-lg font-bold"
              >
                <GoDotFill className="h-3 w-3" /> Join Us
              </Link>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
