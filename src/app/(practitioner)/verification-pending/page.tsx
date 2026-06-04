"use client";
import { useEffect, useState } from "react";

import { LuEye } from "react-icons/lu";

import { GetverificationDOcs, imagePath } from "@/services/api";
import LoadingSpin from "@/components/LoadingSpin";
import VerifyDocsUpload from "@/components/comman/VerifyDocsUpload";
import { IoIosWarning, IoMdArrowRoundBack } from "react-icons/io";
import Link from "next/link";
import HeaderDashboard from "@/components/header/HeaderDashboard";
import { useRouter } from "next/navigation";
import { toastTBS } from "@/lib/toast";

export type PatientStatus = "Active" | "Inactive";

export interface VeriDocstype {
  file: string;
  status: string;
  name: string;
  expiry_date: string;
  doc_number: string;

}

export default function VerificationStatus() {
  const [landing, setLanding] = useState(true);
  const [ ,setMenu] = useState(true);
  const [veriDocs, setVeriDocs] = useState<VeriDocstype[]>([]);
  const [uploadModal, setUploadModal] = useState(false);
  const router = useRouter();

  const [MMMUserData] = useState(() => {
    if (typeof window === "undefined") return null;
    const data = localStorage.getItem("MMMDT");
    return data ? JSON.parse(data) : null;
  });

  useEffect(() => {


        fetch("/refresh").then((res) => res.json()).then((result) => {
          if(result.success && result?.user?.is_verified !== false ){
            router.push("/dashboard");
          }
    

        }).catch((err) => {
          console.error("Error refreshing token:", err);
        });

    GetverificationDOcs(MMMUserData?.id)
      .then((data) => {
        setLanding(false);
        setVeriDocs(data.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [MMMUserData?.id, uploadModal,router]);

  if (landing) {
    return (
  
        <div className="flex justify-center items-center h-80">
          <LoadingSpin />
        </div>
  
    );
  }
  if (uploadModal) {
    return (
 <div
     className=" bg-cover bg-center bg-no-repeat min-h-screen "
        style={{ backgroundImage: "url('/banner-bg.jpg')" }}
      >
        <div className="relative">
          <button
            onClick={() => setUploadModal(false)}
            className="px-2 py-2 rounded-full bg-[linear-gradient(90deg,var(--color-AquaBlue)_0%,var(--color-primary)_100%)] cursor-pointer text-white font-semibold shadow-lg hover:scale-105 transition absolute top-10 left-30 text-2xl font-bold"
          >
            <IoMdArrowRoundBack />
          </button>
          <VerifyDocsUpload callback={()=>{}} />
        </div>
        </div>

    );
  }

  return (
    <>
     <HeaderDashboard menutrigger={setMenu}/>
     <div
     className=" bg-cover bg-center bg-no-repeat min-h-screen "
        style={{ backgroundImage: "url('/banner-bg.jpg')" }}
      >
        <div className="flex-1 flex justify-center md:p-15 px-5 py-7.5">
          <div className="max-w-337.5 w-full bg-[linear-gradient(11deg,var(--color-AquaBlue)_-80%,var(--color-white)_34%)]  rounded-[10px] shadow-xl h-fit ">
            <h2 className="text-center rounded-t-[10px] bg-[linear-gradient(90deg,#56e1e845_70%,var(--color-background)_100%)]  w-full text-primary md:text-[25px] text-[20px] leading-9 py-3 font-semibold mb-2 ">
              Verification Status
            </h2>

            <div className="mx-auto mb-5 flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 max-w-[60%]">
  <div className="mt-0.5 shrink-0 flex items-center justify-center rounded-lg bg-amber-200 p-1.5 text-amber-500">
   <IoIosWarning className="h-8 w-8 text-amber-600" />
  </div>

  <div>
    <h4 className="text-sm font-semibold text-amber-900">
      Verification Is Pending
    </h4>
    <p className="text-sm text-amber-700">
      Your documents are currently under verification. Please check back later.
    </p>
  </div>
</div>
            <div className="md:px-12.5 px-1  pb-5 rounded-xl ">
              {/* Search & Filter */}
              <div className="flex justify-end flex-wrap  mb-2">
                <button
                  onClick={() => setUploadModal(true)}
                  className="px-4 cursor-pointer py-2 rounded-full bg-[linear-gradient(90deg,var(--color-AquaBlue)_0%,var(--color-primary)_100%)] text-white font-semibold shadow-lg hover:scale-105 transition"
                >
                  Upload New Document
                </button>
              </div>
              {/* Table */}
              <div className="overflow-x-auto rounded-lg  bg-white">
                <table className="w-full">
                  <thead>
                    <tr className=" text-primary text-sm font-semibold">
                      <th className="px-4 py-3 text-left bg-primary/8 rounded-tl-lg whitespace-nowrap">
                        Documents
                      </th>
                      <th className="px-4 py-3 text-left bg-primary/8 whitespace-nowrap">
                        Expiry Date
                      </th>
                        <th className="px-4 py-3 text-left bg-primary/8 whitespace-nowrap">
                        Document Number
                      </th>
                      <th className="px-4 py-3 text-left bg-primary/8 whitespace-nowrap">
                        Status
                      </th>
                      <th className="px-4 py-3 text-right bg-primary/8 rounded-tr-lg whitespace-nowrap">
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
                        <td className="px-4 py-4 flex items-center gap-3 whitespace-nowrap">
                          <span className="font-bold text-sm leading-9 text-primary uppercase">
                            {item.name}
                          </span>
                        </td>

                        <td className="px-4 py-4 text-sm text-primary font-semibold whitespace-nowrap">
                          <div>{item.expiry_date}</div>
                        </td>
                         <td className="px-4 py-4 text-sm text-primary font-semibold whitespace-nowrap">
                          <div>{item.doc_number}</div>
                        </td>

                        <td className="px-4 py-4 text-left">
                    
                          <span className={`px-4.25 py-1.25 text-sm font-semibold rounded-[3px] ${(item.status === "Expired" || item.status === "Rejected") ? " text-[#B80600] bg-[#B80600]/8" : item.status==="Verified" ?"text-primary bg-primary/8" :"text-amber-700 bg-amber-100" }`}>
                              {item.status}
                            </span>
                        </td>

                        <td className="px-4 py-4 flex items-center gap-2.5 justify-end">
                          <Link
                            target="_blank"
                            href={
                              imagePath + "document_verification/" + item.file
                            }
                            className="px-1.25 flex justify-center items-center h-8.75 w-8.75 bg-primary rounded-sm border border-primary/25 text-white cursor-pointer"
                          >
                            <LuEye className="h-5 w-5" />
                          </Link>

                          <button
                            onClick={() => setUploadModal(true)}
                            className="px-1.25 flex justify-center items-center h-8.75  bg-primary rounded-sm border border-primary/25 text-white cursor-pointer"
                          >
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
        </div>

    </>
  );
}
