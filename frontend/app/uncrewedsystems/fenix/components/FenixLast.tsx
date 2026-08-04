"use client"

import type React from "react"
import { motion } from "framer-motion"

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
            <h1 className="text-5xl md:text-7xl lg:text-7xl font-semibold text-black tracking-[0.05em] leading-[1.05] max-w-5xl text-center uppercase">
              <span className="block">Ready to <span className="text-[#5ce1e6]">Deploy</span> Where</span>
              <span className="block">Others Cannot.</span>
            </h1>


          </motion.div>
        </div>

        {/* Bottom Decorative Element */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-[#5ce1e6] to-transparent opacity-30" />
      </section>
    </>
  )
}
