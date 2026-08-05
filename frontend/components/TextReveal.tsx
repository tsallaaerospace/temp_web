"use client"

import React, { useRef, useEffect } from "react"
import gsap from "gsap"

/**
 * TextReveal — Reusable character-reveal digital glitch animation component.
 * Uses the exact multi-stage cyan flicker keyframes from CharacterReveal.
 */

interface TextRevealLine {
  text: string
  color?: string // final resting color for this line
}

interface TextRevealProps {
  lines: TextRevealLine[]
  className?: string
  lineClassName?: string
  stagger?: number
  delay?: number
  triggerOnScroll?: boolean
  glowColor?: string
}

export default function TextReveal({
  lines,
  className = "",
  lineClassName = "",
  stagger = 0.04,
  delay = 0,
  triggerOnScroll = true,
  glowColor = "#5ce1e6",
}: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const played = useRef(false)

  useEffect(() => {
    if (!containerRef.current || played.current) return

    const lineEls = containerRef.current.querySelectorAll(".tr-line")
    if (lineEls.length === 0) return

    const animateChars = () => {
      if (played.current) return
      played.current = true

      lineEls.forEach((lineEl, lineIdx) => {
        const chars = lineEl.querySelectorAll(".tr-char")
        const lineTargetColor = lines[lineIdx]?.color
        const finalColor = lineTargetColor || "inherit"

        gsap.to(chars, {
          keyframes: [
            { opacity: 1, color: glowColor, textShadow: `0 0 15px ${glowColor}`, duration: 0.12, ease: "none" },
            { opacity: 1, color: finalColor, textShadow: "none", duration: 0.1, ease: "none" },
            { opacity: 1, color: glowColor, textShadow: `0 0 25px ${glowColor}`, duration: 0.18, ease: "none" },
            { opacity: 1, color: finalColor, textShadow: "none", duration: 0.08, ease: "none" },
            { opacity: 1, color: glowColor, textShadow: `0 0 10px ${glowColor}`, duration: 0.12, ease: "none" },
            { opacity: 1, color: finalColor, textShadow: "none", duration: 0.1, ease: "none" },
            { opacity: 1, color: finalColor, textShadow: "none", duration: 0.3, ease: "power2.out" },
          ],
          stagger: {
            each: stagger,
            from: "random",
          },
          delay: delay + lineIdx * 0.15,
          onComplete: () => {
            chars.forEach((c) => {
              const el = c as HTMLElement
              el.style.opacity = "1"
              if (lineTargetColor) {
                el.style.color = lineTargetColor
              }
              el.style.textShadow = "none"
            })
          },
        })
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
  }, [lines, stagger, delay, triggerOnScroll, glowColor])

  return (
    <div ref={containerRef} className={className}>
      {lines.map((line, lineIdx) => (
        <React.Fragment key={lineIdx}>
          <span
            className={`tr-line ${lineClassName}`}
            style={{ color: line.color }}
          >
            {line.text.split(" ").map((word, wordIdx, wordArr) => (
              <React.Fragment key={wordIdx}>
                <span className="inline-block whitespace-nowrap">
                  {word.split("").map((char, charIdx) => (
                    <span
                      key={charIdx}
                      className="tr-char inline-block opacity-0 will-change-[opacity,color,filter]"
                    >
                      {char}
                    </span>
                  ))}
                </span>
                {wordIdx < wordArr.length - 1 && " "}
              </React.Fragment>
            ))}
          </span>
          {lineIdx < lines.length - 1 && " "}
        </React.Fragment>
      ))}
    </div>
  )
}
