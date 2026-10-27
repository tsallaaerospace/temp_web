"use client"

import type React from "react"
import { motion } from "framer-motion"
import CharacterReveal from "@/components/CharacterReveal"

// PREVIOUS UI: a Clash Grotesk heading in white over a darkened background photo
// (/shared/images/abb6bab613d7d967786b922562d07d61f60f873e-3840x2160.jpg, bg-black/70 overlay),
// with a translucent white "Request a Demo" button. It now uses the FENIX closing section's Orbit type and
// letter-by-letter reveal, kept on the BAT background photo, so the text is white with a cyan "DEPLOY".
export default function BatLast(): React.JSX.Element {
  // PREVIOUS UI:
  // <section data-bat-section="contact" className="font-orbit relative h-screen w-full overflow-hidden bg-black flex flex-col items-center justify-center">
  return (
    <section data-bat-section="contact" className="font-orbit relative min-h-[100svh] md:min-h-screen h-[100dvh] w-full overflow-hidden bg-black flex flex-col items-center justify-center">
      <img
        src="/product/T-BAT/DJI_20251007120547_0075_D-frame-at-0m35s.jpg"
        alt=""
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      {/* PREVIOUS UI:
      <div className="relative z-20 container mx-auto translate-y-[14vh] px-6 text-center">
      */}
      <div className="relative z-20 container mx-auto translate-y-[4vh] xs:translate-y-[6vh] sm:translate-y-[10vh] lg:translate-y-[14vh] px-6 text-center max-w-6xl lg:max-w-[90rem] 3xl:max-w-[110rem] uw:max-w-[130rem]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center"
        >
          {/* PREVIOUS UI: every word used CharacterReveal; now only the cyan "DEPLOY" is revealed letter by letter */}
          {/* PREVIOUS UI: rem-based text-6xl through lg:text-8xl; FENIx uses 60/72/96px. */}
          {/* PREVIOUS UI (text-[60px] xs:text-[72px] md:text-[72px] lg:text-[96px]):
          <h1 className="text-[60px] xs:text-[72px] md:text-[72px] lg:text-[96px] font-normal text-white tracking-[0.05em] leading-[1.05] max-w-6xl lg:max-w-[90rem] text-center uppercase flex flex-col items-center gap-y-2">
          */}
          <h1 className="text-[clamp(1.85rem,7vw,2.75rem)] xs:text-[clamp(2.25rem,7.5vw,3.5rem)] sm:text-6xl md:text-7xl lg:text-8xl 3xl:text-9xl uw:text-[10rem] font-normal text-white tracking-[0.05em] leading-[1.05] max-w-6xl lg:max-w-[90rem] 3xl:max-w-[110rem] uw:max-w-[130rem] text-center uppercase flex flex-col items-center gap-y-2">
            <div className="flex flex-wrap justify-center gap-x-3 sm:gap-x-4">
              <span>READY</span>
              <span>TO</span>
              <CharacterReveal text="DEPLOY" targetColor="#5ce1e6" glowColor="#5ce1e6" className="!w-auto text-[#5ce1e6]" lineClassName="!inline !w-auto !text-center" stagger={0.05} />
              <span>WHERE</span>
            </div>
            <div className="flex flex-wrap justify-center gap-x-3 sm:gap-x-4">
              <span>OTHERS</span>
              <span>CANNOT.</span>
            </div>
          </h1>
          {/* PREVIOUS UI: hover only brightened the translucent fill (hover:bg-white/20).
              Now the footer's "View Careers" hover: a white fill slides up and the text turns black. */}
          {/* PREVIOUS UI:
          <button className="group relative mt-12 overflow-hidden bg-white/10 border border-white/20 backdrop-blur-sm py-3 px-8">
          */}
          <button className="group relative mt-6 sm:mt-8 lg:mt-12 3xl:mt-14 overflow-hidden bg-white/10 border border-white/20 backdrop-blur-sm py-3 px-8">
            <span className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <span className="relative z-10 text-white text-xs sm:text-sm tracking-widest uppercase group-hover:text-black transition-colors duration-300">
              Request a Demo
            </span>
          </button>
        </motion.div>
      </div>

      {/* Bottom Decorative Element */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-[#5ce1e6] to-transparent opacity-30" />
    </section>
  )
}
