"use client";

import { useState } from "react";
import { HiArrowNarrowRight } from "react-icons/hi";

export default function SidebarMenu() {
    const [open, setOpen] = useState(false);

    return (
        <>
            {/* MENU BUTTON (top right) */}
            <button
                onClick={() => setOpen(true)}
                className="flex w-[285px] justify-between p-[22px] border-t absolute cursor-pointer right-0 items-center gap-3 text-white"
            >
                <span className="text-sm tracking-widest">MENU</span>
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
                        className=" cursor-pointer flex items-center gap-[10px] text-[#25716E] text-[18px]"
                    >
                        CLOSE <span className="text-[24px]"><HiArrowNarrowRight /></span>
                    </button>

                    {/* CONTENT */}
                    <div className="h-full mt-[140px] flex flex-col justify-center  space-y-[30px]">
                        <h2 className="text-[44px] font-light text-[#25716E] leading-[51px]">
                            My Mind <br /> And Me
                        </h2>

                        <ul className="space-y-[30px] text-primary uppercase text-[18px]">
                            <li>Twitter</li>
                            <li>Linkedin</li>
                            <li>Email</li>
                        </ul>

                        <button className="mt-6 w-fit px-[26px] py-[12px] cursor-pointer rounded-full bg-[linear-gradient(90deg,#56E1E8_0%,#25716E_90%)] text-white text-[18px]">
                            • Join Us
                        </button>
                    </div>
                </div>
            </aside>
        </>
    );
}
