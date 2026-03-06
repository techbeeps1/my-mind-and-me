"use client";



import ChangePassword from "@/components/comman/ChangePassword";
import WrapperBanner from "@/components/WraperBanner";


export default function Changepass() {


  return (
    <>
      <WrapperBanner>

        <div className="flex-1 flex justify-start md:p-7.5 px-5 py-7.5">
          <div className=" w-full bg-[linear-gradient(11deg,var(--color-AquaBlue)_-80%,var(--color-white)_34%)]  rounded-[10px] shadow-xl h-fit ">
            <h2 className="text-center rounded-t-[10px] bg-[linear-gradient(90deg,#56e1e845_70%,var(--color-background)_100%)]  w-full text-primary md:text-[25px] text-[20px] leading-9 py-3 font-semibold md:mb-11.25 mb-7.5">
              Change Password
            </h2>

   <ChangePassword/>
            
          </div>

        </div>
      </WrapperBanner>
    </>
  );
}
