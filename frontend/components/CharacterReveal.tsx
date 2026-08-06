"use client"

import React, { useRef, useEffect } from "react"
import gsap from "gsap"

interface CharacterRevealProps {
  text: string
  className?: string
  lineClassName?: string
  stagger?: number
  delay?: number
  triggerOnScroll?: boolean
  targetColor?: string
  glowColor?: string
  flickerColor?: string
}

export default function CharacterReveal({
  text,
  className = "",
  lineClassName = "",
  stagger = 0.04,
  delay = 0,
  triggerOnScroll = true,
  targetColor,
  glowColor,
  flickerColor,
}: CharacterRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const played = useRef(false)

  useEffect(() => {
    if (!containerRef.current) return

    const chars = containerRef.current.querySelectorAll(".char")
    if (chars.length === 0) return

    // Characters start invisible
    chars.forEach((c) => {
      ; (c as HTMLElement).style.opacity = "0"
    })

    const finalColor = targetColor || "inherit"
    const activeGlow = glowColor || (targetColor ? targetColor : "#5ce1e6")
    const baseFlicker = flickerColor || "#ffffff"

    const animateChars = () => {
      if (played.current) return
      played.current = true

      /* PREVIOUS UI: keyframes hardcoded #5ce1e6 cyan for all reveals */
      gsap.to(chars, {
        keyframes: [
          { opacity: 1, color: baseFlicker, textShadow: `0 0 15px ${baseFlicker}`, duration: 0.12, ease: "none" },
          { opacity: 1, color: finalColor, textShadow: "none", duration: 0.1, ease: "none" },
          { opacity: 1, color: activeGlow, textShadow: `0 0 25px ${activeGlow}`, duration: 0.18, ease: "none" },
          { opacity: 1, color: baseFlicker, textShadow: `0 0 10px ${baseFlicker}`, duration: 0.08, ease: "none" },
          { opacity: 1, color: activeGlow, textShadow: `0 0 10px ${activeGlow}`, duration: 0.12, ease: "none" },
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
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              animateChars()
              observer.disconnect()
            }
          })
        },
        { threshold: 0.1 }
      )

      observer.observe(containerRef.current)
      return () => observer.disconnect()
    } else {
      animateChars()
    }
  }, [stagger, delay, triggerOnScroll, targetColor])

  /* PREVIOUS UI: <div ref={containerRef} className={`inline-block ${className}`}> */
  /* PREVIOUS UI: line.split("").map((char, i) => ...) */
  /* PREVIOUS UI: <span key={lineIdx} className={`flex whitespace-pre-wrap flex-wrap ${lineClassName}`}> */
  /* PREVIOUS UI: <span ref={containerRef} className={`inline-block w-full ${className}`}> */
  /* PREVIOUS UI: <span key={lineIdx} className={`block w-full text-justify ${lineClassName}`}> */
  return (
    <span ref={containerRef} className={`inline-block ${className}`}>
      {text.split("\n").map((line, lineIdx) => (
        <span key={lineIdx} className={`inline-block ${lineClassName}`}>
          {line.split(" ").map((word, wordIdx, wordArr) => (
            <React.Fragment key={wordIdx}>
              {/* PREVIOUS UI: <span className="inline-block whitespace-nowrap"> */}
              <span className="inline whitespace-nowrap">
                {word.split("").map((char, charIdx) => (
                  <span
                    key={charIdx}
                    className="char inline-block will-change-[opacity,color,filter]"
                  >
                    {char}
                  </span>
                ))}
              </span>
              {/* PREVIOUS UI: <span className="char inline-block will-change-[opacity,color,filter]">{" "}</span> */}
              {wordIdx < wordArr.length - 1 && (
                <span className="char inline-block will-change-[opacity,color,filter]">
                  {"\u00A0"}
                </span>
              )}
            </React.Fragment>
          ))}
        </span>
      ))}
    </span>
  )
}
