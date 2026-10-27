"use client"

import { motion, useReducedMotion } from "framer-motion"
import Link from "next/link"

export default function MantisLast() {
  const reduceMotion = useReducedMotion()
  return (
    <section aria-labelledby="mantis-contact-title" data-mantis-section="contact" className="relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden bg-black font-orbit">
      {/* PREVIOUS UI:
      <img src="/product/T-BAT/DJI_20251007120547_0075_D-frame-at-0m35s.jpg" alt="" className="absolute inset-0 h-full w-full object-cover" loading="lazy" decoding="async" />
      */}
      {/* PREVIOUS UI (Rotated 180deg):
      <img
        src="/product/Mantis/2026_1018_174838_022-frame-at-0m40s.jpg"
        alt="MANTIS flight perspective"
        className="absolute inset-0 h-full w-full object-cover rotate-180"
        style={{ transform: "rotate(180deg)" }}
        loading="lazy"
        decoding="async"
      />
      */}
      <img
        src="/product/Mantis/2026_1018_174838_022-frame-at-0m40s.jpg"
        alt="MANTIS flight perspective"
        className="absolute inset-0 h-full w-full object-cover"
        loading="lazy"
        decoding="async"
      />
      <div className="absolute inset-0 bg-black/15" />
      <motion.div initial={reduceMotion ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: reduceMotion ? 0 : 0.8 }} className="relative z-10 mx-auto w-full max-w-[100rem] px-6 pb-20 pt-[25svh] text-center">
        <h2 id="mantis-contact-title" className="text-[clamp(2rem,5.1vw,6rem)] font-normal uppercase leading-[1.15] tracking-[0.05em] text-white">
          Ready to <span className="text-[#5ce1e6]">deploy</span> where<br className="hidden sm:block" /> others cannot.
        </h2>
        <Link href="/contact" className="group relative mt-10 inline-flex min-h-12 items-center justify-center overflow-hidden border border-white/30 bg-white/10 px-8 py-3 text-sm uppercase tracking-widest text-white backdrop-blur-sm transition-colors hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
          <span aria-hidden="true" className="absolute inset-0 translate-y-full bg-white transition-transform duration-300 group-hover:translate-y-0 motion-reduce:transition-none" />
          <span className="relative">Request a demo</span>
        </Link>
      </motion.div>
      <div aria-hidden="true" className="absolute bottom-10 left-1/2 h-16 w-px bg-gradient-to-b from-[#5ce1e6]/40 to-transparent" />
    </section>
  )
}
