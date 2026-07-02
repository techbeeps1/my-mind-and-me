"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { IoNotifications } from "react-icons/io5";
import { RiMenu2Fill } from "react-icons/ri";
import { useProfile } from "@/services/ProfileContext";
import { deleteAllNotifications, deleteNotification, getNotifications } from "@/services/api";

import { TiDelete } from "react-icons/ti";
import { it } from "node:test";
import { toastTBS } from "@/lib/toast";
type HeaderDashboardProps = {
  menutrigger: React.Dispatch<React.SetStateAction<boolean>>;
};

type Notification = {
  body: string;
  id: string;
  status: string;
  subject: string;
};
export default function HeaderDashboard({ menutrigger }: HeaderDashboardProps) {
  const { profile, username, MMMUserData } = useProfile();
  const [notifications, setNotification] = useState<Notification[] | null>(
    null,
  );

  const profileUrl = "my-profile";
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
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

  useEffect(() => {
    if (MMMUserData?.id) {
      getNotifications(MMMUserData?.id, 1)
        .then((data) => {
          if (data.success) {
            setNotification(data.notifications);
             
          }
        })
        .then((error) => {
          console.error("Error fetching notifications:", error);
        });
    }
  }, [MMMUserData?.id]);

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

 function removeAllNotifications() {
    if (MMMUserData?.id) {
      deleteAllNotifications(MMMUserData?.id)
        .then(() => { 
          setNotification([]); // Clear all notifications from state  
        })
        .catch((error) => {
          toastTBS.error("Failed to clear notifications. Please try again.");
          console.error("Error deleting all notifications:", error);
        });
      }
    }

  function removenoitification(id: string) {
    deleteNotification(id)
      .then((data) => {
        if (data.success) {
          setNotification(
            (prevNotifications) =>
              prevNotifications?.filter(
                (notification) => notification.id !== id,
              ) || null,
          );
        }
      })
      .catch((error) => {
        console.error("Error deleting notification:", error);
      });
  }

  if (!MMMUserData) {
    return null; // or a loading spinner
  }

  return (
    <>
      <header className=" flex items-center justify-between bg-primary  p-5 sticky top-0 w-full z-[48]">
        <button
          onClick={() => {
            menutrigger((prev) => !prev);
          }}
          className="lg:hidden text-white"
        >
          <RiMenu2Fill className=" w-7 h-7" />
        </button>
        <div className="w-1/2 relative lg:block hidden"></div>
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
            <button
              onClick={() => setIsPopupOpen((prev) => !prev)}
              className=" relative md:w-10 md:h-10 w-7.5 h-7.5 cursor-pointer rounded-full text-primary bg-white flex items-center justify-center"
            >
              <IoNotifications className="md:h-auto md:w-auto h-3.5 w-3.5" />

              {/* Badge */}
              {notifications && notifications?.length > 0 && (
                <span className="absolute font-bold -top-1 -right-1 bg-[#e17474] text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full">
                  {notifications?.length}
                </span>
              )}
            </button>

            {/* 🪟 Popup Panel */}
            <div
              ref={popupRef}
              className={`absolute md:top-14 top-11.75 md:-right-7 -right-8.25 w-100 transition-all duration-300 ${
                isPopupOpen
                  ? "opacity-100 scale-100 visible"
                  : "opacity-0 scale-95 invisible"
              }`}
            >
              <div className="relative bg-gray-100 rounded-[10px] shadow-2xl pt-4 px-3.75">
                {/* Arrow */}
                <div className="absolute -top-1.75 right-10  w-5 h-5 bg-gray-100 rotate-45 "></div>

                <div>
                  <div className="max-h-90 space-y-2.5 custom-scroll overflow-y-auto pe-2.5">
                  {notifications &&
                    notifications.map((item) => (
                      <div
                        key={item.id}
                        className="flex gap-1 bg-white p-3 rounded-[10px] shadow-md hover:shadow-lg "
                      >
                        <div>
                          <h3 className="text-primary text-[13px] font-semibold">
                            {item.subject}
                          </h3>
                          <p className="text-[#333333] text-[11px] mt-1">
                            {item.body}
                          </p>
                        </div>
                        <div
                          onClick={() => {
                            removenoitification(item.id);
                          }}
                          className="text-right flex items-center justify-center text-[#e17474] text-[26px] font-semibold cursor-pointer transition-all duration-300 hover:translate-y-[-2px] hover:text-[#ff0000]"
                        >
                          <TiDelete />
                        </div>
                      </div>
                    ))}

                   {!notifications || notifications.length == 0 && (
                    <div className="flex justify-center items-center h-20">
                      <p className="text-[#333333] text-[16px] font-semibold">
                        No notifications available.
                      </p>
                    </div>
                  )}
                 
        
                    </div>
                    <div className="flex justify-end p-2">
                    { notifications && notifications.length > 0 && (
                      <button
                        onClick={removeAllNotifications}
                        className="text-primary text-[13px] font-semibold cursor-pointer transition-all duration-300 hover:translate-y-[-2px] hover:text-[#ff0000]"
                      >
                        Clear All
                      </button>
)}
                    </div>
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
                src={profile}
                alt="profile img"
                height={60}
                width={60}
                priority
                className="rounded-full object-cover md:h-12.5 md:w-12.5 h-10 w-10"
              />

              {/* Name & Role */}
              <div className="text-white md:block hidden">
                <p className="md:text-base text-sm  font-semibold">
                  {username || MMMUserData?.user_name}
                </p>
                <p className="md:text-sm text-xs text-[#C6C6C6] capitalize">
                  {MMMUserData?.role ?? ""}
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
                    {MMMUserData?.user_name}
                  </p>
                  <p className="md:text-base text-xs text-[#747474] capitalize">
                    {MMMUserData?.role ?? ""}
                  </p>
                </div>
                <ul className="space-y-3.75 md:text-[15px] md:p-0 p-5 text-sm text-black font-semibold">
                  <li className="cursor-pointer duration-300 hover:text-primary ">
                    <Link href={profileUrl}>Profile</Link>
                  </li>
                  <li className="cursor-pointer duration-300 hover:text-primary ">
                    <Link href="/change-password">Change password </Link>
                  </li>
                  <li className="cursor-pointer duration-300 hover:text-primary ">
                    <Link href="/logout">Log Out</Link>
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
