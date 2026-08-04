"use client"

import React, { useRef } from "react"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"

import CharacterReveal from "./CharacterReveal"

/* PREVIOUS UI (Inline CharacterReveal component):
function CharacterReveal({ text, className, stagger = 0.04, delay = 0 }: { text: string; className?: string; stagger?: number; delay?: number }) {
  ...
}
*/

export default function HeroSection(rogg: any) {
  const buttonRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.fromTo(buttonRef.current, 
      { opacity: 0 },
      { opacity: 1, duration: 0.8, delay: 3.5 }
    )
  })

  return (
    <section className="relative h-screen w-full bg-black overflow-hidden snap-start snap-always">
      {/* PREVIOUS UI: section className="relative h-screen w-full bg-black overflow-hidden" */}
      {/* Background video - fills entire section */}
      <div className="absolute inset-0 w-full h-full z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source
            src="https://cdn.sanity.io/files/z5s3oquj/production/958ffbdcaafa889bad0744af57731fae11db69a8.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        {/* Subtle dark overlay for better white text readability */}
        <div className="absolute inset-0 bg-black/30 z-10"></div>
      </div>

      {/* Content block - centered vertically, accounting for navbar height */}
      <div
        className="
          relative z-20 w-full h-full
          flex flex-col
          justify-center items-start text-left
          px-8 sm:px-12 md:px-16 lg:px-24
          pt-20 pb-32 md:pb-48
        "
      >
        <div className="w-full max-w-4xl">
          {/* MAIN LINE - Digital Blink Animation */}
          <CharacterReveal
            text={"UNMANNED.\nUNMATCHED.\nUNCOMPROMISED."}
            className="font-bold text-4xl sm:text-5xl lg:text-[4.375rem] leading-[1.1] mb-5 font-orbit tracking-normal text-white"
            stagger={0.06}
          />

          {/* SECOND LINE - Delayed Blink (1.2s delay requested) */}
          <CharacterReveal
            text="We Don’t Build Systems. We Build Unfair Advantages."
            className="text-base md:text-lg lg:text-xl mb-6 font-orbit text-white/90 max-w-full sm:max-w-[90%] md:max-w-[80%]"
            delay={1.5}
            stagger={0.04}
          />

          {/* PREVIOUS UI (Original Hero Learn More Button):
          <div ref={buttonRef}>
            <Link
              href="/about"
              className="
                inline-block bg-transparent border border-white text-white
                hover:bg-white hover:text-black
                px-8 py-3 mt-3 transition-colors duration-200
                font-orbit text-sm md:text-base tracking-widest uppercase
              "
            >
              Learn More
            </Link>
          </div>
          */}
        </div>
      </div>
    </section>
  )
}
