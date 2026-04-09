'use client'

import { useProfile } from "@/services/ProfileContext";
import Image from "next/image";
import Link from "next/link";
import { GoEyeClosed, GoEye } from "react-icons/go";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { CiLock } from "react-icons/ci";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { authApiPath } from "@/services/api";
import {toastTBS} from "@/lib/toast";
import LoadingSpin from "@/components/LoadingSpin";


export default function Home() {
   const { setMMMUserData } = useProfile();
  const [passVisble, setPassVisble] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
type FormErrors = {
  email?: string;
  password?: string;
};

const [errors, setErrors] = useState<FormErrors>({});
  const router = useRouter();

  function validate() {
   const newErrors: FormErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email format";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }


  async function submitlogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);

  
        const res = await fetch(`${authApiPath}/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        if(res.ok){
        const data = await res.json();
      if (data.id) {
        setMMMUserData(data);
        localStorage.setItem("MMMDT", JSON.stringify(data));
      }
     toastTBS.success("Login successful");
      setTimeout(() => {
        router.replace("/dashboard");
      }, 1000);
    }else{
      const errorData = await res.json();
      throw new Error(errorData.message || "Login failed");
    }
    } catch (err) {
       if (err instanceof Error) {
        console.error("Login error:", err);
    toastTBS.error(err.message || "Login failed");
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
              Login
            </h1>

            <div className="space-y-[20px]">
   <form onSubmit={submitlogin} className="space-y-5">
              {/* Email */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Username or email
                </label>
                <div className="flex items-center gap-3 bg-primary/[0.08] rounded-md px-4 py-2">
                  <HiOutlineUserCircle className="h-5 w-5 text-primary" />
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Username or email"
                    className="w-full bg-transparent outline-none text-sm"
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <div className="flex justify-between mb-1">
                  <label className="text-sm">Password</label>
                  <Link href="/forgot-password" className="text-sm font-bold hover:underline">
                    Forgot Password?
                  </Link>
                </div>

                <div className="flex items-center gap-3 bg-primary/[0.08] rounded-md px-4 py-2">
                  <CiLock className="h-5 w-5 text-primary" />
                  <input
                    type={passVisble ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="w-full bg-transparent outline-none text-sm"
                  />
                  <span
                    className="cursor-pointer"
                    onClick={() => setPassVisble(!passVisble)}
                  >
                    {passVisble ? <GoEye /> : <GoEyeClosed />}
                  </span>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Button */}
              <button
                type="submit"
                disabled={loading}
                className="cursor-pointer flex justify-center w-full py-3 rounded-full text-white font-bold bg-gradient-to-r from-cyan-400 to-teal-600 hover:opacity-90 transition"
              >
                {loading ? <LoadingSpin height={16} width={3} /> : "Login"}
              </button>

</form>
                {/* Footer */}
              <p className="text-center text-sm text-primary leading-[14px] mt-[30px]">
                Do not have an account?{" "}
                <Link href="/sign-up" className="text-[#1F625F] font-bold hover:underline">
                 Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}