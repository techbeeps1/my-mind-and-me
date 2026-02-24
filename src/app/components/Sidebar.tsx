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
                className="flex md:w-[285px] w-[auto] md:justify-between justify-end md:p-[22px] p-0 md:border-t border-0 lg:absolute relative cursor-pointer right-0 items-center gap-3 text-white"
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
                className={`fixed top-[12%] right-0 h-[80%] w-[90%] sm:w-[446px] z-50
        bg-[linear-gradient(220deg,var(--color-AquaBlue)_0%,var(--color-background)_90%)]
        rounded-[20px] shadow-xl
        transform transition-transform duration-700 ease-in-out
        ${open ? "-translate-x-[25%]" : "translate-x-full"}`}
            >
                {/* CLOSE */}
                <div className="p-[50px]">
                    <button
                        onClick={() => setOpen(false)}
                        className=" cursor-pointer flex items-center gap-[10px] text-primary font-semibold text-lg"
                    >
                        CLOSE <span className="text-[24px]"><HiArrowNarrowRight /></span>
                    </button>

                    {/* CONTENT */}
                    <div className="h-full mt-[140px] flex flex-col justify-center  space-y-[30px]">
                        <h2 className="text-[44px] text-primary leading-[50px]">
                            My Mind <br /> And Me
                        </h2>

                        <ul className="space-y-[30px] text-primary font-bold uppercase text-[18px]">
                            <li><Link href={"#"} className="hover:text-AquaBlue duration-500">Twitter</Link></li>
                            <li><Link href={"#"} className="hover:text-AquaBlue duration-500">Linkedin</Link></li>
                            <li><Link href={"#"} className="hover:text-AquaBlue duration-500">Email</Link></li>                            
                        </ul>
                         <button className=" cursor-pointer max-w-fit flex items-center gap-[10px] text-white rounded-full bg-[linear-gradient(90deg,var(--color-AquaBlue)_0%,var(--color-primary)_90%)] px-[26px] py-[12px] text-lg font-bold text-primary">
                            <GoDotFill className="h-[12px] w-[12px]"/> Join Us
                        </button>
                    </div>
                </div>
            </aside>
        </>
    );
}
