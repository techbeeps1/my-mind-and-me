'use client'

import Image from "next/image";
import { CiLock } from "react-icons/ci";
import { GoEyeClosed, GoEye } from "react-icons/go";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toastTBS } from "@/lib/toast";

type FormErrors = {
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
};

type ChangePasswordPayload = {
  user_id: string;
  old_password: string;
  new_password: string;
  confirm_new_password: string;
};

// ✅ API CALL
async function changePasswordApi(payload: ChangePasswordPayload) {
  const res = await fetch("/api/auth/reset-password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to change password");
  }

  return data;
}

export default function ChangePassword() {

  const router = useRouter();

  const [showPass, setShowPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [MMMUserData] = useState(() => {
    if (typeof window === "undefined") return null;

    const data = localStorage.getItem("MMMDT");
    return data ? JSON.parse(data) : null;
  });
 

  function validate() {
    const newErrors: FormErrors = {};

    if (!currentPassword.trim()) {
      newErrors.currentPassword = "Current password is required";
    }

    if (!newPassword.trim()) {
      newErrors.newPassword = "New password is required";
    } else {
      if (newPassword.length < 6) {
        newErrors.newPassword = "Minimum 8 characters required";
      } else if (!/[A-Z]/.test(newPassword)) {
        newErrors.newPassword = "At least 1 uppercase letter required";
      } else if (!/[a-z]/.test(newPassword)) {
        newErrors.newPassword = "At least 1 lowercase letter required";
      } else if (!/[0-9]/.test(newPassword)) {
        newErrors.newPassword = "At least 1 number required";
      } else if (!/[!@#$%^&*]/.test(newPassword)) {
        newErrors.newPassword = "At least 1 special character required";
      }
    }

    if (!confirmPassword.trim()) {
      newErrors.confirmPassword = "Confirm password is required";
    } else if (confirmPassword !== newPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }


  async function submitChangePassword() {
    if (!validate()) return;

    try {
      if(loading) return;
      setLoading(true);
      console.log(MMMUserData);
     const res =  await changePasswordApi({
        user_id: MMMUserData?.id,
        old_password: currentPassword,
        new_password: newPassword,
        confirm_new_password: confirmPassword
      });
    if(res.success){
      toastTBS.success("Password changed successfully");
       setTimeout(() => {
      router.push("/dashboard");
      }, 1000);
    }else{
      toastTBS.error(res.message || "Failed to change password");
    }
  
    } catch (err: unknown) {
      if (err instanceof Error) {
        toastTBS.error(err.message);
      } else {
        toastTBS.error("Something went wrong");
      }
    } finally {
      setTimeout(() => {
             setLoading(false);
      }, 1000);
    
    }
  }

  return (
    <div className=" flex items-center justify-center">
      <div className="mb-11 w-full max-w-[584px] bg-white rounded-[10px] shadow-xl md:p-[40px] p-[25px]">

        <div className="space-y-[20px]">

          {/* Current Password */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Current Password
            </label>

            <div className="flex items-center gap-3 bg-primary/[0.08] rounded-md px-4 py-2">
              <CiLock className="h-5 w-5 text-primary" />
              <input
                type={showPass ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Current password"
                className="w-full bg-transparent outline-none text-sm"
              />
              <span onClick={() => setShowPass(!showPass)} className="cursor-pointer">
                {showPass ? <GoEye /> : <GoEyeClosed />}
              </span>
            </div>

            {errors.currentPassword && (
              <p className="text-red-500 text-xs mt-1">{errors.currentPassword}</p>
            )}
          </div>

          {/* New Password */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              New Password
            </label>

            <div className="flex items-center gap-3 bg-primary/[0.08] rounded-md px-4 py-2">
              <CiLock className="h-5 w-5 text-primary" />
              <input
                type={showNewPass ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="New password"
                className="w-full bg-transparent outline-none text-sm"
              />
              <span onClick={() => setShowNewPass(!showNewPass)} className="cursor-pointer">
                {showNewPass ? <GoEye /> : <GoEyeClosed />}
              </span>
            </div>

            {errors.newPassword && (
              <p className="text-red-500 text-xs mt-1">{errors.newPassword}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Confirm Password
            </label>

            <div className="flex items-center gap-3 bg-primary/[0.08] rounded-md px-4 py-2">
              <CiLock className="h-5 w-5 text-primary" />
              <input
                type={showConfirmPass ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm password"
                className="w-full bg-transparent outline-none text-sm"
              />
              <span onClick={() => setShowConfirmPass(!showConfirmPass)} className="cursor-pointer">
                {showConfirmPass ? <GoEye /> : <GoEyeClosed />}
              </span>
            </div>

            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
            )}
          </div>

          {/* Button */}
          <button
            onClick={submitChangePassword}
            disabled={loading}
            className="w-full py-3 rounded-full text-white font-bold bg-gradient-to-r from-cyan-400 to-teal-600 hover:opacity-90 transition"
          >
            {loading ? "Updating..." : "Change Password"}
          </button>

        </div>
      </div>
    </div>
  );
}