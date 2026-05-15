"use client";

import Link from "next/link";

import {
  FiCalendar,
  FiCheckCircle,
  FiClock,
  FiTrendingUp,
  FiUserPlus,
  FiXCircle,
} from "react-icons/fi";

import { SiGooglemeet } from "react-icons/si";
import { FaUserAlt } from "react-icons/fa";
import { useProfile } from "@/services/ProfileContext";
import { useEffect, useState } from "react";
import LoadingSpin from "../LoadingSpin";
import { getPractitionerDashboard } from "@/services/api";
import ConfirmModal from "../comman/ConfirmModal";

export interface DashboardResponse {
  incomingReferrals: number;
  totalUpcomingSessions: number;
  referrals: Referral[];
  upcomingSessions: UpcomingSession[];
  verification: Verification[];
 thisWeek: string,
 thisMonth: string,
 totalEarning: string
   
}

export interface Referral {
  id: string;
  patient: string;
  therepist: string;
  date: string;
  priority: string;
}

export interface UpcomingSession {
  id: string;
  date: string;
  time: string;
  patient: string;
  meeting_link: string;
}

export interface Verification {
  file: string;
  name: string;
  status: "Pending" | "Verified" | "Expired" | "Rejected";
  expiry_date: string;
}

export default function DashboardPractitioner() {
  const { MMMUserData } = useProfile();
  const [Loading, setLoading] = useState(true);
  const [showStatusModal, setShowStatusModal] = useState({id: "", type: ""});
  const [dashboardData, setDashboardData] = useState<DashboardResponse>();
  const [topHeader, setTopHeader] = useState([
    {
      title: "Incoming Referrals",
      value: "0",
      icon: <FiUserPlus size={26} />,
      gradient: "from-cyan-500 to-blue-600",
    },
    {
      title: "Upcoming Sessions",
      value: "0",
      icon: <FiCalendar size={26} />,
      gradient: "from-orange-400 to-pink-500",
    },
    {
      title: "Earnings",
      value: "R 0",
      icon: <span className="text-3xl font-bold">R</span>,
      gradient: "from-emerald-400 to-teal-500",
    },
  ]);



  useEffect(() => {
    // Fetch referrer dashboard data from API
    if (!MMMUserData?.id) return;
    getPractitionerDashboard(MMMUserData?.id)
      .then((data) => {
        setDashboardData(data.data);
        setTopHeader((prev) =>
          prev.map((card, index) => {
            switch (index) {
              case 0:
                return {
                  ...card,
                  value: data.data.incomingReferrals.toString(),
                };
              case 1:
                return {
                  ...card,
                  value: data.data.totalUpcomingSessions.toString(),
                };
              case 2:
                return {
                  ...card,
                  value: `R ${data.data.totalEarning}`,
                };
              default:
                return card;
            }
          }),
        );

        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching referrer dashboard data:", error);
      });
  }, [MMMUserData]);

  return (
    <div className="min-h-screen">
      <main className="flex-1 overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-7">
          {/* TOP STATS */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {topHeader?.map((card, index) => (
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
          {Loading ? (
            <div className="flex justify-center">
              {" "}
              <LoadingSpin color="bg-primary" />{" "}
            </div>
          ) : (
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
              {/* LEFT SIDE */}
              <div className="xl:col-span-8 space-y-6">
                {/* INCOMING REFERRALS */}
                <div className="bg-white rounded-[20px] p-7 shadow-lg border border-slate-100">
                  <div className="flex items-center justify-between mb-7">
                    <div>
                      <h2 className="text-xl font-black text-primary">
                        Incoming Referrals
                      </h2>

                      <p className="text-slate-500 mt-1 text-sm">
                        New patient referrals awaiting acceptance.
                      </p>
                    </div>

                    <Link
                      href="/upcoming-referrals"
                      className="flex items-center gap-2 bg-slate-100 text-primary px-2 py-1 rounded-xl text-sm font-semibold hover:-translate-y-1 transition-all"
                    >
                      View All
                    </Link>
                  </div>

                  <div className="space-y-5">
                    {dashboardData?.referrals.map((referral) => (
                      <div
                        key={referral.id}
                        className="group relative overflow-hidden border border-slate-100 bg-gradient-to-r from-white to-slate-50 rounded-[16px] p-4 hover:shadow-xl hover:-translate-y-1 transition-all"
                      >
                        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5">
                          <div className="flex items-center gap-5">
                            <div className="h-13 w-13 rounded-2xl flex items-center justify-center text-white text-2xl bg-gradient-to-r from-cyan-500 to-teal-500">
                              <FaUserAlt />
                            </div>

                            <div>
                              <h3 className="text-sm font-bold text-slate-900">
                                {referral.patient}
                              </h3>

                              <div className="flex items-center gap-3 mt-2 flex-wrap">
                                <span className="text-slate-700 px-3 py-1 rounded-full text-xs font-semibold">
                                  Refer by : {referral.therepist}
                                </span>

                                <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs font-semibold">
                                  {referral.date}
                                </span>

                                <span
                                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                    referral.priority === "Emergency"
                                      ? "bg-red-100 text-red-700"
                                      : referral.priority === "Urgent"
                                        ? "bg-amber-100 text-amber-700"
                                        : "bg-emerald-100 text-emerald-700"
                                  }`}
                                >
                                  {referral.priority}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="flex gap-3">
                            <button
                              className="cursor-pointer bg-emerald-500 hover:bg-emerald-600 text-white text-sm px-3 py-1.5 rounded-xl font-semibold transition transition-all hover:-translate-y-1"
                              onClick={() => {
                                setShowStatusModal({id: referral.id, type: "accept"});
                              }}
                            >
                              Accept
                            </button>

                            <button
                              className="cursor-pointer bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1.5 rounded-xl font-semibold transition transition-all hover:-translate-y-1"
                              onClick={() => {
                                setShowStatusModal({id: referral.id, type: "reject"});
                              }}
                            >
                              Reject
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* TODAY SCHEDULE */}
                <div className="bg-white rounded-[20px] p-7 shadow-lg border border-slate-100">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-xl font-black text-primary">
                        {"Upcoming Schedule"}
                      </h2>

                      <p className="text-slate-500 mt-1 text-sm">
                        All scheduled sessions for Upcoming Days.
                      </p>
                    </div>
                    <Link
                      href="/booking-history"
                      className="flex items-center gap-2 bg-slate-100 text-primary px-2 py-1 rounded-xl text-sm font-semibold hover:-translate-y-1 transition-all"
                    >
                      View All
                    </Link>
                  </div>

                  <div className="space-y-4">
                    {dashboardData?.upcomingSessions.map((session) => (
                      <div
                        key={session.id}
                        className="group rounded-[16px] border border-slate-100 p-4 hover:shadow-lg transition-all hover:-translate-y-1 transition-all"
                      >
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex gap-4">
                            <div
                              className={`h-13 w-13 rounded-2xl flex items-center justify-center text-white text-2xl bg-gradient-to-r from-cyan-500 to-teal-500 `}
                            >
                              <FaUserAlt />
                            </div>

                            <div>
                              <h3 className="font-bold text-slate-900 text-sm">
                                {session.patient}
                              </h3>

                              <div className="flex items-center gap-2 mt-2 flex-wrap">
                                <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs font-semibold">
                                  {session.date}
                                </span>
                                <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs font-semibold">
                                  {session.time}
                                </span>
                              </div>
                            </div>
                          </div>

                          <Link
                            href={session.meeting_link}
                            className="bg-gradient-to-r from-teal-400 to-teal-700 text-white  hover:scale-105 transition text-md   font-semibold shadow-lg flex items-center justify-center gap-1 px-2 py-1 rounded-md text-sm"
                          >
                            <SiGooglemeet className="text-lg" />
                            Join
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* RIGHT SIDE */}
              <div className="xl:col-span-4 space-y-6">
                {/* EARNINGS */}
                <div className="bg-white rounded-[20px] p-7 shadow-lg border border-slate-100">
                  <div className="flex items-center justify-between mb-7">
                    <div>
                      <h2 className="text-xl font-black text-primary">
                        Earnings Overview
                      </h2>

                      <p className="text-slate-500 mt-1 text-sm">
                        Track weekly and monthly practitioner earnings.
                      </p>
                    </div>
                  </div>

                  <div className="grid 2xl:grid-cols-2 gap-5">
                  
                      <div
                    
                        className="relative overflow-hidden rounded-[20px] p-4 bg-gradient-to-br from-cyan-500 to-teal-500 text-white shadow-lg hover:-translate-y-1 transition-all"
                      >
                        <div className="absolute right-0 top-0 w-40 h-40 bg-white/10 rounded-full blur-3xl" />

                        <div className="relative z-10">
                          <div className="flex items-center justify-between">
                            <p className="text-sm opacity-90">This Week</p>

                            <FiTrendingUp className="text-2xl" />
                          </div>

                          <h2 className="text-2xl text-center font-black mt-1">
                            R {dashboardData?.thisWeek || "0"}
                          </h2>
                        </div>
                      </div>
                      <div
                    
                        className="relative overflow-hidden rounded-[20px] p-4 bg-gradient-to-br from-cyan-500 to-teal-500 text-white shadow-lg hover:-translate-y-1 transition-all"
                      >
                        <div className="absolute right-0 top-0 w-40 h-40 bg-white/10 rounded-full blur-3xl" />

                        <div className="relative z-10">
                          <div className="flex items-center justify-between">
                            <p className="text-sm opacity-90">This Month</p>

                            <FiTrendingUp className="text-2xl" />
                          </div>

                          <h2 className="text-2xl text-center font-black mt-1">
                            R {dashboardData?.thisMonth || "0"}
                          </h2>
                        </div>
                      </div>
                 
                  </div>
                </div>

                {/* VERIFICATION */}
                <div className="bg-white rounded-[20px] p-7 shadow-lg border border-slate-100">
                  <div className="flex items-center justify-between mb-7">
                    <div className="flex-1">
                      <h2 className="text-xl font-black text-primary">
                        Verification Status
                      </h2>

                      <p className="text-slate-500 mt-1 text-sm">
                        Compliance and credential verification.
                      </p>
                    </div>
                    <Link
                      href="/verification-status"
                      className="flex items-center gap-2 bg-slate-100 text-primary px-2 py-1 rounded-xl text-sm font-semibold hover:-translate-y-1 transition-all"
                    >
                      View All
                    </Link>
                  </div>

                  <div className="space-y-5">
                    {dashboardData?.verification.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 rounded-[10px] border border-slate-100 hover:bg-slate-50 transition hover:-translate-y-1 transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`h-12 w-12 rounded-xl flex items-center justify-center text-white ${
                              item.status === "Verified"
                                ? "bg-emerald-500"
                                : item.status === "Pending"
                                  ? "bg-yellow-500"
                                  : "bg-red-500"
                            }`}
                          >
                            {item.status === "Verified" ? (
                              <FiCheckCircle size={22} />
                            ) : item.status === "Pending" ? (
                              <FiClock size={22} />
                            ) : (
                              <FiXCircle size={22} />
                            )}
                          </div>

                          <div>
                            <h3 className="font-bold text-slate-900 uppercase text-sm">
                              {item.name}
                            </h3>
                          </div>
                        </div>

                        <span
                          className={`text-xs font-bold px-4 py-2 rounded-full ${
                            item.status === "Verified"
                              ? "bg-emerald-100 text-emerald-700"
                              : item.status === "Pending"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-red-100 text-red-700"
                          }`}
                        >
                          {item.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <ConfirmModal
        isOpen={!!showStatusModal.id}
        onClose={() => setShowStatusModal({id: "", type: ""})}
        type={showStatusModal.type}
        userId={showStatusModal.id}
        callback={() => {}}
      />
    </div>
  );
}
