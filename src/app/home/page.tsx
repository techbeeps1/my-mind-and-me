'use client'
import { url } from "inspector";
import Image from "next/image";
import Link from "next/link";
import { PiTriangleThin } from "react-icons/pi";
import { GoPlus } from "react-icons/go";
import SidebarMenu from "../components/Sidebar";
export default function Home() {
  const steps = [
    "Understand The Patient",
    "Evaluation",
    "Assessment Continued",
    "Diagnostic",
    "Re-Do Initial Assessment",
  ];
  return (
  <>

  <header className="absolute w-full top-[50px] z-1 ">
    <div className="container relative flex justify-center">
    <Link href="#" className="text-[20px] uppercase text-white">my mind and me</Link>   
    <SidebarMenu/>
    </div>
  </header>
  
    <main>
      {/* hero section */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Background Image */}
        <Image
          src="/banner-bg.jpg"
          alt="Mental Health Banner"
          fill
          priority
          className="object-cover"
        />
        <div>
          <Image
            src="/banner-img.png"
            alt="Mental Health Image"
            width={666}
            height={937}
            className="object-cover w-[540px] absolute left-1/2 bottom-0 -translate-x-1/2"
          />
        </div>
        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-8 text-white text-xs tracking-widest flex items-center gap-2">
          <span>SCROLL TO EXPLORE</span>
          <span className="text-lg">↓</span>
        </div>

        { /* new */}
        <div className=" container relative h-screen w-full grid grid-cols-2">

          {/* Left column */}
          <div className="flex items-center justify-end text-white">
            <div className="flex items-end flex-col">
              <h1 className="text-[80px] text-end font-light leading-[105px]">
                Empower <br />
                Your Mental <br />
                Health Journey
              </h1>

              <button className="mt-8 cursor-pointer rounded-full bg-white px-6 py-3 text-sm text-primary">
                ● Start Your Journey
              </button>
            </div>
          </div>

          {/* Right column */}
          <div className="relative">
            <p className="absolute bottom-16 right-10 max-w-xs text-sm text-white/80">
              Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry.
              Lorem Ipsum Has Been The Industry&apos;s Standard Dummy.
            </p>
          </div>
        </div>
      </section>
      {/* vision */}
      <section className="flex items-center justify-center bg-white my-[150px]">
        <div className="max-w-4xl text-center">
          {/* Small Heading */}
          <p className="mb-6 text-xs font-medium tracking-[0.25em] text-primary">
            • VISION
          </p>

          {/* Main Text */}
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-light leading-relaxed text-primary">
            We empower humanity with the tools, knowledge, and wisdom to face mental
            health challenges from a position of unprecedented resilience.
          </h2>
        </div>
      </section>
      {/* our mind */}
      <section className="py-[150px] bg-cover bg-no-repeat bg-center h-[989px]" style={{ backgroundImage: "url('/our-mind.jpg')" }}>
        <div className="container flex h-full flex-col justify-between">

          {/* GRID PROCESS */}
          <div className="grid grid-cols-[auto_40px_auto_40px_auto_40px_auto_40px_auto] 
                        items-center justify-center gap-[30px] overflow-x-auto">

            {steps.map((step, index) => (

              <div key={index} className="contents">

                {/* Circle */}
                <div className="w-[227px] h-[227px] rounded-full border border-white 
                              flex items-center justify-center text-center text-lg px-[20px] text-white">
                  {step}
                </div>

                {/* Arrow */}
                {index !== steps.length - 1 && (
                  <div className="hidden md:flex items-center justify-center text-2xl text-white">
                    →
                  </div>
                )}
              </div>
            ))}

          </div>

          {/* TEXT CONTENT */}
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-light leading-snug mb-4 text-white">
              Our minds are a deep reflection of nature, yet our internal world has
              driven too far from natural order.
            </h2>

            <p className="text-sm tracking-widest opacity-80 text-white">
              • RECONNECTING WITH NATURE
            </p>
          </div>

        </div>
      </section>
      {/* future mental health */}

      <section className="bg-[linear-gradient(90deg,#9ff3f5_0%,#c8f7f8_30%,#e6fcfd_60%,#ffffff_100%)] py-[150px]">
        <div className="max-w-[1300px] w-full px-[20px] mx-auto">
          <h2 className="text-3xl md:text-[80px] leading-[85px] text-center font-light leading-snug mb-4 text-primary">
            Innovating <br /> The Future of <br /> Mental Health
          </h2>
          <div className="items-center grid md:grid-cols-2 gap-20">
            {/* LEFT */}
            <div className="grid grid-cols-4 gap-[10px]">
              <div className="col-[2/4] relative">
                <Link href="#" className="group">
                  <div className="flex justify-between duration-400 text-primary group-hover:text-white items-center absolute bottom-[10px] left-1/2 -translate-x-1/2 w-full px-12">
                    <p>OUR MIND, <br />
                      A QUANTUM WORLD</p>
                    <GoPlus />
                  </div>
                  <svg viewBox="0 0 289 251" fill="none" xmlns="http://www.w3.org/2000/svg"
                    className="technology-svg" data-v-a3fbfafe="">
                    <defs>
                      <linearGradient id="hoverGradient" x1="0%" y1="0%" x2="0%" y2="150%" >
                        <stop offset="0%" stopColor="#25716E" />
                        <stop offset="100%" stopColor="#56E1E8" />
                      </linearGradient>
                    </defs>
                    <path fill="currentcolor" className="fill-none
       duration-500 
         group-hover:fill-[url(#hoverGradient)]   stroke-primary stroke-[1]"
                      d="M150.995 4.24999L286.528 239C289.415 244 285.806 250.25 280.033 250.25H8.96703C3.19353 250.25 -0.414931 244 2.47182 239L138.005 4.25001C140.892 -0.749992 148.108 -0.750008 150.995 4.24999Z"></path></svg>
                </Link>
              </div>
              <div className="col-[1/3] relative">
                <Link href="#" className="group">
                  <div className="flex justify-between duration-400 text-primary group-hover:text-white items-center absolute bottom-[10px] left-1/2 -translate-x-1/2 w-full px-12">
                    <p>OUR MIND, <br />
                      A QUANTUM WORLD</p>
                    <GoPlus />
                  </div>
                  <svg viewBox="0 0 289 251" fill="none" xmlns="http://www.w3.org/2000/svg"
                    className="technology-svg" data-v-a3fbfafe="">
                    <defs>
                      <linearGradient id="hoverGradient" x1="0%" y1="0%" x2="0%" y2="150%" >
                        <stop offset="0%" stopColor="#25716E" />
                        <stop offset="100%" stopColor="#56E1E8" />
                      </linearGradient>
                    </defs>
                    <path fill="currentcolor" className="fill-none
       duration-500 
         group-hover:fill-[url(#hoverGradient)]   stroke-primary stroke-[1]"
                      d="M150.995 4.24999L286.528 239C289.415 244 285.806 250.25 280.033 250.25H8.96703C3.19353 250.25 -0.414931 244 2.47182 239L138.005 4.25001C140.892 -0.749992 148.108 -0.750008 150.995 4.24999Z"></path></svg>
                </Link>
              </div>
              <div className="col-[3/5] relative">
                <Link href="#" className="group">
                  <div className="flex justify-between duration-400 text-primary group-hover:text-white items-center absolute bottom-[10px] left-1/2 -translate-x-1/2 w-full px-12">
                    <p>OUR MIND, <br />
                      A QUANTUM WORLD</p>
                    <GoPlus />
                  </div>
                  <svg viewBox="0 0 289 251" fill="none" xmlns="http://www.w3.org/2000/svg"
                    className="technology-svg" data-v-a3fbfafe="">
                    <defs>
                      <linearGradient id="hoverGradient" x1="0%" y1="0%" x2="0%" y2="150%" >
                        <stop offset="0%" stopColor="#25716E" />
                        <stop offset="100%" stopColor="#56E1E8" />
                      </linearGradient>
                    </defs>
                    <path fill="currentcolor" className="fill-none
       duration-500 
         group-hover:fill-[url(#hoverGradient)]   stroke-primary stroke-[1]"
                      d="M150.995 4.24999L286.528 239C289.415 244 285.806 250.25 280.033 250.25H8.96703C3.19353 250.25 -0.414931 244 2.47182 239L138.005 4.25001C140.892 -0.749992 148.108 -0.750008 150.995 4.24999Z"></path></svg>
                </Link>
              </div>
            </div>
            {/* RIGHT */}
            <div className="max-w-[500px]">
              <p className="text-xs tracking-widest text-primary mb-4">
                • FRONTIER TECHNOLOGIES
              </p>
              <p className="text-2xl leading-[36px] text-primary leading-relaxed">
                Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting
                Industry. Lorem Ipsum Has Been The Industry's Standard Dummy Text
                Ever Since The 1500s.
              </p>
            </div>
          </div>

        </div>
      </section>
      {/* guiding */}
      <section className="w-full bg-[linear-gradient(62deg,var(--color-primary)_40%,var(--color-MintGreen)_100%)] py-[150px]">
        <div className="max-w-[900px] px-[20px] mx-auto text-center mb-[60px] ">
          <h2 className="text-3xl md:text-[80px] leading-[85px] font-light leading-snug mb-4 text-white">
            Guiding <br />Principles
          </h2>
          <p className="text-2xl text-white leading-[36px]">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's</p>
        </div>
        <div className="max-w-[1300px] w-full px-[20px] mx-auto flex justify-center items-center gap-[105px]">

          {/* LEFT BIG NUMBER */}
          <div className="flex justify-center lg:justify-start">
            <Image
              src="/guiding-img.png"
              alt="guiding number image"
              height={618}
              width={418}
              priority
              className="object-cover"
            />
          </div>

          {/* CENTER DIVIDER */}
          <div className="relative hidden lg:flex justify-center">
            <Image
              src="/dvider.png"
              alt="dvider"
              height={747}
              width={96}
              priority
              className="object-cover"
            />
          </div>

          {/* RIGHT CONTENT */}
          <div className="space-y-12 max-w-[500px]">
            <div className="space-y-3">
              <p className="text-lg tracking-widest text-white">
                • SYNERGY WITH NATURE
              </p>
              <p className="text-2xl leading-relaxed text-white">
                Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry.
                Lorem Ipsum Has Been The Industry's Standard Dummy Text Ever Since The 1500s,
                When An Unknown Printer Took A Galley Of Type And Scrambled It To Make A Type
                Specimen Book.
              </p>
            </div>

            <div className="space-y-3">
              <p className="text-lg tracking-widest text-white">
                • MENTAL WORLD MODELS
              </p>
              <p className="text-2xl leading-relaxed text-white">
                Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry.
                Lorem Ipsum Has Been The Industry's Standard Dummy Text Ever Since The 1500s,
                When An Unknown Printer Took A Galley Of Type And Scrambled It To Make A Type
                Specimen Book.
              </p>
            </div>
          </div>

        </div>
      </section>
      {/* personal Perspectives */}
      <section
        className="w-full bg-[linear-gradient(0deg,var(--color-AquaBlueLight)_0%,var(--color-background)_100%)] py-[150px]"
      >
        <div className="max-w-[1300px] w-full px-[20px] mx-auto">
          <div className="max-w-[900px] px-[20px] mx-auto text-center mb-[100px] ">
            <h2 className="text-3xl md:text-[80px] leading-[85px] font-light leading-snug mb-4 text-primary">
              Personal <br />Perspectives
            </h2>
            <p className="text-2xl text-primary leading-[36px]">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's</p>
          </div>
          <div className="flex justify-between">
            {/* LEFT CONTENT */}
            <div className="text-teal-800 space-y-8 max-w-[500px] flex flex-col justify-end   ">
              <p className="text-2xl leading-[36px] text-primary">
                We Closely Partner With Nature And Deeply Advocate For A Relationship
                That Embodies Not Only Complete Synergies Within Our Innovation,
                But Also To Our Approach To Minimizing The Use Of Compute Resources
                To Only As Fundamentally Required.
              </p>

              <p className="text-lg tracking-[3px] uppercase text-primary">
                • John, 35 Software Engineer
              </p>
            </div>
            <div className="max-w-[500px]">
              {/* RIGHT – TOP BLURRED BLOCK */}
              <div className="text-primary text-2xl mb-[120px] blur-sm">
                <p>
                  We Closely Partner With Nature And Deeply Advocate For A Relationship
                  That Embodies Not Only Complete Synergies Within Our Innovation.
                </p>
              </div>

              {/* RIGHT – BOTTOM BLURRED BLOCK */}
              <div className="text-primary text-2xl blur-xs">
                <p>
                  Our Innovation But Also To Our Approach To Minimizing The Use Of
                  Compute Resources To Only As Fundamentally Required.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer className="w-full bg-[linear-gradient(62deg,var(--color-primary)_20%,var(--color-MintGreen)_100%)] pt-[90px] pb-[50px]">
        <div className="max-w-[1110px] w-full px-[20px] mx-auto flex justify-between items-center">
          {/* Left content */}
          <div className="w-[765px] max-w-full flex gap-[125px]">
            <div className="flex flex-col justify-center">
              <h1 className="text-[80px] text-end text-white font-light leading-[105px]">
                Empower <br />
                Your Mental <br />
                Health Journey
              </h1>
              <div className="flex justify-end gap-[30px] mt-[50px]">
                <button className=" cursor-pointer text-white rounded-full bg-[linear-gradient(90deg,var(--color-primary)_0%,var(--color-MintGreen)_100%)] px-6 py-3 text-sm text-primary">
                  ● Join Us
                </button>
                <button className=" cursor-pointer rounded-full bg-white px-6 py-3 text-sm text-primary">
                  ● Start Your Journey
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
          <div className="space-y-12 w-[200px] max-w-full">
            <div className="space-y-3">
              <Image
                src="Nadia_Logo 1.svg"
                alt="Nadia Logo "
                height={205}
                width={180}
                priority
                className="object-cover"
              />
              <ul className="p-0 text-lg leading-[47px] mt-[30px] text-white">
                <li>
                  <Link href="#">Twitter</Link>
                </li>
                <li>
                  <Link href="#">Linkedin</Link>
                </li>
                <li>
                  <Link href="#">Email</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-[66px] text-lg text-white text-center">
          <p>2026 © mymindandme All Rights Reserved.</p>
        </div>
      </footer>
    </main>

    </>
  );
}
