"use client"

import { useEffect, useRef, useState } from "react"
// PREVIOUS UI: next/image rendered the white-only logo and background photograph.
import Link from "next/link"
import ContentWrapper from "@/components/ContentWrapper"
import CharacterReveal from "@/components/CharacterReveal"

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
      className="relative w-full min-h-svh flex items-center overflow-hidden bg-[#3c3c3b] font-orbit text-white py-20"
    >
      {/* PREVIOUS UI: Full-screen drone photograph and dark overlay.
      <Image
        src="/shared/images/get_in_touch.jpg"
        alt="Drone Silhouette Hero"
        fill
        className="object-cover object-center"
        priority
      />

      <div className="absolute inset-0 bg-black/30"></div>
      */}

      {/* Content Block */}
      <ContentWrapper>
        {/* PREVIOUS UI: Text-only block offset downward with mt-32 and negative left margins. */}
        <div className="relative z-10 grid items-center gap-12 md:grid-cols-2 md:gap-16">
        <div className="text-left">
          <h2 className="text-[clamp(32px,3.5vw,64px)] font-normal leading-tight mb-8 uppercase">
            <CharacterReveal text="GET IN TOUCH" stagger={0.06} />
          </h2>
          <div className="flex flex-wrap gap-4 mt-2">
            <Link
              href="/contact"
              className="
                inline-block bg-transparent border border-white text-white
                hover:bg-white hover:text-black
                px-6 py-2
                transition-colors duration-300
                font-orbit text-xs sm:text-sm md:text-base
              "
            >
              Connect with us
            </Link>
            <Link
              href="/careers"
              className="
                inline-block bg-transparent text-white border border-white
                hover:bg-white hover:text-black
                px-6 py-2
                transition-colors duration-300
                font-orbit text-xs sm:text-sm md:text-base
              "
            >
              Join the Mission
            </Link>

          </div>
        </div>
        <div className="flex justify-center md:justify-end" aria-hidden="true">
          {/* PREVIOUS UI: white-only Image with a cyan drop-shadow. The existing silhouette now masks the actual fill color. */}
          <div className={`about-contact-logo max-w-full h-[32svh] md:h-[65svh] aspect-[757/821] md:-translate-x-10 ${isVisible ? "is-visible" : ""}`} />
        </div>
        </div>
      </ContentWrapper>
      <style jsx global>{`
        /* Same white/cyan flicker stages and timing as the home hero CharacterReveal. */
        .about-contact-logo {
          background-color: white;
          mask: url('/Logo/logo_only.png') center / contain no-repeat;
          -webkit-mask: url('/Logo/logo_only.png') center / contain no-repeat;
        }
        /* PREVIOUS UI: the logo flicker completed in 1.1s. */
        .about-contact-logo.is-visible { animation: about-logo-flicker 2.5s linear both; }
        @keyframes about-logo-flicker {
          0% { opacity: 0; }
          /* PREVIOUS UI: filter produced a cyan glow but left the logo fill white. */
          11%, 27% { opacity: 1; background-color: white; }
          20%, 44% { opacity: 1; background-color: #5ce1e6; }
          55% { opacity: 1; background-color: white; }
          72% { opacity: 1; background-color: #5ce1e6; }
          100% { opacity: 1; background-color: white; }
        }
        @media (prefers-reduced-motion: reduce) {
          .about-contact-logo.is-visible { animation: none; }
          .about-page .about-contact-logo { opacity: 1; }
        }
      `}</style>
    </section>
  )
}
