"use client"

import { useEffect, useRef } from "react"
import { motion, useReducedMotion } from "framer-motion"
import ProductHeading from "@/components/ProductHeading"
import CharacterReveal from "@/components/CharacterReveal"

export default function BatBatterySwap() {
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const section = sectionRef.current
    const video = videoRef.current
    if (!section || !video) return
    let visible = false
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
    const updatePlayback = () => {
      if (visible && !document.hidden && !reducedMotion.matches) {
        void video.play().catch(() => {})
      } else video.pause()
    }
    const observer = new IntersectionObserver((entries) => {
      // Latest entry: one batch can also hold an older state (e.g. after a reload restores the scroll position)
      const entry = entries[entries.length - 1]
      visible = entry.isIntersecting
      updatePlayback()
    }, { threshold: 0.25 })
    observer.observe(section)
    document.addEventListener("visibilitychange", updatePlayback)
    reducedMotion.addEventListener("change", updatePlayback)
    return () => {
      observer.disconnect()
      document.removeEventListener("visibilitychange", updatePlayback)
      reducedMotion.removeEventListener("change", updatePlayback)
      video.pause()
    }
  }, [])

  // PREVIOUS UI:
  // <section ref={sectionRef} data-battery-swap className="bat-battery-section text-white font-orbit" aria-labelledby="bat-battery-title">
  return (
    <section ref={sectionRef} data-battery-swap className="bat-battery-section text-white font-orbit max-w-[120rem] 3xl:max-w-[140rem] mx-auto" aria-labelledby="bat-battery-title">
      <header>
        {/* PREVIOUS UI (Battery Swapping / Fresh power. Ready for the next mission.):
        <ProductHeading id="bat-battery-title">Battery <CharacterReveal text="Swapping" targetColor="#5ce1e6" glowColor="#5ce1e6" stagger={0.06} /></ProductHeading>
        <motion.p className="product-body max-w-2xl text-neutral-300" initial={{ opacity: 0, y: reduceMotion ? 0 : 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: reduceMotion ? 0 : 0.8, delay: reduceMotion ? 0 : 0.2 }}>Fresh power. Ready for the next mission.</motion.p>
        */}
        <ProductHeading id="bat-battery-title">Land. Swap. <CharacterReveal text="Redeploy" targetColor="#5ce1e6" glowColor="#5ce1e6" stagger={0.06} /></ProductHeading>
        <motion.p className="product-body max-w-2xl text-neutral-300" initial={{ opacity: 0, y: reduceMotion ? 0 : 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: reduceMotion ? 0 : 0.8, delay: reduceMotion ? 0 : 0.2 }}>Fresh power. Rapid mission turn around.</motion.p>
      </header>
      <div className="bat-battery-stage">
        <video
          ref={videoRef}
          src="/product/T-BAT/Batman_Battery.mp4"
          poster="/product/T-BAT/battery-poster.webp"
          muted
          loop
          playsInline
          preload="metadata"
          aria-label="T-BAT battery swapping animation"
        />
      </div>
    </section>
  )
}
