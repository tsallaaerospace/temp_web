"use client"

import { ContentWrapper } from "@/components/ContentWrapper"
import type React from "react"
import Image from "next/image"

export default function StormCapabilities(): React.JSX.Element {
  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.cdnfonts.com/css/clash-grotesk');
      `}</style>

      <section className="flex flex-col md:flex-row items-center justify-center bg-white text-neutral-900 w-full min-h-screen py-12 md:py-20">
        <ContentWrapper>
          <div className="flex flex-col md:flex-row items-center justify-center gap-16 lg:gap-24">
            {/* Left Column: Image */}
            <div className="w-full md:w-5/12 flex justify-center">
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
              <h1
                className="section-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-none tracking-tight mb-8"
              >
                <span className="whitespace-nowrap">Resilient Offshore</span>
                <br />
                Autonomy
              </h1>
              <p className="section-description">
                Compact yet enduring, STORM combines smart flight, robust mesh teamwork, and adaptive delivery — keeping
                offshore operations supplied and secure in any conditions.
              </p>
            </div>
          </div>
        </ContentWrapper>
      </section>
    </>
  )
}
