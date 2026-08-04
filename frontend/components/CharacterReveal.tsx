"use client"

import React, { useRef } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(useGSAP, ScrollTrigger)

interface CharacterRevealProps {
  text: string
  className?: string
  stagger?: number
  delay?: number
  triggerOnScroll?: boolean
  targetColor?: string
}

export default function CharacterReveal({
  text,
  className = "",
  stagger = 0.04,
  delay = 0,
  triggerOnScroll = true,
  targetColor,
}: CharacterRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!containerRef.current) return

    const chars = containerRef.current.querySelectorAll(".char")
    if (chars.length === 0) return

    gsap.set(chars, { opacity: 0 })

    const finalColor = targetColor || "inherit"

    const animateChars = () => {
      gsap.to(chars, {
        keyframes: [
          { opacity: 1, color: "#5ce1e6", textShadow: "0 0 15px #5ce1e6", duration: 0.12, ease: "none" },
          { opacity: 1, color: finalColor, textShadow: "none", duration: 0.1, ease: "none" },
          { opacity: 1, color: "#5ce1e6", textShadow: "0 0 25px #5ce1e6", duration: 0.18, ease: "none" },
          { opacity: 1, color: finalColor, textShadow: "none", duration: 0.08, ease: "none" },
          { opacity: 1, color: "#5ce1e6", textShadow: "0 0 10px #5ce1e6", duration: 0.12, ease: "none" },
          { opacity: 1, color: finalColor, textShadow: "none", duration: 0.1, ease: "none" },
          { opacity: 1, color: finalColor, textShadow: "none", duration: 0.3, ease: "power2.out" }
        ],
        stagger: {
          each: stagger,
          from: "random",
        },
        delay: delay,
        overwrite: true
      })
    }

    if (triggerOnScroll) {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 85%",
        once: true,
        onEnter: animateChars
      })
    } else {
      animateChars()
    }
  }, { scope: containerRef })

  return (
    <div ref={containerRef} className={`inline-block ${className}`}>
      {text.split("\n").map((line, lineIdx) => (
        <div key={lineIdx} className="flex whitespace-pre-wrap flex-wrap">
          {line.split("").map((char, i) => (
            <span
              key={i}
              className="char inline-block will-change-[opacity,color,filter]"
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </div>
      ))}
    </div>
  )
}
