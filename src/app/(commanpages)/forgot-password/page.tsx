'use client'

import Image from "next/image";
import Link from "next/link";
import { HiOutlineUserCircle } from "react-icons/hi2";

import { useState } from "react";
import { useRouter } from "next/navigation";

//import { sendResetLink } from "@/services/api"; // Assuming a reset password function is available
import { toastTBS } from "@/lib/toast";
import { sendResetLink } from "@/services/api";

export default function ForgotPass() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  type FormErrors = {
    email?: string;
  };

  const [errors, setErrors] = useState<FormErrors>({});
  const router = useRouter();

  // ✅ Validation Function
  function validate() {
    const newErrors: FormErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email format";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  // ✅ Submit Function for sending the reset link
  async function submitForgotPassword() {
    if (!validate()) return;

    try {
      setLoading(true);

      const data = await sendResetLink(email); // Assuming this function sends a reset link
       console.log("Reset Link Response:", data); // Log the response for debugging
      toastTBS.success("Password reset link sent successfully 🎉");

      setTimeout(() => {
        router.push("/login"); // Redirect to login page after sending reset link
      }, 1000);
    } catch (err) {
      if (err instanceof Error) {
        toastTBS.error(err.message || "Error sending reset link");
      } else {
        toastTBS.error("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      <section className="relative h-screen w-full overflow-hidden">
        <Image
          src="/banner-bg.jpg"
          alt="Mental Health Banner"
          fill
          priority
          className="object-cover -z-1"
        />

        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="w-full max-w-[584px] bg-white rounded-[10px] shadow-xl md:p-[40px] p-[25px]">

            <h1 className="text-[35px] font-semibold text-center text-primary mb-[40px]">
              Forgot Password
            </h1>

            <div className="space-y-[20px]">

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Enter your email address
                </label>
                <div className="flex items-center gap-3 bg-primary/[0.08] rounded-md px-4 py-2">
                  <HiOutlineUserCircle className="h-5 w-5 text-primary" />
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email address"
                    className="w-full bg-transparent outline-none text-sm"
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Button */}
              <button
                onClick={submitForgotPassword}
                disabled={loading}
                className="w-full py-3 rounded-full text-white font-bold bg-gradient-to-r from-cyan-400 to-teal-600 hover:opacity-90 transition"
              >
                {loading ? "Sending..." : "Send Reset Link"}
              </button>
            </div>

            <div className="mt-4 text-center">
              <Link href="/login" className="text-sm text-primary font-semibold hover:underline">
                Back to Login
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}