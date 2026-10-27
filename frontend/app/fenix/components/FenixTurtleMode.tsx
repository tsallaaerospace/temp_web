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
            {/* PREVIOUS CENTERING:
            <div className="sticky top-0 flex h-[100dvh] w-full items-center justify-center overflow-hidden">
            */}
            <div className="sticky top-0 flex h-[100dvh] w-full flex-col sm:flex-row items-center justify-center overflow-hidden">

                {/* Mobile Section Identity (aligned directly above the recovery video) */}
                <div className="sm:hidden mb-3 xs:mb-4 text-center z-20 px-4">
                    <h1 className="fenix-section-title font-normal uppercase leading-[0.88] tracking-[-0.04em] text-neutral-950">
                        Turtle Mode
                    </h1>
                </div>

                {/* Recovery footage */}
                {/* PREVIOUS UI:
                <motion.div
                    style={{
                        scale: useTransform(smoothProgress, [0, 0.18, 0.82, 1], [0.94, 1, 1, 1.04]),
                    }}
                    className="relative z-10 flex aspect-video w-[90vw] max-w-[32rem] items-center justify-center border border-neutral-900/10 bg-white p-1.5 shadow-[0_20px_50px_rgba(15,30,32,0.14)] sm:w-[84vw] sm:max-w-none sm:p-2 sm:shadow-[0_30px_80px_rgba(15,30,32,0.16)] lg:w-[64vw] xl:w-[66vw]"
                >
                */}
                <motion.div
                    style={{
                        scale: useTransform(smoothProgress, [0, 0.18, 0.82, 1], [0.94, 1, 1, 1.04]),
                    }}
                    className="relative z-10 flex aspect-video w-[92vw] max-w-[28rem] xs:max-w-[32rem] sm:w-[84vw] sm:max-w-none lg:w-[62vw] xl:w-[64vw] 2xl:max-w-[76rem] 3xl:max-w-[88rem] uw:max-w-[105rem] max-h-[46svh] sm:max-h-[56vh] lg:max-h-[66vh] 3xl:max-h-[72vh] items-center justify-center border border-neutral-900/10 bg-white p-1.5 shadow-[0_20px_50px_rgba(15,30,32,0.14)] sm:p-2 sm:shadow-[0_30px_80px_rgba(15,30,32,0.16)]"
                >
                    <video 
                        src="/product/fenix/Turtle-Mode.mp4" 
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

                {/* Mobile Recovery Narrative Card (aligned with video width and centered directly below the footage) */}
                <div className="sm:hidden mt-3 xs:mt-4 w-[92vw] max-w-[28rem] xs:max-w-[32rem] border border-neutral-900/10 bg-white/95 p-3.5 xs:p-4 shadow-[0_14px_40px_rgba(15,30,32,0.12)] backdrop-blur-sm z-20">
                    <div className="mb-2 flex items-center justify-between border-b border-neutral-900/10 pb-2 text-[9px] font-bold tracking-[0.12em] text-neutral-500">
                        <span>RECOVERY PROTOCOL</span><span className="text-[#177f85]">ACTIVE</span>
                    </div>
                    <p className="fenix-body text-neutral-900 font-medium">
                        Self-righting autonomy, with no manual intervention.
                    </p>
                    <p className="fenix-body mt-1.5 text-neutral-600">
                        FENIX detects an inverted posture, calculates a recovery action, and restores operational readiness on its own.
                    </p>
                </div>

                {/* Content Overlay */}
                {/* Premium recovery interface */}
                {/* PREVIOUS UI:
                <div className="pointer-events-none absolute inset-0 z-20 px-5 sm:px-8 lg:px-[5vw]">
                    <motion.div
                        className="absolute inset-x-0 top-14 max-w-none px-5 text-center sm:left-8 sm:right-auto sm:top-8 sm:max-w-[15rem] sm:px-0 sm:text-left lg:left-[3vw] lg:top-[10vh] lg:max-w-[9rem] xl:left-[4vw] xl:max-w-[11rem]"
                    >
                        <h1 className="fenix-section-title whitespace-nowrap font-normal uppercase leading-[0.88] tracking-[-0.06em] text-neutral-950 sm:whitespace-normal">
                            Turtle<span className="sm:hidden"> Mode</span><br className="hidden sm:block" /><span className="hidden sm:inline">&nbsp;Mode</span>
                        </h1>
                    </motion.div>

                    <motion.div
                        className="pointer-events-auto absolute bottom-12 left-5 right-5 w-auto border border-neutral-900/10 bg-white/95 p-3 shadow-[0_14px_40px_rgba(15,30,32,0.12)] backdrop-blur-sm sm:bottom-8 sm:left-auto sm:right-8 sm:w-full sm:max-w-[25rem] sm:p-5 lg:bottom-[10vh] lg:right-[5vw] lg:max-w-[21rem]"
                    >
                        <div className="mb-2 flex items-center justify-between border-b border-neutral-900/10 pb-2 text-[9px] font-bold tracking-[0.12em] text-neutral-500 sm:mb-3 sm:pb-3 sm:text-[10px] sm:tracking-[0.16em]">
                            <span>RECOVERY PROTOCOL</span><span className="text-[#177f85]">ACTIVE</span>
                        </div>
                        <p className="fenix-body text-neutral-900">
                            Self-righting autonomy, with no manual intervention.
                        </p>
                        <p className="fenix-body mt-2 line-clamp-4 text-neutral-600 sm:line-clamp-none">
                            FENIX detects an inverted posture, calculates a recovery action, and restores operational readiness on its own.
                        </p>
                    </motion.div>

                    <motion.div
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
                        className="absolute right-[5vw] top-[10vh] hidden w-[14rem] border border-neutral-900/10 bg-white/90 p-4 shadow-[0_14px_40px_rgba(15,30,32,0.1)] backdrop-blur-sm xl:block"
                    >
                        <div className="flex items-center gap-2 text-[10px] font-bold tracking-[0.18em] text-[#177f85]"><ShieldAlert className="h-3.5 w-3.5" /> SYSTEM STATUS</div>
                        <div className="mt-4 grid grid-cols-2 gap-px bg-neutral-900/10">
                            <div className="bg-white p-3"><span className="block text-[9px] tracking-[0.14em] text-neutral-400">IMU</span><span className="mt-1 block text-xs font-bold">TRACKING</span></div>
                            <div className="bg-white p-3"><span className="block text-[9px] tracking-[0.14em] text-neutral-400">MODE</span><span className="mt-1 block text-xs font-bold">AUTO</span></div>
                        </div>
                        <div className="mt-4 flex items-center gap-2 border-t border-neutral-900/10 pt-3 text-[10px] font-bold tracking-[0.12em] text-neutral-600"><CheckCircle2 className="h-3.5 w-3.5 text-[#177f85]" /> RECOVERY READY</div>
                    </motion.div>
                </div>
                */}
                {/* PREVIOUS ABSOLUTE MOBILE OVERLAY:
                <div className="pointer-events-none absolute inset-0 z-20 px-4 sm:px-8 lg:px-[5vw]">
                    <motion.div
                        className="absolute inset-x-0 top-[clamp(3.75rem,8svh,4.5rem)] max-w-none px-4 text-center sm:left-8 sm:right-auto sm:top-8 sm:max-w-[15rem] sm:px-0 sm:text-left lg:left-[3vw] lg:top-[10vh] lg:max-w-[9rem] xl:left-[4vw] xl:max-w-[11rem] 3xl:left-[max(4vw,calc((100vw-120rem)/2))] 3xl:top-[12vh] 3xl:max-w-[14rem]"
                    >
                        <h1 className="fenix-section-title whitespace-nowrap font-normal uppercase leading-[0.88] tracking-[-0.06em] text-neutral-950 sm:whitespace-normal">
                            Turtle<span className="sm:hidden"> Mode</span><br className="hidden sm:block" /><span className="hidden sm:inline">&nbsp;Mode</span>
                        </h1>
                    </motion.div>

                    <motion.div
                        className="pointer-events-auto absolute bottom-[clamp(1.25rem,3.5svh,2.25rem)] left-4 right-4 xs:left-5 xs:right-5 w-auto border border-neutral-900/10 bg-white/95 p-3 sm:p-5 shadow-[0_14px_40px_rgba(15,30,32,0.12)] backdrop-blur-sm sm:bottom-8 sm:left-auto sm:right-8 sm:w-full sm:max-w-[25rem] lg:bottom-[10vh] lg:right-[5vw] lg:max-w-[21rem] 3xl:right-[max(4vw,calc((100vw-120rem)/2))] 3xl:bottom-[12vh] 3xl:max-w-[24rem]"
                    >
                        <div className="mb-2 flex items-center justify-between border-b border-neutral-900/10 pb-2 text-[9px] font-bold tracking-[0.12em] text-neutral-500 sm:mb-3 sm:pb-3 sm:text-[10px] sm:tracking-[0.16em]">
                            <span>RECOVERY PROTOCOL</span><span className="text-[#177f85]">ACTIVE</span>
                        </div>
                        <p className="fenix-body text-neutral-900">
                            Self-righting autonomy, with no manual intervention.
                        </p>
                        <p className="fenix-body mt-2 line-clamp-3 xs:line-clamp-4 text-neutral-600 sm:line-clamp-none">
                            FENIX detects an inverted posture, calculates a recovery action, and restores operational readiness on its own.
                        </p>
                    </motion.div>
                </div>
                */}
                {/* Desktop & Tablet Overlay (hidden on mobile, visible on sm and up) */}
                <div className="pointer-events-none absolute inset-0 z-20 hidden sm:block px-8 lg:px-[5vw]">
                    {/* Section identity */}
                    <motion.div
                        className="absolute left-8 top-8 max-w-[15rem] text-left lg:left-[3vw] lg:top-[10vh] lg:max-w-[9rem] xl:left-[4vw] xl:max-w-[11rem] 3xl:left-[max(4vw,calc((100vw-120rem)/2))] 3xl:top-[12vh] 3xl:max-w-[14rem]"
                    >
                        <h1 className="fenix-section-title font-normal uppercase leading-[0.88] tracking-[-0.06em] text-neutral-950 sm:whitespace-normal">
                            Turtle<br />Mode
                        </h1>
                    </motion.div>

                    {/* Recovery narrative */}
                    <motion.div
                        className="pointer-events-auto absolute bottom-8 right-8 w-full max-w-[25rem] border border-neutral-900/10 bg-white/95 p-5 shadow-[0_14px_40px_rgba(15,30,32,0.12)] backdrop-blur-sm lg:bottom-[10vh] lg:right-[5vw] lg:max-w-[21rem] 3xl:right-[max(4vw,calc((100vw-120rem)/2))] 3xl:bottom-[12vh] 3xl:max-w-[24rem]"
                    >
                        <div className="mb-3 flex items-center justify-between border-b border-neutral-900/10 pb-3 text-[10px] font-bold tracking-[0.16em] text-neutral-500">
                            <span>RECOVERY PROTOCOL</span><span className="text-[#177f85]">ACTIVE</span>
                        </div>
                        <p className="fenix-body text-neutral-900">
                            Self-righting autonomy, with no manual intervention.
                        </p>
                        <p className="fenix-body mt-2 text-neutral-600">
                            FENIX detects an inverted posture, calculates a recovery action, and restores operational readiness on its own.
                        </p>
                    </motion.div>

                    {/* Desktop recovery sequence */}
                    <motion.div
                        className="pointer-events-auto absolute bottom-[10vh] left-[5vw] 3xl:left-[max(4vw,calc((100vw-120rem)/2))] 3xl:bottom-[12vh] hidden w-[17rem] 3xl:w-[20rem] border-l-2 border-[#5ce1e6] bg-white/90 p-5 shadow-[0_14px_40px_rgba(15,30,32,0.1)] backdrop-blur-sm lg:block"
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
                        className="absolute right-[5vw] top-[10vh] 3xl:right-[max(4vw,calc((100vw-120rem)/2))] 3xl:top-[12vh] hidden w-[14rem] 3xl:w-[17rem] border border-neutral-900/10 bg-white/90 p-4 shadow-[0_14px_40px_rgba(15,30,32,0.1)] backdrop-blur-sm xl:block"
                    >
                        <div className="flex items-center gap-2 text-[10px] font-bold tracking-[0.18em] text-[#177f85]"><ShieldAlert className="h-3.5 w-3.5" /> SYSTEM STATUS</div>
                        <div className="mt-4 grid grid-cols-2 gap-px bg-neutral-900/10">
                            <div className="bg-white p-3"><span className="block text-[9px] tracking-[0.14em] text-neutral-400">IMU</span><span className="mt-1 block text-xs font-bold">TRACKING</span></div>
                            <div className="bg-white p-3"><span className="block text-[9px] tracking-[0.14em] text-neutral-400">MODE</span><span className="mt-1 block text-xs font-bold">AUTO</span></div>
                        </div>
                        <div className="mt-4 flex items-center gap-2 border-t border-neutral-900/10 pt-3 text-[10px] font-bold tracking-[0.12em] text-neutral-600"><CheckCircle2 className="h-3.5 w-3.5 text-[#177f85]" /> RECOVERY READY</div>
                    </motion.div>
                </div>

                    {/* Stage 1 Info Card & Stage 3 Info Card - Disabled */}
            </div>
        </motion.div>
    )
}
