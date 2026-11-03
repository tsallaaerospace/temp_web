"use client"

import { ContentWrapper } from "@/components/ContentWrapper"
import { motion } from "framer-motion"
import { ZoomParallax } from "@/components/ui/zoom-parallax"
import React from 'react'
import content from "../content.json"
const FounderNotePage = () => {
  /* PREVIOUS UI: Stock and shared gallery photos.
  const images = [
    {
      src: "/careers/hero-2-2.jpg",
      alt: "Founder team photo",
    },
    {
      src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1280&h=720&fit=crop&q=80",
      alt: "Cutting-edge technology lab",
    },
    {
      src: "/shared/images/abb6bab613d7d967786b922562d07d61f60f873e-3840x2160.jpg",
      alt: "Tsalla Aerospace Innovation",
    },
    {
      src: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1280&h=720&fit=crop&q=80",
      alt: "Collaborative workspace",
    },
    {
      src: "/shared/images/c30de4a3e1c213e28f4b49a5d01d81652fca6f51-1536x1024.png",
      alt: "Advanced drone systems",
    },
    {
      src: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1280&h=720&fit=crop&q=80",
      alt: "Global connectivity and AI",
    },
    {
      src: "/careers/759cf3b1631ac09f8787809500212d9914788964-4064x2286.jpg",
      alt: "Tsalla Mission Control",
    },
  ]
  */
  // PREVIOUS UI: 8.jpg occupied the centre and 4.jpg occupied the upper slot.
  const images = [
  {
    "src": "/careers/Life%20at%20tsalla/4.jpg",
    rotateOnMobile: true,
    "alt": "Tsalla team in the aircraft workshop"
  },
  {
    "src": "/careers/Life%20at%20tsalla/8.jpg",
    rotateOnMobile: true,
    "alt": "Tsalla Aerospace team together in the workshop"
  },
  {
    "src": "/careers/Life%20at%20tsalla/3.JPG",
    "alt": "Flight testing at the field"
  },
  {
    "src": "/careers/Life%20at%20tsalla/2.JPG",
    rotateOnMobile: true,
    "alt": "Team meal together"
  },
  {
    "src": "/careers/Life%20at%20tsalla/7.jpeg",
    "alt": "Team member at the flight test field at sunset"
  },
  {
    "src": "/careers/Life%20at%20tsalla/5.JPG",
    rotateOnMobile: true,
    "alt": "Team members enjoying an outing"
  },
  // PREVIOUS UI: { src: "/careers/Life%20at%20tsalla/6.jpg", alt: "Team and visitors at the workshop" },
  {
    "src": "/careers/Life%20at%20tsalla/1.JPG",
    rotateOnMobile: true,
    "alt": "A candid moment during a team trip"
  }
]


  return (
    <>
    <div className="bg-white text-black font-orbit min-h-screen pt-16">
      {/* Header Section */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="careers-section-title text-center text-black mb-6 uppercase px-4"
        style={{ fontFamily: "var(--font-orbit, 'Orbit', sans-serif)" }}
      >
        LIFE AT TSALLA
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className="careers-body text-center text-neutral-500 mb-16 sm:mb-24 px-4 mx-auto"
      >
        It's not who we're underneath, it's what we do that defines us.
      </motion.p>

      {/* Animation Section */}
      <div className="w-full">
        <ZoomParallax images={images} />
      </div>
    </div>

      {/* Content Section below the animation */}
      <section id="founder-note" className="min-h-[100svh] flex flex-col justify-center py-24 sm:py-32 bg-black text-white">
        <ContentWrapper>
          <div className="careers-body max-w-4xl mx-auto space-y-8 text-neutral-300">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="careers-label text-neutral-400 uppercase mb-4"
            >
              {/* PREVIOUS CONTENT: A NOTE FROM OUR FOUNDER */}
              {content.founder.label}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* PREVIOUS CONTENT: When we started this company, the goal wasn't just to build cutting-edge systems. It was to build a team that believes in doing meaningful work. We are solving hard problems that matter. */}
              {content.founder.paragraphs[0]}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {/* PREVIOUS CONTENT: Every feature we ship and every product we launch is a step toward making the world safer and smarter. If you're someone who thrives on autonomy, loves solving challenges, and cares about creating real impact, */}
              {content.founder.paragraphs[1]}
            </motion.p>
            <p>{content.founder.paragraphs[2]}</p>
            <p>{content.founder.paragraphs[3]}</p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="careers-card-title text-white mt-12"
            >
              {content.founder.closing}
            </motion.p>
          </div>
        </ContentWrapper>
      </section>
    </>
  )
}

export default FounderNotePage

