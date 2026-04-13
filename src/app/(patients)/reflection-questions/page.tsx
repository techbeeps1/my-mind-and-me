"use client";
import WrapperBanner from "@/components/WraperBanner";

import {  FaVideo } from "react-icons/fa";

import SessionModal from "@/components/ResourceVideoPlayer";
import { useState } from "react";
import { FcQuestions } from "react-icons/fc";
import { IoNewspaperSharp } from "react-icons/io5";
import ResourceReflectionQ from "@/components/ResourceReflectionQ";



export default function Resources() {


 const [selectedSession, setSelectedSession] = useState("");

  return (
    <>
      <WrapperBanner>
        <div className="flex-1 flex justify-start md:p-7.5 px-5 py-7.5">
          <div className=" w-full bg-[linear-gradient(11deg,var(--color-AquaBlue)_-80%,var(--color-white)_34%)]  rounded-[10px] shadow-xl h-fit ">
            <h2 className="text-center rounded-t-[10px] bg-[linear-gradient(90deg,#56e1e845_70%,var(--color-background)_100%)]  w-full text-primary md:text-[25px] text-[20px] leading-9 py-3 font-semibold md:mb-11.25 mb-7.5">
              Reflection Questions 
            </h2>
            <div className="flex px-5 flex-wrap gap-5 justify-center mb-12.5">
              {/* Card 1 */}
              <div onClick={()=>setSelectedSession("session1")} className=" cursor-pointer relative w-48.25 max-w-full bg-white rounded-[10px] border-2 border-primary/8 shadow-[0_0_6px_0_hsl(0deg_0%_0%/6%)] p-2.5">
                   <span className="absolute top-2.5 left-2.5  px-2 py-1 text-sm rounded-[3px] bg-primary text-white font-semibold">
                  Free
                </span>
                <div className="bg-[#B8E1D9] rounded-[10px] h-27.75 flex items-center justify-center mb-2.5">
         
               <IoNewspaperSharp className="text-primary w-15 h-15"  />
                </div>

                <h3 className="text-primary text-sm font-semibold mb-2.5">
                  Boost Your Mental Health
                </h3>

             
              </div>

               <div onClick={()=>setSelectedSession("session2")} className=" cursor-pointer relative w-48.25 max-w-full bg-white rounded-[10px] border-2 border-primary/8 shadow-[0_0_6px_0_hsl(0deg_0%_0%/6%)] p-2.5">
                   <span className="absolute top-2.5 left-2.5  px-2 py-1 text-sm rounded-[3px] bg-yellow-600 text-white font-semibold">
                  Paid
                </span>
                <div className="bg-[#B8E1D9] rounded-[10px] h-27.75 flex items-center justify-center mb-2.5">
               <IoNewspaperSharp className="text-primary w-15 h-15"  />
                </div>

                <h3 className="text-primary text-sm font-semibold mb-2.5">
                  Boost Your Mental Health
                </h3>

             
              </div>

              
               <div onClick={()=>setSelectedSession("session3")} className=" cursor-pointer relative w-48.25 max-w-full bg-white rounded-[10px] border-2 border-primary/8 shadow-[0_0_6px_0_hsl(0deg_0%_0%/6%)] p-2.5">
                   <span className="absolute top-2.5 left-2.5  px-2 py-1 text-sm rounded-[3px] bg-yellow-600 text-white font-semibold">
                  Paid
                </span>
                <div className="bg-[#B8E1D9] rounded-[10px] h-27.75 flex items-center justify-center mb-2.5">
              <IoNewspaperSharp className="text-primary w-15 h-15"  />
                </div>

                <h3 className="text-primary text-sm font-semibold mb-2.5">
                  Boost Your Mental Health
                </h3>

             
              </div>


               <div onClick={()=>setSelectedSession("session1")} className=" cursor-pointer relative w-48.25 max-w-full bg-white rounded-[10px] border-2 border-primary/8 shadow-[0_0_6px_0_hsl(0deg_0%_0%/6%)] p-2.5">
                   <span className="absolute top-2.5 left-2.5  px-2 py-1 text-sm rounded-[3px] bg-yellow-600 text-white font-semibold">
                  Paid
                </span>
                <div className="bg-[#B8E1D9] rounded-[10px] h-27.75 flex items-center justify-center mb-2.5">
              <IoNewspaperSharp className="text-primary w-15 h-15"  />
                </div>

                <h3 className="text-primary text-sm font-semibold mb-2.5">
                  Boost Your Mental Health
                </h3>

             
              </div>

               <div onClick={()=>setSelectedSession("session2")} className=" cursor-pointer relative w-48.25 max-w-full bg-white rounded-[10px] border-2 border-primary/8 shadow-[0_0_6px_0_hsl(0deg_0%_0%/6%)] p-2.5">
                   <span className="absolute top-2.5 left-2.5  px-2 py-1 text-sm rounded-[3px] bg-yellow-600 text-white font-semibold">
                  Paid
                </span>
                <div className="bg-[#B8E1D9] rounded-[10px] h-27.75 flex items-center justify-center mb-2.5">
               <IoNewspaperSharp className="text-primary w-15 h-15"  />
                </div>

                <h3 className="text-primary text-sm font-semibold mb-2.5">
                  Boost Your Mental Health
                </h3>

             
              </div>
  


            </div>
          </div>
        </div>
      </WrapperBanner>

      <ResourceReflectionQ  isOpen={selectedSession}  onClose={()=>setSelectedSession("")} />
    </>
  );
}
