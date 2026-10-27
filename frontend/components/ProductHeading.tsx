"use client"

import type { ReactNode } from "react"
import { motion, useReducedMotion } from "framer-motion"

export function ProductHeroTitle({ children, className = "" }: { children: ReactNode; className?: string }) {
  const reduceMotion = useReducedMotion()
  return <motion.h1 className={`font-orbit text-[3.25rem] sm:text-[3.75rem] lg:text-[4.5rem] font-normal leading-none tracking-[-0.03em] ${className}`} initial={reduceMotion ? false : { opacity: 0, filter: "blur(6px)" }} animate={{ opacity: 1, filter: "blur(0px)" }} transition={{ duration: reduceMotion ? 0 : 0.8, delay: reduceMotion ? 0 : 1.8 }}>{children}</motion.h1>
}

export default function ProductHeading({ children, id, className = "" }: { children: ReactNode; id?: string; className?: string }) {
  const reduceMotion = useReducedMotion()
  return (
    <motion.h2
      id={id}
      className={`product-section-title font-orbit font-normal leading-[1.1] ${className}`}
      initial={reduceMotion ? false : { opacity: 0, y: 30 }}
      animate={reduceMotion ? { opacity: 1, y: 0 } : undefined}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: reduceMotion ? 0 : 0.8, ease: [0.16, 1, 0.3, 1] }}
    >{children}</motion.h2>
  )
}
