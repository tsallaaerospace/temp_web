"use client";

import React, { useRef, useEffect, useState } from "react";
import CharacterReveal from "./CharacterReveal"

export default function Missions() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* Import for the 'Pontano Sans' font */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Pontano+Sans&display=swap');
      `}</style>

      {/* PREVIOUS UI: section ref={sectionRef} className="relative w-full h-[85vh] lg:h-[75vh] 2xl:h-[105vh] 3xl:h-[100vh] uw:h-screen flex items-center justify-start bg-black text-white overflow-hidden" */}
      <section
        ref={sectionRef}
        className="relative w-full h-screen min-h-screen flex items-center justify-start bg-black text-white overflow-hidden snap-start snap-always"
      >
        {/* Background Image Container */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/design-mode/mission.jpeg"
            alt="Mission Background"
            className="w-full h-full object-cover object-right transform scale-110"
          />
        </div>
        {/* whjhsw */}
        {/* Content */}
        <div className="relative z-10 px-6 sm:px-10 md:px-16 lg:px-24 uw:px-24 text-left max-w-5xl uw:max-w-7xl">
          {/* PREVIOUS UI (CharacterReveal title):
          <CharacterReveal text={"On a mission to protect our\nprotectors."} ... />
          */}
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-5xl 3xl:text-5xl uw:text-5xl font-bold text-black mb-6 font-orbit">
            On a mission to protect our<br />protectors.
          </h2>
          <div className="w-full">
            <p
              className={`text-lg md:text-2xl 3xl:text-lg uw:text-4xl font-light leading-relaxed text-neutral-600 tracking-wide font-orbit transition-all duration-700 ease-out transform ${isVisible ? "opacity-90 translate-y-0" : "opacity-0 translate-y-12"
                }`}
              style={{
                transitionDelay: "150ms",
              }}
            >
              Our adversaries are evolving, so must we!
            </p>
          </div>
          {/* ijwjsw */}
        </div>
      </section>
    </>
  );
}
