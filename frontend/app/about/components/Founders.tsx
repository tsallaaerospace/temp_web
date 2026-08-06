"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Twitter, Facebook, Instagram, Linkedin, Youtube, Globe } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// Hero background image - local image
const HERO_BG_IMAGE = "/images/company/hero-founder.jpg";

export default function HeroSection() {
  // Position configuration for manual adjustment
  // These will be used with CSS variables to handle larger screens
  const LEFT_PARAGRAPH_X_OFFSET = "0px";
  const LEFT_PARAGRAPH_X_OFFSET_XL = "-100px";

  const RIGHT_PARAGRAPH_X_OFFSET = "0px";
  const RIGHT_PARAGRAPH_X_OFFSET_XL = "150px";

  const LEFT_PARAGRAPH_TOP_OFFSET = "-120px";
  const RIGHT_PARAGRAPH_TOP_OFFSET = "140px";

  const containerRef = useRef<HTMLDivElement>(null);
  const vinayakRef = useRef<HTMLDivElement>(null);
  const tsallaRef = useRef<HTMLDivElement>(null);
  const titleContainerRef = useRef<HTMLDivElement>(null);
  const titleContainerFrontRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const foregroundRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  // New refs for the front layer
  const vinayakFrontRef = useRef<HTMLDivElement>(null);
  const tsallaFrontRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Create a master timeline for the scroll animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=300%",
          pin: true,
          scrub: 1.2, // Balanced value for responsiveness and smoothness
          invalidateOnRefresh: true,
          anticipatePin: 1, // Reduces 'jumping' during pinning
        },
      });

      // 1. Initial State & Split Animation - use force3D: true for GPU acceleration
      tl.to([vinayakRef.current, vinayakFrontRef.current], {
        y: "-100vh",
        force3D: true,
        ease: "power2.in",
      }, 0);

      tl.to([tsallaRef.current, tsallaFrontRef.current], {
        y: "100vh",
        force3D: true,
        ease: "power2.in",
      }, 0);

      tl.to([titleContainerRef.current, titleContainerFrontRef.current], {
        opacity: 0,
        ease: "none",
      }, 0.4);

      // 2. Background zoom & Darken
      tl.to(bgRef.current, {
        scale: 1.15,
        ease: "none",
      }, 0);

      tl.to(foregroundRef.current, {
        scale: 1.15,
        ease: "none",
      }, 0);

      tl.to(foregroundRef.current, {
        opacity: 0,
        ease: "power1.inOut",
      }, 0.05);

      tl.to(overlayRef.current, {
        opacity: 0.9,
        ease: "none",
      }, 0.3);

      // 3. Content Reveal - Delayed until titles are nearly gone
      tl.fromTo(contentRef.current,
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, ease: "power2.out", pointerEvents: "auto" },
        0.35
      );

      // 4. Scroll Indicator Fade Out
      tl.to(scrollIndicatorRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.1
      }, 0);

    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-black"
    >
      {/* Background Image (behind everything) */}
      <div
        ref={bgRef}
        className="absolute inset-0 z-0 will-change-transform"
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${HERO_BG_IMAGE})`,
            backgroundPosition: "center 30%",
          }}
        />
      </div>

      {/* Subtle dark overlay behind text for readability */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background: `linear-gradient(
            to top,
            rgba(0, 0, 0, 0.7) 0%,
            rgba(0, 0, 0, 0.2) 40%,
            rgba(0, 0, 0, 0.1) 100%
          )`,
        }}
      />

      {/* Split Title - VINAYAK & TSALLA (centered, behind person) */}
      <div
        ref={titleContainerRef}
        className="absolute inset-0 z-[5] pointer-events-none flex flex-col items-center justify-center will-change-opacity"
      >
        {/* VINAYAK - moves up on scroll */}
        <div ref={vinayakRef} className="will-change-transform">
          <h1
            className="text-[16vw] md:text-[14vw] lg:text-[12vw] font-black uppercase tracking-tighter leading-[0.85] text-center"
            style={{
              color: "#00CFFF",
              fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
              letterSpacing: "-0.04em",
            }}
          >
            VINAYAK
          </h1>
        </div>

        {/* TSALLA - moves down on scroll */}
        <div ref={tsallaRef} className="will-change-transform">
          <h1
            className="text-[16vw] md:text-[14vw] lg:text-[12vw] font-black uppercase tracking-tighter leading-[0.85] text-center"
            style={{
              color: "#FFFFFF",
              textShadow: "0 0 60px rgba(255, 255, 255, 0.2), 0 2px 30px rgba(0, 0, 0, 0.8)",
              fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
              letterSpacing: "-0.04em",
            }}
          >
            TSALLA
          </h1>
        </div>
      </div>

      {/* Foreground person layer - creates "text behind person" effect */}
      <div
        ref={foregroundRef}
        className="absolute inset-0 z-[8] pointer-events-none will-change-transform"
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform delay-0"
          style={{
            backgroundImage: `url(${HERO_BG_IMAGE})`,
            backgroundPosition: "center 30%",
            maskImage: `radial-gradient(ellipse 26% 90% at 50% 50%, black 25%, transparent 65%)`,
            WebkitMaskImage: `radial-gradient(ellipse 26% 90% at 50% 50%, black 25%, transparent 65%)`,
          }}
        />
      </div>

      {/* Front Title Layer - 'N' on top of person (z-8 but later in DOM = on top) */}
      <div
        ref={titleContainerFrontRef}
        className="absolute inset-0 z-[8] pointer-events-none flex flex-col items-center justify-center will-change-opacity"
      >
        {/* VINAYAK - Front Layer ('N' only) */}
        <div ref={vinayakFrontRef} className="will-change-transform">
          <h1
            className="text-[16vw] md:text-[14vw] lg:text-[12vw] font-black uppercase tracking-tighter leading-[0.85] text-center"
            style={{
              color: "#00CFFF",
              fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
              letterSpacing: "-0.04em",
            }}
          >
            <span className="opacity-0">VI</span>
            <span className="opacity-100">N</span>
            <span className="opacity-0">A</span>
            <span
              className="opacity-100"
              style={{
                maskImage: "linear-gradient(to right, transparent 0%, transparent 60%, black 40%)",
                WebkitMaskImage: "linear-gradient(to right, transparent 0%, transparent 60%, black 40%)"
              }}
            >
              Y
            </span>
            <span className="opacity-100">A</span>
            <span className="opacity-0">K</span>
          </h1>
        </div>

        {/* TSALLA - Front Layer ('S' and second 'L') */}
        <div ref={tsallaFrontRef} className="will-change-transform">
          <h1
            className="text-[16vw] md:text-[14vw] lg:text-[12vw] font-black uppercase tracking-tighter leading-[0.85] text-center"
            style={{
              color: "#FFFFFF",
              textShadow: "0 0 60px rgba(255, 255, 255, 0.2), 0 2px 30px rgba(0, 0, 0, 0.8)",
              fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
              letterSpacing: "-0.04em",
            }}
          >
            <span className="opacity-0">T</span>
            <span className="opacity-100">S</span>
            <span className="opacity-0">AL</span>
            <span className="opacity-100">L</span>
            <span className="opacity-0">A</span>
          </h1>
        </div>
      </div>

      {/* Dynamic dark overlay - darkens as paragraphs appear */}
      <div
        ref={overlayRef}
        className="absolute inset-0 z-[9] opacity-30 will-change-opacity"
        style={{
          background: `linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.2) 0%,
            rgba(0, 0, 0, 0.4) 40%,
            rgba(0, 0, 0, 0.9) 100%
          )`,
        }}
      />

      {/* Founder Story Content - Appears after title splits */}
      <div
        ref={contentRef}
        className="absolute inset-0 z-20 flex items-end md:items-center px-6 md:px-12 lg:px-24 pb-16 md:pb-0 opacity-0 pointer-events-none"
      >
        <div className="w-full max-w-7xl xl:max-w-[90rem] mx-auto pt-20">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-12 xl:gap-24">
            {/* Left side - Company Info */}
            <div
              className="md:w-[42%] lg:w-[40%]"
              style={{
                marginTop: LEFT_PARAGRAPH_TOP_OFFSET,
                transform: `translateX(var(--left-x-offset))`
              }}
            >
              {/* CSS variable for responsive transform */}
              <style dangerouslySetInnerHTML={{
                __html: `
                :root { --left-x-offset: ${LEFT_PARAGRAPH_X_OFFSET}; --right-x-offset: ${RIGHT_PARAGRAPH_X_OFFSET}; }
                @media (min-width: 1600px) {
                  :root { --left-x-offset: ${LEFT_PARAGRAPH_X_OFFSET_XL}; --right-x-offset: ${RIGHT_PARAGRAPH_X_OFFSET_XL}; }
                }
              `}} />
              <p className="text-xl md:text-2xl lg:text-2xl xl:text-3xl text-white leading-tight font-light">
                <span className="text-[#00CFFF] font-semibold">Vinayak Tsalla</span> is the founder and CEO of{" "}
                <span className="text-[#00CFFF] font-semibold">Tsalla Aerospace Technologies</span> Private Limited,
              </p>

              <p className="text-lg md:text-xl lg:text-xl xl:text-2xl text-gray-300 leading-relaxed font-light mt-4">
                an innovative drone technology company based in <span className="text-[#00CFFF] font-semibold">Bengaluru</span>,
                working to revolutionize the future of unmanned systems.
              </p>
            </div>

            {/* Right side - Personal Passion & Vision */}
            <div
              className="md:w-[42%] lg:w-[40%]"
              style={{
                marginTop: RIGHT_PARAGRAPH_TOP_OFFSET,
                transform: `translateX(var(--right-x-offset))`
              }}
            >
              <p className="text-lg md:text-xl lg:text-xl xl:text-2xl text-white leading-relaxed font-light">
                Vinayak has always loved science and technology. His passion for engineering led him to establish Tsalla Aerospace
                to build indigenous, world-class aerospace solutions for both defense and commercial sectors.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}



      {/* Section Title - Top Left */}
      <div className="absolute top-10 left-12 z-50">
        <span className="text-xs font-bold tracking-[0.5em] text-white/40 uppercase">
          Leadership
        </span>
      </div>

      {/* Social Media Links - Top Right */}
      <div className="absolute top-8 right-4 z-50 flex items-center gap-3 p-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10">
        {[Twitter, Facebook, Instagram, Linkedin, Youtube, Globe].map((Icon, index) => (
          /* PREVIOUS UI:
          <a
            key={index}
            href="#"
            className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-black hover:bg-[#00CFFF] hover:text-white transition-all duration-300 transform hover:scale-110"
          >
          */
          <a
            key={index}
            href="#"
            onClick={(e) => e.preventDefault()}
            className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-black hover:bg-[#00CFFF] hover:text-white transition-all duration-300 transform hover:scale-110"
          >
            <Icon size={14} strokeWidth={2.5} />
          </a>
        ))}
      </div>
    </section>
  );
}
