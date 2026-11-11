"use client"

import { useEffect, useId, useRef, useState } from "react"

const parts = [
  { name: "RGB Camera", title: "See the scene clearly.", description: "High-resolution visual imaging gives operators a clear view of the mission environment.", detail: "Visual imaging", value: "High-resolution RGB", purpose: "Situational awareness", x: 67, y: 38, image: "/product/fenix/rgb-preview-natural.webp" },
  { name: "LiDAR Sensor", title: "Read the space ahead.", description: "LiDAR measures surrounding distances to support spatial awareness and 3D mapping.", detail: "Distance sensing", value: "LiDAR sensor", purpose: "3D mapping", x: 57, y: 37, image: "/product/fenix/3d-mapping.png" },
  { name: "Thermal Camera", title: "Look beyond visible light.", description: "Thermal imaging reveals heat signatures when visible imagery alone is limited.", detail: "Thermal imaging", value: "Thermal camera", purpose: "Thermal awareness", x: 53, y: 65, image: "/product/fenix/thermal-preview-wide.webp" },
  { name: "White LED", title: "Illuminate the scene.", description: "White LED lighting illuminates the surroundings to support visual operations in low-light environments.", detail: "Scene illumination", value: "White LED", purpose: "Low-light visibility", x: 69, y: 66, image: "/product/fenix/white-LED.png" },
  { name: "Blue LED", title: "Light the path in blue.", description: "Blue LED lighting provides blue illumination for operations in dark environments.", detail: "Scene illumination", value: "Blue LED", purpose: "Blue-light illumination", x: 53, y: 66, image: "/product/fenix/blue-led-preview-wide.webp" },
]

// Sensor coordinates follow the five highlighted frames in the original video.
const highlights = [
  { outline: "M1260 276H1505L1556 368V603H1260Z", detail: "M1415 302a90 88 0 1 0 0 176a90 88 0 1 0 0-176", x: 1415, y: 302 },
  { outline: "M997 289H1248V605H947L997 562Z", detail: "M1071 309H1134L1172 341V413L1127 444H1072L1028 412V342Z M1100 332a45 45 0 1 0 0 90a45 45 0 1 0 0-90", x: 1100, y: 330 },
  { outline: "M1365 493H1463V590H1365Z", detail: "M1379 506H1450V577H1379Z M1365 493L1379 506 M1463 493L1450 506 M1463 590L1450 577 M1365 590L1379 577", x: 1415, y: 493 },
  { outline: "M1260 616H1557V704L1480 748H1260Z", detail: "M1335 633a48 49 0 1 0 0 98a48 49 0 1 0 0-98 M1441 633a48 49 0 1 0 0 98a48 49 0 1 0 0-98", x: 1390, y: 616 },
  // PREVIOUS UI: a rectangle at y744 and undersized ellipses cut through the protruding lens rims.
  // { outline: "M947 628H1235V744H947Z", detail: "M1020 676a50 34 0 1 0 0 68a50 34 0 1 0 0-68 M1154 672a54 38 0 1 0 0 76a54 38 0 1 0 0-76", x: 1020, y: 676 },
  // PREVIOUS UI: the dark lens also had a circular outline and a curved lower highlight boundary.
  // { outline: "M947 628H1235V744H1197A60 44 0 0 1 1117 744H1054A52 43 0 0 1 990 744H947Z", detail: "M1022 667a52 43 0 1 0 0 86a52 43 0 1 0 0-86 M1157 667a60 44 0 1 0 0 88a60 44 0 1 0 0-88", x: 1022, y: 667 },
  { outline: "M947 628H1235V744H1054A52 43 0 0 1 990 744H947Z", detail: "M1022 667a52 43 0 1 0 0 86a52 43 0 1 0 0-86", x: 1022, y: 667 },
]

export default function FenixAwareness() {
  const connectorMaskId = useId()
  const layoutRef = useRef<HTMLDivElement>(null)
  const modelRef = useRef<SVGSVGElement>(null)
  const panelRef = useRef<HTMLElement>(null)
  const [active, setActive] = useState<number | null>(null)
  const part = parts[active ?? 0]
  const [connectors, setConnectors] = useState<{ width: number; height: number; paths: { d: string; x: number; y: number }[] } | null>(null)

  useEffect(() => {
    const layout = layoutRef.current
    const model = modelRef.current
    const panel = panelRef.current
    if (!layout || !model || !panel) return
    const measure = () => {
      const bounds = layout.getBoundingClientRect()
      const matrix = model.getScreenCTM()
      if (!matrix || !bounds.width) return
      const card = panel.getBoundingClientRect()
      const startX = card.right - bounds.x
      const startY = card.top + 65 - bounds.y
      const stacked = card.top >= model.getBoundingClientRect().bottom - 1
      const blueLedTarget = new DOMPoint(highlights[4].x, highlights[4].y).matrixTransform(matrix)
      const bendX = Math.max(startX + 32, blueLedTarget.x - bounds.x - 280)
      setConnectors({ width: bounds.width, height: bounds.height, paths: highlights.map(highlight => {
        const target = new DOMPoint(highlight.x, highlight.y).matrixTransform(matrix)
        const x = target.x - bounds.x
        const y = target.y - bounds.y
        // PREVIOUS UI: the desktop bend was only 36px left of the sensor.
        return { d: stacked
          ? `M${card.left + card.width / 2 - bounds.x} ${card.top - bounds.y - 8}L${x} ${y}`
          // PREVIOUS UI: bend offset was x - 120.
          // PREVIOUS UI: bend offset was x - 200.
          // PREVIOUS UI: each sensor calculated its own bend from x - 280.
          : `M${startX + 24} ${startY}H${bendX}L${x} ${y}`, x, y }
      }) })
    }
    const observer = new ResizeObserver(measure)
    observer.observe(layout)
    observer.observe(model)
    observer.observe(panel)
    measure()
    return () => observer.disconnect()
  }, [])

  return (
    <section aria-label="FENIX awareness" className="fenix-awareness font-orbit">
      <div className="awareness-overview">
        <header className="awareness-heading">
          <h2>Every detail. <span>Greater awareness.</span></h2>
        </header>
        <div className="awareness-overview-layout" ref={layoutRef}
          onPointerLeave={event => { if (event.pointerType === "mouse") setActive(null) }}
          onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setActive(null) }}
          onKeyDown={event => { if (event.key === "Escape") { setActive(null); event.stopPropagation() } }}>
          <div className="awareness-panel">
            <p className="awareness-hint" hidden={active !== null}>Hover or tap a sensor to explore.</p>
            <article ref={panelRef} id="awareness-detail" className="awareness-card" aria-label={part.name} aria-hidden={active === null} style={{ visibility: active === null ? "hidden" : "visible" }}>
              <img key={`preview-${active}`} className="awareness-closeup" src={part.image} alt="" />
              <div key={`copy-${active}`} className="awareness-copy">
                <p className="awareness-eyebrow">0{(active ?? 0) + 1} / {part.name}</p>
                <h3>{part.title}</h3>
                <p>{part.description}</p>
              </div>
              <dl key={`details-${active}`} className="awareness-details">
                <div><dt>{part.detail}</dt><dd>{part.value}</dd></div>
                <div><dt>Purpose</dt><dd>{part.purpose}</dd></div>
              </dl>
            </article>
          </div>
          <div className="awareness-drone">
            <svg ref={modelRef} className="awareness-model" viewBox="700 45 1120 960" role="img" aria-label="FENIX sensor assembly">
              <image href="/product/fenix/fenix-awareness-transparent.png" width="1920" height="1080" />
              {highlights.map((highlight, index) => (
                <g className="awareness-highlight" key={parts[index].name} data-part={parts[index].name} data-active={active === index} style={{ opacity: active === index ? 1 : 0 }}>
                  <path className="awareness-highlight-area" d={highlight.outline} vectorEffect="non-scaling-stroke" />
                  <path className="awareness-highlight-detail" pathLength="1" d={highlight.detail} vectorEffect="non-scaling-stroke" />
                </g>
              ))}
            </svg>
          </div>
          {connectors && <>
            <svg className="awareness-connectors" viewBox={`0 0 ${connectors.width} ${connectors.height}`} aria-hidden="true">
              {active !== null && <g key={active}>
                <defs>
                  <mask id={connectorMaskId} maskUnits="userSpaceOnUse" x="-10" y="-10" width={connectors.width + 20} height={connectors.height + 20}>
                    <path className="awareness-line-reveal" d={connectors.paths[active].d} pathLength="1" fill="none" stroke="white" strokeWidth="8" strokeDasharray="1" />
                  </mask>
                </defs>
                <path mask={`url(#${connectorMaskId})`} d={connectors.paths[active].d} fill="none" stroke="#29bbc3" strokeWidth="1.25" strokeDasharray="2 4" vectorEffect="non-scaling-stroke" />
              </g>}
            </svg>
            {connectors.paths.map((point, index) => (
              <button key={parts[index].name} type="button" className="awareness-hotspot"
                style={{ left: point.x, top: point.y }} aria-label={`Explore ${parts[index].name}`}
                aria-expanded={active === index} aria-controls="awareness-detail"
                onPointerEnter={event => { if (event.pointerType === "mouse") setActive(index) }}
                onFocus={() => setActive(index)} onClick={() => setActive(index)}>
                <span className="awareness-dot" />
              </button>
            ))}
          </>}
        </div>
      </div>
      <style jsx>{`
        .fenix-awareness { position: relative; background: #fff; color: #171717; padding: clamp(74px, 10svh, 100px) 4vw 24px; }
        .awareness-overview { width: 100%; max-width: 2200px; margin: 0 auto; }
        .awareness-heading h2 { font-size: clamp(24px, 2.8vw, 54px); line-height: 1.15; font-weight: 400; }
        .awareness-heading h2 span { color: #29bbc3; display: inline-block; }
        .awareness-overview-layout { position: relative; display: grid; grid-template-columns: minmax(0, .85fr) minmax(0, 1.35fr); align-items: center; gap: 5vw; margin-top: 24px; }
        .awareness-panel { position: relative; width: min(100%, 310px); justify-self: center; z-index: 1; }
        .awareness-hint { position: absolute; top: 50%; width: 100%; color: #626262; font-size: 14px; line-height: 1.6; }
        /* PREVIOUS UI: desktop hint had no positional offset. */
        @media (min-width: 768px) {
          /* PREVIOUS UI: translate(24px, -24px). */
          .awareness-hint { transform: translate(24px, -40px); }
        }
        .awareness-card { display: grid; gap: 10px; }
        .awareness-closeup { width: 100%; height: clamp(100px, 14svh, 140px); object-fit: cover; border-radius: 12px; }
        .awareness-copy, .awareness-details { background: #f5f5f5; border: 1px solid #e2e2e2; border-radius: 12px; padding: 16px; }
        .awareness-eyebrow { font-size: 10px; text-transform: uppercase; color: #158c94; letter-spacing: .06em; margin-bottom: 8px; }
        .awareness-copy h3 { font-size: clamp(16px, 1.1vw, 20px); font-weight: 400; line-height: 1.3; margin-bottom: 8px; }
        .awareness-copy > p:last-child { font-size: clamp(12px, .8vw, 15px); line-height: 1.55; color: #626262; }
        .awareness-details { display: grid; gap: 10px; }
        .awareness-details dt { font-size: 10px; text-transform: uppercase; color: #737373; padding-bottom: 6px; border-bottom: 1px solid #ddd; margin-bottom: 7px; }
        .awareness-details dd { font-size: clamp(13px, .95vw, 16px); }
        .awareness-drone { min-width: 0; height: min(78svh, 860px); }
        .awareness-model { display: block; width: 100%; height: 100%; overflow: visible; }
        .awareness-highlight { transition: opacity 180ms ease-out; }
        .awareness-line-reveal { stroke-dashoffset: 0; }
        .awareness-highlight-area { fill: #29bbc31a; stroke: #29bbc3; stroke-width: 1.25; }
        .awareness-highlight-detail { fill: none; stroke: #29bbc3; stroke-width: 1.25; }
        .awareness-connectors { position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible; pointer-events: none; }
        .awareness-hotspot { position: absolute; z-index: 2; display: grid; place-items: center; width: 44px; height: 44px; transform: translate(-50%, -50%); border-radius: 50%; cursor: pointer; background: transparent; border: 0; padding: 0; }
        .awareness-hotspot:focus-visible { outline: 2px solid #158c94; outline-offset: 2px; }
        .awareness-dot { position: relative; width: 8px; height: 8px; border-radius: 50%; background: #29bbc3; box-shadow: 0 0 6px #29bbc3; }
        .awareness-dot::before { content: ""; position: absolute; inset: -7px; border-radius: 50%; background: #29bbc3; filter: blur(5px); opacity: .45; }
        .awareness-hotspot[aria-expanded="true"] .awareness-dot { background: #fff; box-shadow: 0 0 0 2px #29bbc3; }
        @media (prefers-reduced-motion: no-preference) {
          .awareness-closeup, .awareness-copy, .awareness-details {
            opacity: 1; transform: translateY(0);
            transition: opacity 240ms ease-out, transform 280ms cubic-bezier(0.23, 1, 0.32, 1);
          }
          .awareness-copy { transition-delay: 50ms; }
          .awareness-details { transition-delay: 100ms; }
          .awareness-line-reveal { transition: stroke-dashoffset 380ms cubic-bezier(0.23, 1, 0.32, 1); }
          .awareness-highlight-area { fill-opacity: 0; transition: fill-opacity 280ms ease-out; }
          .awareness-highlight[data-active="true"] .awareness-highlight-area { fill-opacity: 1; }
          .awareness-highlight-detail { stroke-dasharray: 1; stroke-dashoffset: 1; transition: stroke-dashoffset 380ms cubic-bezier(0.23, 1, 0.32, 1); }
          .awareness-highlight[data-active="true"] .awareness-highlight-detail { stroke-dashoffset: 0; }
          @starting-style {
            .awareness-closeup, .awareness-copy, .awareness-details { opacity: 0; transform: translateY(12px); }
            .awareness-line-reveal { stroke-dashoffset: 1; }
          }
          .awareness-dot::before { animation: sensor-pulse 2s ease-in-out infinite; }
          @keyframes sensor-pulse { 0%, 100% { opacity: .2; transform: scale(.8); } 50% { opacity: .65; transform: scale(1.3); } }
        }
        @media (max-width: 767px) {
          .awareness-overview-layout { grid-template-columns: minmax(0, 1fr); gap: 20px; }
          .awareness-drone { grid-row: 1; height: auto; aspect-ratio: 1120 / 960; }
          .awareness-panel { width: 100%; max-width: 420px; min-height: 340px; }
          .awareness-card { grid-template-columns: 1fr 1fr; gap: 8px; }
          .awareness-closeup { grid-column: 1 / -1; height: 110px; }
          .awareness-copy, .awareness-details { padding: 12px; }
          .awareness-hint { top: 24px; text-align: center; }
        }
      `}</style>
    </section>
  )
}

// PREVIOUS UI: scroll-scrubbed sequence, preserved for restoration only.
// "use client"
//
// import { useEffect, useRef, useState } from "react"
// import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion"
// import { loadImageWithRetry } from "@/lib/media-retry"
//
// const FRAME_COUNT = 60
// const FRAMES_PER_HIGHLIGHT = FRAME_COUNT / 5
//
// const cardReveal = {
//   hidden: { clipPath: "inset(0 0 0 100% round 12px)" },
//   visible: { clipPath: "inset(0 0 0 0% round 12px)", transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const } },
// }
//
// const parts = [
//   { name: "RGB Camera", title: "See the scene clearly.", description: "High-resolution visual imaging gives operators a clear view of the mission environment.", detail: "Visual imaging", value: "High-resolution RGB", purpose: "Situational awareness", x: 67, y: 38, image: "/product/fenix/rgb-preview-natural.webp" },
//   { name: "LiDAR Sensor", title: "Read the space ahead.", description: "LiDAR measures surrounding distances to support spatial awareness and 3D mapping.", detail: "Distance sensing", value: "LiDAR sensor", purpose: "3D mapping", x: 57, y: 37, image: "/product/fenix/3d-mapping.png" },
//   { name: "Thermal Camera", title: "Look beyond visible light.", description: "Thermal imaging reveals heat signatures when visible imagery alone is limited.", detail: "Thermal imaging", value: "Thermal camera", purpose: "Thermal awareness", x: 53, y: 65, image: "/product/fenix/thermal-preview-wide.webp" },
//   { name: "White LED", title: "Illuminate the scene.", description: "White LED lighting illuminates the surroundings to support visual operations in low-light environments.", detail: "Scene illumination", value: "White LED", purpose: "Low-light visibility", x: 69, y: 66, image: "/product/fenix/white-LED.png" },
//   { name: "Blue LED", title: "Light the path in blue.", description: "Blue LED lighting provides blue illumination for operations in dark environments.", detail: "Scene illumination", value: "Blue LED", purpose: "Blue-light illumination", x: 53, y: 66, image: "/product/fenix/blue-led-preview-wide.webp" },
// ]
//
// function DetailCard({ part, index }: { part: typeof parts[number]; index: number }) {
//   return (
//     <article className="awareness-card" aria-label={part.name}>
//       <motion.div className="awareness-closeup" aria-hidden="true" variants={cardReveal}>
//         <img src={part.image ?? "/product/fenix/FENIX_Awareness-poster.jpg"} alt="" style={{ transformOrigin: `${part.x}% ${part.y}%`, ...(part.image ? { transform: "none", objectFit: "cover" as const } : {}) }} />
//       </motion.div>
//       <motion.div className="awareness-copy" variants={cardReveal}>
//         <p className="awareness-eyebrow">0{index + 1} / {part.name}</p>
//         <h3>{part.title}</h3>
//         <p>{part.description}</p>
//       </motion.div>
//       <motion.dl className="awareness-details" variants={cardReveal}>
//         <div><dt>{part.detail}</dt><dd>{part.value}</dd></div>
//         <div><dt>Purpose</dt><dd>{part.purpose}</dd></div>
//       </motion.dl>
//     </article>
//   )
// }
//
// export default function FenixAwareness() {
//   const sectionRef = useRef<HTMLElement>(null)
//   const frameRef = useRef<HTMLImageElement>(null)
//   const activeRef = useRef(0)
//   const atStartRef = useRef(true)
//   const [active, setActive] = useState(0)
//   const [atStart, setAtStart] = useState(true)
//   const reduceMotion = useReducedMotion()
//   const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] })
//
//   useEffect(() => {
//     let active = true
//     let next = 0
//     let loading = 0
//     const preload = () => {
//       while (active && loading < 8 && next < FRAME_COUNT) {
//         loading++
//         void loadImageWithRetry(`/product/fenix/awareness-frames-hq/frame-${String(next++).padStart(3, "0")}.webp`, { isActive: () => active })
//           .then(() => { loading--; preload() })
//       }
//     }
//     preload()
//     return () => { active = false }
//   }, [])
//
//   useMotionValueEvent(scrollYProgress, "change", (value) => {
//     const normalized = Math.max(0, Math.min(1, value))
//     const position = normalized * parts.length
//     const index = Math.min(parts.length - 1, Math.floor(position))
//     const localProgress = Math.min(1, position - index)
//     if (activeRef.current !== index) {
//       activeRef.current = index
//       setActive(index)
//     }
//     const frame = index * FRAMES_PER_HIGHLIGHT + Math.min(FRAMES_PER_HIGHLIGHT - 1, Math.floor(localProgress * FRAMES_PER_HIGHLIGHT))
//     if (frameRef.current && frameRef.current.dataset.frame !== String(frame)) {
//       frameRef.current.src = `/product/fenix/awareness-frames-hq/frame-${String(frame).padStart(3, "0")}.webp`
//       frameRef.current.dataset.frame = String(frame)
//     }
//     const atOpening = normalized < 0.005
//     if (atStartRef.current !== atOpening) {
//       atStartRef.current = atOpening
//       setAtStart(atOpening)
//     }
//   })
//
//   return (
//     <section ref={sectionRef} aria-label="FENIX awareness" className={`fenix-awareness font-orbit${reduceMotion ? " awareness-reduced" : ""}`}>
//       <div className="awareness-stage">
//         {/* PREVIOUS UI:
//         <header className="awareness-heading">
//           <h2>Every detail. <span>Greater awareness.</span></h2>
//         </header>
//         */}
//         {/* PREVIOUS HEADING UI:
//         <header className="awareness-heading w-full max-w-[120rem] 3xl:max-w-[140rem] mx-auto">
//           <h2>Every detail. <span>Greater awareness.</span></h2>
//         </header>
//         */}
//         <header className="awareness-heading w-full max-w-[120rem] 3xl:max-w-[140rem] mx-auto">
//           <h2>Every detail. <br className="sm:hidden" /><span className="inline-block whitespace-nowrap sm:whitespace-normal">Greater awareness.</span></h2>
//         </header>
//         {/* PREVIOUS UI (Uncentered two-column grid with translateX offset and scaled media causing overflow):
//         <div className="awareness-layout">
//           <div className="awareness-panel">
//             {reduceMotion ? parts.map((part, index) => <DetailCard key={part.name} part={part} index={index} />) : (
//               <AnimatePresence mode="wait">
//                 <motion.div key={active} initial="hidden" whileInView="visible" viewport={{ amount: 0.2 }} variants={{ visible: { transition: { staggerChildren: 0.14 } } }} exit={{ opacity: 0, transition: { duration: 0.12 } }}>
//                   <DetailCard part={parts[active]} index={active} />
//                 </motion.div>
//               </AnimatePresence>
//             )}
//           </div>
//           <div className="awareness-media">
//             <video ref={videoRef} src="/product/fenix/FENIX_Awareness.mp4" poster="/product/fenix/FENIX_Awareness-entry.jpg" aria-label="Scroll-controlled view of the FENIX sensor system" muted playsInline preload="auto" onLoadedMetadata={(event) => { event.currentTarget.currentTime = VIDEO_START }} onError={() => setMediaError(true)} />
//             <img className="awareness-opening" src="/product/fenix/FENIX_Awareness-entry.jpg" alt="" aria-hidden="true" style={{ opacity: atStart || reduceMotion ? 1 : 0 }} />
//             {mediaError && <p className="awareness-video-error">Video unavailable. Sensor details remain available alongside the preview.</p>}
//           </div>
//         </div>
//         */}
//         <div className="awareness-layout">
//           <div className="awareness-stage-box">
//             <div className="awareness-panel">
//               {reduceMotion ? parts.map((part, index) => <DetailCard key={part.name} part={part} index={index} />) : (
//                 <AnimatePresence mode="wait">
//                   <motion.div key={active} initial="hidden" whileInView="visible" viewport={{ amount: 0.2 }} variants={{ visible: { transition: { staggerChildren: 0.14 } } }} exit={{ opacity: 0, transition: { duration: 0.12 } }}>
//                     <DetailCard part={parts[active]} index={active} />
//                   </motion.div>
//                 </AnimatePresence>
//               )}
//             </div>
//             <div className="awareness-media">
//               <img ref={frameRef} data-frame="0" className="awareness-video-frame" src="/product/fenix/awareness-frames-hq/frame-000.webp" alt="FENIX sensor system, scroll-controlled view" />
//               {/* Keep the annotated opening view visible until the first scroll. */}
//               <img className="awareness-opening" src="/product/fenix/FENIX_Awareness-entry.jpg" alt="" aria-hidden="true" style={{ opacity: atStart || reduceMotion ? 1 : 0 }} />
//             </div>
//           </div>
//         </div>
//       </div>
//       <style jsx global>{`
//         .fenix-awareness { position: relative; height: 600dvh; background: #fff; color: #171717; }
//         /* PREVIOUS UI:
//         .awareness-stage { position: sticky; top: 0; height: 100dvh; padding: var(--fenix-title-top) var(--fenix-title-inset) 3dvh; display: flex; flex-direction: column; gap: 3dvh; overflow: hidden; }
//         .awareness-heading { position: relative; z-index: 2; flex-shrink: 0; background: #fff; }
//         .awareness-heading h2 { font-size: clamp(24px, 2.8vw, 54px); line-height: 1.15; font-weight: 400; }
//         .awareness-heading h2 span { color: #29bbc3; }
//         .awareness-layout { display: grid; grid-template-columns: minmax(0, .8fr) minmax(0, 1.6fr); align-items: center; gap: 5vw; flex: 1; min-height: 0; clip-path: inset(0 -100vw); }
//         .awareness-panel { position: relative; z-index: 1; max-width: 320px; min-width: 0; }
//         .awareness-card { display: grid; gap: 10px; }
//         .awareness-closeup { height: clamp(90px, 14dvh, 160px); overflow: hidden; border-radius: 12px; background: #f4f4f4; }
//         .awareness-closeup img { width: 100%; height: 100%; object-fit: cover; transform: scale(2.5); }
//         .awareness-copy, .awareness-details { background: #f5f5f5; border: 1px solid #e2e2e2; border-radius: 12px; padding: clamp(12px, 1.1vw, 18px); }
//         .awareness-eyebrow { font-size: 10px !important; text-transform: uppercase; color: #158c94 !important; letter-spacing: .06em; margin-bottom: 10px; }
//         .awareness-copy h3 { font-size: clamp(17px, 1.2vw, 22px); font-weight: 500; line-height: 1.25; margin-bottom: 10px; }
//         .awareness-copy > p:last-child { font-size: clamp(12px, .85vw, 16px); line-height: 1.55; color: #626262; }
//         .awareness-details { display: grid; gap: 12px; }
//         .awareness-details dt { font-size: 10px; text-transform: uppercase; color: #737373; padding-bottom: 8px; border-bottom: 1px solid #ddd; margin-bottom: 9px; }
//         .awareness-details dd { font-size: clamp(13px, 1vw, 18px); font-weight: 500; }
//         .awareness-media { position: relative; min-width: 0; }
//         .awareness-media .awareness-video-frame, .awareness-opening { display: block; width: 100%; max-height: 65dvh; aspect-ratio: 16/9; object-fit: contain; transform: translateX(-3%) scale(1.4); filter: brightness(1.05); mix-blend-mode: multiply; }
//         .awareness-opening { position: absolute; inset: 0; height: 100%; mix-blend-mode: normal; pointer-events: none; }
//         .awareness-video-error { position: absolute; inset: auto 0 0; z-index: 2; padding: 8px; background: #fff; font-size: 13px; color: #626262; }
//         .awareness-reduced { height: auto; }
//         .awareness-reduced .awareness-stage { position: relative; height: auto; overflow: visible; }
//         .awareness-reduced .awareness-panel { display: grid; gap: 32px; }
//         .awareness-reduced .awareness-layout { align-items: start; }
//         @media (min-width: 1024px) {
//           .awareness-panel { transform: translateX(calc(min(18vw, 340px) + 104px)); }
//         }
//         */
//         .awareness-stage { position: sticky; top: 0; height: 100dvh; padding: var(--fenix-title-top) var(--fenix-title-inset) 2dvh; display: flex; flex-direction: column; gap: 2dvh; overflow: hidden; }
//         .awareness-heading { position: relative; z-index: 2; flex-shrink: 0; background: #fff; }
//         .awareness-heading h2 { font-size: clamp(24px, 2.8vw, 54px); line-height: 1.15; font-weight: 400; }
//         .awareness-heading h2 span { color: #29bbc3; }
//         .awareness-layout {
//           flex: 1;
//           min-height: 0;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           width: 100%;
//           position: relative;
//         }
//         /* PREVIOUS UI (Centered 16:9 stage box at scale 1.0 without horizontal translation):
//         .awareness-stage-box {
//           position: relative;
//           width: 100%;
//           max-width: min(1280px, 88vw);
//           max-height: min(65dvh, 580px);
//           aspect-ratio: 16 / 9;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//         }
//         .awareness-panel {
//           position: absolute;
//           right: calc(100% - 26.8%);
//           width: clamp(240px, 23vw, 305px);
//           top: 50%;
//           transform: translateY(-50%);
//           z-index: 10;
//         }
//         .awareness-media { position: relative; width: 100%; height: 100%; min-width: 0; }
//         .awareness-media .awareness-video-frame, .awareness-opening { display: block; width: 100%; height: 100%; object-fit: contain; filter: brightness(1.05); mix-blend-mode: multiply; }
//         */
//         /* PREVIOUS UI (max-h 72dvh, scale 1.15, right 28.4%):
//         .awareness-stage-box {
//           position: relative;
//           width: 100%;
//           max-width: min(1380px, 92vw);
//           max-height: min(72dvh, 640px);
//           aspect-ratio: 16 / 9;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//         }
//         .awareness-panel {
//           position: absolute;
//           right: calc(100% - 28.4%);
//           width: clamp(240px, 23vw, 310px);
//           top: 50%;
//           transform: translateY(-50%);
//           z-index: 10;
//         }
//         .awareness-media {
//           position: relative;
//           width: 100%;
//           height: 100%;
//           min-width: 0;
//           transform: translateX(5%) scale(1.15);
//         }
//         */
//         {/* PREVIOUS UI:
//         .awareness-stage-box {
//           position: relative;
//           width: 100%;
//           max-width: min(1440px, 94vw);
//           max-height: min(75dvh, 680px);
//           aspect-ratio: 16 / 9;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//         }
//         .awareness-panel {
//           position: absolute;
//           right: calc(100% - 30%);
//           width: clamp(240px, 23vw, 310px);
//           top: 50%;
//           transform: translateY(-50%);
//           z-index: 10;
//         }
//         */}
//         .awareness-stage-box {
//           position: relative;
//           width: 100%;
//           max-width: min(1440px, 94vw);
//           max-height: min(75dvh, 680px);
//           aspect-ratio: 16 / 9;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//         }
//         .awareness-panel {
//           position: absolute;
//           right: calc(100% - 30%);
//           width: clamp(240px, 23vw, 310px);
//           top: 50%;
//           transform: translateY(-50%);
//           z-index: 10;
//         }
//         @media (min-width: 768px) and (max-width: 1023px) {
//           .awareness-stage-box { max-width: 96vw; max-height: 72dvh; }
//           .awareness-panel {
//             left: 0;
//             right: auto;
//             width: clamp(220px, 28vw, 275px);
//           }
//           .awareness-media {
//             transform: translateX(12%) scale(1.12) !important;
//           }
//         }
//         @media (min-width: 1920px) {
//           .awareness-stage-box { max-width: min(1680px, 90vw); max-height: min(78dvh, 820px); }
//         }
//         @media (min-width: 2560px) {
//           .awareness-stage-box { max-width: min(2000px, 88vw); max-height: min(80dvh, 980px); }
//           .awareness-panel { width: clamp(320px, 18vw, 420px); }
//           .awareness-closeup { height: clamp(130px, 16dvh, 190px); }
//         }
//         @media (min-width: 3440px) {
//           .awareness-stage-box { max-width: min(2400px, 84vw); max-height: min(82dvh, 1120px); }
//         }
//         .awareness-card { display: grid; gap: 10px; }
//         .awareness-closeup { height: clamp(85px, 13dvh, 140px); overflow: hidden; border-radius: 12px; background: #f4f4f4; }
//         .awareness-closeup img { width: 100%; height: 100%; object-fit: cover; transform: scale(2.5); }
//         .awareness-copy, .awareness-details { background: #f5f5f5; border: 1px solid #e2e2e2; border-radius: 12px; padding: clamp(10px, 1vw, 16px); }
//         .awareness-eyebrow { font-size: 10px !important; text-transform: uppercase; color: #158c94 !important; letter-spacing: .06em; margin-bottom: 8px; }
//         .awareness-copy h3 { font-size: clamp(15px, 1.1vw, 20px); font-weight: 500; line-height: 1.25; margin-bottom: 8px; }
//         .awareness-copy > p:last-child { font-size: clamp(11px, .8vw, 15px); line-height: 1.5; color: #626262; }
//         .awareness-details { display: grid; gap: 10px; }
//         .awareness-details dt { font-size: 10px; text-transform: uppercase; color: #737373; padding-bottom: 6px; border-bottom: 1px solid #ddd; margin-bottom: 7px; }
//         .awareness-details dd { font-size: clamp(12px, .95vw, 16px); font-weight: 500; }
//         .awareness-media {
//           position: relative;
//           width: 100%;
//           height: 100%;
//           min-width: 0;
//           transform: translateX(5%) scale(1.22);
//         }
//         .awareness-media .awareness-video-frame, .awareness-opening { display: block; width: 100%; height: 100%; object-fit: contain; filter: brightness(1.05); mix-blend-mode: multiply; }
//         .awareness-opening { position: absolute; inset: 0; height: 100%; mix-blend-mode: normal; pointer-events: none; }
//         .awareness-video-error { position: absolute; inset: auto 0 0; z-index: 2; padding: 8px; background: #fff; font-size: 13px; color: #626262; }
//         .awareness-reduced { height: auto; }
//         .awareness-reduced .awareness-stage { position: relative; height: auto; overflow: visible; }
//         .awareness-reduced .awareness-panel { display: grid; gap: 32px; position: static; transform: none; width: 100%; }
//         .awareness-reduced .awareness-stage-box { aspect-ratio: auto; max-height: none; flex-direction: column; }
//         .awareness-reduced .awareness-layout { align-items: start; }
//         @media (max-width: 767px) {
//           .awareness-stage { padding-bottom: 2dvh; gap: 2dvh; }
//           .awareness-layout { display: flex; flex-direction: column-reverse; justify-content: center; gap: 2dvh; }
//           .awareness-stage-box { display: flex; flex-direction: column-reverse; width: 100%; aspect-ratio: auto; max-height: none; gap: 3dvh; }
//           .awareness-panel, .awareness-media { width: 100%; max-width: none; position: static; transform: none; }
//           /* PREVIOUS SMALL VIDEO SCALING:
//           .awareness-media .awareness-video-frame, .awareness-opening { max-height: 27dvh; transform: scale(1.18); height: auto; }
//           */
//           .awareness-media { position: relative; height: 40dvh; flex-shrink: 0; overflow: hidden; }
//           .awareness-media .awareness-video-frame, .awareness-opening { position: absolute; inset: auto; left: 50%; top: 50%; width: 200%; max-width: none; max-height: none; height: auto; transform: translate(-66%, -50%); }
//           .awareness-card { grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 8px; }
//           .awareness-closeup { display: none; }
//           .awareness-copy, .awareness-details { padding: 12px; border-radius: 9px; }
//           .awareness-copy h3 { font-size: 16px; margin-bottom: 8px; }
//           .awareness-copy > p:last-child { font-size: 11px; }
//           .awareness-eyebrow { font-size: 8px !important; }
//           .awareness-details { gap: 12px; }
//           .awareness-details dt { font-size: 8px; }
//           .awareness-details dd { font-size: 12px; }
//           .awareness-reduced .awareness-layout { flex-direction: column-reverse; }
//         }
//         @media (max-width: 420px) {
//           .awareness-card { grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 6px; }
//           /* PREVIOUS 24DVH CAP:
//           .awareness-media .awareness-video-frame, .awareness-opening { max-height: 24dvh; }
//           */
//           .awareness-copy, .awareness-details { padding: 9px; }
//         }
//       `}</style>
//     </section>
//   )
// }
