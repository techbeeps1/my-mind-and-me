"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { toastTBS } from "@/lib/toast";

import { useProfile } from "@/services/ProfileContext";

export default function LogoutPage() {
   const { logoutUser } = useProfile();
  const router = useRouter();
  const hasLoggedOut = useRef(false);

  useEffect(() => {
    if (hasLoggedOut.current) return;
    hasLoggedOut.current = true;

    const logout = async () => {
      try {
        await fetch("/api/auth/logout", {
          method: "POST",
        });

        localStorage.removeItem("MMMDT");
        localStorage.removeItem("loginTime");
        localStorage.removeItem("lastActivity");
        logoutUser();
        toastTBS.success("Logged out successfully");

        router.push("/login");
      } catch (err) {
        toastTBS.error("Failed to logout");
        console.error(err);
      }
    };

    logout();
  }, [router]);

  return null;
}