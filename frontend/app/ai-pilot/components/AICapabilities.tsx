"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion"

const capabilities = [
    // PREVIOUS UI:
    // { title: "Modularity", desc: "Transforms any next-generation or legacy platform—from UAVs and ground vehicles to fighter aircraft, into a fully autonomous asset capable of navigating evolving threats." },
    { title: "Modularity", desc: "Transforms next-generation or legacy platform, UAS from ground vehicles to fighter aircraft, into a fully autonomous asset capable of navigating evolving threats." },
    // PREVIOUS UI:
    // { title: "Interoperability", desc: "Seamlessly integrates across disparate systems and coalition networks to ensure unified mission coordination and real-time data synchronization in contested environments." },
    { title: "Interoperability", desc: "Seamlessly integrate across disparate systems and coalition networks to ensure unified mission coordination and real-time data synchronization in contested environments." },
    { title: "Multi-Domain", desc: "Delivers consistent, high-performance tactical intelligence across air, land, sea, and sub-surface platforms to maintain persistent operational dominance in any theater of war." },
    { title: "Open Architecture", desc: "Built on a non-proprietary framework that enables rapid software deployment, third-party integration, and immediate scaling to meet emerging battlefield requirements." },
]

function CapabilityPanel({ index, phase }: { index: number; phase: MotionValue<number> }) {
    const transform = useTransform(phase, value => {
        const distance = Math.max(-2, Math.min(2, index - value))
        const depth = Math.min(1, Math.abs(distance))
        return `translate3d(calc(-50% + ${distance * 78}%), calc(-50% + ${depth * 28}px), ${-depth * 80}px) rotateY(${-distance * 3}deg) scale(${1 - depth * .1})`
    })
    const opacity = useTransform(phase, value => {
        const distance = Math.abs(index - value)
        return distance <= 1 ? 1 - distance * .72 : Math.max(0, .28 - (distance - 1) * 1.12)
    })
    const filter = useTransform(phase, value => `blur(${Math.min(1, Math.abs(index - value)) * 3}px)`)
    const detailOpacity = useTransform(phase, value => Math.max(0, 1 - Math.abs(index - value) * 1.4))
    const zIndex = useTransform(phase, value => Math.round(20 - Math.abs(index - value) * 5))

    return (
        <motion.article className="ai-cap-panel" data-capability={index} style={{ transform, opacity, filter, zIndex }}>
            <div className="ai-cap-copy">
                <h3>{capabilities[index].title}</h3>
                <motion.p style={{ opacity: detailOpacity }}>{capabilities[index].desc}</motion.p>
            </div>
        </motion.article>
    )
}

// Upright tablets only: a numbered progress rail under the panels that fills as the capabilities scroll past.
function CapabilityRailItem({ index, phase }: { index: number; phase: MotionValue<number> }) {
    const fill = useTransform(phase, value => Math.max(0, Math.min(1, value - index + 1)))
    const opacity = useTransform(phase, value => 1 - Math.min(1, Math.abs(index - value)) * .6)
    return (
        <li>
            <span className="ai-cap-rail-track"><motion.span className="ai-cap-rail-fill" style={{ scaleX: fill }} /></span>
            <motion.span className="ai-cap-rail-label" style={{ opacity }}><b>0{index + 1}</b>{capabilities[index].title}</motion.span>
        </li>
    )
}

export default function AICapabilities() {
    const sectionRef = useRef<HTMLElement>(null)
    const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] })
    const phase = useTransform(scrollYProgress, [0, .08, .92, 1], [0, 0, 3, 3])

    return (
        <section ref={sectionRef} className="ai-capabilities font-orbit" aria-label="AI-Pilot capabilities">
            <div className="ai-cap-stage">
                <div className="ai-cap-content">
                    <div className="ai-cap-visual">
                        <img
                            src="/ai-pilot/something.png"
                            alt="MAVERICK AI Pilot autonomy computer"
                            loading="lazy"
                            decoding="async"
                        />
                    </div>
                    <div className="ai-cap-panels" aria-label="AI-Pilot capabilities">
                        {capabilities.map((item, index) => <CapabilityPanel key={item.title} index={index} phase={phase} />)}
                    </div>
                </div>
                <ol className="ai-cap-rail" aria-hidden="true">
                    {capabilities.map((item, index) => <CapabilityRailItem key={item.title} index={index} phase={phase} />)}
                </ol>
            </div>
            <style jsx global>{`
                .ai-cap-rail { display: none; }
                .ai-capabilities { position: relative; height: 340svh; background: #ededeb; color: #171b1d; }
                .ai-cap-stage { position: sticky; top: 0; height: 100svh; padding: max(5rem, 9svh) 5vw 3svh; display: flex; flex-direction: column; overflow: hidden; }
                .ai-cap-content { flex: 1; min-height: 0; display: grid; grid-template-columns: 1fr 1.05fr; gap: 1vw; }
                .ai-cap-panels { position: relative; min-width: 0; perspective: 1200px; overflow: hidden; -webkit-mask-image: linear-gradient(90deg, transparent, black 8%, black 92%, transparent); mask-image: linear-gradient(90deg, transparent, black 8%, black 92%, transparent); }
                /* PREVIOUS UI:
                .ai-cap-panel { position: absolute; top: 50%; left: 50%; width: 76%; padding: 0 1.5vw; background: transparent; border: 0; box-shadow: none; color: #172326; isolation: isolate; backface-visibility: hidden; }
                */
                .ai-cap-panel { position: absolute; top: calc(50% - clamp(2.5rem, 5.5vh, 4.25rem)); left: 50%; width: 76%; padding: 0 1.5vw; background: transparent; border: 0; box-shadow: none; color: #172326; isolation: isolate; backface-visibility: hidden; }
                .ai-cap-panel::before { content: ""; position: absolute; inset: -25% -12%; z-index: -1; pointer-events: none; background: #ffffff30; -webkit-backdrop-filter: blur(8px); backdrop-filter: blur(8px); -webkit-mask-image: radial-gradient(ellipse, black 15%, transparent 72%); mask-image: radial-gradient(ellipse, black 15%, transparent 72%); }
                .ai-cap-copy { max-width: 40ch; font-family: var(--font-inter), Arial, sans-serif; font-size: clamp(16px, 1.05vw, 20px); }
                .ai-cap-panel h3 { font-family: "Orbit", sans-serif; font-size: clamp(20px, 2.3vw, 42px); font-weight: 400; letter-spacing: -.045em; line-height: 1.2; white-space: nowrap; text-align: center; }
                /* PREVIOUS UI:
                .ai-cap-panel p { margin-top: 26px; max-width: 40ch; font-family: var(--font-inter), Arial, sans-serif; font-size: clamp(16px, 1.05vw, 20px); font-weight: 400; line-height: 1.7; color: #536165; text-align: left; }
                */
                .ai-cap-panel p { margin-top: 26px; max-width: 40ch; font-family: var(--font-inter), Arial, sans-serif; font-size: clamp(16px, 1.05vw, 20px); font-weight: 400; line-height: 1.7; color: #536165; text-align: justify; }
                .ai-cap-visual { position: relative; min-width: 0; align-self: stretch; display: flex; align-items: center; }
                /* PREVIOUS UI:
                .ai-cap-visual img { display: block; width: 112%; max-width: none; height: 100%; max-height: 65svh; object-fit: contain; margin-left: -4%; }
                */
                .ai-cap-visual img { display: block; width: 112%; max-width: none; height: 100%; max-height: 65svh; object-fit: contain; margin-left: -4%; transform: translateY(-clamp(2rem, 5vh, 3.75rem)); }
                @media (max-width: 1023px) {
                    .ai-cap-stage { padding: 76px 5vw 18px; }
                    .ai-cap-content { grid-template-columns: 1fr; grid-template-rows: minmax(0, .55fr) minmax(0, 1.45fr); gap: 0; }
                    .ai-cap-visual { grid-row: 1; justify-content: center; }
                    /* PREVIOUS UI:
                    .ai-cap-visual img { width: 100%; height: 100%; max-height: 29svh; margin-left: 0; }
                    */
                    .ai-cap-visual img { width: 100%; height: 100%; max-height: 29svh; margin-left: 0; transform: none; }
                    .ai-cap-panels { grid-row: 2; margin-inline: -5vw; }
                    /* PREVIOUS UI:
                    .ai-cap-panel { width: 80%; padding: 0 12px; }
                    */
                    .ai-cap-panel { top: 50%; width: 80%; padding: 0 12px; }
                    .ai-cap-copy { font-size: 14px; }
                    .ai-cap-panel h3 { font-size: clamp(18px, 3.5vw, 28px); white-space: normal; text-wrap: balance; }
                    .ai-cap-panel p { font-size: 14px; line-height: 1.65; margin-top: 18px; }
                }
                @media (max-width: 767px) {
                    .ai-cap-stage { padding: max(68px, 8svh) 5vw 24px; }
                    .ai-cap-content { grid-template-rows: minmax(0, 1fr) minmax(0, .95fr); }
                    .ai-cap-visual { isolation: isolate; }
                    .ai-cap-visual::before { content: ''; position: absolute; width: 94%; height: 65%; border: 1px solid #638b8d30; border-radius: 50%; transform: rotate(-12deg); background: radial-gradient(ellipse, #5ce1e621, transparent 70%); z-index: -1; }
                    .ai-cap-visual::after { content: ''; position: absolute; bottom: 14%; width: 70%; height: 6%; background: #1d3a3c20; border-radius: 50%; filter: blur(12px); z-index: -1; }
                    .ai-cap-visual img { position: relative; width: 110%; max-height: 42svh; filter: drop-shadow(0 14px 12px #122e3012); }
                    .ai-cap-panel { width: 86%; padding: 0 16px; }
                    .ai-cap-panel h3 { font-size: clamp(23px, 6.3vw, 30px); letter-spacing: -.04em; }
                    .ai-cap-panel p { font-size: 15px; line-height: 1.65; margin-top: 20px; }
                }
                /* Upright tablets (iPad mini, iPad Air/Pro, Surface Pro): one shared layout, sized from the screen height so
                   every tablet looks the same. Device on an orbit ring up top, capability card below, progress rail at the bottom.
                   PREVIOUS UI: under 1024px wide the stacked layout above (small image, big empty gaps); 1024px+ tablets
                   (iPad Pro 13) got the side-by-side desktop layout. */
                @media (min-width: 768px) and (orientation: portrait) {
                    .ai-cap-stage { padding: clamp(88px, 9svh, 128px) 7vw clamp(32px, 4.5svh, 64px); }
                    .ai-cap-content { grid-template-columns: 1fr; grid-template-rows: minmax(0, 1.05fr) minmax(0, .95fr); gap: 0; }
                    .ai-cap-visual { grid-row: 1; justify-content: center; align-items: center; isolation: isolate; }
                    .ai-cap-visual::before { content: ''; position: absolute; left: 50%; top: 50%; width: min(86%, 62svh); aspect-ratio: 2.1; border: 1px solid #638b8d36; border-radius: 50%; transform: translate(-50%, -50%) rotate(-10deg); background: radial-gradient(ellipse, #5ce1e624, transparent 68%); z-index: -1; }
                    .ai-cap-visual::after { content: ''; position: absolute; left: 50%; bottom: 12%; width: min(60%, 44svh); height: 5%; transform: translateX(-50%); background: #1d3a3c26; border-radius: 50%; filter: blur(14px); z-index: -1; }
                    .ai-cap-visual img { position: relative; width: min(78%, 58svh); height: auto; max-height: 36svh; margin: 0; transform: none; filter: drop-shadow(0 18px 16px #122e3014); }
                    .ai-cap-panels { grid-row: 2; margin-inline: -7vw; }
                    .ai-cap-panel { top: 50%; width: min(66%, 34svh + 160px); padding: 0 16px; }
                    .ai-cap-copy { max-width: none; font-size: clamp(16px, 1.45svh, 20px); }
                    .ai-cap-panel h3 { font-size: clamp(30px, 3.4svh, 46px); white-space: nowrap; }
                    .ai-cap-panel p { max-width: none; font-size: clamp(16px, 1.45svh, 20px); line-height: 1.7; margin-top: clamp(16px, 2svh, 28px); }
                    .ai-cap-rail { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; width: min(100%, 52svh + 180px); margin: clamp(12px, 2svh, 28px) auto 0; list-style: none; padding: 0; }
                    .ai-cap-rail li { min-width: 0; }
                    .ai-cap-rail-track { display: block; height: 2px; background: #171b1d1a; overflow: hidden; }
                    .ai-cap-rail-fill { display: block; height: 100%; background: #36bec5; transform-origin: left; }
                    .ai-cap-rail-label { display: block; margin-top: 12px; font-size: clamp(10px, 1svh, 13px); letter-spacing: .12em; text-transform: uppercase; color: #3a4649; line-height: 1.4; }
                    .ai-cap-rail-label b { display: block; margin-bottom: 4px; font-weight: 400; color: #36bec5; }
                }
                @media (prefers-reduced-motion: reduce), (max-height: 600px) and (orientation: landscape) {
                    .ai-capabilities .ai-cap-rail { display: none; }
                    .ai-capabilities { height: auto; }
                    .ai-capabilities .ai-cap-stage { position: relative; height: auto; min-height: 100svh; gap: 2rem; }
                    .ai-capabilities .ai-cap-panels { display: grid; gap: 1rem; overflow: visible; margin: 0; }
                    .ai-capabilities .ai-cap-panel { position: relative; top: auto; left: auto; width: 100%; transform: none !important; filter: none !important; opacity: 1 !important; }
                    .ai-capabilities .ai-cap-panel p { opacity: 1 !important; }
                    .ai-capabilities .ai-cap-panels { -webkit-mask-image: none; mask-image: none; }
                    .ai-capabilities .ai-cap-visual { align-self: start; }
                    .ai-capabilities .ai-cap-visual img { max-height: 50svh; transform: none !important; }
                }
                @media (prefers-reduced-motion: reduce) and (max-width: 1023px), (max-height: 600px) and (orientation: landscape) {
                    .ai-capabilities .ai-cap-content { display: flex; flex-direction: column; gap: 2rem; }
                }
            `}</style>
        </section>
    )
}
