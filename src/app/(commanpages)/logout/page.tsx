"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { toastTBS } from "@/lib/toast";



export default function LogoutPage() {
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