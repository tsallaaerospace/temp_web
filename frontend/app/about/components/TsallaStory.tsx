"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { AnimatePresence, motion, useInView, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion"
import ProductHeading from "@/components/ProductHeading"
import CharacterReveal from "@/components/CharacterReveal"

// "Our Story" on the About page, told as chapters. Desktop: the photo stays pinned on the left with the
// current chapter number and a progress bar while the chapters scroll past on the right; the chapter being
// read is full black, the rest fade back. Phones: photo on top, chapters stacked with the same highlight.
// PREVIOUS UI: about/components/WhatWeDo.tsx ("OUR STORY" title, one short paragraph and a full-width photo).

const PHOTO = "/shared/images/c30de4a3e1c213e28f4b49a5d01d81652fca6f51-1536x1024.png"

const CHAPTERS = [
  {
    label: "The question",
    body: ["Tsalla Aerospace began with a question: what would it take to build aircraft that could think, navigate and operate when the conditions around them became uncertain?"],
  },
  {
    label: "The return",
    body: ["For our founder, Vinayak Tsalla, that question became a reason to return to India after studying and working in Europe. The ambition was to build indigenous aerospace technology and bring together the people willing to take on its hardest problems."],
  },
  {
    label: "The first builds",
    body: ["Our beginnings were hands-on: small teams, early prototypes and the demanding work of turning engineering into flight. Every build exposed something new. Every test forced us to examine our assumptions. Progress came through persistence, evidence and a willingness to start again when the results demanded it."],
  },
  {
    label: "A sharper purpose",
    body: ["Working with India’s armed forces gave that ambition a sharper purpose. The challenge was no longer simply whether an aircraft could fly. It was whether it could help someone operating in a confined compartment, over a moving ship or far from reliable navigation and communications. Those realities continue to shape what we build."],
  },
  {
    label: "Today",
    body: ["Today, our work brings together uncrewed aircraft, onboard intelligence, resilient connectivity and the software that connects them. We are developing systems that can take on more of the complexity of a mission, giving the people operating them greater awareness and more room to focus on the decisions that matter."],
  },
  {
    label: "The next chapter",
    body: [
      "Our next chapter carries that same conviction at a larger scale.",
      "We are building towards an India that can design, prove, produce and continually improve the technology it depends on. That capability takes years of engineering, people who care about the outcome, and trust earned through performance.",
    ],
  },
]

const pad = (n: number) => String(n).padStart(2, "0")

function Chapter({ index, label, body, active, onActive }: { index: number; label: string; body: string[]; active: boolean; onActive: (i: number) => void }) {
  const ref = useRef<HTMLDivElement>(null)
  // A chapter becomes the one being read when it crosses the middle band of the screen
  const inBand = useInView(ref, { margin: "-42% 0px -42% 0px" })
  useEffect(() => { if (inBand) onActive(index) }, [inBand, index, onActive])
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      className="relative flex min-h-[46svh] flex-col justify-center py-10 lg:min-h-[64svh] lg:py-0"
      animate={{ opacity: active || reduceMotion ? 1 : 0.28 }}
      transition={{ duration: reduceMotion ? 0 : 0.5, ease: "easeOut" }}
    >
      <p className="font-orbit text-xs uppercase tracking-[0.3em] text-[#00a3cc]">
        {pad(index + 1)} <span className="text-neutral-400">/</span> {label}
      </p>
      <div className="mt-5 space-y-4">
        {body.map((paragraph) => (
          <p key={paragraph.slice(0, 24)} className="text-[clamp(1.125rem,1.6vw,1.75rem)] font-light leading-[1.45] text-neutral-900">
            {paragraph}
          </p>
        ))}
      </div>
    </motion.div>
  )
}

export default function TsallaStory() {
  const sectionRef = useRef<HTMLElement>(null)
  const chaptersRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const reduceMotion = useReducedMotion()

  // Photo zooms gently while the chapters scroll; the bar fills from the first chapter to the last
  const { scrollYProgress: sectionProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] })
  const photoScale = useTransform(sectionProgress, [0, 1], reduceMotion ? [1, 1] : [1.18, 1])
  const { scrollYProgress: chapterProgress } = useScroll({ target: chaptersRef, offset: ["start center", "end center"] })
  const progress = useSpring(chapterProgress, { stiffness: 120, damping: 30, mass: 0.3 })

  return (
    <section ref={sectionRef} id="our-story" aria-labelledby="our-story-title" className="relative w-full bg-white text-neutral-900">
      {/* Header */}
      <div className="px-6 pt-28 md:px-12 md:pt-32 lg:px-24">
        <p className="font-orbit text-xs uppercase tracking-[0.3em] text-neutral-500 md:text-sm">Our story</p>
        <ProductHeading id="our-story-title" className="mt-5">
          Built in India.{" "}
          <span className="block">
            <CharacterReveal text="Driven by those who serve." targetColor="#5ce1e6" glowColor="#5ce1e6" stagger={0.04} />
          </span>
        </ProductHeading>
      </div>

      {/* Chapters */}
      <div className="mt-12 px-6 md:px-12 lg:mt-20 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16 lg:px-24 xl:gap-24">
        {/* Pinned photo (desktop) / top photo (phones) */}
        <div>
          <div className="relative aspect-[4/3] w-full overflow-hidden lg:sticky lg:top-[14svh] lg:aspect-auto lg:h-[72svh]">
            <motion.div className="absolute inset-0" style={{ scale: photoScale }}>
              <Image src={PHOTO} alt="Operator watching a Tsalla drone at sunset" fill sizes="(max-width: 1023px) 100vw, 50vw" className="object-cover object-center" />
            </motion.div>
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

            {/* Current chapter + progress (desktop) */}
            <div className="absolute inset-x-0 bottom-0 hidden p-8 text-white lg:block xl:p-10">
              <div className="flex items-end justify-between gap-6">
                <div className="relative h-[clamp(4.5rem,8vw,8rem)] overflow-hidden">
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.span
                      key={active}
                      className="block font-orbit text-[clamp(4.5rem,8vw,8rem)] font-normal leading-none tracking-[-0.04em]"
                      initial={reduceMotion ? false : { y: "100%", opacity: 0 }}
                      animate={{ y: "0%", opacity: 1 }}
                      exit={reduceMotion ? undefined : { y: "-100%", opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    >
                      {pad(active + 1)}
                    </motion.span>
                  </AnimatePresence>
                </div>
                <p className="pb-3 text-right font-orbit text-xs uppercase tracking-[0.3em] text-white/80">{CHAPTERS[active].label}</p>
              </div>
              <div className="mt-5 h-px w-full bg-white/25">
                <motion.div className="h-px origin-left bg-[#5ce1e6]" style={{ scaleX: progress }} />
              </div>
              <p className="mt-3 font-orbit text-[0.6875rem] uppercase tracking-[0.3em] text-white/60">
                Chapter {pad(active + 1)} of {pad(CHAPTERS.length)}
              </p>
            </div>
          </div>
        </div>

        <div ref={chaptersRef} className="relative lg:py-[18svh]">
          {/* Progress rail (phones and tablets) */}
          <div aria-hidden="true" className="absolute bottom-0 left-0 top-0 w-px bg-neutral-200 lg:hidden">
            <motion.div className="h-full w-px origin-top bg-[#5ce1e6]" style={{ scaleY: progress }} />
          </div>
          <div className="pl-6 lg:pl-0">
            {CHAPTERS.map((chapter, index) => (
              <Chapter key={chapter.label} index={index} label={chapter.label} body={chapter.body} active={active === index} onActive={setActive} />
            ))}
          </div>
        </div>
      </div>

      {/* Closing: a full screen, so the page snap that stops at the section's bottom edge shows it on its own */}
      <div className="flex min-h-[100svh] flex-col items-center justify-center px-6 py-24 text-center md:px-12 lg:px-24">
        <motion.p
          className="product-body max-w-2xl text-neutral-600"
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: reduceMotion ? 0 : 0.8 }}
        >
          Our story is still being written—in the workshop, in the code, and in every flight that moves us forward.
        </motion.p>
        <ProductHeading className="mt-8 max-w-5xl">
          The purpose remains the same:{" "}
          <span className="block">
            <CharacterReveal text="protect those who protect us." targetColor="#5ce1e6" glowColor="#5ce1e6" stagger={0.04} />
          </span>
        </ProductHeading>
      </div>
    </section>
  )
}
