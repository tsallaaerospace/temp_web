"use client"

import type React from "react"
import Link from "next/link"
import { useEffect, useRef } from "react"
import { motion, useInView } from "framer-motion"
import CharacterReveal from "@/components/CharacterReveal"

export default function FenixLast({ backgroundVideoSrc }: { backgroundVideoSrc?: string }): React.JSX.Element {
  const textColor = backgroundVideoSrc ? "#ffffff" : "#000000"
  const videoRef = useRef<HTMLVideoElement>(null)
  const videoInView = useInView(videoRef, { amount: 0.25 })

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (videoInView) {
      video.currentTime = 0
      void video.play().catch(() => {})
    } else {
      video.pause()
    }
    return () => video.pause()
  }, [videoInView, backgroundVideoSrc])

  return (
    <>


      {/* PREVIOUS UI:
      <section className="font-orbit relative min-h-screen w-full overflow-hidden bg-white flex flex-col items-center justify-center">
      */}
      <section className="font-orbit relative min-h-[100svh] md:min-h-screen w-full overflow-hidden bg-white flex flex-col items-center justify-center">
        {backgroundVideoSrc && <video
          ref={videoRef}
          src={backgroundVideoSrc}
          muted
          playsInline
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
        />}
        {/* Content Container */}
        {/* PREVIOUS UI:
        <div className={`relative z-20 container mx-auto px-6 text-center ${backgroundVideoSrc ? "translate-y-[14vh]" : ""}`}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            <h1 className={`${backgroundVideoSrc ? "text-[60px] xs:text-[72px] md:text-[72px] lg:text-[96px] font-normal text-white" : "text-6xl xs:text-7xl md:text-7xl lg:text-8xl font-semibold text-black"} tracking-[0.05em] leading-[1.05] max-w-6xl lg:max-w-[90rem] text-center uppercase flex flex-col items-center gap-y-2`}>
              <div className="flex flex-wrap justify-center gap-x-3 sm:gap-x-4">
                <CharacterReveal text="READY" targetColor={textColor} glowColor="#5ce1e6" className="!w-auto" lineClassName="!inline !w-auto !text-center" stagger={0.05} />
                <CharacterReveal text="TO" targetColor={textColor} glowColor="#5ce1e6" className="!w-auto" lineClassName="!inline !w-auto !text-center" stagger={0.05} />
                <CharacterReveal text="DEPLOY" targetColor="#5ce1e6" glowColor="#5ce1e6" className="!w-auto text-[#5ce1e6]" lineClassName="!inline !w-auto !text-center" stagger={0.05} />
                <CharacterReveal text="WHERE" targetColor={textColor} glowColor="#5ce1e6" className="!w-auto" lineClassName="!inline !w-auto !text-center" stagger={0.05} />
              </div>
              <div className="flex flex-wrap justify-center gap-x-3 sm:gap-x-4">
                <CharacterReveal text="OTHERS" targetColor={textColor} glowColor="#5ce1e6" className="!w-auto" lineClassName="!inline !w-auto !text-center" stagger={0.05} />
                <CharacterReveal text="CANNOT." targetColor={textColor} glowColor="#5ce1e6" className="!w-auto" lineClassName="!inline !w-auto !text-center" stagger={0.05} />
              </div>
            </h1>
            <Link href="/contact" className={`group relative mt-10 inline-flex min-h-12 items-center justify-center overflow-hidden border px-8 py-3 text-sm uppercase tracking-widest backdrop-blur-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 ${backgroundVideoSrc ? "border-white/30 bg-white/10 text-white hover:text-black focus-visible:outline-white" : "border-black/30 bg-black/5 text-black hover:text-white focus-visible:outline-black"}`}>
              <span aria-hidden="true" className={`absolute inset-0 translate-y-full transition-transform duration-300 group-hover:translate-y-0 motion-reduce:transition-none ${backgroundVideoSrc ? "bg-white" : "bg-black"}`} />
              <span className="relative">Request a Demo</span>
            </Link>
          </motion.div>
        </div>
        */}
        <div className={`relative z-20 container mx-auto px-4 sm:px-6 text-center ${backgroundVideoSrc ? "translate-y-[4vh] xs:translate-y-[6vh] sm:translate-y-[10vh] lg:translate-y-[14vh]" : ""}`}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            <h1 className={`${backgroundVideoSrc ? "text-[clamp(1.85rem,7vw,2.75rem)] xs:text-[clamp(2.25rem,7.5vw,3.5rem)] sm:text-[60px] md:text-[72px] lg:text-[96px] font-normal text-white" : "text-4xl xs:text-5xl sm:text-7xl md:text-7xl lg:text-8xl font-semibold text-black"} tracking-[0.05em] leading-[1.08] sm:leading-[1.05] max-w-6xl lg:max-w-[90rem] text-center uppercase flex flex-col items-center gap-y-1 sm:gap-y-2`}>
              <div className="flex flex-wrap justify-center gap-x-2 sm:gap-x-3 md:gap-x-4">
                <CharacterReveal text="READY" targetColor={textColor} glowColor="#5ce1e6" className="!w-auto" lineClassName="!inline !w-auto !text-center" stagger={0.05} />
                <CharacterReveal text="TO" targetColor={textColor} glowColor="#5ce1e6" className="!w-auto" lineClassName="!inline !w-auto !text-center" stagger={0.05} />
                <CharacterReveal text="DEPLOY" targetColor="#5ce1e6" glowColor="#5ce1e6" className="!w-auto text-[#5ce1e6]" lineClassName="!inline !w-auto !text-center" stagger={0.05} />
                <CharacterReveal text="WHERE" targetColor={textColor} glowColor="#5ce1e6" className="!w-auto" lineClassName="!inline !w-auto !text-center" stagger={0.05} />
              </div>
              <div className="flex flex-wrap justify-center gap-x-2 sm:gap-x-3 md:gap-x-4">
                <CharacterReveal text="OTHERS" targetColor={textColor} glowColor="#5ce1e6" className="!w-auto" lineClassName="!inline !w-auto !text-center" stagger={0.05} />
                <CharacterReveal text="CANNOT." targetColor={textColor} glowColor="#5ce1e6" className="!w-auto" lineClassName="!inline !w-auto !text-center" stagger={0.05} />
              </div>
            </h1>
            <Link href="/contact" className={`group relative mt-6 sm:mt-8 lg:mt-10 inline-flex min-h-12 items-center justify-center overflow-hidden border px-8 py-3 text-sm uppercase tracking-widest backdrop-blur-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 ${backgroundVideoSrc ? "border-white/30 bg-white/10 text-white hover:text-black focus-visible:outline-white" : "border-black/30 bg-black/5 text-black hover:text-white focus-visible:outline-black"}`}>
              <span aria-hidden="true" className={`absolute inset-0 translate-y-full transition-transform duration-300 group-hover:translate-y-0 motion-reduce:transition-none ${backgroundVideoSrc ? "bg-white" : "bg-black"}`} />
              <span className="relative">Request a Demo</span>
            </Link>

          </motion.div>
        </div>

        {/* Bottom Decorative Element */}
        {/* PREVIOUS UI:
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-[#5ce1e6] to-transparent opacity-30" />
        */}
        <div className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 w-px h-16 sm:h-20 bg-gradient-to-b from-[#5ce1e6] to-transparent opacity-30 pointer-events-none" />
      </section>
    </>
  )
}
