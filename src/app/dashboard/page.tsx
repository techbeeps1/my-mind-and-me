"use client";

import DashboardPetient from "@/components/dashboard/DashboardPetient";
import WrapperBanner from "../../components/WraperBanner";
import DashboardPractitioner from "@/components/dashboard/DashboardPractitioner";
import DashboardReferrer from "@/components/dashboard/DashboardReferrer";
import { useProfile } from "@/services/ProfileContext";
import LoadingSpin from "@/components/LoadingSpin";

export default function Dashboard() {
  const { MMMUserData } = useProfile();

  return (
    <>
      <WrapperBanner>
        <div className="flex-1 flex justify-start md:p-7.5 px-5 py-7.5">
          <div className=" w-full bg-[linear-gradient(11deg,var(--color-AquaBlue)_-80%,var(--color-white)_34%)]  rounded-[10px] shadow-xl h-fit ">
            <h2 className="text-center rounded-t-[10px] bg-[linear-gradient(90deg,#56e1e845_70%,var(--color-background)_100%)]  w-full text-primary md:text-[25px] text-[20px] leading-9 py-3 font-semibold md:mb-11.25 mb-7.5">
              Dashboard
            </h2>
            <div className=" px-12.5 pb-12.5 rounded-xl min-h-[60vh] ">
              <>
                {!MMMUserData && (
                  <div className="flex justify-center items-center h-[60vh]">
                    {" "}
                    <LoadingSpin color="bg-primary" />{" "}
                  </div>
                )}
                {MMMUserData?.role === "practitioner" && <DashboardPractitioner />}
                {MMMUserData?.role === "patient" && <DashboardPetient />}
                {MMMUserData?.role === "referrer" && <DashboardReferrer />}
              </>
            </div>
          </div>
        </div>
      </WrapperBanner>
    </>
  );
}
