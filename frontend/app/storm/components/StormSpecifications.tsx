"use client"

import ProductHeading from "@/components/ProductHeading"
import CharacterReveal from "@/components/CharacterReveal"

const specifications = [
  { label: "Communication range", value: "15+", unit: "km LOS" },
  { label: "Endurance", value: "30+", unit: "min" },
  // PREVIOUS UI: { label: "Cruise speed", value: "15", unit: "m/s" },
  { label: "Cruise speed", value: "7", unit: "m/s" },
  { label: "Lift capacity", value: "20–25", unit: "kg" },
]
// PREVIOUS UI: glTF bounds were Span 2275, Width 2275, Height 800 mm.
// Dimensions supplied by the product team.
const dimensions = [
  { label: "Span", value: "2488" },
  { label: "Length", value: "2488" },
  { label: "Height", value: "751" },
]

export default function StormSpecifications() {
  return (
    <section className="storm-specs bat-specs relative w-full overflow-hidden bg-white font-orbit text-neutral-900" aria-labelledby="storm-specs-title">
      <ProductHeading id="storm-specs-title" className="product-title-position z-20">
        <span>One platform.</span>{" "}<span>More <CharacterReveal text="potential." targetColor="#5ce1e6" glowColor="#5ce1e6" stagger={0.06} /></span>
      </ProductHeading>
      <div className="bat-specs-grid">
        <figure className="bat-specs-figure relative">
          <div className="bat-specs-frame">
            <img className="bat-specs-drone" src="/product/STORM/storm-3-phase-top-view.webp" alt="Technical top view of STORM with a black outlined white airframe and dark faceted carbon-fiber propellers" width={2048} height={2048} loading="lazy" decoding="async" />
          </div>
          <dl className="bat-specs-dimensions">
            {dimensions.map(({ label, value }) => <div key={label}><dt>{label}</dt><dd>{value}<span>mm</span></dd></div>)}
          </dl>
        </figure>
        {[specifications.slice(0, 2), specifications.slice(2)].map((items, index) => (
          <dl key={index} className={`bat-specs-list ${index === 0 ? "bat-specs-left" : "bat-specs-right"}`}>
            {items.map(({ label, value, unit }) => <div key={label} className="bat-specs-row"><dt>{label}</dt><dd>{value}<span>{unit}</span></dd></div>)}
          </dl>
        ))}
      </div>
    </section>
  )
}
