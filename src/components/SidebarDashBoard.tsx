"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function SidebarDashBoard({ ishide }: { ishide: boolean }) {
  const pathname = usePathname(); // current URL
 console.log(pathname)
   const menu = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Add Referrer ", path: "/add-referrer" },
    { name: "Referral History", path: "/referral-history" },
    { name: "Profile", path: "/doctor-profile" },
  ];
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

            <nav className="flex flex-col space-y-4.5 text-primary lg:text-lg font-bold mt-7.5 lg:ps-12.5 ps-7.5">
              {menu.map((item) => (
              <Link key={item.path} href={item.path} className={`text-left w-full rounded-l-full px-3.75 py-2.5 ${
                  pathname === item.path
                    ? "bg-white"   
                    : "cursor-pointer"
                }`}>{item.name}</Link>
              ))}
            </nav>
          </div>
        </>
    );
}
