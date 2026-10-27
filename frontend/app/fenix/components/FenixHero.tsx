"use client"
import React from "react"
import type { JSX } from "react"
import { motion } from "framer-motion"
import GlitchX from "./GlitchX"
import CharacterReveal from "@/components/CharacterReveal"

export default function FenixHero(): React.JSX.Element {
  // PREVIOUS MOBILE HEIGHT: the hero used `h-screen` (`100vh`), which includes mobile browser chrome on physical phones.
  return (
    <section
      className="relative h-[100svh] w-full text-white overflow-hidden font-orbit md:h-screen"
      data-navbar-text="white"
    >
      {/* Background Video */}
      {/* PREVIOUS UI:
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover z-0"
        poster="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2070&auto=format&fit=crop"
      >
        <source
          src="https://cdn.sanity.io/files/z5s3oquj/production/f3cab16e70d9afbe1c7a4cef3e496ef06e3dd497.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
      */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source
          src="/product/fenix/QsmnFp2aCayPv4DNQVxUhw.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      {/* Content */}
      {/* PREVIOUS UI:
      <div className="relative z-20 w-full h-full flex flex-col justify-between pt-28 px-4 sm:px-6 md:px-8 pb-10 sm:pb-12 md:pb-16 lg:flex-row lg:justify-between lg:items-end lg:px-20 lg:pb-16 lg:pt-0">
        <div className="max-w-full lg:max-w-2xl text-left mb-8 lg:mb-0 lg:flex lg:flex-c ol lg:justify-end">
          <h1
            className="text-white font-bold text-[3.25rem] sm:text-[3.75rem] md:text-[3.75rem] lg:text-[4.5rem] leading-none tracking-tight mb-1"
            style={{ letterSpacing: "-0.03em" }}
          >
            <motion.span
              className="inline-block"
              initial={{ opacity: 0, filter: "blur(6px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ delay: 1.8, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              FENI
            </motion.span>
            <GlitchX delay={1.9} finalColor="#ffffff" />
          </h1>
        </div>

        <div className="fenix-body w-full max-w-full px-4 text-center sm:px-8 text-white lg:max-w-lg lg:px-0 lg:pl-6 lg:text-justify lg:flex lg:flex-col lg:justify-end">
          <motion.p
            className="w-full text-center lg:text-justify"
            initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 2.2, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          >
            When intelligence fits in the palm of your hand, missions expand far beyond their footprint — agile, discreet, and ready on demand.
          </motion.p>
        </div>
      </div>
      */}
      <div className="relative z-20 w-full h-full max-w-[120rem] 3xl:max-w-[140rem] uw:max-w-[170rem] mx-auto flex flex-col justify-between pt-[clamp(5.25rem,14svh,8rem)] px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 3xl:px-28 uw:px-36 pb-[clamp(2.5rem,6svh,4.5rem)] lg:flex-row lg:justify-between lg:items-end lg:pt-0">
        {/* Left Side: Title & Subtitle */}
        <div className="max-w-full lg:max-w-2xl 3xl:max-w-3xl text-left mb-6 sm:mb-8 lg:mb-0 lg:flex lg:flex-col lg:justify-end">
          <h1
            className="text-white font-bold text-[clamp(2.75rem,8.5vw,4.5rem)] 3xl:text-[5.5rem] uw:text-[6.5rem] leading-none tracking-tight mb-1"
            style={{ letterSpacing: "-0.03em" }}
          >
            <motion.span
              className="inline-block"
              initial={{ opacity: 0, filter: "blur(6px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ delay: 1.8, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              FENI
            </motion.span>
            <GlitchX delay={1.9} finalColor="#ffffff" />
          </h1>
        </div>

        {/* Right Side: Paragraph */}
        <div className="fenix-body w-full max-w-full text-center text-white sm:text-left lg:max-w-lg 3xl:max-w-xl lg:px-0 lg:pl-6 lg:text-justify lg:flex lg:flex-col lg:justify-end">
          <motion.p
            className="w-full text-center lg:text-justify text-balance"
            initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 2.2, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          >
            When intelligence fits in the palm of your hand, missions expand far beyond their footprint — agile, discreet, and ready on demand.
          </motion.p>
        </div>
      </div>
    </section>
  )
}
