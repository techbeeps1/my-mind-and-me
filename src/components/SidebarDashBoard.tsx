"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState, useMemo, useCallback } from "react";

import { useProfile } from "@/services/ProfileContext";
import { IoClose } from "react-icons/io5";
import {
  FiHome,
  FiUser,
  FiUsers,
  FiCalendar,
  FiFileText,
  FiCreditCard,
  FiChevronDown,
  FiMenu,
} from "react-icons/fi";
import { LuFileVideo2 } from "react-icons/lu";

type MenuItem = {
  name: string;
  path?: string;
  icon: React.ReactNode;
  children?: { name: string; path: string }[];
};

export default function SidebarDashBoard({
  ishide,
  menutrigger,
  collapsed,
  setCollapsed,
}: {
  ishide: boolean;
  menutrigger: (hide: boolean) => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}) {
  const { MMMUserData } = useProfile();
  const pathname = usePathname();

  const [openMenus, setOpenMenus] = useState<string[]>([]);

  const referrerMenu: MenuItem[] = [
    { name: "Dashboard", path: "/dashboard", icon: <FiHome /> },
    { name: "Refer", path: "/refer", icon: <FiUser /> },
    {
      name: "Referral History",
      path: "/referral-history",
      icon: <FiFileText />,
    },
    { name: "Patients", path: "/patients-list" , icon: <FiUsers /> },
    { name: "Profile", path: "/my-profile", icon: <FiUser /> },
  ];

  const patientMenu: MenuItem[] = [
    { name: "Dashboard", path: "/dashboard", icon: <FiHome /> },
    {
      name: "Appointments",
      icon: <FiCalendar />,
      children: [
        { name: "Book Appointment", path: "/book-a-appointment" },
        { name: "Booking History", path: "/booking-history" },
      ],
    },
    { name: "Progress", path: "/progress", icon: <FiFileText /> },
    { name: "Resources", icon: <LuFileVideo2 />, 
    children: [
        { name: "Videos", path: "/resources-videos" },
        { name: "Reflection Questions", path: "/reflection-questions" },     
        { name: "My Purchases", path: "/my-purchases" },     
      ],
    },
    { name: "Medical History", path: "/medical-history", icon: <FiFileText /> },
   
   
    {
      name: "My Profile",
      
      icon: <FiUser />,
      children: [
        { name: "My Profile", path: "/my-profile" },
        { name: "Insurance", path: "/insurance" },     
      ],
    },
  ];

  const practitionerMenu: MenuItem[] = [
    { name: "Dashboard", path: "/dashboard", icon: <FiHome /> },
    { name: "Schedule", path: "/schedule", icon: <FiCalendar /> },
    {
      name: "Bookings",
      icon: <FiFileText />,
      path: "/booking-history"
    },

    { name: "Payments", path: "/payments", icon: <FiCreditCard /> },
     {
      name: "Referral History",
      path: "/referral-history",
      icon: <FiFileText />,
    },
    { name: "Patients", path: "/patients-list" , icon: <FiUsers /> },
    {
      name: "My Profile",
     
      icon: <FiUser />,
      children: [
        { name: "My Profile", path: "/my-profile" },
        { name: "Bio", path: "/bio" },
        { name: "Bank Details", path: "/bank-details" },
        { name: "Verification", path: "/verification-status" },
      ],
    },
  ];

  const getMenu = useCallback((): MenuItem[] => {
    switch (MMMUserData?.role) {
      case "referrer":
        return referrerMenu;
      case "patient":
        return patientMenu;
      case "practitioner":
        return practitionerMenu;
      default:
        return [];
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [MMMUserData]);

  const menu = useMemo(() => getMenu(), [getMenu]);

  const isChildActive = useCallback(
    (children?: { name: string; path: string }[]) => {
      return children?.some((child) => pathname === child.path);
    },
    [pathname],
  );
  useEffect(() => {
    const activeMenus: string[] = [];
    menu.forEach((item) => {
      if (item.children && isChildActive(item.children)) {
        activeMenus.push(item.name);
      }
      setOpenMenus(activeMenus);
    });
  }, [menu, isChildActive]);

  const toggleMenu = (name: string) => {
    setOpenMenus((prev) =>
      prev.includes(name) ? prev.filter((i) => i !== name) : [...prev, name],
    );
  };

  return (
    <div
      className={`fixed left-0 top-0 h-full z-50 transition-all duration-500
      bg-[linear-gradient(50deg,var(--color-AquaBlue)_-95%,var(--color-white)_100%)]
      ${collapsed ? "w-15" : "w-82 lg:w-72"}
      ${ishide ? "translate-x-[-100%] lg:translate-x-0" : "translate-x-0"}`}
    >
      {/* HEADER */}
      <div className="flex items-center justify-between pb-4 border-b-4 border-primary px-4 pt-4">
        {!collapsed && (
          <Image src="/logo-deshboard.svg" alt="logo" height={50} width={50} />
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:block cursor-pointer"
        >
          <FiMenu size={28} className={`text-primary`} />
        </button>
        <button onClick={() => menutrigger(true)} className="lg:hidden cursor-pointer">
          <IoClose size={35} className="text-primary" />
        </button>
      </div>

      {/* MENU */}
      <nav
        className="flex flex-col mt-6 space-y-2 text-primary font-bold overflow-y-auto h-[82vh] px-2  [&::-webkit-scrollbar]:w-1
  [&::-webkit-scrollbar-track]:bg-primary/20
  [&::-webkit-scrollbar-thumb]:bg-primary
  "
      >
        {menu.map((item) => {
          const isOpen = openMenus.includes(item.name);
          const isActiveParent =
            pathname === item.path || isChildActive(item.children);

          return (
            <div key={item.name}>
              {/* MAIN */}
              <Link  title={collapsed ? item.name : ""}
                href={item.path || "#"}
                onClick={() => (item.children ? toggleMenu(item.name) : null)}
                className={`flex items-center justify-between px-3 py-3 rounded-l-full cursor-pointer transition-all
                ${isActiveParent ? "bg-white" : "hover:bg-white/70"}`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{item.icon}</span>
                  {!collapsed && <span>{item.name}</span>}
                </div>

                {item.children && !collapsed && (
                  <FiChevronDown
                    className={`transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                )}
              </Link>

              {/* SUBMENU */}
              {item.children && isOpen && !collapsed && (
                <div className="ml-10 mt-2 space-y-1">
                  {item.children.map((sub) => (
                    <Link
                      key={sub.path}
                      href={sub.path}
                      className={`block py-2.5 text-sm rounded-l-full px-3 transition
                      ${
                        pathname === sub.path
                          ? "bg-white font-semibold"
                          : "hover:bg-white/60"
                      }`}
                    >
                      {sub.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </div>
  );
}
