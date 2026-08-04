"use client"

import Image from "next/image"
import ContentWrapper from "@/components/ContentWrapper"
import { motion } from "framer-motion"

export default function WhatWeDo() {
  const marqueeItems = new Array(15).fill("AUTONOMY FOR THE WORLD")

  const MarqueeContent = () => (
    <div className="flex whitespace-nowrap items-center">
      {marqueeItems.map((text, i) => (
        <div key={i} className="flex items-center">
          <span className="text-[#666] text-[10px] md:text-xs tracking-[0.25em] font-orbit uppercase pr-4 md:pr-8">
            {text}
          </span>
          <span className="text-[#444] text-[6px] md:text-[8px] pr-4 md:pr-8">■</span>
        </div>
      ))}
    </div>
  )

  return (
    <section className="bg-white text-black min-h-[140vh] flex flex-col font-orbit overflow-hidden relative pt-8 md:pt-12 justify-between">
      <ContentWrapper className="flex-grow flex flex-col w-full h-full mb-10 md:mb-16">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-8 md:mb-14 gap-6 md:gap-12 mt-2 md:mt-4">
          <h2 className="text-3xl md:text-4xl lg:text-[3.5rem] xl:text-[4rem] font-semibold tracking-[0.05em] uppercase" style={{ lineHeight: 0.9 }}>
            OUR STORY
          </h2>
          <p className="text-[10px] md:text-[11px] lg:text-xs text-justify font-light leading-[1.8] text-neutral-600 max-w-[25rem] pt-2 md:pt-10 lg:pt-14 md:mr-4 lg:mr-14 xl:mr-30">
            When disasters strike or borders need protection, our UAVs rise to the challenge. Engineered for both civil
            missions and combat-ready roles, they carry more than technology — they carry trust. Through vision and
            design excellence, we're helping India own its place in the skies.
          </p>
        </div>

        {/* Image Display */}
        <div className="relative w-full aspect-[4/5] sm:aspect-square md:aspect-auto md:h-[85vh] lg:h-[100vh] overflow-hidden flex-grow">
          <Image
            src="/images/design-mode/c30de4a3e1c213e28f4b49a5d01d81652fca6f51-1536x1024.png"
            alt="What We Do - Tsalla Aerospace"
            fill
            className="object-cover object-top md:object-center"
            priority
          />
        </div>
      </ContentWrapper>

      {/* Marquee Banner */}

    </section>
  )
}
