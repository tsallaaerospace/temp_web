"use client"

import React, { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useInView, useReducedMotion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"

const OPPOSE_ITEMS = [
    {
        title: "Design",
        description: "We start from first principles, architecting autonomous systems that redefine the physics of flight. Every line and every curve is engineered for extreme performance.",
        video: "/careers/mission-rhythm/design-web.mp4"
    },
    {
        title: "Build",
        description: "From carbon composites to custom PCBs, our team turns CAD into reality. We build hardware that survives the harshest environments on Earth and beyond.",
        video: "/careers/mission-rhythm/build-web.mp4"
    },
    {
        title: "Fly",
        description: "Launch. Navigate. Execute. Our autonomous flight controllers manage complex missions with millisecond precision, pushing the edge of what's possible in the sky.",
        video: "/careers/mission-rhythm/fly-web.mp4"
    },
    {
        title: "Crash",
        description: "Failure is just data. We push our prototypes beyond their limits to find the breaking point. If we don't crash, we aren't innovating fast enough.",
        video: "/careers/mission-rhythm/crash-trim-web.mp4"
    },
    {
        title: "Modify",
        description: "Analyze the debris. Iterate the code. Refine the structural integrity. We adapt our systems based on every flight, turning weaknesses into unfair advantages.",
        video: "/careers/mission-rhythm/modify-trim-web.mp4"
    },
    {
        title: "Repeat",
        description: "Relentless iteration is our heartbeat. We scale our breakthroughs across platforms, constantly evolving to stay one step ahead of the challenge.",
        video: "/careers/mission-rhythm/repeat-web.mp4"
    }

]

const DRAG_THRESHOLD = 80 // px needed to trigger a card change

const OpposingMotionReveal = () => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [direction, setDirection] = useState(1)
    const navigationTime = useRef(0)
    const [isPaused, setIsPaused] = useState(false)
    const reduceMotion = useReducedMotion()
    const pointerStart = useRef<number | null>(null)
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
    const sectionRef = useRef<HTMLElement>(null)
    const isInView = useInView(sectionRef, { amount: 0.5 })

    const resetTimer = () => {
        if (timerRef.current) clearInterval(timerRef.current)
        if (isPaused || !isInView || reduceMotion) return

        timerRef.current = setInterval(() => {
            navigate(1)
        }, 2000)
    }

    useEffect(() => {
        resetTimer()
        return () => { if (timerRef.current) clearInterval(timerRef.current) }
    }, [isPaused, isInView, reduceMotion])

    const navigate = (step: number) => {
        if (!reduceMotion && performance.now() - navigationTime.current < 750) return
        navigationTime.current = performance.now()
        setDirection(step)
        setCurrentIndex((prev) => (prev + step + OPPOSE_ITEMS.length) % OPPOSE_ITEMS.length)
    }

    const goNext = () => {
        navigate(1)
        if (!isPaused) resetTimer()
    }

    const goPrev = () => {
        navigate(-1)
        if (!isPaused) resetTimer()
    }

    // Get 3 visible items based on current index
    const getVisibleItems = () => {
        const items = []
        for (let i = 0; i < 3; i++) {
            items.push(OPPOSE_ITEMS[(currentIndex + i) % OPPOSE_ITEMS.length])
        }
        return items
    }

    const visibleItems = getVisibleItems()

    return (
        <section ref={sectionRef} className="careers-rhythm relative h-screen w-full bg-black flex flex-col md:flex-row overflow-hidden">
            {/* Left 40% - High Impact Title */}
            <div className="careers-rhythm-intro h-[35%] md:h-full w-full md:w-[40%] flex items-center md:items-start justify-center md:justify-start px-10 md:px-16 lg:px-20 pt-0 md:pt-32 lg:pt-40 z-20 bg-black md:border-r border-neutral-900">
                <div className="flex flex-col gap-6 lg:gap-8">
                    <motion.h1
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="careers-section-title uppercase text-white text-center md:text-left select-none"
                        style={{
                            fontFamily: 'Orbit, sans-serif',
                            fontWeight: 400
                        }}
                    >
                        {/* How We<br />Work */}
                        Mission Rhythm
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                        className="careers-body text-neutral-400 text-justify max-w-sm md:max-w-md lg:max-w-lg mt-8 lg:mt-34"
                    >
                        Structured iteration under real constraints reveals failure points early. This disciplined engineering rhythm ensures every system is hardened, validated, and built to perform consistently—not occasionally.
                    </motion.p>
                </div>
            </div>

            {/* Right 60% - Card UI Carousel */}
            <div className="careers-rhythm-visual h-[65%] md:h-full w-full md:w-[60%] px-2 md:px-6 lg:px-8 flex items-center justify-center bg-black">
                <div
                    className="careers-rhythm-carousel w-full h-[75%] md:h-[60%] flex gap-2 md:gap-3 lg:gap-1 items-center justify-center relative drag cursor-grab active:cursor-grabbing select-none group/nav"
                    onPointerDown={(e) => {
                        if ((e.target as HTMLElement).closest("button")) return
                        pointerStart.current = e.clientX
                        e.currentTarget.setPointerCapture(e.pointerId)
                    }}
                    onPointerUp={(e) => {
                        if (pointerStart.current === null) return
                        const delta = e.clientX - pointerStart.current
                        pointerStart.current = null
                        if (delta < -DRAG_THRESHOLD) goNext()
                        else if (delta > DRAG_THRESHOLD) goPrev()
                    }}
                    onPointerCancel={() => { pointerStart.current = null }}
                    style={{ touchAction: "pan-y" }}
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    <div className="relative w-full h-full overflow-hidden [--card-gap:8px] md:[--card-gap:12px] lg:[--card-gap:4px]">
                    <AnimatePresence initial={false} custom={direction}>
                        {visibleItems.map((item, index) => (
                            <motion.div
                                key={item.title}
                                custom={direction}
                                variants={{
                                    enter: (step: number) => ({ x: step > 0 ? "calc(300% + var(--card-gap) * 3)" : "calc(-100% - var(--card-gap))" }),
                                    leave: (step: number) => ({ x: step > 0 ? "calc(-100% - var(--card-gap))" : "calc(300% + var(--card-gap) * 3)" })
                                }}
                                initial="enter"
                                animate={{ x: `calc(${index * 100}% + var(--card-gap) * ${index})` }}
                                exit="leave"
                                transition={{ duration: reduceMotion ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }}
                                className="careers-rhythm-card absolute inset-y-0 left-0 w-[calc((100%-var(--card-gap)*2)/3)] min-w-0 rounded-none overflow-hidden shadow-[0_40px_80px_-20px_rgba(0,0,0,0.3)] group"
                            >
                                <video
                                    src={item.video}
                                    style={{ objectPosition: item.title === "Modify" ? "left center" : item.title === "Design" ? "35% center" : "center" }}
                                    autoPlay={isInView && !reduceMotion}
                                    muted
                                    loop
                                    playsInline
                                    preload="metadata"
                                    aria-label={`${item.title} at Tsalla Aerospace`}
                                    ref={(video) => {
                                        if (!video) return
                                        if (isInView && !reduceMotion) void video.play().catch(() => {})
                                        else video.pause()
                                    }}
                                    className="absolute inset-0 w-full h-full object-cover pointer-events-none transition-transform duration-[2000ms] group-hover:scale-110"
                                />

                                {/* Minimal gradient forw text readability only */}
                                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/50 opacity-100" />

                                {/* Title - pinned to top */}
                                <div className="absolute top-0 left-0 right-0 p-6 md:p-8 z-10">
                                    <div className="overflow-hidden">
                                        <motion.h3
                                            initial={{ y: -20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            className="careers-card-title uppercase text-white"
                                        >
                                            {item.title}
                                        </motion.h3>
                                    </div>
                                </div>

                                {/* Bottom content - slides up on hover */}
                                < div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-10 translate-y-4 group-hover:-translate-y-20 transition-transform duration-700" >
                                    <p className="careers-body careers-card-copy text-neutral-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 mb-4">
                                        {item.description}
                                    </p>
                                    {/* Cyan accent bar */}
                                    < div className="w-10 h-1 bg-[#5ce1e6] transition-all duration-700 group-hover:w-full shadow-[0_0_15px_rgba(92,225,230,0.4)]" />
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                    </div>

                    {/* Left Button - Appears when mouse is near */}
                    <div className="absolute left-0 inset-y-0 flex items-center z-40 px-4 opacity-0 -translate-x-4 group-hover/nav:opacity-100 group-hover/nav:translate-x-0 transition-all duration-300 pointer-events-none">
                        <motion.button
                            aria-label="Previous mission stage"
                            onClick={(e) => { e.stopPropagation(); goPrev(); }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="p-4 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white hidden md:flex items-center justify-center hover:bg-black/60 hover:border-[#5ce1e6]/50 shadow-[0_0_20px_rgba(0,0,0,0.5)] pointer-events-auto"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </motion.button>
                    </div>

                    {/* Right Button - Appears when mouse is near */}
                    <div className="absolute right-0 inset-y-0 flex items-center z-40 px-4 opacity-0 translate-x-4 group-hover/nav:opacity-100 group-hover/nav:translate-x-0 transition-all duration-300 pointer-events-none">
                        <motion.button
                            aria-label="Next mission stage"
                            onClick={(e) => { e.stopPropagation(); goNext(); }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="p-4 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white hidden md:flex items-center justify-center hover:bg-black/60 hover:border-[#5ce1e6]/50 shadow-[0_0_20px_rgba(0,0,0,0.5)] pointer-events-auto"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </motion.button>
                    </div>

                    {/* Drag hint indicator */}

                {/* PREVIOUS UI: </div > </div > </section > */}
                </div>
            </div>
        </section>
    )
}


export default OpposingMotionReveal


