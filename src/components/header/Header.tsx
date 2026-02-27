"use client";
import Link from "next/link";
import SidebarMenu from "../Sidebar";

export default function Header() {
  return (
    <>
      <header className="absolute w-full top-[50px] z-1 ">
        <div className="container relative flex lg:justify-center justify-between ">
          <Link
            href="#"
            className="text-[20px] font-semibold uppercase text-white"
          >
            my mind and me
          </Link>
          <SidebarMenu />
        </div>
      </header>
    </>
  );
}
