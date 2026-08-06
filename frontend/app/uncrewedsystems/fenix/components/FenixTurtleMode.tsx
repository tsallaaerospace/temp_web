"use client"

import React, { useRef } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
/* PREVIOUS UI: import { ShieldAlert, CheckCircle2, Cpu, Zap } from "lucide-react" */
import { ShieldAlert, CheckCircle2, Cpu } from "lucide-react"

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

    // PREVIOUS UI: sectionBg faded the white presentation into `#0a0a0a` at the end of the scroll.

    return (
        <motion.div
            ref={containerRef}
            /* PREVIOUS UI: style={{ backgroundColor: sectionBg }} */
            /* PREVIOUS UI: className="relative h-[200vh] overflow-clip bg-white font-orbit text-neutral-900 selection:bg-cyan-500/30" */
            className="relative h-[200dvh] overflow-clip bg-white font-orbit text-neutral-900 selection:bg-cyan-500/30"
        >
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap');
        .font-mono-tech {
          font-family: 'JetBrains Mono', monospace;
        }
      `}</style>

            {/* Sticky Render Area */}
            {/* PREVIOUS UI: className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden" */}
            <div className="sticky top-0 flex h-[100dvh] w-full items-center justify-center overflow-hidden">

                {/* Premium white technical grid */}
                <div className="absolute inset-0 z-0">
                    {/* PREVIOUS UI: centered cyan radial glow with a dark end-of-scroll background. */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(92,225,230,0.16)_0%,rgba(255,255,255,0)_43%),linear-gradient(180deg,#ffffff_0%,#f8fbfb_100%)]" />
                    <div
                        className="absolute inset-0 opacity-[0.18]"
                        style={{
                            backgroundImage: `linear-gradient(to right, rgba(23, 43, 45, 0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(23, 43, 45, 0.12) 1px, transparent 1px)`,
                            backgroundSize: '68px 68px'
                        }}
                    />
                    <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-neutral-900/[0.08]" />
                </div>

                {/* Recovery footage */}
                {/* PREVIOUS UI: className="relative w-[85vw] md:w-[70vw] aspect-video z-10 flex items-center justify-center" */}
                <motion.div
                    style={{
                        scale: useTransform(smoothProgress, [0, 0.18, 0.82, 1], [0.94, 1, 1, 1.04]),
                    }}
                    /* PREVIOUS UI: video opacity used `[0, 1, 1, 0.7]`, fading it in as the section entered. */
                    /* PREVIOUS DESKTOP WIDTH: `lg:w-[70vw]` left too little room for the title at the video edge. */
                    {/* PREVIOUS UI: className="relative z-10 flex aspect-video w-[82vw] max-w-[32rem] items-center justify-center border border-neutral-900/10 bg-white p-1.5 shadow-[0_20px_50px_rgba(15,30,32,0.14)] sm:w-[84vw] sm:max-w-none sm:p-2 sm:shadow-[0_30px_80px_rgba(15,30,32,0.16)] lg:w-[64vw] xl:w-[66vw]" */}
                    className="relative z-10 flex aspect-video w-[90vw] max-w-[32rem] items-center justify-center border border-neutral-900/10 bg-white p-1.5 shadow-[0_20px_50px_rgba(15,30,32,0.14)] sm:w-[84vw] sm:max-w-none sm:p-2 sm:shadow-[0_30px_80px_rgba(15,30,32,0.16)] lg:w-[64vw] xl:w-[66vw]"
                >
                    <video 
                        src="/images/Fenix/turtle-mode.av1.mp4" 
                        autoPlay 
                        loop 
                        muted 
                        playsInline 
                        /* PREVIOUS UI: className="w-full h-full object-contain filter drop-shadow-[0_20px_50px_rgba(0,0,0,0.1)]" */
                        className="h-full w-full object-cover"
                    />
                    <div className="pointer-events-none absolute inset-x-1.5 top-1.5 flex items-center justify-between border-b border-white/20 bg-gradient-to-b from-black/45 to-transparent px-3 py-3 text-[9px] font-bold tracking-[0.18em] text-white sm:inset-x-2 sm:top-2 sm:px-4 sm:text-[10px]">
                        <span>FENIX / RECOVERY CAMERA</span>
                        <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-[#5ce1e6] shadow-[0_0_10px_#5ce1e6]" /> LIVE</span>
                    </div>
                    <div className="pointer-events-none absolute bottom-1.5 left-1.5 h-8 w-8 border-b border-l border-white/70 sm:bottom-2 sm:left-2 sm:h-12 sm:w-12" />
                    <div className="pointer-events-none absolute bottom-1.5 right-1.5 h-8 w-8 border-b border-r border-white/70 sm:bottom-2 sm:right-2 sm:h-12 sm:w-12" />
                </motion.div>

                {/* Content Overlay */}
                {/* Premium recovery interface */}
                {/* PREVIOUS UI: className="absolute inset-0 z-20 pointer-events-none flex flex-col items-center justify-center px-6" */}
                <div className="pointer-events-none absolute inset-0 z-20 px-5 sm:px-8 lg:px-[5vw]">
                    {/* Section identity */}
                    <motion.div
                        /* PREVIOUS UI: title opacity and Y transforms faded the title in after the section entered. */
                        /* PREVIOUS UI: className="absolute top-[12%] left-0 w-full text-center px-4" */
                        /* PREVIOUS DESKTOP POSITION: `lg:left-[5vw] lg:max-w-[17rem]` allowed the title to overlap the video. */
                        /* PREVIOUS MOBILE UI: `left-5 max-w-[12rem] text-left` anchored the identity block to the phone's left edge. */
                        /* PREVIOUS MOBILE POSITION: `top-8` sat too high near the top frame edge. */
                        className="absolute inset-x-0 top-14 max-w-none px-5 text-center sm:left-8 sm:right-auto sm:top-8 sm:max-w-[15rem] sm:px-0 sm:text-left lg:left-[3vw] lg:top-[10vh] lg:max-w-[9rem] xl:left-[4vw] xl:max-w-[11rem]"
                    >
                        {/* PREVIOUS UI: <div className="mb-3 flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] text-[#177f85]"><span className="h-px w-7 bg-[#177f85]" /> 04 / RECOVERY</div> */}
                        {/* PREVIOUS UI: `Turtle Mode` was a centered, low-opacity 9vw watermark. */}
                        {/* PREVIOUS UI: `text-[2rem] font-medium ... sm:text-[2.75rem] lg:text-[2.25rem] xl:text-[3rem]`. */}
                        {/* PREVIOUS MOBILE UI: `Turtle<br />Mode` forced the title onto two lines at every viewport width. */}
                        <h1 className="whitespace-nowrap text-[2.25rem] font-semibold uppercase leading-[0.88] tracking-[-0.06em] text-neutral-950 sm:whitespace-normal sm:text-[3rem] lg:text-[2.5rem] xl:text-[3.25rem]">
                            Turtle<span className="sm:hidden"> Mode</span><br className="hidden sm:block" /><span className="hidden sm:inline">Mode</span>
                        </h1>
                        <p className="mx-auto mt-3 max-w-[15rem] text-center text-xs leading-relaxed text-neutral-600 sm:mx-0 sm:max-w-[13rem] sm:text-left sm:text-sm lg:max-w-[9rem] xl:max-w-[11rem]">
                            Recovery intelligence built into every mission.
                        </p>
                    </motion.div>

                    {/* Recovery narrative */}
                    <motion.div
                        /* PREVIOUS UI: protocol-card opacity and Y transforms delayed its full visibility. */
                        /* PREVIOUS UI: className="absolute bottom-24 text-center max-w-2xl px-8" */
                        /* PREVIOUS MOBILE POSITION: `bottom-8` did not lift the protocol card far enough above the phone edge. */
                        className="pointer-events-auto absolute bottom-12 left-5 right-5 w-auto border border-neutral-900/10 bg-white/95 p-3 shadow-[0_14px_40px_rgba(15,30,32,0.12)] backdrop-blur-sm sm:bottom-8 sm:left-auto sm:right-8 sm:w-full sm:max-w-[25rem] sm:p-5 lg:bottom-[10vh] lg:right-[5vw] lg:max-w-[21rem]"
                    >
                        <div className="mb-2 flex items-center justify-between border-b border-neutral-900/10 pb-2 text-[9px] font-bold tracking-[0.12em] text-neutral-500 sm:mb-3 sm:pb-3 sm:text-[10px] sm:tracking-[0.16em]">
                            <span>RECOVERY PROTOCOL</span><span className="text-[#177f85]">ACTIVE</span>
                        </div>
                        <p className="text-base font-medium leading-snug text-neutral-900 sm:text-lg">
                            Self-righting autonomy, with no manual intervention.
                        </p>
                        <p className="mt-2 line-clamp-4 text-xs leading-relaxed text-neutral-600 sm:line-clamp-none sm:text-sm">
                            FENIX detects an inverted posture, calculates a recovery action, and restores operational readiness on its own.
                        </p>
                    </motion.div>

                    {/* Desktop recovery sequence */}
                    <motion.div
                        /* PREVIOUS UI: recovery-sequence opacity and X transforms delayed its full visibility. */
                        className="pointer-events-auto absolute bottom-[10vh] left-[5vw] hidden w-[17rem] border-l-2 border-[#5ce1e6] bg-white/90 p-5 shadow-[0_14px_40px_rgba(15,30,32,0.1)] backdrop-blur-sm lg:block"
                    >
                        <div className="mb-4 flex items-center gap-2 text-[10px] font-bold tracking-[0.18em] text-neutral-500"><Cpu className="h-3.5 w-3.5 text-[#177f85]" /> AUTONOMOUS SEQUENCE</div>
                        <div className="space-y-3 font-mono-tech text-[10px]">
                            {[
                                ["01", "ATTITUDE", "INVERTED"],
                                ["02", "RECOVERY PATH", "CALCULATED"],
                                ["03", "FLIGHT STATE", "RESTORED"],
                            ].map(([index, label, value]) => (
                                <div key={index} className="flex items-center justify-between border-b border-neutral-900/10 pb-2">
                                    <span className="text-neutral-400">{index} / {label}</span>
                                    <span className="font-bold text-neutral-900">{value}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        /* PREVIOUS UI: system-status opacity and X transforms delayed its full visibility. */
                        className="absolute right-[5vw] top-[10vh] hidden w-[14rem] border border-neutral-900/10 bg-white/90 p-4 shadow-[0_14px_40px_rgba(15,30,32,0.1)] backdrop-blur-sm xl:block"
                    >
                        <div className="flex items-center gap-2 text-[10px] font-bold tracking-[0.18em] text-[#177f85]"><ShieldAlert className="h-3.5 w-3.5" /> SYSTEM STATUS</div>
                        <div className="mt-4 grid grid-cols-2 gap-px bg-neutral-900/10">
                            <div className="bg-white p-3"><span className="block text-[9px] tracking-[0.14em] text-neutral-400">IMU</span><span className="mt-1 block text-xs font-bold">TRACKING</span></div>
                            <div className="bg-white p-3"><span className="block text-[9px] tracking-[0.14em] text-neutral-400">MODE</span><span className="mt-1 block text-xs font-bold">AUTO</span></div>
                        </div>
                        <div className="mt-4 flex items-center gap-2 border-t border-neutral-900/10 pt-3 text-[10px] font-bold tracking-[0.12em] text-neutral-600"><CheckCircle2 className="h-3.5 w-3.5 text-[#177f85]" /> RECOVERY READY</div>
                    </motion.div>

                    {/* PREVIOUS UI: <div className="absolute bottom-5 left-5 hidden items-center gap-2 text-[10px] font-bold tracking-[0.18em] text-neutral-400 sm:flex lg:left-[5vw]"><Zap className="h-3.5 w-3.5 text-[#177f85]" /> FAIL-SAFE INTELLIGENCE</div> */}

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
