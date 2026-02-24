"use client";

import WrapperBanner from "@/app/components/WraperBanner";
import { useState } from "react";
export default function AddReferrer() {
  const [userRole, setUserRole] = useState("");
  return (
    <>
      <WrapperBanner>
        <div className="flex-1 flex justify-start md:p-7.5 px-5 py-7.5">
          <div className="max-w-337.5 w-full bg-white rounded-[10px] shadow-xl h-fit ">
            <h2 className="text-center rounded-t-[10px] bg-[linear-gradient(90deg,#56e1e845_70%,var(--color-background)_100%)]  w-full text-primary md:text-[25px] text-[20px] leading-9 py-3 font-semibold md:mb-11.25 mb-7.5">
              Referrer Form
            </h2>
            <div className="w-245  max-w-full mx-auto md:mb-11.25 mb-7.5 px-5">
              <form className="space-y-3.75">                
                <div>
                  <label className="text-sm block font-semibold leading-6 text-primary mb-2">
                    Patient Selection
                  </label>
                  <select className="w-full  text-primary text-sm px-4 py-2.5 rounded-md  leading-5 bg-primary/[0.08] outline-none">
                    <option>Patient Selection</option>
                  </select>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm block font-semibold leading-6 text-primary mb-2">
                      Preferred Practitioner
                    </label>
                    <select className="w-full  text-primary text-sm px-4 py-2.5 rounded-md  leading-5 bg-primary/[0.08] outline-none">
                      <option>filtered</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm block font-semibold leading-6 text-primary mb-2">
                      Urgency Level
                    </label>
                    <select className="w-full  text-primary text-sm px-4 py-2.5 rounded-md  leading-5 bg-primary/[0.08] outline-none">
                      <option>Emergency</option>
                    </select>
                  </div>
                </div>
                <div>
                  <p className="font-semibold text-primary leading-6 mb-2">
                    Preferred Modality
                  </p>
                  <div className="flex gap-[20px] md:flex-row flex-col justify-between">
                    {["Therapy", "Psychiatric Assessment", "Both"].map(
                      (role, i) => (
                        <label
                          key={role}
                          className={`flex items-center gap-2 md:w-59 w-full max-w-full px-4 py-2 rounded-lg font-semibold cursor-pointer text-[15px] text-primary
                ${role === userRole ? "bg-primary/[0.08] border-primary/[0.08] " : " border border-primary/[0.08]"}`}
                        >
                          <input
                            type="radio"
                            name="role"
                            defaultChecked={i === 0}
                            className="primary"
                            value={role}
                            onChange={(e) => setUserRole(e.target.value)}
                          />
                          {role}
                        </label>
                      ),
                    )}
                  </div>
                </div>
                <div>
                  <label className="text-sm block font-semibold leading-6 text-primary mb-2">
                    Clinical Presentation
                  </label>
                  <textarea
                    className="w-full  text-primary text-sm px-4 py-2.5 rounded-md placeholder:text-primary leading-5 bg-primary/[0.08]  outline-none"
                    placeholder="Clinical Presentation"
                  />
                </div>
                <div>
                  <label className="text-sm block font-semibold leading-6 text-primary mb-2">
                    Chief Complaint
                  </label>
                  <textarea
                    className="w-full  text-primary text-sm px-4 py-2.5 rounded-md placeholder:text-primary leading-5 bg-primary/[0.08]  outline-none"
                    placeholder="Chief Complaint"
                  />
                </div>
                <div>
                  <label className="text-sm block font-semibold leading-6 text-primary mb-2">
                    Additional requirements
                  </label>
                  <textarea
                    className="w-full  text-primary text-sm px-4 py-2.5 rounded-md placeholder:text-primary leading-5 bg-primary/[0.08]  outline-none"
                    placeholder="Additional requirements"
                  />
                </div>

                <div className="flex justify-center">
                  <button className="py-3 px-15 md:w-auto w-full duration-500 cursor-pointer rounded-full bg-[linear-gradient(90deg,var(--color-AquaBlue)_0%,var(--color-primary)_100%)] text-white font-bold text-lg leading-6 hover:opacity-90 transition">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      
      </WrapperBanner>
    </>
  );
}
