"use client";


import {
  FiTrendingUp,
  FiUsers,
} from "react-icons/fi";

import {

  FaUserInjured,
} from "react-icons/fa6";
import Link from "next/link";
import LoadingSpin from "../LoadingSpin";
import { useProfile } from "@/services/ProfileContext";
import { useEffect, useState } from "react";
import { getReferrerDashboard } from "@/services/api";

export interface Referral {
  id: string;
  patient: string;
  practitioner: string;
  date: string;
  status: string;
  urgency: string;
}

export interface ReferralsResponse {
  totalReferrals: number;
  totalActivePatients: number;
  successRate: number;
  completedReferrals: number;
  pendingReferrals: number;
  rejectedReferrals: number;
  referrals: Referral[];
}

export default function DashboardReferrer() {
  const { MMMUserData } = useProfile();
  const [loading, setLoading] = useState(true);
  const [reffData, setReffData] = useState([
                      {
                        title: "Completed",
                        value: 0,
                        color: "bg-emerald-100 text-emerald-700",
                      },
                      {
                        title: "Pending",
                        value: 0,
                        color: "bg-orange-100 text-orange-700",
                      },
                      {
                        title: "Rejected",
                        value: 0,
                        color: "bg-red-100 text-red-700",
                      },
                    ]);
  const [topHeader, setTopHeader] = useState([
              {
                title: "Total Referrals",
                value: "0",
                icon: <FiUsers size={26} />,
                gradient: "from-cyan-500 to-blue-600",
              },
              {
                title: "Active Patients",
                value: "0",
                icon: <FaUserInjured size={26} />,
                gradient: "from-violet-500 to-fuchsia-500",
              },
              {
                title: "Success Rate",
                value: "0%",
                icon: <FiTrendingUp size={26} />,
                gradient: "from-orange-400 to-pink-500",
              },
             
            ]);
  const [dashboardData, setDashboardData] = useState<ReferralsResponse>();


useEffect(() => {
  // Fetch referrer dashboard data from API
  if (!MMMUserData?.id) return;
  getReferrerDashboard(MMMUserData?.id).then(data => {
    setDashboardData(data.data);
    setTopHeader(prev => prev.map((card, index) => {
      switch (index) {
        case 0:
          return { ...card, value: data.data.totalReferrals.toString() };
        case 1:
          return { ...card, value: data.data.totalActivePatients.toString() };
        case 2:
          return { ...card, value: `${data.data.successRate}%` };
        default:
          return card;
      }
    }));
    setReffData(prev => prev.map((card, index) => {
      switch (index) {
        case 0:
          return { ...card, value: data.data.completedReferrals.toString() };
        case 1:
          return { ...card, value: data.data.pendingReferrals.toString() };
        case 2:
          return { ...card, value: data.data.rejectedReferrals.toString() };
        default:
          return card;
      }
    }));

    setLoading(false);

}).catch(error => {
  console.error("Error fetching referrer dashboard data:", error);

});


},[MMMUserData])
  



  return (
    <div className="min-h-screen">
      <main className="flex-1 overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-7">
          {/* TOP CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {topHeader.map((card, index) => (
              <div
                key={index}
                className="relative overflow-hidden rounded-[20px] bg-white border border-slate-100 shadow-lg p-5 hover:-translate-y-1 transition-all"
              >
                <div
                  className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${card.gradient} opacity-10 rounded-full blur-3xl`}
                />

                <div className="flex justify-between relative z-10 items-center">
                  <div>
                    <p className="text-slate-500 text-sm font-medium">
                      {card.title}
                    </p>

                    <h2 className="text-4xl font-black text-primary mt-3">
                      {card.value}
                    </h2>
                  </div>

                  <div
                    className={`w-14 h-14 rounded-full bg-gradient-to-br ${card.gradient} text-white flex items-center justify-center shadow-lg`}
                  >
                    {card.icon}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {loading ? (
       <div className="flex justify-center"> <LoadingSpin color="bg-primary" /> </div> ):(
          <div className="grid grid-cols-1 2xl:grid-cols-12 gap-6">
            {/* LEFT SIDE */}
            <div className="2xl:col-span-8 space-y-6">
              {/* MY REFERRALS */}
              <div className="bg-white rounded-[20px] p-7 shadow-lg border border-slate-100">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-7">
                  <div>
                    <h2 className="text-xl font-black text-primary">
                      My Referrals
                    </h2>

                    <p className="text-slate-500 mt-1 text-sm">
                      Manage and track all referred patients.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-3">
               
                   <Link href="/referral-history" className="flex items-center gap-2 bg-slate-100 text-primary px-2 py-1 rounded-xl text-sm font-semibold hover:-translate-y-1 transition-all">                                
                                       View All
                                        </Link>
                  </div>
                </div>

                <div className="space-y-5">
                  {dashboardData?.referrals.map((referral) => (
                    <div
                      key={referral.id}
                      className="group relative overflow-hidden border border-slate-100 bg-gradient-to-r from-white to-slate-50 rounded-[16px] p-4 hover:-translate-y-1 hover:shadow-xl transition-all"
                    >
                      <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5 w-full">
                        <div className="flex items-center gap-5">
                          <div className="h-16 w-16 rounded-2xl flex items-center justify-center text-white text-2xl bg-gradient-to-r from-cyan-500 to-teal-500">
                            <FaUserInjured />
                          </div>

                          <div>
                            <h3 className="text-sm font-bold text-slate-900">
                              {referral.patient}
                            </h3>

                            <div className="flex items-center gap-3 mt-2 flex-wrap">
                              <span className="text-slate-700 px-3 py-1 rounded-full text-xs font-semibold">
                              Practitioner :  {referral.practitioner}
                              </span>

                              <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs font-semibold">
                                {referral.date}
                              </span>

                            

                               <span
                                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                  referral.urgency === "Routine"
                                    ? "bg-emerald-100 text-emerald-700"
                                    : referral.urgency === "Emergency"
                                    ? "bg-red-100 text-red-700"
                                    : "bg-orange-100 text-orange-700"
                                }`}
                              >
                                {referral.urgency}
                              </span>
                                <span
                                className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                                  referral.status === "completed"
                                    ? "bg-emerald-100 text-emerald-700"
                                    : referral.status === "accepted"
                                    ? "bg-cyan-100 text-cyan-700"
                                    : "bg-orange-100 text-orange-700"
                                }`}
                              >
                                {referral.status}
                              </span>
                            </div> 
                          </div>
                        </div>

                      
                      </div>
                    </div>
                  ))}
                  {dashboardData?.referrals.length === 0 && (
                    <div className="text-center py-6 text-sm min-h-[180px] text-gray-400">
                      No referrals found
                    </div>
                  ) }
                </div>
              </div>

             

     
            </div>

            {/* RIGHT SIDE */}
            <div className="2xl:col-span-4 space-y-6">
    

       {/* SUCCESS RATE */}
              <div className="bg-white rounded-[20px] p-7 shadow-lg border border-slate-100">
                <div className="flex items-center justify-between mb-7">
                  <div>
                    <h2 className="text-xl font-black text-primary">
                      Success Rate
                    </h2>

                    <p className="text-slate-500 mt-1 text-sm">
                      Referral conversion into appointments.
                    </p>
                  </div>
                </div>

                <div className="space-y-8">
                  <div>
                    <div className="flex items-center justify-between gap-4 mb-2">
                      <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-teal-600 shadow-lg"
                          style={{ width: dashboardData ? `${dashboardData.successRate}%` : "0%" }}
                        />
                      </div>

                      <span className="text-primary font-black text-2xl">
                        {dashboardData ? `${dashboardData.successRate}%` : "0%"}
                      </span>
                    </div>

                  </div>

                  <div className="grid md:grid-cols-3 gap-2">
                    {reffData.map((item, index) => (
                      <div
                        key={index}
                        className="rounded-[18px] border border-slate-100 p-2 text-center bg-slate-50 hover:-translate-y-1 transition-all"
                      >
       

                        <h2 className="text-4xl  font-black text-primary mt-3">
                          {item.value}
                        </h2>

                        <div
                          className={`inline-flex px-3 py-1 rounded-full text-xs font-bold mt-4 ${item.color}`}
                        >
                          {item.title}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

           
            </div>
          </div>)}
        </div>
                  
      </main>
    </div>
  );
}