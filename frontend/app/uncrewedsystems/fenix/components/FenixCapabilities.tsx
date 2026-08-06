"use client"
import type React from "react"
import Image from "next/image"
import { ContentWrapper } from "@/components/ContentWrapper"
import CharacterReveal from "@/components/CharacterReveal"

// Dynamically load Clash Grotesk font (for local development only; otherwise, load globally)
export default function FenixCapabilities(): React.JSX.Element {
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

      {/* PREVIOUS UI: <section className="font-clash-grotesk ..."> */}
      {/* PREVIOUS MOBILE HEIGHT: <section className="font-orbit flex flex-col md:flex-row items-center justify-center bg-white text-black w-full min-h-screen py-12 md:py-20"> */}
      <section className="font-orbit flex min-h-[100svh] w-full flex-col items-center justify-center bg-white py-12 text-black md:min-h-screen md:flex-row md:py-20">
        <ContentWrapper>
          <div className="flex flex-col md:flex-row items-center justify-center gap-16 lg:gap-24">
            {/* Left Column: Image */}
            <div className="w-full md:w-5/12 flex">
              <div className="relative w-full max-w-md aspect-[1075/1433]">
                <Image
                  src="/images/design-mode/5a0c9583711b45a93c29fd9e143682b9ea4a72f6-898x898.png"
                  alt="DEXTER Drone"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            {/* Right Column: Text Content */}
            <div className="w-full md:w-7/12 flex flex-col justify-center text-left max-w-2xl">
              {/* PREVIOUS UI: style={{ fontFamily: "'ClashGrotesk Bold (.eot)', sans-serif" }} */}
              {/* PREVIOUS UI: <span style={{ color: '#5ce1e6' }}>Intelligence</span> */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium leading-none tracking-tight mb-8 text-black">
                <span className="whitespace-nowrap">Compact Tactical</span>
                <br />
                {/* PREVIOUS UI: <CharacterReveal text="Intelligence" targetColor="#5ce1e6" className="text-[#5ce1e6]" stagger={0.06} /> */}
                <CharacterReveal
                  text="Intelligence"
                  targetColor="#5ce1e6"
                  glowColor="#5ce1e6"
                  flickerColor="#000000"
                  className="text-[#5ce1e6]"
                  stagger={0.06}
                />
              </h1>
              {/* PREVIOUS UI: <p className="text-lg md:text-xl font-light leading-relaxed text-neutral-600"> */}
              <p className="text-lg md:text-xl font-light leading-relaxed text-neutral-600 text-justify">
                Purpose-built for tight, complex spaces, FENIx merges collision prevention, adaptive routing, and
                encrypted connectivity — keeping operators ahead with silent precision and mission-ready resilience.
              </p>
            </div>
          </div>
        </ContentWrapper>
      </section>
    </>
  )
}
