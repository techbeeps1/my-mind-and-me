"use client";
import WrapperBanner from "@/app/components/WraperBanner";
import Image from "next/image";
import { useMemo, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { FaRegTrashAlt } from "react-icons/fa";
import { LuEye } from "react-icons/lu";

// data/patients.ts
export type PatientStatus = "Active" | "Inactive";

export interface Patient {
  id: number;
  name: string;
  avatar: string;
  date: string;
  time: string;
  referral: string;
  status: PatientStatus;
}

export const patients: Patient[] = [
  {
    id: 1,
    name: "Alexa Rawles",
    avatar: "https://i.pravatar.cc/40?img=47",
    date: "2028-09-20",
    time: "09:00 AM",
    referral: "Dr. Paul Carter",
    status: "Active",
  },
  {
    id: 2,
    name: "Alexa Rawles",
    avatar: "https://i.pravatar.cc/40?img=47",
    date: "2028-09-20",
    time: "09:00 AM",
    referral: "Dr. Paul Carter",
    status: "Inactive",
  },
];

export default function ReferralHistory() {
  return (
    <>
      <WrapperBanner>
        <div className="flex-1 flex justify-start md:p-7.5 px-5 py-7.5">
          <div className="max-w-337.5 w-full bg-[linear-gradient(11deg,var(--color-AquaBlue)_-80%,var(--color-white)_34%)]  rounded-[10px] shadow-xl h-fit ">
            <h2 className="text-center rounded-t-[10px] bg-[linear-gradient(90deg,#56e1e845_70%,var(--color-background)_100%)]  w-full text-primary md:text-[25px] text-[20px] leading-9 py-3 font-semibold md:mb-11.25 mb-7.5">
              Progress
            </h2>
            <div className="flex px-5 flex-wrap gap-5 justify-center mb-12.5">
              {/* Card 1 */}
              <div className="w-48.25 max-w-full bg-white rounded-[10px] border-2 border-primary/8 shadow-[0_0_6px_0_hsl(0deg_0%_0%/6%)] p-2.5">
                <div className="bg-[#B8E1D9] rounded-[10px] h-27.75 flex items-center justify-center mb-2.5">
                  <Image
                    src="/image 1.png"
                    alt="image 1"
                    height={69}
                    width={69}
                    priority
                    className="object-cover "
                  />
                </div>

                <h3 className="text-primary font-semibold mb-2.5">
                  Session 1
                </h3>

                <span className="px-3.25 py-1.25 text-sm rounded-[3px] bg-primary/8 text-primary font-semibold">
                  Inprogress
                </span>
              </div>

              {/* Card 2 */}
              <div className="w-48.25 max-w-full bg-white rounded-xl shadow-[0_0_6px_0_hsl(0deg_0%_0%/6%)] p-4">
                <div className="bg-[#B8E1D9] rounded-[10px] h-27.75 flex items-center justify-center mb-2.5">
                  <Image
                    src="/headphone-img.png"
                    alt="headphone img"
                    height={58}
                    width={55}
                    priority
                    className="object-cover "
                  />
                </div>

                <h3 className="text-primary font-semibold mb-2.5">
                  Session 2
                </h3>

                <span className="px-3.25 py-1.25 text-sm rounded-[3px] bg-MintGreen/31 text-[#0EA761] font-semibold">
                  Completed
                </span>
              </div>

              {/* Card 3 */}
              <div className="w-48.25 max-w-full bg-white rounded-[10px] border-2 border-primary/8 shadow-[0_0_6px_0_hsl(0deg_0%_0%/6%)] p-2.5">
                <div className="bg-[#B8E1D9] rounded-[10px] h-27.75 flex items-center justify-center mb-2.5">
                   <Image
                    src="/books.png"
                    alt="books"
                    height={69}
                    width={69}
                    priority
                    className="object-cover "
                  />
                </div>

                <h3 className="text-primary font-semibold mb-2.5">
                  Session 3
                </h3>

                <span className="px-3.25 py-1.25 text-sm rounded-[3px] bg-MintGreen/31 text-[#0EA761] font-semibold">
                  Completed
                </span>
              </div>

              {/* Card 4 */}
              <div className="w-48.25 max-w-full bg-white rounded-[10px] border-2 border-primary/8 shadow-[0_0_6px_0_hsl(0deg_0%_0%/6%)] p-2.5">
                <div className="bg-[#B8E1D9] rounded-[10px] h-27.75 flex items-center justify-center mb-2.5">
                   <Image
                    src="/game.png"
                    alt="game"
                    height={69}
                    width={69}
                    priority
                    className="object-cover "
                  />
                </div>
                <h3 className="text-primary font-semibold mb-2.5">
                  Session 4
                </h3>
                <span className="px-3.25 py-1.25 text-sm rounded-[3px] bg-MintGreen/31 text-[#0EA761] font-semibold">
                  Completed
                </span>
              </div>
            </div>
          </div>
        </div>
      </WrapperBanner>
    </>
  );
}
