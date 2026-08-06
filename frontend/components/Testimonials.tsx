"use client"

import type React from "react"
// PREVIOUS IMPORT: import { useState } from "react"
import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import CharacterReveal from "./CharacterReveal"

interface TestimonialBlockProps {
  backgroundImage: string
  date: string
  category: string
  title: string
  description: string
  readMoreLink: string
  objectFit?: "cover" | "contain"
  bgColor?: string
}

const TestimonialBlock: React.FC<TestimonialBlockProps> = ({
  backgroundImage,
  date,
  category,
  title,
  description,
  readMoreLink,
  objectFit = "cover",
  bgColor = "bg-black",
}) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    /* PREVIOUS UI (Standard card height without mobile adjustment):
    <motion.li className={`relative w-full overflow-hidden border border-[#505051]/10 md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] h-[400px] lg:h-[450px] 3xl:h-[520px] uw:h-[640px] mb-8 lg:mb-0 group cursor-pointer`} ... >
    */
    /* PREVIOUS UI (Shorter phone card):
    <motion.li className="... h-[360px] sm:h-[400px] ...">
    */
    /* PREVIOUS UI (First mobile height increase):
    <motion.li className="... h-[380px] sm:h-[400px] ...">
    */
    <motion.li
      className={`relative w-full overflow-hidden border border-[#505051]/10
        md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] h-[400px] sm:h-[400px] lg:h-[450px] 3xl:h-[520px] uw:h-[640px] mb-8 lg:mb-0 group cursor-pointer`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* PREVIOUS UI (Direct navigation on card click):
      <Link href={readMoreLink} className="block text-black no-underline h-full relative">
      */}
      <Link
        href="#"
        onClick={(e) => e.preventDefault()}
        className="block text-black no-underline h-full relative"
      >
        <div className={`absolute inset-0 z-0 ${bgColor}`}>
          <Image
            className={`w-full h-full ${objectFit === "contain" ? "object-contain" : "object-cover"} transition-all duration-700 ease-in-out ${isHovered ? 'scale-110 opacity-0' : 'scale-100 opacity-100'}`}
            src={backgroundImage || "/placeholder.svg"}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            priority
          />
          {/* dark gradient so title is readable over image */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        </div>

        {/* Title always visible at bottom over image */}
        <div className={`absolute bottom-0 left-0 right-0 z-[6] p-6 transition-opacity duration-300 ${isHovered ? 'opacity-0' : 'opacity-100'}`}>
          <span className="text-[10px] uppercase tracking-widest font-bold text-white/60 mb-2 block">{category}</span>
          {/* PREVIOUS UI: <p className="text-sm font-bold text-white leading-snug font-orbit line-clamp-2"> */}
          <p className="text-base sm:text-sm font-bold text-white leading-snug font-orbit line-clamp-2">{title}</p>
        </div>

        {/* Hover overlay */}
        <motion.div
          initial={false}
          animate={{
            opacity: isHovered ? 1 : 0,
            backgroundColor: isHovered ? "#eaeaea" : "transparent"
          }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0 z-10 flex flex-col justify-start items-start p-8 lg:p-10 text-left"
        >
          <span className="inline-block text-[10px] uppercase tracking-widest font-bold px-3 py-1 bg-black text-white mb-4">
            {category}
          </span>
          <h3 className="text-base font-bold text-black mb-3 font-orbit leading-snug line-clamp-3">{title}</h3>
          <p className="text-sm leading-relaxed text-black/70 mb-auto font-orbit line-clamp-4">
            {description.split("\n\n")[0]}
          </p>
          <div className="flex items-center justify-between w-full mt-4">
            <span className="text-[10px] text-black/50 font-orbit">{date}</span>
            <span className="text-[10px] uppercase tracking-widest font-black flex items-center gap-2 text-black group-hover:text-blue-600 transition-colors">
              Read More <ChevronRight size={14} />
            </span>
          </div>
        </motion.div>
      </Link>
    </motion.li>
  )
}

const TESTIMONIALS_DATA = [
  // ── NEWS ──
  {
    backgroundImage: "https://static.toiimg.com/thumb/msid-128722242,imgsize-46774,width-1280,height-720,resizemode-4/128722242.jpg",
    date: "23 February 2026",
    category: "News",
    title: "ICC Summit in Vizag Highlights India's Push for Indigenous Defence Technology",
    description: "Visakhapatnam: The ICC Defence Start-up and Autonomous Systems Summit, held in Vizag on 23 February 2026, spotlighted India's rapidly growing defence, aerospace, and autonomous systems sector — and Tsalla Aerospace was among over 50 startups selected to present at the landmark event.",
    readMoreLink: "https://timesofindia.indiatimes.com/city/vijayawada/icc-summit-in-vizag-highlights-indias-push-for-indigenous-defence-technology/articleshow/128722251.cms",
    objectFit: "contain" as const,
    bgColor: "bg-[#111]",
  },
  {
    backgroundImage: "/images/News/news/Deccan-Herald-Logo.webp",
    date: "18 October 2024",
    category: "News",
    title: "Deeptech Startup Tsalla Aerospace Raises $1 Million",
    description: "Bengaluru-based deeptech startup Tsalla Aerospace has successfully raised $1 million in its first external funding round led by Sunny Stalnaker, Executive Vice President of ASML.",
    readMoreLink: "https://www.deccanherald.com/business/deeptech-startup-tsalla-aerospace-raises-1-million-3786057",
    objectFit: "contain" as const,
    bgColor: "bg-white",
  },
  {
    backgroundImage: "/blueprint-background.png",
    date: "6/10/2025",
    category: "News",
    title: "Indian Army Selects Tsalla STORM for Border Surveillance Operations",
    description: "The Indian Army has selected Tsalla Aerospace's STORM unmanned system for deployment along critical border regions. Following a rigorous multi-stage evaluation, STORM demonstrated superior performance in high-altitude, low-temperature environments.",
    readMoreLink: "/newsroom",
    objectFit: "cover" as const,
    bgColor: "bg-black",
  },
  // ── EVENTS ──
  {
    backgroundImage: "/images/News/events/event1-cover.png",
    date: "20 February 2026",
    category: "Event",
    title: "Tsalla at the Dutch Prime Minister's Visit to IISc, Bangalore",
    description: "Tsalla Aerospace was among six startups handpicked by the Dutch Embassy to present before H.E. Dick Schoof, Prime Minister of the Netherlands, during his official visit to the Indian Institute of Science.",
    readMoreLink: "/newsroom",
    objectFit: "cover" as const,
    bgColor: "bg-black",
  },
  {
    backgroundImage: "/images/News/events/event2-cover.png",
    date: "08 February 2026",
    category: "Event",
    title: "Demonstrating Heavy-Lift Autonomy to Greece's Defence Minister",
    description: "During the official visit of Mr. Nikos Dendias, Defence Minister of Greece, to the Indian Army's 515 Base Workshop, we were among the select teams chosen to present our autonomous systems capabilities.",
    readMoreLink: "/newsroom",
    objectFit: "cover" as const,
    bgColor: "bg-black",
  },
  {
    backgroundImage: "/images/News/events/event3.png",
    date: "25 November 2025",
    category: "Event",
    title: "At the Indian Navy's Table — Swavlamban 2025",
    description: "Swavlamban is where the Indian Navy brings its problem statements to the innovators solving them. We were there — presenting our autonomous system, FENIx, to naval personnel and decision-makers.",
    readMoreLink: "/newsroom",
    objectFit: "cover" as const,
    bgColor: "bg-black",
  },
];

const Testimonials: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 767px)");
    const updateItemsPerPage = (event: MediaQueryListEvent | MediaQueryList) => {
      setItemsPerPage(event.matches ? 1 : 3);
      setCurrentPage(0);
    };

    updateItemsPerPage(mobileQuery);
    mobileQuery.addEventListener("change", updateItemsPerPage);
    return () => mobileQuery.removeEventListener("change", updateItemsPerPage);
  }, []);

  // PREVIOUS UI: const totalPages = Math.ceil(TESTIMONIALS_DATA.length / 3);
  const totalPages = Math.ceil(TESTIMONIALS_DATA.length / itemsPerPage);

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentPage((prev) => (prev + newDirection + totalPages) % totalPages);
  };

  // PREVIOUS UI: const currentItems = TESTIMONIALS_DATA.slice(currentPage * 3, (currentPage + 1) * 3);
  const currentItems = TESTIMONIALS_DATA.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage,
  );

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 400 : -400,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 400 : -400,
      opacity: 0
    })
  };

  // PREVIOUS UI (mobile height was determined only by the section content):
  // <section className="bg-[#eaeaea] text-black py-12 lg:py-16 3xl:py-20 uw:py-8 overflow-hidden">
  return (
    <section className="min-h-[100dvh] sm:min-h-0 bg-[#eaeaea] text-black py-12 lg:py-16 3xl:py-20 uw:py-8 overflow-hidden">
      {/* PREVIOUS UI (Standard container padding):
      <div className="w-full px-4 md:px-24 uw:px-24 mb-12 uw:mt-8">
      */}
      <div className="w-full px-5 sm:px-12 md:px-24 uw:px-24 mb-8 sm:mb-12 uw:mt-8">
        {/* PREVIOUS UI: <div className="max-w-4xl uw:max-w-7xl"> */}
        <div className="max-w-4xl lg:max-w-none">
          {/* PREVIOUS UI (Standard title font size):
          <CharacterReveal text="News and media" className="text-black mb-8 lg:mb-10 font-orbit text-xl md:text-2xl lg:text-[4.375rem] 3xl:text-[4.375rem] uw:text-[4.375rem] tracking-[0.2em] font-bold uppercase" stagger={0.04} triggerOnScroll={true} />
          */}
          <CharacterReveal
            text="News and media"
            className="text-black mb-4 sm:mb-8 lg:mb-10 font-orbit text-2xl sm:text-3xl md:text-4xl lg:text-[4.375rem] 3xl:text-[4.375rem] uw:text-[4.375rem] tracking-[0.15em] sm:tracking-[0.2em] font-bold uppercase"
            stagger={0.04}
            triggerOnScroll={true}
          />
          {/* PREVIOUS UI (Standard paragraph font size):
          <CharacterReveal text="..." className="text-black leading-tight text-sm md:text-base lg:text-lg uw:text-lg font-medium tracking-tight max-w-5xl uw:max-w-7xl" ... />
          */}
          {/* PREVIOUS UI (Smaller phone paragraph):
          <CharacterReveal text="..." className="text-black leading-tight text-xs sm:text-base lg:text-lg uw:text-lg font-medium tracking-tight max-w-5xl uw:max-w-7xl" ... />
          */}
          {/* PREVIOUS UI (Width-constrained desktop paragraph):
          <CharacterReveal text="..." className="text-black leading-tight text-sm sm:text-base lg:text-lg uw:text-lg font-medium tracking-tight max-w-5xl uw:max-w-7xl" ... />
          */}
          <CharacterReveal
            text="Our integrated suite of software, hardware, and services empowers businesses to operate smarter and grow faster."
            className="max-w-5xl text-sm font-medium leading-tight tracking-tight text-black sm:text-base lg:max-w-none lg:text-[clamp(0.75rem,1.15vw,1.125rem)]"
            lineClassName="lg:flex-nowrap lg:whitespace-nowrap"
            stagger={0.015}
            delay={1.2}
            triggerOnScroll={true}
          />
        </div>
      </div>

      {/* PREVIOUS UI: the mobile card and navigation block had no extra top offset. */}
      <div className="relative mx-auto flex max-w-[1600px] items-center justify-between gap-2 px-4 pt-12 sm:pt-0 md:gap-4 md:px-8">
        <motion.button
          whileHover={{ x: -3 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => paginate(-1)}
          className="hidden md:flex p-4 border border-black/10 hover:border-black/30 transition-colors items-center justify-center bg-black text-white shrink-0 z-20"
        >
          <ChevronLeft size={24} />
        </motion.button>

        {/* PREVIOUS UI (Standard container height):
        <div className="flex-1 relative h-[420px] lg:h-[450px] 3xl:h-[520px] uw:h-[640px] overflow-hidden px-2 md:px-4">
        */}
        {/* PREVIOUS UI (Shorter phone carousel): h-[380px] sm:h-[420px] */}
        {/* PREVIOUS UI (First mobile height increase): h-[400px] sm:h-[420px] */}
        <div className="flex-1 relative h-[420px] sm:h-[420px] lg:h-[450px] 3xl:h-[520px] uw:h-[640px] overflow-hidden px-2 md:px-4">
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.ul
              key={currentPage}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              className="flex flex-wrap lg:flex-nowrap justify-start lg:justify-between w-full h-full list-none p-0 m-0 gap-6"
            >
              {currentItems.map((testimonial, index) => (
                <TestimonialBlock
                  key={`${currentPage}-${index}`}
                  backgroundImage={testimonial.backgroundImage}
                  date={testimonial.date}
                  category={testimonial.category}
                  title={testimonial.title}
                  description={testimonial.description}
                  readMoreLink={testimonial.readMoreLink}
                  objectFit={testimonial.objectFit}
                  bgColor={testimonial.bgColor}
                />
              ))}
            </motion.ul>
          </AnimatePresence>
        </div>

        <motion.button
          whileHover={{ x: 3 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => paginate(1)}
          className="hidden md:flex p-4 border border-black/10 hover:border-black/30 transition-colors items-center justify-center bg-black text-white shrink-0 z-20"
        >
          <ChevronRight size={24} />
        </motion.button>
      </div>

      <div className="flex flex-col items-center gap-6 mt-12 3xl:mt-6">
        <div className="flex justify-center gap-2">
          {[...Array(totalPages)].map((_, i) => (
            <div
              key={i}
              className={`h-1 transition-all duration-300 ${i === currentPage ? 'w-8 bg-black' : 'w-2 bg-black/20'}`}
            />
          ))}
        </div>

        <div className="flex md:hidden gap-6">
          <button onClick={() => paginate(-1)} className="p-4 border border-black/10"><ChevronLeft size={24} /></button>
          <button onClick={() => paginate(1)} className="p-4 bg-black text-white"><ChevronRight size={24} /></button>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
