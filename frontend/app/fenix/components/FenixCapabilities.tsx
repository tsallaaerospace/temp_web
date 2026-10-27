"use client"
import type React from "react"
import Image from "next/image"
import { motion, useReducedMotion } from "framer-motion"
import { ContentWrapper } from "@/components/ContentWrapper"
import CharacterReveal from "@/components/CharacterReveal"
import GlitchX from "./GlitchX"

// Dynamically load Clash Grotesk font (for local development only; otherwise, load globally)
export default function FenixCapabilities(): React.JSX.Element {
  const reduceMotion = useReducedMotion()
  return (
    <>
      {/*
        The link to the "Clash Grotesk" font is included here.
        This ensures the font is available for the component to use.
        In a real-world application, this would typically be placed in the <head> of your main HTML file.
      */}
      {/* PREVIOUS UI: Clash Grotesk import
      <style jsx global>{`
        @import url('https://fonts.cdnfonts.com/css/clash-grotesk');
        .font-clash-grotesk {
          font-family: 'Clash Grotesk', sans-serif;
        }
      `}</style>
      */}

      {/* PREVIOUS UI: <section className="font-orbit flex min-h-[100svh] w-full flex-col items-center justify-center overflow-hidden bg-white py-12 text-black md:min-h-screen md:flex-row md:py-20"> */}
      <section id="capabilities" className="font-orbit flex min-h-[100svh] w-full flex-col items-center justify-center overflow-hidden bg-white py-8 xs:py-12 sm:py-16 md:py-20 text-black md:min-h-screen md:flex-row">
        <ContentWrapper>
          <div className="flex flex-col md:flex-row items-center justify-center gap-10 sm:gap-14 md:gap-12 lg:gap-20 xl:gap-24">
            {/* Left Column: Image */}
            {/* PREVIOUS UI:
            <motion.div
              className="w-full md:w-5/12 flex justify-center"
              initial={{ x: reduceMotion ? 0 : -160, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ amount: 0.25 }}
              transition={{ duration: reduceMotion ? 0 : 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="relative w-full max-w-md aspect-[1075/1433] flex items-center justify-center">
                <Image
                  src="/product/fenix/FENIX_2nd_section.png"
                  alt="FENIX Drone"
                  fill
                  className="object-contain scale-[1.6] -translate-x-[10%] md:scale-[2.7] md:-translate-x-[48%]"
                  priority
                />
              </div>
            </motion.div>
            */}
            {/* PREVIOUS MOBILE COMPACT SCALE:
            <motion.div
              className="w-full md:w-5/12 flex justify-center"
              initial={{ x: reduceMotion ? 0 : -160, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ amount: 0.25 }}
              transition={{ duration: reduceMotion ? 0 : 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="relative w-full max-w-[15rem] xs:max-w-[18rem] sm:max-w-xs md:max-w-md 3xl:max-w-lg aspect-[1075/1433] flex items-center justify-center">
                <Image
                  src="/product/fenix/FENIX_2nd_section.png"
                  alt="FENIX Drone"
                  fill
                  className="object-contain scale-[1.3] xs:scale-[1.5] -translate-x-[5%] md:scale-[1.9] md:-translate-x-[25%] lg:scale-[2.4] lg:-translate-x-[38%] xl:scale-[2.7] xl:-translate-x-[48%]"
                  priority
                />
              </div>
            </motion.div>
            */}
            <motion.div
              className="w-full md:w-5/12 flex justify-center"
              initial={{ x: reduceMotion ? 0 : -160, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ amount: 0.25 }}
              transition={{ duration: reduceMotion ? 0 : 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="relative w-full max-w-[20rem] xs:max-w-[24rem] sm:max-w-xs md:max-w-md 3xl:max-w-lg aspect-[1075/1433] flex items-center justify-center">
                <Image
                  src="/product/fenix/FENIX_2nd_section.png"
                  alt="FENIX Drone"
                  fill
                  className="object-contain scale-[2.4] xs:scale-[2.6] sm:scale-[1.8] -translate-x-[4%] -translate-y-[8%] xs:-translate-y-[10%] sm:translate-y-0 md:scale-[1.9] md:-translate-x-[25%] md:translate-y-0 lg:scale-[2.4] lg:-translate-x-[38%] xl:scale-[2.7] xl:-translate-x-[48%]"
                  priority
                />
              </div>
            </motion.div>

            {/* Right Column: Text Content */}
            {/* PREVIOUS UI:
            <div className="w-full md:w-7/12 flex flex-col justify-center text-left max-w-2xl md:translate-x-12 lg:translate-x-16 xl:translate-x-20 -translate-y-3 md:-translate-y-14 lg:-translate-y-16">
              <h1 className="fenix-section-title font-normal leading-none tracking-tight mb-8 text-black">
                <span className="whitespace-nowrap">Compact Tactical</span>
                <br />
                <CharacterReveal
                  text="Intelligence"
                  targetColor="#5ce1e6"
                  glowColor="#5ce1e6"
                  flickerColor="#000000"
                  className="text-[#5ce1e6]"
                  stagger={0.06}
                />
              </h1>
              <p className="text-xs md:text-sm font-light leading-relaxed text-neutral-600 text-justify">
                Purpose-built for tight, complex spaces, <span className="whitespace-nowrap">FENI<GlitchX trigger="view" delay={0.6} onLight /></span> merges collision prevention, adaptive routing, and
                encrypted connectivity — keeping operators ahead with silent precision and mission-ready resilience.
              </p>
            </div>
            */}
            <div className="w-full md:w-7/12 flex flex-col justify-center text-left max-w-2xl 3xl:max-w-3xl md:translate-x-4 lg:translate-x-12 xl:translate-x-20 -translate-y-2 md:-translate-y-8 lg:-translate-y-14 xl:-translate-y-16">
              <h1 className="fenix-section-title font-normal leading-none tracking-tight mb-4 sm:mb-6 lg:mb-8 3xl:mb-10 text-black">
                {/* PREVIOUS UI (block span followed by br caused double line-break and excessive vertical gap on mobile screens):
                <span className="block xs:inline whitespace-normal sm:whitespace-nowrap">Compact Tactical</span>
                <br />
                */}
                <span className="inline sm:whitespace-nowrap">Compact Tactical</span>
                <br />
                <CharacterReveal
                  text="Intelligence"
                  targetColor="#5ce1e6"
                  glowColor="#5ce1e6"
                  flickerColor="#000000"
                  className="text-[#5ce1e6]"
                  stagger={0.06}
                />
              </h1>
              <p className="text-xs md:text-sm font-light leading-relaxed text-neutral-600 text-justify">
                Purpose-built for tight, complex spaces, <span className="whitespace-nowrap">FENI<GlitchX trigger="view" delay={0.6} onLight /></span> merges collision prevention, adaptive routing, and
                encrypted connectivity — keeping operators ahead with silent precision and mission-ready resilience.
              </p>
            </div>
          </div>
        </ContentWrapper>
      </section>
    </>
  )
}
