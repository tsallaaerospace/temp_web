"use client"

import type React from "react"
import { motion } from "framer-motion"
import ProductHeading from "@/components/ProductHeading"
import CharacterReveal from "@/components/CharacterReveal"

// Nose-on Blender render with the supplied Raptor camera artwork and carbon-fibre propellers.
// PREVIOUS UI (Discrepant payload and text styling):
// const SPECS = [
//   { label: "Range up to", value: "20+", unit: "km" },
//   { label: "Endurance", value: "72+", unit: "min" },
//   { label: "Cruise Speed", value: "18", unit: "m/s" },
//   { label: "Swappable payload", value: "EO+IR/Mapping/Multispectral", unit: "" },
// ]
const SPECS = [
  { label: "Range up to", value: "20+", unit: "km" },
  { label: "Endurance", value: "72+", unit: "min" },
  { label: "Cruise Speed", value: "18", unit: "m/s" },
  { label: "Payload", value: "EO+IR", unit: "" },
]

// Physical dimensions matching T-BAT CAD geometry (Span across wings, Width/fuselage length, Height to vertical fins).
// You can easily adjust these values here:
// PREVIOUS UI (Millimeter values 1273mm, 623mm, 495mm):
// const dimensions = [
//   { label: "Span", value: "1273" },
//   { label: "Width", value: "623" },
//   { label: "Height", value: "495" },
// ]
const dimensions = [
  { label: "Span", value: "1250", unit: "mm" },
  { label: "Width", value: "620", unit: "mm" },
  { label: "Height", value: "680", unit: "mm" },
]

const reveal = (index: number) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.4 },
  transition: { duration: 0.6, delay: 0.15 + index * 0.1, ease: [0.16, 1, 0.3, 1] as const },
})

// Cyan corner marks that frame the drone, one per corner
function Corner({ className }: { className: string }) {
  return <span aria-hidden="true" className={`absolute h-6 w-6 border-[#5ce1e6] ${className}`} />
}

export default function BatSpecs(): React.JSX.Element {
  // PREVIOUS UI:
  // <section data-bat-section="specs" aria-labelledby="bat-specs-title" className="bat-specs relative w-full overflow-hidden bg-white font-orbit text-neutral-900">
  return (
    <section data-bat-section="specs" aria-labelledby="bat-specs-title" className="bat-specs relative w-full overflow-hidden bg-white font-orbit text-neutral-900 max-w-[120rem] 3xl:max-w-[140rem] mx-auto">
      <ProductHeading id="bat-specs-title" className="product-title-position z-20">Engineered for the <CharacterReveal text="mission" targetColor="#5ce1e6" glowColor="#5ce1e6" stagger={0.06} /></ProductHeading>
      {/* PREVIOUS UI (Measurement ticks down both edges):
      <span aria-hidden="true" className="bat-specs-ticks left-0" />
      <span aria-hidden="true" className="bat-specs-ticks right-0" />
      */}

      <div className="bat-specs-grid">
        {/* PREVIOUS UI:
        <motion.div
          className="bat-specs-figure relative"
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <Corner className="left-0 top-0 border-l-2 border-t-2" />
          <Corner className="right-0 top-0 border-r-2 border-t-2" />
          <Corner className="bottom-0 left-0 border-b-2 border-l-2" />
          <Corner className="bottom-0 right-0 border-b-2 border-r-2" />
          <img
            src="/product/T-BAT/specifications-drone.webp?v=raptor-seated"
            alt="T-BAT technical view with horizontal carbon-fibre propellers, four landing legs and a Raptor camera"
            className="bat-specs-drone"
            loading="lazy"
            decoding="async"
          />
        </motion.div>
        */}
        <motion.div
          className="bat-specs-figure relative flex flex-col items-center"
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="bat-specs-frame relative w-full flex items-center justify-center">
            {/* PREVIOUS UI (Cyan corner marks):
            <Corner className="left-0 top-0 border-l-2 border-t-2" />
            <Corner className="right-0 top-0 border-r-2 border-t-2" />
            <Corner className="bottom-0 left-0 border-b-2 border-l-2" />
            <Corner className="bottom-0 right-0 border-b-2 border-r-2" />
            */}
            <img
              src="/product/T-BAT/specifications-drone.webp?v=raptor-seated"
              alt="T-BAT technical view with horizontal carbon-fibre propellers, four landing legs and a Raptor camera"
              className="bat-specs-drone"
              loading="lazy"
              decoding="async"
            />
          </div>

          {/* PREVIOUS UI (Uncentered text in dimension items):
          <dl className="bat-specs-dimensions">
            {dimensions.map(({ label, value }) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}<span>mm</span></dd>
              </div>
            ))}
          </dl>
          */}
          {/* PREVIOUS UI (Hardcoded mm unit):
          <dl className="bat-specs-dimensions">
            {dimensions.map(({ label, value }) => (
              <div key={label} className="flex flex-col items-center justify-center text-center">
                <dt className="text-center">{label}</dt>
                <dd className="flex items-baseline justify-center text-center">{value}<span>mm</span></dd>
              </div>
            ))}
          </dl>
          */}
          <dl className="bat-specs-dimensions">
            {dimensions.map(({ label, value, unit }) => (
              <div key={label} className="flex flex-col items-center justify-center text-center">
                <dt className="text-center">{label}</dt>
                <dd className="flex items-baseline justify-center text-center">{value}<span>{unit}</span></dd>
              </div>
            ))}
          </dl>
        </motion.div>

        {[SPECS.slice(0, 2), SPECS.slice(2)].map((group, side) => (
          <dl key={side} className={`bat-specs-list ${side === 0 ? "bat-specs-left" : "bat-specs-right"}`}>
            {group.map((spec, index) => (
              <motion.div key={spec.label} className="bat-specs-row" {...reveal(side * 2 + index)}>
                {/* PREVIOUS UI (discrepant font size and electric cyan):
                <dt className="text-sm text-neutral-600 tracking-wide">{spec.label}</dt>
                <dd className="mt-2.5 sm:mt-3 flex flex-wrap items-baseline gap-3 text-[#5ce1e6]">
                  <span className={spec.unit ? "bat-specs-value leading-none" : "bat-specs-payload"}>{spec.value}</span>
                  {spec.unit && <span className="text-xl">{spec.unit}</span>}
                </dd>
                */}
                <dt>{spec.label}</dt>
                <dd>
                  {spec.value}
                  {spec.unit ? <span>{spec.unit}</span> : null}
                </dd>
              </motion.div>
            ))}
          </dl>
        ))}
      </div>
    </section>
  )
}

