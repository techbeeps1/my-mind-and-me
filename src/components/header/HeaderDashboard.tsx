"use client";

import { useEffect, useRef, useState } from "react";
import { HiArrowNarrowRight } from "react-icons/hi";
import Link from "next/link";
import { GoDotFill } from "react-icons/go";
import Image from "next/image";
import { FiSearch } from "react-icons/fi";
import { IoNotifications, IoClose } from "react-icons/io5";
import { RiMenu2Fill } from "react-icons/ri";
type HeaderDashboardProps = {
  menutrigger: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function HeaderDashboard({ menutrigger }: HeaderDashboardProps) {
  const [open, setOpen] = useState(true);
  // 🔁 state variable renamed
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  // ✅ proper typing for ref
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // ✅ outside click handler with proper typing
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const popupRef = useRef<HTMLDivElement | null>(null);

  // Close on outside click + ESC
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        setIsPopupOpen(false);
      }
    };

    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsPopupOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  return (
    <>
      <header className=" flex items-center justify-between bg-primary lg:px-8 lg:py-10 p-5 sticky top-0 w-full">
        <button
          onClick={() => {
            setOpen(!open);
            menutrigger((prev) => !prev);
          }}
          className="lg:hidden text-white"
        >
          {open ? (
            <RiMenu2Fill className=" w-7 h-7" />
          ) : (
            <IoClose className=" w-7 h-7" />
          )}
        </button>
        <div className="w-1/2 relative lg:block hidden">
          {/* <input
            type="text"
            placeholder="Search"
            className="w-full rounded-[10px] placeholder:text-primary font-semibold bg-white text-primary px-6 py-3.75 outline-none"
          />
          <button className="absolute top-1/2 right-6 z-1 cursor-pointer text-primary -translate-y-1/2 transform ">
            <FiSearch className=" h-5 w-5  " />
          </button> */}
        </div>
        <div className="lg:hidden ">
          {/* Logo */}
          <Image
            src="Nadia_Logo 1.svg"
            alt="logo deshboard "
            height={90}
            width={80}
            priority
            className="object-cover md:h-15 md:w-15 h-12.5 w-12.5 "
          />
        </div>
        <div className="flex items-center gap-4 text-white">
          <div className="relative flex justify-end">
            {/* 🔔 Bell Button */}
            <button
              onClick={() => setIsPopupOpen((prev) => !prev)}
              className=" relative md:w-10 md:h-10 w-7.5 h-7.5 cursor-pointer rounded-full text-primary bg-white flex items-center justify-center"
            >
              <IoNotifications className="md:h-auto md:w-auto h-3.5 w-3.5" />

              {/* Badge */}
              <span className="absolute font-bold -top-1 -right-1 bg-[#e17474] text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full">
                3
              </span>
            </button>

            {/* 🪟 Popup Panel */}
            <div
              ref={popupRef}
              className={`absolute md:top-14 top-11.75 md:-right-4 -right-8.25 w-62.5 transition-all duration-300 ${
                isPopupOpen
                  ? "opacity-100 scale-100 visible"
                  : "opacity-0 scale-95 invisible"
              }`}
            >
              <div className="relative bg-gray-100 rounded-[10px] shadow-2xl py-5 px-3.75">
                {/* Arrow */}
                <div className="absolute -top-1.75 right-10  w-5 h-5 bg-gray-100 rotate-45 "></div>

                <div className="space-y-2.5">
                  {[1, 2, 3].map((item) => (
                    <div key={item}>
                      <h3 className="text-primary text-[13px] font-semibold">
                        Transaction Confirmed
                      </h3>
                      <p className="text-[#333333] text-[10px] mt-1">
                        Your payment was successfully deposited into escrow. 290
                        DAI
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="relative inline-block" ref={dropdownRef}>
            {/* Header */}
            <div
              onClick={() => setIsDropdownOpen((prev) => !prev)}
              className="flex items-center gap-4 cursor-pointer select-none"
            >
              {/* Profile Image */}
              <Image
                src="/profile-img.png"
                alt="profile img"
                height={60}
                width={60}
                priority
                className="object-cover md:h-15 md:w-15 h-10 w-10"
              />

              {/* Name & Role */}
              <div className="text-white md:block hidden">
                <p className="md:text-lg text-sm  font-semibold">Ashley Lars</p>
                <p className="md:text-base text-xs text-[#C6C6C6]">
                  Receptionist
                </p>
              </div>

              {/* Arrow */}
              <svg
                className={`w-6 h-6 text-white transition-transform duration-300 ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>

            {/* Dropdown */}
            {isDropdownOpen && (
              <div className="absolute right-0 md-w-auto w-45 mt-2.5 bg-gray-100 rounded-[10px] shadow-xl md:py-5 md:px-6.25  z-50">
                <div className="text-primary md:hidden p-5 pb-2.5 border-b-2  border-primary ">
                  <p className="md:text-lg text-sm  font-semibold">
                    Ashley Lars
                  </p>
                  <p className="md:text-base text-xs text-[#747474]">
                    Receptionist
                  </p>
                </div>
                <ul className="space-y-3.75 md:text-[15px] md:p-0 p-5 text-sm text-black font-semibold">
                  <li className="cursor-pointer duration-300 hover:text-primary ">
                    Profile
                  </li>
                  <li className="cursor-pointer duration-300 hover:text-primary ">
                    Change password
                  </li>
                  <li className="cursor-pointer duration-300 hover:text-primary ">
                    Log Out
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
}
