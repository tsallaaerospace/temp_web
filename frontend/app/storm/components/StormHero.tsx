"use client"
import React, { useEffect, useState } from "react"
import type { JSX } from "react"

export default function StormHero(): React.JSX.Element {
  const [showSubtitle, setShowSubtitle] = useState(false)
  // Dynamically load the Clash Grotesk font
  useEffect(() => {
    const link = document.createElement("link")
    link.href = "https://fonts.googleapis.com/css2?family=Clash+Grotesk:wght@400;500;700&display=swap"
    link.rel = "stylesheet"
    document.head.appendChild(link)
    return () => {
      document.head.removeChild(link)
    }
  }, [])

  return (
    <section
      aria-label="STORM hero video"
      className="relative h-screen w-full text-white overflow-hidden"
      style={{ fontFamily: "'Clash Grotesk', Arial, sans-serif" }}
    >

      {/* PREVIOUS UI: video used loop for continuous playback. */}
      {/* PREVIOUS POSTER: https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2070&auto=format&fit=crop */}
      <video
        autoPlay
        muted
        playsInline
        preload="auto"
        onTimeUpdate={({ currentTarget: video }) => {
          if (!showSubtitle && video.currentTime >= 5.1) setShowSubtitle(true)
        }}
        onEnded={({ currentTarget: video }) => {
          video.pause()
          // The hero clip has its black tail removed; hold inside its final decoded frame.
          // PREVIOUS UI: original clip used video.duration - 0.1 after briefly playing its black tail.
          video.currentTime = Math.max(0, video.duration - 0.001)
        }}
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        {/* PREVIOUS VIDEO: https://shield.ai/wp-content/uploads/2025/03/avenger-3.mp4 */}
        {/* PREVIOUS VIDEO: /product/STORM/STORM%20V2.mp4 included black ending frames. */}
        <source src="/product/STORM/storm-v2-hero.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>


      {/* PREVIOUS UI:
      <div className="relative z-20 w-full h-full flex flex-col justify-end px-4 sm:px-6 md:px-8 pb-[26%] sm:pb-[20%] md:pb-[22%] lg:flex-row lg:justify-between lg:items-end lg:px-20 lg:pb-[12%]">
      */}
      {/* PREVIOUS UI:
      <div className="relative z-20 w-full h-full flex flex-col justify-end px-4 sm:px-6 md:px-8 pb-10 sm:pb-12 md:pb-16 lg:flex-row lg:justify-between lg:items-end lg:px-20 lg:pb-16">
      */}
      {/* PREVIOUS UI:
      <div className="relative z-20 w-full h-full flex flex-col justify-start pt-28 px-4 sm:px-6 md:px-8 pb-10 sm:pb-12 md:pb-16 lg:flex-row lg:justify-between lg:items-end lg:px-20 lg:pb-16 lg:pt-0">
      */}
      {/* PREVIOUS UI: subtitle was left-aligned in a full-height flex container. */}
      {/* PREVIOUS UI: bottom padding was pb-10 md:pb-16. */}
      {/* PREVIOUS UI: bottom padding was pb-7 md:pb-[52px]. */}
      {/* PREVIOUS UI: bottom padding was pb-4 md:pb-10. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex justify-center px-4 pb-2 md:pb-8">

        <div className="w-full text-center">
          {/* PREVIOUS UI:
          <h1
            className="text-white font-bold text-[2rem] sm:text-[2.75rem] md:text-[3.75rem] lg:text-[4.5rem] leading-tight tracking-tight mb-4"
            style={{ letterSpacing: "-0.03em" }}
          >
            STORM
          </h1>
          */}
          {/* PREVIOUS UI:
          <h1
            className="text-white font-bold text-[2rem] sm:text-[2.75rem] md:text-[3.75rem] lg:text-[4.5rem] leading-none tracking-tight mb-1"
            style={{ letterSpacing: "-0.03em" }}
          >
            STORM
          </h1>
          */}
          {/* PREVIOUS UI:
          <h1
            className="text-white font-bold text-[3.25rem] sm:text-[3.75rem] md:text-[3.75rem] lg:text-[4.5rem] leading-none tracking-tight mb-1"
            style={{ letterSpacing: "-0.03em" }}
          >
            STORM
          </h1>
          */}
          {/* PREVIOUS UI: subtitle was always visible, text-base through md:text-xl, inheriting the section font. */}
          {showSubtitle && <p
            className="font-orbit text-white text-[clamp(20px,2.2vw,36px)] font-normal tracking-wide text-balance drop-shadow-md"
            style={{ letterSpacing: "0.01em" }}
          >
            Smart Transport Operations for Rugged Missions
          </p>}
        </div>


        {/* PREVIOUS UI:
        <div className="max-w-full lg:max-w-md text-left text-neutral-600 text-sm sm:text-base md:text-lg font-light leading-relaxed tracking-wide text-balance lg:flex lg:flex-col lg:justify-end">
          Where intelligent flight meets relentless endurance, offshore operations stay connected, supplied, and secure
          — even when the weather turns against you. This is aerial logistics, redefined for the world's toughest
          environments.
        </div>
        */}
        {/* PREVIOUS UI:
        <div className="max-w-full lg:max-w-md text-left text-white text-sm sm:text-base md:text-lg font-light leading-relaxed tracking-wide text-balance lg:flex lg:flex-col lg:justify-end">
          Where intelligent flight meets relentless endurance, offshore operations stay connected, supplied, and secure
          — even when the weather turns against you. This is aerial logistics, redefined for the world's toughest
          environments.
        </div>
        */}
      </div>
    </section>
  )
}
