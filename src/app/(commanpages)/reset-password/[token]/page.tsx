"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { use } from "react";
import { toastTBS } from "@/lib/toast";
import Image from "next/image";
import { HiOutlineUserCircle } from "react-icons/hi";
import { CiLock } from "react-icons/ci";
import LoadingSpin from "@/components/LoadingSpin";
import { GoEye, GoEyeClosed } from "react-icons/go";

type PageProps = {
  params: Promise<{
    token: string;
  }>;
};

export default function ResetPass({ params }: PageProps) {
  const router = useRouter();
  const { token } = use(params);


  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({
    password: "",
    confirmPassword: "",
  });

  const [passVisible, setPassVisible] = useState(false);
  const [passVisible1, setPassVisible1] = useState(false);

  // ✅ Proper validation function
  function validatePasswords() {
    let valid = true;
    const newErrors = {
      password: "",
      confirmPassword: "",
    };

    if (!password.trim()) {
      newErrors.password = "Password is required";
      valid = false;
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      valid = false;
    } else if (
      !/(?=.*[a-z])/.test(password) ||
      !/(?=.*[A-Z])/.test(password) ||
      !/(?=.*\d)/.test(password) ||
      !/(?=.*[@$!%*?&])/.test(password)
    ) {
      newErrors.password =
        "Must include uppercase, lowercase, number & special character";
      valid = false;
    }

    if (!confirmPassword.trim()) {
      newErrors.confirmPassword = "Confirm password is required";
      valid = false;
    } else if (confirmPassword !== password) {
      newErrors.confirmPassword = "Passwords do not match";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  }

 

  async function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!validatePasswords()) return;

    try {
      setLoading(true)
      const res = await fetch(
        `/api/auth/reset-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token,
            new_password: password,
          }),
        }
      );

      const data = await res.json();
      if (data.success) {
        toastTBS.success("Password reset successful!");
        router.push("/login");
      } else {
        toastTBS.error(data.message || "Something went wrong");
      }
    } catch (error) {
      toastTBS.error("Server error");
    } finally {
      setLoading(false);
    }
  }

  
  return (
    <main>
      <section className="relative h-screen w-full overflow-hidden">
        <Image
          src="/banner-bg.jpg"
          alt="Banner"
          fill
          priority
          className="object-cover -z-1"
        />

        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="w-full max-w-[584px] bg-white rounded-[10px] shadow-xl md:p-[40px] p-[25px]">
            <h1 className="text-[35px] font-semibold text-center text-primary mb-[40px]">
              Reset Password
            </h1>

            <form onSubmit={submitHandler} className="space-y-5">
              {/* Password */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Password
                </label>
                <div className="flex items-center gap-3 bg-primary/[0.08] rounded-md px-4 py-2">
                  <HiOutlineUserCircle className="h-5 w-5 text-primary" />
                  <input
                    type={passVisible ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="w-full bg-transparent outline-none text-sm"
                  />
                  <span
                    className="cursor-pointer"
                    onClick={() => setPassVisible(!passVisible)}
                  >
                    {passVisible ? <GoEye /> : <GoEyeClosed />}
                  </span>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.password}
                  </p>
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
                    type={passVisible1 ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm Password"
                    className="w-full bg-transparent outline-none text-sm"
                  />
                  <span
                    className="cursor-pointer"
                    onClick={() => setPassVisible1(!passVisible1)}
                  >
                    {passVisible1 ? <GoEye /> : <GoEyeClosed />}
                  </span>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              {/* Button */}
              <button
                type="submit"
                disabled={loading}
                className="flex justify-center w-full py-3 rounded-full text-white font-bold bg-gradient-to-r from-cyan-400 to-teal-600 hover:opacity-90 transition"
              >
                {loading ? <LoadingSpin height={16} width={3} /> : "Reset Password"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}