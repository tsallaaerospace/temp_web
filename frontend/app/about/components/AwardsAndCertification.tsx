"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import ContentWrapper from "@/components/ContentWrapper"

export default function AwardsAndCertification() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            observer.disconnect()
          }
        })
      },
      { threshold: 0.3 },
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className={`relative w-full h-screen flex items-center justify-start overflow-hidden transition-opacity duration-1000 ease-out ${isVisible ? "opacity-100" : "opacity-100"
        }`}
    >
      {/* Background Image */}
      <Image
        src="/images/company/get_in_touch.jpg"
        alt="Drone Silhouette Hero"
        fill
        className="object-cover object-center"
        priority
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* Content Block */}
      <ContentWrapper>
        <div className="relative z-10 text-left max-w-2xl mt-32 -ml-4 md:-ml-8 lg:-ml-4">
          <h1 className="text-white text-2xl sm:text-4xl md:text-5xl font-orbit font-semibold mb-6 tracking-[0.05em] uppercase">
            GET IN TOUCH
          </h1>
          <div className="flex flex-wrap gap-4 mt-2">
            <Link
              href="/contact"
              className="
                inline-block bg-transparent border-2 border-white text-white
                hover:bg-white hover:text-black
                px-6 py-2
                transition-all duration-300
                font-orbit text-xs sm:text-sm md:text-base
              "
            >
              Connect with us
            </Link>
            <Link
              href="/careers"
              className="
                inline-block bg-transparent text-white border-2 border-white
                hover:bg-white hover:text-black
                px-6 py-2
                transition-all duration-300
                font-orbit text-xs sm:text-sm md:text-base
              "
            >
              Join the Mission
            </Link>

          </div>
        </div>
      </ContentWrapper>
    </section>
  )
}
