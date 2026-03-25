"use client";
import Image from "next/image";
import Link from "next/link";
import { GoPlus } from "react-icons/go";
import { GoDotFill } from "react-icons/go";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import SplitType from "split-type";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
export default function Home() {
  const steps = [
    "Understand The Patient",
    "Evaluation",
    "Assessment Continued",
    "Diagnostic",
    "Re-Do Initial Assessment",
  ];
// HTMLDivElement type specify kiya hai
  const trackRef = useRef<HTMLDivElement | null>(null);

  // Duplicate steps for infinite seamless scroll
  const loopSteps = [...steps, ...steps];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return; // null check

    let x = 0;
    const speed = 1; // adjust here

    const animate = () => {
      x -= speed;

      // Track width of first half
      const firstHalfWidth = track.scrollWidth / 2;

      if (-x >= firstHalfWidth) {
        // seamless reset without jhatka
        x += firstHalfWidth;
      }

      // apply transform
      track.style.transform = `translateX(${x}px)`;
      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  const pinSection = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: pinSection.current!,
        start: "center center",
        end: "+=500",
        scrub: true,
        pin: true,
      },
    });

    tl.to(".box1", { y: 0, rotation: 0, opacity: 1, x: 0 });
  }, []);

  const textRef = useRef<HTMLHeadingElement | null>(null);
  const textRef1 = useRef<HTMLHeadingElement | null>(null);
  const textRef2 = useRef<HTMLHeadingElement | null>(null);
  const textRef3 = useRef<HTMLHeadingElement | null>(null);
  const textRef4 = useRef<HTMLHeadingElement | null>(null);
  const textRef5 = useRef<HTMLHeadingElement | null>(null);
  const textRef6 = useRef<HTMLHeadingElement | null>(null);
  const textRef7 = useRef<HTMLHeadingElement | null>(null);
  const textRef8 = useRef<HTMLHeadingElement | null>(null);
  const textRef9 = useRef<HTMLHeadingElement | null>(null);
  const textRef10 = useRef<HTMLHeadingElement | null>(null);
  const textRef11 = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    if (
      !textRef.current ||
      !textRef1.current ||
      !textRef2.current ||
      !textRef3.current ||
      !textRef4.current ||
      !textRef5.current ||
      !textRef6.current ||
      !textRef7.current ||
      !textRef8.current ||
      !textRef9.current ||
      !textRef10.current ||
      !textRef11.current
    )
      return;
    const split = new SplitType(textRef.current, {
      types: "chars,words",
    });
    const split1 = new SplitType(textRef1.current, {
      types: "chars,words",
    });
    const split2 = new SplitType(textRef2.current, {
      types: "chars,words",
    });
    const split3 = new SplitType(textRef3.current, {
      types: "chars,words",
    });
    const split4 = new SplitType(textRef4.current, {
      types: "chars,words",
    });
    const split5 = new SplitType(textRef5.current, {
      types: "chars,words",
    });
    const split6 = new SplitType(textRef6.current, {
      types: "chars,words",
    });
    const split7 = new SplitType(textRef7.current, {
      types: "chars,words",
    });
    const split8 = new SplitType(textRef8.current, {
      types: "chars,words",
    });
    const split9 = new SplitType(textRef9.current, {
      types: "chars,words",
    });
    const split10 = new SplitType(textRef10.current, {
      types: "chars,words",
    });
    const split11 = new SplitType(textRef11.current, {
      types: "chars,words",
    });

    gsap.from(split.chars, {
      y: 10,
      opacity: 0,
      stagger: 0.05,
    });
    gsap.from(split1.chars, {
      y: 10,
      opacity: 0.1,
      stagger: 0.01,
    });
    gsap.from(split2.chars, {
      y: 10,
      opacity: 0,
      stagger: 0.01,
      duration: 0.6,
      ease: "power2.out",
      scrollTrigger: {
        trigger: textRef2.current,
        start: "top 80%", // when element enters viewport
        toggleActions: "play none none none", // play only once
      },
    });
    gsap.from(split3.chars, {
      y: 10,
      opacity: 0.1,
      stagger: 0.01,
      duration: 0.6,
      ease: "power2.out",
      scrollTrigger: {
        trigger: textRef3.current,
        start: "top 80%", // when element enters viewport
        toggleActions: "play none none none", // play only once
      },
    });

    gsap.from(split4.chars, {
      y: 10,
      opacity: 0.1,
      stagger: 0.01,
      duration: 0.6,
      ease: "power2.out",
      scrollTrigger: {
        trigger: textRef4.current,
        start: "top 80%", // when element enters viewport
        toggleActions: "play none none none", // play only once
      },
    });

    gsap.from(split5.chars, {
      y: 10,
      opacity: 0,
      stagger: 0.05,
      duration: 0.6,
      ease: "power2.out",
      scrollTrigger: {
        trigger: textRef5.current,
        start: "top 80%", // when element enters viewport
        toggleActions: "play none none none", // play only once
      },
    });
    gsap.from(split6.chars, {
      y: 10,
      opacity: 0,
      stagger: 0.05,
      duration: 0.6,
      ease: "power2.out",
      scrollTrigger: {
        trigger: textRef6.current,
        start: "top 80%", // when element enters viewport
        toggleActions: "play none none none", // play only once
      },
    });

    gsap.from(split7.chars, {
      y: 10,
      opacity: 0,
      stagger: 0.01,
      duration: 0.6,
      ease: "power2.out",
      scrollTrigger: {
        trigger: textRef7.current,
        start: "top 80%", // when element enters viewport
        toggleActions: "play none none none", // play only once
      },
    });
    gsap.from(split8.chars, {
      y: 10,
      opacity: 0.1,
      stagger: 0.01,
      duration: 0.6,
      ease: "power2.out",
      scrollTrigger: {
        trigger: textRef8.current,
        start: "top 80%", // when element enters viewport
        toggleActions: "play none none none", // play only once
      },
    });
    gsap.from(split9.chars, {
      y: 10,
      opacity: 0.1,
      stagger: 0.01,
      duration: 0.6,
      ease: "power2.out",
      scrollTrigger: {
        trigger: textRef9.current,
        start: "top 80%", // when element enters viewport
        toggleActions: "play none none none", // play only once
      },
    });
    gsap.from(split10.chars, {
      y: 10,
      opacity: 0,
      stagger: 0.01,
      duration: 0.6,
      ease: "power2.out",
      scrollTrigger: {
        trigger: textRef10.current,
        start: "top 80%", // when element enters viewport
        toggleActions: "play none none none", // play only once
      },
    });
    gsap.from(split11.chars, {
      y: 10,
      opacity: 0,
      stagger: 0.01,
      duration: 0.6,
      ease: "power2.out",
      scrollTrigger: {
        trigger: textRef11.current,
        start: "top 80%", // when element enters viewport
        toggleActions: "play none none none", // play only once
      },
    });
  }, []);

  return (
    <>
      <Header />
      <main>
        {/* hero section */}
        <section className="relative lg:h-screen md:h-[95vh] h-[80vh] w-full overflow-hidden">
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
              className="object-cover lg:w-135 w-125 absolute left-1/2 bottom-0 -translate-x-1/2"
            />
          </div>
          {/* Scroll Indicator */}
          <Link
            href={"#"}
            className="absolute z-1 bottom-10 left-8 text-white text-xs tracking-widest flex items-center gap-2"
          >
            <span>SCROLL TO EXPLORE</span>
            <span className="text-lg">↓</span>
          </Link>

          {/* new */}
          <div className=" container relative md:h-screen h-[80vh] w-full grid md:grid-cols-2 ">
            {/* Left column */}
            <div className="flex items-center md:justify-end justify-start text-white">
              <div className="flex items-end flex-col">
                <div className="overflow-hidden">
                  <h1
                    ref={textRef}
                    className="lg:text-[80px] md:text-[56px] text-[43px] text-end lg:leading-26.25 leading-17.5"
                  >
                    Empower <br />
                    Your Mental <br />
                    Health Journey
                  </h1>
                </div>

                <button className="lg:mt-12.5 mt-6.25 flex items-center  gap-2.5 hover:bg-primary hover:text-white duration-400  relative cursor-pointer rounded-full font-bold bg-white px-6.5 py-3 lg:text-lg         text-primary">
                  <GoDotFill className="h-3 w-3" /> Start Your Journey
                </button>
              </div>
            </div>

            {/* Right column */}
            <div className="relative md:block hidden">
              <p
                ref={textRef1}
                className="hero-text absolute bottom-16 right-10 max-w-xs text-lg text-white leading-7.5"
              >
                Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting
                Industry. Lorem Ipsum Has Been The Industry&apos;s Standard
                Dummy.
              </p>
            </div>
          </div>
        </section>
        {/* vision */}
        <section className="flex items-center justify-center bg-white md:my-37.5 my-22.5">
          <div className="max-w-225 md:px-0 px-5 text-center">
            {/* Small Heading */}
            <p className="lg:mb-12.5 md:mb-7.5 mb-5 lg:text-lg md:text-base text-sm flex items-center md:gap-2.5 gap-1.5 justify-center font-bold text-primary">
              <GoDotFill className="h-3 w-3 text-AquaBlue " /> VISION
            </p>

            {/* Main Text */}

            <h2
              ref={textRef3}
              className="lg:text-[50px] md:text-[40px] text-[25px] lg:leading-15.75 md:leading-12.5 leading-8.75  font-semibold text-primary"
            >
              We empower humanity with the tools, knowledge, and wisdom to face
              mental health challenges from a position of unprecedented
              resilience.
            </h2>
          </div>
        </section>
        {/* our mind */}
        <section
          className="md:py-37.5 py-25 bg-cover bg-no-repeat bg-center lg:h-247.25 md:h-212.5 h-200"
          style={{ backgroundImage: "url('/our-mind.jpg')" }}
        >
          <div className="container flex h-full flex-col justify-between overflow-hidden">
            {/* GRID PROCESS */}
           <div className="overflow-hidden w-full">
      <div
        ref={trackRef}
        className="flex items-center gap-7.5 whitespace-nowrap will-change-transform"
      >
        {loopSteps.map((step, index) => (
          <div key={index} className="flex items-center flex-shrink-0">
            {/* Circle */}
            <div className="w-56.75 h-56.75 rounded-full border border-white 
              flex items-center justify-center text-center font-semibold text-lg px-5 text-white">
              {step}
            </div>

            {/* Arrow */}
            {index !== loopSteps.length - 1 && (
              <div className="flex items-center justify-center text-2xl text-white mx-4">
                →
              </div>
            )}
          </div>
        ))}
      </div>
    </div>

            {/* TEXT CONTENT */}
            <div className="max-w-3xl">
              <h3
                ref={textRef4}
                className="lg:text-[46px] md:text-[35px] text-2xl lg:leading-15.75 md:leading-12 leading-7.5 font-semibold mb-7.5 text-white"
              >
                Our minds are a deep reflection of nature, yet our internal
                world has driven too far from natural order.
              </h3>

              <p className="lg:text-lg md:text-base text-sm font-bold text-white flex items-center gap-2.5 tracking-[3px]">
                <GoDotFill className="h-3 w-3" /> RECONNECTING WITH NATURE
              </p>
            </div>
          </div>
        </section>
        {/* future mental health */}

        <section className="bg-[linear-gradient(90deg,#9ff3f5_0%,#c8f7f8_30%,#e6fcfd_60%,#ffffff_100%)] md:py-37.5 py-25">
          <div className="max-w-325 w-full px-5 mx-auto">
            <h2
              ref={textRef5}
              className="lg:text-[80px] md:text-[56px] text-[43px] lg:leading-21.25 md:leading-14 leading-12 text-center font-semibold lg:mb-5.5 mb-12.5 text-primary"
            >
              Innovating <br /> The Future of <br /> Mental Health
            </h2>
            <div className="items-center grid lg:grid-cols-2  gap-20">
              {/* LEFT */}
              <div
                className="grid md:grid-cols-4 lg:order-first order-last gap-2.5"
                ref={pinSection}
              >
                <div className="md:col-[2/4] relative">
                  <div
                    className="box1 absolute bottom-0 w-full z-50 "
                    style={{
                      transform: "translate(0px, -640px) rotate(90deg)",
                      opacity: 0,
                    }}
                  >
                    <Link href="#" className="group">
                      <div className="flex justify-between md:text-base text-sm  duration-400 font-bold leading-6  text-white items-center absolute bottom-2.5 left-1/2 -translate-x-1/2 w-full px-12">
                        <p>
                          OUR MIND, <br />A QUANTUM WORLD
                        </p>
                        <GoPlus />
                      </div>
                      <svg
                        viewBox="0 0 289 251"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="technology-svg"
                        data-v-a3fbfafe=""
                      >
                        <defs>
                          <linearGradient
                            id="hoverGradient"
                            x1="0%"
                            y1="0%"
                            x2="0%"
                            y2="150%"
                          >
                            <stop offset="0%" stopColor="#25716E" />
                            <stop offset="100%" stopColor="#56E1E8" />
                          </linearGradient>
                        </defs>
                        <path
                          fill="currentcolor"
                          className="
       duration-500 
     fill-[url(#hoverGradient)]   stroke-primary stroke-1"
                          d="M150.995 4.24999L286.528 239C289.415 244 285.806 250.25 280.033 250.25H8.96703C3.19353 250.25 -0.414931 244 2.47182 239L138.005 4.25001C140.892 -0.749992 148.108 -0.750008 150.995 4.24999Z"
                        ></path>
                      </svg>
                    </Link>
                  </div>
                  <Link href="#" className="group">
                    <div className="flex justify-between md:text-base text-sm  duration-400 font-bold leading-6 text-primary group-hover:text-white items-center absolute bottom-2.5 left-1/2 -translate-x-1/2 w-full px-12">
                      <p>
                        OUR MIND, <br />A QUANTUM WORLD
                      </p>
                      <GoPlus />
                    </div>
                    <svg
                      viewBox="0 0 289 251"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="technology-svg"
                      data-v-a3fbfafe=""
                    >
                      <defs>
                        <linearGradient
                          id="hoverGradient"
                          x1="0%"
                          y1="0%"
                          x2="0%"
                          y2="150%"
                        >
                          <stop offset="0%" stopColor="#25716E" />
                          <stop offset="100%" stopColor="#56E1E8" />
                        </linearGradient>
                      </defs>
                      <path
                        fill="currentcolor"
                        className="fill-none
       duration-500 
         group-hover:fill-[url(#hoverGradient)]   stroke-primary stroke-1"
                        d="M150.995 4.24999L286.528 239C289.415 244 285.806 250.25 280.033 250.25H8.96703C3.19353 250.25 -0.414931 244 2.47182 239L138.005 4.25001C140.892 -0.749992 148.108 -0.750008 150.995 4.24999Z"
                      ></path>
                    </svg>
                  </Link>
                </div>
                <div className="md:col-[1/3] relative">
                  <Link href="#" className="group">
                    <div className="flex justify-between md:text-base text-sm font-bold leading-6 duration-400 text-primary group-hover:text-white items-center absolute bottom-2.5 left-1/2 -translate-x-1/2 w-full px-12">
                      <p>
                        OUR MIND, <br />A QUANTUM WORLD
                      </p>
                      <GoPlus />
                    </div>
                    <svg
                      viewBox="0 0 289 251"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="technology-svg"
                      data-v-a3fbfafe=""
                    >
                      <defs>
                        <linearGradient
                          id="hoverGradient"
                          x1="0%"
                          y1="0%"
                          x2="0%"
                          y2="150%"
                        >
                          <stop offset="0%" stopColor="#25716E" />
                          <stop offset="100%" stopColor="#56E1E8" />
                        </linearGradient>
                      </defs>
                      <path
                        fill="currentcolor"
                        className="fill-none
       duration-500 
         group-hover:fill-[url(#hoverGradient)]   stroke-primary stroke-1"
                        d="M150.995 4.24999L286.528 239C289.415 244 285.806 250.25 280.033 250.25H8.96703C3.19353 250.25 -0.414931 244 2.47182 239L138.005 4.25001C140.892 -0.749992 148.108 -0.750008 150.995 4.24999Z"
                      ></path>
                    </svg>
                  </Link>
                </div>
                <div className="md:col-[3/5] relative">
                  <Link href="#" className="group">
                    <div className="flex justify-between md:text-base text-sm font-bold leading-6 duration-400 text-primary group-hover:text-white items-center absolute bottom-2.5 left-1/2 -translate-x-1/2 w-full px-12">
                      <p>
                        OUR MIND, <br />A QUANTUM WORLD
                      </p>
                      <GoPlus />
                    </div>
                    <svg
                      viewBox="0 0 289 251"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="technology-svg"
                      data-v-a3fbfafe=""
                    >
                      <defs>
                        <linearGradient
                          id="hoverGradient"
                          x1="0%"
                          y1="0%"
                          x2="0%"
                          y2="150%"
                        >
                          <stop offset="0%" stopColor="#25716E" />
                          <stop offset="100%" stopColor="#56E1E8" />
                        </linearGradient>
                      </defs>
                      <path
                        fill="currentcolor"
                        className="fill-none
       duration-500 
         group-hover:fill-[url(#hoverGradient)]   stroke-primary stroke-1"
                        d="M150.995 4.24999L286.528 239C289.415 244 285.806 250.25 280.033 250.25H8.96703C3.19353 250.25 -0.414931 244 2.47182 239L138.005 4.25001C140.892 -0.749992 148.108 -0.750008 150.995 4.24999Z"
                      ></path>
                    </svg>
                  </Link>
                </div>
              </div>
              {/* RIGHT */}
              <div className="lg:max-w-125 max-w-150 lg:order-last order-first">
                <p className="lg:text-lg md:text-base text-sm font-bold mb-5 text-primary flex items-center lg:justify-start justify-center md:gap-2.5 gap-1.5 tracking-[3px]">
                  <GoDotFill className="h-3 w-3 text-MintGreen" /> FRONTIER
                  TECHNOLOGIES
                </p>

                <p
                  ref={textRef2}
                  className="lg:text-2xl lg:text-start text-center text-xl lg:leading-9 leading-7.5  font-medium text-primary"
                >
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industrys
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book.
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* guiding */}
        <section className="w-full bg-[linear-gradient(62deg,var(--color-primary)_40%,var(--color-MintGreen)_100%)] md:py-37.5 py-25">
          <div className="max-w-225 px-5 mx-auto text-center mb-15 ">
            <h2
              ref={textRef6}
              className="lg:text-[80px] md:text-[56px] text-[43px] lg:leading-21.25 md:leading-14 leading-12 font-semibold mb-3.75 text-white"
            >
              Guiding <br />
              Principles
            </h2>

            <p
              ref={textRef7}
              className="lg:text-2xl fadeInUp  text-lg font-medium text-white lg:leading-9 leading-7.5"
            >
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industrys
            </p>
          </div>
          <div className="max-w-325 w-full px-5 mx-auto md:flex justify-center items-center gap-26.25">
            {/* LEFT BIG NUMBER */}
            <div className="flex justify-center md:w-auto w-[50%] md:mb-0 mb-7.5 lg:justify-start">
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
            <div className="md:space-y-17.5 space-y-0 lg:max-w-125 max-w-87.5">
              <div className="space-y-5 pb-10 border-b border-white">
                <p className="lg:text-lg md:text-base text-sm  font-bold mb-5 text-white flex items-center md:gap-2.5 gap-1.5 tracking-[3px]">
                  <GoDotFill className="h-3 w-3 " /> SYNERGY WITH NATURE
                </p>
                <p
                  ref={textRef8}
                  className="lg:text-2xl text-lg lg:leading-9 leading-7.5 text-white font-medium"
                >
                  Lorem Ipsum Is Simply Dummy Text Of The Printing And
                  Typesetting Industry. Lorem Ipsum Has Been The Industrys
                  Standard Dummy Text Ever Since The 1500s, When An Unknown
                  Printer Took A Galley Of Type And Scrambled It To Make A Type
                  Specimen Book.
                </p>
              </div>

              <div className="space-y-5 pt-10">
                <p className="lg:text-lg md:text-base text-sm  font-bold mb-5 text-white flex items-center md:gap-2.5 gap-1.5 tracking-[3px]">
                  <GoDotFill className="h-3 w-3 " /> MENTAL WORLD MODELS
                </p>
                <p
                  ref={textRef9}
                  className="lg:text-2xl text-lg lg:leading-9 leading-7.5 text-white font-medium"
                >
                  Lorem Ipsum Is Simply Dummy Text Of The Printing And
                  Typesetting Industry. Lorem Ipsum Has Been The Industrys
                  Standard Dummy Text Ever Since The 1500s, When An Unknown
                  Printer Took A Galley Of Type And Scrambled It To Make A Type
                  Specimen Book.
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* personal Perspectives */}
        <section className="w-full bg-[linear-gradient(0deg,var(--color-AquaBlueLight)_0%,var(--color-background)_100%)] md:py-37.5 py-25">
          <div className="max-w-325 w-full px-5 mx-auto">
            <div className="max-w-225 md:px-5 px-0 mx-auto text-center md:mb-25 mb-15 ">
              <h2
                ref={textRef10}
                className="lg:text-[80px] md:text-[56px] text-[43px] lg:leading-21.25 md:leading-14 leading-12 font-semibold mb-3.75 text-primary"
              >
                Personal <br />
                Perspectives
              </h2>
              <p
                ref={textRef11}
                className="lg:text-2xl text-lg font-medium text-primary leading-9"
              >
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industrys
              </p>
            </div>
            <div className="flex justify-between">
              {/* LEFT CONTENT */}
              <div className="space-y-8 max-w-125 flex flex-col lg:justify-end justify-center   ">
                <p className="lg:text-2xl text-lg font-medium lg:leading-9 leading-7.5 text-primary">
                  We Closely Partner With Nature And Deeply Advocate For A
                  Relationship That Embodies Not Only Complete Synergies Within
                  Our Innovation, But Also To Our Approach To Minimizing The Use
                  Of Compute Resources To Only As Fundamentally Required.
                </p>
                <p className="lg:text-lg font-bold mb-5 text-primary flex items-center gap-2.5 tracking-[3px]">
                  <GoDotFill className="h-3 w-3" /> John, 35 Software Engineer
                </p>
              </div>
              <div className="max-w-125">
                {/* RIGHT – TOP BLURRED BLOCK */}
                <div className="text-primary text-xs leading-7.5 lg:mb-30 mb-20 blur-sm">
                  <p>
                    We closely partner with nature and deeply advocate for a
                    relationship that embodies not only complete synergies
                    within our innovation, but also to our approach to
                    minimizing the use of compute resources to only as
                    fundamentally required.
                  </p>
                </div>

                {/* RIGHT – BOTTOM BLURRED BLOCK */}
                <div className="text-primary leading-7.5 blur-xs">
                  <p>
                    We closely partner with nature and deeply advocate for a
                    relationship that embodies not only complete synergies
                    within our innovation, but also to our approach to
                    minimizing the use of compute resources to only as
                    fundamentally required.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    </>
  );
}
