"use client"

import React from "react"
import { motion } from "framer-motion"
import { Eye, Search, Package, LandPlot } from "lucide-react"

export default function FenixResponder2(): React.JSX.Element {
  const steps = [
    {
      icon: <Eye className="w-6 h-6 text-[#5ce1e6]" />,
      title: "Advance Intel",
      desc: "Provides live situational awareness ahead of teams",
    },
    {
      icon: <Search className="w-6 h-6 text-[#5ce1e6]" />,
      title: "Search & Detect",
      desc: "Finds survivors or threats before humans enter",
    },
    {
      icon: <Package className="w-6 h-6 text-[#5ce1e6]" />,
      title: "Rapid Delivery",
      desc: "Delivers critical supplies in places responders can't reach yet",
    },
    {
      icon: <LandPlot className="w-6 h-6 text-[#5ce1e6]" />,
      title: "Clearance",
      desc: "Guides safe paths in unstable or cluttered terrain",
    },
  ]

  return (
    <section className="bg-neutral-950 py-24 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-white text-5xl md:text-6xl font-medium mb-4"
            style={{ fontFamily: "'ClashGrotesk Bold (.eot)', sans-serif" }}
          >
            How it acts as the First Responder
          </motion.h2>
        </div>

        {/* Support Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-0 md:border md:border-neutral-800 md:rounded-xl md:overflow-hidden md:shadow-2xl">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative p-4 md:p-8 flex flex-col items-start min-h-[180px] md:min-h-[300px] bg-neutral-900 border border-neutral-800 rounded-2xl md:rounded-none md:border-0 md:border-r md:last:border-r-0 hover:bg-neutral-800/50 transition-all duration-300 group shadow-xl md:shadow-none`}
            >
              {/* Icon Container */}
              <div className="w-10 h-10 md:w-12 md:h-12 bg-neutral-800/50 rounded-lg flex items-center justify-center mb-4 md:mb-8 border border-neutral-700 shadow-inner overflow-hidden">
                {step.icon}
              </div>

              {/* Text */}
              <h3 className="text-white text-lg md:text-2xl font-medium mb-2 md:mb-3" style={{ fontFamily: "'ClashGrotesk Bold (.eot)', sans-serif" }}>
                {step.title}
              </h3>
              <p className="text-sm md:text-xl font-light leading-relaxed text-neutral-600 mb-2 md:mb-4">
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
