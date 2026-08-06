"use client"

import type React from "react"
import { motion } from "framer-motion"
import FenixFUI2 from "./FenixFUI2"

export default function FenixSpecifications(): React.JSX.Element {
  const topSpecs = [
    { label: "Lift Capacity", value: "500", unit: "g" },
    { label: "Endurance", value: "20", unit: "mins" },
    { label: "Altitude (AGL)", value: "0.5-50", unit: "m" },
    { label: "Cruise Speed", value: "5", unit: "m/s" }
  ]

  const bottomSpecs = [
    { label: "Length", value: "308", unit: "mm" },
    { label: "Width", value: "340", unit: "mm" },
    { label: "Height", value: "100", unit: "mm" }
  ]

  return (
    <>
      {/* PREVIOUS UI: Clash Grotesk font import
      <style>{`
        @import url('https://fonts.cdnfonts.com/css/clash-grotesk');
        .font-clash-grotesk {
          font-family: 'Clash Grotesk', sans-serif !important;
        }
      `}</style>
      */}

      <div className="font-orbit bg-neutral-950 text-white w-full overflow-hidden">
        <FenixFUI2 />

        <div className="relative w-full bg-neutral-950">
          {/* PREVIOUS UI: className="flex h-[100svh] min-h-0 flex-col items-center justify-start px-2.5 pb-10 pt-1 sm:h-auto sm:min-h-screen sm:justify-center sm:px-4 sm:pb-12 sm:pt-6 md:px-8 md:pb-20 md:pt-10" */}
          <div className="flex min-h-screen flex-col items-center justify-start px-3 pb-12 pt-8 sm:min-h-screen sm:justify-center sm:px-4 sm:pb-16 sm:pt-12 md:px-8 md:pb-20 md:pt-16">

            {/* TITLE */}
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              /* PREVIOUS UI: className="mb-2 shrink-0 text-2xl font-bold tracking-widest text-white sm:mb-6 sm:text-4xl md:mb-8 md:text-7xl" */
              className="mt-2 mb-4 shrink-0 text-4xl font-bold tracking-widest text-white sm:mt-4 sm:mb-8 sm:text-5xl md:mb-10 md:text-7xl"
            >
              FENIx
            </motion.h2>

            {/* TOP SPECS ROW - Horizontal layout matching reference image */}
            {/* PREVIOUS UI: className="mx-auto mb-2 w-[94%] shrink-0 max-w-7xl overflow-hidden border border-neutral-700 sm:mb-8 sm:w-[92%] md:w-full" */}
            <div className="mx-auto mt-2 mb-6 w-[94%] shrink-0 max-w-7xl overflow-hidden border border-neutral-700 sm:mt-4 sm:mb-10 sm:w-[92%] md:w-full">
              <div className="flex flex-col md:flex-row gap-0 md:gap-px md:divide-x divide-neutral-700">
                {topSpecs.map((spec, idx) => (
                  <motion.div
                    key={spec.label}
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    /* PREVIOUS UI: className="flex-1 border-b border-neutral-700 bg-neutral-900/50 px-2.5 py-2 transition-colors duration-300 hover:bg-neutral-800/50 sm:px-4 sm:py-4 md:border-b-0 md:px-6 md:py-6" */
                    className="flex-1 border-b border-neutral-700 bg-neutral-900/50 px-3.5 py-3 transition-colors duration-300 hover:bg-neutral-800/50 sm:px-4 sm:py-4 md:border-b-0 md:px-6 md:py-6"
                  >
                    <div className="flex flex-col">
                      <div className="mb-0.5 flex items-baseline gap-1 sm:mb-1 md:mb-2">
                        {/* PREVIOUS UI: className="text-2xl font-medium leading-none text-cyan-400 sm:text-3xl md:text-5xl" */}
                        <span className="text-3xl font-medium leading-none text-cyan-400 sm:text-4xl md:text-5xl">
                          {spec.value}
                        </span>
                        {/* PREVIOUS UI: className="text-[10px] font-medium text-cyan-400/80 sm:text-xs md:text-sm" */}
                        <span className="text-xs font-medium text-cyan-400/80 sm:text-sm md:text-sm">{spec.unit}</span>
                      </div>
                      {/* PREVIOUS UI: className="text-[10px] leading-tight text-white/70 sm:text-sm md:text-base" */}
                      <span className="text-xs leading-tight text-white/70 sm:text-sm md:text-base">
                        {spec.label}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* CENTRAL DRONE IMAGE */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              viewport={{ once: true }}
              /* PREVIOUS UI: `w-full max-w-5xl -mt-8 -mb-7`, then `md:-mt-40`. */
              className="min-h-0 w-full max-w-5xl flex-1 sm:-mb-7 sm:-mt-8 sm:flex-none md:-mt-40"
            >
              <img
                src="/images/Fenix/gps.png"
                alt="Fenix Drone"
                /* PREVIOUS UI: className="w-full h-auto object-contain ..." */
                className="h-full w-full object-contain drop-shadow-[0_0_30px_rgba(0,217,255,0.08)] sm:h-auto"
              />
            </motion.div>

            {/* BOTTOM SPECS ROW - Horizontal layout */}
            {/* PREVIOUS UI: className="mx-auto mt-2 grid w-[94%] shrink-0 max-w-7xl grid-rows-3 gap-2 sm:mt-4 sm:flex sm:w-[92%] sm:flex-wrap sm:justify-center sm:gap-4 md:-mt-28 md:w-full md:flex-nowrap" */}
            <div className="mx-auto mt-4 grid w-[94%] shrink-0 max-w-7xl grid-rows-3 gap-3 sm:mt-6 sm:flex sm:w-[92%] sm:flex-wrap sm:justify-center sm:gap-4 md:-mt-28 md:w-full md:flex-nowrap">
              {bottomSpecs.map((spec, idx) => (
                <motion.div
                  key={spec.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  /* PREVIOUS UI: className="flex h-10 w-full items-center gap-2 border border-neutral-700 bg-neutral-900/70 px-2 py-1 transition-all duration-300 hover:border-neutral-600 hover:bg-neutral-800/70 sm:h-auto sm:gap-4 sm:px-4 sm:py-3 md:w-64" */
                  className="flex w-full items-center gap-3 border border-neutral-700 bg-neutral-900/50 px-3.5 py-3 transition-all duration-300 hover:border-neutral-600 hover:bg-neutral-800/50 sm:h-auto sm:gap-4 sm:px-4 sm:py-4 md:w-64"
                >
                  {/* Icon placeholder */}
                  {/* PREVIOUS UI: className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md bg-neutral-800 p-1 text-base text-cyan-400 sm:h-12 sm:w-12 sm:rounded-lg sm:p-3 sm:text-3xl" */}
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-md bg-neutral-800/80 text-lg text-cyan-400 sm:h-12 sm:w-12 sm:rounded-lg sm:p-3 sm:text-3xl">
                    {idx === 0 && <span>—</span>}
                    {idx === 1 && <span>↔</span>}
                    {idx === 2 && <span>↕</span>}
                  </div>
                  <div className="flex min-w-0 items-baseline gap-1.5 whitespace-nowrap sm:gap-2">
                    {/* PREVIOUS UI: className="text-base font-medium text-cyan-400 sm:text-2xl md:text-3xl" */}
                    <span className="text-3xl font-medium leading-none text-cyan-400 sm:text-3xl md:text-3xl">
                      {spec.value}
                    </span>
                    {/* PREVIOUS UI: className="text-[9px] font-medium text-white/60 sm:text-xs" */}
                    <span className="text-xs font-medium text-cyan-400/80 sm:text-sm">{spec.unit}</span>
                    {/* PREVIOUS UI: className="ml-1 text-[10px] text-white/60 sm:ml-2 sm:text-sm" */}
                    <span className="ml-2 text-xs text-white/70 sm:ml-2 sm:text-sm">
                      {spec.label}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </>
  )
}
