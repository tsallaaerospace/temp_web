"use client"

import type React from "react"
import { ContentWrapper } from "@/components/ContentWrapper"
import CharacterReveal from "@/components/CharacterReveal"

export default function FenixResponder1(): React.JSX.Element {
  return (
    <>
      {/* This component uses a dark, full-screen layout with a background video.
        - The parent 'section' is relative to position its children.
        - The 'video' and the dark 'div' overlay are positioned absolutely to fill the background.
        - The main text container is a flex column with 'justify-between' to push content to the top and bottom.
      */}
      {/* PREVIOUS UI:
      <section className="relative w-full min-h-screen flex items-center justify-center text-white overflow-hidden bg-black">
        <video ... />
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-60 z-10"></div>
        <div className="relative z-20 flex flex-col justify-between w-full min-h-screen py-16 md:py-24">
          <ContentWrapper>
            <div className="flex flex-col justify-between min-h-screen">
              ...
            </div>
          </ContentWrapper>
        </div>
      </section>
      */}
      <section className="relative w-full h-[100dvh] min-h-[100dvh] flex items-center justify-center text-white overflow-hidden bg-black font-orbit">
        {/* Background Video */}
        <video
          src="https://cdn.sanity.io/files/z5s3oquj/production/49f421ac52789376bbe9c2036911fb5505e4004e.mp4"
          autoPlay
          loop
          muted
          playsInline // Essential for autoplay on mobile browsers
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        >
          Your browser does not support the video tag.
        </video>

        {/* Dark Overlay for Text Readability */}
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-60 z-10"></div>

        {/* Text Content */}
        <div className="relative z-20 flex flex-col justify-between w-full h-full py-10 sm:py-14 md:py-16">
          <ContentWrapper className="h-full">
            <div className="flex flex-col justify-between h-full">
              {/* Top Text Block */}
              <div>
              {/* PREVIOUS UI: style={{ fontFamily: "'ClashGrotesk Bold (.eot)', sans-serif" }} */}
              {/* PREVIOUS UI: FENIx as the First <span className="text-[#5ce1e6]">Responder</span> */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium leading-tight tracking-normal flex flex-wrap items-center gap-x-2">
                <span>FENIx as the First</span>{" "}
                <CharacterReveal
                  text="Responder"
                  targetColor="#5ce1e6"
                  glowColor="#5ce1e6"
                  className="text-[#5ce1e6]"
                  stagger={0.06}
                />
              </h1>
              <p className="mt-4 text-lg md:text-xl max-w-3xl text-neutral-600 font-light leading-relaxed">
                  When every second counts, FENIx arrives first — eyes on the ground before boots hit it.
                </p>
              </div>

              {/* Bottom Text Block */}
              <div>
              <p className="text-lg md:text-xl max-w-3xl text-neutral-600 font-light leading-relaxed">
                  In disaster zones, conflict sites, or remote locations, time lost is lives lost. Human teams can't
                  always get there first, but Our drone can.
                </p>
              </div>
            </div>
          </ContentWrapper>
        </div>
      </section>
    </>
  )
}
