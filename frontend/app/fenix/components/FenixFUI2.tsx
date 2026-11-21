"use client"

import { useCallback, useEffect, useRef } from "react"
import { motion, useInView, useReducedMotion } from "framer-motion"
import ProductHeading from "@/components/ProductHeading"

const FEATURES = [
  { title: "Propulsion", detail: "Highly efficient brushless propulsion. Custom enclosed low-noise motors.", anchor: [0.45, 0.203] },
  { title: "EDGE Compute", detail: "State of the art companion computer running customized AI & ML algorithms, integrated with autopilot and active cooling.", anchor: [0.413, 0.354] },
  // PREVIOUS UI: Payload text occupied row three; Sensor Suite text occupied row four.
  // PREVIOUS UI: Sensor Suite anchor [0.358, 0.51]; Payload anchor [0.321, 0.627].
  // PREVIOUS UI: Sensor Suite anchor x was 0.285.
  // PREVIOUS UI: Sensor Suite anchor x was 0.290.
  // PREVIOUS UI: Sensor Suite anchor x was 0.315.
  // PREVIOUS UI: Sensor Suite anchor y was 0.459.
  // PREVIOUS UI: Sensor Suite anchor [0.325, 0.469], then [0.305, 0.489] (each move 4 small steps left and down), then [0.285, 0.509].
  { title: "Sensor Suite", detail: "Full sensor fusion integrating visual odometry, high-precision IMU, and LiDAR ranging.", anchor: [0.285, 0.519] },
  // PREVIOUS UI: Payload anchor [0.343, 0.49] targeted the main lens.
  // PREVIOUS UI: Payload anchor x was 0.342.
  // PREVIOUS UI: Payload anchor x was 0.337.
  { title: "Payload", detail: "High Resolution RGB Camera. Radiometric Thermal Camera. High-output LEDs for low-light tactical ops.", anchor: [0.322, 0.565] },
  { title: "Collision Resistance", detail: "Airframe built from carbon-reinforced aerospace grade nylon bumper ducts.", anchor: [0.50, 0.65] },
]

export default function FenixFUI2() {
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, amount: 0.3 })
  const imageRef = useRef<HTMLImageElement>(null)
  const callouts = useRef<(HTMLDivElement | null)[]>([])
  const paths = useRef<(SVGPathElement | null)[]>([])
  const reduceMotion = useReducedMotion()
  const updateConnectors = useCallback(() => {
    const section = sectionRef.current?.getBoundingClientRect()
    const image = imageRef.current?.getBoundingClientRect()
    if (!section || !image?.height) return
    FEATURES.forEach(({ anchor: [x, y] }, index) => {
      const element = callouts.current[index]
      if (!element) return
      const row = element.getBoundingClientRect()
      if (!row) return
      const startX = row.right - section.left
      const startY = row.bottom - section.top - 0.5
      const endX = image.left - section.left + image.width * x
      const endY = index === 0 ? startY : image.top - section.top + image.height * y
      const bendX = Math.max(startX, endX - section.width * 0.08)
      paths.current[index]?.setAttribute("d", `M ${startX} ${startY} L ${bendX} ${startY} L ${endX} ${endY}`)
    })
  }, [])
  useEffect(() => {
    const observer = new ResizeObserver(updateConnectors)
    ;[sectionRef.current, imageRef.current, ...callouts.current].forEach(node => { if (node) observer.observe(node) })
    const frame = requestAnimationFrame(updateConnectors)
    document.fonts.ready.then(updateConnectors)
    return () => { observer.disconnect(); cancelAnimationFrame(frame) }
  }, [updateConnectors])

  return (
    <section ref={sectionRef} data-fenix-features data-in-view={inView} aria-labelledby="fenix-features-title" className="fenix-details relative isolate w-full overflow-hidden bg-white font-orbit text-neutral-900">
      {/* PREVIOUS UI: Explorer used an uppercase E and lowercase x. */}
      <ProductHeading id="fenix-features-title" className="fenix-details-heading">Fast Entry Navigational Intrusion <span className="text-[#5ce1e6]">eXplorer</span></ProductHeading>
      <img ref={imageRef} onLoad={updateConnectors} className="fenix-details-image" src="/product/fenix/FENIX-Specs.png" alt="FENIx drone showing its cameras, propulsion, protected airframe and onboard systems" loading="lazy" decoding="async" />
      <svg aria-hidden="true" className="fenix-details-connectors pointer-events-none absolute inset-0 z-10 h-full w-full">
        <defs><marker id="fenix-detail-dot" markerUnits="userSpaceOnUse" markerWidth="7" markerHeight="7" refX="3.5" refY="3.5"><circle cx="3.5" cy="3.5" r="3.2" fill="#36bec5" /></marker></defs>
        {FEATURES.map(({ title }, index) => <path key={title} ref={node => { paths.current[index] = node }} fill="none" stroke="#d4d4d4" strokeWidth="1" markerEnd="url(#fenix-detail-dot)" />)}
      </svg>
      <motion.div className="fenix-details-callouts relative z-20" initial={reduceMotion ? false : { opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: reduceMotion ? 0 : 0.6 }}>
        {FEATURES.map(({ title, detail }, index) => (
          <div key={title} ref={node => { callouts.current[index] = node }} className="border-b border-neutral-300 pb-4">
            <h3 className="text-[clamp(0.875rem,1.1vw,1.125rem)] font-normal">{title}</h3>
            <p className="product-body mt-2 text-neutral-600">{detail}</p>
          </div>
        ))}
      </motion.div>
    </section>
  )
}

