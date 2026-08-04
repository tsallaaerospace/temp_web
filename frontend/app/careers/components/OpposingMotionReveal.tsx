"use client"

import React, { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"

const OPPOSE_ITEMS = [
    {
        title: "Design",
        description: "We start from first principles, architecting autonomous systems that redefine the physics of flight. Every line and every curve is engineered for extreme performance.",
        image: "/images/design-mode/08b50f4f-79c5-4ae5-b5bf-fa2fcfb0b544.jpg"
    },
    {
        title: "Build",
        description: "From carbon composites to custom PCBs, our team turns CAD into reality. We build hardware that survives the harshest environments on Earth and beyond.",
        image: "/images/design-mode/abb6bab613d7d967786b922562d07d61f60f873e-3840x2160.jpg"
    },
    {
        title: "Fly",
        description: "Launch. Navigate. Execute. Our autonomous flight controllers manage complex missions with millisecond precision, pushing the edge of what's possible in the sky.",
        image: "/images/design-mode/v-bat-7c.jpg"
    },
    {
        title: "Crash",
        description: "Failure is just data. We push our prototypes beyond their limits to find the breaking point. If we don't crash, we aren't innovating fast enough.",
        image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1200&q=80"
    },
    {
        title: "Modify",
        description: "Analyze the debris. Iterate the code. Refine the structural integrity. We adapt our systems based on every flight, turning weaknesses into unfair advantages.",
        image: "/images/design-mode/759cf3b1631ac09f8787809500212d9914788964-4064x2286.jpg"
    },
    {
        title: "Repeat",
        description: "Relentless iteration is our heartbeat. We scale our breakthroughs across platforms, constantly evolving to stay one step ahead of the challenge.",
        image: "/images/design-mode/c30de4a3e1c213e28f4b49a5d01d81652fca6f51-1536x1024.png"
    }

]

const DRAG_THRESHOLD = 80 // px needed to trigger a card change

const OpposingMotionReveal = () => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isPaused, setIsPaused] = useState(false)
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
    const sectionRef = useRef<HTMLElement>(null)
    const isInView = useInView(sectionRef, { amount: 0.5 })

    const resetTimer = () => {
        if (timerRef.current) clearInterval(timerRef.current)
        if (isPaused || !isInView) return

        timerRef.current = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % OPPOSE_ITEMS.length)
        }, 2000)
    }

    useEffect(() => {
        resetTimer()
        return () => { if (timerRef.current) clearInterval(timerRef.current) }
    }, [isPaused, isInView])

    const goNext = () => {
        setCurrentIndex((prev) => (prev + 1) % OPPOSE_ITEMS.length)
        if (!isPaused) resetTimer()
    }

    const goPrev = () => {
        setCurrentIndex((prev) => (prev - 1 + OPPOSE_ITEMS.length) % OPPOSE_ITEMS.length)
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
        <section ref={sectionRef} className="relative h-screen w-full bg-black flex flex-col md:flex-row overflow-hidden">
            {/* Left 40% - High Impact Title */}
            <div className="h-[35%] md:h-full w-full md:w-[40%] flex items-center md:items-start justify-center md:justify-start px-10 md:px-16 lg:px-20 pt-0 md:pt-32 lg:pt-40 z-20 bg-black md:border-r border-neutral-900">
                <div className="flex flex-col gap-6 lg:gap-8">
                    <motion.h1
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="text-5xl sm:text-5xl md:text-65l lg:text-[4.7rem] font-black uppercase tracking-[0.05em] text-white font-orbit text-center md:text-left leading-[1.05] select-none"
                        style={{
                            fontFamily: 'Orbit, sans-serif',
                            fontWeight: 900
                        }}
                    >
                        {/* How We<br />Work */}
                        Mission Rhythm
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                        className="text-neutral-500 text-xs md:text-sm lg:text-[0.88rem] font-light leading-relaxed font-orbit text-justify [hyphens:auto] max-w-sm md:max-w-md lg:max-w-lg mt-8 lg:mt-34"
                    >
                        Structured iteration under real constraints reveals failure points early. This disciplined engineering rhythm ensures every system is hardened, validated, and built to perform consistently—not occasionally.
                    </motion.p>
                </div>
            </div>

            {/* Right 60% - Card UI Carousel */}
            <div className="h-[65%] md:h-full w-full md:w-[60%] px-2 md:px-6 lg:px-8 flex items-center justify-center bg-black">
                <div
                    className="w-full h-[75%] md:h-[60%] flex gap-2 md:gap-3 lg:gap-1 items-center justify-center relative drag cursor-grab active:cursor-grabbing select-none group/nav"
                    onPointerDown={(e) => {
                        const startX = e.clientX
                        const handlePointerUp = (upEvent: PointerEvent) => {
                            const delta = upEvent.clientX - startX
                            if (delta < -DRAG_THRESHOLD) goNext()
                            else if (delta > DRAG_THRESHOLD) goPrev()
                            window.removeEventListener("pointerup", handlePointerUp)
                        }
                        window.addEventListener("pointerup", handlePointerUp)
                    }}
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    <AnimatePresence mode="popLayout" initial={false}>
                        {visibleItems.map((item, index) => (
                            <motion.div
                                key={item.title}
                                layout
                                initial={{ x: index === 2 ? 500 : 0, opacity: index === 2 ? 0 : 1 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: -500, opacity: 0 }}
                                transition={{
                                    duration: 1.2,
                                    ease: [0.22, 1, 0.36, 1]
                                }}
                                className="flex-1 h-full min-w-[260px] md:min-w-0 relative rounded-none overflow-hidden shadow-[0_40px_80px_-20px_rgba(0,0,0,0.3)] group"
                            >
                                {/* Card Background Image */}
                                <div
                                    className="absolute inset-0 bg-cover bg-center transition-transform duration-[2000ms] group-hover:scale-110"
                                    style={{ backgroundImage: `url(${item.image})` }}
                                />

                                {/* Minimal gradient forw text readability only */}
                                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/50 opacity-100" />

                                {/* Title - pinned to top */}
                                <div className="absolute top-0 left-0 right-0 p-6 md:p-8 z-10">
                                    <div className="overflow-hidden">
                                        <motion.h3
                                            initial={{ y: -20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            className="text-2xl md:text-3xl lg:text-4xl font-black uppercase tracking-[0.05em] font-orbit text-white"
                                        >
                                            {item.title}
                                        </motion.h3>
                                    </div>
                                </div>

                                {/* Bottom content - slides up on hover */}
                                < div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-10 translate-y-4 group-hover:-translate-y-20 transition-transform duration-700" >
                                    <p className="text-xs md:text-sm font-light leading-relaxed text-neutral-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 mb-4">
                                        {item.description}
                                    </p>
                                    {/* Cyan accent bar */}
                                    < div className="w-10 h-1 bg-[#5ce1e6] transition-all duration-700 group-hover:w-full shadow-[0_0_15px_rgba(92,225,230,0.4)]" />
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {/* Left Button - Appears when mouse is near */}
                    <div className="absolute left-0 inset-y-0 flex items-center z-40 px-4 opacity-0 -translate-x-4 group-hover/nav:opacity-100 group-hover/nav:translate-x-0 transition-all duration-300 pointer-events-none">
                        <motion.button
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
                            onClick={(e) => { e.stopPropagation(); goNext(); }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="p-4 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white hidden md:flex items-center justify-center hover:bg-black/60 hover:border-[#5ce1e6]/50 shadow-[0_0_20px_rgba(0,0,0,0.5)] pointer-events-auto"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </motion.button>
                    </div>

                    {/* Drag hint indicator */}

                </div >
            </div >
        </section >
    )
}


export default OpposingMotionReveal


