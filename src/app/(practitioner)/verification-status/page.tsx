"use client";
import WrapperBanner from "@/components/WraperBanner";
import { useEffect, useState } from "react";

import { LuEye } from "react-icons/lu";

import {  GetverificationDOcs, imagePath } from "@/services/api";
import LoadingSpin from "@/components/LoadingSpin";
import VerifyDocsUpload from "@/components/comman/VerifyDocsUpload";
import { IoMdArrowRoundBack } from "react-icons/io";
import Link from "next/link";
export type PatientStatus = "Active" | "Inactive";

export interface VeriDocstype {
  file: string;
  status: string;
  expiry_date: string;
}



export default function ReferralHistory() {

  const [landing, setLanding] = useState(true);
  const [veriDocs, setVeriDocs] = useState<VeriDocstype[]>([]);
  const [uploadModal, setUploadModal] = useState(false);

    const [MMMUserData] = useState(() => {
    if (typeof window === "undefined") return null;
    const data = localStorage.getItem("MMMDT");
    return data ? JSON.parse(data) : null;
  });

  useEffect(() => {
    GetverificationDOcs(MMMUserData?.id).then((data) => {
    setLanding(false)
      setVeriDocs(data.data)
  
       
    
    }).catch((err) => {
      console.error(err);
    });
  }, [MMMUserData?.id,uploadModal]);

if (landing) {
  return (
    <WrapperBanner>
    <div className="flex justify-center items-center h-80"> 
      <LoadingSpin />
    </div>
    </WrapperBanner>
  );
}
if (uploadModal) {
  return (
       <WrapperBanner>
    <div className="relative">
          
        <button onClick={() => setUploadModal(false)} className="px-2 py-2 rounded-full bg-gradient-to-r from-teal-400 to-teal-700 text-white font-semibold shadow-lg hover:scale-105 transition absolute top-10 left-10 text-2xl font-bold">
          <IoMdArrowRoundBack />
        </button>

        <VerifyDocsUpload />
    
  </div>
    </WrapperBanner>
  );
}

  return (
    <>
      <WrapperBanner>
        <div className="flex-1 flex justify-start md:p-7.5 px-5 py-7.5">
          <div className="max-w-337.5 w-full bg-[linear-gradient(11deg,var(--color-AquaBlue)_-80%,var(--color-white)_34%)]  rounded-[10px] shadow-xl h-fit ">
            <h2 className="text-center rounded-t-[10px] bg-[linear-gradient(90deg,#56e1e845_70%,var(--color-background)_100%)]  w-full text-primary md:text-[25px] text-[20px] leading-9 py-3 font-semibold md:mb-11.25 mb-7.5">
              Verification Status
            </h2>
            <div className="md:px-12.5 px-1  pb-5 rounded-xl ">
              {/* Search & Filter */}
              <div className="flex justify-end flex-wrap  mb-2">
               
      <button onClick={() => setUploadModal(true)} className="cursor-pointer px-4 py-2 rounded-full bg-gradient-to-r from-teal-400 to-teal-700 text-white font-semibold shadow-lg hover:scale-105 transition">
        Upload New Document
      </button>
        
              </div>

              {/* Table */}
              <div className="overflow-x-auto rounded-lg  bg-white">
                <table className="w-full">
                  <thead>
                    <tr className=" text-primary text-sm font-semibold">
                      <th className="px-4 py-3 text-left bg-primary/8 rounded-tl-lg">
                       Documents
                      </th>
                      
                      <th className="px-4 py-3 text-left bg-primary/8">
                        Expiry Date
                      </th>
                      <th className="px-4 py-3 text-left bg-primary/8">
                        Status
                      </th>
                      <th className="px-4 py-3 text-right bg-primary/8 rounded-tr-lg">
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-primary/8">
                    {veriDocs.length === 0 && (
                      <tr>
                        <td
                          colSpan={4}
                          className="text-center py-6 text-sm text-gray-400"
                        >
                          No records found
                        </td>
                      </tr>
                    )}

                    {veriDocs.map((item) => (
                      <tr key={item.file}>
                        <td className="px-4 py-4 flex items-center gap-3">
                      
                          <span className="font-bold text-sm leading-9 text-primary">
                            {item.file}
                          </span>
                        </td>

                        <td className="px-4 py-4 text-sm text-primary font-semibold">
                          <div>{item.expiry_date}</div>
                        </td>

                 
                        <td className="px-4 py-4 text-left">
                          {item.status === "Active" ? (
                            <span className="px-4.25 py-1.25 text-sm font-semibold text-primary bg-primary/8 rounded-[3px]">
                              Active
                            </span>
                          ) : (
                            <span className="px-4.25 py-1.25 text-sm font-semibold text-[#B80600] bg-[#B80600]/8 rounded-[3px]">
                              Inactive
                            </span>
                          )}
                        </td>

                        <td className="px-4 py-4 flex items-center gap-2.5 justify-end">
                          <Link target="_blank" href={imagePath+"document_verification/"+item.file} className="px-1.25 flex justify-center items-center h-8.75 w-8.75 bg-primary rounded-sm border border-primary/25 text-white cursor-pointer">
                            <LuEye className="h-5 w-5" />
                          </Link>

                          <button onClick={()=>setUploadModal(true)} className="px-1.25 flex justify-center items-center h-8.75  bg-primary rounded-sm border border-primary/25 text-white cursor-pointer">
                          Resubmit  
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>


  
      </WrapperBanner>
    </>
  );
}
