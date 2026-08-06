"use client"

import React, { useRef } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { ShieldAlert, CheckCircle2, Cpu, Zap } from "lucide-react"

export default function FenixTurtleMode(): React.JSX.Element {
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    })
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    })

    const sectionBg = useTransform(smoothProgress, [0.95, 1], ["#ffffff", "#0a0a0a"])

    return (
        <motion.div
            ref={containerRef}
            style={{ backgroundColor: sectionBg }}
            /* PREVIOUS UI: className="relative h-[200vh] text-neutral-900 font-sans selection:bg-cyan-500/30 overflow-clip" */
            className="relative h-[200vh] text-neutral-900 font-orbit selection:bg-cyan-500/30 overflow-clip"
        >
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap');
        .font-mono-tech {
          font-family: 'JetBrains Mono', monospace;
        }
      `}</style>

            {/* Sticky Render Area */}
            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">

                {/* Cinematic Background Grid */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,217,255,0.05)_0%,transparent_80%)]" />
                    <div
                        className="absolute inset-0 opacity-20"
                        style={{
                            backgroundImage: `linear-gradient(to right, rgba(0,217,255,0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,217,255,0.15) 1px, transparent 1px)`,
                            backgroundSize: '60px 60px'
                        }}
                    />
                </div>

                {/* Drone Animation Layer (Active) */}
                <div className="relative w-[85vw] md:w-[70vw] aspect-video z-10 flex items-center justify-center">
                    <video 
                        src="/images/Fenix/turtle-mode.av1.mp4" 
                        autoPlay 
                        loop 
                        muted 
                        playsInline 
                        className="w-full h-full object-contain filter drop-shadow-[0_20px_50px_rgba(0,0,0,0.1)]"
                    />
                </div>

                {/* Content Overlay */}
                <div className="absolute inset-0 z-20 pointer-events-none flex flex-col items-center justify-center px-6">
                    {/* Watermark Branding */}
                    <motion.div
                        style={{
                            opacity: useTransform(smoothProgress, [0, 0.5, 1], [0.06, 0.1, 0.06]),
                            scale: useTransform(smoothProgress, [0, 1], [1, 1.05])
                        }}
                        className="absolute top-[12%] left-0 w-full text-center px-4"
                    >
                        {/* PREVIOUS UI: style={{ fontFamily: "'ClashGrotesk Bold (.eot)', sans-serif" }} */}
                        <h1 className="text-[9vw] font-black text-neutral-900 uppercase tracking-tighter italic leading-none whitespace-nowrap">
                            Turtle Mode
                        </h1>
                    </motion.div>

                    {/* Description Text */}
                    <motion.div
                        style={{
                            opacity: useTransform(smoothProgress, [0, 0.9, 1], [1, 1, 0]),
                            y: useTransform(smoothProgress, [0, 1], [0, 0])
                        }}
                        className="absolute bottom-24 text-center max-w-2xl px-8"
                    >
                        <p className="text-lg md:text-xl font-light leading-relaxed text-neutral-600">
                            enables autonomous flip-back to restore operational posture without manual intervention.
                        </p>
                    </motion.div>

                    {/* Stage 1 Info Card: Detection - Disabled
                    <motion.div
                        style={{ opacity: card1Opacity, y: card1Y }}
                        className="absolute left-[10%] bottom-[25%] z-30 pointer-events-auto"
                    >
                        <div className="relative bg-white shadow-2xl border border-neutral-100 p-6 w-[280px] md:w-[320px]">
                            <svg className="absolute -right-[120px] top-1/2 -translate-y-1/2 w-[400px] h-[300px] pointer-events-none overflow-visible">
                                <motion.path
                                    d="M -20 180 L 150 190 L 230 -20"
                                    fill="none"
                                    stroke="#5ce1e6"
                                    strokeWidth="1.5"
                                    style={{ pathLength: line1Draw }}
                                />
                                <motion.circle
                                    cx="550" cy="40" r="3" fill="#5ce1e6"
                                    style={{ opacity: line1Draw }}
                                />
                            </svg>

                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-cyan-50 rounded-lg">
                                    <ShieldAlert className="w-5 h-5 text-[#5ce1e6]" />
                                </div>
                                <h3 className="text-sm font-bold tracking-widest text-[#5ce1e6] uppercase">Detection Mode</h3>
                            </div>

                            <ul className="space-y-3">
                                {[
                                    { label: "IMU Orientation", value: "180° Inverted" },
                                    { label: "AI Decision", value: "Recovery Required" },
                                    { label: "Signal Strength", value: "-45 dBm" },
                                    { label: "Power Status", value: "Optimal" }
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-2 group">
                                        <div className="w-1.5 h-0.5 bg-neutral-200 group-hover:bg-[#5ce1e6] transition-colors" />
                                        <div className="flex justify-between w-full text-[11px] md:text-xs">
                                            <span className="text-neutral-400">{item.label}</span>
                                            <span className="font-bold text-neutral-800">{item.value}</span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                    */}

                    {/* Stage 3 Info Card: Restoration - Disabled
                    <motion.div
                        style={{ opacity: card3Opacity, y: card3Y }}
                        className="absolute right-[10%] top-[25%] z-30 pointer-events-auto"
                    >
                        <div className="relative bg-white shadow-2xl border border-neutral-100 p-6 w-[280px] md:w-[320px]">
                            <svg className="absolute -left-[120px] top-1/2 -translate-y-1/2 w-[120px] h-[300px] pointer-events-none overflow-visible">
                                <motion.path
                                    d="M 120 150 L 50 150 L -180 300"
                                    fill="none"
                                    stroke="#22c55e"
                                    strokeWidth="1.5"
                                    style={{ pathLength: line3Draw }}
                                />
                                <motion.circle
                                    cx="-180" cy="300" r="3" fill="#22c55e"
                                    style={{ opacity: line3Draw }}
                                />
                            </svg>

                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-green-50 rounded-lg">
                                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                                </div>
                                <h3 className="text-sm font-bold tracking-widest text-green-600 uppercase">Recovery Success</h3>
                            </div>

                            <ul className="space-y-3">
                                {[
                                    { label: "Attitude", value: "0° Nominal" },
                                    { label: "Gyro State", value: "Stabilized" },
                                    { label: "Motor Ready", value: "100% Armed" },
                                    { label: "System Check", value: "Passed ✓" }
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-2 group">
                                        <div className="w-1.5 h-0.5 bg-neutral-200 group-hover:bg-green-400 transition-colors" />
                                        <div className="flex justify-between w-full text-[11px] md:text-xs">
                                            <span className="text-neutral-400">{item.label}</span>
                                            <span className="font-bold text-neutral-800">{item.value}</span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                    */}
                </div >

            </div >
        </motion.div >
    )
}
