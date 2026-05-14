"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CheckSession() {
  const router = useRouter();

  useEffect(() => {
    //  const MAX_SESSION_MS = 12 * 60 * 60 * 1000; // 12 hours
    const INACTIVITY_MS = 30 * 60 * 1000; // FOR TESTING: 10 minutes
    const logout = () => {

     // if(router.) return;
      router.replace("/logout");
    };

    const checkSession = () => {
      const lastActivity = localStorage.getItem("MMMlastActivity");
      const MMMDT = localStorage.getItem("MMMDT");

      console.log("Checking session...");
      const now = Date.now();

      if (MMMDT && lastActivity && now - Number(lastActivity) > INACTIVITY_MS) {
        logout();
        return;
      }

    };


    const interval = setInterval(checkSession, 20 * 1000);


    const updateActivity = () => {
      const lastActivity = localStorage.getItem("MMMlastActivity");
      const MMMDT = localStorage.getItem("MMMDT");

      if (
        MMMDT && Date.now() - Number(lastActivity) < INACTIVITY_MS
      ) {
  
        localStorage.setItem("MMMlastActivity", Date.now().toString());
      }

    };
    checkSession();

    window.addEventListener("click", updateActivity);
    window.addEventListener("keydown", updateActivity);
    window.addEventListener("mousemove", updateActivity);
    window.addEventListener("scroll", updateActivity);

    return () => {
      clearInterval(interval);
      window.removeEventListener("click", updateActivity);
      window.removeEventListener("keydown", updateActivity);
      window.removeEventListener("mousemove", updateActivity);
      window.removeEventListener("scroll", updateActivity);
    };
  }, [router]);

  return null;
}
