"use client"

import { motion, useReducedMotion } from "framer-motion"
import ProductHeading from "@/components/ProductHeading"
import CharacterReveal from "@/components/CharacterReveal"

const specifications = [
  { label: "Range up to", value: "20", unit: "km" },
  { label: "Endurance", value: "60", unit: "min" },
  { label: "Cruise speed", value: "30", unit: "m/s" },
  { label: "Payload up to", value: "2", unit: "kg" },
]
const dimensions = [
  { label: "Span", value: "1300" },
  { label: "Width", value: "700" },
  { label: "Height", value: "900" },
]

export default function MantisSpecifications() {
  const reduceMotion = useReducedMotion()
  return (
    <section data-mantis-section="specs" className="bat-specs relative w-full overflow-hidden bg-white font-orbit text-neutral-900" aria-labelledby="mantis-specs-title">
      <ProductHeading id="mantis-specs-title" className="product-title-position z-20">One platform. More <CharacterReveal text="possibilities." targetColor="#5ce1e6" glowColor="#5ce1e6" stagger={0.06} /></ProductHeading>
      <div className="bat-specs-grid">
        <motion.figure className="bat-specs-figure relative" initial={reduceMotion ? false : { opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: reduceMotion ? 0 : 0.8 }}>
          <div className="bat-specs-frame">
            <img className="bat-specs-drone" src="/product/Mantis/Mantis-R2-technical-front.png?v=2" alt="MANTIS R2 front-view technical illustration showing its X-shaped airframe, four propellers and forward-facing cameras" loading="lazy" decoding="async" />
          </div>
          <dl className="bat-specs-dimensions">
            {dimensions.map(({ label, value }) => <div key={label}><dt>{label}</dt><dd>{value}<span>mm</span></dd></div>)}
          </dl>
        </motion.figure>
        {[specifications.slice(0, 2), specifications.slice(2)].map((items, index) => (
          <dl key={index} className={`bat-specs-list ${index === 0 ? "bat-specs-left" : "bat-specs-right"}`}>
            {items.map(({ label, value, unit }) => <div key={label} className="bat-specs-row"><dt>{label}</dt><dd>{value}<span>{unit}</span></dd></div>)}
          </dl>
        ))}
      </div>
    </section>
  )
}
