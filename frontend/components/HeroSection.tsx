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
    <>
      {/* PREVIOUS UI: section className="relative h-screen w-full bg-black overflow-hidden snap-start snap-always" */}
      <section className="relative h-[100dvh] sm:h-screen w-full bg-black overflow-hidden snap-start snap-always">
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
        {/* PREVIOUS UI: div className="relative z-20 w-full h-full flex flex-col justify-center items-start text-left px-8 sm:px-12 md:px-16 lg:px-24 pt-20 pb-32 md:pb-48" */}
        {/* PREVIOUS UI: div className="relative z-20 w-full h-full flex flex-col justify-start sm:justify-center items-start text-left px-5 sm:px-12 md:px-16 lg:px-24 pt-36 sm:pt-20 pb-10 sm:pb-32 md:pb-48" */}
        <div
          className="
            relative z-20 w-full h-full
            flex flex-col
            justify-start sm:justify-center items-start text-left
            px-5 sm:px-12 md:px-16 lg:px-24
            pt-44 sm:pt-20 pb-10 sm:pb-32 md:pb-48
          "
        >
          {/* PREVIOUS UI: div className="w-full max-w-4xl -mt-6 sm:mt-0" */}
          <div className="w-full max-w-4xl mt-0">
            {/* MAIN LINE - Digital Blink Animation */}
            {/* PREVIOUS UI: CharacterReveal text="UNMANNED..." className="font-bold text-4xl sm:text-5xl lg:text-[4.375rem]..." */}
            <CharacterReveal
              text={"UNMANNED.\nUNMATCHED.\nUNCOMPROMISED."}
              className="font-bold text-3xl sm:text-5xl lg:text-[4.375rem] leading-[1.1] mb-4 sm:mb-5 font-orbit tracking-normal text-white"
              stagger={0.06}
            />

            {/* SECOND LINE - Delayed Blink */}
            {/* PREVIOUS UI: CharacterReveal text="We Don’t Build Systems. We Build Unfair Advantages." className="text-sm sm:text-lg lg:text-xl..." */}
            <CharacterReveal
              text={"We Don’t Build Systems.\nWe Build Unfair Advantages."}
              className="text-sm sm:text-lg lg:text-xl mb-6 font-orbit text-white/90 max-w-full sm:max-w-[90%] md:max-w-[80%]"
              delay={1.5}
              stagger={0.04}
            />
          </div>
        </div>
      </section>
    </>
  )
}
