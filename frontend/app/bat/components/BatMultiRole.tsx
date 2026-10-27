"use client"

import type React from "react"
import { useRef } from "react"
import { motion, useInView, useReducedMotion } from "framer-motion"
import ProductHeading from "@/components/ProductHeading"
import CharacterReveal from "@/components/CharacterReveal"

// "Multi Role, Single Solution": one T-BAT over the four terrains it works in
// (forest, desert, mountains, city). Landscape screens get the side-by-side strips,
// portrait screens the stacked version. Images live in /product/T-BAT/multi-role-single-solution-*.
export default function BatMultiRole(): React.JSX.Element {
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { amount: 0.3 })
  const reduceMotion = useReducedMotion()
  // PREVIOUS UI:
  // <section ref={sectionRef} data-bat-section="multi-role" className="relative h-screen w-full overflow-hidden bg-black font-orbit text-white">
  return (
    <section ref={sectionRef} data-bat-section="multi-role" className="relative min-h-[100svh] h-[100dvh] md:h-screen w-full overflow-hidden bg-black font-orbit text-white">
      <picture>
        <source media="(orientation: portrait)" srcSet="/product/T-BAT/multi-role-single-solution-bg-mobile.webp" />
        <img
          src="/product/T-BAT/multi-role-single-solution-bg-desktop.webp"
          alt="T-BAT operating environments: forest, desert, mountains and city"
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
          decoding="async"
        />
      </picture>

      {/* Darkens the top of the photo so the title stays readable over the bright desert and sky */}
      <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-black/70 via-black/30 to-transparent" />

      {/* PREVIOUS UI: top-0 pt-20, two cyan words, and a separate heading scale. */}
      {/* Each word is centred on its own photo panel (title-panel-grid, image 2720 x 1536).
          PREVIOUS UI: "Multi" was text-left and the grid spanned only the side insets. */}
      {/* PREVIOUS HEADING TYPOGRAPHY:
      <ProductHeading className="product-title-position product-title-fit title-panel-grid [--panel-aspect:2720/1536] [--panels:4] [--mid:2] grid grid-cols-4 text-center tracking-[-0.03em]">
      */}
      <ProductHeading className="product-title-position product-title-fit title-panel-grid [--panel-aspect:2720/1536] [--panels:4] [--mid:2] grid grid-cols-4 text-center tracking-[-0.03em] text-[clamp(0.75rem,3.2vw,1.15rem)] sm:text-[clamp(1.1rem,2.8vw,2.25rem)] lg:text-[clamp(1.75rem,3.2vw,3.75rem)] 3xl:text-[clamp(2.5rem,3.5vw,4.5rem)]">
        <span className="flex items-center justify-center text-center">Multi</span>
        {/* PREVIOUS UI (White "Role"):
        <span className="flex items-center justify-center text-center">Role</span>
        */}
        <span className="flex items-center justify-center text-center text-[#5ce1e6]">
          <CharacterReveal text="Role" targetColor="#5ce1e6" glowColor="#5ce1e6" stagger={0.06} />
        </span>
        <span className="flex items-center justify-center text-center">Single</span>
        <span className="flex items-center justify-center text-center text-[#5ce1e6]">
          <CharacterReveal text="Solution" targetColor="#5ce1e6" glowColor="#5ce1e6" stagger={0.06} />
        </span>
      </ProductHeading>

      <motion.div
        initial={{ opacity: 0, y: reduceMotion ? 0 : "55%" }}
        animate={inView ? { opacity: 1, y: "0%" } : { opacity: 0, y: reduceMotion ? 0 : "55%" }}
        transition={{ duration: reduceMotion ? 0.2 : 1.5, delay: reduceMotion ? 0 : 0.2, ease: [0.16, 1, 0.3, 1] }}
        style={{ x: "-50%", aspectRatio: "3200 / 2195" }}
        // PREVIOUS UI: bottom-[8%], then bottom-[3%]; vertical position now lives in globals.css
        // PREVIOUS UI: drone width 116vw, top 32dvh (increased to width 138vw, top 26dvh in globals.css)
        className="bat-multi-role-drone absolute left-1/2 overflow-hidden pointer-events-none select-none max-w-[1850px] 2xl:max-w-[2120px] 3xl:max-w-[2380px] uw:max-w-[2780px]"
      >
        {/* Normalize the export's transparent padding to preserve the existing drone framing. */}
        <img
          src="/product/T-BAT/Tbat_Rear_Balanced_Propellers_Transparent_3200x3840.png"
          alt="T-BAT rear view with balanced propellers"
          className="absolute left-0 top-0 h-auto w-full max-w-none"
          style={{ transform: "translateY(-35.3385417%)" }}
          loading="lazy"
          decoding="async"
        />
      </motion.div>
    </section>
  )
}
