"use client"

import React from "react"
import { motion } from "framer-motion"
import { Eye, Search, Package, LandPlot } from "lucide-react"

export default function FenixResponder2(): React.JSX.Element {
  /* PREVIOUS MOBILE UI: icons used `h-4 w-4`, title used `text-xs`/`text-sm`, description used `text-[10px]`/`text-xs text-neutral-600`. */
  const steps = [
    {
      icon: <Eye className="h-5 w-5 text-[#5ce1e6] sm:h-6 sm:w-6" />,
      title: "Advance Intel",
      desc: "Provides live situational awareness ahead of teams",
    },
    {
      icon: <Search className="h-5 w-5 text-[#5ce1e6] sm:h-6 sm:w-6" />,
      title: "Search & Detect",
      desc: "Finds survivors or threats before humans enter",
    },
    {
      icon: <Package className="h-5 w-5 text-[#5ce1e6] sm:h-6 sm:w-6" />,
      title: "Rapid Delivery",
      desc: "Delivers critical supplies in places responders can't reach yet",
    },
    {
      icon: <LandPlot className="h-5 w-5 text-[#5ce1e6] sm:h-6 sm:w-6" />,
      title: "Clearance",
      desc: "Guides safe paths in unstable or cluttered terrain",
    },
  ]

  // PREVIOUS UI: <section className="bg-neutral-950 py-24 px-4 overflow-hidden">
  // PREVIOUS FRAME HEIGHT: sm:h-auto left desktop height determined only by its content.
  return (
    <section className="h-[100svh] overflow-hidden bg-neutral-950 px-2.5 pb-12 pt-5 sm:h-auto sm:px-4 sm:py-24 md:min-h-[100dvh] font-orbit">
      {/* PREVIOUS UI: <div className="max-w-7xl mx-auto"> */}
      <div className="mx-auto flex h-full max-w-7xl flex-col sm:block sm:h-auto">
        {/* Header */}
        {/* PREVIOUS UI: <div className="text-center mb-16"> */}
        <div className="mb-4 shrink-0 text-center sm:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            /* PREVIOUS UI: className="text-white text-5xl md:text-6xl font-medium mb-4" */
            /* PREVIOUS UI: style={{ fontFamily: "'ClashGrotesk Bold (.eot)', sans-serif" }} */
            className="mb-0 text-[clamp(1.7rem,8.5vw,2.25rem)] font-medium leading-[1.04] text-white sm:mb-4 sm:text-5xl sm:leading-[1] md:text-6xl"
          >
            How it acts as the <span className="block sm:inline">First Responder</span>
          </motion.h2>
        </div>

        {/* Support Grid */}
        {/* PREVIOUS UI: mobile used `gap-6` with content-height rows and no frame-height constraint. */}
        <div className="grid min-h-0 flex-1 grid-cols-1 grid-rows-4 gap-2 sm:flex-none sm:grid-rows-none sm:gap-6 md:grid-cols-4 md:gap-0 md:overflow-hidden md:rounded-xl md:border md:border-neutral-800 md:shadow-2xl">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              /* PREVIOUS MOBILE UI: `p-2.5` on mobile. */
              className="group relative flex min-h-0 flex-col items-start justify-center overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900 p-3 shadow-xl transition-all duration-300 hover:bg-neutral-800/50 sm:min-h-[180px] sm:justify-start sm:rounded-2xl sm:p-4 md:min-h-[300px] md:rounded-none md:border-0 md:border-r md:p-8 md:shadow-none md:last:border-r-0"
            >
              {/* Icon Container */}
              {/* PREVIOUS MOBILE UI: `h-7 w-7 mb-1.5`. */}
              <div className="mb-2 flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-md border border-neutral-700 bg-neutral-800/50 shadow-inner sm:mb-4 sm:h-10 sm:w-10 sm:rounded-lg md:mb-8 md:h-12 md:w-12">
                {step.icon}
              </div>

              {/* Text */}
              {/* PREVIOUS MOBILE UI: title used `text-sm font-medium`. */}
              {/* PREVIOUS UI: style={{ fontFamily: "'ClashGrotesk Bold (.eot)', sans-serif" }} */}
              <h3 className="mb-1 text-base font-semibold leading-tight text-white sm:mb-2 sm:text-lg md:mb-3 md:text-2xl">
                {step.title}
              </h3>
              {/* PREVIOUS MOBILE UI: description used `text-xs font-light text-neutral-600`. */}
              <p className="mb-0 line-clamp-2 text-xs sm:text-sm font-normal leading-[1.35] text-neutral-300 sm:mb-2 sm:line-clamp-none sm:leading-relaxed md:mb-4 md:text-xl">
                {step.desc}
              </p>

              {/* Decorative Arrow (Visible only on desktop where cards are joined) */}
              {index < steps.length - 1 && (
                <div className="absolute top-1/2 -right-3 -translate-y-1/2 z-10 hidden md:block">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 4L16 12L8 20" stroke="#333" strokeWidth="1" />
                  </svg>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
