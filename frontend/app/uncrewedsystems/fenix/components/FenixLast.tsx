"use client"

import type React from "react"
import { motion } from "framer-motion"
import CharacterReveal from "@/components/CharacterReveal"

export default function FenixLast(): React.JSX.Element {
  return (
    <>


      <section className="font-orbit relative min-h-screen w-full overflow-hidden bg-white flex flex-col items-center justify-center">
        {/* Content Container */}
        <div className="relative z-20 container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            {/* PREVIOUS UI:
            <h1 className="text-5xl md:text-7xl lg:text-7xl font-semibold text-black tracking-[0.05em] leading-[1.05] max-w-5xl text-center uppercase">
              <span className="block">Ready to <span className="text-[#5ce1e6]">Deploy</span> Where</span>
              <span className="block">Others Cannot.</span>
            </h1>
            */}
            {/* PREVIOUS ALIGNMENT: CharacterReveal defaults to `w-full`, making every word occupy its own flex row. */}
            {/* PREVIOUS UI: `text-5xl md:text-7xl lg:text-7xl max-w-5xl` was smaller than the comparable Mesh/AI Pilot closing headings. */}
            {/* PREVIOUS ATTEMPT: `sm:text-5xl md:text-6xl` made tablet text smaller than the original heading. */}
            <h1 className="text-6xl xs:text-7xl md:text-7xl lg:text-8xl font-semibold text-black tracking-[0.05em] leading-[1.05] max-w-6xl lg:max-w-[90rem] text-center uppercase flex flex-col items-center gap-y-2">
              <div className="flex flex-wrap justify-center gap-x-3 sm:gap-x-4">
                <CharacterReveal text="READY" targetColor="#000000" glowColor="#5ce1e6" className="!w-auto" lineClassName="!inline !w-auto !text-center" stagger={0.05} />
                <CharacterReveal text="TO" targetColor="#000000" glowColor="#5ce1e6" className="!w-auto" lineClassName="!inline !w-auto !text-center" stagger={0.05} />
                <CharacterReveal text="DEPLOY" targetColor="#5ce1e6" glowColor="#5ce1e6" className="!w-auto text-[#5ce1e6]" lineClassName="!inline !w-auto !text-center" stagger={0.05} />
                <CharacterReveal text="WHERE" targetColor="#000000" glowColor="#5ce1e6" className="!w-auto" lineClassName="!inline !w-auto !text-center" stagger={0.05} />
              </div>
              <div className="flex flex-wrap justify-center gap-x-3 sm:gap-x-4">
                <CharacterReveal text="OTHERS" targetColor="#000000" glowColor="#5ce1e6" className="!w-auto" lineClassName="!inline !w-auto !text-center" stagger={0.05} />
                <CharacterReveal text="CANNOT." targetColor="#000000" glowColor="#5ce1e6" className="!w-auto" lineClassName="!inline !w-auto !text-center" stagger={0.05} />
              </div>
            </h1>


          </motion.div>
        </div>

        {/* Bottom Decorative Element */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-[#5ce1e6] to-transparent opacity-30" />
      </section>
    </>
  )
}
