"use client"
import { motion, useInView } from "framer-motion"
import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const ITEMS = [
  { id: "01", title: "Lead with Vision", description: "Empowering the next generation of aerospace leaders through bold vision and unwavering commitment to innovation." },
  { id: "02", title: "Precision in Execution", description: "Every detail matters. We strive for perfection in every system we build, ensuring reliability when it matters most." },
  { id: "03", title: "Radical Responsibility", description: "We own our outcomes. No excuses, just solutions. We take full ownership of our missions and our impact on the world." },
  { id: "04", title: "Put The Team First", description: "We are one team committed to the common mission. We place the success of the team ahead of our individual success." },
  { id: "05", title: "Embrace Teammates", description: "We love and respect our teammates, trusting their good intentions even when results fall short." },
  { id: "06", title: "Demonstrate Grit", description: "We have the passion and perseverance to meet our goals. We work tirelessly to achieve lofty objectives." },
  { id: "07", title: "Dominate", description: "We do not seek to merely win but win so dominantly that competitors fear our capabilities. We demonstrate the courage, confidence, and capacity to pursue and achieve game-changing objectives." },
  { id: "08", title: "Always Be Kind", description: "We respect everyone, inside and outside our walls. Kindness is the foundation of our culture and our collaborations." },
]

const LeadershipPrinciples = () => {
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

  const getCardWidth = () => {
    if (!trackRef.current) return 0
    const card = trackRef.current.children[0] as HTMLElement
    return card.getBoundingClientRect().width
  }

  const getOffset = () => {
    if (!containerRef.current) return 0
    const cardWidth = getCardWidth()
    return -index * cardWidth
  }

  const marqueeItems = new Array(15).fill("AUTONOMY FOR THE WORLD")

  const MarqueeContent = () => (
    <div className="flex whitespace-nowrap items-center py-4 border-t border-white/10 overflow-hidden">
      <motion.div
        animate={{ x: [0, -1000] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 25,
            ease: "linear",
          },
        }}
        className="flex items-center"
      >
        {
          marqueeItems.map((text, i) => (
            <div key={i} className="flex items-center">
              <span className="text-[#666] text-[8px] md:text-[10px] tracking-[0.25em] font-orbit uppercase pr-4 md:pr-8">
                {text}
              </span>
              <span className="text-[#444] text-[6px] md:text-[8px] pr-4 md:pr-8">■</span>
            </div>
          ))
        }

        {/* Duplicate for seamless loop */}
        {marqueeItems.map((text, i) => (
          <div key={`dup-${i}`} className="flex items-center">
            <span className="text-[#666] text-[8px] md:text-[10px] tracking-[0.25em] font-orbit uppercase pr-4 md:pr-8">
              {text}
            </span>
            <span className="text-[#444] text-[6px] md:text-[8px] pr-4 md:pr-8">■</span>
          </div>
        ))}
      </motion.div>
    </div>
  )

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
    if (index >= total * 2) {
      const timer = setTimeout(() => {
        setIsTransitioning(false)
        setIndex(index % total + total)
      }, 450)
      return () => clearTimeout(timer)
    }

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
    <section ref={sectionRef} className="bg-black text-white font-orbit overflow-hidden min-h-screen flex flex-col justify-between">
      {/* HEADER */}
      <div className="pt-20 pb-10 px-6 md:px-16 lg:px-20">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-4xl lg:text-[3.5rem] xl:text-[4rem] font-semibold tracking-[0.05em] uppercase"
          style={{ lineHeight: 0.9 }}
        >
          OUR VALUES
        </motion.h2>
      </div>

      {/* CAROUSEL */}
      <div className="bg-black text-white relative pt-12 pb-32 overflow-hidden">
        <div className="ml-[5.3vw] lg:ml-[5.75vw] 2xl:ml-[5.1vw] border-y border-l border-white/10 bg-black">
          <div
            ref={containerRef}
            className="relative w-full overflow-hidden pr-[5vw] cursor-grab active:cursor-grabbing group/nav"
          >
            <motion.div
              ref={trackRef}
              className="flex ml-[-1px]"
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
                  className="w-[85vw] sm:w-[30vw] md:w-[21.75vw] flex-shrink-0 border-l border-white/10 px-6 md:px-10 py-20 min-h-[480px] flex flex-col justify-start hover:bg-white/5 transition-colors duration-500 select-none"
                >
                  <span className="text-gray-500 text-[10px] md:text-sm font-medium mb-3 block opacity-80 tracking-[0.2em]">
                    {item.id}
                  </span>

                  <div className="min-h-[5rem] md:min-h-[4rem] mb-12">
                    <h2 className="text-lg md:text-xl font-bold leading-[1.1] uppercase tracking-[0.05em] whitespace-pre-line text-white">
                      {item.title}
                    </h2>
                  </div>

                  <p className="text-gray-400 text-[10px] md:text-[14px] leading-relaxed font-light text-justify text-pretty [hyphens:auto]">
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
          </div>
        </div>
      </div>

      {/* Marquee Banner */}

    </section>
  )
}

export default LeadershipPrinciples
