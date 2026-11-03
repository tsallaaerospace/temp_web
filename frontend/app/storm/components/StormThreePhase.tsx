"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView, useReducedMotion } from "framer-motion"
import ProductHeading from "@/components/ProductHeading"
import CharacterReveal from "@/components/CharacterReveal"

export default function StormThreePhase() {
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { amount: 0.3 })
  const reduceMotion = useReducedMotion()
  const [imageReady, setImageReady] = useState(false)
  const imageRef = useRef<HTMLImageElement>(null)
  useEffect(() => {
    // Cached images can finish loading before React attaches the load handler.
    if (imageRef.current?.complete && imageRef.current.naturalWidth > 0) setImageReady(true)
  }, [])
  const hidden = { opacity: reduceMotion ? 1 : 0, transform: reduceMotion ? "translateY(0)" : "translateY(75svh)" }

  return (
    <section ref={sectionRef} data-storm-section="three-phase" aria-labelledby="storm-three-phase-title" className="storm-three-phase relative h-[100svh] w-full overflow-hidden bg-black">
      <picture>
        <source media="(max-width: 767px)" srcSet="/product/STORM/3%20phase%20mobile.png" />
        <img
          src="/product/STORM/3%20phase%20destop.png"
          alt="Three panels showing an offshore flight deck, desert dunes and snowy mountains"
          className="absolute inset-0 h-full w-full object-cover object-center"
          loading="lazy"
          decoding="async"
        />
      </picture>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-black/50 to-transparent" />
      <ProductHeading id="storm-three-phase-title" className="storm-three-heading product-title-position product-title-fit grid grid-cols-3 text-center text-white">
        {/* PREVIOUS UI: Built / Beyond / Boundaries. */}
        <span className="flex items-center justify-center">Ready.</span>{" "}
        <span className="flex items-center justify-center"><CharacterReveal text="Rugged." targetColor="#5ce1e6" glowColor="#5ce1e6" stagger={0.06} /></span>{" "}
        <span className="flex items-center justify-center">Relentless.</span>
      </ProductHeading>
      {/* PREVIOUS UI: This section displayed only the three-panel background and title. */}
      {/* PREVIOUS UI: Desktop width min(78vw,120svh); mobile width min(180vw,100svh). */}
      <div className="storm-three-drone pointer-events-none absolute left-1/2 top-[-10%] w-[min(133vw,204svh)] -translate-x-1/2 select-none">
        <motion.img
          ref={imageRef}
          src="/product/STORM/STORM%20top%20veiw.png"
          alt="STORM drone viewed from above"
          className="h-auto w-full max-w-none"
          initial={hidden}
          animate={inView && imageReady ? { opacity: 1, transform: "translateY(0)" } : hidden}
          transition={{ duration: reduceMotion ? 0 : 1.5, delay: reduceMotion ? 0 : 0.2, ease: [0.16, 1, 0.3, 1] }}
          onLoad={() => setImageReady(true)}
          loading="lazy"
          decoding="async"
        />
      </div>
    </section>
  )
}
