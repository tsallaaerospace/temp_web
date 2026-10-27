"use client"

import { useCallback, useEffect, useRef } from "react"
import { motion, useInView, useReducedMotion } from "framer-motion"
import ProductHeading from "@/components/ProductHeading"
import CharacterReveal from "@/components/CharacterReveal"

export default function MantisDetails() {
  const sectionRef = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const calloutRefs = useRef<(HTMLDivElement | null)[]>([])
  const connectorRefs = useRef<(SVGPathElement | null)[]>([])
  const inView = useInView(sectionRef, { amount: 0.3 })
  const reduceMotion = useReducedMotion()

  const updateConnectors = useCallback(() => {
    const section = sectionRef.current?.getBoundingClientRect()
    const image = imageRef.current?.getBoundingClientRect()
    if (!section || !image || !image.height) return
    const mobile = section.width < 768

    // Source-image anchors keep the leaders attached while the drone moves.
    ;[[0.274, 0.432], [0.249, 0.742], [0.18, 0.44]].forEach(([x, y], index) => {
      const callout = calloutRefs.current[index]?.getBoundingClientRect()
      if (!callout) return
      const startX = (index === 1 && !mobile ? callout.left : callout.right) - section.left
      const baseline = callout.bottom - section.top - 0.5
      const startY = index === 1 && !mobile ? Math.max(baseline, image.top - section.top + image.height * 0.62) : baseline
      const bladeY = (startY + section.top - image.top) / image.height
      const targetX = index === 1 && !mobile ? 0.270 - Math.abs(bladeY - 0.742) * (0.063 / 0.138) : x
      const endX = image.left - section.left + image.width * targetX
      const endY = index === 1 && !mobile ? startY : image.top - section.top + image.height * y
      connectorRefs.current[index]?.setAttribute("d", mobile
        ? `M ${callout.left - section.left} ${startY} L ${startX} ${startY} L ${endX} ${endY}`
        : `M ${startX} ${startY} L ${endX} ${endY}`)
    })
  }, [])

  useEffect(() => {
    const observer = new ResizeObserver(updateConnectors)
    ;[sectionRef.current, imageRef.current, ...calloutRefs.current].forEach(element => {
      if (element) observer.observe(element)
    })
    updateConnectors()
    const frame = requestAnimationFrame(updateConnectors)
    document.fonts.ready.then(updateConnectors)
    window.addEventListener("resize", updateConnectors)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
      window.removeEventListener("resize", updateConnectors)
    }
  }, [updateConnectors, inView])

  return (
    <section ref={sectionRef} aria-labelledby="mantis-details-title" className="mantis-details relative isolate h-[100svh] min-h-[38rem] w-full overflow-hidden bg-white font-orbit text-neutral-900">
      {/* PREVIOUS UI: left 5%, top 12%, own 3vw heading and a static cyan phrase. */}
      {/* PREVIOUS UI:
      <ProductHeading id="mantis-details-title" className="product-title-position z-20">VTOL Launch. Precision strike. <CharacterReveal text="Recoverable design." targetColor="#5ce1e6" glowColor="#5ce1e6" stagger={0.06} /></ProductHeading>
      */}
      <ProductHeading id="mantis-details-title" className="product-title-position z-20">VTOL Launch. Precision strike. <CharacterReveal text="Recoverable by design." targetColor="#5ce1e6" glowColor="#5ce1e6" stagger={0.06} /></ProductHeading>
      <motion.div
        className="mantis-details-image absolute"
        initial={{ transform: reduceMotion ? "translateX(0%)" : "translateX(35%)" }}
        animate={{ transform: inView || reduceMotion ? "translateX(0%)" : "translateX(35%)" }}
        transition={{ duration: reduceMotion ? 0 : 1.4, ease: [0.16, 1, 0.3, 1] }}
        onUpdate={updateConnectors}
      >
        <img ref={imageRef} onLoad={updateConnectors} src="/product/Mantis/Mantis-side.png" alt="Close side view of MANTIS entering from the right, with the rear half cropped beyond the section" className="block h-auto w-full max-w-none" loading="lazy" decoding="async" />
      </motion.div>
      <motion.svg aria-hidden="true" className="mantis-details-connectors pointer-events-none absolute inset-0 z-10 h-full w-full" initial={{ opacity: 0 }} animate={{ opacity: inView || reduceMotion ? 1 : 0 }} transition={{ duration: reduceMotion ? 0 : 0.4 }}>
        <defs>
          <marker id="mantis-callout-dot" markerUnits="userSpaceOnUse" markerWidth="7" markerHeight="7" refX="3.5" refY="3.5">
            <circle cx="3.5" cy="3.5" r="3.2" fill="#36bec5" />
          </marker>
        </defs>
        {[0, 1, 2].map(index => <path key={index} className={index === 2 ? "mantis-mobile-wing-connector" : undefined} ref={node => { connectorRefs.current[index] = node }} fill="none" stroke="#d4d4d4" strokeWidth="1" markerEnd="url(#mantis-callout-dot)" />)}
      </motion.svg>
      <motion.div className="mantis-details-callouts absolute z-20 mt-6" onUpdate={updateConnectors} initial={{ opacity: 0, y: reduceMotion ? 0 : 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: reduceMotion ? 0 : 0.8, delay: reduceMotion ? 0 : 0.2 }}>
        {[
          ["Fixed-wing airframe", "A distinctive wing and body configuration."],
          ["Integrated camera.", "EO + IR"],
          ["VTOL and Recoverable by design", "Propellers positioned around the airframe."],
        ].map(([title, detail], index) => (
          <div key={title} ref={node => { calloutRefs.current[index === 0 ? 2 : index - 1] = node }} className={`mantis-details-callout relative border-b pb-4 ${index === 2 ? "border-transparent" : "border-neutral-300"}`}>
            <h3 className="text-[clamp(0.875rem,1.1vw,1.125rem)] font-normal">{title}</h3>
            <p className="product-body mt-2 max-w-[24rem] text-neutral-600">{detail}</p>
          </div>
        ))}
      </motion.div>
    </section>
  )
}
