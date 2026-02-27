"use client";



import WrapperBanner from "../../components/WraperBanner";


export default function Home() {


  return (
    <>
      <WrapperBanner>

        <div className="flex-1 flex justify-start md:p-7.5 px-5 py-7.5">
          <div className=" w-full bg-[linear-gradient(11deg,var(--color-AquaBlue)_-80%,var(--color-white)_34%)]  rounded-[10px] shadow-xl h-fit ">
            <h2 className="text-center rounded-t-[10px] bg-[linear-gradient(90deg,#56e1e845_70%,var(--color-background)_100%)]  w-full text-primary md:text-[25px] text-[20px] leading-9 py-3 font-semibold md:mb-11.25 mb-7.5">
              Dashboard
            </h2>
            <div className=" px-12.5 pb-12.5 rounded-xl min-h-[60vh] ">

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">

                <div className="bg-white p-5 rounded-xl shadow">
                  <p className="text-sm text-gray-500">Total Patients</p>
                  <h2 className="text-2xl font-bold mt-2">1,245</h2>
                </div>

                <div className="bg-white p-5 rounded-xl shadow">
                  <p className="text-sm text-gray-500">Today Appointments</p>
                  <h2 className="text-2xl font-bold mt-2">18</h2>
                </div>

                <div className="bg-white p-5 rounded-xl shadow">
                  <p className="text-sm text-gray-500">Pending Reports</p>
                  <h2 className="text-2xl font-bold mt-2">6</h2>
                </div>

                <div className="bg-white p-5 rounded-xl shadow">
                  <p className="text-sm text-gray-500">Revenue</p>
                  <h2 className="text-2xl font-bold mt-2">₹1,20,000</h2>
                </div>

              </div>

            </div>
          </div>

        </div>
      </WrapperBanner>
    </>
  );
}
