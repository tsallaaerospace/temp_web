"use client"

import { motion, useReducedMotion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

export default function StormLast() {
  const reduceMotion = useReducedMotion()

  return (
    <section data-storm-section="contact" aria-labelledby="storm-contact-title" className="relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden bg-black font-orbit">
      {/* PREVIOUS UI: Background used STORM_Deployed Where Others Cannot.JPG. */}
      {/* PREVIOUS UI: className="object-cover" (drone sat behind the headline). Enlarging from the bottom edge lifts the drone above it. */}
      <Image src="/product/STORM/STORM_Deployed%20Where%20Others%20Cannot.png" alt="" fill sizes="100vw" className="object-cover origin-bottom scale-[1.25]" />
      <div aria-hidden="true" className="absolute inset-0 bg-black/45" />
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: reduceMotion ? 0 : 0.8 }}
        // PREVIOUS UI: Content used pt-[25svh], placing the headline higher over the drone.
        // PREVIOUS UI: pt-[33svh] shifted the group down only slightly.
        className="relative z-10 mx-auto w-full max-w-[100rem] px-6 pb-20 pt-[45svh] text-center"
      >
        <h2 id="storm-contact-title" className="text-[clamp(2rem,5.1vw,6rem)] font-normal uppercase leading-[1.15] tracking-[0.05em] text-white">
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
