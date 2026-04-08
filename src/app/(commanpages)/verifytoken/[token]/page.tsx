"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { use } from "react";
import { toastTBS } from "@/lib/toast";
import Image from "next/image";
type PageProps = {
  params: Promise<{
    token: string;
  }>;
};
export default function VerifyTokenPage({ params }: PageProps) {
  const [status, setStatus] = useState(true); // 
  const router = useRouter();

  // 👇 IMPORTANT: params ko unwrap karna padega
  const { token } = use(params);

  useEffect(() => {
    if (!token) return;

    const verifyEmail = async () => {

      const res = await fetch(
        `/api/auth/verify-email?token=${token}`
      );

      const data = await res.json();
      if (data.success) {
        toastTBS.success("Email verified successfully!");
        router.push("/login");
      } else {
        setStatus(false);
        toastTBS.error(data.message || "Invalid or expired token");

      }

    };

    verifyEmail();
  }, [token, router]);

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
          <div className=" bg-opacity-90 text-center">
            {status ? ( <>
              <h1 className="text-2xl font-bold mb-4 text-white">Verifying your email...</h1>
              <p className="text-gray-600 text-white">Please wait while we verify your email address.</p>
              </>
            ):(<>
              <h1 className="text-2xl font-bold mb-4 text-white">Email Verification Failed</h1>
              <p className="text-gray-600 text-white">The verification link is invalid or has expired.</p>
              </>
            )}
            
          </div>

        </div>
      </section>
    </main>

  );
}