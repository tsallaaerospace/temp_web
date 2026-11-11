"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Twitter, Facebook, Instagram, Linkedin, Youtube, Globe } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// PREVIOUS UI: story accents and social hover backgrounds used #00CFFF.
// Hero background image - local image
const HERO_BG_IMAGE = "/leadership/hero-founder.jpg";

export default function HeroSection() {
  // Position configuration for manual adjustment
  // These will be used with CSS variables to handle larger screens
  const LEFT_PARAGRAPH_X_OFFSET = "0px";
  // PREVIOUS UI: LEFT_PARAGRAPH_X_OFFSET_XL "-100px", RIGHT_PARAGRAPH_X_OFFSET_XL "150px" (right text ran off-screen on wide screens).
  const LEFT_PARAGRAPH_X_OFFSET_XL = "0px";

  const RIGHT_PARAGRAPH_X_OFFSET = "0px";
  const RIGHT_PARAGRAPH_X_OFFSET_XL = "0px";

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
          // PREVIOUS UI: +=300% on mobile required three viewport heights of scrolling.
          end: () => window.matchMedia("(max-width: 767px)").matches ? "+=150%" : "+=300%",
          pin: true,
          scrub: window.matchMedia("(max-width: 767px)").matches ? 0.5 : 1.2,
          invalidateOnRefresh: true,
          anticipatePin: 1, // Reduces 'jumping' during pinning
        },
      });

      // 1. Initial State & Split Animation - use force3D: true for GPU acceleration
      // Reveal the middle letters as the two name lines separate; reversing scroll hides them again.
      // PREVIOUS UI: a short .16 reveal completed before the letters visibly separated.
      tl.fromTo(titleContainerRef.current?.querySelectorAll(".founder-middle, .founder-mobile-middle") ?? [], {
        opacity: (_index: number, target: HTMLElement) => target.classList.contains("founder-mobile-middle") && window.matchMedia("(min-width: 768px)").matches ? 1 : 0,
      }, {
        opacity: 1,
        duration: 0.36,
        ease: "none",
      }, 0.04);
      tl.to([vinayakRef.current, vinayakFrontRef.current], {
        y: "-100vh",
        duration: 0.8,
        force3D: true,
        ease: "power2.in",
      }, 0);

      tl.to([tsallaRef.current, tsallaFrontRef.current], {
        y: "100vh",
        duration: 0.8,
        force3D: true,
        ease: "power2.in",
      }, 0);

      tl.to([titleContainerRef.current, titleContainerFrontRef.current], {
        opacity: 0,
        duration: 0.18,
        ease: "none",
      }, 0.68);

      // Keep social links at the opening, then clear them for the mobile story paragraphs.
      tl.to(".founder-social", {
        autoAlpha: () => window.matchMedia("(max-width: 767px)").matches ? 0 : 1,
        duration: 0.12,
        ease: "none",
      }, 0.5);
      tl.set(".founder-social", {
        display: () => window.matchMedia("(max-width: 767px)").matches ? "none" : "flex",
      }, 0.75);

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
        { y: 0, opacity: 1, duration: 0.3, ease: "power2.out", pointerEvents: "auto" },
        0.8
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
      className="founder-hero relative w-full h-screen overflow-hidden bg-black"
    >
      {/* Background Image (behind everything) */}
      <div
        ref={bgRef}
        className="absolute inset-0 z-0 will-change-transform"
      >
        <div
          className="founder-photo absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${HERO_BG_IMAGE})`,
            // PREVIOUS UI: center 30% on every device.
            backgroundPosition: "var(--founder-photo-position, center 30%)",
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

      {/* PREVIOUS UI: centered Inter title and portrait mask split letters across the new cockpit photo. */}
      <div
        ref={titleContainerRef}
        className="founder-name font-orbit absolute inset-0 z-[5] pointer-events-none flex flex-col items-center justify-center will-change-opacity"
      >
        {/* VINAYAK - moves up on scroll */}
        <div ref={vinayakRef} className="will-change-transform">
          <h1
            aria-label="Vinayak"
            className="uppercase font-normal leading-none"
            style={{
              // PREVIOUS UI: brighter blue #00CFFF.
              color: "#5CE1E6",
              fontFamily: "inherit",
              // PREVIOUS UI: negative tracking tightened some letter pairs more than others.
              letterSpacing: "-0.025em",
            }}
          >
            {/* PREVIOUS UI: VINAYAK was fully visible at the start. */}
            {/* PREVIOUS UI: Y stayed visible at the start on mobile. */}
            {/* PREVIOUS UI: VI + hidden NA + mobile-hidden Y + AK used untrimmed font side bearings. */}
            {/* PREVIOUS UI: N and A were both hidden in the opening frame. */}
            VIN<span className="founder-middle">A</span><span className="founder-mobile-middle">Y</span>AK
          </h1>
        </div>

        {/* TSALLA - moves down on scroll */}
        <div ref={tsallaRef} className="will-change-transform">
          <h1
            aria-label="Tsalla"
            className="uppercase font-normal leading-none"
            style={{
              color: "#FFFFFF",
              textShadow: "0 0 60px rgba(255, 255, 255, 0.2), 0 2px 30px rgba(0, 0, 0, 0.8)",
              fontFamily: "inherit",
              letterSpacing: "-0.025em",
            }}
          >
            {/* PREVIOUS UI: TSALLA was fully visible at the start. */}
            {/* PREVIOUS UI: TS + hidden AL + LA used untrimmed font side bearings. */}
            TS<span className="founder-middle">AL</span>LA
          </h1>
        </div>
      </div>

      {/* Foreground person layer - creates "text behind person" effect */}
      <div
        ref={foregroundRef}
        className="hidden" aria-hidden="true"
      >
        <div
          className="founder-photo absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform delay-0"
          style={{
            backgroundImage: `url(${HERO_BG_IMAGE})`,
            backgroundPosition: "var(--founder-photo-position, center 30%)",
            maskImage: `radial-gradient(ellipse 26% 90% at 50% 50%, black 25%, transparent 65%)`,
            WebkitMaskImage: `radial-gradient(ellipse 26% 90% at 50% 50%, black 25%, transparent 65%)`,
          }}
        />
      </div>

      {/* Front Title Layer - 'N' on top of person (z-8 but later in DOM = on top) */}
      <div
        ref={titleContainerFrontRef}
        className="hidden" aria-hidden="true"
      >
        {/* VINAYAK - Front Layer ('N' only) */}
        <div ref={vinayakFrontRef} className="will-change-transform">
          <h1
            className="text-[16vw] md:text-[14vw] lg:text-[12vw] font-black uppercase tracking-tighter leading-[0.85] text-center"
            style={{
              color: "#5CE1E6",
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

      <style jsx>{`
        /* PREVIOUS UI: lower-left alignment with padding: 0 5vw 7svh. */
        .founder-name { padding: 0 5vw; gap: .08em; text-align: center; }
        /* PREVIOUS UI: font-size: clamp(64px, 10.5vw, 200px). */
        /* PREVIOUS UI: regular weight, 12.5vw capped at 240px. */
        /* PREVIOUS UI: 14.2vw/280px spread the name across the older photo crop. */
        .founder-name h1 { font-size: clamp(86px, 13.5vw, 260px); font-weight: 700; text-shadow: 0 2px 24px rgba(0,0,0,.35); }
        .founder-middle { opacity: 0; }
        @media (max-width: 767px) {
          /* PREVIOUS UI: 40% photo position shifted the image farther right. */
          .founder-hero { --founder-photo-position: 43% 30%; }
          .founder-mobile-middle { opacity: 0; }
          /* PREVIOUS UI: intro top offset was clamp(90px, 12svh, 120px). */
          .founder-story-intro { position: absolute; top: clamp(72px, 9svh, 90px); left: 24px; right: 24px; margin-top: 0 !important; }
          /* PREVIOUS UI: both name lines had a 3vw right offset. */
          .founder-name > div { position: relative; left: 0; }
          /* PREVIOUS UI: mobile bottom padding was 10svh. */
          .founder-name { padding: 0 6vw; }
          /* PREVIOUS UI: mobile font-size: 14vw. */
          .founder-name h1 { font-size: 19vw; }
        }
        @media (min-width: 768px) {
          /* Extend the photo to the right to reframe the face without exposing a blank edge. */
          .founder-photo { right: -12vw; }
        }
      `}</style>
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
        data-founder-story="true"
        className="absolute inset-0 z-20 flex items-end md:items-center px-6 md:px-12 lg:px-24 pb-16 md:pb-0 opacity-0 pointer-events-none"
      >
        <div className="w-full max-w-7xl xl:max-w-[90rem] mx-auto pt-20">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-12 xl:gap-24">
            {/* Left side - Company Info */}
            <div
              className="founder-story-intro md:w-[42%] lg:w-[40%]"
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
              {/* PREVIOUS UI: "Vinayak Tsalla is the founder and CEO of Tsalla Aerospace Technologies Private Limited, an
                  innovative drone technology company based in Bengaluru..." in text-xl..xl:text-3xl with cyan highlights. */}
              {/* Lead sentence a step larger than the standard product-body size (12/14px) */}
              <p className="product-body !text-[0.875rem] md:!text-[1rem] text-justify [hyphens:auto] text-white">
                Vinayak Tsalla is the <span className="text-[#5CE1E6]">Founder</span> and <span className="text-[#5CE1E6]">CEO</span> of{" "}
                <span className="text-[#5CE1E6]">Tsalla Aerospace</span>, building autonomous aircraft and defence technology in India.
              </p>
              <p className="product-body text-justify [hyphens:auto] text-white mt-4">
                An aerospace engineer by training, he leads the company with a clear purpose: give those who protect us technology they can depend on.
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
              {/* PREVIOUS UI: "Vinayak has always loved science and technology..." in text-lg..xl:text-2xl. */}
              <p className="product-body text-justify [hyphens:auto] text-white">
                After studying and working in Europe, Vinayak returned to India to build a company around a conviction: India must have the capability to create the technology it depends on.
              </p>
              <p className="product-body text-justify [hyphens:auto] text-white mt-4">
                At Tsalla, he brings together engineering ambition and operational purpose—to turn difficult problems into proven capability, and build a team that can carry that mission forward.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}



      {/* Section Title - Top Left */}
      {/* PREVIOUS UI: top-10 (the page started below the navbar then). Now offset by the navbar height (4.5rem). */}
      {/* PREVIOUS UI: Leadership label in the top-left corner.
      <div className="absolute top-[7rem] left-12 z-50">
        <span className="text-xs font-bold tracking-[0.5em] text-white/40 uppercase">
          Leadership
        </span>
      </div>
      */}

      {/* Social Media Links - Top Right */}
      {/* PREVIOUS UI: top-8. Now offset by the navbar height (4.5rem). */}
      {/* PREVIOUS UI: horizontal social row using flex without flex-col. */}
      {/* PREVIOUS UI: vertical icons started at top-[6.5rem]. */}
      {/* PREVIOUS UI: centered vertical social column on all devices. */}
      <div className="founder-social absolute top-[6rem] translate-y-0 md:top-1/2 md:-translate-y-1/2 right-4 z-50 flex flex-row md:flex-col items-center gap-2 md:gap-3 p-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10">
        {/* PREVIOUS UI: [Twitter, Facebook, Instagram, Linkedin, Youtube, Globe] */}
        {[
          { Icon: Twitter, label: "X", href: "https://x.com/tsvinayak" },
          { Icon: Facebook, label: "Facebook", href: "https://www.facebook.com/tsvinayak/" },
          { Icon: Instagram, label: "Instagram", href: "https://www.instagram.com/arc_angel/" },
          { Icon: Linkedin, label: "LinkedIn", href: "https://in.linkedin.com/in/vinayak-tsalla-9016a616b" },
          { Icon: Youtube, label: "YouTube", href: "https://www.youtube.com/@VinayakTsalla/videos" },
        ].map(({ Icon, label, href }, index) => (
          /* PREVIOUS UI:
          <a
            key={index}
            href="#"
            className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-black hover:bg-[#5CE1E6] hover:text-white transition-all duration-300 transform hover:scale-110"
          >
          */
          <a
            key={index}
            // PREVIOUS UI: href="#" and preventDefault kept these buttons inactive.
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Vinayak Tsalla on ${label} (opens in a new tab)`}
            className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-black hover:bg-[#5CE1E6] hover:text-white transition-all duration-300 transform hover:scale-110"
          >
            <Icon size={14} strokeWidth={2.5} />
          </a>
        ))}
      </div>
    </section>
  );
}
