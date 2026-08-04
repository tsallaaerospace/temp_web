"use client"

import { ContentWrapper } from "@/components/ContentWrapper"
import { motion } from "framer-motion"
import { ZoomParallax } from "@/components/ui/zoom-parallax"
import React from 'react'
const FounderNotePage = () => {
  const images = [
    {
      src: "/images/design-mode/hero-2-2.jpg",
      alt: "Founder team photo",
    },
    {
      src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1280&h=720&fit=crop&q=80",
      alt: "Cutting-edge technology lab",
    },
    {
      src: "/images/design-mode/abb6bab613d7d967786b922562d07d61f60f873e-3840x2160.jpg",
      alt: "Tsalla Aerospace Innovation",
    },
    {
      src: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1280&h=720&fit=crop&q=80",
      alt: "Collaborative workspace",
    },
    {
      src: "/images/design-mode/c30de4a3e1c213e28f4b49a5d01d81652fca6f51-1536x1024.png",
      alt: "Advanced drone systems",
    },
    {
      src: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1280&h=720&fit=crop&q=80",
      alt: "Global connectivity and AI",
    },
    {
      src: "/images/design-mode/759cf3b1631ac09f8787809500212d9914788964-4064x2286.jpg",
      alt: "Tsalla Mission Control",
    },
  ]

  return (
    <div className="bg-white text-black font-orbit min-h-screen pt-16">
      {/* Header Section */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center text-5xl sm:text-5xl md:text-6xl lg:text-[5rem] font-semibold tracking-[0.05em] text-black mb-6 uppercase px-4"
        style={{ fontFamily: "var(--font-orbit, 'Orbit', sans-serif)" }}
      >
        LIFE AT TSALLA
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className="text-center text-neutral-500 text-lg md:text-xl font-light tracking-wide mb-16 sm:mb-24 px-4 mx-auto md:whitespace-nowrap"
      >
        It's not who we're underneath, it's what we do that defines us.
      </motion.p>

      {/* Animation Section */}
      <div className="w-full">
        <ZoomParallax images={images} />
      </div>

      {/* Content Section below the animation */}
      <div className="py-24 sm:py-32 bg-black text-white">
        <ContentWrapper>
          <div className="max-w-4xl mx-auto space-y-8 text-xl md:text-2xl font-light leading-relaxed text-neutral-300 text-justify">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="font-bold text-neutral-500 text-sm md:text-base tracking-[0.3em] uppercase mb-4"
            >
              A NOTE FROM OUR FOUNDER
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              When we started this company, the goal wasn't just to build cutting-edge systems. It was to build a team that believes in doing meaningful work. We are solving hard problems that matter.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Every feature we ship and every product we launch is a step toward making the world safer and smarter. If you're someone who thrives on autonomy, loves solving challenges, and cares about creating real impact,
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="font-bold text-white text-2xl md:text-4xl mt-12 "
            >
              This is the place for you.
            </motion.p>
          </div>
        </ContentWrapper>
      </div>
    </div>
  )
}

export default FounderNotePage

