import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { ProfileProvider } from "@/services/ProfileContext";

export const metadata: Metadata = {
  title: "MY MIND AND ME",
  description:
    "We empower humanity with the tools, knowledge, and wisdom to face mental health challenges from a position of unprecedented resilience.",
};
const nunito = Nunito_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  variable: "--font-nunito",
});
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={nunito.variable}>
      <body className={` antialiased`}>
        {" "}
        <ProfileProvider>
          {children}
          <Toaster position="top-right" />
        </ProfileProvider>
      </body>
    </html>
  );
}
