"use client"

import { useRef } from "react"
import { motion, useInView, useReducedMotion } from "framer-motion"
import ProductHeading from "@/components/ProductHeading"
import CharacterReveal from "@/components/CharacterReveal"

export default function MantisThreePhase() {
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { amount: 0.3 })
  const reduceMotion = useReducedMotion()
  const hidden = { opacity: 0, transform: reduceMotion ? "translateY(0%)" : "translateY(45%)" }

  return (
    <section ref={sectionRef} data-mantis-section="three-phase" aria-label="MANTIS three-phase flight overview" className="relative h-[100svh] w-full overflow-hidden bg-black">
      <picture>
        <source media="(max-width: 767px)" srcSet="/product/Mantis/mantis-three-phase-mobile-bg.webp" />
      <img src="/product/Mantis/3_phase.png" alt="MANTIS three-phase flight overview" className="absolute inset-0 h-full w-full object-cover object-center" loading="lazy" decoding="async" />
      </picture>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-black/50 to-transparent" />
      {/* PREVIOUS UI (Built aligned left):
      <ProductHeading className="product-title-position product-title-fit grid grid-cols-3 text-center text-white">
        <span className="text-left">Built</span>{" "}<CharacterReveal text="Beyond" targetColor="#5ce1e6" glowColor="#5ce1e6" stagger={0.06} />{" "}<span>Boundaries.</span>
      </ProductHeading>
      */}
      {/* Each word is centred on its own photo panel (title-panel-grid, image 2752 x 1536); PREVIOUS UI: the grid spanned only the side insets */}
      <ProductHeading className="mantis-three-heading product-title-position product-title-fit title-panel-grid [--panel-aspect:2752/1536] [--panels:3] [--mid:1] grid grid-cols-3 text-center text-white">
        <span className="flex items-center justify-center text-center">Built</span>
        <span className="flex items-center justify-center text-center">
          <CharacterReveal text="Beyond" targetColor="#5ce1e6" glowColor="#5ce1e6" stagger={0.06} />
        </span>
        <span className="flex items-center justify-center text-center">Boundaries.</span>
      </ProductHeading>
      <div className="mantis-three-drone pointer-events-none absolute left-1/2 top-[16%] w-[162vw] -translate-x-1/2 select-none portrait:top-[23%] portrait:w-[225vw]">
        <motion.img
          src="/product/Mantis/3-phase-drone.png"
          alt="MANTIS drone layered over the three-phase flight background"
          className="h-auto w-full max-w-none"
          initial={hidden}
          animate={inView ? { opacity: 1, transform: "translateY(0%)" } : hidden}
          transition={{ duration: reduceMotion ? 0.2 : 1.5, delay: reduceMotion ? 0 : 0.2, ease: [0.16, 1, 0.3, 1] }}
          loading="lazy"
          decoding="async"
        />
      </div>
    </section>
  )
}
