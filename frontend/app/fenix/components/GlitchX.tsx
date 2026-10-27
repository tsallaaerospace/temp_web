"use client"

import React, { useEffect, useRef } from "react"
import gsap from "gsap"

// The "x" in FENIx switches on like a glitching signal: three hard blinks, each jolting sideways with a
// slight skew and a split cyan/white ghost, before it locks in. Built from GSAP set() calls so every
// step snaps rather than tweens. Offsets and glow are tuned for the 64px hero title and scale with the
// element's font size, so the same glitch stays proportionate in body text.
const CYAN = "#5ce1e6"
// The second ghost and the middle flash are white on dark sections and near-black on light ones
const SPLIT = (px: number, glow: number, ghost = "255,255,255") =>
  `${px}px 0 0 rgba(92,225,230,0.9), ${-px}px 0 0 rgba(${ghost},0.55), 0 0 ${glow}px rgba(92,225,230,0.8)`

interface GlitchXProps {
  /** Seconds to wait: after page load ("load") or after the letter scrolls into view ("view"). */
  delay?: number
  trigger?: "load" | "view"
  /** Colour the letter settles on; omit to keep the surrounding text colour. */
  finalColor?: string
  /** Set on light backgrounds, where a white flash would disappear. */
  onLight?: boolean
}

export default function GlitchX({ delay = 0, trigger = "load", finalColor, onLight = false }: GlitchXProps) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let tl: gsap.core.Timeline | undefined

    const play = () => {
      const k = parseFloat(getComputedStyle(el).fontSize) / 64
      const s = (n: number) => +(n * k).toFixed(2)
      const at = (t: number) => delay + t
      const ghost = onLight ? "10,10,10" : "255,255,255"
      const flash = onLight ? "#0a0a0a" : "#ffffff"
      const split = (px: number, glow: number) => SPLIT(px, glow, ghost)
      tl = gsap.timeline()
      tl.set(el, { opacity: 1, color: CYAN, x: s(-5), skewX: 12, textShadow: split(s(6), s(20)) }, at(0))       // blink 1
        .set(el, { opacity: 0 }, at(0.12))
        .set(el, { opacity: 1, color: flash, x: s(4), skewX: -10, textShadow: split(s(-5), s(16)) }, at(0.32))    // blink 2
        .set(el, { opacity: 0.15, x: 0, skewX: 0, textShadow: split(0, 0) }, at(0.46))
        .set(el, { opacity: 1, color: CYAN, x: s(-3), skewX: 6, textShadow: split(s(4), s(24)) }, at(0.64))       // blink 3
        .set(el, { x: s(1), skewX: 0, textShadow: split(s(1), s(10)) }, at(0.8))
        .set(el, finalColor
          ? { color: finalColor, x: 0, textShadow: "none" }
          : { clearProps: "color,textShadow", x: 0 }, at(0.95))                                                 // locked
    }

    let observer: IntersectionObserver | undefined
    if (trigger === "view") {
      observer = new IntersectionObserver((entries) => {
        // Latest entry: one batch can also hold an older state (e.g. after a reload restores the scroll position)
        const entry = entries[entries.length - 1]
        if (!entry.isIntersecting) return
        observer?.disconnect()
        play()
      }, { threshold: 0.6 })
      observer.observe(el)
    } else {
      play()
    }

    return () => {
      observer?.disconnect()
      tl?.kill()
      gsap.set(el, { clearProps: "transform,color,textShadow", opacity: 0 })
    }
  }, [delay, trigger, finalColor, onLight])

  return (
    <span ref={ref} className="inline-block will-change-transform" style={{ opacity: 0, color: finalColor }}>
      x
    </span>
  )
}
