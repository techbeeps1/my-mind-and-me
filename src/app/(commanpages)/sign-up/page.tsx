'use client'

import Image from "next/image";
import Link from "next/link";
import { GoEyeClosed, GoEye } from "react-icons/go";
import { CiLock } from "react-icons/ci";
import { useState } from "react";
import { LuMail } from "react-icons/lu";
import { FaRegUser, FaPhone } from "react-icons/fa6";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { toastTBS } from "@/lib/toast";
import LoadingSpin from "@/components/LoadingSpin";

type SignupPayload = {
  email: string;
  password: string;
  role: "patient" | "practitioner" | "referrer";
  name: string;
  phone: string;
};

export default function Home() {
  const router = useRouter();
  const [passVisble, setPassVisble] = useState(false);
  const [confpassVisble, setConfPassVisble] = useState(false);
  const [userRole, setUserRole] = useState('Patient');
  const [loading, setLoading] = useState(false);

  const [isAgreed, setIsAgreed] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [passwordError, setPasswordError] = useState("");
  const [confirmError, setConfirmError] = useState("");

  const validatePassword = (password: string) => {
    if (password.length < 6) return "Minimum 6 characters required";
    if (!/[A-Z]/.test(password)) return "At least 1 uppercase letter";
    if (!/[a-z]/.test(password)) return "At least 1 lowercase letter";
    if (!/[0-9]/.test(password)) return "At least 1 number";
    if (!/[!@#$%^&*]/.test(password)) return "At least 1 special character";
    return "";
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "password") {
      const error = validatePassword(value);
      setPasswordError(error);

      if (formData.confirmPassword && value !== formData.confirmPassword) {
        setConfirmError("Passwords do not match");
      } else {
        setConfirmError("");
      }
    }

    if (name === "confirmPassword") {
      if (value !== formData.password) {
        setConfirmError("Passwords do not match");
      } else {
        setConfirmError("");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userRole) {
      toastTBS.error("Please select role");
      return;
    }

    if (!isAgreed) {
      toastTBS.error("Please accept Terms & Conditions");
      return;
    }
    if (!formData.name.trim()) {
      toastTBS.error("Name is required");
      return;
    }
    if (!formData.email.trim()) {
      toastTBS.error("Email is required");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toastTBS.error("Invalid email format");
      return;
    }
    if (!formData.password.trim()) {
      toastTBS.error("Password is required");
      return;
    }
    if(formData.phone.trim()){
        if (!/^\d{10}$/.test(formData.phone)) {
          toastTBS.error("Invalid phone number");
           return;
        }
         
    }else{
      if(userRole.toLowerCase() == "practitioner"){
          toastTBS.error("Phone number is required");
           return;
        } 
      }

    if (passwordError) {
      toastTBS.error(passwordError);
      return;
    }

    if (confirmError) {
      toastTBS.error(confirmError);
      return;
    }

    const payload: SignupPayload = {
      email: formData.email,
      password: formData.password,
      role: userRole.toLowerCase() as SignupPayload["role"],
      name: formData.name,
      phone: formData.phone,
    };
   
  setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
     console.log(data);
     if(data.success){
    setLoading(false);
    toastTBS.success("You have registered successfully!");
        setTimeout(() => {
        router.push("/login");
      }, 2000);
     }else{
        setLoading(false);
      toastTBS.error(data.message || "Registration failed");
     }

      

  


    } catch (error: unknown) {
      if (error instanceof Error) {
        toastTBS.error(error.message);
      } else {
        toastTBS.error("Something went wrong");
      }

      setLoading(false);
    }
  };

  return (
    <>
      <main>
        <section className="relative h-screen w-full overflow-hidden">
          <Image
            src="/banner-bg.jpg"
            alt="Mental Health Banner"
            fill
            priority
            className="object-cover"
          />

          <div className="min-h-screen flex items-center justify-center px-4">
            <div className="w-full max-w-[680px] z-1 bg-white rounded-[10px] shadow-[0_4px_50px_hsl(0_0%_0%_/_20%)] md:p-[30px] p-[25px]">
              <h1 className="text-[35px] leading-[36px] font-semibold text-center text-primary mb-[40px]">
                Sign Up
              </h1>

              <form onSubmit={handleSubmit}>
                {/* Role */}
                <div className="mb-[15px]">
                  <p className="font-semibold text-primary leading-[24px] mb-2">
                    Role Selection
                  </p>
                  <div className="flex justify-between">
                    {["Patient", "Practitioner", "Referrer"].map((role, i) => (
                      <label
                        key={role}
                        className={`flex items-center gap-2 w-[175px] max-w-full px-4 py-2 rounded-lg font-semibold cursor-pointer text-[15px] text-primary
                        ${role === userRole ? "bg-primary/[0.08]" : "border border-primary/[0.08]"}`}
                      >
                        <input
                          type="radio"
                          name="role"
                          defaultChecked={i === 0}
                          value={role}
                          onChange={(e) => setUserRole(e.target.value)}
                        />
                        {role}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-[15px]">
                  {/* Name */}
                  <label className="block text-sm font-semibold text-primary mb-[8px]">
                    Full Name
                  </label>
                  <div className="flex items-center gap-[12px] bg-primary/[0.08] rounded-md px-[16px] py-[10px]">
                    <FaRegUser />
                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      type="text"
                      placeholder="Full Name"
                      className="w-full bg-transparent outline-none"
                    />
                  </div>

                  {/* Email + Phone */}
                  <div className="flex gap-[20px]">
                    <div className="w-full">
                      <label className="text-sm font-semibold text-primary mb-[8px] block">Email</label>
                      <div className="flex items-center gap-[12px] bg-primary/[0.08] px-[16px] py-[10px] rounded-md">
                        <LuMail />
                        <input
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          type="email"
                          placeholder="Email"
                          className="w-full bg-transparent outline-none"
                        />
                      </div>
                    </div>

                    <div className="w-full">
                      <label className="text-sm font-semibold text-primary mb-[8px] block">Phone</label>
                      <div className="flex items-center gap-[12px] bg-primary/[0.08] px-[16px] py-[10px] rounded-md">
                        <FaPhone />
                        <input
                          required={userRole.toLowerCase() === "practitioner"}
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          type="tel"
                          placeholder="Phone"
                          className="w-full bg-transparent outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Password */}
                  <div className="flex gap-[20px]">
                    <div className="w-full">
                      <label className="text-sm font-semibold text-primary mb-[8px] block">Password</label>
                      <div className="flex items-center gap-[12px] bg-primary/[0.08] px-[16px] py-[10px] rounded-md">
                        <CiLock />
                        <input
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          type={passVisble ? "text" : "password"}
                          placeholder="Password"
                          className="w-full bg-transparent outline-none"
                        />
                        <span onClick={() => setPassVisble(!passVisble)}>
                          {passVisble ? <GoEye /> : <GoEyeClosed />}
                        </span>
                      </div>
                      {passwordError && (
                        <p className="text-red-500 text-sm mt-1">{passwordError}</p>
                      )}
                    </div>

                    {/* Confirm Password */}
                    <div className="w-full">
                      <label className="text-sm font-semibold text-primary mb-[8px] block">Confirm Password</label>
                      <div className="flex items-center gap-[12px] bg-primary/[0.08] px-[16px] py-[10px] rounded-md">
                        <CiLock />
                        <input
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          type={confpassVisble ? "text" : "password"}
                          placeholder="Confirm Password"
                          className="w-full bg-transparent outline-none"
                        />
                        <span onClick={() => setConfPassVisble(!confpassVisble)}>
                          {confpassVisble ? <GoEye /> : <GoEyeClosed />}
                        </span>
                      </div>

                
                      {confirmError && (
                        <p className="text-red-500 text-sm mt-1">{confirmError}</p>
                      )}
                    </div>
                  </div>

                  {/* Terms */}
                  <div className="flex items-center gap-2 mb-6">
                    <input
                      type="checkbox"
                      checked={isAgreed}
                      onChange={(e) => setIsAgreed(e.target.checked)}
                    />
                    <span className="text-sm text-primary">
                      I agree to the{" "}
                      <Link href="#" className="font-semibold underline">
                        Terms & Conditions
                      </Link>
                    </span>
                  </div>

                  {/* Button (same style) */}
                  <button
                    type="submit"
                    disabled={
                      !isAgreed ||
                      !formData.name ||
                      !formData.email ||
                       (userRole.toLowerCase() === "practitioner" && !formData.phone) ||
                      !formData.password ||
                      !formData.confirmPassword||
                      !userRole
                    }
                    className={ `flex justify-center w-full py-[12px] duration-400 rounded-full bg-[linear-gradient(90deg,var(--color-AquaBlue)_0%,var(--color-primary)_100%)] text-white font-bold text-lg leading-[24px]  transition ${(!isAgreed || !formData.name || !formData.email || (userRole.toLowerCase() === "practitioner" && !formData.phone) || !formData.password || !formData.confirmPassword || !userRole) ? "opacity-50 cursor-not-allowed": "cursor-pointer hover:opacity-90 "}`}
                  >
                    {loading ? <LoadingSpin height={16} width={3} /> : "Sign up"}
                  </button>
                  
                             
                </div>
              </form>

              <p className="text-center text-sm text-primary mt-[30px]">
                Already have an account?{" "}
                <Link href="/login" className="text-[#1F625F] font-bold hover:underline">
                  Log In
                </Link>
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}