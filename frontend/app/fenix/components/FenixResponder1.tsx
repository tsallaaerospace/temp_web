"use client"

import type React from "react"
import { useRef } from "react"
import { motion, useInView, useReducedMotion } from "framer-motion"
import { ContentWrapper } from "@/components/ContentWrapper"
import CharacterReveal from "@/components/CharacterReveal"
import GlitchX from "./GlitchX"

export default function FenixResponder1(): React.JSX.Element {
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { amount: 0.25 })
  const reduceMotion = useReducedMotion()

  return (
    <>
      {/* This component uses a dark, full-screen layout with a background video.
        - The parent 'section' is relative to position its children.
        - The 'video' and the dark 'div' overlay are positioned absolutely to fill the background.
        - The main text container is a flex column with 'justify-between' to push content to the top and bottom.
      */}
      {/* PREVIOUS UI:
      <section className="relative w-full min-h-screen flex items-center justify-center text-white overflow-hidden bg-black">
        <video ... />
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-60 z-10"></div>
        <div className="relative z-20 flex flex-col justify-between w-full min-h-screen py-16 md:py-24">
          <ContentWrapper>
            <div className="flex flex-col justify-between min-h-screen">
              ...
            </div>
          </ContentWrapper>
        </div>
      </section>
      */}
      <section
        ref={sectionRef}
        className="relative w-full h-[100dvh] min-h-[100dvh] flex items-center justify-center text-white overflow-hidden bg-black font-orbit"
      >
        {/* PREVIOUS UI: Background Video:
        <video
          src="https://cdn.sanity.io/files/z5s3oquj/production/49f421ac52789376bbe9c2036911fb5505e4004e.mp4"
          autoPlay
          loop
          muted
          playsInline // Essential for autoplay on mobile browsers
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        >
          Your browser does not support the video tag.
        </video>
        */}

        {/* Background Image: 4 Phase Operational Environments */}
        <picture className="absolute inset-0 z-0 block">
        <source media="(max-width: 767px)" srcSet="/product/fenix/responder-mobile.webp" />
        <img
          src="/product/fenix/4-phase.png"
          alt="FENIX First Responder 4 Phase Environments"
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        />
        </picture>

        {/* PREVIOUS UI: Full Dark Overlay:
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-60 z-10"></div>
        */}
        {/* Subtle top gradient overlay to ensure heading contrast across the 4 panels */}
        <div className="absolute top-0 left-0 w-full h-44 bg-gradient-to-b from-black/85 via-black/40 to-transparent z-10 pointer-events-none"></div>

        {/* PREVIOUS UI: Single left-aligned heading & paragraphs in ContentWrapper:
        <div className="relative z-20 flex flex-col justify-between w-full h-full py-10 sm:py-14 md:py-16">
          <ContentWrapper className="h-full">
            <div className="flex flex-col justify-between h-full">
              <div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium leading-tight tracking-normal flex flex-wrap items-center gap-x-2">
                  <span>FENIx as the First</span>{" "}
                  <CharacterReveal
                    text="Responder"
                    targetColor="#5ce1e6"
                    glowColor="#5ce1e6"
                    className="text-[#5ce1e6]"
                    stagger={0.06}
                  />
                </h1>
                <p className="mt-4 text-lg md:text-xl max-w-3xl text-neutral-600 font-light leading-relaxed">
                  When every second counts, FENIx arrives first — eyes on the ground before boots hit it.
                </p>
              </div>
              <div>
                <p className="text-lg md:text-xl max-w-3xl text-neutral-600 font-light leading-relaxed">
                  In disaster zones, conflict sites, or remote locations, time lost is lives lost. Human teams can't
                  always get there first, but Our drone can.
                </p>
              </div>
            </div>
          </ContentWrapper>
        </div>
        */}

        {/* 4-Column Title Grid: 1st col: "FENIx", 2nd col: "as the", 3rd col: "First", 4th col: "Responder" */}
        {/* PREVIOUS UI:
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fenix-section-title fenix-title-fit title-panel-grid [--panel-aspect:5504/3072] [--panels:4] [--mid:2] absolute grid grid-cols-4 text-center font-orbit font-normal leading-[1.1] tracking-[-0.03em] z-20 select-none pointer-events-none"
          style={{ top: "var(--fenix-title-top)", left: "var(--fenix-title-inset)", right: "var(--fenix-title-inset)" }}
        >
          <span className="flex items-center justify-center text-center">
            FENI<GlitchX trigger="view" delay={0.5} finalColor="#5ce1e6" />
          </span>
          <span className="flex items-center justify-center text-center">As The</span>
          <span className="flex items-center justify-center text-center">First</span>
          <span className="flex items-center justify-center text-center text-[#5ce1e6]">Responder</span>
        </motion.h2>
        */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fenix-section-title fenix-title-fit title-panel-grid [--panel-aspect:5504/3072] [--panels:4] [--mid:2] absolute grid grid-cols-4 text-center font-orbit font-normal leading-[1.1] tracking-[-0.03em] z-20 select-none pointer-events-none text-[clamp(0.75rem,3.2vw,1.15rem)] sm:text-[clamp(1.1rem,2.8vw,2.25rem)] lg:text-[clamp(1.75rem,3.2vw,3.75rem)] 3xl:text-[clamp(2.5rem,3.5vw,4.5rem)]"
          style={{ top: "var(--fenix-title-top)", left: "var(--fenix-title-inset)", right: "var(--fenix-title-inset)" }}
        >
          <span className="flex items-center justify-center text-center">
            FENI<GlitchX trigger="view" delay={0.5} finalColor="#5ce1e6" />
          </span>
          <span className="flex items-center justify-center text-center">As The</span>
          <span className="flex items-center justify-center text-center">First</span>
          <span className="flex items-center justify-center text-center text-[#5ce1e6]">Responder</span>
        </motion.h2>

        {/* PREVIOUS UI (Drone used absolute left-1/2 -translate-x-1/2 which conflicted with Framer Motion inline transform):
        <motion.div
          initial={{ opacity: 0, y: reduceMotion ? 0 : "35%" }}
          animate={inView ? { opacity: 1, y: "0%" } : { opacity: 0, y: reduceMotion ? 0 : "35%" }}
          transition={{ duration: reduceMotion ? 0.2 : 1.4, delay: reduceMotion ? 0 : 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="absolute left-1/2 -translate-x-1/2 bottom-[-10vh] sm:bottom-[-12vh] lg:bottom-[-15vh] w-[92vw] sm:w-[74vw] md:w-[64vw] lg:w-[56vw] max-w-[1120px] pointer-events-none select-none z-10 overflow-visible"
        >
          <img
            src="/product/fenix/4-phase-drone.webp"
            alt="FENIX drone in 4 phase operational environments"
            className="w-full h-auto object-contain drop-shadow-[0_25px_60px_rgba(0,0,0,0.85)]"
            loading="lazy"
            decoding="async"
          />
        </motion.div>
        */}

        {/* Big Foreground Drone: Centered flex container with smooth cinematic ascent animation from bottom */}
        {/* PREVIOUS UI: <div className="absolute inset-x-0 bottom-[-10vh] sm:bottom-[-12vh] lg:bottom-[-15vh] flex justify-center pointer-events-none select-none z-10"> */}
        {/* PREVIOUS UI: <div className="absolute inset-x-0 bottom-[-16vh] sm:bottom-[-20vh] lg:bottom-[-24vh] flex justify-center pointer-events-none select-none z-10"> */}
        {/* PREVIOUS UI: <div className="absolute inset-x-0 bottom-[-18vh] sm:bottom-[-22vh] lg:bottom-[-26vh] flex justify-center pointer-events-none select-none z-10"> */}
        {/* PREVIOUS UI: motion.div className="w-[92vw] sm:w-[74vw] md:w-[64vw] lg:w-[56vw] max-w-[1120px] overflow-visible flex justify-center" */}
        {/* PREVIOUS UI: initial={{ opacity: 0, y: reduceMotion ? 0 : 50 }} animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: reduceMotion ? 0 : 50 }} transition={{ duration: reduceMotion ? 0.2 : 1.4, delay: reduceMotion ? 0 : 0.15, ease: [0.16, 1, 0.3, 1] }} */}
        {/* PREVIOUS UI (Sizing lg:w-[63vw] max-w-[1260px] & bottom-[-33vh]):
        <div className="absolute inset-x-0 bottom-[-24vh] sm:bottom-[-28vh] lg:bottom-[-33vh] flex justify-center pointer-events-none select-none z-10">
          <motion.div
            initial={{ opacity: 0, y: reduceMotion ? 0 : "75%", scale: 0.94 }}
            animate={inView ? { opacity: 1, y: "0%", scale: 1 } : { opacity: 0, y: reduceMotion ? 0 : "75%", scale: 0.94 }}
            transition={{ duration: reduceMotion ? 0.2 : 1.6, delay: reduceMotion ? 0 : 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="w-[96vw] sm:w-[80vw] md:w-[70vw] lg:w-[63vw] max-w-[1260px] overflow-visible flex justify-center"
          >
            <img
              src="/product/fenix/4-phase-drone.webp"
              alt="FENIX drone in 4 phase operational environments"
              className="w-full h-auto object-contain drop-shadow-[0_25px_60px_rgba(0,0,0,0.85)]"
              loading="lazy"
              decoding="async"
            />
          </motion.div>
        </div>
        */}
        {/* PREVIOUS UI (bottom-[-29vh] sm:bottom-[-33vh] lg:bottom-[-39vh]):
        <div className="absolute inset-x-0 bottom-[-29vh] sm:bottom-[-33vh] lg:bottom-[-39vh] flex justify-center pointer-events-none select-none z-10">
          <motion.div
            initial={{ opacity: 0, y: reduceMotion ? 0 : "75%", scale: 0.94 }}
            animate={inView ? { opacity: 1, y: "0%", scale: 1 } : { opacity: 0, y: reduceMotion ? 0 : "75%", scale: 0.94 }}
            transition={{ duration: reduceMotion ? 0.2 : 1.6, delay: reduceMotion ? 0 : 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="w-[98vw] sm:w-[88vw] md:w-[78vw] lg:w-[72vw] xl:w-[70vw] max-w-[1440px] overflow-visible flex justify-center"
          >
            <img
              src="/product/fenix/4-phase-drone.webp"
              alt="FENIX drone in 4 phase operational environments"
              className="w-full h-auto object-contain drop-shadow-[0_25px_60px_rgba(0,0,0,0.85)]"
              loading="lazy"
              decoding="async"
            />
          </motion.div>
        </div>
        */}
        {/* PREVIOUS UI:
        <div className="absolute inset-x-0 bottom-[-37vh] sm:bottom-[-42vh] lg:bottom-[-48vh] flex justify-center pointer-events-none select-none z-10">
          <motion.div
            initial={{ opacity: 0, y: reduceMotion ? 0 : "75%", scale: 0.94 }}
            animate={inView ? { opacity: 1, y: "0%", scale: 1 } : { opacity: 0, y: reduceMotion ? 0 : "75%", scale: 0.94 }}
            transition={{ duration: reduceMotion ? 0.2 : 1.6, delay: reduceMotion ? 0 : 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="w-[98vw] sm:w-[88vw] md:w-[78vw] lg:w-[72vw] xl:w-[70vw] max-w-[1440px] overflow-visible flex justify-center"
          >
            <img
              src="/product/fenix/4-phase-drone.webp"
              alt="FENIX drone in 4 phase operational environments"
              className="w-full h-auto object-contain drop-shadow-[0_25px_60px_rgba(0,0,0,0.85)]"
              loading="lazy"
              decoding="async"
            />
          </motion.div>
        </div>
        */}
        <div className="absolute inset-x-0 bottom-[12vh] md:bottom-[-40vh] lg:bottom-[-48vh] 3xl:bottom-[-52vh] flex justify-center pointer-events-none select-none z-10">
          <motion.div
            initial={{ opacity: 0, y: reduceMotion ? 0 : "75%", scale: 0.94 }}
            animate={inView ? { opacity: 1, y: "0%", scale: 1 } : { opacity: 0, y: reduceMotion ? 0 : "75%", scale: 0.94 }}
            transition={{ duration: reduceMotion ? 0.2 : 1.6, delay: reduceMotion ? 0 : 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="w-[98vw] sm:w-[88vw] md:w-[78vw] lg:w-[72vw] xl:w-[70vw] 3xl:w-[65vw] max-w-[1440px] 2xl:max-w-[1600px] 3xl:max-w-[1800px] uw:max-w-[2100px] overflow-visible flex justify-center"
          >
            <img
              src="/product/fenix/4-phase-drone.webp"
              alt="FENIX drone in 4 phase operational environments"
              className="w-full h-auto object-contain drop-shadow-[0_25px_60px_rgba(0,0,0,0.85)]"
              loading="lazy"
              decoding="async"
            />
          </motion.div>
        </div>
      </section>
    </>
  )
}
