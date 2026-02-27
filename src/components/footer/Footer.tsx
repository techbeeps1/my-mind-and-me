"use client";
import Link from "next/link";
import { GoDotFill } from "react-icons/go";
import Image from "next/image";

export default function Footer() {
  return (
    <>
      <footer className="w-full bg-[linear-gradient(62deg,var(--color-primary)_20%,var(--color-MintGreen)_100%)] pt-22.5 pb-12.5">
        <div className="lg:max-w-277.5 max-w-200 w-full px-5 mx-auto flex md:flex-row flex-col mad:gap-0 gap-8 justify-between md:items-center items-star">
          {/* Left content */}
          <div className="w-191.25 max-w-full md:flex gap-31.25 md:order-first order-last">
            <div className="flex flex-col justify-center">
              <h2 className="lg:text-[80px] md:text-[60px] text-[45px] md:text-end text-start text-white lg:leading-26.25 md:leading:[70px] leading-15">
                Empower <br />
                Your Mental <br />
                Health Journey
              </h2>
              <div className="flex justify-end md:gap-7.5 gap-5 md:mt-12.5 mt-7.5">
                <button className=" cursor-pointer flex items-center md:gap-2.5 gap-1.5 text-white rounded-full bg-[linear-gradient(90deg,var(--color-primary)_0%,var(--color-MintGreen)_100%)] px-6.5 py-3 lg:text-lg md:text-base text-sm font-bold">
                 <GoDotFill className="h-3 w-3"/> Join Us
                </button>
                <button className=" cursor-pointer hover:bg-primary hover:text-white duration-500 lg:text-lg md:text-base text-sm flex items-center md:gap-2.5 gap-1.5 font-bold rounded-full bg-white px-6.5 py-3  text-primary">
                  <GoDotFill className="h-3 w-3"/> Start Your Journey
                </button>
              </div>
            </div>
            {/* CENTER DIVIDER */}
            <div className="relative hidden lg:flex justify-center">
              <Image
                src="/dvider-2.png"
                alt="dvider-2"
                height={747}
                width={96}
                priority
                className="object-cover"
              />
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="space-y-12 w-50 max-w-full md:order-last order-first">
            <div className="space-y-3">
              <Image
                src="Nadia_Logo 1.svg"
                alt="Nadia Logo "
                height={205}
                width={180}
                priority
                className="object-cover"
              />
              <ul className="p-0 lg:text-lg md:text-base text-sm md:leading-11.75 leading-10 font-bold mt-7.5 text-white">
                <li>
                  <Link href="#" className="hover:text-primary duration-500">Twitter</Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary duration-500">Linkedin</Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary duration-500">Email</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-16.5 lg:text-lg md:text-base text-sm text-white text-center">
          <p>2026 © mymindandme All Rights Reserved.</p>
        </div>
      </footer>
    </>
  );
}
