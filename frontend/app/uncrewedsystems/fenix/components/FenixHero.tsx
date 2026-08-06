"use client"
import React from "react"
import type { JSX } from "react"
import CharacterReveal from "@/components/CharacterReveal"

export default function FenixHero(): React.JSX.Element {
  // PREVIOUS MOBILE HEIGHT: the hero used `h-screen` (`100vh`), which includes mobile browser chrome on physical phones.
  return (
    <section
      className="relative h-[100svh] w-full text-white overflow-hidden font-orbit md:h-screen"
    >
      {/* Background Video */}
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

      {/* Content */}
      <div className="relative z-20 w-full h-full flex flex-col justify-between pt-28 px-4 sm:px-6 md:px-8 pb-10 sm:pb-12 md:pb-16 lg:flex-row lg:justify-between lg:items-end lg:px-20 lg:pb-16 lg:pt-0">
        {/* Left Side: Title & Subtitle (Images 1 & 2) */}
        <div className="max-w-full lg:max-w-2xl text-left mb-8 lg:mb-0 lg:flex lg:flex-col lg:justify-end">
          {/* PREVIOUS UI:
          <h1
            className="text-white font-bold text-[3.25rem] sm:text-[3.75rem] md:text-[3.75rem] lg:text-[4.5rem] leading-none tracking-tight mb-1"
            style={{ letterSpacing: "-0.03em" }}
          >
            FENIx
          </h1>
          <p
            className="text-white text-base sm:text-lg md:text-xl font-normal tracking-wide text-balance"
            style={{ letterSpacing: "0.01em" }}
          >
            Fast Entry Navigational Intrusion eXplorer
          </p>
          */}
          <h1
            className="text-white font-bold text-[3.25rem] sm:text-[3.75rem] md:text-[3.75rem] lg:text-[4.5rem] leading-none tracking-tight mb-1"
            style={{ letterSpacing: "-0.03em" }}
          >
            <CharacterReveal
              text="FENIx"
              targetColor="#ffffff"
              glowColor="#5ce1e6"
              delay={0.2}
              stagger={0.06}
            />
          </h1>
          {/* PREVIOUS UI: <p className="text-white text-base sm:text-lg md:text-xl font-normal tracking-wide text-balance" style={{ letterSpacing: "0.01em" }}> */}
          <div
            className="text-white text-base sm:text-lg md:text-xl font-normal tracking-wide text-balance"
            style={{ letterSpacing: "0.01em" }}
          >
            <CharacterReveal
              text="Fast Entry Navigational Intrusion eXplorer"
              targetColor="#ffffff"
              glowColor="#5ce1e6"
              delay={0.4}
              stagger={0.03}
            />
          </div>
        </div>

        {/* Right Side: Paragraph (Image 3 - expanded container width lg:max-w-lg & clean left alignment) */}
        {/* PREVIOUS UI:
        <div className="max-w-full pl-6 sm:pl-10 text-justify text-lg font-light leading-relaxed text-white md:text-xl lg:max-w-md lg:pl-8 lg:flex lg:flex-col lg:justify-end">
          <CharacterReveal
            text="When intelligence fits in the palm of your hand, missions expand far beyond their footprint — agile, discreet, and ready on demand."
            targetColor="#ffffff"
            glowColor="#5ce1e6"
            delay={1.4}
            stagger={0.02}
            className="w-full text-justify"
            lineClassName="text-justify w-full"
          />
        </div>
        */}
        {/* Right Side: Paragraph (Image 3 - text-base sm:text-lg font size & whole word wrapping) */}
        {/* PREVIOUS UI:
        <div className="max-w-full pl-4 sm:pl-8 text-left text-lg font-light leading-relaxed text-white md:text-xl lg:max-w-lg lg:pl-6 lg:flex lg:flex-col lg:justify-end">
          <CharacterReveal
            text="When intelligence fits in the palm of your hand, missions expand far beyond their footprint — agile, discreet, and ready on demand."
            targetColor="#ffffff"
            glowColor="#5ce1e6"
            delay={1.4}
            stagger={0.02}
            className="w-full text-left"
          />
        </div>
        */}
        {/* PREVIOUS UI: <div className="w-full max-w-full px-4 sm:px-8 text-justify text-base sm:text-lg md:text-lg font-light leading-relaxed text-white lg:max-w-lg lg:px-0 lg:pl-6 lg:flex lg:flex-col lg:justify-end"> */}
        <div className="w-full max-w-full px-4 text-center text-base sm:px-8 sm:text-lg md:text-lg font-light leading-relaxed text-white lg:max-w-lg lg:px-0 lg:pl-6 lg:text-justify lg:flex lg:flex-col lg:justify-end">
          <CharacterReveal
            text="When intelligence fits in the palm of your hand, missions expand far beyond their footprint — agile, discreet, and ready on demand."
            targetColor="#ffffff"
            glowColor="#5ce1e6"
            delay={1.4}
            stagger={0.02}
            /* PREVIOUS UI: className="w-full text-justify" lineClassName="text-justify w-full" */
            className="w-full text-center lg:text-justify"
            lineClassName="text-center lg:text-justify w-full"
          />
        </div>
      </div>
    </section>
  )
}
