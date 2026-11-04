"use client"

import { useCallback, useEffect, useRef } from "react"
import { motion, useInView, useReducedMotion } from "framer-motion"
import ProductHeading from "@/components/ProductHeading"
import CharacterReveal from "@/components/CharacterReveal"

const CALLOUTS = [
  // PREVIOUS UI: anchor [0.33, 0.36] (leader bent up to the rotor hub). Now a straight leader ending a little earlier.
  { title: "Coaxial propulsion", detail: "Paired rotors positioned on each arm.", anchor: [0.31, 0.36] },
  { title: "Central airframe", detail: "A central body connecting the four rotor arms.", anchor: [0.52, 0.48] },
  { title: "Landing gear", detail: "Support legs beneath the airframe.", anchor: [0.49, 0.70] },
]

export default function StormDetails() {
  const sectionRef = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const calloutRefs = useRef<(HTMLDivElement | null)[]>([])
  const pathRefs = useRef<(SVGPathElement | null)[]>([])
  const inView = useInView(sectionRef, { amount: 0.3 })
  const reduceMotion = useReducedMotion()

  const updateConnectors = useCallback(() => {
    const section = sectionRef.current?.getBoundingClientRect()
    const image = imageRef.current?.getBoundingClientRect()
    if (!section || !image?.height) return
    const boxes = calloutRefs.current.map(element => element?.getBoundingClientRect())
    if (boxes.some(box => !box)) return
    const heights = boxes.map(box => box!.height)
    const centreY = image.top - section.top + image.height * 0.48
    const legY = Math.max(
      image.top - section.top + image.height * (section.width >= 768 ? 0.59 : 0.70),
      centreY + heights[2] + 12,
    )
    const gap = legY - heights[2] - centreY
    // Phones: labels sit a little lower than their dots (PREVIOUS UI: no shift), so leaders bend up to the dots there.
    const phoneShift = section.width < 768 ? 40 : 0
    const tops = [centreY - heights[1] - gap - heights[0], centreY - heights[1], legY - heights[2]].map(top => top + phoneShift)
    CALLOUTS.forEach(({ anchor: [x, y] }, index) => {
      const element = calloutRefs.current[index]
      const callout = boxes[index]
      if (!callout) return
      if (element) element.style.top = `${tops[index]}px`
      const startX = callout.left - section.left
      const elbowX = callout.right - section.left
      // Phones keep the original rotor-hub point (0.33) for the first leader's elbow.
      const anchorX = index === 0 && section.width < 768 ? 0.33 : x
      const endX = image.left - section.left + image.width * anchorX
      // Equal visible gaps account for the actual height of each label, including wrapped mobile text.
      const endY = index === 2 ? legY : image.top - section.top + image.height * y
      const startY = index > 0 && !phoneShift ? endY : tops[index] + heights[index] - 0.5
      // PREVIOUS UI: All leaders used an elbow before connecting diagonally to the image.
      // PREVIOUS UI: the first leader kept an elbow: `M ${startX} ${startY} L ${elbowX} ${startY} L ${endX} ${endY}`.
      // PREVIOUS UI: on phones the first leader bent down to the rotor hub: `M ${startX} ${startY} L ${elbowX} ${startY} L ${endX} ${endY}`.
      // The first leader is now straight on every screen, along its label's underline.
      const firstLeader = `M ${startX} ${startY} L ${endX} ${startY}`
      // Phones: the bend starts close to the part it points at (PREVIOUS UI: bend started at the label's right edge, elbowX).
      const nearPartX = Math.max(elbowX, endX - 48)
      const otherLeader = phoneShift
        ? `M ${startX} ${startY} L ${nearPartX} ${startY} L ${endX} ${endY}`
        : `M ${startX} ${endY} L ${endX} ${endY}`
      pathRefs.current[index]?.setAttribute("d", index > 0 ? otherLeader : firstLeader)
    })
  }, [])

  useEffect(() => {
    const observer = new ResizeObserver(updateConnectors)
    ;[sectionRef.current, imageRef.current, ...calloutRefs.current].forEach(element => {
      if (element) observer.observe(element)
    })
    const frame = requestAnimationFrame(updateConnectors)
    document.fonts.ready.then(updateConnectors)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [updateConnectors])

  return (
    <section ref={sectionRef} data-storm-section="details" aria-labelledby="storm-details-title" className="storm-details relative isolate h-[100svh] min-h-[38rem] w-full overflow-hidden bg-white font-orbit text-neutral-900">
      <ProductHeading id="storm-details-title" className="product-title-position z-20">
        Heavy lift. Reliable delivery. <CharacterReveal text="Built for rugged missions." targetColor="#5ce1e6" glowColor="#5ce1e6" stagger={0.06} />
      </ProductHeading>
      <motion.div
        className="storm-details-image absolute"
        initial={{ transform: reduceMotion ? "translateX(0%)" : "translateX(35%)" }}
        animate={{ transform: inView || reduceMotion ? "translateX(0%)" : "translateX(35%)" }}
        transition={{ duration: reduceMotion ? 0 : 1.4, ease: [0.16, 1, 0.3, 1] }}
        onUpdate={updateConnectors}
      >
        <img ref={imageRef} onLoad={updateConnectors} src="/product/STORM/STORM_side_view.png" alt="STORM side view showing paired rotors, central airframe and landing gear" className="block h-auto w-full max-w-none" loading="lazy" decoding="async" />
      </motion.div>
      <motion.svg aria-hidden="true" className="pointer-events-none absolute inset-0 z-10 h-full w-full" initial={{ opacity: 0 }} animate={{ opacity: inView || reduceMotion ? 1 : 0 }} transition={{ duration: reduceMotion ? 0 : 0.4 }}>
        <defs>
          <marker id="storm-callout-dot" markerUnits="userSpaceOnUse" markerWidth="7" markerHeight="7" refX="3.5" refY="3.5"><circle cx="3.5" cy="3.5" r="3.2" fill="#36bec5" /></marker>
        </defs>
        {CALLOUTS.map(({ title }, index) => <path key={title} ref={node => { pathRefs.current[index] = node }} fill="none" stroke="#d4d4d4" strokeWidth="1" markerEnd="url(#storm-callout-dot)" />)}
      </motion.svg>
      <div className="storm-details-callouts pointer-events-none absolute inset-0 z-20">
        {CALLOUTS.map(({ title, detail }, index) => (
          <div key={title} ref={node => { calloutRefs.current[index] = node }} className="absolute pb-4">
            <h3 className="text-[clamp(0.875rem,1.1vw,1.125rem)] font-normal">{title}</h3>
            <p className="product-body mt-2 max-w-[24rem] text-neutral-600">{detail}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
