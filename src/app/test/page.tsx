// "use client";

// import { useEffect, useRef } from "react";
// import gsap from "gsap";
// import SplitType from "split-type";

// export default function Page() {
//   const textRef = useRef();

//   useEffect(() => {
//     const split = new SplitType(textRef.current, {
//       types: "chars, words",
//     });

//     gsap.from(split.chars, {
//       y: 10,
//       opacity: 0,
//       stagger: 0.05,
//     });
//   }, []);

//   return <h1 ref={textRef}>Hello Animation 🚀</h1>;
// }

// "use client";
// import { useEffect, useRef } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// export default function Section() {
//   const ref = useRef();

//   useEffect(() => {
//     gsap.registerPlugin(ScrollTrigger);

//     gsap.from(ref.current, {
//       y: 100,
//       opacity: 0,
//       duration: 1,
//       scrollTrigger: {
//         trigger: ref.current,
//         start: "top 80%",
//       },
//     });
//   }, []);
  

//   return <div ref={ref}>Fade Up Content</div>;
// }


// "use client";

// import { useEffect, useRef } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// export default function Home() {
//   const heroRef = useRef();
//   const cardsRef = useRef([]);
//   const imgRef = useRef();
//   const parallaxRef = useRef();
//   const horizontalRef = useRef();
//   const pinRef = useRef();

//   useEffect(() => {
//     gsap.registerPlugin(ScrollTrigger);

//     const ctx = gsap.context(() => {
//       // 🔥 1. Hero Text Reveal
//       gsap.from(".hero-text", {
//         y: 100,
//         opacity: 0,
//         duration: 1,
//         stagger: 0.2,
//       });

//       // 🔥 2. Fade Up Section
//       gsap.from(heroRef.current, {
//         y: 100,
//         opacity: 0,
//         scrollTrigger: {
//           trigger: heroRef.current,
//           start: "top 80%",
//         },
//       });

//       // 🔥 3. Stagger Cards
//       gsap.from(cardsRef.current, {
//         y: 80,
//         opacity: 0,
//         stagger: 0.2,
//         scrollTrigger: {
//           trigger: cardsRef.current[0],
//           start: "top 80%",
//         },
//       });

//       // 🔥 4. Image Zoom
//       gsap.fromTo(
//         imgRef.current,
//         { scale: 1.5 },
//         {
//           scale: 1,
//           scrollTrigger: {
//             trigger: imgRef.current,
//             scrub: true,
//           },
//         }
//       );

//       // 🔥 5. Parallax
//       gsap.to(parallaxRef.current, {
//         y: -150,
//         scrollTrigger: {
//           trigger: parallaxRef.current,
//           scrub: true,
//         },
//       });

//       // 🔥 6. Horizontal Scroll
//       gsap.to(horizontalRef.current, {
//         x: "-300%",
//         ease: "none",
//         scrollTrigger: {
//           trigger: horizontalRef.current,
//           pin: true,
//           scrub: 1,
//           end: "+=2000",
//         },
//       });

//       // 🔥 7. Pin Section Animation
//       gsap.to(pinRef.current, {
//         rotation: 360,
//         scrollTrigger: {
//           trigger: pinRef.current,
//           start: "top center",
//           end: "+=500",
//           scrub: true,
//           pin: true,
//         },
//       });
//     });

//     return () => ctx.revert();
//   }, []);

//   return (
//     <main style={{ fontFamily: "sans-serif" }}>
//       {/* HERO */}
//       <section style={{ height: "100vh", padding: "100px" }}>
//         <h1 className="hero-text" style={{ fontSize: "3rem" }}>
//           GSAP Scroll Animations 🚀
//         </h1>
//         <p className="hero-text">Next.js Full Demo</p>
//       </section>

//       {/* FADE SECTION */}
//       <section ref={heroRef} style={{ height: "100vh", padding: "100px" }}>
//         <h2>Fade Up Section</h2>
//       </section>

//       {/* CARDS */}
//       <section style={{ height: "100vh", padding: "100px" }}>
//         <h2>Stagger Cards</h2>
//         <div style={{ display: "flex", gap: "20px" }}>
//           {[1, 2, 3].map((_, i) => (
//             <div
//               key={i}
//               ref={(el) => (cardsRef.current[i] = el)}
//               style={{
//                 width: "150px",
//                 height: "150px",
//                 background: "tomato",
//               }}
//             />
//           ))}
//         </div>
//       </section>

//       {/* IMAGE ZOOM */}
//       <section style={{ height: "100vh", padding: "100px" }}>
//         <h2>Image Zoom</h2>
//         <img
//           ref={imgRef}
//           src="https://picsum.photos/500/300"
//           style={{ width: "500px" }}
//         />
//       </section>

//       {/* PARALLAX */}
//       <section style={{ height: "100vh", overflow: "hidden" }}>
//         <div
//           ref={parallaxRef}
//           style={{
//             height: "150%",
//             background: "lightblue",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//           }}
//         >
//           <h2>Parallax Effect</h2>
//         </div>
//       </section>

//       {/* HORIZONTAL SCROLL */}
//       <section style={{ height: "100vh", overflow: "hidden" }}>
//         <div
//           ref={horizontalRef}
//           style={{
//             display: "flex",
//             width: "400%",
//           }}
//         >
//           {["One", "Two", "Three", "Four"].map((text, i) => (
//             <div
//               key={i}
//               style={{
//                 width: "100vw",
//                 height: "100vh",
//                 background: i % 2 ? "#333" : "#999",
//                 color: "#fff",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 fontSize: "2rem",
//               }}
//             >
//               {text}
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* PIN */}
//       <section style={{ height: "200vh", padding: "100px" }}>
//         <h2>Pin Animation</h2>
//         <div
//           ref={pinRef}
//           style={{
//             width: "150px",
//             height: "150px",
//             background: "purple",
//             margin: "100px auto",
//           }}
//         />
//       </section>
//     </main>
//   );
// }


// "use client";

// import { useEffect, useRef } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// export default function Page() {
//   const textRef = useRef<HTMLHeadingElement | null>(null);
//   const cardsRef = useRef<HTMLDivElement[]>([]);
//   const imgRef = useRef<HTMLImageElement | null>(null);
//   const parallaxRef = useRef<HTMLDivElement | null>(null);
//   const progressRef = useRef<HTMLDivElement | null>(null);
//   const btnRef = useRef<HTMLButtonElement | null>(null);
//   const card3DRef = useRef<HTMLDivElement | null>(null);

//   useEffect(() => {
//     gsap.registerPlugin(ScrollTrigger);

//     const ctx = gsap.context(() => {
//       if (!textRef.current) return;

//       // 🔥 TEXT REVEAL
//       gsap.from(textRef.current, {
//         yPercent: 100,
//         duration: 1.2,
//         ease: "power4.out",
//         scrollTrigger: {
//           trigger: textRef.current,
//           start: "top 90%",
//         },
//       });

//       // 🔥 STAGGER CARDS
//       if (cardsRef.current.length) {
//         gsap.from(cardsRef.current, {
//           y: 100,
//           opacity: 0,
//           stagger: 0.2,
//           scrollTrigger: {
//             trigger: cardsRef.current[0],
//             start: "top 85%",
//           },
//         });
//       }

//       // 🔥 IMAGE CLIP REVEAL
//       if (imgRef.current) {
//         gsap.from(imgRef.current, {
//           clipPath: "inset(100% 0% 0% 0%)",
//           duration: 1.2,
//           ease: "power4.out",
//           scrollTrigger: {
//             trigger: imgRef.current,
//           },
//         });
//       }

//       // 🔥 PARALLAX
//       if (parallaxRef.current) {
//         gsap.to(parallaxRef.current, {
//           y: -150,
//           scrollTrigger: {
//             trigger: parallaxRef.current,
//             scrub: true,
//           },
//         });
//       }

//       // 🔥 SCROLL PROGRESS
//       if (progressRef.current) {
//         gsap.to(progressRef.current, {
//           width: "100%",
//           scrollTrigger: {
//             trigger: document.documentElement,
//             start: "top top",
//             end: "bottom bottom",
//             scrub: true,
//           },
//         });
//       }
//     });

//     // 🔥 MAGNETIC BUTTON
//     const btn = btnRef.current;
//     if (btn) {
//       const move = (e: MouseEvent) => {
//         const rect = btn.getBoundingClientRect();
//         const x = e.clientX - rect.left - rect.width / 2;
//         const y = e.clientY - rect.top - rect.height / 2;

//         gsap.to(btn, {
//           x: x * 0.3,
//           y: y * 0.3,
//           duration: 0.3,
//         });
//       };

//       const leave = () => gsap.to(btn, { x: 0, y: 0 });

//       btn.addEventListener("mousemove", move);
//       btn.addEventListener("mouseleave", leave);

//       // cleanup
//       return () => {
//         ctx.revert();
//         btn.removeEventListener("mousemove", move);
//         btn.removeEventListener("mouseleave", leave);
//       };
//     }

//     // 🔥 3D CARD
//     const card = card3DRef.current;
//     if (card) {
//       const move3D = (e: MouseEvent) => {
//         const rect = card.getBoundingClientRect();
//         const x = (e.clientX - rect.left) / rect.width - 0.5;
//         const y = (e.clientY - rect.top) / rect.height - 0.5;

//         gsap.to(card, {
//           rotateY: x * 20,
//           rotateX: -y * 20,
//           transformPerspective: 600,
//           duration: 0.3,
//         });
//       };

//       const reset = () => {
//         gsap.to(card, { rotateX: 0, rotateY: 0 });
//       };

//       card.addEventListener("mousemove", move3D);
//       card.addEventListener("mouseleave", reset);

//       return () => {
//         ctx.revert();
//         card.removeEventListener("mousemove", move3D);
//         card.removeEventListener("mouseleave", reset);
//       };
//     }

//     return () => ctx.revert();
//   }, []);

//   return (
//     <main style={{ fontFamily: "sans-serif" }}>

//       <div
//         ref={progressRef}
//         style={{
//           position: "fixed",
//           top: 0,
//           left: 0,
//           height: "4px",
//           width: "0%",
//           background: "black",
//           zIndex: 999,
//         }}
//       />

//       <section style={{ height: "100vh", padding: "100px" }}>
//         <div style={{ overflow: "hidden" }}>
//           <h1 ref={textRef} style={{ fontSize: "3rem" }}>
//             Modern GSAP Animations 🚀
//           </h1>
//         </div>

//         <button
//           ref={btnRef}
//           style={{
//             marginTop: "40px",
//             padding: "15px 30px",
//             background: "black",
//             color: "white",
//             border: "none",
//             cursor: "pointer",
//           }}
//         >
//           Magnetic Button
//         </button>
//       </section>

//       <section style={{ height: "100vh", padding: "100px" }}>
//         <h2>Stagger Cards</h2>
//         <div style={{ display: "flex", gap: "20px" }}>
//           {[1, 2, 3].map((_, i) => (
//             <div
//               key={i}
//               ref={(el) => {
//                 if (el) cardsRef.current[i] = el;
//               }}
//               style={{
//                 width: "150px",
//                 height: "150px",
//                 background: "tomato",
//               }}
//             />
//           ))}
//         </div>
//       </section>

//       <section style={{ height: "100vh", padding: "100px" }}>
//         <h2>Image Reveal</h2>
//         <img
//           ref={imgRef}
//           src="https://picsum.photos/600/400"
//           alt="Random"
//           style={{ width: "600px" }}
//         />
//       </section>

//       <section style={{ height: "100vh", overflow: "hidden" }}>
//         <div
//           ref={parallaxRef}
//           style={{
//             height: "150%",
//             background: "lightblue",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//           }}
//         >
//           <h2>Parallax Section</h2>
//         </div>
//       </section>

//       <section style={{ height: "100vh", padding: "100px" }}>
//         <h2>3D Card</h2>
//         <div
//           ref={card3DRef}
//           style={{
//             width: "550px",
//             height: "550px",
//             background: "purple",
//             margin: "auto",
//           }}
//         />
//       </section>
//     </main>
//   );
// }

"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Page() {
  const containerRef = useRef();
  const textRef = useRef();
  const parallax1 = useRef();
  const parallax2 = useRef();
  const pinSection = useRef();
  const floatRef = useRef();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 🔥 1. CHARACTER SPLIT (manual)
      const text = textRef.current.innerText;
      textRef.current.innerHTML = text
        .split("")
        .map((c) => `<span class="char">${c}</span>`)
        .join("");

      const chars = textRef.current.querySelectorAll(".char");

      gsap.from(chars, {
        y: 120,
        opacity: 0,
        stagger: 0.03,
        duration: 1,
        ease: "power4.out",
      });

      // 🔥 2. MULTI LAYER PARALLAX
      gsap.to(parallax1.current, {
        y: -100,
        scrollTrigger: {
          trigger: parallax1.current,
          scrub: true,
        },
      });

      gsap.to(parallax2.current, {
        y: -200,
        scrollTrigger: {
          trigger: parallax2.current,
          scrub: true,
        },
      });

      // 🔥 3. SCROLL STORY TIMELINE
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinSection.current,
          start: "top top",
          end: "+=2000",
          scrub: true,
          pin: true,
        },
      });

      tl.to(".box1", { x: 500, rotation: 90,y:10 })
        .to(".box2", { y: 200, scale: 1.5 })
        .to(".box3", { opacity: 1, y: -100 });

      // 🔥 4. FLOATING OBJECT (physics feel)
      gsap.to(floatRef.current, {
        y: -20,
        repeat: -1,
        yoyo: true,
        duration: 2,
        ease: "sine.inOut",
      });

      // 🔥 5. 3D DEPTH SCROLL
      gsap.from(".depth", {
        z: -300,
        opacity: 0,
        stagger: 0.2,
        scrollTrigger: {
          trigger: ".depth",
          start: "top 80%",
        },
      });

      // 🔥 6. SCROLL VELOCITY EFFECT
      ScrollTrigger.create({
        trigger: containerRef.current,
        onUpdate: (self) => {
          const velocity = self.getVelocity();

          gsap.to(".velocity-box", {
            skewY: velocity * 0.01,
            duration: 0.3,
          });
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <main ref={containerRef} style={{ fontFamily: "sans-serif" }}>
      {/* HERO */}
      <section style={{ height: "100vh", padding: "100px" }}>
        <h1 ref={textRef} style={{ fontSize: "3rem" }}>
          Ultra Advanced GSAP 🚀
        </h1>
      </section>

      {/* PARALLAX */}
      <section style={{ height: "100vh", position: "relative" }}>
        <div
          ref={parallax1}
          style={{
            position: "absolute",
            top: "20%",
            left: "10%",
            fontSize: "2rem",
          }}
        >
          Layer 1
        </div>

        <div
          ref={parallax2}
          style={{
            position: "absolute",
            top: "40%",
            left: "50%",
            fontSize: "2rem",
          }}
        >
          Layer 2
        </div>
      </section>

      {/* PIN STORY */}
      <section ref={pinSection} style={{ height: "100vh" }}>
        <div className="box1" style={boxStyle("red")} />
        <div className="box2" style={boxStyle("blue")} />
        <div className="box3" style={boxStyle("green", 0)} />
      </section>

      {/* FLOAT */}
      <section style={{ height: "100vh", padding: "100px" }}>
        <div
          ref={floatRef}
          style={{
            width: "100px",
            height: "100px",
            background: "orange",
          }}
        />
      </section>

      {/* DEPTH */}
      <section
        style={{
          height: "100vh",
          display: "flex",
          gap: "20px",
          perspective: "1000px",
        }}
      >
        {[1, 2, 3].map((_, i) => (
          <div
            key={i}
            className="depth"
            style={{
              width: "150px",
              height: "150px",
              background: "purple",
            }}
          />
        ))}
      </section>

      {/* VELOCITY */}
      <section style={{ height: "100vh", padding: "100px" }}>
        <div
          className="velocity-box"
          style={{
            width: "200px",
            height: "200px",
            background: "black",
          }}
        />
      </section>
    </main>
  );
}

const boxStyle = (color, opacity = 1) => ({
  width: "100px",
  height: "100px",
  background: color,
  margin: "20px",
  opacity,
});


