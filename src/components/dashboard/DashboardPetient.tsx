"use client";

import {
  FiCalendar,

  FiFileText,
  FiTrendingUp,
} from "react-icons/fi";


import { FaUserAlt } from "react-icons/fa";
import Link from "next/link";
import { SiGooglemeet } from "react-icons/si";
import { useEffect, useState } from "react";
import { getPatientDashboard } from "@/services/api";
import { useProfile } from "@/services/ProfileContext";
import LoadingSpin from "../LoadingSpin";
interface DashboardData {
  totalUpcomingSessions: number;
  progressGoals: number;
  totalAppointments: number;
  totalPractitioners: number;
  upcomingSessions: UpcomingSession[];
  practitioners: Practitioner[];
  resources: Resource[];
  invoices: Invoice[];
}

interface UpcomingSession {
  id: string;
  date: string;
  time: string;
  practitioner: string;
  meeting_link: string;
}

interface Practitioner {
  name: string;
  qualifications: string;
}

interface Resource {

    id: string;
    title: string;
    type: string;
    status: string;
  // Define fields when available
}

interface Invoice {
  id: string;
}
export default function DashboardPetient() {
    const { MMMUserData } = useProfile();
    const [loading, setLoading] = useState(true);
    const [dashboardData, setDashboardData] = useState<DashboardData>();
    const [TopData, setTopData] = useState([
                        {
                          title: "Upcoming Sessions",
                          value: "0",
                          icon: <FiCalendar size={26} />,
                          gradient: "from-cyan-500 to-blue-600",
                        },
                        {
                          title: "Treatment Progress",
                          value: "0%",
                          icon: <FiTrendingUp size={26} />,
                          gradient: "from-violet-500 to-fuchsia-500",
                        },
                        {
                          title: "Appointments",
                          value: "0",
                          icon: <FiFileText size={26} />,
                          gradient: "from-orange-400 to-pink-500",
                        }
                       
                      ]);


useEffect(() => {
  // Fetch patient dashboard data from API
  if (!MMMUserData?.id) return;
getPatientDashboard(MMMUserData?.id).then(data => {
    setDashboardData(data.data);
    setTopData( ()=> [
        {
          title: "Upcoming Sessions",
          value: data.data.totalUpcomingSessions.toString(),
          icon: <FiCalendar size={26} />,
          gradient: "from-cyan-500 to-blue-600",
        },
        {
          title: "Treatment Progress",
          value: `${data.data.progressGoals}%`,
          icon: <FiTrendingUp size={26} />,
          gradient: "from-violet-500 to-fuchsia-500",
        },
        {
          title: "Appointments",
          value: data.data.totalAppointments.toString(),
          icon: <FiFileText size={26} />,
          gradient: "from-orange-400 to-pink-500",
        }
        
      ]);

    setLoading(false);

}).catch(error => {
  console.error("Error fetching patient dashboard data:", error);

});


},[MMMUserData])
  

  return (
    <>
 
              <div className="min-h-screen ">
                <main className="flex-1 overflow-hidden">
                  <div className="max-w-7xl mx-auto space-y-7">
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                      {TopData.map((card, index) => (
                        <div
                          key={index}
                          className="relative overflow-hidden z-0 rounded-[15px] bg-white border border-slate-100 shadow-lg p-5 hover:-translate-y-1 transition-all"
                        >
                          <div
                            className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${card.gradient} opacity-10 rounded-full blur-3xl`}
                          ></div>

                          <div className="flex justify-between relative z-10 items-center ">
                            <div>
                              <p className="text-slate-500 text-sm font-medium">
                                {card.title}
                              </p>
                              <h2 className="text-4xl font-black text-primary mt-3">
                                {card.value}
                              </h2>
                            </div>

                            <div
                              className={`w-13 h-13 rounded-full bg-gradient-to-br ${card.gradient} text-white flex items-center justify-center shadow-lg`}
                            >
                              {card.icon}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    {loading ? (
                     <div className="flex items-center justify-center p-10"> <LoadingSpin color="bg-primary" /> </div> ):(
                    <div className="grid grid-cols-1 2xl:grid-cols-12 gap-6">
                      <div className="2xl:col-span-8 space-y-6">
                        <div className="bg-white rounded-[20px] p-7 shadow-lg border border-slate-100">
                          <div className="flex items-center justify-between mb-7">
                            <div>
                              <h2 className="text-xl font-black text-primary">
                                Upcoming Sessions
                              </h2>
                              <p className="text-slate-500 mt-1 text-sm">
                                Appointments scheduled for the next 7 days.
                              </p>
                            </div>
                           <Link href="/booking-history" className="flex items-center gap-2 bg-slate-100 text-primary px-2 py-1 rounded-xl text-sm font-semibold hover:-translate-y-1 transition-all">
                                  
                                       View All
                                        </Link>
                          </div>

                          <div className="space-y-5">
                            {dashboardData?.upcomingSessions?.map((session) => (
                              <div
                                key={session.id}
                                className="group relative overflow-hidden border border-slate-100 bg-gradient-to-r from-white to-slate-50 rounded-[10px] p-3 hover:-translate-y-1 hover:shadow-xl transition-all"
                              >
                                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
                                  <div className="flex items-center gap-5">
                                    <div
                                      className={`h-13 w-13 rounded-2xl flex items-center justify-center text-white text-2xl bg-gradient-to-r from-cyan-500 to-teal-500 `}
                                    >
                                      <FaUserAlt />
                                    </div>

                                    <div>
                                      <h3 className="text-md font-bold text-slate-900">
                                        {session.practitioner}
                                      </h3>

                                      <div className="flex items-center gap-3 mt-2 flex-wrap">
    
                                        <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm font-semibold">
                                          {session.date}
                                        </span>

                                        <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm font-semibold">
                                          {session.time}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  {session.meeting_link && (
                                  <Link
                                    href={session?.meeting_link ?? "#"}
                                    target={"_blank"}
                                    rel="noopener noreferrer"
                                    className={`bg-gradient-to-r from-teal-400 to-teal-700 text-white  hover:scale-105 transition text-md   font-semibold shadow-lg flex items-center justify-center gap-1 px-2 py-1 rounded-md text-sm`}
                                  >
                                    <SiGooglemeet className="text-lg" /> Join
                                  </Link> )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
  
                        <div className="bg-white rounded-[20px] p-7 shadow-lg border border-slate-100">
                          <div className="flex items-center justify-between mb-8">
                            <div>
                              <h2 className="text-2xl font-black text-primary">
                                Progress Tracker
                              </h2>
                            </div>
                          </div>

                          <div className="space-y-8">
                            
                              <div >
                                <div className="flex items-center justify-between gap-4 mb-2">
                                  <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden ">
                                    <div
                                      className="h-full rounded-full bg-gradient-to-r from-cyan-200 to-teal-800 shadow-lg"
                                      style={{ width: `${dashboardData?.progressGoals || 0}%` }}
                                    ></div>
                                  </div>
                                  <span className="text-primary font-black text-lg">
                                    {dashboardData?.progressGoals}%
                                </span>
                                </div>
                              </div>
                       
                          </div>
                        </div>
                      </div>

                      <div className="2xl:col-span-4 space-y-6">
                        <div className="bg-white rounded-[20px] p-7 shadow-lg border border-slate-100">
                          <div className="flex items-center justify-between mb-6">
                            <div>
                              <h2 className="text-xl font-black text-primary">
                                My Practitioners
                              </h2>
                              <p className="text-slate-500 mt-1 text-sm">
                                Assigned specialists.
                              </p>
                            </div>
                          </div>

                          <div className="space-y-5">
                            {dashboardData?.practitioners?.map((person, index) => (
                              <div
                                key={index}
                                className="flex items-center gap-4 p-2 rounded-[10px] border border-slate-100 hover:bg-slate-50 transition hover:-translate-y-1 transition-all"
                              >
                                <div
                                  className={`h-13 w-13 rounded-2xl flex items-center justify-center text-white text-2xl bg-gradient-to-r from-cyan-500 to-teal-500 `}
                                >
                                  <FaUserAlt />
                                </div>

                                <div className="flex-1">
                                  <h3 className="font-bold text-slate-900 text-sm">
                                    {person.name}
                                  </h3>
                                  <p className="text-slate-500 text-sm mt-1">
                                    {person.qualifications}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

               
                      </div>
                    </div>
                     )}
                  </div>
                </main>
              </div>
            
    </>
  );
}
