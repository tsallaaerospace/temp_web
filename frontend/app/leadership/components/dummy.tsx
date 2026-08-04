"use client"

import { motion, useInView } from "framer-motion"
import { useState, useEffect, useRef, useCallback } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

/* ─── Data ───────────────────────────────────────────────────────────────── */
const ITEMS = [
  {
    id: "01",
    title: "We Are Not Just a Company",
    description:
      "We are a mission. A promise. A movement born out of the belief that India can and will build the best — in aerospace, defense, and beyond.",
  },
  {
    id: "02",
    title: "Resilience Is Our Signature",
    description:
      "We don't complain, we solve. We don't escape pressure, we rise through it. We take radical responsibility, learn fast, and move forward stronger.",
  },
  {
    id: "03",
    title: "We Build Builders",
    description:
      "This is a place to become your strongest self — professionally, personally, and patriotically. Here, you grow in knowledge, skill, discipline, and vision. Because we are not just building aircraft — We're building citizens. We're building leaders.",
  },
  {
    id: "04",
    title: "We Don't Clock In,\nWe Show Up",
    description:
      "This is not a shift job. This is our runway. We show up with our brains sharp, our hearts aligned, and our sleeves rolled up. Because someday, we'll look back and say: 'We built something that mattered.'",
  },
  {
    id: "05",
    title: "Integrity Is Non-Negotiable",
    description:
      "We will never cheat — not people, not processes, not ourselves. No shortcuts, no dishonesty — even if it costs us. Because at Tsalla, how we win is as important as winning itself.",
  },
  {
    id: "06",
    title: "Everyone Is a Leader Here",
    description:
      "No one hides behind titles. If you see a problem, you own it. If you have an idea, you voice it. Whether you joined yesterday or were here from Day 1 — you matter.",
  },
  {
    id: "07",
    title: "United by Purpose,\nNot Uniformity",
    description:
      "We all have different backgrounds, motivations, and dreams — and that's okay. But when we're here — we're united. By discipline. By ownership. By belief in a cause bigger than us.",
  },
]

/* ─── Constants ──────────────────────────────────────────────────────────── */
const TOTAL = ITEMS.length
// Triple-clone for seamless infinite loop
const SLIDES = [...ITEMS, ...ITEMS, ...ITEMS]
// Start in the middle set so we can scroll both ways
const INITIAL_INDEX = TOTAL

/* ─── Component ──────────────────────────────────────────────────────────── */
export default function InsideTsallaLeadership() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { amount: 0.2 })

  const [index, setIndex] = useState(INITIAL_INDEX)
  const [transitioning, setTransitioning] = useState(true)
  const [paused, setPaused] = useState(false)
  const [dragStartX, setDragStartX] = useState(0)

  /* ── Navigation helpers ───────────────────────────────────────────────── */
  const goNext = useCallback(() => {
    setTransitioning(true)
    setIndex((p) => p + 1)
  }, [])

  const goPrev = useCallback(() => {
    setTransitioning(true)
    setIndex((p) => p - 1)
  }, [])

  /* ── Compute translate offset from card's natural offsetLeft ──────────── */
  const getOffset = useCallback(() => {
    if (!trackRef.current) return 0
    const card = trackRef.current.children[index] as HTMLElement | undefined
    if (!card) return 0
    return -card.offsetLeft
  }, [index])

  /* ── Infinite-loop reset (no visible jump) ────────────────────────────── */
  useEffect(() => {
    if (index >= TOTAL * 2) {
      const t = setTimeout(() => {
        setTransitioning(false)
        setIndex((i) => ((i % TOTAL) + TOTAL))
      }, 420)
      return () => clearTimeout(t)
    }
    if (index < TOTAL) {
      const t = setTimeout(() => {
        setTransitioning(false)
        setIndex((i) => TOTAL + ((i % TOTAL + TOTAL) % TOTAL))
      }, 420)
      return () => clearTimeout(t)
    }
  }, [index])

  /* ── Auto-advance ─────────────────────────────────────────────────────── */
  useEffect(() => {
    if (paused || !isInView) return
    const id = setInterval(goNext, 3200)
    return () => clearInterval(id)
  }, [paused, isInView, goNext])

  /* ── Touch / pointer drag ─────────────────────────────────────────────── */
  const onPointerDown = (e: React.PointerEvent) => {
    setDragStartX(e.clientX)
    setPaused(true)
  }
  const onPointerUp = (e: React.PointerEvent) => {
    const delta = e.clientX - dragStartX
    if (Math.abs(delta) > 40) {
      delta < 0 ? goNext() : goPrev()
    }
    setPaused(false)
  }

  return (
    <section
      ref={sectionRef}
      className="bg-[#fdfcfb] text-black font-orbit overflow-hidden"
    >
      {/* ── HERO HEADER ── */}
      <div className="h-screen w-full flex flex-col items-center justify-center px-6 bg-[#fdfcfb]">
        <div className="max-w-5xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-[4.5rem] font-extrabold tracking-[0.1em] uppercase leading-[0.9] mb-5 whitespace-nowrap"
          >
            INSIDE TSALLA AEROSPACE
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.35 }}
            viewport={{ once: true }}
            className="text-gray-500 text-[10px] md:text-sm tracking-[0.35em] uppercase font-medium"
          >
            REAL PEOPLE. REAL PASSION. REAL RESULTS.
          </motion.p>
        </div>
      </div>

      {/* ── CAROUSEL ── */}
      <div className="bg-[#fdfcfb] pb-32 pt-12 overflow-hidden relative">
        {/*
          FIX: Wide-screen wrapper set to 90vw and centered with mx-auto.
          This creates a solid 5vw gap on both sides (100 - 90 = 10 / 2 = 5).
        */}
        <div
          className="ml-[5vw] pl-[1px] overflow-hidden cursor-grab active:cursor-grabbing select-none group/nav relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
        >
          {/* Track */}
          <motion.div
            ref={trackRef}
            className="flex relative"
            animate={{ x: getOffset() }}
            transition={
              transitioning
                ? { type: "spring", stiffness: 68, damping: 17, mass: 0.8 }
                : { duration: 0 }
            }
          >
            {SLIDES.map((item, i) => (
              <div
                key={`${item.id}-${i}`}
                className="
                  flex-[0_0_85vw] sm:flex-[0_0_45vw] md:flex-[0_0_30vw] lg:flex-[0_0_24vw]
                  relative
                  border-t border-b border-l border-black
                  px-6 md:px-12
                  py-16
                  min-h-[500px]
                  flex flex-col justify-start
                  hover:bg-black/[0.04]
                  transition-colors duration-500
                "
              >
                {/* ID badge */}
                <span className="text-gray-400 text-xs md:text-sm font-medium mb-10 block tracking-[0.25em] opacity-70">
                  {item.id}
                </span>

                {/* Title — reserved height with more breathing room */}
                <div className="min-h-[5rem] mb-10">
                  <h2 className="text-lg md:text-xl font-bold leading-tight uppercase tracking-[0.04em] whitespace-pre-line">
                    {item.title}
                  </h2>
                </div>

                {/* Body — increased font size for readability */}
                <p className="text-gray-800 text-[14px] md:text-[16px] leading-relaxed font-light text-justify hyphens-auto">
                  {item.description}
                </p>
              </div>
            ))}

            {/* Closing right border of last visible card */}
            <div className="flex-[0_0_1px] border-l border-black self-stretch" />
          </motion.div>

          {/* ── Left button ── */}
          <div className="absolute left-0 inset-y-0 flex items-center z-40 pointer-events-none opacity-0 -translate-x-2 group-hover/nav:opacity-100 group-hover/nav:translate-x-0 transition-all duration-300">
            <motion.button
              onClick={(e) => { e.stopPropagation(); goPrev() }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              className="pointer-events-auto hidden md:flex p-4 rounded-full bg-white/25 backdrop-blur-md border border-black/10 text-black hover:bg-white/50 shadow-sm"
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>
          </div>

          {/* ── Right button ── */}
          <div className="absolute right-0 inset-y-0 flex items-center z-40 pointer-events-none opacity-0 translate-x-2 group-hover/nav:opacity-100 group-hover/nav:translate-x-0 transition-all duration-300">
            <motion.button
              onClick={(e) => { e.stopPropagation(); goNext() }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              className="pointer-events-auto hidden md:flex p-4 rounded-full bg-white/25 backdrop-blur-md border border-black/10 text-black hover:bg-white/50 shadow-sm"
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  )
}
