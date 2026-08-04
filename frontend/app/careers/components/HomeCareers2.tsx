"use client"
import { motion, useInView } from "framer-motion"
import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const ITEMS = [
  { id: "01", title: "We Are Not Just a Company", description: " We are a mission. A promise. A movement born out of the belief that India can and will build the best — in aerospace, defense, and beyond." },
  { id: "02", title: "Resilience Is Our Signature", description: " We don’t complain, we solve. We don’t escape pressure, we rise through it. We take radical responsibility, learn fast, and move forward stronger." },
  { id: "03", title: "We Build Builders", description: "This is a place to become your strongest self — professionally, personally, and patriotically. Here, you grow in knowledge, skill, discipline, and vision. Because we are not just building aircraft — We’re building citizens. We’re building leaders." },
  { id: "04", title: "We Don’t Clock In,\nWe Show Up", description: "This is not a shift job. This is our runway. We show up with our brains sharp, our hearts aligned, and our sleeves rolled up. Because someday, we’ll look back and say: 'We built something that mattered.'" },
  { id: "05", title: "Integrity Is Non-Negotiable", description: "We will never cheat — not people, not processes, not ourselves. No shortcuts, no dishonesty — even if it costs us. Because at Tsalla, how we win is as important as winning itself." },
  { id: "06", title: "Everyone Is a Leader Here", description: "No one hides behind titles. If you see a problem, you own it. If you have an idea, you voice it. Whether you joined yesterday or were here from Day 1 — you matter." },
  { id: "07", title: "United by Purpose, Not Uniformity", description: "We all have different backgrounds, motivations, and dreams — and that’s okay. But when we’re here — we’re united. By discipline. By ownership. By belief in a cause bigger than us." },
]

const InsideTsallaAerospace = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  const total = ITEMS.length
  // Start at the first card of the middle set
  const [index, setIndex] = useState(total)
  const [isPaused, setIsPaused] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(true)

  const goNext = () => {
    setIsTransitioning(true)
    setIndex((prev) => prev + 1)
  }

  const goPrev = () => {
    setIsTransitioning(true)
    setIndex((prev) => prev - 1)
  }

  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { amount: 0.2 })

  // Triple the items to ensure no gaps on any screen size
  const slides = [...ITEMS, ...ITEMS, ...ITEMS]

  const getOffset = () => {
    if (!trackRef.current || !trackRef.current.children[index]) return 0
    const card = trackRef.current.children[index] as HTMLElement
    // Using offsetLeft provides precise layout alignment that accounts for browser rounding
    return -card.offsetLeft
  }

  // Auto slide
  useEffect(() => {
    if (isPaused || !isInView) return
    const timer = setInterval(() => {
      setIsTransitioning(true)
      setIndex((prev) => prev + 1)
    }, 3000)

    return () => clearInterval(timer)
  }, [isPaused, isInView])

  // Seamless jump logic
  useEffect(() => {
    // If we've finished the middle set and are into the third set
    if (index >= total * 2) {
      const timer = setTimeout(() => {
        setIsTransitioning(false)
        setIndex(index % total + total)
      }, 450)
      return () => clearTimeout(timer)
    }

    // If we've gone before the middle set
    if (index < total) {
      const timer = setTimeout(() => {
        setIsTransitioning(false)
        setIndex(total + (index % total + total) % total)
      }, 450)
      return () => clearTimeout(timer)
    }
  }, [index, total])

  // Drag handling
  const handleDragEnd = (_: any, info: any) => {
    setIsPaused(false)
    const { offset, velocity } = info
    // More sensitive threshold
    const threshold = 40

    if (offset.x < -threshold || velocity.x < -300) {
      setIsTransitioning(true)
      setIndex((prev) => prev + 1)
    } else if (offset.x > threshold || velocity.x > 300) {
      setIsTransitioning(true)
      setIndex((prev) => prev - 1)
    }
  }

  return (
    <section ref={sectionRef} className="bg-[#fdfcfb] text-black font-orbit overflow-hidden">
      {/* HEADER */}
      <div className="h-screen w-full flex flex-col items-center justify-center px-6 md:px-10 relative bg-[#fdfcfb]">
        <div className="max-w-5xl mx-auto text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-[4.5rem] font-extrabold tracking-[0.1em] mb-4 uppercase leading-[0.9] whitespace-nowrap"
          >
            INSIDE TSALLA AEROSPACE
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-gray-500 text-[10px] md:text-sm tracking-[0.35em] uppercase font-medium"
          >
            REAL PEOPLE. REAL PASSION. REAL RESULTS.
          </motion.p>
        </div>
      </div>

      {/* CAROUSEL */}
      <div className="bg-[#fdfcfb] text-black relative pt-12 pb-32 overflow-hidden">
        <div className="ml-[4.5vw] md:ml-[5.3vw] lg:ml-[7vw] xl:ml-[6.5vw] 2xl:ml-[5.1vw] bg-[#fdfcfb]">
          <div
            ref={containerRef}
            className="relative w-full overflow-hidden pr-[5vw] cursor-grab active:cursor-grabbing group/nav"
          >
            <motion.div
              ref={trackRef}
              className="flex relative"
              drag="x"
              dragElastic={0.4}
              dragMomentum={false}
              onDragStart={() => setIsPaused(true)}
              onDragEnd={handleDragEnd}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              animate={{ x: getOffset() }}
              transition={
                isTransitioning
                  ? { type: "spring", stiffness: 70, damping: 18, mass: 0.8 }
                  : { duration: 0 }
              }
            >
              {slides.map((item, i) => (
                <div
                  key={`${item.id}-${i}`}
                  className="flex-[0_0_85vw] sm:flex-[0_0_30vw] md:flex-[0_0_21.75vw] border-y border-black relative px-6 md:px-10 py-20 min-h-[480px] flex flex-col justify-start hover:bg-black/5 transition-colors duration-500 select-none"
                >
                  <div className="absolute left-0 top-[-1px] bottom-[-1px] w-[1px] bg-black z-10" />
                  <span className="text-gray-400 text-[10px] md:text-sm font-medium mb-3 block opacity-60 tracking-[0.2em]">
                    {item.id}
                  </span>

                  <div className="min-h-[5rem] md:min-h-[4rem] mb-12">
                    <h2 className="text-lg md:text-xl font-bold leading-[1.1] uppercase tracking-[0.05em] whitespace-pre-line">
                      {item.title}
                    </h2>
                  </div>

                  <p className="text-gray-900 text-[10px] md:text-[14px] leading-relaxed font-light text-justify text-pretty [hyphens:auto]">
                    {item.description}
                  </p>
                </div>
              ))}
            </motion.div>

            {/* Left Button - Appears when mouse is near */}
            <div className="absolute left-0 inset-y-0 flex items-center z-40 px-4 opacity-0 -translate-x-4 group-hover/nav:opacity-100 group-hover/nav:translate-x-0 transition-all duration-300 pointer-events-none">
              <motion.button
                onClick={(e) => { e.stopPropagation(); goPrev(); }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-4 rounded-full bg-white/20 backdrop-blur-md border border-black/5 text-black hidden md:flex items-center justify-center hover:bg-white/40 hover:border-black/10 shadow-[0_0_20px_rgba(0,0,0,0.05)] pointer-events-auto"
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
                className="p-4 rounded-full bg-white/20 backdrop-blur-md border border-black/5 text-black hidden md:flex items-center justify-center hover:bg-white/40 hover:border-black/10 shadow-[0_0_20px_rgba(0,0,0,0.05)] pointer-events-auto"
              >
                <ChevronRight className="w-6 h-6" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default InsideTsallaAerospace